import { notFound } from "next/navigation";
import { Metadata } from "next";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { Star, Plane, MapPin, Calendar, Clock, CreditCard, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import BookingSection from "../../../components/BookingSection";
import { formatPriceDisplay } from "../../../lib/currency";

async function fetchItineraryDirect(id: string) {
  if (!id) return null;
  try {
    // 1. Recherche par UUID exact
    const { data, error } = await supabaseAdmin
      .from('premium_itineraries')
      .select('*, detected_deals(*)')
      .eq('id', id)
      .maybeSingle();

    if (data && !error) return data;

    // 2. Recherche par code ou nom de destination (ex: DXB, dubai, etc.)
    const { data: fallbackByDest } = await supabaseAdmin
      .from('premium_itineraries')
      .select('*, detected_deals(*)')
      .or(`destination.ilike.%${id}%,destination_name.ilike.%${id}%`)
      .limit(1)
      .maybeSingle();

    if (fallbackByDest) return fallbackByDest;

    // 3. Secours : offre la plus récente
    const { data: latestItinerary } = await supabaseAdmin
      .from('premium_itineraries')
      .select('*, detected_deals(*)')
      .order('generated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    return latestItinerary || null;
  } catch (e) {
    console.error('Error fetching itinerary:', e);
    return null;
  }
}

// Forcer le rendu dynamique pour toujours vérifier les données en temps réel
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const itinerary = await fetchItineraryDirect(id);
    if (!itinerary) {
      return {
        title: "Offre Exclusive de Voyage | Unique Voyage",
        description: "Découvrez nos offres de vols négociés au meilleur prix garanti.",
      };
    }
    const flight = itinerary.flight_details || {};
    const priceInfo = formatPriceDisplay(flight.price_fcfa || 0, flight.origin);
    const title = `Vol ${flight.origin_name || flight.origin} ➔ ${itinerary.destination_name} dès ${priceInfo.primary} | Unique Voyage`;
    const description = `Réservez votre vol Aller-Retour pour ${itinerary.destination_name} avec ${flight.airline || 'compagnie régulière'} au meilleur prix garanti dès ${priceInfo.primary}. Émission de billet rapide et sécurisée.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: flight.destination_image || 'https://uniquevoyage.site/logos/Logo_UniqueVoyage.png',
            width: 1200,
            height: 630,
            alt: `Voyage ${itinerary.destination_name}`,
          },
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [flight.destination_image || 'https://uniquevoyage.site/logos/Logo_UniqueVoyage.png'],
      },
    };
  } catch {
    return {
      title: "Détails de l'itinéraire | Unique Voyage",
      description: "Découvrez notre offre exclusive de vol et hébergement négocié au meilleur prix.",
    };
  }
}

export default async function ItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Récupération de l'itinéraire en direct
  const itinerary = await fetchItineraryDirect(id);
  
  if (!itinerary) {
    notFound();
  }

  // 2. Logique des 24h / 72h
  const generatedAt = new Date(itinerary.generated_at).getTime();
  const now = new Date().getTime();
  const hoursSinceGeneration = (now - generatedAt) / (1000 * 60 * 60);

  
  const isExpired = hoursSinceGeneration >= 72;

  // 3. Récupération des données
  const flight = itinerary.flight_details || {};
  const hotel = itinerary.hotel_details || {};
  const program = itinerary.daily_program || [];

  // Tarifs formatés en fonction de l'origine naturelle
  const flightPrice = formatPriceDisplay(flight.price_fcfa || 0, flight.origin);
  const hotelPrice = hotel.total_price_fcfa ? formatPriceDisplay(hotel.total_price_fcfa, flight.origin) : null;
  const hotelNightPrice = hotel.price_per_night_fcfa ? formatPriceDisplay(hotel.price_per_night_fcfa, flight.origin) : null;

  // Construction des liens d'affiliation réels et fonctionnels
  const formatDateForFlight = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 3) return "";
    return `${parts[2]}${parts[1]}`; // DDMM format
  };

  const origin = flight.origin || "ABJ";
  const destination = flight.destination || "";
  const depStr = formatDateForFlight(flight.departure_date);
  const retStr = formatDateForFlight(flight.return_date);
  const marker = process.env.TRAVELPAYOUTS_MARKER || "545413";
  
  const flightSearchUrl = depStr && destination
    ? `https://www.aviasales.com/search/${origin}${depStr}${destination}${retStr}1?marker=${marker}`
    : `https://www.aviasales.com/search?origin=${origin}&destination=${destination}&marker=${marker}`;

  const cleanBookingUrl = hotel.booking_url && !hotel.booking_url.includes('/hotel/') && !hotel.booking_url.includes('tp.media');
  
  const hotelBookingUrl = cleanBookingUrl
    ? hotel.booking_url
    : `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name + ', ' + (hotel.neighborhood || itinerary.destination_name))}&checkin=${flight.departure_date}&checkout=${flight.return_date}${process.env.BOOKING_AFFILIATE_ID ? `&aid=${process.env.BOOKING_AFFILIATE_ID}` : ""}`;

  const destCode = (flight.destination || "").toUpperCase();
  const destName = (itinerary.destination_name || "").toLowerCase();
  let defaultHero = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';
  if (destName.includes('dubai')) defaultHero = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('paris')) defaultHero = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('dakar')) defaultHero = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('abidjan')) defaultHero = 'https://images.unsplash.com/photo-1572979203492-4244a2c5a088?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('montreal')) defaultHero = 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('canton') || destName.includes('guangzhou')) defaultHero = 'https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('tokyo')) defaultHero = 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('new york')) defaultHero = 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('jeddah')) defaultHero = 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('bruxelle')) defaultHero = 'https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('istanbul')) defaultHero = 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('casablanca')) defaultHero = 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('bordeaux')) defaultHero = 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('marseille')) defaultHero = 'https://images.unsplash.com/photo-1589705279374-2287532cb672?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('lyon')) defaultHero = 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('bangkok')) defaultHero = 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('madrid')) defaultHero = 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('milan')) defaultHero = 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('londres')) defaultHero = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('geneve')) defaultHero = 'https://images.unsplash.com/photo-1573108724029-4c46571d6490?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('accra')) defaultHero = 'https://images.unsplash.com/photo-1599818817478-f02a4bc03203?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('zanzibar')) defaultHero = 'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=1200&q=80';
  else if (destName.includes('toronto') || destName.includes('yto')) defaultHero = 'https://images.unsplash.com/photo-1507992781348-310259076fa0?auto=format&fit=crop&w=1200&q=80';

  const heroImage = (flight?.destination_image && flight.destination_image.startsWith('http') && !flight.destination_image.includes('photo-1436491865332'))
    ? flight.destination_image
    : defaultHero;

  // JSON-LD Structured Data Schema pour Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Vol Aller-Retour ${flight.origin_name || flight.origin} ➔ ${itinerary.destination_name}`,
    "description": itinerary.tagline || `Offre spéciale vol ${flight.airline} pour ${itinerary.destination_name}`,
    "image": heroImage,
    "offers": {
      "@type": "Offer",
      "price": flightPrice.amount,
      "priceCurrency": flightPrice.currency,
      "availability": isExpired ? "https://schema.org/Discontinued" : "https://schema.org/InStock",
      "url": `https://uniquevoyage.site/itinerary/${itinerary.id}`,
      "seller": {
        "@type": "TravelAgency",
        "name": "Unique Voyage",
        "url": "https://uniquevoyage.site",
        "telephone": "+2250545745749"
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/30 font-sans">
      {/* Balise JSON-LD pour les moteurs de recherche */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* HEADER HERO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between px-6 pt-8 pb-12 md:px-16 lg:px-24">
          <header className="flex w-full items-center justify-between">
            <Link href="/" className="flex items-center">
              <svg viewBox="55 65 280 130" className="h-12 md:h-16 w-auto" xmlns="http://www.w3.org/2000/svg">
                <circle cx="120" cy="130" r="56" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M95 105 L95 145 Q95 158 108 158 Q121 158 121 145 L121 118" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                <g transform="translate(133,98) rotate(35)">
                  <path d="M0 0 L26 0 L31 -3 L34 0 L31 3 L26 0 Z" fill="#D85A30"/>
                  <path d="M10 0 L2 -9 L7 -9 L16 -1 Z" fill="#D85A30"/>
                  <path d="M10 0 L2 9 L7 9 L16 1 Z" fill="#D85A30"/>
                  <path d="M22 0 L26 5 L29 5 L27 0 Z" fill="#D85A30"/>
                </g>
                <text x="200" y="122" fontFamily="Georgia, serif" fontSize="34" fill="white" fontWeight="700">Unique</text>
                <text x="200" y="156" fontFamily="Georgia, serif" fontSize="34" fill="#D85A30" fontWeight="700">Voyage</text>
              </svg>
            </Link>
            <Link href="/offres" className="text-xs uppercase tracking-widest hover:text-[#D85A30] transition-colors">
              Toutes les offres
            </Link>
          </header>

          <div className="flex flex-col items-start max-w-3xl">
            <span className="mb-4 text-xs font-light uppercase tracking-[0.3em] text-[#D85A30]">
              Proposition Exclusive
            </span>
            <h1 className="font-playfair text-5xl md:text-7xl leading-tight mb-4">
              Escapade à {itinerary.destination_name}
            </h1>
            <p className="text-lg font-light text-white/70 font-playfair italic">
              "{itinerary.tagline || `Découvrez l'élégance de ${itinerary.destination_name} avec cette offre exclusive.`}"
            </p>
          </div>
        </div>
      </section>

      {/* BANDEAU EXPIRÉ */}
      {isExpired && (
        <div className="w-full bg-[#7a1818] py-5 px-6 text-center shadow-[0_0_30px_rgba(122,24,24,0.3)]">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            ⚠️ OFFRE EXPIRÉE
          </p>
          <p className="text-xs mt-1 text-white/80 max-w-2xl mx-auto">
            Ce tarif exceptionnel n'est plus garanti et les places ont été vendues. Découvrez nos autres opportunités de voyage disponibles dès maintenant.
          </p>
          <Link href="/offres" className="inline-block mt-3 border border-white/20 bg-black/30 px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Voir d'autres offres
          </Link>
        </div>
      )}

      {/* CONTENU PRINCIPAL */}
      <div className="px-6 py-16 md:px-16 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* COLONNE GAUCHE (Détails) */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* VOL */}
          <section>
            <h2 className="text-sm font-light uppercase tracking-[0.3em] text-white/50 mb-8 border-b border-white/10 pb-4">
              01. Le Vol
            </h2>
            <div className="bg-white/5 border border-white/10 p-8 hover:border-white/30 transition-colors">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#D85A30]/20 flex items-center justify-center">
                    <Plane className="text-[#D85A30]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair">{flight.airline}</h3>
                    <p className="text-sm text-white/50">{flight.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-playfair text-[#D85A30] font-bold">{flightPrice.primary}</p>
                  {flightPrice.secondary && (
                    <p className="text-xs text-white/40">{flightPrice.secondary}</p>
                  )}
                  <p className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">Aller-Retour Garanti</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold">{flight.origin}</p>
                  <p className="text-white/50">{flight.departure_date}</p>
                </div>
                <div className="flex-1 px-8 relative flex items-center justify-center">
                  <div className="h-[1px] w-full bg-white/20 absolute top-1/2"></div>
                  <Plane size={16} className="text-white/50 absolute bg-[#101010] px-1" />
                  <span className="absolute -top-6 text-xs text-white/50">{flight.duration_estimate}</span>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{flight.destination}</p>
                  <p className="text-white/50">{flight.return_date}</p>
                </div>
              </div>
            </div>
          </section>

          {/* HÔTEL */}
          <section>
            <h2 className="text-sm font-light uppercase tracking-[0.3em] text-white/50 mb-8 border-b border-white/10 pb-4">
              02. L'Hébergement Conseillé
            </h2>
            <div className="bg-white/5 border border-white/10 p-8 hover:border-white/30 transition-colors">
              <div className="flex flex-col md:flex-row gap-8 justify-between">
                <div>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: hotel.stars || 3 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#D85A30] text-[#D85A30]" />
                    ))}
                  </div>
                  <h3 className="text-3xl font-playfair mb-2">
                    {hotel.name}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-white/70 mb-6">
                    <MapPin size={14} /> 
                    {hotel.neighborhood}
                  </p>
                  
                  <p className="text-sm text-white/80 leading-relaxed font-light mb-6">
                    "{hotel.why_chosen}"
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {(hotel.highlights || []).map((highlight: string, idx: number) => (
                      <span key={idx} className="text-xs border border-white/20 px-3 py-1 text-white/70 flex items-center gap-2">
                        <Check size={12} className="text-[#D85A30]"/> {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                {hotelPrice && hotelNightPrice && (
                  <div className="md:text-right shrink-0">
                    <p className="text-3xl font-playfair text-[#D85A30] font-bold">
                      {hotelPrice.primary}
                    </p>
                    {hotelPrice.secondary && (
                      <p className="text-xs text-white/40">{hotelPrice.secondary}</p>
                    )}
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1 mt-1">Total pour {hotel.total_nights} nuits</p>
                    <p className="text-xs text-white/40">Soit {hotelNightPrice.primary} / nuit</p>
                  </div>
                )}
              </div>
            </div>
          </section>


          {/* PROGRAMME */}
          <section>
            <h2 className="text-sm font-light uppercase tracking-[0.3em] text-white/50 mb-8 border-b border-white/10 pb-4">
              03. Le Programme
            </h2>
            <div className="space-y-6">
              {program.map((day: any, idx: number) => (
                <div key={idx} className="border-l border-[#D85A30]/30 pl-6 relative">
                  <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-[#D85A30]"></div>
                  <h4 className="text-xs font-light uppercase tracking-widest text-[#D85A30] mb-2">
                    Jour {day.day} — {day.theme}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-light text-white/80">
                    <div className="bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40 mb-1">Matin</p>
                      <p>{day.morning}</p>
                    </div>
                    <div className="bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40 mb-1">Déjeuner</p>
                      <p>{day.lunch}</p>
                    </div>
                    <div className="bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40 mb-1">Après-midi</p>
                      <p>{day.afternoon}</p>
                    </div>
                    <div className="bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40 mb-1">Soir</p>
                      <p>{day.evening}</p>
                    </div>
                  </div>
                  
                  {day.insider_tip && (
                    <div className="mt-4 text-xs italic text-white/60 bg-[#D85A30]/10 p-3 border-l-2 border-[#D85A30]">
                      💡 <strong>Conseil Concierge :</strong> {day.insider_tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* COLONNE DROITE (Booking & Résumé) */}
        <div className="lg:col-span-1">
          <BookingSection
            flight={flight}
            hotel={hotel}
            flightSearchUrl={flightSearchUrl}
            hotelBookingUrl={hotelBookingUrl}
            isExpired={isExpired}
          />
        </div>
      </div>

      {/* FOOTER LÉGAL */}
      <footer className="relative w-full bg-[#1A1A1A] px-6 py-8 mt-16 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <span className="text-[10px] font-light uppercase tracking-widest text-[#737373]">
              © 2026 UniqueVoyage. Tous droits réservés.
            </span>
            <div className="flex gap-8">
              <Link href="/mentions-legales" className="text-[10px] font-light uppercase tracking-widest text-[#737373] transition-colors hover:text-white">
                Mentions légales
              </Link>
              <Link href="/conditions-utilisation" className="text-[10px] font-light uppercase tracking-widest text-[#737373] transition-colors hover:text-white">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
