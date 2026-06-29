"use server";

import { supabaseAdmin } from "../../lib/supabase-admin";

export async function incrementReferral(referrerId: string) {
  if (!referrerId || typeof referrerId !== "string") return;

  // 1. Récupérer le compteur actuel
  const { data: user, error: fetchError } = await supabaseAdmin
    .from("users")
    .select("referrals_count, is_vip")
    .eq("id", referrerId)
    .single();

  if (fetchError || !user) {
    console.error("Erreur lors de la récupération du parrain:", fetchError);
    return;
  }

  // 2. Incrémenter
  const newCount = (user.referrals_count || 0) + 1;
  let isVip = user.is_vip;

  // Logique métier : par exemple, si on atteint 3 amis, on devient VIP ? 
  // Ce n'était pas précisé s'ils deviennent VIP ou si c'est juste "alerte gratuite", 
  // mais la progression est 1/3, donc laissons juste le compteur s'incrémenter pour l'instant.

  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({ referrals_count: newCount })
    .eq("id", referrerId);

  if (updateError) {
    console.error("Erreur lors de la mise à jour du parrain:", updateError);
  }
}
