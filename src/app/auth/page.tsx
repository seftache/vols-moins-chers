"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Eye, EyeOff, Check } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "signin" | "signup";
type Status = "idle" | "loading" | "success" | "error";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, on le redirige directement
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push(redirectTo);
      }
    });
  }, [router, redirectTo]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setWhatsapp("");
    setErrorMsg("");
    setSuccessMsg("");
    setStatus("idle");
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // ── CONNEXION ──────────────────────────────────────────────
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setStatus("error");
        setErrorMsg(
          error.message.includes("Invalid login credentials")
            ? "Email ou mot de passe incorrect."
            : error.message
        );
        return;
      }

      // Redirection après connexion réussie
      window.location.href = redirectTo;
    }

    // ── INSCRIPTION ────────────────────────────────────────────
    if (mode === "signup") {
      // 1. Créer le compte
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setStatus("error");
        setErrorMsg(
          signUpError.message.includes("already registered")
            ? "Cet email est déjà utilisé. Connectez-vous plutôt."
            : signUpError.message
        );
        return;
      }

      // 2. Si l'email n'a pas besoin de confirmation (session disponible immédiatement)
      if (data.session) {
        // Créer la ligne dans public.users
        await supabase.from("users").upsert({
          id: data.user!.id,
          whatsapp_number: "",
          is_vip: false,
          referrals_count: 0,
        });

        // ── GESTION DU PARRAINAGE ──
        const refCode = localStorage.getItem("uv_referral_code");
        if (refCode) {
          try {
            const { incrementReferral } = await import("./actions");
            await incrementReferral(refCode);
            localStorage.removeItem("uv_referral_code");
          } catch (err) {
            console.error("Erreur de parrainage", err);
          }
        }

        window.location.href = redirectTo;
      } else {
        // Email de confirmation envoyé
        setStatus("success");
        setSuccessMsg(
          "Un email de confirmation vous a été envoyé. Cliquez sur le lien pour activer votre compte."
        );
      }
    }
  };

  const isLoading = status === "loading";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6">
      {/* Orbe de fond */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D85A30]/6 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <a href="/" className="mb-12 flex justify-center">
          <svg viewBox="55 65 280 130" className="h-12 w-auto" xmlns="http://www.w3.org/2000/svg">
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

        {/* Sélecteur Connexion / Inscription */}
        <div className="mb-10 flex w-full rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`flex-1 rounded-lg py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                mode === m
                  ? "bg-[#D85A30] text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {m === "signin" ? "Connexion" : "Inscription"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Succès (email de confirmation envoyé) ── */}
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-5 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D85A30]/20">
                <Check size={28} className="text-[#D85A30]" strokeWidth={2.5} />
              </div>
              <h2 className="font-serif text-2xl text-white">Vérifiez vos emails !</h2>
              <p className="text-sm font-light leading-relaxed text-white/45">{successMsg}</p>
              <button
                onClick={() => switchMode("signin")}
                className="mt-4 text-xs uppercase tracking-widest text-[#D85A30] hover:opacity-70 transition-opacity"
              >
                ← Retour à la connexion
              </button>
            </motion.div>
          ) : (
            /* ── Formulaire ── */
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === "signin" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email */}
              <div className="group relative border-b border-white/15 pb-2 transition-colors focus-within:border-white">
                <label className="mb-1 block text-[10px] uppercase tracking-widest text-white/30">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  disabled={isLoading}
                  className="w-full bg-transparent py-1.5 text-base font-light text-white placeholder:text-white/20 focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* Mot de passe */}
              <div className="group relative border-b border-white/15 pb-2 transition-colors focus-within:border-white">
                <label className="mb-1 block text-[10px] uppercase tracking-widest text-white/30">
                  Mot de passe
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "signup" ? "Min. 8 caractères" : "••••••••"}
                    required
                    minLength={mode === "signup" ? 8 : undefined}
                    disabled={isLoading}
                    className="w-full bg-transparent py-1.5 text-base font-light text-white placeholder:text-white/20 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 flex-shrink-0 text-white/25 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* WhatsApp supprimé car on passe par Email / Groupe WhatsApp Admin */}

              {/* Message d'erreur */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-[#D85A30]/30 bg-[#D85A30]/10 px-4 py-3 text-xs font-light text-[#D85A30]"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Bouton de soumission */}
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                type="submit"
                disabled={isLoading}
                className="group mt-2 flex w-full items-center justify-center gap-3 bg-[#D85A30] py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c24e27] disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    {mode === "signin" ? "Se connecter" : "Créer mon compte"}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>

              {/* Lien mot de passe oublié (connexion seulement) */}
              {mode === "signin" && (
                <p className="text-center text-xs font-light text-white/25">
                  Pas encore de compte ?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className="text-white/50 underline-offset-2 hover:underline hover:text-white/70 transition-colors"
                  >
                    Créer un compte gratuitement
                  </button>
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <Loader2 className="animate-spin text-[#D85A30]" size={36} />
      </main>
    }>
      <AuthContent />
    </Suspense>
  );
}
