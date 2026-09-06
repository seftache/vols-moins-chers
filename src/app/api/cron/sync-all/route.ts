import { NextRequest, NextResponse } from 'next/server';
import { runFullSyncEngine } from '../../../../lib/sync-engine';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secretParam = request.nextUrl.searchParams.get('secret') || request.nextUrl.searchParams.get('key');

  const cronSecret = process.env.CRON_SECRET;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const isAuthorized =
    !cronSecret ||
    authHeader === `Bearer ${cronSecret}` ||
    secretParam === cronSecret ||
    (adminPassword && secretParam === adminPassword);

  if (!isAuthorized) {
    return NextResponse.json(
      { error: 'Non autorisé. Secret ou clé invalide.' },
      { status: 401 }
    );
  }

  try {
    console.log('[SYNC-ALL] Démarrage du moteur de synchronisation en direct...');
    const results = await runFullSyncEngine();
    console.log('[SYNC-ALL] Synchronisation terminée avec succès :', results);

    return NextResponse.json({
      success: true,
      message: 'Moteur de synchronisation exécuté avec succès. Offres et itinéraires à jour.',
      timestamp: new Date().toISOString(),
      ...results
    });
  } catch (error: any) {
    console.error('[SYNC-ALL] Erreur critique :', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la synchronisation'
      },
      { status: 500 }
    );
  }
}

