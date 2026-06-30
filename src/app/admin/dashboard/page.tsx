import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "../../../lib/supabase-server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { Users, Crown, Banknote, Plane } from "lucide-react";
import OfferRow from "./OfferRow";
import AdminActions from "./AdminActions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // 1. SÉCURITÉ : Vérification de l'administrateur
  const cookieStore = await cookies();
  const fallbackAuth = cookieStore.get("admin_fallback_auth")?.value === "true";

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!fallbackAuth && (!user || user.email !== "seftachealphao19@gmail.com")) {
    redirect("/admin/login");
  }

  // 2. RÉCUPÉRATION DES DONNÉES (KPIs)
  // Total Inscrits
  const { count: usersCount } = await supabaseAdmin
    .from("users")
    .select("*", { count: "exact", head: true });

  // Membres VIP
  const { count: vipCount } = await supabaseAdmin
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("is_vip", true);

  // MRR Estimé (Revenu Mensuel Récurrent)
  const mrr = (vipCount || 0) * 2500;

  // Total d'offres générées
  const { count: offersCount } = await supabaseAdmin
    .from("premium_itineraries")
    .select("*", { count: "exact", head: true });

  // 3. RÉCUPÉRATION DES OFFRES POUR LE TABLEAU
  const { data: offers } = await supabaseAdmin
    .from("premium_itineraries")
    .select("*")
    .order("generated_at", { ascending: false });

  // Design du tableau de bord
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide mb-2 text-white">
          Tableau de Bord
        </h1>
        <p className="text-[#888] mb-10 text-sm">Vue globale de l'activité Unique Voyage</p>

        {/* SECTION 1: STATISTIQUES (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-[#0A0A0A] border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#888] text-sm uppercase tracking-widest font-semibold">Inscrits</span>
              <Users className="w-5 h-5 text-white/50" />
            </div>
            <div className="text-4xl font-extrabold">{usersCount || 0}</div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#D85A30] text-sm uppercase tracking-widest font-semibold">Membres VIP</span>
              <Crown className="w-5 h-5 text-[#D85A30]" />
            </div>
            <div className="text-4xl font-extrabold text-[#D85A30]">{vipCount || 0}</div>
          </div>

          <div className="bg-[#0A0A0A] border border-[#D85A30]/30 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D85A30] blur-[80px] opacity-20" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-white text-sm uppercase tracking-widest font-semibold">MRR</span>
              <Banknote className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-extrabold relative z-10">
              {mrr.toLocaleString()} <span className="text-lg text-[#888] font-normal">FCFA</span>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#888] text-sm uppercase tracking-widest font-semibold">Offres Générées</span>
              <Plane className="w-5 h-5 text-white/50" />
            </div>
            <div className="text-4xl font-extrabold">{offersCount || 0}</div>
          </div>

        </div>

        {/* SECTION 2: ACTIONS RAPIDES */}
        <AdminActions />

        {/* SECTION 3: GESTION DES OFFRES IA */}
        <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Offres IA (Premium Itineraries)</h2>
        
        <div className="bg-[#0A0A0A] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#ccc]">
              <thead className="bg-[#111] text-[#888] text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Généré le</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {offers && offers.length > 0 ? (
                  offers.map((offer) => (
                    <OfferRow key={offer.id} offer={offer} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-[#666]">
                      Aucune offre générée pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
