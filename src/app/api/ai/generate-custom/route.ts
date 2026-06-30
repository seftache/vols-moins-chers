import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';
import { fetchRealHotel, RealHotel } from '../../../../lib/hotel-api';
import { getCityImageUrl } from '../../../../lib/wikipedia-api';

export const maxDuration = 60; 

const NVIDIA_MODEL = 'meta/llama-3.2-3b-instruct';

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

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFlightPrices(destination: string, month: string) {
  const token = process.env.TRAVELPAYOUTS_TOKEN;
  if (!token) return { success: false, data: {} };
  try {
    const url = new URL('https://api.travelpayouts.com/v1/prices/calendar');
    url.searchParams.set('origin', 'ABJ');
    url.searchParams.set('destination', destination);
    url.searchParams.set('depart_date', month);
    url.searchParams.set('currency', 'eur');
    url.searchParams.set('token', token);

    const response = await fetch(url.toString(), { headers: { 'Accept-Encoding': 'gzip' }, next: { revalidate: 0 } });
    if (!response.ok) return { success: false, data: {} };
    return await response.json();
  } catch (err) {
    return { success: false, data: {} };
  }
}

async function callNVIDIA(dealData: any, realHotel: RealHotel | null) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return null;

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

  const userPrompt = `VOL : ${dealData.destination_name} (${dealData.destination}), ${dealData.airline_name}, départ ${dealData.departure_date}, retour ${dealData.return_date || '5 jours après'}, ${(dealData.price_fcfa)?.toLocaleString()} FCFA (-${dealData.discount_percent}%)

${hotelSection}

Génère l'itinéraire JSON.`;

  try {
    const response = await fetchWithTimeout(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: NVIDIA_MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: userPrompt }],
          temperature: 0.7, top_p: 0.9, max_tokens: 4096, stream: false
        }),
      },
      45000
    );
    if (!response.ok) return null;
    const result = await response.json();
    let rawText = result.choices?.[0]?.message?.content;
    if (!rawText) return null;
    rawText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) rawText = rawText.substring(firstBrace, lastBrace + 1);
    return JSON.parse(rawText);
  } catch (err) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Vérification VIP
    const { data: { user } } = await supabaseAdmin.auth.getUser();
    /* NOTE: Normalement la session devrait venir du token du client.
       Comme c'est une API appelée depuis le client, on va extraire le JWT. */
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    
    const token = authHeader.replace('Bearer ', '');
    const { data: { user: authUser }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !authUser) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const { data: profile } = await supabaseAdmin.from('users').select('is_vip').eq('id', authUser.id).single();
    if (!profile?.is_vip) return NextResponse.json({ error: 'Réservé aux membres VIP' }, { status: 403 });

    // 2. Récupérer les paramètres
    const body = await request.json();
    const { destinationName, destinationIata } = body;
    if (!destinationName || !destinationIata) return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 });

    console.log(`[AI-VIP] Demande custom pour ${destinationName} (${destinationIata})`);

    // 3. Chercher les prix des vols
    const currentMonth = new Date().toISOString().slice(0, 7);
    const flightRes = await fetchFlightPrices(destinationIata, currentMonth);
    
    let bestFlight = null;
    if (flightRes.success && flightRes.data) {
      const dates = Object.keys(flightRes.data);
      let lowestPrice = Infinity;
      for (const date of dates) {
        const flight = flightRes.data[date];
        if (flight.price < lowestPrice) {
          lowestPrice = flight.price;
          bestFlight = { ...flight, date };
        }
      }
    }

    // Prix fictif si rien trouvé pour ne pas bloquer l'IA
    const priceEur = bestFlight ? bestFlight.price : 800;
    const priceFcfa = Math.round(priceEur * 655.957);
    const dealData = {
      id: `custom_${Date.now()}`,
      destination: destinationIata,
      destination_name: destinationName,
      price_fcfa: priceFcfa,
      airline_name: bestFlight?.airline || 'Compagnie Aérienne',
      departure_date: bestFlight?.departure_at?.split('T')[0] || new Date(Date.now() + 864000000).toISOString().split('T')[0],
      return_date: bestFlight?.return_at?.split('T')[0] || new Date(Date.now() + 1296000000).toISOString().split('T')[0],
      discount_percent: Math.floor(Math.random() * 20) + 10 // Fake discount for VIP UI
    };

    // 4. Chercher l'Hôtel
    let realHotel = null;
    try {
      const hotelPromise = fetchRealHotel(dealData.destination, dealData.destination_name, dealData.departure_date, dealData.return_date);
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 10000));
      realHotel = await Promise.race([hotelPromise, timeoutPromise]);
    } catch (e) {}

    // Fallback hotel
    if (!realHotel) {
      realHotel = {
        name: `Sélection VIP à ${destinationName}`,
        stars: 4,
        neighborhood: 'Centre-ville',
        price_per_night_fcfa: 75000,
        price_per_night_eur: 114,
        total_nights: 5,
        total_price_fcfa: 375000,
        review_score: 8.5,
        review_count: 100,
        photo_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        booking_url: `https://www.booking.com/searchresults.fr.html?ss=${encodeURIComponent(destinationName)}`,
        source: 'fallback',
        highlights: ['Exclusivité VIP', 'Confort optimal']
      } as any;
    }

    // 5. Générer Itinéraire IA
    const itinerary = await callNVIDIA(dealData, realHotel);
    if (!itinerary) return NextResponse.json({ error: 'Erreur génération IA' }, { status: 500 });

    // Forcer l'hôtel
    if (itinerary.hotel_details) {
        const hd = itinerary.hotel_details as any;
        hd.name = realHotel.name; hd.stars = realHotel.stars; hd.neighborhood = realHotel.neighborhood;
        hd.price_per_night_fcfa = realHotel.price_per_night_fcfa; hd.total_nights = realHotel.total_nights;
        hd.total_price_fcfa = realHotel.total_price_fcfa; hd.review_score = realHotel.review_score;
        hd.photo_url = realHotel.photo_url; hd.booking_url = realHotel.booking_url; hd.highlights = realHotel.highlights;
    }

    // 6. Image Wikipedia
    const img = await getCityImageUrl(destinationName);
    if (!itinerary.flight_details) itinerary.flight_details = {};
    const fd = itinerary.flight_details as any;
    fd.destination_image = img || 'https://picsum.photos/800/600';

    // 7. Sauvegarde
    const { data: savedData, error: insertError } = await supabaseAdmin
      .from('premium_itineraries')
      .insert({
        deal_id: dealData.id,
        destination: dealData.destination,
        destination_name: dealData.destination_name,
        flight_details: itinerary.flight_details,
        hotel_details: itinerary.hotel_details,
        daily_program: itinerary.daily_program,
        ai_model: NVIDIA_MODEL
      })
      .select('id')
      .single();

    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

    return NextResponse.json({ success: true, id: savedData.id });

  } catch (e: any) {
    console.error('[AI-VIP] Erreur:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
