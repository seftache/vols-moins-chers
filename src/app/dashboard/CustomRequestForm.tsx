"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2, Lock, ArrowRight, PlaneTakeoff } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

interface CustomRequestFormProps {
  isVip: boolean;
}

export default function CustomRequestForm({ isVip }: CustomRequestFormProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedCity, setSelectedCity] = useState<{ name: string; code: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setLoadingSuggestions(true);
      try {
        const res = await fetch(`https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(query)}&locale=fr&types[]=city`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data || []);
        }
      } catch (err) {
        console.error("Autocomplete error:", err);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (city: any) => {
    setSelectedCity({ name: city.name, code: city.code });
    setQuery(city.name);
    setSuggestions([]);
  };

  const handleGenerate = async () => {
    if (!isVip) {
      router.push("/checkout");
      return;
    }

    if (!selectedCity) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Vous devez être connecté.");

      const res = await fetch("/api/ai/generate-custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          destinationName: selectedCity.name,
          destinationIata: selectedCity.code
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de la génération.");
      }

      if (data.success && data.id) {
        router.push(`/itinerary/${data.id}`);
      }
    } catch (err: any) {
      setError(err.message || "Impossible de générer l'offre. Réessayez plus tard.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
      {/* Overlay pour membres gratuits */}
      {!isVip && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md p-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            <Lock size={24} />
          </div>
          <h3 className="text-xl font-serif text-white mb-2">Recherche sur Mesure</h3>
          <p className="text-sm text-white/60 mb-6 max-w-sm">
            Demandez à l'IA de scanner n'importe quelle ville dans le monde en temps réel. Fonctionnalité exclusive au Club VIP.
          </p>
          <a
            href="/checkout"
            className="flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black hover:bg-yellow-400 transition-colors"
          >
            Débloquer l'accès VIP
          </a>
        </div>
      )}

      <div className={`space-y-6 ${!isVip ? "opacity-30 blur-sm pointer-events-none select-none" : ""}`}>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D85A30]/20 text-[#D85A30]">
            <PlaneTakeoff size={24} />
          </div>
          <div>
            <h2 className="text-xl font-serif text-white">Créer une offre sur mesure</h2>
            <p className="text-sm font-light text-white/50">L'IA scanne les vols et hôtels pour la ville de votre choix.</p>
          </div>
        </div>

        <div className="relative space-y-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:border-[#D85A30]/50 focus:outline-none focus:ring-1 focus:ring-[#D85A30]/50 transition-all"
              placeholder="Ex: Séoul, La Mecque, New York..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedCity(null);
              }}
              disabled={isGenerating}
            />
            
            {loadingSuggestions && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#D85A30]">
                <Loader2 size={18} className="animate-spin" />
              </div>
            )}
          </div>

          {/* Menu déroulant Autocomplétion */}
          {suggestions.length > 0 && !selectedCity && (
            <div ref={dropdownRef} className="absolute left-0 right-0 z-30 mt-2 max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-[#121212] shadow-2xl">
              {suggestions.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleSelect(city)}
                  className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left hover:bg-white/5 last:border-0 transition-colors"
                >
                  <MapPin size={16} className="text-white/40 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium">{city.name}</p>
                    <p className="text-xs text-white/40">{city.country_name} ({city.code})</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            onClick={handleGenerate}
            disabled={!selectedCity || isGenerating}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#D85A30] py-4 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-[#c24e27]"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Analyse en cours (≈20s)...</span>
              </>
            ) : (
              <>
                Générer mon itinéraire VIP
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
