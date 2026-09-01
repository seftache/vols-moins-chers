import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Veuillez configurer NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const CURATED_DESTINATIONS = [
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'DXB',
    destination_name: 'Dubaï',
    airline: 'Emirates',
    price_fcfa: 495000,
    departure_date: '2026-10-15',
    return_date: '2026-10-22',
    duration_estimate: '8h30',
    hotel: {
      name: 'Address Downtown Dubai',
      stars: 5,
      neighborhood: 'Downtown Dubai',
      price_per_night_fcfa: 125000,
      total_nights: 7,
      total_price_fcfa: 875000,
      why_chosen: 'Vue imprenable sur le Burj Khalifa et les fontaines avec service 5 étoiles.',
      highlights: ['Piscine à débordement', 'Spa de luxe', 'Accès direct Dubai Mall'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Address+Downtown+Dubai&checkin=2026-10-15&checkout=2026-10-22'
    },
    program: [
      { day: 1, theme: 'Arrivée & Prestige', morning: 'Installation à l’Address Downtown et détente au spa.', lunch: 'Déjeuner avec vue au Cé La Vi.', afternoon: 'Balade et shopping exclusif au Dubai Mall.', evening: 'Dîner privé face au spectacle des fontaines du Burj Khalifa.', insider_tip: 'Réservez la table en terrasse au coucher du soleil.' },
      { day: 2, theme: 'Safari Privé dans le Désert', morning: 'Matinée farniente à la piscine à débordement.', lunch: 'Brunch gastronomique méditerranéen.', afternoon: 'Safari en 4x4 vintage dans les dunes dorées de conservation.', evening: 'Dîner étoilé sous les tentes bédouines de luxe.', insider_tip: 'Prévoyez des lunettes de soleil pour le coucher du soleil dans les dunes.' },
      { day: 3, theme: 'Le Vieux Dubaï & Marina Yacht', morning: 'Traversée en Abra traditionnelle sur la crique et souk de l’or.', lunch: 'Dégustation émiratie au quartier historique Al Fahidi.', afternoon: 'Croisière privée en yacht le long de Dubai Marina et Palm Jumeirah.', evening: 'Soirée lounge au sommet d’un rooftop panoramique.', insider_tip: 'Profitez de la brise marine au crépuscule sur le yacht.' }
    ],
    tagline: 'L’extravagance et le luxe oriental au cœur de la métropole du futur.'
  },
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'CDG',
    destination_name: 'Paris',
    airline: 'Air France',
    price_fcfa: 440000,
    departure_date: '2026-11-05',
    return_date: '2026-11-12',
    duration_estimate: '6h45',
    hotel: {
      name: 'Hôtel Regina Louvre',
      stars: 5,
      neighborhood: '1er Arrondissement - Louvre',
      price_per_night_fcfa: 160000,
      total_nights: 7,
      total_price_fcfa: 1120000,
      why_chosen: 'Élégance parisienne classique avec vue directe sur les Tuileries et la Tour Eiffel.',
      highlights: ['Face au Jardin des Tuileries', 'Décoration d’époque', 'Service concierge Clés d’Or'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Hotel+Regina+Louvre+Paris&checkin=2026-11-05&checkout=2026-11-12'
    },
    program: [
      { day: 1, theme: 'L’Art de Vivre Parisien', morning: 'Accueil et promenade matinale au Jardin des Tuileries.', lunch: 'Déjeuner bistronomique au Café Marly face à la Pyramide du Louvre.', afternoon: 'Visite guidée privée des chefs-d’œuvre du Musée du Louvre.', evening: 'Dîner aux chandelles au bord de la Seine.', insider_tip: 'Accédez au Louvre par l’entrée confidentielle du Carrousel pour éviter la foule.' },
      { day: 2, theme: 'Haute Couture & Gastronomie', morning: 'Shopping confidentiel rue du Faubourg Saint-Honoré et place Vendôme.', lunch: 'Déjeuner dans une brasserie mythique de Saint-Germain-des-Prés.', afternoon: 'Balade littéraire et artistique à Saint-Germain et au Jardin du Luxembourg.', evening: 'Soirée opéra au Palais Garnier.', insider_tip: 'Réservez à l’avance une loge au Palais Garnier pour une acoustique parfaite.' },
      { day: 3, theme: 'Montmartre Secret & Panorama', morning: 'Exploration des ruelles méconnues de Montmartre et vignes secrètes.', lunch: 'Déjeuner dans un restaurant d’artistes historique.', afternoon: 'Croisière privée sur la Seine au coucher du soleil.', evening: 'Dîner gastronomique étoilé Michelin.', insider_tip: 'Grimpez à la tombée de la nuit derrière le Sacré-Cœur pour admirer Paris illuminé.' }
    ],
    tagline: 'Vivez la magie intemporelle de la capitale de la mode et de la gastronomie.'
  },
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'DSS',
    destination_name: 'Dakar',
    airline: 'Air Sénégal',
    price_fcfa: 210000,
    departure_date: '2026-10-20',
    return_date: '2026-10-26',
    duration_estimate: '2h30',
    hotel: {
      name: 'Radisson Blu Hotel, Dakar Sea Plaza',
      stars: 5,
      neighborhood: 'Fann Résidence - Corniche Ouest',
      price_per_night_fcfa: 95000,
      total_nights: 6,
      total_price_fcfa: 570000,
      why_chosen: 'Emplacement spectaculaire sur les falaises de la Corniche avec vue sur l’océan Atlantique.',
      highlights: ['Piscine à débordement sur l’océan', 'Coucher de soleil féerique', 'Restaurant de fruits de mer'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Radisson+Blu+Hotel+Dakar&checkin=2026-10-20&checkout=2026-10-26'
    },
    program: [
      { day: 1, theme: 'L’Océan & la Teranga', morning: 'Arrivée, cocktail de bienvenue face à l’Atlantique.', lunch: 'Déjeuner thieboudienne royale les pieds dans l’eau.', afternoon: 'Détente au bord de la piscine à débordement de l’hôtel.', evening: 'Dîner musical au son de la kora sous les étoiles.', insider_tip: 'Installez-vous sur la terrasse extérieure vers 18h pour le coucher de soleil atlantique.' },
      { day: 2, theme: 'Histoire & Île de Gorée', morning: 'Embarquement pour l’Île de Gorée et visite émouvante de la Maison des Esclaves.', lunch: 'Poisson grillé du jour chez un restaurateur local sur le port de Gorée.', afternoon: 'Balade entre les façades pastel coloniales et galeries d’artistes.', evening: 'Retour à Dakar et soirée jazz dans le quartier du Plateau.', insider_tip: 'Prenez le temps d’échanger avec les peintres sur sable de l’île.' },
      { day: 3, theme: 'Ngor & Arts Contemporains', morning: 'Bateau navette pour l’île de Ngor et session de surf ou détente.', lunch: 'Déjeuner langouste grillée sur la plage de Ngor.', afternoon: 'Visite du Musée des Civilisations Noires et monument de la Renaissance.', evening: 'Dîner gastronomique sénégalais à la Corniche des Almadies.', insider_tip: 'Le soir aux Almadies, la brise fraîche est idéale pour une promenade digestive.' }
    ],
    tagline: 'L’effervescence culturelle, la chaleur de l’hospitalité et la brise de l’Atlantique.'
  },
  {
    origin: 'CDG',
    origin_name: 'Paris',
    destination: 'NRT',
    destination_name: 'Tokyo',
    airline: 'Japan Airlines',
    price_fcfa: 520000,
    departure_date: '2026-11-10',
    return_date: '2026-11-18',
    duration_estimate: '13h30',
    hotel: {
      name: 'The Capitol Hotel Tokyu',
      stars: 5,
      neighborhood: 'Chiyoda - Akasaka',
      price_per_night_fcfa: 180000,
      total_nights: 8,
      total_price_fcfa: 1440000,
      why_chosen: 'Architecture conçue par Kengo Kuma mariant sérénité traditionnelle et grand luxe nippon.',
      highlights: ['Architecture Kengo Kuma', 'Vue sur le jardin du sanctuaire Hie', 'Service de thé traditionnel'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=The+Capitol+Hotel+Tokyu&checkin=2026-11-10&checkout=2026-11-18'
    },
    program: [
      { day: 1, theme: 'Sérénité & Rituels', morning: 'Promenade matinale dans les allées de bambous du sanctuaire Hie-jinja.', lunch: 'Repas Kaiseki raffiné dans un pavillon traditionnel.', afternoon: 'Exploration des jardins impériaux de Chiyoda.', evening: 'Dîner sushi Omakase préparé par un maître artisan.', insider_tip: 'Assistez à la cérémonie du thé privée proposée par l’hôtel en fin de journée.' },
      { day: 2, theme: 'Futurisme & Néons', morning: 'Visite immersive d’art numérique à TeamLab Planets.', lunch: 'Ramen haut de gamme dans les ruelles secrètes de Ginza.', afternoon: 'Shopping avant-gardiste à Shibuya et quartier d’Omotesando.', evening: 'Cocktail avec vue panoramique à 360° sur la baie de Tokyo.', insider_tip: 'Traversez le carrefour de Shibuya depuis le pont suspendu de la gare pour la meilleure vue.' },
      { day: 3, theme: 'Traditions d’Edo', morning: 'Visite matinale du temple Senso-ji à Asakusa.', lunch: 'Tempura traditionnel croustillant dans une maison centenaire.', afternoon: 'Croisière en bateau Sumida jusqu’aux jardins Hama-rikyu.', evening: 'Dîner Teppanyaki de bœuf de Wagyu A5 d’exception.', insider_tip: 'Goûtez le thé matcha dans le pavillon flottant des jardins Hama-rikyu.' }
    ],
    tagline: 'Une immersion fascinante entre traditions ancestrales et ultra-modernité.'
  },
  {
    origin: 'CDG',
    origin_name: 'Paris',
    destination: 'JFK',
    destination_name: 'New York',
    airline: 'Air France',
    price_fcfa: 295000,
    departure_date: '2026-10-08',
    return_date: '2026-10-15',
    duration_estimate: '8h15',
    hotel: {
      name: '1 Hotel Central Park',
      stars: 5,
      neighborhood: 'Midtown Manhattan',
      price_per_night_fcfa: 175000,
      total_nights: 7,
      total_price_fcfa: 1225000,
      why_chosen: 'Oasis éco-luxe spectaculaire à un pâté de maisons de Central Park et de la 5ème Avenue.',
      highlights: ['À 1 min de Central Park', 'Design végétal d’exception', 'Restaurant de chef farm-to-table'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=1+Hotel+Central+Park+New+York&checkin=2026-10-08&checkout=2026-10-15'
    },
    program: [
      { day: 1, theme: 'Le Cœur de Manhattan', morning: 'Jogging ou promenade revigorante dans Central Park jusqu’au Bow Bridge.', lunch: 'Déjeuner au Tavern on the Green sous les feuillages d’automne.', afternoon: 'Flânerie sur la 5ème Avenue et ascension du SUMMIT One Vanderbilt.', evening: 'Comédie musicale prestigieuse sur Broadway.', insider_tip: 'Visitez le SUMMIT en fin d’après-midi pour voir le coucher de soleil illuminer l’Empire State Building.' },
      { day: 2, theme: 'SoHo, Chelsea & The High Line', morning: 'Balade sur la High Line suspendue au-dessus de la ville.', lunch: 'Dégustation gastronomique au Chelsea Market.', afternoon: 'Galeries d’art contemporain de Chelsea et boutiques de créateurs à SoHo.', evening: 'Dîner intime dans un speakeasy secret de Greenwich Village.', insider_tip: 'Descendez par Washington Square pour voir les joueurs d’échecs et artistes de rue.' },
      { day: 3, theme: 'Brooklyn & Vue Panoramique', morning: 'Traversée à pied du mythique pont de Brooklyn.', lunch: 'Pizza new-yorkaise artisanale à DUMBO face à la skyline.', afternoon: 'Balade le long du Brooklyn Bridge Park et quartier branché de Williamsburg.', evening: 'Cocktails sur un rooftop de Brooklyn avec vue spectaculaire sur Manhattan.', insider_tip: 'Prenez la photo emblématique de Manhattan Bridge depuis Washington Street à DUMBO.' }
    ],
    tagline: 'L’énergie électrique de la ville qui ne dort jamais, vécue avec un raffinement absolu.'
  },
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'YUL',
    destination_name: 'Montréal',
    airline: 'Air Canada',
    price_fcfa: 540000,
    departure_date: '2026-11-12',
    return_date: '2026-11-20',
    duration_estimate: '11h30',
    hotel: {
      name: 'Hôtel William Gray',
      stars: 4,
      neighborhood: 'Vieux-Montréal',
      price_per_night_fcfa: 110000,
      total_nights: 8,
      total_price_fcfa: 880000,
      why_chosen: 'Magnifique mariage de maisons historiques du XVIIIe siècle et de design contemporain à deux pas du Vieux-Port.',
      highlights: ['Rooftop vue sur le fleuve Saint-Laurent', 'Spa thermal scandinave', 'Au cœur des rues pavées du Vieux-Montréal'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Hotel+William+Gray+Montreal&checkin=2026-11-12&checkout=2026-11-20'
    },
    program: [
      { day: 1, theme: 'Charme Historique & Vieux-Port', morning: 'Installation et exploration des rues pavées et de la basilique Notre-Dame.', lunch: 'Déjeuner dans une auberge gastronomique de la rue Saint-Paul.', afternoon: 'Grande Roue de Montréal et détente au bord du fleuve Saint-Laurent.', evening: 'Dîner au Maggie Oakes avec viandes maturées et produits du terroir québécois.', insider_tip: 'Assistez au spectacle multimédia Aura à l’intérieur de la Basilique Notre-Dame.' },
      { day: 2, theme: 'Le Mont-Royal & le Plateau', morning: 'Ascension du Mont-Royal pour admirer le belvédère Kondiaronk.', lunch: 'Célèbre sandwich au smoked meat chez Schwartz’s.', afternoon: 'Découverte des murales colorées et boutiques du Plateau-Mont-Royal.', evening: 'Soirée microbrasserie artisanale et ambiance jazz.', insider_tip: 'Faites un arrêt à la boulangerie Fairmount pour des bagels tout chauds sortis du four à bois.' },
      { day: 3, theme: 'Musées & Gastronomie Étoilée', morning: 'Visite du Musée des Beaux-Arts de Montréal.', lunch: 'Brunch gourmand dans le quartier Mile End.', afternoon: 'Détente absolue au Bota Bota, spa flottant sur le fleuve.', evening: 'Dîner gastronomique au Club Chasse et Pêche.', insider_tip: 'Réservez votre séance de bain thermal au crépuscule pour voir les lumières de la ville.' }
    ],
    tagline: 'La chaleur humaine et l’effervescence culturelle de la grande métropole québécoise.'
  }
];

async function populate() {
  console.log("--- Début de l'insertion des offres et itinéraires ---");

  for (const item of CURATED_DESTINATIONS) {
    console.log(`Insertion : ${item.origin_name} (${item.origin}) -> ${item.destination_name} (${item.destination})...`);

    const { data: deal, error: dealError } = await supabase
      .from("detected_deals")
      .upsert({
        origin: item.origin,
        destination: item.destination,
        destination_name: item.destination_name,
        airline: item.airline,
        airline_name: item.airline,
        departure_date: item.departure_date,
        return_date: item.return_date,
        price_fcfa: item.price_fcfa,
        currency: "XOF",
        average_price_fcfa: Math.round(item.price_fcfa * 1.35),
        discount_percent: 26,
        is_lowest_price: true,
        hotel_name: item.hotel.name,
        hotel_price_fcfa: item.hotel.total_price_fcfa,
        hotel_stars: item.hotel.stars,
        is_processed: true,
        is_sent: false,
        source: "travelpayouts",
        detected_at: new Date().toISOString()
      }, {
        onConflict: "destination,departure_date,price_fcfa,airline"
      })
      .select()
      .single();

    if (dealError) {
      console.error(`Erreur deal ${item.destination_name}:`, dealError);
      continue;
    }

    const dealId = deal.id;

    const flightDetails = {
      origin: item.origin,
      origin_name: item.origin_name,
      destination: item.destination,
      destination_name: item.destination_name,
      airline: item.airline,
      departure_date: item.departure_date,
      return_date: item.return_date,
      price_fcfa: item.price_fcfa,
      class: "Économique",
      duration_estimate: item.duration_estimate
    };

    const hotelDetails = {
      name: item.hotel.name,
      stars: item.hotel.stars,
      neighborhood: item.hotel.neighborhood,
      price_per_night_fcfa: item.hotel.price_per_night_fcfa,
      total_nights: item.hotel.total_nights,
      total_price_fcfa: item.hotel.total_price_fcfa,
      review_score: 9.2,
      highlights: item.hotel.highlights,
      why_chosen: item.hotel.why_chosen,
      booking_url: item.hotel.booking_url
    };

    const { error: itinError } = await supabase
      .from("premium_itineraries")
      .upsert({
        deal_id: dealId,
        destination: item.destination,
        destination_name: item.destination_name,
        flight_details: flightDetails,
        hotel_details: hotelDetails,
        daily_program: item.program,
        ai_model: "deepseek-chat",
        generated_at: new Date().toISOString()
      }, {
        onConflict: "deal_id"
      });

    if (itinError) {
      console.error(`Erreur itinéraire ${item.destination_name}:`, itinError);
    } else {
      console.log(`✅ Itinéraire créé avec succès : ${item.destination_name}`);
    }
  }

  console.log("--- Toutes les offres ont été insérées avec succès ! ---");
}

populate();

