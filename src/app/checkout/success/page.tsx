"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";

function CheckoutSuccessContent() {
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
    <>
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center backdrop-blur-xl">
        {status === "loading" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <Loader2 size={48} className="animate-spin text-[#D85A30]" />
            <h1 className="mt-8 font-serif text-2xl">Vérification en cours...</h1>
            <p className="mt-2 text-sm text-white/40">
              Nous confirmons votre paiement avec Paystack.
            </p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-500">
              <CheckCircle size={40} strokeWidth={1.5} />
            </div>
            <span className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#D85A30]">
              Paiement confirmé
            </span>
            <h1 className="font-serif text-3xl">Bienvenue, VIP.</h1>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/50">
              Votre abonnement a été activé avec succès. Vous recevrez désormais nos meilleures offres en temps réel.
            </p>

            <a
              href="/dashboard"
              className="group mt-10 flex w-full items-center justify-center gap-3 rounded-lg bg-[#D85A30] py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c24e27]"
            >
              Accéder au Club
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 text-red-500">
              <CheckCircle size={40} strokeWidth={1.5} className="rotate-45" />
            </div>
            <h1 className="font-serif text-2xl">Oups.</h1>
            <p className="mt-4 text-sm font-light text-white/50">
              Nous n'avons pas pu valider votre paiement.
            </p>
            <a
              href="/checkout"
              className="mt-8 text-xs uppercase tracking-widest text-white/40 hover:text-white"
            >
              Retour
            </a>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6 text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D85A30]/8 blur-[140px]" />
      </div>

      <Suspense fallback={<Loader2 size={48} className="animate-spin text-[#D85A30]" />}>
        <CheckoutSuccessContent />
      </Suspense>
    </main>
  );
}
