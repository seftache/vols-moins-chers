import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "../../../lib/supabase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Vérification de sécurité (secret partagé pour le cron ou l'appel interne)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { destination, price, url } = body;

    if (!destination || !price || !url) {
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }

    // 1. Récupérer tous les emails (waitlist + VIP)
    // Ici, nous simulons la récupération depuis 'users' (qui contient les vrais VIP)
    // et 'waitlist'.
    const { data: users, error: usersError } = await supabaseAdmin
      .from("users")
      .select("email, is_vip")
      .not("email", "is", null);

    const { data: waitlistUsers, error: waitlistError } = await supabaseAdmin
      .from("waitlist")
      .select("email")
      .not("email", "is", null);

    if (usersError || waitlistError) {
      throw new Error("Erreur base de données");
    }

    // Fusionner et dédoublonner les emails
    const allEmails = new Map<string, boolean>();
    
    waitlistUsers?.forEach(u => {
      if (u.email) allEmails.set(u.email, false); // Par défaut: Gratuit
    });
    
    users?.forEach(u => {
      if (u.email) allEmails.set(u.email, u.is_vip || false); // VIP ou Gratuit
    });

    const vipEmails: string[] = [];
    const freeEmails: string[] = [];

    allEmails.forEach((isVip, email) => {
      if (isVip) vipEmails.push(email);
      else freeEmails.push(email);
    });

    console.log(`Préparation des envois: ${vipEmails.length} VIP, ${freeEmails.length} Gratuits.`);

    // 2. Envoyer email aux VIP (Contenu clair et direct)
    if (vipEmails.length > 0) {
      await resend.emails.send({
        from: "Unique Voyage <alertes@uniquevoyage.site>",
        to: vipEmails, // Note: En production, utiliser bcc ou send multiple pour la vie privée
        subject: `🚨 Deal VIP : ${destination} à ${price} FCFA - Réservez vite !`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 20px; border: 1px solid #333;">
            <h1 style="color: #D85A30; text-transform: uppercase; letter-spacing: 2px;">Alerte VIP Unique Voyage</h1>
            <p>Bonjour VIP,</p>
            <p>L'intelligence artificielle vient de détecter un nouveau deal incroyable, et vous êtes le premier informé !</p>
            <div style="background-color: #111; padding: 20px; margin: 20px 0; text-align: center; border-left: 4px solid #D85A30;">
              <h2 style="margin: 0; font-size: 24px;">${destination}</h2>
              <p style="font-size: 20px; margin: 10px 0; color: #D85A30;">${price} FCFA</p>
            </div>
            <a href="${url}" style="display: block; width: 100%; padding: 15px 0; background-color: #D85A30; color: white; text-align: center; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Voir le programme complet</a>
            <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">Ce deal expire dans 72h.</p>
          </div>
        `,
      });
    }

    // 3. Envoyer email aux Gratuits (Mystère et FOMO)
    if (freeEmails.length > 0) {
      await resend.emails.send({
        from: "Unique Voyage <alertes@uniquevoyage.site>",
        to: freeEmails,
        subject: "Un vol secret vient d'être découvert...",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 20px; border: 1px solid #333;">
            <h1 style="color: #ffffff; text-transform: uppercase; letter-spacing: 2px; text-align: center;">Offre Secrète</h1>
            <p style="text-align: center;">Notre IA vient de trouver un vol incroyablement moins cher au départ d'Abidjan.</p>
            <div style="background-color: #111; padding: 20px; margin: 20px 0; text-align: center; border: 1px dashed #555;">
              <h2 style="margin: 0; font-size: 24px; color: #555;">DESTINATION MASQUÉE</h2>
              <p style="font-size: 20px; margin: 10px 0; color: #555;">PRIX MASQUÉ</p>
            </div>
            <p style="text-align: center; font-style: italic;">Seuls les membres du Club VIP y ont accès en ce moment même.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth" style="display: block; width: 100%; padding: 15px 0; background-color: white; color: black; text-align: center; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Devenir VIP pour voir</a>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, vipCount: vipEmails.length, freeCount: freeEmails.length });

  } catch (error: any) {
    console.error("Erreur notify-users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
