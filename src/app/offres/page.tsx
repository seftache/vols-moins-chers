import { createSupabaseServerClient } from "../../lib/supabase-server";
import { supabaseAdmin } from "../../lib/supabase-admin";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Forcer la page à être dynamique pour toujours avoir les dernières offres
export const dynamic = "force-dynamic";

export default async function OffresPage() {
  // Récupérer toutes les offres (on limite à 100 pour la performance)
  const { data: itineraries, error } = await supabaseAdmin
    .from("premium_itineraries")
    .select("id, destination_name, generated_at")
    .order("generated_at", { ascending: false })
    .limit(100);

  // Fonction utilitaire pour attribuer une image en fonction de la destination
  const getImageForDestination = (destName: string) => {
    const dest = destName.toLowerCase();
    if (dest.includes('dubaï') || dest.includes('dubai')) return "/images/destinations/dubai.jpg";
    if (dest.includes('paris')) return "/images/destinations/Paris.jpg";
    if (dest.includes('dakar')) return "/images/destinations/dakar.jpg";
    if (dest.includes('montréal') || dest.includes('montreal')) return "/images/destinations/montreal.jpg";
    if (dest.includes('londres') || dest.includes('london')) return "/images/destinations/londres.jpg";
    if (dest.includes('tokyo')) return "/images/destinations/tokyo.jpg";
    
    // Génération dynamique d'une magnifique image de luxe pour n'importe quelle autre ville !
    return `https://image.pollinations.ai/prompt/luxury%20travel%20destination%20${encodeURIComponent(destName)}%20cityscape%20photography%20high%20quality?width=800&height=1200&nologo=true`;
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D85A30] selection:text-white">
      
      {/* HEADER SIMPLE */}
      <header className="flex w-full items-center justify-between px-6 pt-8 pb-4 md:px-16 lg:px-24 border-b border-white/10">
        <Link href="/" className="flex items-center">
          <svg viewBox="55 65 280 130" className="h-10 md:h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
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
        <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D85A30] hover:text-white transition-colors">
          Retour à l'accueil
        </Link>
      </header>

      {/* SECTION TITRE */}
      <section className="px-6 py-20 md:px-16 lg:px-24 text-center max-w-4xl mx-auto">
        <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#D85A30] mb-4 block">
          CATALOGUE CONFIDENTIEL
        </span>
        <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-7xl uppercase tracking-tight leading-[0.95] mb-6">
          Toutes les<br/>Offres Secrètes
        </h1>
        <p className="text-sm font-light italic text-white/55 leading-relaxed">
          Découvrez l'ensemble des erreurs de prix et des vols exceptionnels dénichés par notre intelligence artificielle. 
          Les places partent vite.
        </p>
      </section>

      {/* GRILLE D'OFFRES */}
      <section className="px-6 pb-32 md:px-16 lg:px-24">
        {(!itineraries || itineraries.length === 0) ? (
          <div className="text-center py-20 border border-white/10">
            <p className="text-white/40 font-light italic">Aucune offre disponible pour le moment. L'algorithme cherche...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {itineraries.map((item) => {
              const generatedAt = new Date(item.generated_at).getTime();
              const now = new Date().getTime();
              const hoursSinceGeneration = (now - generatedAt) / (1000 * 60 * 60);
              const isExpired = hoursSinceGeneration >= 72;

              return (
              <Link 
                href={`/itinerary/${item.id}`} 
                key={item.id}
                className="group relative aspect-[3/4] overflow-hidden bg-[#0A0A0A] block"
              >
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105 ${isExpired ? 'grayscale opacity-50' : ''}`}
                  style={{ backgroundImage: `url('${getImageForDestination(item.destination_name)}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/70" />

                {isExpired && (
                  <div className="absolute top-4 right-4 z-20 bg-[#7a1818] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    Expiré
                  </div>
                )}

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                  <h3 className={`font-sans font-extrabold text-2xl uppercase tracking-wide leading-tight transform transition-transform duration-500 group-hover:-translate-y-2 ${isExpired ? 'text-white/50' : 'text-white'}`}>
                    {item.destination_name}
                  </h3>
                  
                  <p className="text-white/80 text-sm mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-4 leading-relaxed line-clamp-3">
                    {/* On utilise une description par défaut car tagline a été retiré plus tôt */}
                    Découvrez des expériences inoubliables et des prix exceptionnels pour {item.destination_name}.
                  </p>

                  <div className={`mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${isExpired ? 'text-white/30 group-hover:text-white/50' : 'text-[#D85A30] group-hover:text-white'}`}>
                    {isExpired ? "Voir l'offre ratée" : "Découvrir l'offre"} <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )})}
          </div>
        )}
      </section>

      {/* FOOTER LÉGAL */}
      <footer className="relative w-full bg-[#1A1A1A] px-6 py-8 md:px-16 lg:px-24">
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
