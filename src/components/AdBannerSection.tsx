"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, PhoneCall } from "lucide-react";

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
  // 1. BANNIÈRE "VOTRE PUBLICITÉ ICI" (Lien WhatsApp Direct)
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

  // 2. EMPLOIS DUBAÏ (https://emploisdubai.com)
  {
    id: "emplois-dubai",
    badge: "CONCIERGERIE RECRUTEMENT • DUBAÏ",
    title: "Emplois Dubaï",
    subtitle: "Trouvez votre emploi de prestige à Dubaï. Accompagnement complet, visa de travail garanti & logement.",
    image: "/images/ads/emplois-dubai.jpg",
    ctaText: "VISITER EMPLOIS DUBAÏ",
    ctaLink: "https://emploisdubai.com",
    isExternal: true,
    accentColor: "#d4a853",
  },

  // 3. ETHICAL HACKER PREP (https://ethicalhackerprep.com)
  {
    id: "ethical-hacker-prep",
    badge: "CYBERSÉCURITÉ • CERTIFICATIONS D'ÉLITE",
    title: "Ethical Hacker Prep",
    subtitle: "La plateforme N°1 de préparation aux certifications internationales CEH, OSCP, CompTIA & Pentest.",
    image: "/images/ads/ethical-hacker-prep.jpg",
    ctaText: "ACCÉDER À LA PLATEFORME",
    ctaLink: "https://ethicalhackerprep.com",
    isExternal: true,
    accentColor: "#ef4444",
  },

  // 4. DOCUEXPRESS
  {
    id: "docuexpress",
    badge: "SERVICES ADMINISTRATIFS & DOCUMENTS",
    title: "DocuExpress",
    subtitle: "Rédaction professionnelle, attestations, contrats et formalités administratives express et sécurisées.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=85",
    ctaText: "CONTACTER LE SERVICE",
    ctaLink: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite obtenir des informations sur les services DocuExpress."),
    isExternal: true,
    accentColor: "#3b82f6",
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
          
          {/* Images avec transition animée */}
          <AnimatePresence mode="wait">
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={ad.image}
                alt={ad.title}
                fill
                priority
                className="object-cover object-center brightness-[0.55] group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              {/* Masque sombre pour une lisibilité parfaite du texte */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* Contenu textuel centré haute visibilité */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20 py-8">
            {/* Badge promotionnel */}
            {ad.badge && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={ad.id + "-badge"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3 bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-md"
                >
                  <Sparkles size={13} style={{ color: ad.accentColor }} />
                  <span>{ad.badge}</span>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Titre Principal */}
            <AnimatePresence mode="wait">
              <motion.h2
                key={ad.id + "-title"}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide uppercase leading-tight drop-shadow-lg"
              >
                {ad.title}
              </motion.h2>
            </AnimatePresence>

            {/* Sous-titre & Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={ad.id + "-sub"}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="text-xs sm:text-sm md:text-base text-white/80 font-light mt-3 sm:mt-4 leading-relaxed max-w-2xl drop-shadow-md"
              >
                {ad.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Bouton d'action principal */}
            <AnimatePresence mode="wait">
              <motion.div
                key={ad.id + "-cta"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="mt-6 sm:mt-8"
              >
                <a
                  href={ad.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold py-3 sm:py-3.5 px-7 sm:px-9 rounded-xl uppercase tracking-[0.2em] text-xs sm:text-sm transition-all shadow-xl hover:shadow-[#D85A30]/40 active:scale-95"
                >
                  {ad.isSpecialContact ? <PhoneCall size={16} /> : null}
                  <span>{ad.ctaText}</span>
                  <ArrowUpRight size={16} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

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