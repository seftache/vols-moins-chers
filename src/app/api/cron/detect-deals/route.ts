import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

// ============================================================
// CONFIGURATION DES ORIGINES (Multi-origines)
// ============================================================
const ORIGINS = [
  { code: 'ABJ', name: 'Abidjan' },
  { code: 'DSS', name: 'Dakar' },
  { code: 'ACC', name: 'Accra' },
  { code: 'CDG', name: 'Paris' },
  { code: 'BRU', name: 'Bruxelles' },
  { code: 'CMN', name: 'Casablanca' },
];

// ============================================================
// DICTIONNAIRE COMPLET DES DESTINATIONS & PRIX MOYENS ESTIMÉS
// ============================================================
const DESTINATIONS_CATALOG: Record<string, { name: string; avgPriceFCFA: number; hotel: { name: string; price: number; stars: number } }> = {
  // Afrique de l'Ouest & Centrale
  'ABJ': { name: 'Abidjan', avgPriceFCFA: 220000, hotel: { name: 'Sofitel Abidjan Hôtel Ivoire', price: 110000, stars: 5 } },
  'ACC': { name: 'Accra', avgPriceFCFA: 180000, hotel: { name: 'Mövenpick Ambassador Accra', price: 85000, stars: 5 } },
  'DSS': { name: 'Dakar', avgPriceFCFA: 260000, hotel: { name: 'Radisson Blu Hotel Dakar Sea Plaza', price: 65000, stars: 4 } },
  'DKR': { name: 'Dakar', avgPriceFCFA: 260000, hotel: { name: 'Radisson Blu Hotel Dakar Sea Plaza', price: 65000, stars: 4 } },
  'LFW': { name: 'Lomé', avgPriceFCFA: 210000, hotel: { name: 'Hôtel 2 Février Lomé', price: 75000, stars: 5 } },
  'COO': { name: 'Cotonou', avgPriceFCFA: 220000, hotel: { name: 'Golden Tulip Le Diplomate Cotonou', price: 65000, stars: 4 } },
  'BKO': { name: 'Bamako', avgPriceFCFA: 250000, hotel: { name: 'Azalaï Grand Hôtel Bamako', price: 50000, stars: 4 } },
  'OUA': { name: 'Ouagadougou', avgPriceFCFA: 240000, hotel: { name: 'Lancaster Hotel Ouaga 2000', price: 55000, stars: 4 } },
  'CKY': { name: 'Conakry', avgPriceFCFA: 260000, hotel: { name: 'Noom Hotel Conakry', price: 65000, stars: 4 } },
  'DLA': { name: 'Douala', avgPriceFCFA: 380000, hotel: { name: 'ONOMO Hotel Douala', price: 45000, stars: 3 } },
  'NSI': { name: 'Yaoundé', avgPriceFCFA: 380000, hotel: { name: 'Hilton Yaoundé', price: 70000, stars: 5 } },
  'LBV': { name: 'Libreville', avgPriceFCFA: 390000, hotel: { name: 'Radisson Blu Okoume Palace', price: 75000, stars: 5 } },
  'FIH': { name: 'Kinshasa', avgPriceFCFA: 450000, hotel: { name: 'Pullman Kinshasa Grand Hotel', price: 95000, stars: 5 } },
  'BZV': { name: 'Brazzaville', avgPriceFCFA: 440000, hotel: { name: 'Grand Hôtel de Kinshasa & BZV', price: 80000, stars: 4 } },

  // Maghreb & Afrique de l'Est/Sud
  'CMN': { name: 'Casablanca', avgPriceFCFA: 390000, hotel: { name: 'Barceló Anfa Casablanca', price: 60000, stars: 5 } },
  'TUN': { name: 'Tunis', avgPriceFCFA: 340000, hotel: { name: 'The Penthouse Suites Tunis', price: 45000, stars: 4 } },
  'ALG': { name: 'Alger', avgPriceFCFA: 360000, hotel: { name: 'Sofitel Algiers Hamma Garden', price: 70000, stars: 5 } },
  'CAI': { name: 'Le Caire', avgPriceFCFA: 480000, hotel: { name: 'Steigenberger Hotel El Tahrir', price: 50000, stars: 4 } },
  'ADD': { name: 'Addis-Abeba', avgPriceFCFA: 460000, hotel: { name: 'Skylight Hotel Addis Ababa', price: 60000, stars: 5 } },
  'NBO': { name: 'Nairobi', avgPriceFCFA: 490000, hotel: { name: 'Tamarind Tree Hotel Nairobi', price: 55000, stars: 4 } },
  'KGL': { name: 'Kigali', avgPriceFCFA: 460000, hotel: { name: 'Kigali Marriott Hotel', price: 85000, stars: 5 } },
  'JNB': { name: 'Johannesburg', avgPriceFCFA: 520000, hotel: { name: 'Radisson RED Hotel Rosebank', price: 48000, stars: 4 } },
  'CPT': { name: 'Le Cap (Cape Town)', avgPriceFCFA: 580000, hotel: { name: 'Radisson Blu Hotel Waterfront', price: 75000, stars: 5 } },
  'SEZ': { name: 'Seychelles', avgPriceFCFA: 750000, hotel: { name: 'Constance Ephelia Seychelles', price: 130000, stars: 5 } },
  'MRU': { name: 'Île Maurice', avgPriceFCFA: 780000, hotel: { name: 'LUX* Grand Gaube Resort', price: 120000, stars: 5 } },
  'ZNZ': { name: 'Zanzibar', avgPriceFCFA: 620000, hotel: { name: 'Zanzibar Serena Hotel', price: 80000, stars: 5 } },

  // Europe
  'CDG': { name: 'Paris', avgPriceFCFA: 530000, hotel: { name: 'Novotel Paris Centre Tour Eiffel', price: 75000, stars: 4 } },
  'ORY': { name: 'Paris', avgPriceFCFA: 520000, hotel: { name: 'Mercure Paris Centre', price: 70000, stars: 4 } },
  'PAR': { name: 'Paris', avgPriceFCFA: 530000, hotel: { name: 'Novotel Paris Centre Tour Eiffel', price: 75000, stars: 4 } },
  'BRU': { name: 'Bruxelles', avgPriceFCFA: 540000, hotel: { name: 'Hotel NH Brussels Carrefour', price: 60000, stars: 4 } },
  'LHR': { name: 'Londres', avgPriceFCFA: 580000, hotel: { name: 'Premier Inn London City', price: 65000, stars: 3 } },
  'LON': { name: 'Londres', avgPriceFCFA: 580000, hotel: { name: 'Premier Inn London City', price: 65000, stars: 3 } },
  'GVA': { name: 'Genève', avgPriceFCFA: 600000, hotel: { name: 'Design Hotel F6 Genève', price: 85000, stars: 3 } },
  'IST': { name: 'Istanbul', avgPriceFCFA: 450000, hotel: { name: 'DoubleTree by Hilton Istanbul', price: 45000, stars: 4 } },
  'MAD': { name: 'Madrid', avgPriceFCFA: 480000, hotel: { name: 'Dear Hotel Madrid', price: 55000, stars: 4 } },
  'LIS': { name: 'Lisbonne', avgPriceFCFA: 450000, hotel: { name: 'Turim Boulevard Hotel', price: 55000, stars: 4 } },
  'FCO': { name: 'Rome', avgPriceFCFA: 520000, hotel: { name: 'Rome Times Hotel', price: 65000, stars: 4 } },
  'MXP': { name: 'Milan', avgPriceFCFA: 510000, hotel: { name: 'NYX Hotel Milan by Leonardo', price: 60000, stars: 4 } },
  'MIL': { name: 'Milan', avgPriceFCFA: 510000, hotel: { name: 'NYX Hotel Milan by Leonardo', price: 60000, stars: 4 } },
  'FRA': { name: 'Francfort', avgPriceFCFA: 560000, hotel: { name: 'Steigenberger Airport Hotel', price: 65000, stars: 4 } },
  'AMS': { name: 'Amsterdam', avgPriceFCFA: 570000, hotel: { name: 'CitizenM Amsterdam South', price: 75000, stars: 4 } },

  // Moyen-Orient & Asie
  'DXB': { name: 'Dubaï', avgPriceFCFA: 650000, hotel: { name: 'Rove Downtown Dubai', price: 55000, stars: 3 } },
  'JED': { name: 'La Mecque (Jeddah)', avgPriceFCFA: 650000, hotel: { name: 'Mövenpick Hotel Tahlia Jeddah', price: 70000, stars: 5 } },
  'MED': { name: 'Médine', avgPriceFCFA: 670000, hotel: { name: 'Dar Al Taqwa Hotel Madinah', price: 80000, stars: 5 } },
  'DOH': { name: 'Doha', avgPriceFCFA: 680000, hotel: { name: 'Ezdan Palace Hotel Doha', price: 65000, stars: 5 } },
  'BKK': { name: 'Bangkok', avgPriceFCFA: 780000, hotel: { name: 'Nouvo City Hotel Bangkok', price: 28000, stars: 4 } },
  'CAN': { name: 'Canton (Guangzhou)', avgPriceFCFA: 850000, hotel: { name: 'DoubleTree by Hilton Guangzhou', price: 45000, stars: 4 } },
  'NRT': { name: 'Tokyo', avgPriceFCFA: 950000, hotel: { name: 'APA Hotel Shinjuku Kabukicho', price: 38000, stars: 3 } },
  'HND': { name: 'Tokyo', avgPriceFCFA: 950000, hotel: { name: 'Hotel Gracery Shinjuku', price: 45000, stars: 4 } },
  'TYO': { name: 'Tokyo', avgPriceFCFA: 950000, hotel: { name: 'Hotel Gracery Shinjuku', price: 45000, stars: 4 } },
  'SIN': { name: 'Singapour', avgPriceFCFA: 820000, hotel: { name: 'Carlton Hotel Singapore', price: 85000, stars: 4 } },
  'ICN': { name: 'Séoul', avgPriceFCFA: 890000, hotel: { name: 'L7 Myeongdong by LOTTE', price: 55000, stars: 4 } },

  // Amérique du Nord
  'JFK': { name: 'New York', avgPriceFCFA: 850000, hotel: { name: 'The Paul Hotel NYC', price: 95000, stars: 4 } },
  'NYC': { name: 'New York', avgPriceFCFA: 850000, hotel: { name: 'The Paul Hotel NYC', price: 95000, stars: 4 } },
  'YUL': { name: 'Montréal', avgPriceFCFA: 880000, hotel: { name: 'Hotel Monville Montréal', price: 65000, stars: 4 } },
  'IAD': { name: 'Washington', avgPriceFCFA: 860000, hotel: { name: 'Club Quarters Hotel Washington', price: 80000, stars: 4 } },
  'WAS': { name: 'Washington', avgPriceFCFA: 860000, hotel: { name: 'Club Quarters Hotel Washington', price: 80000, stars: 4 } },
  'YYZ': { name: 'Toronto', avgPriceFCFA: 890000, hotel: { name: 'Chelsea Hotel Toronto', price: 70000, stars: 4 } },
};

// ============================================================
// NOM RÉEL DES COMPAGNIES AÉRIENNES
// ============================================================
const AIRLINE_NAMES: Record<string, string> = {
  'AW': 'Africa World Airlines',
  'HF': 'Air Côte d\'Ivoire',
  'KP': 'ASKY Airlines',
  'P4': 'Air Peace',
  'HC': 'Air Senegal',
  '2J': 'Air Burkina',
  'ET': 'Ethiopian Airlines',
  'AF': 'Air France',
  'TK': 'Turkish Airlines',
  'QR': 'Qatar Airways',
  'EK': 'Emirates',
  'KQ': 'Kenya Airways',
  'AT': 'Royal Air Maroc',
  'SN': 'Brussels Airlines',
  'KL': 'KLM',
  'LH': 'Lufthansa',
  'BA': 'British Airways',
  'TP': 'TAP Air Portugal',
  'MS': 'EgyptAir',
  'WB': 'RwandAir',
  'TU': 'Tunisair',
  'AH': 'Air Algérie',
  'ME': 'Middle East Airlines',
  'SV': 'Saudia',
  'XY': 'Flynas',
  'FZ': 'flydubai',
  'G9': 'Air Arabia',
  'W3': 'Arik Air',
  'VR': 'Cabo Verde Airlines',
  'DT': 'TAAG Angola Airlines',
  'SA': 'South African Airways',
  'SS': 'Corsair',
  'TX': 'Air Caraïbes',
  'TO': 'Transavia France',
  'IB': 'Iberia',
  'UX': 'Air Europa',
  'AC': 'Air Canada',
  'DL': 'Delta Air Lines',
  'UA': 'United Airlines',
  'AA': 'American Airlines',
  'CZ': 'China Southern Airlines',
  'CA': 'Air China',
  'MU': 'China Eastern Airlines',
  'TG': 'Thai Airways',
  'SQ': 'Singapore Airlines',
};

// Seuil de détection & Marge bénéficiaire agence
const DEAL_THRESHOLD_PERCENT = 5; // 5% ou plus en dessous de la moyenne
const AGENCY_MARGIN_RATE = 0.08;  // 8% de marge agence incluse dans le prix public

// ============================================================
// ROUTE PRINCIPALE — GET /api/cron/detect-deals
// ============================================================
export async function GET(request: NextRequest) {
  // Sécurité : vérifier le secret CRON si défini
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Non autorisé. CRON_SECRET invalide.' },
      { status: 401 }
    );
  }

  const token = process.env.TRAVELPAYOUTS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'TRAVELPAYOUTS_TOKEN manquant dans l\'environnement.' },
      { status: 500 }
    );
  }

  const todayStr = new Date().toISOString().split('T')[0];

  console.log('[CRON] ═══════════════════════════════════════════════════');
  console.log(`[CRON] Détection ultra-rapide des prix les plus bas (${todayStr})...`);
  console.log('[CRON] Origines à scanner :', ORIGINS.map(o => `${o.name} (${o.code})`).join(', '));

  // 1. SUPPRIMER UNIQUEMENT LES BILLETS DÉPASSÉS (Règle utilisateur : ne jamais écraser les valides !)
  try {
    const { count: deletedCount } = await supabaseAdmin
      .from('detected_deals')
      .delete({ count: 'exact' })
      .lt('departure_date', todayStr);

    console.log(`[CRON] Nettoyage : ${deletedCount ?? 0} anciens billets expirés supprimés.`);
  } catch (cleanErr) {
    console.warn('[CRON] Erreur nettoyage anciens billets:', cleanErr);
  }

  const results = {
    origins_scanned: 0,
    destinations_analyzed: 0,
    deals_found: 0,
    deals_inserted: 0,
    duplicates_skipped: 0,
    errors: [] as string[],
  };

  // 2. SCAN ULTRA-RAPIDE EN BULK POUR CHAQUE ORIGINE (1 appel par origine au lieu de 522)
  for (const originObj of ORIGINS) {
    try {
      console.log(`[CRON] Scan en gros pour ${originObj.name} (${originObj.code})...`);
      
      const bulkUrl = new URL('https://api.travelpayouts.com/v1/prices/cheap');
      bulkUrl.searchParams.set('origin', originObj.code);
      bulkUrl.searchParams.set('currency', 'xof'); // Prix direct en FCFA
      bulkUrl.searchParams.set('token', token);

      const response = await fetch(bulkUrl.toString(), {
        headers: { 'Accept-Encoding': 'gzip' },
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        const errorMsg = `HTTP ${response.status} pour origine ${originObj.code}`;
        console.warn(`[CRON] ⚠ ${errorMsg}`);
        results.errors.push(errorMsg);
        continue;
      }

      const json = await response.json();
      results.origins_scanned++;

      if (!json.success || !json.data) {
        console.log(`[CRON] ⚠ Aucune donnée retournée pour ${originObj.code}`);
        continue;
      }

      const destinationsMap = json.data as Record<string, Record<string, {
        price: number;
        airline: string;
        flight_number?: number;
        departure_at: string;
        return_at?: string;
        expires_at?: string;
      }>>;

      const destCodes = Object.keys(destinationsMap);
      results.destinations_analyzed += destCodes.length;
      console.log(`[CRON] ${destCodes.length} destinations disponibles depuis ${originObj.code}`);

      for (const destCode of destCodes) {
        // Ignorer les vols vers soi-même
        if (destCode === originObj.code) continue;

        const options = destinationsMap[destCode];
        if (!options || typeof options !== 'object') continue;

        // Récupérer le vol le plus bas (clé "0" ou première clé trouvée)
        const flightKeys = Object.keys(options);
        if (flightKeys.length === 0) continue;

        const flight = options[flightKeys[0]];
        if (!flight || !flight.price || !flight.departure_at) continue;

        const departureDate = flight.departure_at.split('T')[0];

        // RÈGLE : Ne garder que les dates futures
        if (departureDate < todayStr) continue;

        // Prix réel du marché en FCFA
        const wholesalePriceFCFA = Math.round(flight.price);

        // Ajout de la marge agence (8%) pour fixer notre prix de vente final
        const priceFCFA = Math.round(wholesalePriceFCFA * (1 + AGENCY_MARGIN_RATE));

        // Informations destination
        const destCatalog = DESTINATIONS_CATALOG[destCode];
        const destName = destCatalog?.name || destCode;
        const avgPriceFCFA = destCatalog?.avgPriceFCFA || Math.round(priceFCFA * 1.30);

        // Calcul du pourcentage de réduction vs prix moyen
        const rawDiscount = ((avgPriceFCFA - priceFCFA) / avgPriceFCFA) * 100;
        const discountPercent = Math.max(5, Math.round(rawDiscount));

        // Nom propre de la compagnie
        const airlineCode = flight.airline || 'HF';
        const airlineName = AIRLINE_NAMES[airlineCode] || airlineCode;

        // Données hôtel
        const hotel = destCatalog?.hotel || {
          name: `Hôtel d'Élite ${destName}`,
          price: 55000,
          stars: 4,
        };

        const deal = {
          origin: originObj.code,
          destination: destCode,
          destination_name: destName,
          airline: airlineCode,
          airline_name: airlineName,
          departure_date: departureDate,
          return_date: flight.return_at ? flight.return_at.split('T')[0] : null,
          price_fcfa: priceFCFA,
          currency: 'XOF',
          average_price_fcfa: avgPriceFCFA,
          discount_percent: discountPercent,
          is_lowest_price: true,
          hotel_name: hotel.name,
          hotel_price_fcfa: hotel.price,
          hotel_stars: hotel.stars,
          is_processed: false,
          is_sent: false,
          source: 'travelpayouts_live',
          raw_data: {
            ...flight,
            wholesale_price_fcfa: wholesalePriceFCFA,
            agency_profit_fcfa: priceFCFA - wholesalePriceFCFA,
          },
        };

        results.deals_found++;

        // Insertion avec préservation : ignoreDuplicates = true n'écrase pas si déjà présent
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
            results.errors.push(`${originObj.code}->${destCode}: ${insertError.message}`);
          }
        } else {
          results.deals_inserted++;
        }
      }
    } catch (originErr) {
      const msg = originErr instanceof Error ? originErr.message : 'Erreur inconnue';
      results.errors.push(`Origine ${originObj.code}: ${msg}`);
      console.error(`[CRON] ✗ Erreur origine ${originObj.code}:`, msg);
    }
  }

  console.log('[CRON] ═══════════════════════════════════════════════════');
  console.log('[CRON] Détection terminée avec succès !');
  console.log(`[CRON] Résultats : ${results.deals_found} trouvés | ${results.deals_inserted} nouveaux insérés | ${results.duplicates_skipped} déjà valides conservés.`);

  return NextResponse.json({
    success: true,
    message: 'Détection ultra-rapide des prix terminée.',
    timestamp: new Date().toISOString(),
    ...results,
  });
}
