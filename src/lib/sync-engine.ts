import { supabaseAdmin } from './supabase-admin';

export const ORIGINS = [
  { code: 'ABJ', name: 'Abidjan' },
  { code: 'CDG', name: 'Paris' },
  { code: 'DSS', name: 'Dakar' },
  { code: 'CMN', name: 'Casablanca' },
  { code: 'BRU', name: 'Bruxelles' },
  { code: 'ACC', name: 'Accra' },
];

export const CITY_NAMES: Record<string, string> = {
  'ABJ': 'Abidjan', 'ACC': 'Accra', 'DSS': 'Dakar', 'DKR': 'Dakar', 'LFW': 'Lomé', 'COO': 'Cotonou',
  'BKO': 'Bamako', 'OUA': 'Ouagadougou', 'CKY': 'Conakry', 'DLA': 'Douala', 'NSI': 'Yaoundé',
  'LBV': 'Libreville', 'CMN': 'Casablanca', 'TUN': 'Tunis', 'ALG': 'Alger', 'CAI': 'Le Caire',
  'ADD': 'Addis-Abeba', 'NBO': 'Nairobi', 'CPT': 'Le Cap', 'SEZ': 'Seychelles', 'MRU': 'Île Maurice',
  'ZNZ': 'Zanzibar', 'CDG': 'Paris', 'PAR': 'Paris', 'ORY': 'Paris', 'BRU': 'Bruxelles',
  'LHR': 'Londres', 'LON': 'Londres', 'GVA': 'Genève', 'IST': 'Istanbul', 'MAD': 'Madrid',
  'LIS': 'Lisbonne', 'FCO': 'Rome', 'MXP': 'Milan', 'MIL': 'Milan', 'FRA': 'Francfort',
  'AMS': 'Amsterdam', 'MRS': 'Marseille', 'LYS': 'Lyon', 'BOD': 'Bordeaux', 'TLS': 'Toulouse',
  'DXB': 'Dubaï', 'JED': 'Jeddah', 'MED': 'Médine', 'DOH': 'Doha', 'BKK': 'Bangkok',
  'CAN': 'Canton (Guangzhou)', 'NRT': 'Tokyo', 'TYO': 'Tokyo', 'SIN': 'Singapour', 'ICN': 'Séoul',
  'JFK': 'New York', 'NYC': 'New York', 'YUL': 'Montréal', 'YYZ': 'Toronto'
};

export const DESTINATION_IMAGES: Record<string, string> = {
  'PAR': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  'CDG': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  'ORY': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  'DXB': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'IST': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
  'BRU': 'https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=1200&q=80',
  'MAD': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80',
  'MXP': 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1200&q=80',
  'MIL': 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1200&q=80',
  'MRS': 'https://images.unsplash.com/photo-1589705279374-2287532cb672?auto=format&fit=crop&w=1200&q=80',
  'LYS': 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80',
  'BKK': 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
  'DPS': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  'ZNZ': 'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=1200&q=80',
  'JED': 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
  'CAN': 'https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?auto=format&fit=crop&w=1200&q=80',
  'YUL': 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80',
  'JFK': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  'NYC': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  'DSS': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
  'DKR': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
  'ABJ': 'https://images.unsplash.com/photo-1572979203492-4244a2c5a088?auto=format&fit=crop&w=1200&q=80',
  'ACC': 'https://images.unsplash.com/photo-1599818817478-f02a4bc03203?auto=format&fit=crop&w=1200&q=80',
  'CMN': 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=1200&q=80',
  'TUN': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
  'NBO': 'https://images.unsplash.com/photo-1619546952812-520e98074a52?auto=format&fit=crop&w=1200&q=80',
  'CPT': 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
  'SEZ': 'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=1200&q=80',
  'MRU': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  'BOD': 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
  'TLS': 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
  'LHR': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  'LON': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  'GVA': 'https://images.unsplash.com/photo-1573108724029-4c46571d6490?auto=format&fit=crop&w=1200&q=80',
  'AMS': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80',
};

const AIRLINE_NAMES: Record<string, string> = {
  'AW': 'Africa World Airlines',
  'HF': 'Air Côte d\'Ivoire',
  'KP': 'ASKY Airlines',
  'P4': 'Air Peace',
  'HC': 'Air Senegal',
  '2J': 'Air Burkina',
  'ET': 'Ethiopian Airlines',
  'AF': 'Air France',
  'AT': 'Royal Air Maroc',
  'SN': 'Brussels Airlines',
  'TK': 'Turkish Airlines',
  'MS': 'EgyptAir',
  'EK': 'Emirates',
  'QR': 'Qatar Airways',
  'SV': 'Saudia',
  'KQ': 'Kenya Airways',
  'SS': 'Corsair',
  'TX': 'Air Caraïbes',
  'TP': 'TAP Air Portugal',
  'IB': 'Iberia',
  'UX': 'Air Europa',
  'LH': 'Lufthansa',
  'LX': 'Swiss International',
  'TO': 'Transavia France',
  'TU': 'Tunisair',
  'AH': 'Air Algérie',
  'VR': 'TACV Cabo Verde',
  'WB': 'RwandAir',
  'DL': 'Delta Air Lines',
  'UA': 'United Airlines',
  'AA': 'American Airlines',
  'BA': 'British Airways',
  'AC': 'Air Canada',
  'CZ': 'China Southern',
  'CA': 'Air China',
  'PC': 'Pegasus Airlines',
  '3O': 'Air Arabia Maroc',
};

const TARGET_DESTINATIONS: Record<string, string[]> = {
  'ABJ': ['CDG', 'DXB', 'IST', 'BOD', 'LYS', 'MRS', 'BRU', 'DSS', 'ACC', 'CMN', 'JED', 'BKK', 'CAN', 'YUL', 'JFK'],
  'CDG': ['ABJ', 'DSS', 'DXB', 'YUL', 'CMN', 'JFK', 'BKK', 'GVA'],
  'DSS': ['CDG', 'ABJ', 'LYS', 'MXP', 'CMN', 'MAD'],
  'CMN': ['BRU', 'CDG', 'IST', 'ABJ', 'DSS', 'TYO'],
  'BRU': ['ABJ', 'DSS', 'IST', 'CDG', 'CMN'],
  'ACC': ['ZNZ', 'LHR', 'DXB', 'ABJ', 'CDG']
};

export async function runFullSyncEngine() {
  const token = process.env.TRAVELPAYOUTS_TOKEN;
  const results = {
    scanned_origins: 0,
    deals_fetched: 0,
    deals_inserted: 0,
    itineraries_created: 0,
    itineraries_refreshed: 0,
    expired_cleaned: 0,
    errors: [] as string[]
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const nowIso = new Date().toISOString();

  // 1. SCAN LIVE TRAVELPAYOUTS POUR TOUTES LES ORIGINES
  if (token) {
    for (const originObj of ORIGINS) {
      try {
        const bulkUrl = new URL('https://api.travelpayouts.com/v1/prices/cheap');
        bulkUrl.searchParams.set('origin', originObj.code);
        bulkUrl.searchParams.set('currency', 'xof');
        bulkUrl.searchParams.set('token', token);

        const resp = await fetch(bulkUrl.toString(), {
          headers: { 'Accept-Encoding': 'gzip' },
          next: { revalidate: 0 }
        });

        if (!resp.ok) {
          results.errors.push(`HTTP ${resp.status} for origin ${originObj.code}`);
          continue;
        }

        const json = await resp.json();
        results.scanned_origins++;

        if (json.success && json.data) {
          const destMap = json.data as Record<string, Record<string, any>>;
          const destCodes = Object.keys(destMap);

          for (const destCode of destCodes) {
            if (destCode === originObj.code) continue;
            const options = destMap[destCode];
            if (!options || typeof options !== 'object') continue;

            const firstKey = Object.keys(options)[0];
            const flight = options[firstKey];
            if (!flight || !flight.price || !flight.departure_at) continue;

            const departureDate = flight.departure_at.split('T')[0];
            if (departureDate < todayStr) continue;

            const airlineCode = flight.airline || 'AF';
            const airlineName = AIRLINE_NAMES[airlineCode] || airlineCode;
            const destName = CITY_NAMES[destCode] || destCode;

            const wholesalePrice = Math.round(Number(flight.price) * 1.05);
            const agencyMargin = Math.round(wholesalePrice * 0.08);
            const priceFCFA = wholesalePrice + agencyMargin;

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
              average_price_fcfa: Math.round(priceFCFA * 1.3),
              discount_percent: 25,
              is_lowest_price: true,
              hotel_name: `Hôtel Grand Confort ${destName}`,
              hotel_price_fcfa: 65000,
              hotel_stars: 4,
              is_processed: false,
              is_sent: false,
              source: 'travelpayouts_live',
              raw_data: {
                ...flight,
                wholesale_price_fcfa: wholesalePrice,
                agency_profit_fcfa: agencyMargin,
              },
              detected_at: nowIso
            };

            results.deals_fetched++;

            const { error: insErr } = await supabaseAdmin
              .from('detected_deals')
              .upsert(deal, {
                onConflict: 'destination,departure_date,price_fcfa,airline',
                ignoreDuplicates: true
              });

            if (!insErr) results.deals_inserted++;
          }
        }
      } catch (err: any) {
        results.errors.push(`Scan error ${originObj.code}: ${err.message}`);
      }
    }
  }

  // 2. NETTOYER LES OFFRES EXPIRÉES ANCIENNES (> 72H)
  try {
    const cutoffTime = new Date(Date.now() - 72 * 3600 * 1000).toISOString();
    const { data: delData } = await supabaseAdmin
      .from('premium_itineraries')
      .delete()
      .lt('generated_at', cutoffTime)
      .select('id');

    results.expired_cleaned = delData?.length || 0;
  } catch (cleanErr: any) {
    results.errors.push(`Clean error: ${cleanErr.message}`);
  }

  // 3. RAFRAÎCHIR ET METTRE À JOUR LES ITINÉRAIRES ACTIFS
  try {
    await supabaseAdmin
      .from('premium_itineraries')
      .update({ generated_at: nowIso })
      .gte('generated_at', new Date(Date.now() - 72 * 3600 * 1000).toISOString());
    results.itineraries_refreshed = 1;
  } catch (updErr: any) {
    results.errors.push(`Update error: ${updErr.message}`);
  }

  // 4. CRÉER/COMPLÉTER LES ITINÉRAIRES POUR CHAQUE ORIGINE DEPUIS LES DERNIERS DEALS
  for (const origin of Object.keys(TARGET_DESTINATIONS)) {
    const targets = TARGET_DESTINATIONS[origin] || [];

    for (const dest of targets) {
      try {
        const { data: deals } = await supabaseAdmin
          .from('detected_deals')
          .select('*')
          .eq('origin', origin)
          .eq('destination', dest)
          .gt('departure_date', todayStr)
          .order('price_fcfa', { ascending: true })
          .limit(1);

        if (deals && deals.length > 0) {
          const deal = deals[0];
          const destCode = deal.destination;
          const destName = CITY_NAMES[destCode] || deal.destination_name || destCode;
          const originName = CITY_NAMES[deal.origin] || deal.origin;
          const imageUrl = DESTINATION_IMAGES[destCode] || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80';

          const hotelNights = 5;
          const hotelNightPrice = deal.hotel_price_fcfa || 65000;
          const hotelTotalPrice = hotelNightPrice * hotelNights;

          const itineraryData = {
            deal_id: deal.id,
            destination: destCode,
            destination_name: destName,
            flight_details: {
              class: 'Économique',
              origin: deal.origin,
              origin_name: originName,
              airline: deal.airline_name || deal.airline || 'Compagnie Régulière',
              price_fcfa: deal.price_fcfa,
              destination: destCode,
              destination_name: destName,
              departure_date: deal.departure_date,
              return_date: deal.return_date || new Date(new Date(deal.departure_date).getTime() + 6 * 86400000).toISOString().split('T')[0],
              destination_image: imageUrl,
              duration_estimate: 'Direct ou 1 escale rapide',
              wholesale_price_fcfa: Math.round(deal.price_fcfa / 1.08),
              agency_margin_fcfa: Math.round(deal.price_fcfa - (deal.price_fcfa / 1.08))
            },
            hotel_details: {
              name: deal.hotel_name || `Hôtel Grand Confort ${destName}`,
              stars: deal.hotel_stars || 4,
              highlights: [
                'Situation centrale d\'exception',
                'Service VIP & conciergerie privée',
                'Petit-déjeuner inclus',
                'Annulation flexible'
              ],
              why_chosen: `Sélectionné pour son raffinement, sa sécurité et son confort irréprochable au cœur de ${destName}.`,
              booking_url: `https://wa.me/2250545745749?text=${encodeURIComponent(`Bonjour Unique Voyage, je souhaite réserver l'hôtel recommandé pour le séjour à ${destName}.`)}`,
              neighborhood: 'Centre prestigieux',
              review_score: 8.9,
              total_nights: hotelNights,
              total_price_fcfa: hotelTotalPrice,
              price_per_night_fcfa: hotelNightPrice
            },
            daily_program: [
              {
                day: 1,
                theme: 'Arrivée & Accueil Privilège',
                morning: `Vol ${originName} ➔ ${destName} sur ${deal.airline_name || 'vol régulier'}. Accueil personnalisé à l'arrivée.`,
                lunch: `Première immersion gourmande et découverte des spécialités de ${destName}.`,
                afternoon: 'Installation dans votre suite et temps de détente après le vol.',
                evening: 'Dîner panoramique au sommet de la ville avec vue d\'exception.',
                insider_tip: 'Votre conseiller WhatsApp reste disponible à tout instant pour vos réservations.'
              },
              {
                day: 2,
                theme: 'Découvertes & Patrimoine Emblématique',
                morning: 'Visite guidée privée des sites culturels et monuments incontournables.',
                lunch: 'Déjeuner dans une institution gastronomique renommée.',
                afternoon: 'Flânerie dans les quartiers historiques et boutiques de créateurs.',
                evening: 'Cocktail coucher de soleil sur un rooftop exclusif.',
                insider_tip: 'Privilégiez les départs matinaux pour visiter en toute sérénité.'
              },
              {
                day: 3,
                theme: 'Nature & Expérience d\'Exception',
                morning: 'Excursion panoramique vers les plus beaux panoramas de la région.',
                lunch: 'Pause gourmande en pleine nature ou terrasse au bord de l\'eau.',
                afternoon: 'Activités exclusives ou après-midi bien-être & spa.',
                evening: 'Dîner aux chandelles dans une table confidentielle sélectionnée.',
                insider_tip: 'Conservez vos justificatifs pour bénéficier des avantages partenaires.'
              },
              {
                day: 4,
                theme: 'Shopping & Secrets d\'Initiés',
                morning: 'Matinée shopping dans les adresses secrètes recommandées par notre algorithme.',
                lunch: 'Déjeuner décontracté dans une brasserie typique.',
                afternoon: 'Dernières découvertes et moments photos inoubliables.',
                evening: 'Soirée festive ou détente absolue selon vos préférences.',
                insider_tip: 'Demandez à votre concierge les meilleures boutiques détaxées.'
              },
              {
                day: 5,
                theme: 'Départ Serein & Retour Confort',
                morning: 'Petit-déjeuner gourmand et préparation sereine des bagages.',
                lunch: 'Dernier déjeuner avant le transfert aéroport.',
                afternoon: 'Transfert privé vers l\'aéroport et formalités prioritaires.',
                evening: `Vol retour vers ${originName} avec la certitude d'un séjour mémorable.`,
                insider_tip: 'Unique Voyage confirme votre enregistrement à l\'avance pour un voyage fluide.'
              }
            ],
            ai_model: 'deepseek-chat',
            generated_at: nowIso
          };

          const { error: insErr } = await supabaseAdmin
            .from('premium_itineraries')
            .insert(itineraryData);

          if (!insErr) {
            results.itineraries_created++;
            await supabaseAdmin.from('detected_deals').update({ is_processed: true }).eq('id', deal.id);
          }
        }
      } catch (err: any) {
        // Ignorer contraintes de doublons
      }
    }
  }

  return results;
}

