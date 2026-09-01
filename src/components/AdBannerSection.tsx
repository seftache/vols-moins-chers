"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Plane, ShieldCheck, ArrowRight } from "lucide-react";

interface AdBanner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  highlightText: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  accentColor: string;
}

const PROMOTIONAL_BANNERS: AdBanner[] = [
  {
    id: "dubai-promo",
    badge: "OFFRE SPÉCIALE • DÉPART MONDIAL",
    title: "Dubaï & Émirats Arabes Unis",
    subtitle: "Séjour de rêve tout confort avec vol régulier négocié et hôtel économique sélectionné.",
    highlightText: "Dès 490 000 FCFA (ou 745 € / $815)",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
    ctaText: "Découvrir l'offre Dubaï",
    ctaLink: "/offres",
    accentColor: "#D85A30"
  },
  {
    id: "paris-promo",
    badge: "ESCALE EUROPÉENNE • TARIF IMBATTABLE",
    title: "Paris, Ville Lumière",
    subtitle: "L'élégance parisienne au tarif direct compagnie. Bagages et assistance inclus.",
    highlightText: "Dès 236 000 FCFA (540 $ CAD / 360 €)",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85",
    ctaText: "Explorer les vols Paris",
    ctaLink: "/offres",
    accentColor: "#d4a853"
  },
  {
    id: "conciergerie-promo",
    badge: "CONCIERGERIE PRIVÉE • PAIEMENT LOCAL SÉCURISÉ",
    title: "Réservation Directe & Wave",
    subtitle: "Réglez en toute sérénité par Wave, Mobile Money ou Virement. Émission officielle garantie sous 1h.",
    highlightText: "0% frais cachés • Service client 7j/7",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85",
    ctaText: "Consulter nos offres",
    ctaLink: "/offres",
    accentColor: "#10b981"
  },
  {
    id: "monde-promo",
    badge: "DESTINATIONS LONG-COURRIER • AFRIQUE, ASIE, AMÉRIQUES",
    title: "Montréal, Tokyo, Canton & Jeddah",
    subtitle: "Notre algorithme détecte les chutes de prix et erreurs tarifaires mondiales en temps réel.",
    highlightText: "Jusqu'à -45% sur le tarif régulier",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
    ctaText: "Voir toutes les destinations",
    ctaLink: "/offres",
    accentColor: "#38bdf8"
  }
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
      className="relative w-full bg-[#080808] py-8 sm:py-12 px-4 sm:px-8 md:px-16 lg:px-24 border-y border-white/[0.08] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Halo de lumière ambiante */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-20 blur-[100px] transition-colors duration-1000"
        style={{ backgroundColor: ad.accentColor }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Conteneur Carrousel Publicitaire */}
        <div className="relative h-[420px] sm:h-[460px] md:h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
          
          {/* Images avec transition animée */}
          <AnimatePresence mode="wait">
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={ad.image}
                alt={ad.title}
                fill
                priority
                className="object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              {/* Masque dégradé cinéma haute lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* Contenu textuel de la bannière */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-2xl">
            {/* Badge promotionnel */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={ad.id + "-badge"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
                >
                  <Sparkles size={13} style={{ color: ad.accentColor }} />
                  <span>{ad.badge}</span>
                </motion.div>
              </AnimatePresence>

              {/* Titre Principal */}
              <AnimatePresence mode="wait">
                <motion.h2
                  key={ad.id + "-title"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
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
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-xs sm:text-sm md:text-base text-white/80 font-light mt-3 leading-relaxed max-w-xl"
                >
                  {ad.subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Pied de la bannière : Prix d'appel & Bouton d'action */}
            <div className="space-y-4 pt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={ad.id + "-price"}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15"
                >
                  <Plane size={15} style={{ color: ad.accentColor }} />
                  <span>{ad.highlightText}</span>
                </motion.div>
              </AnimatePresence>

              <div>
                <Link
                  href={ad.ctaLink}
                  className="inline-flex items-center gap-3 bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl uppercase tracking-[0.2em] text-xs sm:text-sm transition-all shadow-xl hover:shadow-[#D85A30]/30 active:scale-95"
                >
                  <span>{ad.ctaText}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Boutons de navigation Précédent / Suivant */}
          <button
            type="button"
            onClick={() => setCurrentAd((prev) => (prev === 0 ? PROMOTIONAL_BANNERS.length - 1 : prev - 1))}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#D85A30] text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full border border-white/20 transition-all backdrop-blur-md z-20 active:scale-90"
            aria-label="Annonce précédente"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => setCurrentAd((prev) => (prev === PROMOTIONAL_BANNERS.length - 1 ? 0 : prev + 1))}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#D85A30] text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full border border-white/20 transition-all backdrop-blur-md z-20 active:scale-90"
            aria-label="Annonce suivante"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicateurs de progression (Points / Dots) */}
          <div className="absolute bottom-5 right-5 sm:right-10 flex items-center gap-2 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
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