"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Building2, User, CreditCard, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { formatPriceDisplay } from '../lib/currency';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}

export default function BookingModal({ isOpen, onClose, flight, hotel }: BookingModalProps) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passengersCount, setPassengersCount] = useState(1);
  const [includeHotel, setIncludeHotel] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Wave');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');

  // Bloquer le défilement du fond quand la modale est active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const flightTotalFcfa = (flight.price_fcfa || 0) * passengersCount;
  const hotelTotalFcfa = includeHotel && hotel ? (hotel.total_price_fcfa || 0) : 0;
  const grandTotalFcfa = flightTotalFcfa + hotelTotalFcfa;

  const flightPriceDisplay = formatPriceDisplay(flight.price_fcfa || 0, flight.origin);
  const grandTotalDisplay = formatPriceDisplay(grandTotalFcfa, flight.origin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!lastName.trim() || !firstName.trim()) {
      setError('Veuillez renseigner le nom et le prénom du passager (identiques au passeport).');
      return;
    }

    if (!customerPhone.trim()) {
      setError('Veuillez renseigner votre numéro de téléphone de contact.');
      return;
    }

    const originDisplay = flight.origin_name ? `${flight.origin_name} (${flight.origin})` : flight.origin;
    const destDisplay = flight.destination_name ? `${flight.destination_name} (${flight.destination})` : flight.destination;
    const datesDisplay = `${flight.departure_date}${flight.return_date ? ' au ' + flight.return_date : ''}`;

    const hotelPriceObj = hotel ? formatPriceDisplay(hotel.total_price_fcfa, flight.origin) : null;
    const hotelText = includeHotel && hotel && hotelPriceObj
      ? `Option Hôtel Économique sélectionnée (${hotel.name} — ${hotelPriceObj.primary} pour ${hotel.total_nights} nuits)`
      : `Non inclus (Billet d'avion seul)`;

    const lines = [
      '✈️ DEMANDE DE RÉSERVATION — UNIQUE VOYAGE',
      '',
      `📍 TRAJET : ${originDisplay} ➔ ${destDisplay}`,
      `🏢 Compagnie : ${flight.airline}`,
      `📅 Dates : ${datesDisplay}`,
      `👥 Passagers : ${passengersCount} voyageur(s)`,
      '',
      `🏨 HÉBERGEMENT : ${hotelText}`,
      '',
      '👤 PASSAGER PRINCIPAL :',
      `• Nom : ${lastName.trim().toUpperCase()}`,
      `• Prénom(s) : ${firstName.trim()}`,
      `• Date de naissance : ${birthDate || 'Non spécifiée'}`,
      '',
      `💰 TOTAL ESTIMÉ : ${grandTotalDisplay.primary} (${grandTotalFcfa.toLocaleString()} FCFA)`,
      `💳 Règlement souhaité : ${paymentMethod}`,
      `📞 Numéro de contact : ${customerPhone.trim()}`,
      '',
      'Merci de m\'indiquer la disponibilité exacte et la procédure pour effectuer mon paiement et recevoir mon billet électronique officiel.'
    ];

    const message = lines.join('\n');
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250545745749';
    const targetUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(targetUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl p-3 sm:p-6 md:p-8 flex justify-center items-start min-h-screen"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-2xl my-4 sm:my-8 bg-gradient-to-b from-[#181818] via-[#121212] to-[#0A0A0A] border-2 border-[#D85A30]/50 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(216,90,48,0.2)] p-5 sm:p-8 md:p-10 text-white ring-1 ring-white/20"
        >
          {/* Bouton Fermer Haute Visibilité */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-[#D85A30] border border-white/20 transition-all shadow-lg z-20 active:scale-95"
          >
            <X size={18} />
          </button>

          {/* En-tête */}
          <div className="mb-6 pr-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D85A30]/15 border border-[#D85A30]/40 text-[#D85A30] text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles size={12} /> Billetterie & Conciergerie Privée
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight leading-snug">
              Réserver votre voyage pour {flight.destination_name || flight.destination}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1.5 leading-relaxed">
              Remplissez les informations de voyage pour que notre service billetterie prépare votre émission officielle.
            </p>
          </div>

          {/* Récapitulatif Rapide Haute Visibilité */}
          <div className="bg-white/[0.04] border border-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-inner">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-[#D85A30]/20 border border-[#D85A30]/40 flex items-center justify-center text-[#D85A30] shrink-0">
                <Plane size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm sm:text-base">
                  {flight.origin_name || flight.origin} ➔ {flight.destination_name || flight.destination}
                </p>
                <p className="text-white/50 text-xs mt-0.5 flex items-center gap-2">
                  <span>{flight.airline}</span>
                  <span>•</span>
                  <span>{flight.departure_date} {flight.return_date ? `au ${flight.return_date}` : ''}</span>
                </p>
              </div>
            </div>
            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
              <p className="text-base sm:text-lg font-bold text-[#D85A30]">
                {flightPriceDisplay.primary}
              </p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">Tarif négocié (Aller-Retour)</p>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1 : Passager */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider font-bold text-white/80 flex items-center gap-2">
                <User size={15} className="text-[#D85A30]" />
                1. Passager Principal (comme sur le passeport)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-white/60 mb-1.5 font-medium">Nom de famille *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: KOUAME"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#D85A30] focus:ring-1 focus:ring-[#D85A30] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1.5 font-medium">Prénom(s) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jean-Luc"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#D85A30] focus:ring-1 focus:ring-[#D85A30] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="block text-xs text-white/60 mb-1.5 font-medium">Date de naissance</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D85A30] focus:ring-1 focus:ring-[#D85A30] focus:outline-none transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1.5 font-medium">Nombre de passagers</label>
                  <select
                    value={passengersCount}
                    onChange={(e) => setPassengersCount(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D85A30] focus:ring-1 focus:ring-[#D85A30] focus:outline-none transition-all"
                  >
                    <option value={1}>1 Passager (Adulte)</option>
                    <option value={2}>2 Passagers</option>
                    <option value={3}>3 Passagers</option>
                    <option value={4}>4 Passagers ou plus</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2 : Option Hébergement Économique */}
            {hotel && (
              <div 
                onClick={() => setIncludeHotel(!includeHotel)}
                className={`border rounded-2xl p-4 sm:p-5 transition-all cursor-pointer select-none ${
                  includeHotel 
                    ? 'border-[#D85A30] bg-[#D85A30]/10 shadow-[0_0_20px_rgba(216,90,48,0.15)]' 
                    : 'border-white/15 bg-white/[0.03] hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <input
                    type="checkbox"
                    checked={includeHotel}
                    onChange={(e) => setIncludeHotel(e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 h-5 w-5 rounded border-white/30 bg-white/10 text-[#D85A30] focus:ring-[#D85A30] cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <Building2 size={16} className="text-[#D85A30]" />
                        Ajouter l'Hôtel Économique Conseillé (Optionnel)
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#D85A30]">
                        +{hotel.total_price_fcfa.toLocaleString()} FCFA
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                      {hotel.name} ({hotel.stars}★) · {hotel.neighborhood || flight.destination_name} · {hotel.total_nights} nuits ({hotel.price_per_night_fcfa.toLocaleString()} FCFA / nuit).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Section 3 : Règlement & Contact */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider font-bold text-white/80 flex items-center gap-2">
                <CreditCard size={15} className="text-[#D85A30]" />
                2. Contact & Mode de Règlement Préféré
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-white/60 mb-1.5 font-medium">Votre numéro de contact direct *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: +225 07 00 00 00 00"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#D85A30] focus:ring-1 focus:ring-[#D85A30] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1.5 font-medium">Moyen de paiement souhaité</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D85A30] focus:ring-1 focus:ring-[#D85A30] focus:outline-none transition-all"
                  >
                    <option value="Wave">Wave (Recommandé)</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                    <option value="Moov Money">Moov Money</option>
                    <option value="Virement / Dépôt Bancaire">Virement / Dépôt Bancaire</option>
                    <option value="Carte Bancaire">Carte Bancaire (En ligne)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <p className="text-xs text-red-300 bg-red-950/60 border border-red-800/60 rounded-xl p-3.5">
                {error}
              </p>
            )}

            {/* Récap Prix Total */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Montant Total Estimé</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {grandTotalDisplay.primary}
                  </p>
                  {grandTotalDisplay.secondary && (
                    <span className="text-xs text-white/50 font-sans">
                      ({grandTotalDisplay.secondary})
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:text-right text-xs text-white/50">
                <p className="flex items-center gap-1.5 sm:justify-end text-emerald-400 font-semibold">
                  <ShieldCheck size={16} /> Garantie Tarif Négocié
                </p>
                <p className="text-[11px] mt-0.5">Émission officielle garantie</p>
              </div>
            </div>

            {/* Bouton de confirmation */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D85A30] to-[#e66c43] hover:from-[#c24e27] hover:to-[#D85A30] text-white font-bold py-4 sm:py-4.5 px-6 rounded-xl uppercase tracking-[0.2em] text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[#D85A30]/30 active:scale-[0.99]"
            >
              Confirmer ma demande de réservation
              <ArrowRight size={16} />
            </button>

            <p className="text-center text-[11px] text-white/40 leading-relaxed">
              En confirmant, votre demande est transmise à notre conciergerie privée pour blocage du tarif et émission de votre billet.
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
