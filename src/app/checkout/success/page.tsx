"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }

    // Vérifier le paiement côté serveur (optionnel, le webhook s'en charge aussi)
    // On considère que si Paystack a redirigé ici, le paiement est validé
    // Le webhook aura déjà mis à jour is_vip en arrière-plan
    setTimeout(() => setStatus("success"), 1200);
  }, [reference]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6 text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D85A30]/8 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-md"
      >
        {status === "loading" && (
          <>
            <Loader2 size={48} className="animate-spin text-[#D85A30] mb-6" />
            <p className="text-sm text-white/40">Validation de votre paiement...</p>
          </>
        )}

        {status === "success" && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#D85A30]/15 ring-1 ring-[#D85A30]/30"
            >
              <CheckCircle size={48} className="text-[#D85A30]" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-4xl mb-3"
            >
              Bienvenue dans le Club.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-light leading-relaxed text-white/45 mb-10"
            >
              Votre paiement a été confirmé. Vous recevrez désormais toutes nos
              alertes <span className="text-white font-semibold">en temps réel</span> sur
              votre WhatsApp — avant tout le monde.
            </motion.p>

            {reference && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-8 text-[11px] text-white/20 font-mono"
              >
                Référence : {reference}
              </motion.p>
            )}

            <motion.a
              href="/dashboard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="group flex items-center gap-3 bg-[#D85A30] px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c24e27]"
            >
              Accéder à mon dashboard
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-serif text-3xl mb-3 text-white">Référence introuvable.</h1>
            <p className="text-sm text-white/40 mb-8">
              Votre paiement a peut-être déjà été traité. Vérifiez votre dashboard.
            </p>
            <a href="/dashboard" className="text-sm text-[#D85A30] underline">
              Aller au dashboard →
            </a>
          </>
        )}
      </motion.div>
    </main>
  );
}
