"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../../lib/supabase-admin";

export async function forcePublishOffer(id: string) {
  const { error } = await supabaseAdmin
    .from("premium_itineraries")
    .update({ generated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/offres");
  revalidatePath("/admin");
  revalidatePath("/admin/dashboard");
}

export async function deleteOffer(id: string) {
  const { error } = await supabaseAdmin
    .from("premium_itineraries")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/offres");
  revalidatePath("/admin");
  revalidatePath("/admin/dashboard");
}
