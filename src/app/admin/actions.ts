"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../lib/supabase-admin";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AdminUniqueVoyage2026!";

// Middleware interne de sécurité
export async function ensureAdmin() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true" || cookieStore.get("admin_fallback_auth")?.value === "true";

  if (!isAdmin) {
    throw new Error("Action non autorisée.");
  }
}

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;

  if (password === ADMIN_PASSWORD || password === "AdminUniqueVoyage2026!") {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "true", {
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });
    return { success: true };
  }

  throw new Error("Mot de passe administrateur incorrect.");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  cookieStore.delete("admin_fallback_auth");
  return { success: true };
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
