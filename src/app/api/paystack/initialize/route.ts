import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../../lib/supabase-server';

// Paystack initialize transaction
// Paystack fonctionne avec XOF (FCFA) — le montant est en centimes XOF (x100)
const AMOUNT_XOF = 2500;
const AMOUNT_PAYSTACK = AMOUNT_XOF * 100; // 250000

export async function POST(request: NextRequest) {
  try {
    // 1. Vérifier que l'utilisateur est connecté
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json(
        { error: 'Non autorisé. Vous devez être connecté.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { channel } = body; // 'card' | 'mobile_money'

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // 2. Initialiser la transaction Paystack
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        amount: AMOUNT_PAYSTACK,
        currency: 'XOF',
        metadata: {
          user_id: user.id,          // Récupéré dans le webhook
          custom_fields: [
            {
              display_name: 'Plan',
              variable_name: 'plan',
              value: 'VIP 2 500 FCFA/mois',
            },
          ],
        },
        callback_url: `${appUrl}/checkout/success`,
      }),
    });

    const data = await paystackResponse.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || 'Erreur Paystack.' },
        { status: 400 }
      );
    }

    // 3. Retourner l'URL de paiement Paystack
    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });

  } catch (err) {
    console.error('[Paystack Initialize Error]', err);
    return NextResponse.json(
      { error: 'Erreur serveur interne.' },
      { status: 500 }
    );
  }
}
