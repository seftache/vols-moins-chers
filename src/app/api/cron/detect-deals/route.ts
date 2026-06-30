import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

// ============================================================
// CONFIGURATION DES DESTINATIONS DEPUIS ABIDJAN (ABJ)
// ============================================================
const ORIGIN = 'ABJ';

const DESTINATIONS = [
  // Europe
  { code: 'CDG', name: 'Paris',        avgPriceFCFA: 530000 },
  { code: 'BRU', name: 'Bruxelles',    avgPriceFCFA: 550000 },
  { code: 'LHR', name: 'Londres',      avgPriceFCFA: 580000 },
  { code: 'GVA', name: 'Genève',       avgPriceFCFA: 600000 },
  { code: 'IST', name: 'Istanbul',     avgPriceFCFA: 450000 },
  { code: 'MAD', name: 'Madrid',       avgPriceFCFA: 480000 },
  { code: 'LIS', name: 'Lisbonne',     avgPriceFCFA: 450000 },
  { code: 'FCO', name: 'Rome',         avgPriceFCFA: 520000 },
  // Moyen-Orient & Asie
  { code: 'DXB', name: 'Dubaï',        avgPriceFCFA: 650000 },
  { code: 'NRT', name: 'Tokyo',        avgPriceFCFA: 950000 },
  { code: 'BKK', name: 'Bangkok',      avgPriceFCFA: 800000 },
  // Amérique du Nord
  { code: 'JFK', name: 'New York',     avgPriceFCFA: 850000 },
  { code: 'YUL', name: 'Montréal',     avgPriceFCFA: 900000 },
  { code: 'IAD', name: 'Washington',   avgPriceFCFA: 850000 },
  // Afrique
  { code: 'CMN', name: 'Casablanca',   avgPriceFCFA: 380000 },
  { code: 'DSS', name: 'Dakar',        avgPriceFCFA: 260000 },
  { code: 'TUN', name: 'Tunis',        avgPriceFCFA: 320000 },
  { code: 'CAI', name: 'Le Caire',     avgPriceFCFA: 480000 },
  { code: 'JNB', name: 'Johannesburg', avgPriceFCFA: 520000 },
  { code: 'BKO', name: 'Bamako',       avgPriceFCFA: 260000 },
  { code: 'DLA', name: 'Douala',       avgPriceFCFA: 380000 },
  { code: 'NSI', name: 'Yaoundé',      avgPriceFCFA: 380000 },
  { code: 'CKY', name: 'Conakry',      avgPriceFCFA: 250000 },
  { code: 'ACC', name: 'Accra',        avgPriceFCFA: 150000 },
  { code: 'LFW', name: 'Lomé',         avgPriceFCFA: 220000 },
  { code: 'COO', name: 'Cotonou',      avgPriceFCFA: 220000 },
];

// Seuil de détection : un deal est signalé si le prix est inférieur à ce %
const DEAL_THRESHOLD_PERCENT = 5; // 5% en dessous du prix moyen = bon plan

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
  'CDG': { name: 'Novotel Paris Centre',     price: 65000,  stars: 4 },
  'BRU': { name: 'Hotel NH Brussels Carrefour', price: 60000, stars: 4 },
  'LHR': { name: 'Premier Inn London City',  price: 55000,  stars: 3 },
  'GVA': { name: 'Design Hotel F6 Genève',   price: 80000,  stars: 3 },
  'IST': { name: 'DoubleTree by Hilton Istanbul', price: 50000, stars: 4 },
  'MAD': { name: 'Dear Hotel Madrid',        price: 55000,  stars: 4 },
  'LIS': { name: 'Turim Boulevard Hotel',    price: 60000,  stars: 4 },
  'FCO': { name: 'Rome Times Hotel',         price: 65000,  stars: 4 },
  'DXB': { name: 'Rove Downtown Dubai',     price: 55000,  stars: 3 },
  'NRT': { name: 'APA Hotel Shinjuku',       price: 35000,  stars: 3 },
  'BKK': { name: 'Nouvo City Hotel Bangkok', price: 25000,  stars: 4 },
  'JFK': { name: 'The Paul Hotel NYC',       price: 90000,  stars: 4 },
  'YUL': { name: 'HI Montréal Centre',       price: 40000,  stars: 3 },
  'IAD': { name: 'Club Quarters Washington', price: 80000,  stars: 4 },
  'CMN': { name: 'Barcelo Anfa Casablanca',  price: 60000,  stars: 5 },
  'DSS': { name: 'Radisson Blu Dakar',       price: 45000,  stars: 4 },
  'TUN': { name: 'Majestic Hotel Tunis',     price: 35000,  stars: 4 },
  'CAI': { name: 'Steigenberger El Tahrir',  price: 50000,  stars: 4 },
  'JNB': { name: 'Radisson Red Rosebank',    price: 45000,  stars: 4 },
  'BKO': { name: 'Azalai Hotel Bamako',      price: 45000,  stars: 4 },
  'DLA': { name: 'Onomo Hotel Douala',       price: 40000,  stars: 3 },
  'NSI': { name: 'Hilton Yaoundé',           price: 65000,  stars: 5 },
  'CKY': { name: 'Noom Hotel Conakry',       price: 60000,  stars: 4 },
  'ACC': { name: 'Movenpick Ambassador Accra', price: 90000, stars: 5 },
  'LFW': { name: 'Hotel 2 Février Lomé',     price: 80000,  stars: 5 },
  'COO': { name: 'Golden Tulip Cotonou',     price: 70000,  stars: 4 },
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
    console.warn(`[Travelpayouts] Token manquant.`);
    return { success: false, data: {} };
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
      return { success: false, data: {} };
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.warn(`[Travelpayouts] Erreur réseau pour ${destination}:`, err);
    return { success: false, data: {} };
  }
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
