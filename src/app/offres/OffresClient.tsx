"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plane, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

interface ItineraryItem {
  id: string;
  destination_name: string;
  generated_at: string;
  flight_details?: {
    origin?: string;
    origin_name?: string;
    destination?: string;
    destination_name?: string;
    airline?: string;
    departure_date?: string;
    return_date?: string;
    price_fcfa?: number;
    destination_image?: string;
  };
}

export default function OffresClient({ itineraries }: { itineraries: ItineraryItem[] }) {
  const [selectedOrigin, setSelectedOrigin] = useState<string>('ALL');

  const origins = [
    { code: 'ALL', label: '🌍 Tous les départs' },
    { code: 'ABJ', label: '🇨🇮 Abidjan' },
    { code: 'CDG', label: '🇫🇷 Paris' },
    { code: 'CAN', label: '🇨🇳 Canton (Chine)' },
    { code: 'YUL', label: '🇨🇦 Montréal' },
    { code: 'DSS', label: '🇸🇳 Dakar' },
  ];

  const filteredItineraries = itineraries.filter((item) => {
    if (selectedOrigin === 'ALL') return true;
    const origin = item.flight_details?.origin || 'ABJ';
    return origin.toUpperCase() === selectedOrigin.toUpperCase();
  });

  const getImageForDestination = (destName: string, flightImg?: string) => {
    if (flightImg && flightImg !== '/images/destinations/default.jpg') return flightImg;
    const dest = (destName || '').toLowerCase();
    if (dest.includes('dubaï') || dest.includes('dubai')) return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop';
    if (dest.includes('paris')) return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop';
    if (dest.includes('dakar')) return 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop';
    if (dest.includes('montréal') || dest.includes('montreal')) return 'https://images.unsplash.com/photo-1519178173456-e910609349eb?q=80&w=1200&auto=format&fit=crop';
    if (dest.includes('canton') || dest.includes('guangzhou') || dest.includes('chine')) return 'https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=1200&auto=format&fit=crop';
    if (dest.includes('tokyo')) return 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop';
    if (dest.includes('new york')) return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop';
    if (dest.includes('jeddah') || dest.includes('mecque')) return 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1200&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop';
  };

  return (
    <>
      {/* FILTRES PAR VILLE DE DÉPART */}
      <section className="px-6 pb-10 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {origins.map((org) => (
            <button
              key={org.code}
              onClick={() => setSelectedOrigin(org.code)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedOrigin === org.code
                  ? 'bg-[#D85A30] text-white shadow-lg shadow-[#D85A30]/25 scale-105'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {org.label}
            </button>
          ))}
        </div>
      </section>

      {/* GRILLE D'OFFRES */}
      <section className="px-6 pb-32 md:px-16 lg:px-24">
        {filteredItineraries.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl max-w-2xl mx-auto bg-white/[0.02]">
            <p className="text-white/40 font-light italic text-sm mb-4">
              Aucune offre active pour cette ville de départ actuellement.
            </p>
            <button
              onClick={() => setSelectedOrigin('ALL')}
              className="text-xs uppercase tracking-widest text-[#D85A30] font-bold underline"
            >
              Afficher tous les départs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {filteredItineraries.map((item) => {
              const generatedAt = new Date(item.generated_at).getTime();
              const now = new Date().getTime();
              const hoursSinceGeneration = (now - generatedAt) / (1000 * 60 * 60);
              const isExpired = hoursSinceGeneration >= 72;
              const flight = item.flight_details;

              const originCode = flight?.origin || 'ABJ';
              const originName = flight?.origin_name || originCode;
              const price = flight?.price_fcfa ? flight.price_fcfa.toLocaleString() : '---';

              return (
                <Link
                  href={`/itinerary/${item.id}`}
                  key={item.id}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0F0F0F] border border-white/10 block hover:border-[#D85A30]/60 transition-all duration-500 shadow-xl"
                >
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110 ${isExpired ? 'grayscale opacity-40' : ''}`}
                    style={{ backgroundImage: `url('${getImageForDestination(item.destination_name, flight?.destination_image)}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

                  {/* Badge Départ & Statut */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                    <span className="bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Plane size={11} className="text-[#D85A30]" />
                      Départ : {originName} ({originCode})
                    </span>

                    {isExpired ? (
                      <span className="bg-[#7a1818] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        Expiré
                      </span>
                    ) : (
                      <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        Disponible
                      </span>
                    )}
                  </div>

                  {/* Contenu bas de carte */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#D85A30] mb-1">
                      {flight?.airline || 'Vol Régulier'}
                    </p>

                    <h3 className="font-serif font-bold text-3xl text-white leading-tight mb-2">
                      {item.destination_name}
                    </h3>

                    <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-white/15">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/40 block">Vol Aller-Retour dès</span>
                        <span className="text-xl font-serif font-bold text-white">
                          {price} <span className="text-xs font-sans text-[#D85A30]">FCFA</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#D85A30] group-hover:text-white transition-colors">
                        Détails <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
