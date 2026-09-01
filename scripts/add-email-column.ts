const fs = require('fs');
const path = require('path');

const adminDir = path.join(process.cwd(), 'src', 'app', 'admin');
const dashboardDir = path.join(adminDir, 'dashboard');
const componentsDir = path.join(process.cwd(), 'src', 'components');

// 1. src/app/admin/actions.ts
const actionsCode = `"use server";

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
`;
fs.writeFileSync(path.join(adminDir, 'actions.ts'), actionsCode);
console.log('src/app/admin/actions.ts updated (no password required)');

// 2. src/app/admin/dashboard/OfferRow.tsx
const offerRowCode = `"use client";

import { useTransition } from "react";
import { forcePublishOffer, deleteOffer } from "../actions";
import { Loader2, RefreshCw, Trash2, ExternalLink, Plane, Building2 } from "lucide-react";
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
            <Link 
              href={\`/itinerary/\${offer.id}?admin=true\`} 
              target="_blank" 
              className="text-white/40 hover:text-[#D85A30]" 
              title="Voir fiche complète avec réservation directe"
            >
              <ExternalLink size={14} />
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
            Disponible
          </span>
        )}
      </td>

      {/* Actions Billetterie Directe */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Bouton Réserver le vol */}
          <a
            href={flightSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#D85A30] hover:bg-[#b84a25] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md hover:scale-[1.02]"
            title="Réserver directement le vol pour le client (Commissions Travelpayouts #545413)"
          >
            <Plane size={13} /> Réserver Vol
          </a>

          {/* Bouton Réserver l'hôtel */}
          {hotel.name && (
            <a
              href={hotelBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border border-white/10"
              title="Réserver l'hôtel pour le client sur Booking.com"
            >
              <Building2 size={13} /> Hôtel
            </a>
          )}

          {/* Actualiser / Supprimer */}
          <button
            onClick={handleForcePublish}
            disabled={isPending}
            className="p-2 text-white/40 hover:text-white transition-colors"
            title="Actualiser pour 72h"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-red-400/50 hover:text-red-400 transition-colors"
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

// 3. src/app/admin/page.tsx et src/app/admin/dashboard/page.tsx (Même page directe sans mot de passe)
const adminDashboardPageCode = `import { supabaseAdmin } from "../../lib/supabase-admin";
import { Plane, Building2, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import OfferRow from "./dashboard/OfferRow";
import AdminActions from "./dashboard/AdminActions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 1. Statistiques Offres
  const { count: offersCount } = await supabaseAdmin
    .from("premium_itineraries")
    .select("*", { count: "exact", head: true });

  // 2. Liste des offres avec détails complets
  const { data: offers } = await supabaseAdmin
    .from("premium_itineraries")
    .select("*")
    .order("generated_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#070707] text-white pt-10 pb-20 px-4 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* EN-TÊTE DU TABLEAU DE BORD ADMIN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#D85A30] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={12} /> Espace Billetterie & Réservations Directes
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Émission Directe des Billets
            </h1>
            <p className="text-xs text-white/60 mt-1">
              Dès qu'un client choisit une offre, cliquez sur « Réserver Vol » pour acheter son billet au tarif le plus bas et toucher votre commission affiliée.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/offres"
              target="_blank"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border border-white/10"
            >
              <ExternalLink size={14} /> Voir le site client
            </Link>
          </div>
        </div>

        {/* SECTION 1: STATISTIQUES RAPIDES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Offres Disponibles</span>
              <span className="text-3xl font-extrabold text-white">{offersCount || 0} destinations</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
              <Plane size={24} />
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Mode de Réservation</span>
              <span className="text-xl font-extrabold text-emerald-400">Direct 1-Clic</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Sparkles size={24} />
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1">Marqueur Affiliation</span>
              <span className="text-xl font-bold text-white">Travelpayouts #545413</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        {/* SECTION 2: ACTIONS SCANNER IA */}
        <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white mb-1">Générateur d'Offres & Scanner IA</h2>
            <p className="text-xs text-white/50">
              Scannez les tarifs aériens pour détecter de nouvelles baisses de prix et ajouter des destinations.
            </p>
          </div>
          <AdminActions />
        </div>

        {/* SECTION 3: LISTE DES OFFRES AVEC RÉSERVATION DIRECTE */}
        <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Toutes les Offres — Liens de Réservation Directs</h2>
              <p className="text-xs text-white/40 mt-0.5">Cliquez sur « Réserver Vol » pour émettre le billet chez la compagnie ou l'agence partenaire</p>
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
                  <th className="px-6 py-4 text-right">Actions Directes</th>
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
fs.writeFileSync(path.join(adminDir, 'page.tsx'), adminDashboardPageCode);
fs.writeFileSync(path.join(dashboardDir, 'page.tsx'), adminDashboardPageCode.replace('../../lib/supabase-admin', '../../../lib/supabase-admin').replace('./dashboard/OfferRow', './OfferRow').replace('./dashboard/AdminActions', './AdminActions'));
console.log('src/app/admin/page.tsx & dashboard/page.tsx updated');

// 4. src/components/BookingSection.tsx (Gérer mode direct admin et mode client)
const bookingSectionCode = `"use client";

import React, { useState, useEffect } from 'react';
import { Plane, Building2, ChevronRight, ShieldCheck, CreditCard, Check, ExternalLink, Sparkles } from 'lucide-react';
import BookingModal from './BookingModal';

interface BookingSectionProps {
  flight: {
    origin: string;
    origin_name?: string;
    destination: string;
    destination_name?: string;
    airline: string;
    departure_date: string;
    return_date?: string;
    price_fcfa: number;
  };
  hotel?: {
    name: string;
    stars: number;
    price_per_night_fcfa: number;
    total_nights: number;
    total_price_fcfa: number;
    neighborhood?: string;
  };
  flightSearchUrl: string;
  hotelBookingUrl: string;
  isExpired: boolean;
}

export default function BookingSection({
  flight,
  hotel,
  flightSearchUrl,
  hotelBookingUrl,
  isExpired
}: BookingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        setIsAdminMode(true);
      }
    }
  }, []);

  return (
    <>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flight={flight}
        hotel={hotel}
      />

      <div className="sticky top-8 bg-[#0F0F0F] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
        
        {/* En-tête de la carte */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D85A30]">
              {isAdminMode ? 'Mode Billetterie Directe' : 'Tarif Négocié'}
            </span>
            {isAdminMode && (
              <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-700/50 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Admin
              </span>
            )}
          </div>
          <h3 className="font-serif text-2xl mt-1">
            {isAdminMode ? 'Émission du Billet' : 'Réservation Immédiate'}
          </h3>
        </div>

        {/* Détails du montant */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-white/60 flex items-center gap-2">
              <Plane size={14} className="text-[#D85A30]" /> Vol A/R ({flight.airline})
            </span>
            <span className="font-bold text-white">{(flight.price_fcfa || 0).toLocaleString()} FCFA</span>
          </div>

          {hotel && (
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/60 flex items-center gap-2">
                <Building2 size={14} className="text-white/40" /> Option Hôtel ({hotel.total_nights}n)
              </span>
              <span className="text-white/70">{(hotel.total_price_fcfa || 0).toLocaleString()} FCFA</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-1">
            <span className="text-[10px] uppercase text-white/40">Tarif Vol Garanti :</span>
            <span className="text-3xl font-serif text-[#D85A30] font-bold">
              {(flight.price_fcfa || 0).toLocaleString()} <span className="text-sm font-sans text-white">FCFA</span>
            </span>
            <p className="text-[10px] text-white/40">Prix tout compris par passager · Disponibilité immédiate</p>
          </div>
        </div>

        {/* Boutons d'action : En mode Admin = Liens de réservation directs, En mode client = Formulaire privé */}
        {isAdminMode ? (
          <div className="space-y-3 pt-2">
            <a
              href={flightSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold py-4 px-6 rounded-xl uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01]"
            >
              <Plane size={16} /> Émettre le vol chez la compagnie
              <ExternalLink size={14} />
            </a>

            {hotel && (
              <a
                href={hotelBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-xl uppercase tracking-[0.15em] text-xs transition-all flex items-center justify-center gap-2 border border-white/15"
              >
                <Building2 size={16} /> Réserver l'hôtel sur Booking
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        ) : (
          isExpired ? (
            <button disabled className="w-full bg-[#7a1818]/20 text-[#7a1818] border border-[#7a1818]/30 py-4 text-xs font-bold uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2 rounded-xl">
              OFFRE EXPIRÉE
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold py-4 px-6 rounded-xl uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[#D85A30]/30 hover:scale-[1.01]"
            >
              Réserver mon voyage
              <ChevronRight size={16} />
            </button>
          )
        )}

        {/* Réassurance */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2 text-[11px] text-white/60">
          <p className="flex items-center gap-2 text-white">
            <ShieldCheck size={14} className="text-emerald-400" /> Billet officiel émis sous 1 heure
          </p>
          <p className="flex items-center gap-2 text-white">
            <CreditCard size={14} className="text-emerald-400" /> Règlement Wave, Mobile Money, Virement
          </p>
          <p className="flex items-center gap-2 text-white">
            <Check size={14} className="text-emerald-400" /> Assistance billetterie personnalisée
          </p>
        </div>

        {/* Bouton discret pour basculer en mode billetterie directe (Admin) */}
        <div className="pt-2 text-center">
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="text-[10px] text-white/20 hover:text-white/60 underline transition-colors"
          >
            {isAdminMode ? 'Passer en vue client' : 'Accès billetterie directe'}
          </button>
        </div>
      </div>
    </>
  );
}
`;
fs.writeFileSync(path.join(componentsDir, 'BookingSection.tsx'), bookingSectionCode);
console.log('src/components/BookingSection.tsx updated');






