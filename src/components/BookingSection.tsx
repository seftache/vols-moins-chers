"use client";

import React, { useState } from 'react';
import { Plane, Building2, ChevronRight, ShieldCheck, CreditCard, Check, ExternalLink } from 'lucide-react';
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
  const [showAdminLinks, setShowAdminLinks] = useState(false);

  return (
    <>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flight={flight}
        hotel={hotel}
      />

      <div className="sticky top-8 bg-[#0F0F0F] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D85A30] block mb-1">
            Réservation Directe
          </span>
          <h3 className="font-serif text-2xl">Tarif Négocié</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-white/60 flex items-center gap-2">
              <Plane size={14} className="text-[#D85A30]" /> Billet d'avion (A/R)
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
            <span className="text-[10px] uppercase text-white/40">Tarif Vol Seul Garanti :</span>
            <span className="text-3xl font-serif text-[#D85A30] font-bold">
              {(flight.price_fcfa || 0).toLocaleString()} <span className="text-sm font-sans text-white">FCFA</span>
            </span>
            <p className="text-[10px] text-white/40">Prix tout compris par passager · Disponibilité immédiate</p>
          </div>
        </div>

        {isExpired ? (
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
        )}

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

        <div className="pt-2 text-center">
          <button
            onClick={() => setShowAdminLinks(!showAdminLinks)}
            className="text-[10px] text-white/20 hover:text-white/50 underline transition-colors"
          >
            {showAdminLinks ? 'Masquer accès billetterie directe' : 'Accès billetterie directe'}
          </button>

          {showAdminLinks && (
            <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg text-left text-[11px] space-y-2">
              <p className="font-bold text-[#D85A30]">Liens de réservation directs (Affiliation) :</p>
              <a
                href={flightSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-emerald-400 hover:underline flex items-center gap-1"
              >
                → Émettre le vol chez la compagnie <ExternalLink size={12}/>
              </a>
              {hotel && (
                <a
                  href={hotelBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:underline flex items-center gap-1"
                >
                  → Réserver l'hôtel chez le partenaire <ExternalLink size={12}/>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
