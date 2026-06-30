"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Star, Clock, Zap, ArrowRight } from "lucide-react";
import CustomRequestForm from "./CustomRequestForm";

type User = {
  id: string;
  whatsapp_number: string;
  is_vip: boolean;
  referrals_count: number;
};

type Itinerary = {
  id: string;
  destination_name: string;
  generated_at: string;
  flight_details: any;
};

export default function DashboardClient({ user, itineraries = [] }: { user: User, itineraries?: Itinerary[] }) {
  const [copied, setCopied] = useState(false);

  const referralLink = `https://uniquevoyage.site?ref=${user.id}`;
  const whatsappMessage = encodeURIComponent(`🔥 Rejoins UniqueVoyage pour découvrir des vols secrets depuis Abidjan (jusqu'à -50%) ! Clique ici : ${referralLink}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white font-sans antialiased">
      {/* --- Header ---*/}
      <header className="border-b border-white/[0.07] px-6 py-5 md:px-12 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <svg viewBox="55 65 280 130" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
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
        <a
          href="/api/auth/logout"
          className="text-[11px] uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors"
        >
          Déconnexion
        </a>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-24 space-y-10">

        {/* --- Badge & Titre --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-4"
        >
          {user.is_vip ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-yellow-400">
              <Star size={12} fill="currentColor" />
              Club VIP
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">
              Membre Gratuit
            </span>
          )}

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            {user.is_vip
              ? "Bienvenue dans le Club."
              : "Votre espace membre."}
          </h1>
          <p className="text-sm text-white/45 font-light">
            WhatsApp : {user.whatsapp_number}
          </p>
        </motion.div>

        <div className="h-px w-full bg-white/[0.07]" />

        {/* ====================== DERNIÈRES OFFRES IA ====================== */}
        <div className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">Dernières Offres Détectées</h2>
          {itineraries.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center text-sm font-light text-white/40">
              L'IA scanne actuellement le web. Les prochaines offres apparaîtront ici.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {itineraries.map((it) => (
                <a
                  key={it.id}
                  href={user.is_vip ? `/itinerary/${it.id}` : "/checkout"}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-[#D85A30]/50 transition-colors"
                >
                  {!user.is_vip && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-2">
                        <Star size={20} className="text-yellow-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white">Réservé VIP</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[#D85A30] font-bold uppercase tracking-widest mb-1">
                      {new Date(it.generated_at).toLocaleDateString()}
                    </p>
                    <h3 className="text-xl font-serif">{it.destination_name}</h3>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-white/50">{it.flight_details?.price_fcfa || "---"} FCFA</p>
                    <ArrowRight size={16} className="text-white/30 group-hover:text-white transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="h-px w-full bg-white/[0.07]" />

        {/* ====================== RECHERCHE SUR MESURE VIP ====================== */}
        <CustomRequestForm isVip={user.is_vip} />

        <div className="h-px w-full bg-white/[0.07]" />

        {/* ====================== MEMBRE GRATUIT ====================== */}
        {!user.is_vip && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Alerte de retard */}
            <div className="flex items-start gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50">
                <Clock size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/80 mb-2">Alertes avec délai de 12h à 24h</p>
                <p className="text-sm font-light leading-relaxed text-white/45">
                  En tant que membre gratuit, vous recevez nos alertes de bons plans avec un délai. Les membres VIP reçoivent les mêmes offres en temps réel — souvent épuisées avant que vous les voyez.
                </p>
              </div>
            </div>

            {/* Parrainage */}
            <div className="rounded-2xl border border-[#D85A30]/30 bg-[#D85A30]/5 p-6 md:p-8 space-y-5">
              <div className="flex items-start gap-5">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#D85A30]/20 text-[#D85A30]">
                  <Zap size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Débloquez les alertes en temps réel — gratuitement.
                  </p>
                  <p className="text-sm font-light text-white/50 leading-relaxed">
                    Invitez <span className="text-white font-semibold">3 amis</span> avec votre lien de parrainage et recevez automatiquement la prochaine alerte en avant-première.
                  </p>
                  <p className="mt-3 text-xs font-light text-white/35">
                    {user.referrals_count} / 3 amis parrainés
                  </p>
                  <div className="mt-2 h-1.5 w-full max-w-xs rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#D85A30] transition-all duration-700"
                      style={{ width: `${Math.min((user.referrals_count / 3) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions de parrainage */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  className="group flex-1 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-left transition-all hover:border-[#D85A30]/40 hover:bg-[#D85A30]/5"
                >
                  <span className="truncate text-xs font-mono text-white/50 group-hover:text-white/70 transition-colors">
                    {referralLink.substring(0, 35)}...
                  </span>
                  <span className="ml-4 flex-shrink-0 flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold text-[#D85A30]">
                    {copied ? (
                      <>
                        <Check size={13} strokeWidth={2.5} />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy size={13} strokeWidth={1.5} />
                        Copier
                      </>
                    )}
                  </span>
                </button>

                <a
                  href={`whatsapp://send?text=${whatsappMessage}`}
                  className="group flex flex-none items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Partager
                </a>
              </div>
            </div>

            {/* CTA VIP */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <div className="h-px w-full bg-white/[0.07]" />
              <p className="pt-4 text-xs uppercase tracking-[0.25em] text-white/30">ou passez directement</p>
              <motion.a
                href="/checkout"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className="group flex w-full max-w-sm items-center justify-center gap-3 bg-[#D85A30] px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c24e27]"
              >
                Passer VIP — 2 500 FCFA / mois
                <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
              <p className="text-[11px] font-light text-white/25">
                Annulable à tout moment • Paiement via Wave ou Mobile Money
              </p>
            </div>
          </motion.div>
        )}

        {/* ====================== MEMBRE VIP ====================== */}
        {user.is_vip && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Confirmation temps réel */}
            <div className="relative flex items-start gap-5 overflow-hidden rounded-2xl border border-yellow-500/25 bg-yellow-500/5 p-6 md:p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400">
                <Zap size={18} strokeWidth={1.5} fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-400 mb-2">Alertes en temps réel activées</p>
                <p className="text-sm font-light leading-relaxed text-white/55">
                  Vous faites partie du <span className="text-yellow-400 font-semibold">Club VIP</span>. Dès que notre algorithme détecte un bon plan, vous recevez l'alerte sur WhatsApp avant tout le monde — sans délai.
                </p>
              </div>
            </div>

            {/* Infos complémentaires */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Accès</p>
                <p className="text-sm font-semibold text-white">Alertes Prioritaires</p>
                <p className="text-xs text-white/40 mt-1">Temps réel, illimité</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">WhatsApp</p>
                <p className="text-sm font-semibold text-white truncate">{user.whatsapp_number}</p>
                <p className="text-xs text-white/40 mt-1">Numéro de réception</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
