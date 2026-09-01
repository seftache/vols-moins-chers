"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, PhoneCall, ArrowUpRight } from "lucide-react";

interface AdBanner {
  id: string;
  title: string;
  image?: string;
  link: string;
  isCodedSlide?: boolean;
}

const PROMOTIONAL_BANNERS: AdBanner[] = [
  // 1. DOCU EXPRESS (https://docuexpress.site)
  {
    id: "docu-express",
    title: "Docu Express — Créez un CV qui vous ressemble",
    image: "/images/ads/docu-express.png",
    link: "https://docuexpress.site",
  },
  // 2. ETHICAL HACKER PREP (https://ethicalhackerprep.com)
  {
    id: "ethical-hacker-prep",
    title: "Ethical Hacker Prep — Think like a hacker, Defend like a pro",
    image: "/images/ads/ethical-hacker-prep.png",
    link: "https://ethicalhackerprep.com",
  },
  // 3. GADJICO WEB AGENCY (https://gadjico.netlify.app)
  {
    id: "gadjico-web",
    title: "Gadjico Web Agency — Créez un site web exceptionnel",
    image: "/images/ads/gadjico-web.png",
    link: "https://gadjico.netlify.app",
  },
  // 4. EMPLOIS DUBAÏ (https://emploisdubai.com)
  {
    id: "emplois-dubai",
    title: "Emplois Dubaï — Recrutement & Placement Premium",
    image: "/images/ads/emplois-dubai.jpg",
    link: "https://emploisdubai.com",
  },
  // 5. ESPACE ANNONCEUR / VOTRE PUBLICITÉ ICI (Slide codé sobre & élégant pour les annonceurs)
  {
    id: "espace-annonceur",
    title: "Votre Publicité Ici — Espace Annonceur Disponible",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un espace publicitaire sur Unique Voyage."),
    isCodedSlide: true,
  },
];

export default function AdBannerSection() {
  const [currentAd, setCurrentAd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Rotation automatique toutes les 5.5 secondes
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % PROMOTIONAL_BANNERS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const ad = PROMOTIONAL_BANNERS[currentAd];

  return (
    <div 
      className="w-full bg-black py-4 sm:py-6 flex items-center justify-center relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Conteneur Carrousel à ratio exact (2.35:1) pour qu'absolument rien ne soit coupé */}
      <div className="w-11/12 max-w-[1400px] aspect-[2.35/1] sm:aspect-[2.35/1] min-h-[160px] sm:min-h-[220px] md:min-h-[300px] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl relative group flex items-center justify-center bg-[#0d0d0d]">
        
        {/* Affichage de la diapositive active */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            {ad.isCodedSlide ? (
              // Slide Native "Votre Publicité Ici" en pur design sobre & moderne
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-center w-full h-full px-6 sm:px-12 bg-gradient-to-r from-zinc-950 via-[#141414] to-zinc-950 relative overflow-hidden cursor-pointer"
                aria-label={ad.title}
              >
                {/* Lueur subtile en arrière-plan */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(216,90,48,0.18)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative z-10 max-w-2xl flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-2 sm:mb-4 bg-white/5 border border-white/10 text-white/90">
                    <Sparkles size={12} className="text-[#D85A30]" />
                    <span>ESPACE ANNONCEUR DISPONIBLE</span>
                  </div>

                  <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase leading-tight">
                    VOTRE PUBLICITÉ <span className="text-[#D85A30]">ICI</span>
                  </h2>

                  <p className="text-[10px] sm:text-sm md:text-base text-zinc-400 font-light mt-1.5 sm:mt-3 max-w-xl leading-relaxed">
                    Mettez en avant votre marque auprès de milliers de voyageurs et clients ciblés.
                  </p>

                  <div className="mt-3 sm:mt-6 inline-flex items-center gap-2 bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold py-2 sm:py-3 px-5 sm:px-8 rounded-xl uppercase tracking-[0.15em] text-[10px] sm:text-xs shadow-lg transition-all active:scale-95">
                    <PhoneCall size={14} />
                    <span>RÉSERVER CET EMPLACEMENT</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </a>
            ) : (
              // Slide Affiche Réelle (DocuExpress, Ethical Hacker, Gadjico, Emplois Dubaï)
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer relative"
                aria-label={ad.title}
              >
                {ad.image && (
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    fill
                    priority={currentAd === 0}
                    className="object-contain sm:object-cover rounded-xl sm:rounded-2xl transition-all duration-700 ease-in-out group-hover:scale-[1.01]"
                    sizes="(max-width: 1400px) 100vw, 1400px"
                  />
                )}
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Boutons de navigation */}
        <button
          type="button"
          onClick={() => setCurrentAd((prev) => (prev === 0 ? PROMOTIONAL_BANNERS.length - 1 : prev - 1))}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-[#D85A30] text-white p-2.5 sm:p-3.5 rounded-full transition-all duration-300 z-10 text-sm sm:text-base active:scale-90 shadow-xl border border-white/10"
          aria-label="Annonce précédente"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => setCurrentAd((prev) => (prev === PROMOTIONAL_BANNERS.length - 1 ? 0 : prev + 1))}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-[#D85A30] text-white p-2.5 sm:p-3.5 rounded-full transition-all duration-300 z-10 text-sm sm:text-base active:scale-90 shadow-xl border border-white/10"
          aria-label="Annonce suivante"
        >
          &rarr;
        </button>

        {/* Indicateurs de progression (Points / Dots) */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          {PROMOTIONAL_BANNERS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentAd(index)}
              className={`h-1.5 sm:h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentAd ? "w-5 sm:w-6 bg-[#D85A30]" : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}