"use client";

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
        alert(`L'offre pour ${offer.destination_name} a été actualisée pour 72h.`);
      } catch (e: any) {
        alert(`Erreur : ${e.message}`);
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Voulez-vous vraiment supprimer l'offre vers ${offer.destination_name} ?`)) {
      return;
    }
    
    startTransition(async () => {
      try {
        await deleteOffer(offer.id);
      } catch (e: any) {
        alert(`Erreur : ${e.message}`);
      }
    });
  };

  const formatDateForFlight = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 3) return "";
    return `${parts[2]}${parts[1]}`;
  };

  const origin = flight.origin || "ABJ";
  const destination = flight.destination || offer.destination || "";
  const depStr = formatDateForFlight(flight.departure_date);
  const retStr = formatDateForFlight(flight.return_date);
  const marker = "545413";

  const flightSearchUrl = depStr && destination
    ? `https://www.aviasales.com/search/${origin}${depStr}${destination}${retStr}1?marker=${marker}`
    : `https://www.aviasales.com/search?origin=${origin}&destination=${destination}&marker=${marker}`;

  const hotelBookingUrl = hotel.booking_url && !hotel.booking_url.includes('/hotel/') && !hotel.booking_url.includes('tp.media')
    ? hotel.booking_url
    : `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name || offer.destination_name)}&checkin=${flight.departure_date}&checkout=${flight.return_date}`;

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
              href={`/itinerary/${offer.id}?admin=true`} 
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
