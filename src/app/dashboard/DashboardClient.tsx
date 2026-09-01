"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type User = {
  id: string;
  whatsapp_number: string;
};

type Itinerary = {
  id: string;
  destination_name: string;
  generated_at: string;
  flight_details: any;
};

export default function DashboardClient({ user, itineraries = [] }: { user: User, itineraries?: Itinerary[] }) {
  const [copied, setCopied] = useState(false);

  const referralLink = `https://uniquevoyage.site?ref=${user.id}`;
  const whatsappMessage = encodeURIComponent(`🔥 Rejoins UniqueVoyage pour découvrir des vols secrets depuis Abidjan (jusqu'à -50%) ! Clique ici : ${referralLink}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white font-sans antialiased">
      {/* --- Header ---*/}
      <header className="border-b border-white/[0.07] px-6 py-5 md:px-12 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <svg viewBox="55 65 280 130" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
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
        </a>
        <a
          href="/api/auth/logout"
          className="text-[11px] uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors"
        >
          Déconnexion
        </a>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-24 space-y-10">

        {/* --- Badge & Titre --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">
            Espace Membre
          </span>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            Bienvenue dans votre espace.
          </h1>
          <p className="text-sm text-white/45 font-light">
            WhatsApp : {user.whatsapp_number}
          </p>
        </motion.div>

        <div className="h-px w-full bg-white/[0.07]" />

        {/* ====================== DERNIÈRES OFFRES IA ====================== */}
        <div className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">Dernières Offres Détectées</h2>
          {itineraries.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center text-sm font-light text-white/40">
              L'IA scanne actuellement le web. Les prochaines offres apparaîtront ici.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {itineraries.map((it) => (
                <a
                  key={it.id}
                  href={`/itinerary/${it.id}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-[#D85A30]/50 transition-colors"
                >
                  <div>
                    <p className="text-xs text-[#D85A30] font-bold uppercase tracking-widest mb-1">
                      {new Date(it.generated_at).toLocaleDateString()}
                    </p>
                    <h3 className="text-xl font-serif">{it.destination_name}</h3>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-white/50">{it.flight_details?.price_fcfa || "---"} FCFA</p>
                    <ArrowRight size={16} className="text-white/30 group-hover:text-white transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
