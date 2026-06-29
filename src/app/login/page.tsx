"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      phone: phone.trim(),
    });

    if (error) {
      setError("Impossible d'envoyer le code. Vérifiez le format (+225...)");
    } else {
      setStep("otp");
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.verifyOtp({
      phone: phone.trim(),
      token: otp.trim(),
      type: "sms",
    });

    if (error) {
      setError("Code invalide ou expiré. Réessayez.");
    } else {
      window.location.href = "/dashboard";
    }
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6">
      {/* Orbe de fond */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D85A30]/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <a href="/" className="mb-12 flex justify-center">
          <svg viewBox="55 65 280 130" className="h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
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

        {step === "phone" ? (
          <>
            <h1 className="mb-2 text-center font-serif text-3xl text-white">Accès Membre</h1>
            <p className="mb-10 text-center text-sm font-light text-white/40">
              Entrez votre numéro WhatsApp pour recevoir un code.
            </p>

            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="relative border-b border-white/20 pb-2 focus-within:border-white transition-colors">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+225 07 00 00 00 00"
                  disabled={isLoading}
                  className="w-full bg-transparent py-2 text-lg font-light text-white placeholder:text-white/25 focus:outline-none"
                />
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#D85A30]">
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading || !phone.trim()}
                className="group mt-4 flex w-full items-center justify-center gap-3 bg-[#D85A30] py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c24e27] disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Recevoir le code <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-center font-serif text-3xl text-white">Code reçu ?</h1>
            <p className="mb-10 text-center text-sm font-light text-white/40">
              Entrez le code envoyé sur <span className="text-white/70">{phone}</span>
            </p>

            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="relative border-b border-white/20 pb-2 focus-within:border-white transition-colors">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="• • • • • •"
                  maxLength={6}
                  disabled={isLoading}
                  className="w-full bg-transparent py-2 text-center text-2xl font-light tracking-[0.5em] text-white placeholder:text-white/25 focus:outline-none"
                />
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#D85A30]">
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading || otp.length < 6}
                className="group mt-4 flex w-full items-center justify-center gap-3 bg-[#D85A30] py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c24e27] disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Accéder au dashboard <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
              </button>

              <button
                type="button"
                onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                className="w-full pt-2 text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                ← Modifier le numéro
              </button>
            </form>
          </>
        )}
      </motion.div>
    </main>
  );
}
