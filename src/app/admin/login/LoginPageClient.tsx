"use client";

import { useState, useTransition } from "react";
import { loginAdmin } from "../actions";
import { useRouter } from "next/navigation";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      try {
        await loginAdmin(formData);
        router.push("/admin/dashboard");
      } catch (err: any) {
        setError(err.message || "Erreur de connexion.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-[#D85A30]/15 border border-[#D85A30]/30 flex items-center justify-center text-[#D85A30]">
            <Lock size={26} />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-white text-center mb-1 uppercase tracking-widest">
          Espace Direction
        </h1>
        <p className="text-xs text-[#888] text-center mb-8">
          Gestion de la billetterie et des commissions
        </p>

        {error && (
          <div className="bg-[#7a1818]/20 border border-[#7a1818] text-[#ff4d4d] text-xs p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
              Code Secret Administrateur
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Entrez votre mot de passe admin"
              autoFocus
              className="w-full bg-[#111] border border-white/15 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#D85A30] text-sm transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#D85A30] text-white font-bold uppercase tracking-widest py-4 text-xs rounded-xl hover:bg-[#c04b25] transition-all disabled:opacity-50 flex justify-center items-center gap-2 shadow-lg shadow-[#D85A30]/20"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShieldCheck size={16} /> Accéder au Tableau de Bord</>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <Link href="/" className="text-xs text-white/40 hover:text-white transition-colors">
            ← Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}

