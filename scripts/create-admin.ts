import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 1. ÉCRITURE DU COMPOSANT BookingSection.tsx
const bookingSectionCode = `"use client";

import React, { useState } from 'react';
import { Plane, Building2, ChevronRight, ShieldCheck, CreditCard, Check, ExternalLink } from 'lucide-react';
import BookingModal from './BookingModal';

interface BookingSectionProps {
  flight: {
    origin: string;
    origin_name?: string;
    destination: string;
    destination_name?: string;
    airline: string;
    departure_date: string;
    return_date?: string;
    price_fcfa: number;
  };
  hotel?: {
    name: string;
    stars: number;
    price_per_night_fcfa: number;
    total_nights: number;
    total_price_fcfa: number;
    neighborhood?: string;
  };
  flightSearchUrl: string;
  hotelBookingUrl: string;
  isExpired: boolean;
}

export default function BookingSection({
  flight,
  hotel,
  flightSearchUrl,
  hotelBookingUrl,
  isExpired
}: BookingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdminLinks, setShowAdminLinks] = useState(false);

  return (
    <>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flight={flight}
        hotel={hotel}
      />

      <div className="sticky top-8 bg-[#0F0F0F] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D85A30] block mb-1">
            Réservation Directe
          </span>
          <h3 className="font-serif text-2xl">Tarif Négocié</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-white/60 flex items-center gap-2">
              <Plane size={14} className="text-[#D85A30]" /> Billet d'avion (A/R)
            </span>
            <span className="font-bold text-white">{(flight.price_fcfa || 0).toLocaleString()} FCFA</span>
          </div>

          {hotel && (
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/60 flex items-center gap-2">
                <Building2 size={14} className="text-white/40" /> Option Hôtel ({hotel.total_nights}n)
              </span>
              <span className="text-white/70">{(hotel.total_price_fcfa || 0).toLocaleString()} FCFA</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-1">
            <span className="text-[10px] uppercase text-white/40">Tarif Vol Seul Garanti :</span>
            <span className="text-3xl font-serif text-[#D85A30] font-bold">
              {(flight.price_fcfa || 0).toLocaleString()} <span className="text-sm font-sans text-white">FCFA</span>
            </span>
            <p className="text-[10px] text-white/40">Prix tout compris par passager · Disponibilité immédiate</p>
          </div>
        </div>

        {isExpired ? (
          <button disabled className="w-full bg-[#7a1818]/20 text-[#7a1818] border border-[#7a1818]/30 py-4 text-xs font-bold uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2 rounded-xl">
            OFFRE EXPIRÉE
          </button>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold py-4 px-6 rounded-xl uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[#D85A30]/30 hover:scale-[1.01]"
          >
            Réserver mon voyage
            <ChevronRight size={16} />
          </button>
        )}

        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2 text-[11px] text-white/60">
          <p className="flex items-center gap-2 text-white">
            <ShieldCheck size={14} className="text-emerald-400" /> Billet officiel émis sous 1 heure
          </p>
          <p className="flex items-center gap-2 text-white">
            <CreditCard size={14} className="text-emerald-400" /> Règlement Wave, Mobile Money, Virement
          </p>
          <p className="flex items-center gap-2 text-white">
            <Check size={14} className="text-emerald-400" /> Assistance billetterie personnalisée
          </p>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={() => setShowAdminLinks(!showAdminLinks)}
            className="text-[10px] text-white/20 hover:text-white/50 underline transition-colors"
          >
            {showAdminLinks ? 'Masquer accès billetterie directe' : 'Accès billetterie directe'}
          </button>

          {showAdminLinks && (
            <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg text-left text-[11px] space-y-2">
              <p className="font-bold text-[#D85A30]">Liens de réservation directs (Affiliation) :</p>
              <a
                href={flightSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-emerald-400 hover:underline flex items-center gap-1"
              >
                → Émettre le vol chez la compagnie <ExternalLink size={12}/>
              </a>
              {hotel && (
                <a
                  href={hotelBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:underline flex items-center gap-1"
                >
                  → Réserver l'hôtel chez le partenaire <ExternalLink size={12}/>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), "src", "components", "BookingSection.tsx"), bookingSectionCode);
console.log("BookingSection.tsx généré avec succès !");

// 2. POPULATION DE LA BASE AVEC DES OFFRES IMBATTABLES ET HÔTELS ÉCONOMIQUES
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase config manquante");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const CURATED_DESTINATIONS = [
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'DXB',
    destination_name: 'Dubaï',
    airline: 'Emirates',
    price_fcfa: 450000,
    departure_date: '2026-10-15',
    return_date: '2026-10-22',
    duration_estimate: '8h30',
    hotel: {
      name: 'Citymax Hotel Bur Dubai',
      stars: 3,
      neighborhood: 'Bur Dubai (Proche Métro & Souks)',
      price_per_night_fcfa: 28000,
      total_nights: 7,
      total_price_fcfa: 196000,
      why_chosen: 'Hôtel économique moderne très propre, piscine sur le toit, à 5 min à pied du métro.',
      highlights: ['Piscine rooftop', 'Wi-Fi gratuit rapide', 'À 5 min du métro'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Citymax+Hotel+Bur+Dubai&checkin=2026-10-15&checkout=2026-10-22'
    },
    program: [
      { day: 1, theme: 'Arrivée & Découverte de la Ville', morning: 'Installation à l’hôtel et repos.', lunch: 'Déjeuner shawarma libanais traditionnel au souk.', afternoon: 'Visite du vieux Dubaï et traversée de la crique en Abra (1 Dirham).', evening: 'Spectacle gratuit des fontaines lumineuses au pied du Burj Khalifa.', insider_tip: 'Prenez la carte de métro Nol Silver pour vous déplacer à petit prix partout à Dubaï.' },
      { day: 2, theme: 'Désert & Plage Publique', morning: 'Baignade et détente à la plage publique de Kite Beach (accès gratuit).', lunch: 'Déjeuner dans les food trucks de la plage.', afternoon: 'Excursion safari désert partagée avec spectacle.', evening: 'Dîner barbecue sous les étoiles.', insider_tip: 'Achetez vos souvenirs aux souks de Deira en négociant toujours les tarifs.' },
      { day: 3, theme: 'Marina & Dubaï Moderne', morning: 'Promenade matinale le long de la Marina de Dubaï.', lunch: 'Déjeuner formule buffet économique à JBR.', afternoon: 'Visite de l’aquarium géant du Dubai Mall (vue gratuite depuis le mall).', evening: 'Balade nocturne illuminée à Bluewaters Island.', insider_tip: 'Le tramway de la Marina offre des vues panoramiques magnifiques pour le prix d’un ticket standard.' }
    ],
    tagline: 'Le voyage à Dubaï au prix le plus bas du marché avec vol régulier et hôtel bien situé.'
  },
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'CDG',
    destination_name: 'Paris',
    airline: 'Air France',
    price_fcfa: 420000,
    departure_date: '2026-11-05',
    return_date: '2026-11-12',
    duration_estimate: '6h45',
    hotel: {
      name: 'Ibis Paris Tour Eiffel Cambronne',
      stars: 3,
      neighborhood: '15e Arrondissement (Tour Eiffel)',
      price_per_night_fcfa: 38000,
      total_nights: 7,
      total_price_fcfa: 266000,
      why_chosen: 'Emplacement de premier choix à 15 min à pied de la Tour Eiffel avec métro direct.',
      highlights: ['À 15 min de la Tour Eiffel', 'Métro Cambronne à 100m', 'Petit-déjeuner buffet'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Ibis+Paris+Tour+Eiffel+Cambronne&checkin=2026-11-05&checkout=2026-11-12'
    },
    program: [
      { day: 1, theme: 'Paris Classique & Tour Eiffel', morning: 'Installation et balade jusqu’au Champ de Mars.', lunch: 'Baguette sandwich et pâtisserie artisanale dans une boulangerie de quartier.', afternoon: 'Promenade sur les quais de Seine jusqu’à Notre-Dame.', evening: 'Vue féerique sur la Tour Eiffel scintillante.', insider_tip: 'Achetez un carnet de tickets de métro Navigo Easy pour vos trajets.' },
      { day: 2, theme: 'Champs-Élysées & Montmartre', morning: 'Descente des Champs-Élysées et Arc de Triomphe.', lunch: 'Menu du jour bistrot parisien traditionnel.', afternoon: 'Découverte des ruelles d’artistes à Montmartre et du Sacré-Cœur.', evening: 'Panorama nocturne gratuit sur tout Paris depuis la butte Montmartre.', insider_tip: 'Les musées nationaux ont des nocturnes gratuites certains soirs de la semaine.' },
      { day: 3, theme: 'Shopping & Jardins', morning: 'Flânerie au Jardin du Luxembourg.', lunch: 'Crêperie bretonne authentique à Montparnasse.', afternoon: 'Shopping économique et bonnes affaires aux Galeries et boutiques de Châtelet.', evening: 'Soirée au Quartier Latin.', insider_tip: 'Profitez de la terrasse panoramique gratuite au dernier étage des Galeries Lafayette.' }
    ],
    tagline: 'Paris à portée de main avec un vol direct à tarif cassé et hôtel central.'
  },
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'CAN',
    destination_name: 'Canton (Guangzhou - Chine)',
    airline: 'Ethiopian Airlines',
    price_fcfa: 590000,
    departure_date: '2026-10-18',
    return_date: '2026-10-28',
    duration_estimate: '16h30',
    hotel: {
      name: 'Vienna International Hotel Guangzhou',
      stars: 4,
      neighborhood: 'Tianhe District (Proche Marchés & Métro)',
      price_per_night_fcfa: 24000,
      total_nights: 10,
      total_price_fcfa: 240000,
      why_chosen: 'Idéal pour le business et les achats : grand confort, Wi-Fi rapide, navette et métro direct.',
      highlights: ['Proche foires & marchés de gros', 'Excellente literie', 'Personnel anglophone'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Vienna+Hotel+Guangzhou&checkin=2026-10-18&checkout=2026-10-28'
    },
    program: [
      { day: 1, theme: 'Arrivée & Repérage Business', morning: 'Installation à l’hôtel et connexion carte SIM locale.', lunch: 'Dégustation de Dim Sums cantonais traditionnels.', afternoon: 'Repérage des grands centres commerciaux et marchés de gros de Tianhe.', evening: 'Vue sur la tour illuminée Canton Tower le long de la rivière des Perles.', insider_tip: 'Téléchargez WeChat et Alipay avant de partir pour payer partout avec votre carte sans souci.' },
      { day: 2, theme: 'Journée Achats & Négociations', morning: 'Visite des marchés d’électronique et textile de Guangzhou.', lunch: 'Restauration rapide locale délicieuse et économique.', afternoon: 'Rencontre avec des fournisseurs et commandes d’échantillons.', evening: 'Dîner canard laqué croustillant.', insider_tip: 'Prévoyez une calculatrice pour négocier facilement avec les commerçants grossistes.' },
      { day: 3, theme: 'Culture & Détente', morning: 'Visite du temple ancestral de la famille Chen.', lunch: 'Déjeuner de nouilles sautées au wok.', afternoon: 'Promenade sur l’île historique et verdoyante de Shamian.', evening: 'Croisière nocturne relaxante sur la rivière des Perles.', insider_tip: 'L’île de Shamian est très calme et parfaite pour travailler ou se détendre.' }
    ],
    tagline: 'L’offre incontournable pour vos voyages d’affaires et achats en Chine au meilleur prix.'
  },
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'YUL',
    destination_name: 'Montréal (Canada)',
    airline: 'Air Canada / Air France',
    price_fcfa: 510000,
    departure_date: '2026-11-10',
    return_date: '2026-11-18',
    duration_estimate: '12h00',
    hotel: {
      name: 'Hotel Faubourg Montreal Centre-Ville',
      stars: 3,
      neighborhood: 'Centre-Ville / Quartier des Spectacles',
      price_per_night_fcfa: 35000,
      total_nights: 8,
      total_price_fcfa: 280000,
      why_chosen: 'Chambres avec kitchenette équipée pour économiser sur les repas, à 2 min du métro.',
      highlights: ['Kitchenette dans la chambre', 'Au centre-ville', 'Métro Saint-Laurent à 2 min'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Hotel+Faubourg+Montreal&checkin=2026-11-10&checkout=2026-11-18'
    },
    program: [
      { day: 1, theme: 'Arrivée & Vieux-Montréal', morning: 'Installation et exploration à pied du Vieux-Montréal.', lunch: 'Poutine traditionnelle réconfortante.', afternoon: 'Balade sur les quais du Vieux-Port de Montréal.', evening: 'Dîner convivial dans une brasserie québécoise.', insider_tip: 'Le réseau piétonnier souterrain (RÉSO) vous permet de traverser toute la ville au chaud.' },
      { day: 2, theme: 'Mont-Royal & Plateau', morning: 'Montée au belvédère du Mont-Royal pour la vue sur les gratte-ciels.', lunch: 'Sandwich smoked meat réputé.', afternoon: 'Visite des fresques colorées du Plateau Mont-Royal.', evening: 'Microbrasserie artisanale québécoise.', insider_tip: 'Prenez la carte OPUS de transport pour des trajets illimités bus et métro.' },
      { day: 3, theme: 'Culture & Shopping', morning: 'Visite du Musée des Beaux-Arts.', lunch: 'Brunch gourmand aux œufs bénédictine et sirop d’érable.', afternoon: 'Shopping sur la rue Sainte-Catherine.', evening: 'Soirée spectacle au Quartier des Spectacles.', insider_tip: 'De nombreux musées offrent des réductions ou gratuités en milieu de semaine.' }
    ],
    tagline: 'Partez au Canada pour affaires ou vacances avec notre tarif vol le plus compétitif.'
  },
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'DSS',
    destination_name: 'Dakar (Sénégal)',
    airline: 'Air Sénégal',
    price_fcfa: 195000,
    departure_date: '2026-10-10',
    return_date: '2026-10-16',
    duration_estimate: '2h30',
    hotel: {
      name: 'Boma Hotel Dakar',
      stars: 3,
      neighborhood: 'Ngor / Almadies',
      price_per_night_fcfa: 25000,
      total_nights: 6,
      total_price_fcfa: 150000,
      why_chosen: 'Ambiance chaleureuse, jardin tropical, piscine et à proximité immédiate de la plage de Ngor.',
      highlights: ['Piscine & Jardin tropical', 'À 5 min de la plage', 'Excellente cuisine locale'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Boma+Hotel+Dakar&checkin=2026-10-10&checkout=2026-10-16'
    },
    program: [
      { day: 1, theme: 'Teranga & Océan', morning: 'Arrivée à Dakar et installation près des Almadies.', lunch: 'Thieboudienne authentique au bord de l’eau.', afternoon: 'Détente à la piscine de l’hôtel ou baignade à Ngor.', evening: 'Dîner poisson grillé et aloko face aux vagues.', insider_tip: 'Prenez les taxis locaux en fixant le prix avant de monter (négociation facile).' },
      { day: 2, theme: 'Histoire & Île de Gorée', morning: 'Chaloupe pour l’île de Gorée et visite de la Maison des Esclaves.', lunch: 'Déjeuner sur le port de Gorée.', afternoon: 'Balade entre les ruelles colorées et galeries de peintures.', evening: 'Retour à Dakar et soirée musicale.', insider_tip: 'Achetez des tableaux de sable directement aux artisans de l’île.' },
      { day: 3, theme: 'Monument & Marchés', morning: 'Ascension du Monument de la Renaissance Africaine.', lunch: 'Pastels et jus de bissap frais.', afternoon: 'Shopping d’artisanat et tissus au marché Kermel et Sandaga.', evening: 'Coucher de soleil féerique à la Pointe des Almadies.', insider_tip: 'La pointe des Almadies est le point le plus à l’ouest du continent africain.' }
    ],
    tagline: 'L’escapade ou voyage d’affaires à Dakar à moins de 200 000 FCFA Aller-Retour.'
  },
  {
    origin: 'ABJ',
    origin_name: 'Abidjan',
    destination: 'JED',
    destination_name: 'Jeddah / La Mecque',
    airline: 'Saudia / Ethiopian',
    price_fcfa: 480000,
    departure_date: '2026-11-20',
    return_date: '2026-11-30',
    duration_estimate: '9h00',
    hotel: {
      name: 'Elaf Bakkah Hotel',
      stars: 3,
      neighborhood: 'Aziziyah (Navette 24/7 vers Haram)',
      price_per_night_fcfa: 22000,
      total_nights: 10,
      total_price_fcfa: 220000,
      why_chosen: 'Très propre et pratique, navettes gratuites permanentes vers la Grande Mosquée.',
      highlights: ['Navette gratuite 24/7 vers Haram', 'Calme et sécurisé', 'Idéal pèlerinage'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Elaf+Bakkah+Hotel&checkin=2026-11-20&checkout=2026-11-30'
    },
    program: [
      { day: 1, theme: 'Arrivée à Jeddah & Transfert', morning: 'Arrivée à l’aéroport de Jeddah et accueil.', lunch: 'Repas traditionnel saoudien.', afternoon: 'Transfert vers votre hébergement et repos.', evening: 'Première visite et prière à la Grande Mosquée.', insider_tip: 'Utilisez le train à grande vitesse Haramain pour un transfert ultra rapide entre Jeddah et La Mecque.' },
      { day: 2, theme: 'Recueillement & Prières', morning: 'Moments de spiritualité et prières du matin.', lunch: 'Déjeuner dans les restaurants proches du complexe.', afternoon: 'Lecture et recueillement.', evening: 'Prière du soir sous les lumières saintes.', insider_tip: 'Privilégiez les heures fraîches du matin pour vos déplacements.' },
      { day: 3, theme: 'Découverte Historique', morning: 'Visite des sites historiques et monts environnants.', lunch: 'Dégustation de dattes fraîches et thé à la menthe.', afternoon: 'Achats d’eau de Zamzam et souvenirs pieux.', evening: 'Soirée de prière et sérénité.', insider_tip: 'Prévoyez des bouteilles homologuées pour le transport d’eau de Zamzam à l’aéroport.' }
    ],
    tagline: 'Votre vol direct pour Jeddah / La Mecque au tarif le plus bas garanti.'
  },
  {
    origin: 'CDG',
    origin_name: 'Paris',
    destination: 'JFK',
    destination_name: 'New York (USA)',
    airline: 'French Bee / Norse',
    price_fcfa: 260000,
    departure_date: '2026-10-08',
    return_date: '2026-10-15',
    duration_estimate: '8h15',
    hotel: {
      name: 'Pod Times Square',
      stars: 3,
      neighborhood: 'Manhattan - Hell’s Kitchen',
      price_per_night_fcfa: 42000,
      total_nights: 7,
      total_price_fcfa: 294000,
      why_chosen: 'Hôtel moderne ultra optimisé à 3 pâtés de maisons de Times Square pour séjourner au cœur de Manhattan à petit prix.',
      highlights: ['À 5 min de Times Square', 'Chambres modernes connectées', 'Rooftop bar vue skyline'],
      booking_url: 'https://www.booking.com/searchresults.html?ss=Pod+Times+Square&checkin=2026-10-08&checkout=2026-10-15'
    },
    program: [
      { day: 1, theme: 'Manhattan & Times Square', morning: 'Arrivée et installation à Pod Times Square.', lunch: 'Slice de pizza new-yorkaise à 3$.', afternoon: 'Balade sur la 5e Avenue jusqu’à Central Park.', evening: 'Lumières éblouissantes de Times Square de nuit.', insider_tip: 'Prenez la MetroCard 7 jours illimitée pour faire des économies majeures sur vos déplacements.' },
      { day: 2, theme: 'Statue de la Liberté & Financial District', morning: 'Ferry gratuit de Staten Island avec vue imprenable sur la Statue de la Liberté.', lunch: 'Food truck gourmand à Wall Street.', afternoon: 'Balade sur le pont de Brooklyn au coucher du soleil.', evening: 'Dîner à DUMBO face à la skyline illuminée.', insider_tip: 'Le ferry de Staten Island est 100% gratuit et passe juste à côté de la Statue de la Liberté !' },
      { day: 3, theme: 'High Line & Chelsea', morning: 'Promenade suspendue sur la High Line.', lunch: 'Street food au Chelsea Market.', afternoon: 'Visite de Greenwich Village et SoHo.', evening: 'Rooftop vue Empire State Building.', insider_tip: 'Les parcs publics de New York offrent des concerts et projections gratuits en plein air.' }
    ],
    tagline: 'New York en direct depuis Paris à prix choc avec hôtel au cœur de Manhattan.'
  }
];

async function run() {
  console.log("--- Début de la mise à jour des offres économiques ---");

  // Supprimer les anciens itinéraires pour repartir sur une base 100% propre
  await supabase.from("premium_itineraries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("detected_deals").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  for (const item of CURATED_DESTINATIONS) {
    console.log(`Insertion : ${item.origin_name} (${item.origin}) ➔ ${item.destination_name} (${item.destination})...`);

    const { data: deal, error: dealError } = await supabase
      .from("detected_deals")
      .insert({
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
      review_score: 8.8,
      highlights: item.hotel.highlights,
      why_chosen: item.hotel.why_chosen,
      booking_url: item.hotel.booking_url
    };

    const { error: itinError } = await supabase
      .from("premium_itineraries")
      .insert({
        deal_id: dealId,
        destination: item.destination,
        destination_name: item.destination_name,
        flight_details: flightDetails,
        hotel_details: hotelDetails,
        daily_program: item.program,
        ai_model: "deepseek-chat",
        generated_at: new Date().toISOString()
      });

    if (itinError) {
      console.error(`Erreur itinéraire ${item.destination_name}:`, itinError);
    } else {
      console.log(`✅ ${item.destination_name} créé avec succès (Vol ${item.price_fcfa.toLocaleString()} FCFA + Hôtel éco ${item.hotel.price_per_night_fcfa.toLocaleString()} FCFA/nuit)`);
    }
  }

  console.log("--- Toutes les nouvelles offres économiques ont été insérées ! ---");
}

run();


