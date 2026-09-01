import { supabaseAdmin } from "../../lib/supabase-admin";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import OffresClient from "./OffresClient";

const getCachedAllItineraries = unstable_cache(
  async () => {
    const { data: itineraries, error } = await supabaseAdmin
      .from("premium_itineraries")
      .select("id, destination_name, generated_at, flight_details")
      .order("generated_at", { ascending: false })
      .limit(100);
      
    if (error) {
      throw error;
    }
    return itineraries || [];
  },
  ['all-itineraries-list-v2'],
  { revalidate: 300, tags: ['itineraries'] }
);

export const dynamic = "force-dynamic";

export default async function OffresPage() {
  let itineraries: any[] = [];
  try {
    itineraries = await getCachedAllItineraries();
  } catch (err) {
    console.error("Error fetching itineraries:", err);
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-[#D85A30] selection:text-white font-sans">
      
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
      <section className="px-6 py-16 md:px-16 lg:px-24 text-center max-w-4xl mx-auto">
        <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#D85A30] mb-3 block font-bold">
          BILLETTERIE & PRIX NÉGOCIÉS
        </span>
        <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-tight mb-4">
          Nos Offres de Vols Privilèges
        </h1>
        <p className="text-sm font-light text-white/60 leading-relaxed max-w-2xl mx-auto">
          Consultez nos meilleures opportunités de vols aux tarifs les plus compétitifs du marché. Réservation officielle garantie par notre service billetterie.
        </p>
      </section>

      {/* COMPOSANT CLIENT AVEC FILTRES DE DÉPART */}
      <OffresClient itineraries={itineraries} />

      {/* FOOTER LÉGAL */}
      <footer className="relative w-full bg-[#111111] border-t border-white/10 px-6 py-8 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <span className="text-[10px] font-light uppercase tracking-widest text-[#737373]">
              © 2026 Unique Voyage. Billetterie & Conciergerie Privée.
            </span>
            <div className="flex gap-8">
              <Link href="/" className="text-[10px] font-light uppercase tracking-widest text-[#737373] transition-colors hover:text-white">
                Accueil
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
