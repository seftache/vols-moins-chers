"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect, useRef } from "react";
import { ArrowRight, X, ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import AdBannerSection from "../components/AdBannerSection";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);

  // Supabase Waitlist states
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() && !whatsappNumber.trim()) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const { error } = await supabase
      .from("waitlist")
      .insert({ 
        whatsapp_number: whatsappNumber.trim() || "Sans Numéro", 
        email: email.trim() || null 
      });

    if (error) {
      if (error.code === "23505") { // Unique violation code in Postgres
        setSubmitStatus("error");
        setErrorMessage("Vous êtes déjà sur la liste !");
      } else {
        setSubmitStatus("error");
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    } else {
      setSubmitStatus("success");
      setWhatsappNumber("");
      setEmail("");
    }
    
    setIsSubmitting(false);
  };



  const carouselRef = useRef<HTMLDivElement>(null);

  const updateScrollState = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);

    // Sauvegarde du code de parrainage s'il est présent dans l'URL
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");
    if (refCode) {
      localStorage.setItem("uv_referral_code", refCode);
    }

    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  // Auto-scroll pour le carrousel (se met en pause au survol)
  useEffect(() => {
    if (isHoveringCarousel) return;
    
    const interval = setInterval(() => {
      const el = carouselRef.current;
      if (el) {
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const scrollAmount = el.clientWidth > 768 ? 380 + 24 : 300 + 16;
          el.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHoveringCarousel]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fallbackItems = [
    { id: "fallback-1", title: "DUBAÏ", image: "/images/destinations/dubai.jpg", description: "Découvrez l'opulence du désert, les gratte-ciels futuristes et un luxe absolu." },
    { id: "fallback-2", title: "PARIS", image: "/images/destinations/Paris.jpg", description: "Vivez l'élégance parisienne, la haute gastronomie et le charme intemporel." },
    { id: "fallback-3", title: "DAKAR", image: "/images/destinations/dakar.jpg", description: "Plongez dans l'effervescence culturelle et la chaleur de l'hospitalité." },
    { id: "fallback-4", title: "MONTRÉAL", image: "/images/destinations/montreal.jpg", description: "Explorez un mélange unique de culture et d'art de vivre francophone." },
    { id: "fallback-5", title: "LONDRES", image: "/images/destinations/londres.jpg", description: "Ressentez l'énergie cosmopolite de cette métropole historique." },
    { id: "fallback-6", title: "TOKYO", image: "/images/destinations/tokyo.jpg", description: "Immergez-vous dans un monde fascinant entre traditions et ultra-modernité." },
  ];

  const [dynamicCarouselItems, setDynamicCarouselItems] = useState(fallbackItems);

  useEffect(() => {
    async function fetchPublicItineraries() {
      try {
        const res = await fetch(`/api/itineraries/public?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            let newItems = [...data];
            
            // Éviter les doublons entre les données de l'API et les fallbacks (ex: 2 fois Paris)
            const existingTitles = newItems.map(item => item.title.toLowerCase());
            const availableFallbacks = fallbackItems.filter(f => !existingTitles.includes(f.title.toLowerCase()));

            if (newItems.length < 6) {
              const needed = 6 - newItems.length;
              newItems = [...newItems, ...availableFallbacks.slice(0, needed)];
            }
            setDynamicCarouselItems(newItems);
          }
        }
      } catch (e) {
        console.error("Erreur chargement carrousel dynamique", e);
      }
    }
    fetchPublicItineraries();
  }, []);

  const journeySteps = [
    {
      number: "01",
      title: "La découverte",
      text: "Vous arrivez sur notre plateforme et découvrez les offres exclusives dénichées par notre intelligence artificielle — vols à prix cassés vers Dubaï, Paris, Dakar et bien plus.",
    },
    {
      number: "02",
      title: "L'alerte",
      text: "Notre algorithme détecte une baisse de prix exceptionnelle. Vous la voyez instantanément sur le site avec tous les détails : compagnie, dates, hôtel recommandé.",
    },
    {
      number: "03",
      title: "L'itinéraire IA",
      text: "L'intelligence artificielle construit un programme complet jour par jour : vol, hôtel de charme, activités incontournables et conseils d'initié.",
    },
    {
      number: "04",
      title: "La réservation",
      text: "Convaincu ? Cliquez sur « Réserver le vol » ou « Réserver l'hôtel » et finalisez directement chez nos partenaires de confiance. C'est simple et gratuit.",
    },
  ];

  return (
    <main className="relative w-full selection:bg-white/30">

      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col justify-between">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3000&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-16 md:py-10 lg:px-24">
          <header className="flex w-full items-center justify-between">
            <a href="#" className="flex items-center">
              <svg viewBox="55 65 280 130" className="h-12 md:h-16 w-auto" xmlns="http://www.w3.org/2000/svg">
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
            <div className="flex items-center gap-8">
              <Link
                href="/offres"
                className="border border-white bg-transparent px-6 py-3 text-xs font-light uppercase tracking-widest text-white transition-colors hover:border-[#D85A30] hover:bg-[#D85A30] hover:text-white"
              >
                Explorer les offres
              </Link>
            </div>
          </header>

          <div className="flex w-full max-w-5xl flex-col items-start justify-center my-auto py-8">
            <p className="mb-4 text-[10px] font-light uppercase tracking-[0.3em] text-white/80 sm:text-xs">
              La conciergerie de voyage 3.0, propulsée par l'IA.
            </p>

            <h1 className="mb-6 font-playfair text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Ne payez plus jamais<br />
              le plein tarif<br />
              pour voyager.
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/offres"
                className="inline-block bg-[#D85A30] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#b84a25] shadow-lg"
              >
                Explorer toutes les offres
              </Link>
              <Link
                href="/vols-pas-chers"
                className="inline-block border border-white/30 bg-black/40 backdrop-blur-sm px-8 py-4 text-xs font-light uppercase tracking-[0.2em] text-white transition-colors hover:border-[#D85A30] hover:text-[#D85A30]"
              >
                Rechercher par destination
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              Découvrir les opportunités
            </span>
            <div className="h-[40px] w-[1px] bg-white/50" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          1.5 BANNIÈRE PUBLICITAIRE & OFFRES EN VEDETTE
          ===================================================================== */}
      <AdBannerSection />

      {/* =====================================================================
          2. LE CONCEPT (Asymétrique avec animation au scroll)
          ===================================================================== */}
      <section className="relative w-full bg-[#0A0A0A] px-6 py-32 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col items-start overflow-hidden">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 text-xs font-light uppercase tracking-[0.3em] text-[#D4D4D4]"
            >
              L'art de l'opportunité
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="mb-10 font-playfair text-4xl leading-[1.2] text-white sm:text-5xl md:text-6xl"
            >
              L'algorithme qui traque l'invisible.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="max-w-xl text-base font-light leading-relaxed text-[#A3A3A3] sm:text-lg"
            >
              Chaque jour, des failles de tarification et des erreurs humaines apparaissent sur les lignes reliant Abidjan à Paris, Dubaï ou Dakar. Notre IA scanne ces anomalies en temps réel et compose un itinéraire complet — pas un simple lien. Avant qu'elles ne soient corrigées, elles sont entre vos mains.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] w-full overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[60%] brightness-75 transition-all duration-[1.5s] hover:scale-105 hover:grayscale-0 hover:brightness-100"
              style={{ backgroundImage: "url('/images/air-cote-divoire.jpg')" }}
            >
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          2.5 COMMENT ÇA MARCHE (Parcours utilisateur en 5 étapes - Grille Apple Style)
          ===================================================================== */}
      <section className="relative w-full overflow-hidden bg-black py-32 px-6 md:px-16 lg:px-24 border-t border-white/[0.06]">
        {/* Vidéo YouTube en arrière-plan (Emirates A380 First Class) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
          <iframe
            src="https://www.youtube.com/embed/Qm7OjomqG30?autoplay=1&mute=1&loop=1&playlist=Qm7OjomqG30&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-[150%] h-[115%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-90 scale-[1.2] brightness-[1.25] contrast-[1.05]"
            allow="autoplay; encrypted-media; picture-in-picture"
            frameBorder="0"
          />
          {/* Overlay dégradé beaucoup plus clair au centre pour une luminosité maximale */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/30 to-black/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Colonne Gauche - Titre */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-10">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-[#888888] font-sans text-xs uppercase tracking-[0.3em] mb-4"
                >
                  Le parcours
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
                >
                  Du clic au décollage.
                </motion.h2>
              </div>
            </div>

            {/* Colonne Droite - Les 5 étapes de l'expérience */}
            <div className="lg:col-span-7 flex flex-col">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                  className="group grid grid-cols-[auto_1fr] gap-6 md:gap-12 items-start py-8 md:py-10 border-b border-white/[0.08] last:border-b-0"
                >
                  <span className="font-playfair text-4xl md:text-5xl italic text-white/25 transition-colors duration-500 group-hover:text-white/60">
                    {step.number}
                  </span>
                  <div>
                    <h4 className="font-sans text-base md:text-lg font-bold uppercase tracking-[0.1em] text-white mb-3">
                      {step.title}
                    </h4>
                    <p className="max-w-xl text-sm md:text-base font-light leading-relaxed text-[#A3A3A3]">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PARALLAXE (Image lumineuse de voyage)
          ===================================================================== */}
      <section className="relative flex h-[70vh] w-full items-center justify-center px-6 overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-70"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2000&auto=format&fit=crop')" }}
        />

        <div className="absolute inset-0 bg-black/20" />

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 font-playfair text-4xl italic text-white md:text-5xl lg:text-6xl text-center max-w-4xl mx-auto drop-shadow-2xl"
        >
          "Il y a des opportunités qui ne se présentent qu'une fois.<br />Les plus beaux voyages sont ceux que l'on ne rate pas."
        </motion.h2>
      </section>

      {/* =====================================================================
          4. ÉCHAPPÉES BELLES (Carousel Apple-Style sur fond clair)
          ===================================================================== */}
      <section className="relative w-full py-28 md:py-32 bg-white overflow-hidden">

        <svg
          className="absolute -left-24 bottom-0 w-[600px] h-[600px] pointer-events-none"
          viewBox="0 0 600 600"
          fill="none"
        >
          <path
            d="M50 450C150 500 250 380 200 280C150 180 280 120 380 180C480 240 460 380 380 420C300 460 250 350 320 320"
            stroke="#D85A30"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="150" cy="350" r="120" stroke="#D85A30" strokeWidth="1.5" fill="#D85A30" fillOpacity="0.2" />
          <circle cx="280" cy="280" r="60" stroke="#D85A30" strokeWidth="1.5" fill="#D85A30" fillOpacity="0.4" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Colonne Gauche - Titre & Sous-titre fixes */}
            <div className="w-full lg:w-[320px] lg:flex-shrink-0 flex flex-col py-6">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-black/40 mb-3 block">SÉLECTION CONFIDENTIELLE</span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-black uppercase tracking-tight leading-[0.95]"
              >
                Vols<br />Secrets
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="mt-6 text-sm font-light italic text-black/55 leading-relaxed"
              >
                Des erreurs de prix et vols à des tarifs introuvables ailleurs, dénichés par notre algorithme.
              </motion.p>

              {/* Logo de la marque affiché en couleurs pleines avec animation flottante */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="mt-8 lg:mt-14 w-24 h-24 lg:w-32 lg:h-32 select-none pointer-events-none self-start"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <svg viewBox="40 60 180 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="120" cy="130" r="56" fill="none" stroke="#0F6E56" strokeWidth="1.5"/>
                    <path d="M95 105 L95 145 Q95 158 108 158 Q121 158 121 145 L121 118" fill="none" stroke="#0F6E56" strokeWidth="6" strokeLinecap="round"/>
                    <g transform="translate(133,98) rotate(35)">
                      <path d="M0 0 L26 0 L31 -3 L34 0 L31 3 L26 0 Z" fill="#D85A30"/>
                      <path d="M10 0 L2 -9 L7 -9 L16 -1 Z" fill="#D85A30"/>
                      <path d="M10 0 L2 9 L7 9 L16 1 Z" fill="#D85A30"/>
                      <path d="M22 0 L26 5 L29 5 L27 0 Z" fill="#D85A30"/>
                    </g>
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* Colonne Droite - Le Carrousel défilant */}
            <div 
              className="w-full lg:flex-grow overflow-hidden relative"
              onMouseEnter={() => setIsHoveringCarousel(true)}
              onMouseLeave={() => setIsHoveringCarousel(false)}
            >
              <div
                ref={carouselRef}
                onScroll={updateScrollState}
                className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {dynamicCarouselItems.map((item, index) => {
                  let isExpired = false;
                  // On vérifie le type (n'est pas undefined) car les items fallback n'ont pas forcément generated_at.
                  // Mais comme on l'a rajouté à l'API, on peut faire le calcul
                  if ('generated_at' in item && item.generated_at) {
                    const generatedAt = new Date(item.generated_at as string).getTime();
                    const now = new Date().getTime();
                    const hoursSinceGeneration = (now - generatedAt) / (1000 * 60 * 60);
                    isExpired = hoursSinceGeneration >= 72;
                  }

                  return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    className="group relative flex-none w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] aspect-[3/5] snap-center overflow-hidden cursor-pointer bg-[#0A0A0A]"
                  >
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105 ${isExpired ? 'grayscale opacity-70' : ''}`}
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/70" />

                    {isExpired && (
                      <div className="absolute top-4 right-4 z-20 bg-[#7a1818] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        Expiré
                      </div>
                    )}

                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-7">
                      <h3 className={`font-sans font-extrabold text-lg md:text-xl uppercase tracking-wide leading-tight transform transition-transform duration-500 group-hover:-translate-y-1 ${isExpired ? 'text-white/50' : 'text-white'}`}>
                        {item.title}
                      </h3>
                      
                      <p className="text-white/80 text-[13px] md:text-sm mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      <a
                        href={String(item.id).startsWith("fallback") ? "#" : `/itinerary/${item.id}`}
                        className={`mt-5 inline-flex w-fit items-center justify-center border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${isExpired ? 'border-white/30 text-white/50 hover:bg-[#7a1818] hover:border-[#7a1818] hover:text-white' : 'border-white/50 text-white hover:border-[#D85A30] hover:bg-[#D85A30] hover:text-white'}`}
                      >
                        {isExpired ? "Voir l'offre ratée" : "Explorer le voyage"}
                      </a>
                    </div>
                  </motion.div>
                )})}
              </div>

              {/* Boutons de navigation (flèches flottantes) */}
              <button
                onClick={() => scrollCarousel("left")}
                aria-label="Défiler à gauche"
                className={`absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:border-[#D85A30] hover:bg-[#D85A30] hover:text-white ${
                  canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => scrollCarousel("right")}
                aria-label="Défiler à droite"
                className={`absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:border-[#D85A30] hover:bg-[#D85A30] hover:text-white ${
                  canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            </div>

          </div>
        </div>

        <div className="relative z-20 mt-16 flex w-full justify-center lg:justify-end lg:pr-24">
          <Link
            href="/offres"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-black/10 bg-black px-10 py-5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-[#D85A30] hover:shadow-[0_0_40px_rgba(216,90,48,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-300">
              Voir toutes les offres secrètes <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 z-0 h-full w-0 bg-[#D85A30] transition-all duration-500 ease-out group-hover:w-full" />
          </Link>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}} />
      </section>

      {/* =====================================================================
          4.5 SECTION PUBLICITAIRE (Marquee Typographique Infi-Scroll style Apple)
          ===================================================================== */}
      <section className="relative w-full py-32 bg-[#000000] overflow-hidden flex flex-col justify-center">

        <div className="relative flex whitespace-nowrap overflow-hidden mb-8 md:mb-12">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center whitespace-nowrap pr-8 md:pr-12">
                <span className="text-[10vw] md:text-[8vw] font-playfair uppercase text-white leading-none mr-8 md:mr-12">
                  L'élite n'attend pas
                </span>
                <span className="text-[10vw] md:text-[8vw] font-sans font-bold uppercase text-transparent leading-none mr-8 md:mr-12" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
                  Accès Prioritaire
                </span>
                <div className="w-[25vw] md:w-[15vw] h-[10vw] md:h-[6vw] bg-cover bg-center rounded-[200px] mr-8 md:mr-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1000&auto=format&fit=crop')" }} />
                <span className="text-[10vw] md:text-[8vw] font-playfair uppercase text-white leading-none mr-8 md:mr-12">
                  Classe Affaires
                </span>
                <span className="text-[10vw] md:text-[8vw] font-sans font-bold uppercase text-transparent leading-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
                  Vols Secrets
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative flex whitespace-nowrap overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center whitespace-nowrap pr-8 md:pr-12">
                <span className="text-[10vw] md:text-[8vw] font-sans font-bold uppercase text-transparent leading-none mr-8 md:mr-12" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
                  Tarifs Confidentiels
                </span>
                <div className="w-[25vw] md:w-[15vw] h-[10vw] md:h-[6vw] bg-cover bg-center rounded-[200px] mr-8 md:mr-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1000&auto=format&fit=crop')" }} />
                <span className="text-[10vw] md:text-[8vw] font-playfair uppercase text-white leading-none mr-8 md:mr-12">
                  Zéro Commission
                </span>
                <span className="text-[10vw] md:text-[8vw] font-sans font-bold uppercase text-transparent leading-none mr-8 md:mr-12" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
                  Privilège Membre
                </span>
                <span className="text-[10vw] md:text-[8vw] font-playfair uppercase text-white leading-none">
                  Dubaï • Paris • Dakar
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          4.7 SECTION HÔTELS (Sticky Scroll Editorial)
          ===================================================================== */}
      <section className="relative w-full bg-[#0A0A0A] py-32 px-6 lg:px-24">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-16 relative items-start">

          <div className="md:w-1/3 md:sticky md:top-32">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[#555555] font-sans text-xs uppercase tracking-[0.2em] mb-4"
            >
              Hébergements
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="font-playfair text-4xl md:text-6xl text-white mb-8"
            >
              Sanctuaires Privés
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-[#A3A3A3] font-light leading-relaxed mb-10 text-sm md:text-base"
            >
              Au-delà du vol détecté, notre IA suggère un hôtel adapté à chaque alerte — villas suspendues, palaces historiques et sanctuaires où le luxe se mesure au silence. Vous pouvez l'accepter, le remplacer, ou garder uniquement le vol.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <a href="/offres" className="inline-block border border-white/20 px-8 py-4 uppercase font-sans tracking-[0.2em] text-[10px] text-white hover:border-[#D85A30] hover:bg-[#D85A30] hover:text-white transition-colors duration-500">
                Découvrir la collection
              </a>
            </motion.div>
          </div>

          <div className="md:w-2/3 flex flex-col gap-16 md:gap-32 mt-16 md:mt-0">

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden cursor-pointer block"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2000&auto=format&fit=crop')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/70 mb-3">Maldives</p>
                <h3 className="font-playfair text-3xl md:text-4xl text-white drop-shadow-lg">Villas Flottantes & Lagon Privé</h3>
              </div>
            </motion.a>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative w-full md:w-[70%] aspect-[3/4] overflow-hidden cursor-pointer block md:ml-auto"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/70 mb-3">Japon</p>
                <h3 className="font-playfair text-3xl md:text-4xl text-white drop-shadow-lg">Retraite Spirituelle & Onsen</h3>
              </div>
            </motion.a>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden cursor-pointer block"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=2000&auto=format&fit=crop')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/70 mb-3">Alpes Suisses</p>
                <h3 className="font-playfair text-3xl md:text-4xl text-white drop-shadow-lg">Chalets Confidentiels</h3>
              </div>
            </motion.a>

          </div>
        </div>
      </section>

      {/* =====================================================================
          5. ALERTES & NEWSLETTER
          ===================================================================== */}
      <section className="relative w-full overflow-hidden bg-[#0A0A0A] px-6 py-32 md:px-16 lg:px-24 border-t border-white/[0.06]">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#888888] font-sans text-xs uppercase tracking-[0.3em] mb-6"
          >
            Ne ratez aucune offre
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8"
          >
            Recevez les bons plans<br />directement.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base font-light text-[#A3A3A3] mb-12 max-w-2xl mx-auto"
          >
            Inscrivez-vous gratuitement pour recevoir nos meilleures offres de vols et d'hôtels dès qu'elles sont détectées par notre IA.
          </motion.p>
          <Link
            href="/offres"
            className="inline-block bg-[#D85A30] px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#b84a25]"
          >
            Voir toutes les offres
          </Link>
        </div>
      </section>

      {/* =====================================================================
          5.5 GUIDE & FOIRE AUX QUESTIONS (SEO & CONFIANCE)
          ===================================================================== */}
      <section className="relative w-full bg-[#0d0d0d] px-6 py-24 md:px-16 lg:px-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D85A30]">
              Expertise & Transparence
            </span>
            <h2 className="mt-3 font-playfair text-3xl md:text-4xl lg:text-5xl text-white font-medium">
              Comment réserver un billet d'avion moins cher ?
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl mx-auto">
              Retrouvez toutes les réponses pour voyager au prix le plus bas d'Afrique et d'Europe en toute sérénité.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#D85A30]/40 open:bg-white/[0.04]">
              <summary className="flex cursor-pointer items-center justify-between font-playfair text-lg text-white font-medium">
                Comment Unique Voyage trouve-t-il les billets d'avion les moins chers ?
                <span className="ml-4 text-[#D85A30] transition-transform duration-300 group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Notre intelligence artificielle scanne en temps réel les bases de données mondiales des compagnies aériennes (Air France, Corsair, Emirates, Turkish Airlines, Air Côte d'Ivoire, Ethiopian Airlines, etc.). Elle identifie instantanément les baisses de tarifs inattendues, les promos flash et les erreurs tarifaires pour vous faire économiser jusqu'à 60% par rapport aux tarifs standards.
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#D85A30]/40 open:bg-white/[0.04]">
              <summary className="flex cursor-pointer items-center justify-between font-playfair text-lg text-white font-medium">
                Puis-je payer mon billet d'avion avec Wave ou Mobile Money ?
                <span className="ml-4 text-[#D85A30] transition-transform duration-300 group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Absolument ! Unique Voyage a spécialement conçu son service pour l'Afrique et la diaspora. Vous pouvez régler vos billets d'avion en toute sécurité par <strong>Wave</strong>, <strong>Orange Money</strong>, <strong>MTN Mobile Money</strong>, <strong>Moov Money</strong> ou par carte bancaire internationale (Visa, Mastercard). Dès confirmation, votre billet électronique officiel vous est délivré sans délai.
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#D85A30]/40 open:bg-white/[0.04]">
              <summary className="flex cursor-pointer items-center justify-between font-playfair text-lg text-white font-medium">
                Pourquoi les billets sont-ils souvent moins chers que sur les sites officiels ?
                <span className="ml-4 text-[#D85A30] transition-transform duration-300 group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Les compagnies aériennes modifient leurs tarifs plusieurs fois par jour selon le remplissage des appareils. Grâce à nos connexions directes aux GDS de billetterie en gros (Travelpayouts) et à notre marge optimisée, nous détectons et bloquons les sièges au moment précis où ils atteignent leur plancher tarifaire, avant que les algorithmes des compagnies ne remontent les prix.
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#D85A30]/40 open:bg-white/[0.04]">
              <summary className="flex cursor-pointer items-center justify-between font-playfair text-lg text-white font-medium">
                Quelles sont les liaisons de vol les plus demandées ?
                <span className="ml-4 text-[#D85A30] transition-transform duration-300 group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Nos utilisateurs recherchent quotidiennement des vols pas chers sur les trajets : <strong>Abidjan — Paris</strong>, <strong>Abidjan — Dubaï</strong>, <strong>Dakar — Paris</strong>, <strong>Accra — Londres</strong>, <strong>Casablanca — Abidjan</strong>, <strong>Montréal — Paris</strong> et <strong>New York — Abidjan</strong>. Vous pouvez rechercher n'importe quel itinéraire sur mesure grâce à notre moteur de recherche ci-dessus.
              </p>
            </details>
          </div>

          {/* Liens de maillage interne SEO ultra-performants */}
          <div className="mt-14 pt-8 border-t border-white/10 text-center">
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-semibold">Liaisons aériennes & Grands Hubs</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <Link href="/vols-pas-chers/abidjan-paris" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Abidjan — Paris direct
              </Link>
              <Link href="/vols-pas-chers/abidjan-istanbul" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Abidjan — Istanbul
              </Link>
              <Link href="/vols-pas-chers/abidjan-dubai" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Abidjan — Dubaï
              </Link>
              <Link href="/vols-pas-chers/dakar-paris" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Dakar — Paris
              </Link>
              <Link href="/vols-pas-chers/dakar-istanbul" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol direct Dakar — Istanbul
              </Link>
              <Link href="/vols-pas-chers/douala-paris" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol direct Douala — Paris
              </Link>
              <Link href="/vols-pas-chers/cotonou-istanbul" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Cotonou — Istanbul
              </Link>
              <Link href="/vols-pas-chers/bamako-paris" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Bamako — Paris
              </Link>
              <Link href="/vols-pas-chers/abidjan-bruxelles" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol direct Abidjan — Bruxelles
              </Link>
              <Link href="/vols-pas-chers/abidjan-zanzibar" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Abidjan — Zanzibar
              </Link>
              <Link href="/vols-pas-chers/abidjan-sao-paulo" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Abidjan — São Paulo Brésil
              </Link>
              <Link href="/vols-pas-chers/abidjan-marrakech" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Abidjan — Marrakech
              </Link>
              <Link href="/vols-pas-chers/abidjan-le-caire" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Abidjan — Le Caire
              </Link>
              <Link href="/vols-pas-chers/dubai-bangkok" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol direct Dubaï — Bangkok
              </Link>
              <Link href="/vols-pas-chers/dubai-bali" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Dubaï — Bali
              </Link>
              <Link href="/vols-pas-chers/montreal-abidjan" className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#D85A30] hover:bg-[#D85A30]/10 transition-all">
                Vol Montréal — Abidjan
              </Link>
              <Link href="/vols-pas-chers" className="px-3.5 py-1.5 rounded-full bg-[#D85A30]/20 border border-[#D85A30]/40 text-[#D85A30] hover:text-white hover:bg-[#D85A30] transition-all font-semibold">
                Tous les Hubs & 50+ Liaisons Négociées →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. APPEL À L'ACTION (CTA Terracotta)
          ===================================================================== */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#C1553C] px-6 py-24 text-center md:py-32">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-radial-gradient(circle at 0 0, transparent 0, #000 10px, transparent 11px)" }}
        />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <svg viewBox="55 65 280 130" className="h-14 md:h-20 w-auto" xmlns="http://www.w3.org/2000/svg">
            <circle cx="120" cy="130" r="56" fill="none" stroke="white" strokeWidth="1.5"/>
            <path d="M95 105 L95 145 Q95 158 108 158 Q121 158 121 145 L121 118" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"/>
            <g transform="translate(133,98) rotate(35)">
              <path d="M0 0 L26 0 L31 -3 L34 0 L31 3 L26 0 Z" fill="white"/>
              <path d="M10 0 L2 -9 L7 -9 L16 -1 Z" fill="white"/>
              <path d="M10 0 L2 9 L7 9 L16 1 Z" fill="white"/>
              <path d="M22 0 L26 5 L29 5 L27 0 Z" fill="white"/>
            </g>
            <text x="200" y="122" fontFamily="Georgia, serif" fontSize="34" fill="white" fontWeight="700">Unique</text>
            <text x="200" y="156" fontFamily="Georgia, serif" fontSize="34" fill="white" fontWeight="700">Voyage</text>
          </svg>
          <Link
            href="/offres"
            className="bg-black px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-105"
          >
            Voir les offres
          </Link>
        </div>
      </section>

      {/* =====================================================================
          7. FOOTER LÉGAL
          ===================================================================== */}
      <footer className="relative w-full bg-[#1A1A1A] px-6 py-8 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">

          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <span className="text-[10px] font-light uppercase tracking-widest text-[#737373]">
                © 2026 UniqueVoyage. Tous droits réservés.
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
              <a href="#" className="text-[10px] font-light uppercase tracking-widest text-[#737373] transition-colors hover:text-white">
                Mentions légales
              </a>
              <a href="#" className="text-[10px] font-light uppercase tracking-widest text-[#737373] transition-colors hover:text-white">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </footer>


    </main>
  );
}
