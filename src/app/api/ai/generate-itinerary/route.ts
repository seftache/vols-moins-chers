import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';
import { fetchRealHotel, RealHotel } from '../../../../lib/hotel-api';

export const maxDuration = 60; // Vercel hobby max is 60s

// ============================================================
// CONFIGURATION NVIDIA / DEEPSEEK
// ============================================================
const NVIDIA_MODEL = 'meta/llama-3.2-3b-instruct';
const MAX_DEALS_PER_RUN = 3;

const SYSTEM_PROMPT = `Tu es un concierge voyage premium. On te donne un VOL RÉEL et potentiellement un HÔTEL RÉEL. Génère un itinéraire de séjour au format JSON.

RÈGLES :
- Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks.
- NE MODIFIE PAS les données de l'hôtel si elles sont fournies.
- Programme journalier de 3 à 5 jours max.
- Sois concis mais élégant.

FORMAT JSON :
{
  "flight_details": {
    "origin": "ABJ", "origin_name": "Abidjan",
    "destination": "CODE", "destination_name": "Ville",
    "airline": "Compagnie", "departure_date": "YYYY-MM-DD",
    "return_date": "YYYY-MM-DD", "price_fcfa": 0,
    "class": "Économique", "duration_estimate": "Xh"
  },
  "hotel_details": {
    "name": "Nom", "stars": 4, "neighborhood": "Quartier",
    "price_per_night_fcfa": 0, "total_nights": 0,
    "total_price_fcfa": 0, "review_score": 0,
    "photo_url": "", "booking_url": "",
    "highlights": [], "why_chosen": "Raison"
  },
  "daily_program": [
    { "day": 1, "theme": "Thème", "morning": "...", "lunch": "...", "afternoon": "...", "evening": "...", "insider_tip": "..." }
  ],
  "total_budget_fcfa": 0,
  "budget_breakdown": { "vol": 0, "hotel": 0, "activites_repas": 0 },
  "tagline": "Phrase d'accroche"
}`;

// ============================================================
// Helper : fetch avec timeout
// ============================================================
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

// ============================================================
// APPEL À L'API NVIDIA (DeepSeek)
// ============================================================
async function callNVIDIA(dealData: Record<string, unknown>, realHotel: RealHotel | null): Promise<Record<string, unknown> | null> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    console.error('[AI] ✗ NVIDIA_API_KEY manquante');
    return null;
  }

  const hotelSection = realHotel
    ? `HÔTEL RÉEL (NE PAS MODIFIER) :
- Nom : ${realHotel.name}
- ${realHotel.stars}★ — ${realHotel.neighborhood}
- ${realHotel.price_per_night_fcfa.toLocaleString()} FCFA/nuit × ${realHotel.total_nights} nuits = ${realHotel.total_price_fcfa.toLocaleString()} FCFA
- Note : ${realHotel.review_score}/10
- Photo : ${realHotel.photo_url}
- Lien : ${realHotel.booking_url}
- Points forts : ${realHotel.highlights.join(', ')}`
    : `PAS D'HÔTEL TROUVÉ. Mets "name":"Recherche en cours","stars":0,"price_per_night_fcfa":0.`;

  const userPrompt = `VOL : ${dealData.destination_name} (${dealData.destination}), ${dealData.airline_name}, départ ${dealData.departure_date}, retour ${dealData.return_date || '5 jours après'}, ${(dealData.price_fcfa as number)?.toLocaleString()} FCFA (-${dealData.discount_percent}%)

${hotelSection}

Génère l'itinéraire JSON.`;

  try {
    const response = await fetchWithTimeout(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: NVIDIA_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 4096,
          stream: false
        }),
      },
      45000 // 45 secondes max pour NVIDIA
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[AI] ✗ NVIDIA HTTP ${response.status}:`, errText.substring(0, 200));
      return null;
    }

    const result = await response.json();
    let rawText = result.choices?.[0]?.message?.content;

    if (!rawText) {
      console.error('[AI] ✗ Réponse NVIDIA vide.');
      return null;
    }

    // Nettoyer le formatage markdown
    rawText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      rawText = rawText.substring(firstBrace, lastBrace + 1);
    }

    return JSON.parse(rawText);

  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[AI] ✗ NVIDIA timeout (45s dépassées)');
    } else {
      console.error('[AI] ✗ Erreur NVIDIA:', err instanceof Error ? err.message : err);
    }
    return null;
  }
}

// ============================================================
// ROUTE API — GET /api/ai/generate-itinerary
// ============================================================
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  console.log('[AI] ═══════════════════════════════════════');
  console.log('[AI] Démarrage génération itinéraire IA...');

  // 1. Récupérer les deals non traités
  const { data: unprocessedDeals, error: fetchError } = await supabaseAdmin
    .from('detected_deals')
    .select('*')
    .eq('is_processed', false)
    .order('discount_percent', { ascending: false })
    .limit(MAX_DEALS_PER_RUN);

  if (fetchError) {
    console.error('[AI] ✗ Erreur récupération deals:', fetchError.message);
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!unprocessedDeals || unprocessedDeals.length === 0) {
    return NextResponse.json({ message: 'Aucun deal non traité.', processed: 0 });
  }

  const processedDestinations = [];
  let itinerariesCreatedCount = 0;

  for (const deal of unprocessedDeals) {
    console.log(`[AI] → Deal: ${deal.destination_name} (${deal.destination}) — ${deal.price_fcfa?.toLocaleString()} FCFA`);
    try {
      // ★ ÉTAPE 1 : Chercher un VRAI hôtel sur Booking.com (timeout 10s)
      let realHotel: RealHotel | null = null;
      const checkIn = deal.departure_date;
      const checkOut = deal.return_date || new Date(new Date(checkIn).getTime() + 5 * 86400000).toISOString().split('T')[0];

      try {
        console.log(`[AI] 🏨 Recherche hôtel Booking.com (max 10s)...`);
        const hotelPromise = fetchRealHotel(deal.destination, deal.destination_name, checkIn, checkOut);
        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 10000));
        realHotel = await Promise.race([hotelPromise, timeoutPromise]);
        
        if (realHotel) {
          console.log(`[AI] ✓ Hôtel: ${realHotel.name} (${realHotel.stars}★)`);
        } else {
          console.warn(`[AI] ⚠ Pas d'hôtel trouvé ou timeout. On continue sans.`);
        }
      } catch {
        console.warn('[AI] ⚠ Erreur recherche hôtel, on continue sans.');
      }

      // ★ ÉTAPE 2 : Appeler Llama 3.2 3B (timeout 45s)
      console.log(`[AI] 🤖 Appel Llama 3.2 (max 45s)...`);
      const itinerary = await callNVIDIA(deal, realHotel);

      if (!itinerary) {
        // Marquer le deal comme traité pour ne pas boucler dessus
        await supabaseAdmin.from('detected_deals').update({ is_processed: true }).eq('id', deal.id);
        console.error(`[AI] ✗ Échec génération IA pour ${deal.destination_name}`);
        continue;
      }

      // ★ ÉTAPE 3 : Forcer les données hôtel réelles (anti-hallucination)
      if (realHotel && itinerary.hotel_details) {
        const hd = itinerary.hotel_details as Record<string, unknown>;
        hd.name = realHotel.name;
        hd.stars = realHotel.stars;
        hd.neighborhood = realHotel.neighborhood;
        hd.price_per_night_fcfa = realHotel.price_per_night_fcfa;
        hd.total_nights = realHotel.total_nights;
        hd.total_price_fcfa = realHotel.total_price_fcfa;
        hd.review_score = realHotel.review_score;
        hd.photo_url = realHotel.photo_url;
        hd.booking_url = realHotel.booking_url;
        hd.highlights = realHotel.highlights;
        hd.source = 'booking.com';
      }

      // ★ ÉTAPE 4 : Sauvegarder dans Supabase
      const { error: insertError } = await supabaseAdmin
        .from('premium_itineraries')
        .upsert({
          deal_id: deal.id,
          destination: deal.destination,
          destination_name: deal.destination_name,
          flight_details: itinerary.flight_details || {},
          hotel_details: itinerary.hotel_details || {},
          daily_program: itinerary.daily_program || [],
          ai_model: NVIDIA_MODEL
        }, {
          onConflict: 'deal_id',
          ignoreDuplicates: false,
        });

      if (insertError) {
        console.error(`[AI] ✗ Erreur sauvegarde:`, insertError.message);
        continue;
      }

      // ★ ÉTAPE 5 : Marquer le deal comme traité
      await supabaseAdmin.from('detected_deals').update({ is_processed: true }).eq('id', deal.id);

      console.log(`[AI] ✓ Itinéraire créé pour ${deal.destination_name} !`);
      processedDestinations.push(deal.destination_name);
      itinerariesCreatedCount++;

    } catch (dealErr) {
      console.error(`[AI] Erreur pour le deal ${deal.destination_name}:`, dealErr);
      await supabaseAdmin.from('detected_deals').update({ is_processed: true }).eq('id', deal.id);
    }
  }

  return NextResponse.json({
    message: `Génération terminée pour : ${processedDestinations.join(', ')} !`,
    destinations: processedDestinations,
    timestamp: new Date().toISOString(),
    processed: unprocessedDeals.length,
    itineraries_created: itinerariesCreatedCount,
  });
}
