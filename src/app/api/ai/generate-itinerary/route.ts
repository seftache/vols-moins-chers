import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';
import { fetchRealHotel, RealHotel } from '../../../../lib/hotel-api';

// ============================================================
// CONFIGURATION NVIDIA / DEEPSEEK
// ============================================================
const NVIDIA_MODEL = 'deepseek-ai/deepseek-v4-flash';
const MAX_DEALS_PER_RUN = 10; // Traiter 10 deals maximum par appel

const SYSTEM_PROMPT = `Tu es le concierge virtuel premium d'UniqueVoyage. On te fournit un VOL RÉEL et un HÔTEL RÉEL (issu de Booking.com). Tu NE DOIS PAS inventer ni modifier le nom, le prix ou les étoiles de l'hôtel. Utilise exactement les données qu'on te donne.

Ta mission : rédiger un programme de séjour jour par jour, élégant et premium, autour de cet hôtel réel. Le ton doit être inspirant, soigné et haut de gamme.

RÈGLES STRICTES :
- Réponds UNIQUEMENT en JSON valide, sans balises markdown, juste l'objet JSON pur.
- NE MODIFIE JAMAIS le nom, le prix ou les étoiles de l'hôtel. Copie-les tels quels.
- Le programme journalier doit être réaliste et adapté à la destination ET au quartier de l'hôtel.
- Propose des activités variées : culturelles, gastronomiques, détente, et exclusives.
- Chaque jour doit avoir un thème.

FORMAT DE RÉPONSE EXACT (JSON) :
{
  "flight_details": {
    "origin": "ABJ",
    "origin_name": "Abidjan",
    "destination": "CODE_IATA",
    "destination_name": "Nom de la ville",
    "airline": "Nom de la compagnie",
    "departure_date": "YYYY-MM-DD",
    "return_date": "YYYY-MM-DD",
    "price_fcfa": 000000,
    "class": "Économique",
    "duration_estimate": "Xh XXmin"
  },
  "hotel_details": {
    "name": "EXACTEMENT le nom fourni",
    "stars": 4,
    "neighborhood": "Quartier fourni",
    "price_per_night_fcfa": 00000,
    "total_nights": 0,
    "total_price_fcfa": 000000,
    "review_score": 0,
    "photo_url": "URL fournie",
    "booking_url": "URL fournie",
    "highlights": ["Les highlights fournis"],
    "why_chosen": "Explication courte et élégante de pourquoi cet hôtel est parfait"
  },
  "daily_program": [
    {
      "day": 1,
      "theme": "Thème du jour",
      "morning": "Description de l'activité du matin",
      "lunch": "Restaurant ou expérience culinaire suggérée",
      "afternoon": "Description de l'activité de l'après-midi",
      "evening": "Description de la soirée",
      "insider_tip": "Conseil de connaisseur exclusif"
    }
  ],
  "total_budget_fcfa": 000000,
  "budget_breakdown": {
    "vol": 000000,
    "hotel": 000000,
    "activites_repas": 000000
  },
  "tagline": "Une phrase d'accroche inspirante pour ce séjour"
}`;

// ============================================================
// APPEL À L'API NVIDIA (DeepSeek)
// ============================================================
async function callNVIDIA(dealData: Record<string, unknown>, realHotel: RealHotel | null): Promise<Record<string, unknown> | null> {
  const apiKey = process.env.NVIDIA_API_KEY;

  if (!apiKey) {
    console.error('[AI] ✗ NVIDIA_API_KEY manquante dans .env.local');
    return null;
  }

  const hotelSection = realHotel
    ? `HÔTEL RÉEL (BOOKING.COM — NE PAS MODIFIER) :
- Nom exact : ${realHotel.name}
- Étoiles : ${realHotel.stars}★
- Quartier : ${realHotel.neighborhood}
- Prix par nuit : ${realHotel.price_per_night_fcfa.toLocaleString()} FCFA (${realHotel.price_per_night_eur}€)
- Nombre de nuits : ${realHotel.total_nights}
- Prix total hôtel : ${realHotel.total_price_fcfa.toLocaleString()} FCFA
- Note : ${realHotel.review_score}/10 (${realHotel.review_count} avis)
- Photo : ${realHotel.photo_url}
- Lien réservation : ${realHotel.booking_url}
- Points forts : ${realHotel.highlights.join(', ')}
- Source : Booking.com (données certifiées)`
    : `HÔTEL : Aucun hôtel réel trouvé sur Booking.com. NE GÉNÈRE PAS de faux hôtel. Mets "name": "Recherche en cours", "stars": 0, "price_per_night_fcfa": 0.`;

  const userPrompt = `Voici un vol à prix cassé détecté par notre algorithme ET un hôtel réel trouvé sur Booking.com. Génère l'itinéraire premium.

DONNÉES DU VOL :
- Origine : Abidjan (ABJ)
- Destination : ${dealData.destination_name} (${dealData.destination})
- Compagnie : ${dealData.airline_name} (${dealData.airline})
- Date de départ : ${dealData.departure_date}
- Date de retour : ${dealData.return_date || 'Non spécifiée (propose 5 à 7 jours)'}
- Prix du vol : ${(dealData.price_fcfa as number)?.toLocaleString()} FCFA
- Réduction : -${dealData.discount_percent}% par rapport au prix moyen (${(dealData.average_price_fcfa as number)?.toLocaleString()} FCFA)

${hotelSection}

Génère l'itinéraire premium au format JSON spécifié. RAPPEL : NE MODIFIE PAS les données de l'hôtel.`;

  try {
    const url = 'https://integrate.api.nvidia.com/v1/chat/completions';

    const response = await fetch(url, {
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
        temperature: 1,
        top_p: 0.95,
        max_tokens: 16384,
        extra_body: {
          chat_template_kwargs: {
            thinking: true,
            reasoning_effort: "high"
          }
        },
        stream: false
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[AI] ✗ NVIDIA HTTP ${response.status}:`, errText);
      return null;
    }

    const result = await response.json();

    // Extraire le texte JSON de la réponse
    let rawText = result.choices?.[0]?.message?.content;

    if (!rawText) {
      console.error('[AI] ✗ Réponse NVIDIA vide ou malformée.');
      return null;
    }

    // Nettoyer le formatage markdown éventuel (```json ... ```)
    rawText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    // Parfois deepseek ajoute des trucs bizarres, s'assurer qu'on commence bien par {
    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      rawText = rawText.substring(firstBrace, lastBrace + 1);
    }

    // Parser le JSON
    const parsed = JSON.parse(rawText);
    return parsed;

  } catch (err) {
    console.error('[AI] ✗ Erreur appel NVIDIA:', err instanceof Error ? err.message : err);
    return null;
  }
}

// ============================================================
// ROUTE API — GET /api/ai/generate-itinerary
// ============================================================
export async function GET(request: NextRequest) {
  // Sécurité optionnelle
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  console.log('[AI] ═══════════════════════════════════════');
  console.log('[AI] Démarrage de la génération d\'itinéraires IA (DeepSeek NVIDIA)...');

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
    console.log('[AI] Aucun deal non traité trouvé.');
    return NextResponse.json({
      message: 'Aucun deal non traité à transformer.',
      processed: 0,
    });
  }

  console.log(`[AI] ${unprocessedDeals.length} deals non traités trouvés.`);

  const results = {
    processed: 0,
    itineraries_created: 0,
    errors: [] as string[],
  };

  // 2. Pour chaque deal, appeler DeepSeek et sauvegarder
  for (const deal of unprocessedDeals) {
    try {
      console.log(`[AI] → Traitement: ${deal.destination_name} (${deal.destination}) — ${deal.price_fcfa?.toLocaleString()} FCFA — ${deal.airline_name}`);

      // ★ ÉTAPE 1 : Chercher un VRAI hôtel sur Booking.com
      const checkIn = deal.departure_date;
      const checkOut = deal.return_date || new Date(new Date(checkIn).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      console.log(`[AI] 🏨 Recherche hôtel Booking.com pour ${deal.destination_name}...`);
      const realHotel = await fetchRealHotel(deal.destination, deal.destination_name, checkIn, checkOut);
      
      if (realHotel) {
        console.log(`[AI] ✓ Hôtel réel trouvé: ${realHotel.name} (${realHotel.stars}★) — ${realHotel.price_per_night_fcfa} FCFA/nuit`);
      } else {
        console.warn(`[AI] ⚠ Aucun hôtel Booking.com trouvé pour ${deal.destination_name}. L'IA ne créera pas de faux hôtel.`);
      }

      // ★ ÉTAPE 2 : Appeler NVIDIA (DeepSeek) avec le vrai hôtel
      const itinerary = await callNVIDIA(deal, realHotel);

      if (!itinerary) {
        results.errors.push(`${deal.destination}: Échec NVIDIA`);
        continue;
      }

      // ★ ÉTAPE 3 : Forcer les données de l'hôtel réel dans l'itinéraire (sécurité anti-hallucination)
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

      // 3. Sauvegarder l'itinéraire dans premium_itineraries
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
        console.error(`[AI] ✗ Erreur sauvegarde itinéraire:`, insertError.message);
        results.errors.push(`${deal.destination}: ${insertError.message}`);
        continue;
      }

      // 4. Marquer le deal comme traité
      const { error: updateError } = await supabaseAdmin
        .from('detected_deals')
        .update({ is_processed: true })
        .eq('id', deal.id);

      if (updateError) {
        console.error(`[AI] ✗ Erreur update is_processed:`, updateError.message);
        results.errors.push(`${deal.destination}: update failed`);
        continue;
      }

      results.itineraries_created++;
      console.log(`[AI] ✓ Itinéraire créé pour ${deal.destination_name} !`);

      // Déclenchement de l'envoi des emails
      try {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        await fetch(`${appUrl}/api/notify-users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CRON_SECRET}`
          },
          body: JSON.stringify({
            destination: deal.destination_name,
            price: deal.price_fcfa,
            url: `${appUrl}/itinerary/${itinerary.id}`
          })
        });
        console.log(`[AI] ✉️ Alertes emails envoyées avec succès pour ${deal.destination_name}`);
      } catch (notifyErr) {
        console.error(`[AI] ✗ Échec de l'envoi des emails:`, notifyErr);
      }

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      results.errors.push(`${deal.destination}: ${msg}`);
      console.error(`[AI] ✗ Erreur globale pour ${deal.destination}:`, msg);
    }

    results.processed++;

    // Petit délai entre les appels pour respecter le rate limit de NVIDIA
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('[AI] ═══════════════════════════════════════');
  console.log('[AI] Résultats:', JSON.stringify(results, null, 2));
  console.log('[AI] Terminé ✓');

  return NextResponse.json({
    message: 'Génération d\'itinéraires (NVIDIA DeepSeek) terminée.',
    timestamp: new Date().toISOString(),
    ...results,
  });
}
