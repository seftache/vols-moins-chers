"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleVIPClick = () => {
    setIsModalOpen(true);
  };
  
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const carouselItems = [
    { id: 1, title: "DUBAÏ", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "PARIS", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "DAKAR", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "MONTRÉAL", image: "https://images.unsplash.com/photo-1517737222373-c15d78a9c42c?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, title: "LONDRES", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, title: "TOKYO", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop" },
  ];

  return (
    <main className="relative w-full selection:bg-white/30">
      
      {/* L'arrière plan Parallaxe est maintenant géré directement dans la section correspondante */}

      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3000&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-16 md:py-12 lg:px-24">
          <header className="flex w-full items-center justify-between">
            <div className="font-playfair text-2xl uppercase tracking-widest text-white">
              Carrefour VIP
            </div>
            <div className="flex items-center gap-8">
              <a 
                href="#" 
                className="hidden text-xs font-light uppercase tracking-widest text-white transition-opacity hover:opacity-70 md:block"
              >
                S'identifier
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="border border-white bg-transparent px-6 py-3 text-xs font-light uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
              >
                Accès Privé
              </button>
            </div>
          </header>

          <div className="flex w-full max-w-4xl flex-col items-start justify-center">
            <p className="mb-6 text-[10px] font-light uppercase tracking-[0.3em] text-white/80 sm:text-xs">
              L'intelligence artificielle au service des voyageurs d'élite.
            </p>
            
            <h1 className="mb-12 font-playfair text-5xl leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Ne payez plus jamais<br />
              le plein tarif<br />
              depuis Abidjan.
            </h1>

            <form className="group relative flex w-full max-w-md items-center border-b border-white/50 pb-2 transition-colors focus-within:border-white hover:border-white" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Votre numéro WhatsApp..."
                className="w-full bg-transparent px-2 py-2 font-playfair text-lg italic text-white placeholder:text-white/50 focus:outline-none"
              />
              <button 
                type="submit" 
                className="p-2 text-white/70 transition-colors hover:text-white"
                aria-label="Valider"
              >
                <ArrowRight strokeWidth={1} size={28} />
              </button>
            </form>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              Découvrir
            </span>
            <div className="h-[50px] w-[1px] bg-white/50" />
          </div>
        </div>
      </section>

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
              Chaque jour, des failles de tarification et des erreurs humaines apparaissent sur les lignes reliant Abidjan à Paris, Dubaï ou Montréal. Notre système scanne ces anomalies en temps réel. Avant qu'elles ne soient corrigées, elles sont entre vos mains.
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
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          3. PARALLAXE (Image lumineuse de voyage)
          ===================================================================== */}
      <section className="relative flex h-[70vh] w-full items-center justify-center px-6 overflow-hidden bg-black">
        {/* Image Parallaxe (Vue depuis un avion) cantonnée à cette section via bg-fixed */}
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
          "Le monde appartient à ceux<br />qui ne patientent pas."
        </motion.h2>
      </section>

      {/* =====================================================================
          4. ÉCHAPPÉES BELLES (Carousel Apple-Style sur fond clair)
          ===================================================================== */}
      <section className="relative w-full py-32 bg-[#F9F9F9] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24 mb-16 flex justify-between items-end">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-playfair text-4xl text-black md:text-5xl"
            >
              Échappées Belles
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="mt-4 text-xs font-light uppercase tracking-widest text-[#555555]"
            >
              Sélection confidentielle
            </motion.p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scrollCarousel("left")}
              className="p-3 border border-black/20 text-black rounded-full transition-colors hover:bg-black hover:text-white"
              aria-label="Défiler à gauche"
            >
              <ArrowLeft size={20} strokeWidth={1} />
            </button>
            <button 
              onClick={() => scrollCarousel("right")}
              className="p-3 border border-black/20 text-black rounded-full transition-colors hover:bg-black hover:text-white"
              aria-label="Défiler à droite"
            >
              <ArrowRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

        <div 
          ref={carouselRef}
          className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-16 lg:px-24 snap-x snap-mandatory hide-scrollbar pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {carouselItems.map((item, index) => (
            <motion.a 
              key={item.id}
              href="#"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group relative flex-none w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[22vw] aspect-[4/5] snap-center overflow-hidden cursor-pointer bg-[#0A0A0A]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
              
              <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-10 w-full">
                <h3 className="font-sans font-bold text-sm md:text-base uppercase tracking-[0.25em] text-white drop-shadow-md">{item.title}</h3>
              </div>
            </motion.a>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </section>

      {/* =====================================================================
          4.5 SECTION PUBLICITAIRE (Marquee Typographique Infi-Scroll style Apple)
          ===================================================================== */}
      <section className="relative w-full py-32 bg-[#000000] overflow-hidden flex flex-col justify-center">
        
        {/* Ligne 1 : Défilement vers la gauche */}
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

        {/* Ligne 2 : Défilement vers la droite */}
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
                  Dubaï • Paris • Monde
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
          
          {/* Colonne de Gauche : Collante */}
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
              Au-delà des vols invisibles, nous déverrouillons l'accès aux retraites les plus exclusives du globe. Villas suspendues, palaces historiques et sanctuaires où le luxe se mesure au silence. Bénéficiez de nos privilèges membres sur votre séjour.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <button className="border border-white/20 px-8 py-4 uppercase font-sans tracking-[0.2em] text-[10px] text-white hover:bg-white hover:text-black transition-colors duration-500">
                Découvrir la collection
              </button>
            </motion.div>
          </div>

          {/* Colonne de Droite : Les Hôtels qui défilent */}
          <div className="md:w-2/3 flex flex-col gap-16 md:gap-32 mt-16 md:mt-0">
             
             {/* Hotel Card 1 */}
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

             {/* Hotel Card 2 - Offset asymétrique */}
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

             {/* Hotel Card 3 */}
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
          5. L'OFFRE VIP
          ===================================================================== */}
      <section className="relative w-full bg-[#0A0A0A] px-6 py-40 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 font-playfair text-4xl text-white md:text-6xl"
          >
            Le Club Privé
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mb-12 max-w-2xl font-sans text-sm font-light leading-relaxed text-[#A3A3A3] md:text-base"
          >
            Le temps est le vrai luxe. Accédez à nos itinéraires secrets et aux alertes instantanées avant tout le monde.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            onClick={handleVIPClick}
            className="border border-white/30 bg-transparent px-10 py-5 transition-all duration-300 hover:bg-white hover:text-black"
          >
            <span className="font-sans text-xs font-bold uppercase tracking-widest">
              Accès VIP - 2 500 FCFA / mois
            </span>
          </motion.button>
        </div>
      </section>

      {/* =====================================================================
          6. APPEL À L'ACTION (CTA Terracotta)
          ===================================================================== */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#C1553C] px-6 py-24 text-center md:py-32">
        {/* Effet de texture subtil pour imiter les vagues de la capture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-radial-gradient(circle at 0 0, transparent 0, #000 10px, transparent 11px)" }}
        />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <h2 className="font-sans text-3xl font-bold uppercase tracking-widest text-white md:text-5xl">
            Carrefour VIP
          </h2>
          <button 
            onClick={handleVIPClick}
            className="bg-black px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-105"
          >
            Rejoindre le Cercle
          </button>
        </div>
      </section>

      {/* =====================================================================
          7. FOOTER LÉGAL
          ===================================================================== */}
      <footer className="relative w-full bg-[#1A1A1A] px-6 py-8 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
          
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
            <span className="text-[10px] font-light uppercase tracking-widest text-[#737373]">
              © 2026. Tous droits réservés.
            </span>
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

      {/* =====================================================================
          MODALE VIP (Overlay Inscription)
          ===================================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-16 right-0 p-2 text-white/50 transition-colors hover:text-white"
                aria-label="Fermer"
              >
                <X strokeWidth={1} size={32} />
              </button>

              <h3 className="mb-16 font-playfair text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
                Déverrouillez<br />le réseau invisible.
              </h3>

              <form className="flex w-full flex-col gap-16" onSubmit={(e) => e.preventDefault()}>
                <div className="group relative border-b border-white/50 pb-2 transition-colors focus-within:border-white hover:border-white">
                  <input
                    type="text"
                    placeholder="Entrez votre numéro WhatsApp ou Wave..."
                    className="w-full bg-transparent px-2 py-2 font-playfair text-xl italic text-white placeholder:text-white/50 focus:outline-none sm:text-2xl"
                    autoFocus
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-white px-8 py-5 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  VALIDER L'ACCÈS VIP - 2 500 FCFA
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
