"use client";

import { useState } from "react";
import { Plane, Calendar, Search, ArrowRightLeft, Sparkles, ShieldCheck, CheckCircle2, MessageSquare, MapPin } from "lucide-react";

export default function FlightSearchBar() {
  const [tripType, setTripType] = useState<"round" | "oneway">("round");
  const [origin, setOrigin] = useState("Abidjan (ABJ)");
  const [destination, setDestination] = useState("Paris (CDG)");
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    const message = `Bonjour Unique Voyage Conciergerie, je souhaite trouver le vol le moins cher au monde pour ma liaison sur mesure :
🛫 Départ : ${origin || "Non précisé"}
🏁 Destination : ${destination || "Non précisé"}
📅 Type de vol : ${tripType === "round" ? "Aller-Retour" : "Aller Simple"}
🗓️ Date départ : ${departDate}
${tripType === "round" ? `🗓️ Date retour : ${returnDate}\n` : ""}👥 Voyageurs : ${passengers} (${cabinClass})

Pouvez-vous me trouver le meilleur tarif négocié du marché et me proposer les options avec paiement Wave / Mobile Money ?`;

    const whatsappUrl = `https://wa.me/2250545745749?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsSearching(false);
      window.open(whatsappUrl, "_blank");
    }, 500);
  };

  const quickOrigins = ["Abidjan", "Dakar", "Paris", "Douala", "Bruxelles", "Cotonou", "Bamako"];
  const quickDests = ["Dubaï", "Istanbul", "Paris", "Montréal", "Zanzibar", "New York", "Bangkok", "Tokyo"];

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-2 sm:px-0">
      <div className="relative rounded-2xl sm:rounded-3xl bg-zinc-950/90 backdrop-blur-2xl border border-white/15 p-5 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(216,90,48,0.15)]">
        
        {/* En-tête : Badges & Type de vol */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#D85A30]/20 border border-[#D85A30]/40 text-[#D85A30]">
              <Sparkles size={13} />
              Recherche libre de vol mondial
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-zinc-400">
              <ShieldCheck size={13} className="text-emerald-400" />
              Conciergerie & Négociation IA
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
            
            {/* Ville de départ LIBRE */}
            <div className="md:col-span-5 relative">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Ville de départ (Monde entier)
              </label>
              <div className="relative flex items-center bg-white/5 border border-white/15 rounded-xl px-3.5 py-3 focus-within:border-[#D85A30] focus-within:ring-1 focus-within:ring-[#D85A30] transition-all">
                <Plane className="text-[#D85A30] mr-2.5 shrink-0 -rotate-45" size={18} />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Tapez votre ville de départ..."
                  className="w-full bg-transparent text-white font-medium text-sm sm:text-base focus:outline-none placeholder:text-zinc-600"
                  required
                />
              </div>
              {/* Suggestions rapides */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] text-zinc-500 mr-1 flex items-center gap-0.5">
                  <MapPin size={10} /> Départs fréquents :
                </span>
                {quickOrigins.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setOrigin(city)}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton d'inversion Aller/Retour */}
            <div className="md:col-span-2 flex justify-center -my-1 md:my-0">
              <button
                type="button"
                onClick={swapAirports}
                className="p-3 rounded-full bg-white/10 hover:bg-[#D85A30] text-zinc-300 hover:text-white border border-white/15 transition-all shadow-md active:scale-90"
                title="Inverser départ et destination"
                aria-label="Inverser départ et destination"
              >
                <ArrowRightLeft size={16} />
              </button>
            </div>

            {/* Ville d'arrivée LIBRE */}
            <div className="md:col-span-5 relative">
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Destination d'arrivée (Monde entier)
              </label>
              <div className="relative flex items-center bg-white/5 border border-white/15 rounded-xl px-3.5 py-3 focus-within:border-[#D85A30] focus-within:ring-1 focus-within:ring-[#D85A30] transition-all">
                <Plane className="text-[#D85A30] mr-2.5 shrink-0 rotate-45" size={18} />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Tapez n'importe quelle destination dans le monde..."
                  className="w-full bg-transparent text-white font-medium text-sm sm:text-base focus:outline-none placeholder:text-zinc-600"
                  required
                />
              </div>
              {/* Suggestions rapides */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] text-zinc-500 mr-1 flex items-center gap-0.5">
                  <MapPin size={10} /> Populaires :
                </span>
                {quickDests.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setDestination(city)}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Deuxième rangée : Dates, Passagers & Soumission */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end pt-3 border-t border-white/10">
            
            {/* Date Départ */}
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

            {/* Date Retour */}
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

            {/* Passagers & Classe */}
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

            {/* Bouton de Soumission */}
            <div className="lg:col-span-3">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-[#D85A30] hover:bg-[#b84a25] text-white font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-[#D85A30]/40 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSearching ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Transmission...
                  </span>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Demander ce vol</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </form>

        {/* Pied : Réassurance */}
        <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 gap-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Paiement local sans frais : <strong>Wave, Mobile Money</strong> ou Carte</span>
          </div>
          <div className="flex items-center gap-1 text-[#D85A30]">
            <MessageSquare size={13} />
            <span>Votre concierge IA vous répond 7j/7 sur WhatsApp</span>
          </div>
        </div>

      </div>
    </div>
  );
}