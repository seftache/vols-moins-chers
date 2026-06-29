"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  Loader2,
  ArrowRight,
  Star,
  Zap,
  Clock,
} from "lucide-react";

type PaymentChannel = "card" | "mobile_money";

const benefits = [
  { icon: Zap, label: "Alertes en temps réel", detail: "Avant tout le monde" },
  { icon: ShieldCheck, label: "Accès Club Privé", detail: "Offres exclusives VIP" },
  { icon: Star, label: "IA Personnalisée", detail: "Itinéraires sur-mesure" },
  { icon: Clock, label: "Annulable à tout moment", detail: "Sans engagement" },
];

export default function CheckoutPage() {
  const [selectedChannel, setSelectedChannel] = useState<PaymentChannel | null>("mobile_money");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!selectedChannel) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: selectedChannel }),
      });

      const data = await res.json();

      if (!res.ok || !data.authorization_url) {
        setError(data.error || "Impossible d'initialiser le paiement. Réessayez.");
        setIsLoading(false);
        return;
      }

      // Redirection vers la page de paiement Paystack
      window.location.href = data.authorization_url;

    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white font-sans antialiased">
      {/* Fond lumineux */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D85A30]/8 blur-[130px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-white/3 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.07] px-6 py-5">
        <a href="/" className="flex items-center justify-center">
          <svg viewBox="55 65 280 130" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
            <circle cx="120" cy="130" r="56" fill="none" stroke="white" strokeWidth="1.5" />
            <path d="M95 105 L95 145 Q95 158 108 158 Q121 158 121 145 L121 118" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <g transform="translate(133,98) rotate(35)">
              <path d="M0 0 L26 0 L31 -3 L34 0 L31 3 L26 0 Z" fill="#D85A30" />
              <path d="M10 0 L2 -9 L7 -9 L16 -1 Z" fill="#D85A30" />
              <path d="M10 0 L2 9 L7 9 L16 1 Z" fill="#D85A30" />
              <path d="M22 0 L26 5 L29 5 L27 0 Z" fill="#D85A30" />
            </g>
            <text x="200" y="122" fontFamily="Georgia, serif" fontSize="34" fill="white" fontWeight="700">Unique</text>
            <text x="200" y="156" fontFamily="Georgia, serif" fontSize="34" fill="#D85A30" fontWeight="700">Voyage</text>
          </svg>
        </a>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-24">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-[11px] uppercase tracking-[0.3em] text-[#D85A30]">
            Accès Club VIP
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
            Rejoignez l'élite.
          </h1>
          <p className="mt-4 text-sm font-light text-white/40">
            Abonnement mensuel — annulable à tout moment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── Colonne Gauche : Avantages ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/30">
              Ce que vous débloquez
            </p>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#D85A30]/15 text-[#D85A30]">
                    <b.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{b.label}</p>
                    <p className="text-xs text-white/35">{b.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Prix */}
            <div className="flex items-baseline gap-2 pt-4">
              <span className="font-serif text-5xl text-white">2 500</span>
              <span className="text-lg font-light text-white/50">FCFA</span>
              <span className="ml-1 text-sm text-white/30">/ mois</span>
            </div>
            <p className="text-xs text-white/20">
              Paiement sécurisé via Paystack · Wave · Carte Bancaire
            </p>
          </motion.div>

          {/* ── Colonne Droite : Paiement ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/30">
              Choisissez votre méthode de paiement
            </p>

            {/* Option Mobile Money / Wave */}
            <button
              onClick={() => setSelectedChannel("mobile_money")}
              className={`group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ${
                selectedChannel === "mobile_money"
                  ? "border-[#D85A30] bg-[#D85A30]/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
              }`}
            >
              {/* Indicateur sélection */}
              <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                selectedChannel === "mobile_money"
                  ? "border-[#D85A30] bg-[#D85A30]"
                  : "border-white/25"
              }`}>
                {selectedChannel === "mobile_money" && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone size={18} className="text-[#D85A30]" strokeWidth={1.5} />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Wave / Mobile Money
                  </span>
                </div>
                <p className="text-xs font-light text-white/40">
                  Wave CI, Orange Money, MTN MoMo — sans carte bancaire.
                </p>
              </div>

              {/* Logos opérateurs */}
              <div className="flex flex-col gap-1 text-[10px] text-white/25">
                <span>Wave</span>
                <span>Orange</span>
                <span>MTN</span>
              </div>
            </button>

            {/* Option Carte Bancaire */}
            <button
              onClick={() => setSelectedChannel("card")}
              className={`group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ${
                selectedChannel === "card"
                  ? "border-[#D85A30] bg-[#D85A30]/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
              }`}
            >
              <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                selectedChannel === "card"
                  ? "border-[#D85A30] bg-[#D85A30]"
                  : "border-white/25"
              }`}>
                {selectedChannel === "card" && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard size={18} className="text-[#D85A30]" strokeWidth={1.5} />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Carte Bancaire
                  </span>
                </div>
                <p className="text-xs font-light text-white/40">
                  Visa, Mastercard — paiement sécurisé via Paystack.
                </p>
              </div>

              <div className="flex flex-col gap-1 text-[10px] text-white/25">
                <span>Visa</span>
                <span>MC</span>
              </div>
            </button>

            {/* Sécurité */}
            <div className="flex items-center gap-2 text-xs text-white/25 px-1">
              <ShieldCheck size={14} className="text-white/30" />
              <span>Paiement 100% sécurisé — vos données sont chiffrées.</span>
            </div>

            {/* Erreur */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-[#D85A30]/30 bg-[#D85A30]/10 px-4 py-3 text-xs text-[#D85A30]"
              >
                {error}
              </motion.p>
            )}

            {/* Bouton CTA */}
            <motion.button
              whileHover={{ scale: selectedChannel && !isLoading ? 1.01 : 1 }}
              whileTap={{ scale: selectedChannel && !isLoading ? 0.99 : 1 }}
              onClick={handlePayment}
              disabled={!selectedChannel || isLoading}
              className="mt-2 flex w-full items-center justify-center gap-3 bg-[#D85A30] py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c24e27] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Redirection en cours...
                </>
              ) : (
                <>
                  Payer 2 500 FCFA
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>

            <p className="text-center text-[11px] text-white/20">
              En continuant, vous acceptez nos conditions d'utilisation.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
