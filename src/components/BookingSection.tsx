"use client";

import React, { useState, useEffect } from 'react';
import { Plane, Building2, ChevronRight, ShieldCheck, CreditCard, Check, ExternalLink, Sparkles } from 'lucide-react';
import BookingModal from './BookingModal';
import { formatPriceDisplay } from '../lib/currency';

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

  const flightPrice = formatPriceDisplay(flight.price_fcfa || 0, flight.origin);
  const hotelPrice = hotel ? formatPriceDisplay(hotel.total_price_fcfa || 0, flight.origin) : null;

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
            <span className="font-bold text-white">{flightPrice.primary}</span>
          </div>

          {hotel && hotelPrice && (
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/60 flex items-center gap-2">
                <Building2 size={14} className="text-white/40" /> Option Hôtel ({hotel.total_nights}n)
              </span>
              <span className="text-white/70">{hotelPrice.primary}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-1">
            <span className="text-[10px] uppercase text-white/40">Tarif Vol Garanti :</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif text-[#D85A30] font-bold">
                {flightPrice.primary}
              </span>
              {flightPrice.secondary && (
                <span className="text-xs font-sans text-white/50">
                  ({flightPrice.secondary})
                </span>
              )}
            </div>
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
            <CreditCard size={14} className="text-emerald-400" /> Règlement Wave, Mobile Money, Carte, Virement
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

