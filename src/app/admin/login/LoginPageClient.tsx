"use client";

import { useState, useTransition } from "react";
import { loginAdmin } from "../actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
        setError(err.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 p-8">
        <h1 className="text-2xl font-extrabold text-white text-center mb-2 uppercase tracking-widest">
          Administration
        </h1>
        <p className="text-sm text-[#888] text-center mb-8">
          Accès restreint au personnel autorisé
        </p>

        {error && (
          <div className="bg-[#7a1818]/20 border border-[#7a1818] text-[#ff4d4d] text-sm p-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#888] font-semibold mb-2">
              Adresse Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue="seftachealphao19@gmail.com"
              required
              readOnly
              className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D85A30] transition-colors cursor-not-allowed opacity-50"
            />
            <p className="text-[10px] text-[#555] mt-1">L'email administrateur est fixé pour des raisons de sécurité.</p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#888] font-semibold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#D85A30] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#D85A30] text-white font-bold uppercase tracking-widest py-4 text-sm hover:bg-[#c04b25] transition-colors disabled:opacity-50 flex justify-center items-center"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Connexion Sécurisée"}
          </button>
        </form>
      </div>
    </div>
  );
}
