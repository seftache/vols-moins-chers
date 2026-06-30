"use client";

import { useState } from "react";
import { Loader2, Radar, Sparkles, RefreshCw } from "lucide-react";

export default function AdminActions() {
  const [detectLoading, setDetectLoading] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [detectResult, setDetectResult] = useState("");
  const [generateResult, setGenerateResult] = useState("");

  const handleDetectDeals = async () => {
    setDetectLoading(true);
    setDetectResult("");
    try {
      const res = await fetch("/api/cron/detect-deals", {
        method: "GET",
        headers: { "Authorization": `Bearer ${getCronSecret()}` },
      });
      const data = await res.json();
      if (res.ok) {
        const count = data.deals_found || data.dealsFound || 0;
        setDetectResult(`✅ Scan terminé ! ${count} offre(s) détectée(s).`);
      } else {
        if (res.status === 401) localStorage.removeItem("admin_cron_secret");
        setDetectResult(`❌ Erreur : ${data.error || "Échec du scan."}`);
      }
    } catch {
      setDetectResult("❌ Erreur réseau. Réessayez.");
    }
    setDetectLoading(false);
  };

  const handleGenerateItinerary = async () => {
    setGenerateLoading(true);
    setGenerateResult("");
    try {
      const res = await fetch("/api/ai/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCronSecret()}`,
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (res.ok) {
        setGenerateResult(`✅ Itinéraire généré pour ${data.destination || "une destination"} !`);
      } else {
        if (res.status === 401) localStorage.removeItem("admin_cron_secret");
        setGenerateResult(`❌ Erreur : ${data.error || "Échec de la génération."}`);
      }
    } catch {
      setGenerateResult("❌ Erreur réseau. Réessayez.");
    }
    setGenerateLoading(false);
  };

  const getCronSecret = () => {
    // On récupère le CRON_SECRET depuis un cookie ou on le demande
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin_cron_secret");
      if (stored) return stored;
      const secret = prompt("Entrez votre CRON_SECRET (mot de passe du système automatique) :");
      if (secret) {
        localStorage.setItem("admin_cron_secret", secret);
        return secret;
      }
    }
    return "";
  };

  return (
    <div className="mb-12 space-y-4">
      <h2 className="text-sm uppercase tracking-widest text-[#888] font-semibold mb-4">
        Actions Rapides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bouton 1 : Détecter des offres */}
        <button
          onClick={handleDetectDeals}
          disabled={detectLoading}
          className="group flex items-center gap-4 bg-[#0A0A0A] border border-white/10 p-5 hover:border-[#D85A30]/50 transition-all disabled:opacity-50"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#D85A30]/15 text-[#D85A30]">
            {detectLoading ? <Loader2 size={18} className="animate-spin" /> : <Radar size={18} />}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Scanner les vols</p>
            <p className="text-xs text-[#888]">Lancer la détection maintenant</p>
          </div>
        </button>

        {/* Bouton 2 : Générer un itinéraire IA */}
        <button
          onClick={handleGenerateItinerary}
          disabled={generateLoading}
          className="group flex items-center gap-4 bg-[#0A0A0A] border border-white/10 p-5 hover:border-purple-500/50 transition-all disabled:opacity-50"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-400">
            {generateLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Générer Itinéraire IA</p>
            <p className="text-xs text-[#888]">Créer une offre premium</p>
          </div>
        </button>

        {/* Bouton 3 : Rafraîchir la page */}
        <button
          onClick={() => window.location.reload()}
          className="group flex items-center gap-4 bg-[#0A0A0A] border border-white/10 p-5 hover:border-white/30 transition-all"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60">
            <RefreshCw size={18} />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Rafraîchir</p>
            <p className="text-xs text-[#888]">Recharger les données</p>
          </div>
        </button>
      </div>

      {/* Résultats */}
      {detectResult && (
        <p className={`text-sm px-4 py-3 rounded-lg border ${detectResult.startsWith("✅") ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-[#D85A30]/30 bg-[#D85A30]/10 text-[#D85A30]"}`}>
          {detectResult}
        </p>
      )}
      {generateResult && (
        <p className={`text-sm px-4 py-3 rounded-lg border ${generateResult.startsWith("✅") ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-purple-500/30 bg-purple-500/10 text-purple-400"}`}>
          {generateResult}
        </p>
      )}
    </div>
  );
}
