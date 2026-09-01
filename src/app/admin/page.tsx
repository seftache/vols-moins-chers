import { supabaseAdmin } from "../../lib/supabase-admin";
import { Plane, Building2, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import OfferRow from "./dashboard/OfferRow";
import AdminActions from "./dashboard/AdminActions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 1. Statistiques Offres
  const { count: offersCount } = await supabaseAdmin
    .from("premium_itineraries")
    .select("*", { count: "exact", head: true });

  // 2. Liste des offres avec détails complets
  const { data: offers } = await supabaseAdmin
    .from("premium_itineraries")
    .select("*")
    .order("generated_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#070707] text-white pt-10 pb-20 px-4 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* EN-TÊTE DU TABLEAU DE BORD ADMIN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#D85A30] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={12} /> Espace Billetterie & Réservations Directes
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Émission Directe des Billets
            </h1>
            <p className="text-xs text-white/60 mt-1">
              Dès qu'un client choisit une offre, cliquez sur « Réserver Vol » pour acheter son billet au tarif le plus bas et toucher votre commission affiliée.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/offres"
              target="_blank"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border border-white/10"
            >
              <ExternalLink size={14} /> Voir le site client
            </Link>
          </div>
        </div>

        {/* SECTION 1: STATISTIQUES RAPIDES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Offres Disponibles</span>
              <span className="text-3xl font-extrabold text-white">{offersCount || 0} destinations</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
              <Plane size={24} />
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Mode de Réservation</span>
              <span className="text-xl font-extrabold text-emerald-400">Direct 1-Clic</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Sparkles size={24} />
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Marqueur Affiliation</span>
              <span className="text-xl font-bold text-white">Travelpayouts #545413</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        {/* SECTION 2: ACTIONS SCANNER IA */}
        <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white mb-1">Générateur d'Offres & Scanner IA</h2>
            <p className="text-xs text-white/50">
              Scannez les tarifs aériens pour détecter de nouvelles baisses de prix et ajouter des destinations.
            </p>
          </div>
          <AdminActions />
        </div>

        {/* SECTION 3: LISTE DES OFFRES AVEC RÉSERVATION DIRECTE */}
        <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Toutes les Offres — Liens de Réservation Directs</h2>
              <p className="text-xs text-white/40 mt-0.5">Cliquez sur « Réserver Vol » pour émettre le billet chez la compagnie ou l'agence partenaire</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-white/40 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Trajet & Destination</th>
                  <th className="px-6 py-4">Compagnie & Tarif Vol</th>
                  <th className="px-6 py-4">Hôtel Recommandé</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions Directes</th>
                </tr>
              </thead>
              <tbody>
                {(!offers || offers.length === 0) ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-white/40 italic">
                      Aucun itinéraire enregistré pour le moment.
                    </td>
                  </tr>
                ) : (
                  offers.map((offer) => <OfferRow key={offer.id} offer={offer} />)
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
