"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface AdBanner {
  id: string;
  title: string;
  image: string;
  link: string;
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
  // 5. EMPLACEMENT PUB 1 (WhatsApp)
  {
    id: "pub-1",
    title: "Espace Publicitaire 1 — Réservez votre annonce",
    image: "/images/ads/pub1.jpg",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un espace publicitaire sur Unique Voyage."),
  },
  // 6. EMPLACEMENT PUB 2 (WhatsApp)
  {
    id: "pub-2",
    title: "Espace Publicitaire 2 — Réservez votre annonce",
    image: "/images/ads/pub2.jpg",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un espace publicitaire sur Unique Voyage."),
  },
  // 7. EMPLACEMENT PUB 3 (WhatsApp)
  {
    id: "pub-3",
    title: "Espace Publicitaire 3 — Réservez votre annonce",
    image: "/images/ads/pub3.jpg",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un espace publicitaire sur Unique Voyage."),
  },
  // 8. EMPLACEMENT PUB 4 (WhatsApp)
  {
    id: "pub-4",
    title: "Espace Publicitaire 4 — Réservez votre annonce",
    image: "/images/ads/pub4.jpg",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un espace publicitaire sur Unique Voyage."),
  },
  // 9. EMPLACEMENT PUB 5 (WhatsApp)
  {
    id: "pub-5",
    title: "Espace Publicitaire 5 — Réservez votre annonce",
    image: "/images/ads/pub5.jpg",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un espace publicitaire sur Unique Voyage."),
  },
  // 10. EMPLACEMENT PUB 6 (WhatsApp)
  {
    id: "pub-6",
    title: "Espace Publicitaire 6 — Réservez votre annonce",
    image: "/images/ads/pub6.jpg",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un espace publicitaire sur Unique Voyage."),
  },
];

export default function AdBannerSection() {
  const [currentAd, setCurrentAd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Rotation automatique toutes les 5 secondes
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % PROMOTIONAL_BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const ad = PROMOTIONAL_BANNERS[currentAd];

  return (
    <div 
      className="w-full h-[45vh] sm:h-[55vh] md:h-[62vh] bg-black text-white flex items-center justify-center relative overflow-hidden select-none my-4 sm:my-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Conteneur Carrousel sans bordure, identique au style original */}
      <div className="w-11/12 max-w-[1400px] h-[95%] overflow-hidden rounded-2xl shadow-2xl relative group flex items-center justify-center">
        
        {/* Image de l'affiche avec transition fluide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <a
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full cursor-pointer"
              aria-label={ad.title}
            >
              <Image
                src={ad.image}
                alt={ad.title}
                fill
                priority={currentAd === 0}
                className="object-cover rounded-2xl transition-all duration-700 ease-in-out group-hover:scale-[1.03]"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Boutons de navigation */}
        <button
          type="button"
          onClick={() => setCurrentAd((prev) => (prev === 0 ? PROMOTIONAL_BANNERS.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 sm:p-4 rounded-full hover:bg-black/90 transition-all duration-300 z-10 text-lg sm:text-xl active:scale-95 shadow-lg"
          aria-label="Annonce précédente"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => setCurrentAd((prev) => (prev === PROMOTIONAL_BANNERS.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 sm:p-4 rounded-full hover:bg-black/90 transition-all duration-300 z-10 text-lg sm:text-xl active:scale-95 shadow-lg"
          aria-label="Annonce suivante"
        >
          &rarr;
        </button>

        {/* Indicateurs de progression (Points / Dots) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {PROMOTIONAL_BANNERS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentAd(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentAd ? "bg-white scale-125" : "bg-gray-500 hover:bg-gray-300"
              }`}
              aria-label={`Aller à la pub ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}