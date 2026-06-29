import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "../../../lib/supabase-server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { Lock, Star, Plane, MapPin, Calendar, Clock, CreditCard, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

// Forcer le rendu dynamique pour toujours vérifier le statut VIP en temps réel
export const dynamic = 'force-dynamic';

export default async function ItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  
  // 1. Récupération de l'utilisateur et de son statut VIP
  const { data: authData } = await supabase.auth.getUser();
  let isVip = false;
  
  if (authData?.user) {
    // Utiliser admin pour lire le profil utilisateur en toute sécurité si RLS strict
    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('is_vip')
      .eq('id', authData.user.id)
      .single();
      
    if (userData?.is_vip) {
      isVip = true;
    }
  }

  // 2. Récupération de l'itinéraire avec supabaseAdmin (contourne le RLS qui bloque l'anonyme)
  const { data: itinerary, error } = await supabaseAdmin
    .from('premium_itineraries')
    .select('*, detected_deals(*)')
    .eq('id', id)
    .single();

  if (error || !itinerary) {
    notFound();
  }

  // 3. Logique des 24h
  const generatedAt = new Date(itinerary.generated_at).getTime();
  const now = new Date().getTime();
  const hoursSinceGeneration = (now - generatedAt) / (1000 * 60 * 60);
  
  const isLocked = !isVip && hoursSinceGeneration < 24;
  const isExpired = hoursSinceGeneration >= 72;

  // 4. Redaction des données si bloqué
  const flight = itinerary.flight_details;
  const hotel = itinerary.hotel_details;
  const program = itinerary.daily_program;

  const displayAirline = isLocked ? "Compagnie Partenaire" : flight.airline;
  const displayHotelName = isLocked ? "Hôtel 5★ Mystère" : hotel.name;
  
  // Fonction utilitaire pour le rendu du texte flouté sécurisé
  const renderLockedText = (realText: string, fallbackText: string) => {
    if (!isLocked) return realText;
    return (
      <span className="relative">
        <span className="blur-sm select-none opacity-50">{fallbackText}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <Lock size={14} className="text-[#D85A30]" />
        </span>
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/30 font-sans">
      
      {/* HEADER HERO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        {/* On peut utiliser une image dynamique basée sur la destination plus tard, ici un placeholder luxueux */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3000&auto=format&fit=crop')` }}
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
            {!authData?.user ? (
              <Link href="/auth" className="text-xs uppercase tracking-widest hover:text-[#D85A30] transition-colors">
                Connexion
              </Link>
            ) : isVip ? (
              <span className="border border-[#D85A30] bg-[#D85A30]/10 px-4 py-2 text-xs uppercase tracking-widest text-[#D85A30]">
                Membre VIP
              </span>
            ) : null}
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

      {/* BANDEAU LOCK */}
      {isLocked && !isExpired && (
        <div className="w-full bg-[#D85A30] py-4 px-6 text-center shadow-[0_0_30px_rgba(216,90,48,0.3)]">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Lock size={18} />
            Détails réservés aux membres VIP pendant {Math.ceil(24 - hoursSinceGeneration)}h
          </p>
          <p className="text-xs mt-1 text-white/80">
            Abonnez-vous pour voir l'hôtel exact, la compagnie et réserver ce tarif avant qu'il n'expire.
          </p>
          <Link href="/auth" className="inline-block mt-3 bg-black px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Devenir VIP (2500 FCFA/mois)
          </Link>
        </div>
      )}

      {/* BANDEAU EXPIRÉ */}
      {isExpired && (
        <div className="w-full bg-[#7a1818] py-5 px-6 text-center shadow-[0_0_30px_rgba(122,24,24,0.3)]">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            ⚠️ OFFRE EXPIRÉE
          </p>
          <p className="text-xs mt-1 text-white/80 max-w-2xl mx-auto">
            Ce tarif exceptionnel n'est plus garanti et les places ont été vendues. Abonnez-vous au Club VIP pour être alerté instantanément de nos prochaines erreurs de prix avant tout le monde.
          </p>
          <Link href="/auth" className="inline-block mt-3 border border-white/20 bg-black/30 px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Rejoindre le Club VIP
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
                    <h3 className="text-xl font-playfair">{displayAirline}</h3>
                    <p className="text-sm text-white/50">{flight.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-playfair text-[#D85A30]">{flight.price_fcfa.toLocaleString()} FCFA</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Aller-Retour</p>
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
              02. L'Hébergement
            </h2>
            <div className="bg-white/5 border border-white/10 p-8 hover:border-white/30 transition-colors">
              <div className="flex flex-col md:flex-row gap-8 justify-between">
                <div>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#D85A30] text-[#D85A30]" />
                    ))}
                  </div>
                  <h3 className="text-3xl font-playfair mb-2">
                    {isLocked ? renderLockedText(hotel.name, "Hôtel Plaza Palace") : hotel.name}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-white/70 mb-6">
                    <MapPin size={14} /> 
                    {isLocked ? renderLockedText(hotel.neighborhood, "Quartier chic") : hotel.neighborhood}
                  </p>
                  
                  <p className="text-sm text-white/80 leading-relaxed font-light mb-6">
                    "{hotel.why_chosen}"
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {hotel.highlights.map((highlight: string, idx: number) => (
                      <span key={idx} className="text-xs border border-white/20 px-3 py-1 text-white/70 flex items-center gap-2">
                        <Check size={12} className="text-[#D85A30]"/> {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="md:text-right shrink-0">
                  <p className="text-3xl font-playfair text-[#D85A30]">
                    {hotel.total_price_fcfa.toLocaleString()} FCFA
                  </p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total pour {hotel.total_nights} nuits</p>
                  <p className="text-xs text-white/40">Soit {hotel.price_per_night_fcfa.toLocaleString()} FCFA / nuit</p>
                </div>
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
                      <p>{isLocked ? renderLockedText(day.morning, "Activité culturelle exclusive et découverte des joyaux de la ville.") : day.morning}</p>
                    </div>
                    <div className="bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40 mb-1">Déjeuner</p>
                      <p>{isLocked ? renderLockedText(day.lunch, "Déjeuner gastronomique dans une adresse secrète.") : day.lunch}</p>
                    </div>
                    <div className="bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40 mb-1">Après-midi</p>
                      <p>{isLocked ? renderLockedText(day.afternoon, "Détente ou shopping dans les quartiers prestigieux.") : day.afternoon}</p>
                    </div>
                    <div className="bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40 mb-1">Soir</p>
                      <p>{isLocked ? renderLockedText(day.evening, "Dîner élégant et soirée inoubliable.") : day.evening}</p>
                    </div>
                  </div>
                  
                  {!isLocked && day.insider_tip && (
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
          <div className="sticky top-8 bg-white/5 border border-white/10 p-8">
            <h3 className="font-playfair text-2xl mb-6 border-b border-white/10 pb-4">Résumé du budget</h3>
            
            <div className="space-y-4 text-sm font-light mb-8">
              <div className="flex justify-between">
                <span className="text-white/60 flex items-center gap-2"><Plane size={14}/> Vol</span>
                <span>{(flight.price_fcfa || 0).toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 flex items-center gap-2"><Star size={14}/> Hôtel</span>
                <span>{(hotel.total_price_fcfa || 0).toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 flex items-center gap-2"><CreditCard size={14}/> Activités (Est.)</span>
                <span>{Math.round(((flight.price_fcfa || 0) + (hotel.total_price_fcfa || 0)) * 0.3).toLocaleString()} FCFA</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2 font-playfair">
                <div className="flex justify-between text-sm text-white/40 line-through">
                  <span>Prix Public Habituel</span>
                  <span>{Math.round((((flight.price_fcfa || 0) + (hotel.total_price_fcfa || 0)) * 1.6) + Math.round(((flight.price_fcfa || 0) + (hotel.total_price_fcfa || 0)) * 0.3)).toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-2xl">
                  <span>Tarif VIP Secret</span>
                  <span className="text-[#D85A30] font-bold">
                    {((flight.price_fcfa || 0) + (hotel.total_price_fcfa || 0) + Math.round(((flight.price_fcfa || 0) + (hotel.total_price_fcfa || 0)) * 0.3)).toLocaleString()} FCFA
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center italic mt-2">Par personne. Les prix peuvent varier selon les disponibilités.</p>
            </div>

            {isLocked && !isExpired ? (
              <button disabled className="w-full bg-white/10 text-white/50 py-4 text-xs uppercase tracking-widest cursor-not-allowed border border-white/10 flex items-center justify-center gap-2">
                <Lock size={14} /> Débloquer pour réserver
              </button>
            ) : isExpired ? (
              <button disabled className="w-full bg-[#7a1818]/20 text-[#7a1818] border border-[#7a1818]/30 py-4 text-xs font-bold uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2">
                OFFRE EXPIRÉE
              </button>
            ) : (
              <div className="space-y-3">
                {/* Liens d'affiliation */}
                <a 
                  href={`https://search.travelpayouts.com/flights?origin=ABJ&destination=${flight.destination}`} 
                  target="_blank" rel="noreferrer"
                  className="w-full bg-[#D85A30] hover:bg-[#b84a25] text-white py-4 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 font-bold"
                >
                  Réserver le vol <ChevronRight size={16} />
                </a>
                <a 
                  href={`https://www.booking.com/searchresults.html?city=${flight.destination}&aid=YOUR_AFFILIATE_ID`} 
                  target="_blank" rel="noreferrer"
                  className="w-full bg-white text-black hover:bg-gray-200 py-4 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 font-bold"
                >
                  Réserver l'hôtel <ChevronRight size={16} />
                </a>
              </div>
            )}
            
          </div>
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
              <a href="#" className="text-[10px] font-light uppercase tracking-widest text-[#737373] transition-colors hover:text-white">
                Mentions légales
              </a>
              <a href="#" className="text-[10px] font-light uppercase tracking-widest text-[#737373] transition-colors hover:text-white">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
