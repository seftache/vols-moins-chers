import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

// ============================================================
// CONFIGURATION DES DESTINATIONS DEPUIS ABIDJAN (ABJ)
// ============================================================
const ORIGIN = 'ABJ';

const DESTINATIONS = [
  { code: 'DXB', name: 'Dubaï',    avgPriceFCFA: 450000 },
  { code: 'CDG', name: 'Paris',     avgPriceFCFA: 380000 },
  { code: 'DSS', name: 'Dakar',     avgPriceFCFA: 180000 },
  { code: 'YUL', name: 'Montréal',  avgPriceFCFA: 650000 },
  { code: 'LHR', name: 'Londres',   avgPriceFCFA: 420000 },
  { code: 'NRT', name: 'Tokyo',     avgPriceFCFA: 780000 },
];

// Seuil de détection : un deal est signalé si le prix est inférieur à ce %
const DEAL_THRESHOLD_PERCENT = 20; // 20% en dessous du prix moyen = bon plan

// Taux de conversion EUR → FCFA
const EUR_TO_FCFA = 656;

// Noms des compagnies aériennes courantes
const AIRLINE_NAMES: Record<string, string> = {
  'ET': 'Ethiopian Airlines', 'AF': 'Air France', 'TK': 'Turkish Airlines',
  'QR': 'Qatar Airways', 'EK': 'Emirates', 'KQ': 'Kenya Airways',
  'AT': 'Royal Air Maroc', 'W3': 'Arik Air', 'HF': 'Air Côte d\'Ivoire',
  'KL': 'KLM', 'LH': 'Lufthansa', 'BA': 'British Airways',
  'SN': 'Brussels Airlines', 'TP': 'TAP Portugal', 'MS': 'EgyptAir',
  'RW': 'Rwandair', 'WB': 'Rwandair', 'SA': 'South African Airways',
};

// Hôtels types par destination (simulation réaliste)
const SAMPLE_HOTELS: Record<string, { name: string; price: number; stars: number }> = {
  'DXB': { name: 'Rove Downtown Dubai',     price: 55000,  stars: 3 },
  'CDG': { name: 'Novotel Paris Centre',     price: 65000,  stars: 4 },
  'DSS': { name: 'Radisson Blu Dakar',       price: 45000,  stars: 4 },
  'YUL': { name: 'HI Montréal Centre',       price: 40000,  stars: 3 },
  'LHR': { name: 'Premier Inn London City',  price: 50000,  stars: 3 },
  'NRT': { name: 'APA Hotel Shinjuku',       price: 35000,  stars: 3 },
};

// ============================================================
// FONCTIONS UTILITAIRES
// ============================================================

/** Génère les 3 prochains mois sous forme YYYY-MM */
function getNext3Months(): string[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = 0; i < 3; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return months;
}

/**
 * Interroge l'API Travelpayouts (Aviasales) — endpoint "prices for dates"
 * API 100% gratuite avec un token.
 * Docs: https://support.travelpayouts.com/hc/en-us/articles/203956163
 */
async function fetchFlightPrices(
  destination: string,
  month: string
): Promise<{
  success: boolean;
  data: Record<string, {
    price: number;
    airline: string;
    departure_at: string;
    return_at: string;
    expires_at: string;
  }>;
}> {
  const token = process.env.TRAVELPAYOUTS_TOKEN;

  if (!token) {
    // Mode simulation si pas de token configuré
    return simulateFlightPrices(destination, month);
  }

  try {
    const url = new URL('https://api.travelpayouts.com/v1/prices/calendar');
    url.searchParams.set('origin', ORIGIN);
    url.searchParams.set('destination', destination);
    url.searchParams.set('depart_date', month);
    url.searchParams.set('currency', 'eur');
    url.searchParams.set('token', token);

    const response = await fetch(url.toString(), {
      headers: { 'Accept-Encoding': 'gzip' },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.warn(`[Travelpayouts] ${response.status} pour ${ORIGIN}->${destination}`);
      return simulateFlightPrices(destination, month);
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.warn(`[Travelpayouts] Erreur réseau pour ${destination}:`, err);
    return simulateFlightPrices(destination, month);
  }
}

/**
 * Simulation réaliste de prix de vols — utilisée en mode dev
 * ou quand l'API Travelpayouts n'a pas de données pour ABJ.
 * Génère des prix réalistes avec des fluctuations et quelques "deals".
 */
function simulateFlightPrices(
  destination: string,
  month: string
): {
  success: boolean;
  data: Record<string, {
    price: number;
    airline: string;
    departure_at: string;
    return_at: string;
    expires_at: string;
  }>;
} {
  const dest = DESTINATIONS.find(d => d.code === destination);
  if (!dest) return { success: false, data: {} };

  const airlines = Object.keys(AIRLINE_NAMES);
  const data: Record<string, {
    price: number;
    airline: string;
    departure_at: string;
    return_at: string;
    expires_at: string;
  }> = {};

  const [year, monthNum] = month.split('-').map(Number);
  const daysInMonth = new Date(year, monthNum, 0).getDate();

  // Générer entre 8 et 15 offres pour ce mois
  const numOffers = 8 + Math.floor(Math.random() * 8);

  for (let i = 0; i < numOffers; i++) {
    const day = 1 + Math.floor(Math.random() * daysInMonth);
    const dateStr = `${month}-${String(day).padStart(2, '0')}`;

    // Prix avec variation aléatoire (±35% autour du prix moyen)
    const variation = 0.65 + Math.random() * 0.7; // entre 0.65 et 1.35
    const basePriceEUR = Math.round((dest.avgPriceFCFA * variation) / EUR_TO_FCFA);

    // 20% de chance de créer un "deal" vraiment bas (pour tester la détection)
    const isDeal = Math.random() < 0.20;
    const finalPriceEUR = isDeal
      ? Math.round(basePriceEUR * (0.55 + Math.random() * 0.15)) // 55-70% du prix
      : basePriceEUR;

    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const returnDay = day + 5 + Math.floor(Math.random() * 10); // 5 à 14 jours

    const key = `${dateStr}_${airline}`;
    data[key] = {
      price: finalPriceEUR,
      airline,
      departure_at: `${dateStr}T00:00:00Z`,
      return_at: `${month}-${String(Math.min(returnDay, daysInMonth)).padStart(2, '0')}T00:00:00Z`,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  return { success: true, data };
}

// ============================================================
// ROUTE API PRINCIPALE — GET /api/cron/detect-deals
// ============================================================

export async function GET(request: NextRequest) {
  // Sécurité : vérifier le secret CRON pour empêcher les appels non autorisés
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Non autorisé. CRON_SECRET invalide.' },
      { status: 401 }
    );
  }

  console.log('[CRON] ═══════════════════════════════════════');
  console.log('[CRON] Démarrage de la détection de deals...');
  console.log('[CRON] Origine:', ORIGIN);
  console.log('[CRON] Destinations:', DESTINATIONS.map(d => d.code).join(', '));

  const months = getNext3Months();
  console.log('[CRON] Mois scannés:', months.join(', '));

  const results = {
    scanned: 0,
    deals_found: 0,
    deals_inserted: 0,
    duplicates_skipped: 0,
    errors: [] as string[],
  };

  // Scanner chaque destination x chaque mois
  for (const dest of DESTINATIONS) {
    for (const month of months) {
      try {
        console.log(`[CRON] Scan ${ORIGIN} → ${dest.code} (${dest.name}) — ${month}`);

        const response = await fetchFlightPrices(dest.code, month);
        results.scanned++;

        if (!response.success || !response.data) {
          console.log(`[CRON]   ⚠ Pas de données pour ${dest.code} en ${month}`);
          continue;
        }

        const entries = Object.values(response.data);
        console.log(`[CRON]   ${entries.length} vols trouvés`);

        for (const flight of entries) {
          const priceFCFA = Math.round(flight.price * EUR_TO_FCFA);
          const discountPercent = ((dest.avgPriceFCFA - priceFCFA) / dest.avgPriceFCFA) * 100;

          // Ne garder QUE les deals qui dépassent le seuil de réduction
          if (discountPercent < DEAL_THRESHOLD_PERCENT) continue;

          results.deals_found++;

          const hotel = SAMPLE_HOTELS[dest.code];

          // Trouver le prix minimum pour cette route pour marquer le plus bas
          const allPricesForRoute = entries.map(e => Math.round(e.price * EUR_TO_FCFA));
          const isLowest = priceFCFA <= Math.min(...allPricesForRoute);

          const deal = {
            origin: ORIGIN,
            destination: dest.code,
            destination_name: dest.name,
            airline: flight.airline,
            airline_name: AIRLINE_NAMES[flight.airline] || flight.airline,
            departure_date: flight.departure_at.split('T')[0],
            return_date: flight.return_at ? flight.return_at.split('T')[0] : null,
            price_fcfa: priceFCFA,
            currency: 'XOF',
            average_price_fcfa: dest.avgPriceFCFA,
            discount_percent: Math.round(discountPercent * 100) / 100,
            is_lowest_price: isLowest,
            hotel_name: hotel?.name || null,
            hotel_price_fcfa: hotel?.price || null,
            hotel_stars: hotel?.stars || null,
            is_processed: false,
            is_sent: false,
            source: process.env.TRAVELPAYOUTS_TOKEN ? 'travelpayouts' : 'simulation',
            raw_data: flight,
          };

          // Insérer dans Supabase (ignorer les doublons grâce à la contrainte UNIQUE)
          const { error: insertError } = await supabaseAdmin
            .from('detected_deals')
            .upsert(deal, {
              onConflict: 'destination,departure_date,price_fcfa,airline',
              ignoreDuplicates: true,
            });

          if (insertError) {
            if (insertError.code === '23505') {
              results.duplicates_skipped++;
            } else {
              console.error(`[CRON]   ✗ Erreur insert:`, insertError.message);
              results.errors.push(`${dest.code}: ${insertError.message}`);
            }
          } else {
            results.deals_inserted++;
            console.log(
              `[CRON]   ✓ DEAL! ${dest.name} — ${priceFCFA.toLocaleString()} FCFA ` +
              `(-${discountPercent.toFixed(0)}%) — ${AIRLINE_NAMES[flight.airline] || flight.airline} ` +
              `le ${flight.departure_at.split('T')[0]}`
            );
          }
        }

        // Petit délai entre les appels pour respecter le rate limit de l'API
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erreur inconnue';
        results.errors.push(`${dest.code}/${month}: ${msg}`);
        console.error(`[CRON] ✗ Erreur globale ${dest.code}:`, msg);
      }
    }
  }

  console.log('[CRON] ═══════════════════════════════════════');
  console.log('[CRON] Résultats:', JSON.stringify(results, null, 2));
  console.log('[CRON] Terminé ✓');

  return NextResponse.json({
    message: 'Détection de deals terminée.',
    timestamp: new Date().toISOString(),
    ...results,
  });
}
