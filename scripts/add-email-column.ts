const fs = require('fs');
const path = require('path');

const adminDir = path.join(process.cwd(), 'src', 'app', 'admin');
const dashboardDir = path.join(adminDir, 'dashboard');

// 1. src/app/admin/page.tsx
const adminPageCode = `import { redirect } from "next/navigation";

export default function AdminRootPage() {
  redirect("/admin/dashboard");
}
`;
fs.writeFileSync(path.join(adminDir, 'page.tsx'), adminPageCode);
console.log('src/app/admin/page.tsx created');

// 2. src/app/admin/dashboard/OfferRow.tsx
const offerRowCode = `"use client";

import { useTransition } from "react";
import { forcePublishOffer, deleteOffer } from "../actions";
import { Loader2, RefreshCw, Trash2, ExternalLink, Plane, Building2, MessageCircle } from "lucide-react";
import Link from "next/link";

interface OfferRowProps {
  offer: any;
}

export default function OfferRow({ offer }: OfferRowProps) {
  const [isPending, startTransition] = useTransition();

  const flight = offer.flight_details || {};
  const hotel = offer.hotel_details || {};

  const handleForcePublish = () => {
    startTransition(async () => {
      try {
        await forcePublishOffer(offer.id);
        alert(\`L'offre pour \${offer.destination_name} a été actualisée pour 72h.\`);
      } catch (e: any) {
        alert(\`Erreur : \${e.message}\`);
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(\`Voulez-vous vraiment supprimer l'offre vers \${offer.destination_name} ?\`)) {
      return;
    }
    
    startTransition(async () => {
      try {
        await deleteOffer(offer.id);
      } catch (e: any) {
        alert(\`Erreur : \${e.message}\`);
      }
    });
  };

  const formatDateForFlight = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 3) return "";
    return \`\${parts[2]}\${parts[1]}\`;
  };

  const origin = flight.origin || "ABJ";
  const destination = flight.destination || offer.destination || "";
  const depStr = formatDateForFlight(flight.departure_date);
  const retStr = formatDateForFlight(flight.return_date);
  const marker = "545413";

  const flightSearchUrl = depStr && destination
    ? \`https://www.aviasales.com/search/\${origin}\${depStr}\${destination}\${retStr}1?marker=\${marker}\`
    : \`https://www.aviasales.com/search?origin=\${origin}&destination=\${destination}&marker=\${marker}\`;

  const hotelBookingUrl = hotel.booking_url && !hotel.booking_url.includes('/hotel/') && !hotel.booking_url.includes('tp.media')
    ? hotel.booking_url
    : \`https://www.booking.com/searchresults.html?ss=\${encodeURIComponent(hotel.name || offer.destination_name)}&checkin=\${flight.departure_date}&checkout=\${flight.return_date}\`;

  const generatedAt = new Date(offer.generated_at).getTime();
  const now = new Date().getTime();
  const hoursSinceGeneration = (now - generatedAt) / (1000 * 60 * 60);
  const isExpired = hoursSinceGeneration >= 72;

  return (
    <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5 group">
      {/* Destination & Trajet */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-bold text-white text-base flex items-center gap-2">
            {offer.destination_name}
            <Link href={\`/itinerary/\${offer.id}\`} target="_blank" className="text-white/40 hover:text-[#D85A30]" title="Voir fiche client">
              <ExternalLink size={13} />
            </Link>
          </span>
          <span className="text-xs text-white/50 flex items-center gap-1.5 mt-0.5">
            <Plane size={11} className="text-[#D85A30]" />
            {flight.origin_name || flight.origin || 'Abidjan'} ({origin}) ➔ {destination}
          </span>
        </div>
      </td>

      {/* Détails Vol & Compagnie */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-white">{flight.airline || 'Compagnie régulière'}</span>
          <span className="text-sm font-bold text-[#D85A30]">
            {(flight.price_fcfa || 0).toLocaleString()} FCFA
          </span>
          <span className="text-[10px] text-white/40">{flight.departure_date} au {flight.return_date}</span>
        </div>
      </td>

      {/* Hôtel Recommandé */}
      <td className="px-6 py-4">
        {hotel.name ? (
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white/80">{hotel.name} ({hotel.stars || 3}★)</span>
            <span className="text-xs text-white/50">{(hotel.total_price_fcfa || 0).toLocaleString()} FCFA ({hotel.total_nights || 7}n)</span>
          </div>
        ) : (
          <span className="text-xs text-white/30 italic">Vol seul</span>
        )}
      </td>

      {/* Statut */}
      <td className="px-6 py-4">
        {isExpired ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7a1818]/20 text-[#ff4d4d] border border-[#7a1818]/40">
            Expiré (+72h)
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Actif
          </span>
        )}
      </td>

      {/* Actions Billetterie Directe */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Bouton Émettre le vol */}
          <a
            href={flightSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 bg-[#D85A30] hover:bg-[#b84a25] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
            title="Émettre le billet pour le client avec commission affiliée"
          >
            <Plane size={12} /> Émettre Vol
          </a>

          {/* Bouton Réserver l'hôtel */}
          {hotel.name && (
            <a
              href={hotelBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-white/10"
              title="Réserver l'hôtel sur Booking.com"
            >
              <Building2 size={12} /> Hôtel
            </a>
          )}

          {/* Actualiser / Supprimer */}
          <button
            onClick={handleForcePublish}
            disabled={isPending}
            className="p-1.5 text-white/50 hover:text-white transition-colors"
            title="Actualiser pour 72h"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-1.5 text-red-400/60 hover:text-red-400 transition-colors"
            title="Supprimer l'offre"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
`;
fs.writeFileSync(path.join(dashboardDir, 'OfferRow.tsx'), offerRowCode);
console.log('src/app/admin/dashboard/OfferRow.tsx updated');

// 3. src/app/admin/dashboard/page.tsx
const dashboardPageCode = `import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { Plane, Building2, PhoneCall, ExternalLink, ShieldCheck, LogOut } from "lucide-react";
import OfferRow from "./OfferRow";
import AdminActions from "./AdminActions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true" || cookieStore.get("admin_fallback_auth")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  // 1. Statistiques Offres
  const { count: offersCount } = await supabaseAdmin
    .from("premium_itineraries")
    .select("*", { count: "exact", head: true });

  // 2. Liste des offres avec détails complets
  const { data: offers } = await supabaseAdmin
    .from("premium_itineraries")
    .select("*")
    .order("generated_at", { ascending: false });

  const adminPhone = "+225 05 45 74 57 49";

  return (
    <div className="min-h-screen bg-[#070707] text-white pt-12 pb-20 px-4 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* EN-TÊTE DU TABLEAU DE BORD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#D85A30] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                Espace Direction & Billetterie
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Tableau de Bord des Réservations
            </h1>
            <p className="text-xs text-white/50 mt-1">
              Émettez les billets pour les clients avec vos commissions affiliées intégrées (Travelpayouts #545413)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/offres"
              target="_blank"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border border-white/10"
            >
              <ExternalLink size={14} /> Voir le site public
            </Link>
            <form action="/api/auth/logout" method="GET">
              <Link
                href="/admin/login"
                className="bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <LogOut size={14} /> Déconnexion
              </Link>
            </form>
          </div>
        </div>

        {/* SECTION 1: STATISTIQUES RAPIDES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Offres Mondiales</span>
              <span className="text-3xl font-extrabold text-white">{offersCount || 0} destinations</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
              <Plane size={24} />
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Ligne de Réservation</span>
              <span className="text-xl font-extrabold text-emerald-400">{adminPhone}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <PhoneCall size={24} />
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Affiliation Partenaire</span>
              <span className="text-xl font-bold text-white">Travelpayouts #545413</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        {/* SECTION 2: ACTIONS GÉNÉRATEUR IA */}
        <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white mb-1">Générateur d'Offres & Scanner IA</h2>
            <p className="text-xs text-white/50">
              Lancez un scan pour détecter les dernières erreurs de prix et créer de nouveaux itinéraires.
            </p>
          </div>
          <AdminActions />
        </div>

        {/* SECTION 3: LISTE DES OFFRES & ÉMISSION BILLETTERIE */}
        <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Catalogue & Liens d'Émission Directe</h2>
              <p className="text-xs text-white/40 mt-0.5">Cliquez sur « Émettre Vol » pour réserver directement au tarif le plus bas pour vos clients</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-white/40 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Trajet & Destination</th>
                  <th className="px-6 py-4">Compagnie & Tarif Vol</th>
                  <th className="px-6 py-4">Hôtel Recommandé</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions Billetterie</th>
                </tr>
              </thead>
              <tbody>
                {(!offers || offers.length === 0) ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-white/40 italic">
                      Aucun itinéraire enregistré pour le moment.
                    </td>
                  </tr>
                ) : (
                  offers.map((offer) => <OfferRow key={offer.id} offer={offer} />)
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(dashboardDir, 'page.tsx'), dashboardPageCode);
console.log('src/app/admin/dashboard/page.tsx updated');





