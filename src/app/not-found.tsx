import Link from 'next/link';
import { Plane, Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080808] text-white flex flex-col justify-between px-6 py-12 md:px-16 lg:px-24 selection:bg-[#D85A30] selection:text-white font-sans">
      {/* HEADER */}
      <header className="flex w-full items-center justify-between">
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
        <Link href="/offres" className="text-xs uppercase tracking-widest text-[#D85A30] hover:text-white transition-colors">
          Nos Offres
        </Link>
      </header>

      {/* CONTENU CENTRAL */}
      <div className="max-w-2xl mx-auto text-center my-auto py-16">
        <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
          <Compass size={32} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#D85A30] font-bold mb-3 block">
          OFFRE MISE À JOUR OU INTROUVABLE
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
          Cette destination a pris son envol
        </h1>
        <p className="text-sm font-light text-white/60 leading-relaxed mb-10 max-w-lg mx-auto">
          L'offre demandée a été actualisée ou n'est plus disponible à ce tarif. Découvrez toutes nos autres opportunités de vols à prix exceptionnels.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/offres"
            className="w-full sm:w-auto bg-[#D85A30] hover:bg-[#b84a25] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg rounded-xl flex items-center justify-center gap-2"
          >
            <Plane size={14} /> Explorer toutes les offres
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all rounded-xl flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-[10px] text-white/30 uppercase tracking-widest">
        © 2026 Unique Voyage. Billetterie & Conciergerie Privée.
      </footer>
    </main>
  );
}
