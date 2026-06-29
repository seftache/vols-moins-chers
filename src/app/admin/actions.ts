"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { createSupabaseServerClient } from "../../lib/supabase-server";

// Middleware interne de sécurité
async function ensureAdmin() {
  const cookieStore = await cookies();
  const fallbackAuth = cookieStore.get("admin_fallback_auth")?.value === "true";

  if (fallbackAuth) return; // Autorisé via la solution de secours

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== "seftachealphao19@gmail.com") {
    throw new Error("Action non autorisée.");
  }
}

export async function forcePublishOffer(id: string) {
  await ensureAdmin();

  const { error } = await supabaseAdmin
    .from("premium_itineraries")
    .update({ generated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  // Rafraîchir les pages pour afficher les changements
  revalidatePath("/");
  revalidatePath("/offres");
  revalidatePath("/admin/dashboard");
}

export async function deleteOffer(id: string) {
  await ensureAdmin();

  const { error } = await supabaseAdmin
    .from("premium_itineraries")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/offres");
  revalidatePath("/admin/dashboard");
}

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email !== "seftachealphao19@gmail.com") {
    throw new Error("Accès refusé.");
  }

  // SOLUTION DE SECOURS (Bypass des erreurs réseaux Windows/Next.js "fetch failed")
  if (password === "AdminUniqueVoyage2026!") {
    const cookieStore = await cookies();
    cookieStore.set("admin_fallback_auth", "true", { maxAge: 60 * 60 * 24, path: "/" });
    return;
  }

  console.log("LOGIN ATTEMPT", email);
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  console.log("LOGIN RESULT", error?.message || "Success");

  if (error) {
    throw new Error(error.message);
  }

  // Si ça marche avec supabaseAdmin, on doit définir le cookie manuellement pour la session
  if (data.session) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  }
}
