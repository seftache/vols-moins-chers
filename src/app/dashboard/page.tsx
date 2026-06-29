import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../lib/supabase-server";
import { supabaseAdmin } from "../../lib/supabase-admin";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Vérifier si l'utilisateur est connecté
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // 2. Récupérer les données depuis la table 'users' via admin (évite les blocages RLS)
  const { data: profile, error } = await supabaseAdmin
    .from("users")
    .select("id, whatsapp_number, is_vip, referrals_count")
    .eq("id", user.id)
    .single();

  // 3. Récupérer les dernières offres
  const { data: itineraries } = await supabaseAdmin
    .from("premium_itineraries")
    .select("id, destination_name, generated_at, flight_details")
    .order("generated_at", { ascending: false })
    .limit(6);

  // Si le profil n'existe pas encore, on crée une ligne par défaut via admin
  if (error || !profile) {
    const { data: newProfile } = await supabaseAdmin
      .from("users")
      .insert({
        id: user.id,
        whatsapp_number: user.phone || user.email || "Inconnu",
        is_vip: false,
        referrals_count: 0,
      })
      .select()
      .single();

    if (!newProfile) {
      redirect("/");
    }

    return <DashboardClient user={newProfile} itineraries={itineraries || []} />;
  }

  return <DashboardClient user={profile} itineraries={itineraries || []} />;
}
