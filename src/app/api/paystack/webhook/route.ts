import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Signature manquante.' }, { status: 400 });
    }

    // 1. Vérifier la signature Paystack (sécurité critique)
    const expectedSignature = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('[Webhook] Signature invalide — requête rejetée.');
      return NextResponse.json({ error: 'Signature invalide.' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    console.log('[Webhook] Événement reçu :', event.event);

    // 2. Traiter uniquement les paiements réussis
    if (event.event === 'charge.success') {
      const { metadata, amount, currency, customer } = event.data;
      const userId = metadata?.user_id;

      if (!userId) {
        console.error('[Webhook] user_id manquant dans les métadonnées.');
        return NextResponse.json({ error: 'user_id manquant.' }, { status: 400 });
      }

      console.log(`[Webhook] Paiement validé — Montant: ${amount / 100} ${currency} — User: ${userId}`);

      // 3. Mettre à jour is_vip = true via le client admin (contourne RLS)
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ is_vip: true })
        .eq('id', userId);

      if (updateError) {
        console.error('[Webhook] Erreur Supabase update:', updateError);
        // On retourne quand même 200 pour que Paystack ne retry pas
        return NextResponse.json({ received: true, error: 'DB update failed' }, { status: 200 });
      }

      console.log(`[Webhook] ✅ is_vip mis à true pour l'utilisateur ${userId}`);

      try {
        await supabaseAdmin.from('payments').upsert({
          user_id: userId,
          reference: event.data.reference,
          amount: amount / 100,
          currency,
          email: customer?.email,
          status: 'success',
          paid_at: event.data.paid_at,
        });
      } catch {
        // Table payments optionnelle — on ignore si elle n'existe pas encore
      }
    }

    // Toujours répondre 200 à Paystack pour arrêter les retries
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (err) {
    console.error('[Webhook] Erreur interne:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
