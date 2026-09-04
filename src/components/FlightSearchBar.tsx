"use client";

import { useState } from "react";
import { Plane, Calendar, Search, ArrowRightLeft, Sparkles, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_AIRPORTS = [
  { code: "ABJ", city: "Abidjan", country: "Côte d'Ivoire", airport: "Félix Houphouët-Boigny" },
  { code: "CDG", city: "Paris", country: "France", airport: "Charles de Gaulle" },
  { code: "DSS", city: "Dakar", country: "Sénégal", airport: "Blaise Diagne" },
  { code: "DXB", city: "Dubaï", country: "Émirats Arabes Unis", airport: "Dubai Intl" },
  { code: "YUL", city: "Montréal", country: "Canada", airport: "Pierre-Elliott-Trudeau" },
  { code: "JFK", city: "New York", country: "États-Unis", airport: "John F. Kennedy" },
  { code: "ACC", city: "Accra", country: "Ghana", airport: "Kotoka Intl" },
  { code: "CMN", city: "Casablanca", country: "Maroc", airport: "Mohammed V" },
  { code: "BRU", city: "Bruxelles", country: "Belgique", airport: "Brussels Airport" },
  { code: "CAN", city: "Canton (Guangzhou)", country: "Chine", airport: "Baiyun Intl" },
  { code: "JED", city: "Jeddah / La Mecque", country: "Arabie Saoudite", airport: "King Abdulaziz" },
  { code: "IST", city: "Istanbul", country: "Turquie", airport: "Istanbul Airport" },
  { code: "BKK", city: "Bangkok", country: "Thaïlande", airport: "Suvarnabhumi" },
  { code: "NRT", city: "Tokyo", country: "Japon", airport: "Narita Intl" },
];

export default function FlightSearchBar() {
  const [tripType, setTripType] = useState<"round" | "oneway">("round");
  const [origin, setOrigin] = useState("ABJ");
  const [destination, setDestination] = useState("DXB");
  const [departDate, setDepartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 24);
    return d.toISOString().split("T")[0];
  });
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("Économique");
  const [isSearching, setIsSearching] = useState(false);

  const swapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const originInfo = POPULAR_AIRPORTS.find((a) => a.code === origin) || { city: origin, code: origin };
  const destInfo = POPULAR_AIRPORTS.find((a) => a.code === destination) || { city: destination, code: destination };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    const message = `Bonjour Unique Voyage, je souhaite réserver un vol sur mesure au meilleur tarif :
🛫 Départ : ${originInfo.city} (${origin})
🏁 Destination : ${destInfo.city} (${destination})
📅 Type de vol : ${tripType === "round" ? "Aller-Retour" : "Aller Simple"}
🗓️ Date départ : ${departDate}
${tripType === "round" ? `🗓️ Date retour : ${returnDate}\n` : ""}👥 Passagers : ${passengers} (${cabinClass})

Pouvez-vous me confirmer le prix le plus bas disponible et le paiement par Wave / Mobile Money ?`;

    const whatsappUrl = `https://wa.me/2250545745749?text=${encodeURIComponent(message)}`;
    
    // Petite simulation de chargement élégante puis ouverture WhatsApp
    setTimeout(() => {
      setIsSearching(false);
      window.open(whatsappUrl, "_blank");
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 sm:my-8 px-2 sm:px-0">
      <div className="relative rounded-2xl sm:rounded-3xl bg-zinc-950/85 backdrop-blur-2xl border-2 border-white/15 p-4 sm:p-7 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(216,90,48,0.2)]">
        
        {/* En-tête du moteur de recherche : Badges & Type de vol */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#D85A30]/20 border border-[#D85A30]/40 text-[#D85A30]">
              <Sparkles size={13} />
              Recherche de vol en direct
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-zinc-400">
              <ShieldCheck size={13} className="text-emerald-400" />
              Garantie Meilleur Prix
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setTripType("round")}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                tripType === "round" ? "bg-[#D85A30] text-white shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Aller-Retour
            </button>
            <button
              type="button"
              onClick={() => setTripType("oneway")}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                tripType === "oneway" ? "bg-[#D85A30] text-white shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Aller Simple
            </button>
          </div>
        </div>

        {/* Formulaire de Recherche Principal */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Ville de départ (4 cols) */}
            <div className="md:col-span-5 relative">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Ville de départ
              </label>
              <div className="relative flex items-center bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 focus-within:border-[#D85A30] focus-within:ring-1 focus-within:ring-[#D85A30] transition-all">
                <Plane className="text-[#D85A30] mr-2.5 shrink-0 -rotate-45" size={18} />
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-transparent text-white font-medium text-sm sm:text-base focus:outline-none cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white"
                >
                  {POPULAR_AIRPORTS.map((apt) => (
                    <option key={apt.code} value={apt.code}>
                      {apt.city} ({apt.code}) — {apt.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bouton d'inversion Aller/Retour (2 cols) */}
            <div className="md:col-span-2 flex justify-center -my-2 md:my-0">
              <button
                type="button"
                onClick={swapAirports}
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#D85A30] text-zinc-300 hover:text-white border border-white/15 transition-all shadow-md active:scale-90"
                title="Inverser les aéroports"
                aria-label="Inverser départ et destination"
              >
                <ArrowRightLeft size={16} />
              </button>
            </div>

            {/* Ville d'arrivée (5 cols) */}
            <div className="md:col-span-5 relative">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Destination d'arrivée
              </label>
              <div className="relative flex items-center bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 focus-within:border-[#D85A30] focus-within:ring-1 focus-within:ring-[#D85A30] transition-all">
                <Plane className="text-[#D85A30] mr-2.5 shrink-0 rotate-45" size={18} />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-white font-medium text-sm sm:text-base focus:outline-none cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white"
                >
                  {POPULAR_AIRPORTS.map((apt) => (
                    <option key={apt.code} value={apt.code}>
                      {apt.city} ({apt.code}) — {apt.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Deuxième rangée : Dates, Passagers et Bouton de validation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end pt-1">
            
            {/* Date Départ (3 cols) */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Date de départ
              </label>
              <div className="relative flex items-center bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 focus-within:border-[#D85A30] transition-all">
                <Calendar className="text-zinc-400 mr-2.5 shrink-0" size={17} />
                <input
                  type="date"
                  value={departDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer [color-scheme:dark]"
                  required
                />
              </div>
            </div>

            {/* Date Retour (3 cols) */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Date de retour {tripType === "oneway" && "(Optionnel)"}
              </label>
              <div className={`relative flex items-center bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 focus-within:border-[#D85A30] transition-all ${
                tripType === "oneway" ? "opacity-40 pointer-events-none" : ""
              }`}>
                <Calendar className="text-zinc-400 mr-2.5 shrink-0" size={17} />
                <input
                  type="date"
                  value={returnDate}
                  min={departDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setReturnDate(e.target.value)}
                  disabled={tripType === "oneway"}
                  className="w-full bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Passagers & Classe (3 cols) */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Voyageurs & Classe
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-1/2 bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-[#D85A30] cursor-pointer [&>option]:bg-zinc-900"
                >
                  <option value={1}>1 Adulte</option>
                  <option value={2}>2 Adultes</option>
                  <option value={3}>3 Adultes</option>
                  <option value={4}>4+ Famille</option>
                </select>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-1/2 bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-[#D85A30] cursor-pointer [&>option]:bg-zinc-900"
                >
                  <option value="Économique">Éco</option>
                  <option value="Affaires">Affaires</option>
                  <option value="Première">First</option>
                </select>
              </div>
            </div>

            {/* Bouton de Soumission (3 cols) */}
            <div className="lg:col-span-3">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-[#D85A30] hover:bg-[#b84a25] text-white font-bold py-3 px-4 rounded-xl uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-[#D85A30]/40 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSearching ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Recherche...
                  </span>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Trouver le vol</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </form>

        {/* Pied du formulaire : Réassurance client */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 gap-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Paiement 100% sécurisé : <strong>Wave, Mobile Money (Orange/MTN)</strong> ou Virement</span>
          </div>
          <div className="flex items-center gap-1 text-[#D85A30]">
            <MessageSquare size={13} />
            <span>Assistance réservation directe 7j/7</span>
          </div>
        </div>

      </div>
    </div>
  );
}