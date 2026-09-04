import { Metadata } from "next";
import { supabaseAdmin } from "../../lib/supabase-admin";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import OffresClient from "./OffresClient";
import FlightSearchBar from "../../components/FlightSearchBar";

export const metadata: Metadata = {
  title: "Bons Plans Billets d'Avion Moins Chers & Vols en Direct | Unique Voyage",
  description: "Découvrez toutes les offres de billets d'avion moins chers détectées en temps réel par notre algorithme. Vols au départ d'Abidjan, Dakar, Paris, Casablanca, Bruxelles et Accra au prix le plus bas garanti. Réservation sécurisée par Mobile Money, Wave, PayPal et cartes bancaires.",
  keywords: [
    "billet avion moins cher",
    "bons plans vol",
    "billets avion pas cher abidjan",
    "promo vol dakar",
    "vol pas cher paris abidjan",
    "unique voyage offres"
  ],
  openGraph: {
    title: "Bons Plans Billets d'Avion Moins Chers & Vols en Direct | Unique Voyage",
    description: "Vols à prix cassés au départ de Paris, Abidjan, Montréal, New York, Dakar et Dubaï.",
    url: "https://uniquevoyage.site/offres",
    type: "website",
  },
};

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

      {/* COMPOSANT CLIENT AVEC FILTRES DE DÉPART (AFFICHÉ EN PREMIER) */}
      <OffresClient itineraries={itineraries} />

      {/* MOTEUR DE RECHERCHE LIBRE OPTIONNEL (PLACÉ TOUT EN BAS SI LE CLIENT NE TROUVE PAS SON VOL) */}
      <section className="px-6 py-16 md:px-16 lg:px-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-widest text-[#D85A30] font-semibold">
              Optionnel · Recherche sur mesure
            </span>
            <h2 className="font-playfair text-xl md:text-2xl text-white font-medium mt-1">
              Vous ne trouvez pas votre trajet ? Recherchez n'importe quel vol dans le monde
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Indiquez votre ville de départ et d'arrivée pour explorer tous les itinéraires disponibles.
            </p>
          </div>
          <FlightSearchBar />
        </div>
      </section>

      {/* MAILLAGE INTERNE DES LIAISONS POPULAIRES (SEO) */}
      <section className="px-6 py-16 md:px-16 lg:px-24 border-t border-white/10 bg-[#060606]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D85A30] font-bold block mb-1">
              GUIDE DES LIAISONS & PRIX LES PLUS BAS
            </span>
            <h2 className="font-playfair text-2xl md:text-3xl text-white font-medium">
              Trouvez votre billet d'avion moins cher par destination
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            <Link href="/vols-pas-chers/abidjan-paris" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Billet Abidjan — Paris dès 230 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/abidjan-dubai" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol Abidjan — Dubaï dès 380 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/abidjan-istanbul" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol direct Abidjan — Istanbul dès 310 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/dakar-paris" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol Dakar — Paris dès 235 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/dakar-istanbul" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol direct Dakar — Istanbul dès 320 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/douala-paris" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol direct Douala — Paris dès 390 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/cotonou-istanbul" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol direct Cotonou — Istanbul dès 335 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/bamako-paris" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol direct Bamako — Paris dès 350 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/abidjan-bruxelles" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol direct Abidjan — Bruxelles dès 320 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/abidjan-zanzibar" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol Abidjan — Zanzibar dès 420 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/abidjan-marrakech" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol Abidjan — Marrakech dès 285 000 FCFA
            </Link>
            <Link href="/vols-pas-chers/dubai-bangkok" className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D85A30] hover:text-[#D85A30] transition-colors text-zinc-300">
              ✈️ Vol direct Dubaï — Bangkok dès 220 000 FCFA
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/vols-pas-chers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/15 text-xs uppercase tracking-widest text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/15 transition-all"
            >
              Explorer les 5 Grands Hubs & 50+ Liaisons Négociées →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER LÉGAL */}
      <footer className="relative w-full bg-[#111111] border-t border-white/10 px-6 py-8 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <span className="text-[10px] font-light uppercase tracking-widest text-[#737373]">
                © 2026 Unique Voyage. Billetterie & Conciergerie Privée.
              </span>
              <span className="text-[10px] font-light uppercase tracking-widest text-[#888888]">
                Design by{" "}
                <a
                  href="https://gadjico.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D85A30] font-semibold transition-colors underline decoration-[#D85A30]/60 underline-offset-4"
                >
                  Gadjico
                </a>
              </span>
            </div>
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
