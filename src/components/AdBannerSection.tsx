"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, PhoneCall, ArrowUpRight, Megaphone, Target, TrendingUp, Crown, Zap, Globe2, ShieldCheck } from "lucide-react";

interface CodedSlideData {
  badgeIcon: any;
  badgeText: string;
  headlineMain: string;
  headlineAccent: string;
  description: string;
  buttonText: string;
  accentColor: string;
  gradientBg: string;
  glowColor: string;
}

interface AdBanner {
  id: string;
  title: string;
  image?: string;
  link: string;
  isCodedSlide?: boolean;
  codedData?: CodedSlideData;
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
  // 4. PUB 1 - NÉON TERRACOTTA
  {
    id: "ad-terracotta",
    title: "Votre Publicité Ici — Espace Annonceur",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver l'encart publicitaire Terracotta sur Unique Voyage."),
    isCodedSlide: true,
    codedData: {
      badgeIcon: Sparkles,
      badgeText: "ESPACE ANNONCEUR DISPONIBLE",
      headlineMain: "VOTRE PUBLICITÉ",
      headlineAccent: "ICI",
      description: "Mettez en avant votre marque auprès de milliers de voyageurs et clients internationaux ciblés.",
      buttonText: "RÉSERVER CET EMPLACEMENT",
      accentColor: "#D85A30",
      gradientBg: "from-[#1a0c08] via-[#0f0f0f] to-[#1a0c08]",
      glowColor: "rgba(216,90,48,0.22)",
    },
  },
  // 5. PUB 2 - OR & PRESTIGE
  {
    id: "ad-gold",
    title: "Sponsoring & Visibilité Élite",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver l'espace Sponsoring Prestige sur Unique Voyage."),
    isCodedSlide: true,
    codedData: {
      badgeIcon: Crown,
      badgeText: "PARTENARIAT & SPONSORING ÉLITE",
      headlineMain: "ASSOCIEZ VOTRE MARQUE À",
      headlineAccent: "L'EXCELLENCE",
      description: "Bénéficiez d'une visibilité de premier plan auprès d'une audience VIP à fort pouvoir d'achat.",
      buttonText: "DEVENIR SPONSOR OFFICIEL",
      accentColor: "#d4a853",
      gradientBg: "from-[#181308] via-[#0d0d0d] to-[#181308]",
      glowColor: "rgba(212,168,83,0.20)",
    },
  },
  // 6. PUB 3 - CYAN & TECH
  {
    id: "ad-cyan",
    title: "Boostez votre Visibilité Digitale",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite booster ma visibilité avec une campagne publicitaire sur Unique Voyage."),
    isCodedSlide: true,
    codedData: {
      badgeIcon: Zap,
      badgeText: "CAMPAGNE DIGITALE HAUTE PERFORMANCE",
      headlineMain: "BOOSTEZ VOTRE VISIBILITÉ",
      headlineAccent: "DIGITALE",
      description: "Attirez de nouveaux prospects qualifiés et augmentez instantanément votre notoriété de marque.",
      buttonText: "LANCER MA CAMPAGNE",
      accentColor: "#06b6d4",
      gradientBg: "from-[#08151a] via-[#0d0d0d] to-[#08151a]",
      glowColor: "rgba(6,182,212,0.20)",
    },
  },
  // 7. PUB 4 - ÉMERAUDE BUSINESS
  {
    id: "ad-emerald",
    title: "Développez votre Clientèle B2B & B2C",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite devenir partenaire annonceur sur Unique Voyage."),
    isCodedSlide: true,
    codedData: {
      badgeIcon: TrendingUp,
      badgeText: "CROISSANCE & ACQUISITION CLIENTS",
      headlineMain: "DEVENEZ NOTRE PARTENAIRE",
      headlineAccent: "PRIVILÈGE",
      description: "Générez des ventes directes et développez votre chiffre d'affaires avec un encart dédié.",
      buttonText: "CONTACTER NOTRE RÉGIE",
      accentColor: "#10b981",
      gradientBg: "from-[#081812] via-[#0d0d0d] to-[#081812]",
      glowColor: "rgba(16,185,129,0.20)",
    },
  },
  // 8. PUB 5 - AMÉTHYSTE CRÉATIF
  {
    id: "ad-purple",
    title: "Affichage Publicitaire Grand Format",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite afficher mes produits en grand format sur Unique Voyage."),
    isCodedSlide: true,
    codedData: {
      badgeIcon: Megaphone,
      badgeText: "AFFICHAGE PUBLICITAIRE 3.0",
      headlineMain: "FAITES RAYONNER VOS",
      headlineAccent: "PRODUITS",
      description: "Présentez vos services, offres spéciales ou événements au cœur de notre plateforme internationale.",
      buttonText: "DISCUTER SUR WHATSAPP",
      accentColor: "#a855f7",
      gradientBg: "from-[#150a1e] via-[#0d0d0d] to-[#150a1e]",
      glowColor: "rgba(168,85,247,0.20)",
    },
  },
  // 9. PUB 6 - SAPHIR CORPORATE
  {
    id: "ad-blue",
    title: "Réseau Annonceurs & Partenariats Mondiaux",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite réserver un encart dans votre réseau d'annonceurs."),
    isCodedSlide: true,
    codedData: {
      badgeIcon: Globe2,
      badgeText: "RÉSEAU ANNONCEURS MONDIAL",
      headlineMain: "RÉGIE PUBLICITAIRE",
      headlineAccent: "OFFICIELLE",
      description: "Une couverture publicitaire stratégique pour toucher des décideurs et acheteurs actifs.",
      buttonText: "RÉSERVER UN ENCART",
      accentColor: "#3b82f6",
      gradientBg: "from-[#0a111e] via-[#0d0d0d] to-[#0a111e]",
      glowColor: "rgba(59,130,246,0.20)",
    },
  },
  // 10. PUB 7 - RUBIS IMPACT FLASH
  {
    id: "ad-ruby",
    title: "Offre Sponsor En Vedette",
    link: "https://wa.me/2250545745749?text=" + encodeURIComponent("Bonjour, je souhaite profiter de l'offre Sponsor En Vedette sur Unique Voyage."),
    isCodedSlide: true,
    codedData: {
      badgeIcon: Target,
      badgeText: "EMPLACEMENT EN TÊTE D'AFFICHE",
      headlineMain: "OFFRE SPONSOR",
      headlineAccent: "EXECUTIVE",
      description: "Positionnez votre entreprise en tête d'affiche sur Unique Voyage et dominez votre secteur.",
      buttonText: "RÉSERVER EN 1 CLIC",
      accentColor: "#f43f5e",
      gradientBg: "from-[#1e0a10] via-[#0d0d0d] to-[#1e0a10]",
      glowColor: "rgba(244,63,94,0.20)",
    },
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
            {ad.isCodedSlide && ad.codedData ? (
              // Slide Native Annonceur stylisée selon son thème
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center text-center w-full h-full px-6 sm:px-12 bg-gradient-to-r ${ad.codedData.gradientBg} relative overflow-hidden cursor-pointer`}
                aria-label={ad.title}
              >
                {/* Lueur subtile en arrière-plan */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-700"
                  style={{ background: `radial-gradient(ellipse at center, ${ad.codedData.glowColor} 0%, transparent 70%)` }}
                />

                <div className="relative z-10 max-w-2xl flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-2 sm:mb-4 bg-white/5 border border-white/10 text-white/90">
                    <ad.codedData.badgeIcon size={12} style={{ color: ad.codedData.accentColor }} />
                    <span>{ad.codedData.badgeText}</span>
                  </div>

                  <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase leading-tight">
                    {ad.codedData.headlineMain}{" "}
                    <span style={{ color: ad.codedData.accentColor }}>{ad.codedData.headlineAccent}</span>
                  </h2>

                  <p className="text-[10px] sm:text-sm md:text-base text-zinc-400 font-light mt-1.5 sm:mt-3 max-w-xl leading-relaxed">
                    {ad.codedData.description}
                  </p>

                  <div 
                    className="mt-3 sm:mt-6 inline-flex items-center gap-2 text-white font-bold py-2 sm:py-3 px-5 sm:px-8 rounded-xl uppercase tracking-[0.15em] text-[10px] sm:text-xs shadow-lg transition-all active:scale-95 hover:brightness-110"
                    style={{ backgroundColor: ad.codedData.accentColor }}
                  >
                    <PhoneCall size={14} />
                    <span>{ad.codedData.buttonText}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </a>
            ) : (
              // Slide Affiche Réelle (DocuExpress, Ethical Hacker, Gadjico)
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

        {/* Indicateurs de progression (Points / Dots pour 10 slots) */}
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