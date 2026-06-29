import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../lib/supabase-server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  // 1. Vérifier si l'utilisateur est connecté
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Récupérer les données depuis la table 'users'
  const { data: profile, error } = await supabase
    .from("users")
    .select("id, whatsapp_number, is_vip, referrals_count")
    .eq("id", user.id)
    .single();

  // Si le profil n'existe pas encore, on crée une ligne par défaut
  if (error || !profile) {
    const { data: newProfile } = await supabase
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

    return <DashboardClient user={newProfile} />;
  }

  return <DashboardClient user={profile} />;
}
