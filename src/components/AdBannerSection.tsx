"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdBanner {
  id: string;
  badge?: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  isExternal: boolean;
  accentColor: string;
  isSpecialContact?: boolean;
}

const PROMOTIONAL_BANNERS: AdBanner[] = [
  // 1. ETHICAL HACKER PREP → ethicalhackerprep.com
  {
    id: "ethical-hacker-prep",
    title: "Ethical Hacker Prep",
    subtitle: "Think like a hacker. Defend like a pro. Practice, Master, Get Certified.",
    image: "/images/ads/ethical-hacker-prep.png",
    ctaText: "START YOUR JOURNEY TODAY",
    ctaLink: "https://ethicalhackerprep.com",
    isExternal: true,
    accentColor: "#ef4444",
  },

  // 2. DOCU EXPRESS → docuexpress (contact WhatsApp)
  {
    id: "docu-express",
    title: "Docu Express",
    subtitle: "Créez un CV qui vous ressemble. Des modèles futuristes adaptés à tous les secteurs.",
    image: "/images/ads/docu-express.png",
    ctaText: "CRÉER MON CV MAINTENANT",
    ctaLink: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite créer mon CV avec DocuExpress."),
    isExternal: true,
    accentColor: "#7c3aed",
  },

  // 3. GADJICO WEB AGENCY → gadjico.netlify.app
  {
    id: "gadjico-web",
    title: "Gadjico Web Agency",
    subtitle: "Créez un site web exceptionnel en une semaine ! Contactez-nous pour un devis gratuit.",
    image: "/images/ads/gadjico-web.png",
    ctaText: "DEMANDER UN DEVIS",
    ctaLink: "https://gadjico.netlify.app",
    isExternal: true,
    accentColor: "#f59e0b",
  },

  // 4. BANNIÈRE "VOTRE PUBLICITÉ ICI" (Lien WhatsApp Direct)
  {
    id: "votre-pub-ici",
    badge: "ESPACE ANNONCEUR DISPONIBLE",
    title: "VOTRE PUBLICITÉ ICI",
    subtitle: "Mettez en avant votre marque auprès de notre audience premium.",
    image: "/images/ads/votre-pub-ici.png",
    ctaText: "CONTACTEZ-NOUS",
    ctaLink: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un encart publicitaire sur Unique Voyage."),
    isExternal: true,
    accentColor: "#D85A30",
    isSpecialContact: true,
  },
];

export default function AdBannerSection() {
  const [currentAd, setCurrentAd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % PROMOTIONAL_BANNERS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const ad = PROMOTIONAL_BANNERS[currentAd];

  return (
    <section 
      className="relative w-full bg-[#080808] py-6 sm:py-10 px-4 sm:px-8 md:px-16 lg:px-24 border-y border-white/[0.08] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Halo de lumière ambiante colorée */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none opacity-20 blur-[100px] transition-colors duration-1000"
        style={{ backgroundColor: ad.accentColor }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Conteneur Carrousel Publicitaire */}
        <div className="relative h-[340px] sm:h-[380px] md:h-[400px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.85)] group">
          
          {/* Images avec transition animée — Affichage plein écran (les affiches contiennent déjà le texte) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <a
                href={ad.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer"
                aria-label={ad.title}
              >
                <Image
                  src={ad.image}
                  alt={ad.title}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Boutons de navigation Précédent / Suivant */}
          <button
            type="button"
            onClick={() => setCurrentAd((prev) => (prev === 0 ? PROMOTIONAL_BANNERS.length - 1 : prev - 1))}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#D85A30] text-white/80 hover:text-white p-2.5 sm:p-3.5 rounded-full border border-white/20 transition-all backdrop-blur-md z-20 active:scale-90 shadow-lg"
            aria-label="Annonce précédente"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => setCurrentAd((prev) => (prev === PROMOTIONAL_BANNERS.length - 1 ? 0 : prev + 1))}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#D85A30] text-white/80 hover:text-white p-2.5 sm:p-3.5 rounded-full border border-white/20 transition-all backdrop-blur-md z-20 active:scale-90 shadow-lg"
            aria-label="Annonce suivante"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicateurs de progression (Points / Dots) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            {PROMOTIONAL_BANNERS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentAd(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentAd 
                    ? "w-7 bg-[#D85A30]" 
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}