"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Building2, User, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

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

import { formatPriceDisplay } from '../lib/currency';

export default function BookingModal({ isOpen, onClose, flight, hotel }: BookingModalProps) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [passportChoice, setPassportChoice] = useState<'photo' | 'number'>('photo');
  const [passportNumber, setPassportNumber] = useState('');
  const [passengersCount, setPassengersCount] = useState(1);
  const [includeHotel, setIncludeHotel] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Wave / Mobile Money');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');

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

    const passportText = passportChoice === 'photo'
      ? 'Photo transmise directement par message'
      : (passportNumber.trim() || 'Photo transmise directement par message');

    const originDisplay = flight.origin_name ? flight.origin_name + ' (' + flight.origin + ')' : flight.origin;
    const destDisplay = flight.destination_name ? flight.destination_name + ' (' + flight.destination + ')' : flight.destination;
    const datesDisplay = flight.departure_date + (flight.return_date ? ' au ' + flight.return_date : '');

    const hotelPriceObj = hotel ? formatPriceDisplay(hotel.total_price_fcfa, flight.origin) : null;
    const hotelText = includeHotel && hotel && hotelPriceObj
      ? 'Option Hôtel Économique sélectionnée (' + hotel.name + ' — ' + hotelPriceObj.primary + ' pour ' + hotel.total_nights + ' nuits)'
      : 'Non inclus (Billet d\'avion seul)';

    const lines = [
      '✈️ DEMANDE DE RÉSERVATION — UNIQUE VOYAGE',
      '',
      '📍 TRAJET : ' + originDisplay + ' ➔ ' + destDisplay,
      '🏢 Compagnie : ' + flight.airline,
      '📅 Dates : ' + datesDisplay,
      '👥 Passagers : ' + passengersCount + ' voyageur(s)',
      '',
      '🏨 HÉBERGEMENT : ' + hotelText,
      '',
      '👤 PASSAGER PRINCIPAL :',
      '• Nom : ' + lastName.trim().toUpperCase(),
      '• Prénom(s) : ' + firstName.trim(),
      '• Date de naissance : ' + (birthDate || 'Non spécifiée'),
      '• Passeport : ' + passportText,
      '',
      '💰 TOTAL ESTIMÉ : ' + grandTotalDisplay.primary + ' (' + grandTotalFcfa.toLocaleString() + ' FCFA)',
      '💳 Règlement souhaité : ' + paymentMethod,
      '📞 Numéro de contact : ' + customerPhone.trim(),
      '',
      'Merci de m\'indiquer la disponibilité exacte et la procédure pour effectuer mon paiement et recevoir mon billet électronique.'
    ];

    const message = lines.join('\n');
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250545745749';
    const targetUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);

    window.open(targetUrl, '_blank');
    onClose();
  };


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/15 rounded-2xl shadow-2xl p-6 md:p-8 text-white my-8 overflow-hidden"
        >
          {/* Bouton Fermer */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/50 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>

          {/* En-tête */}
          <div className="mb-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D85A30] block mb-1">
              Billetterie & Conciergerie Privée
            </span>
            <h2 className="font-serif text-2xl md:text-3xl">
              Réserver votre voyage pour {flight.destination_name || flight.destination}
            </h2>
            <p className="text-xs text-white/50 mt-1">
              Remplissez les informations de voyage pour que notre service billetterie prépare votre émission officielle.
            </p>
          </div>

          {/* Récapitulatif Rapide */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#D85A30]/15 flex items-center justify-center text-[#D85A30]">
                <Plane size={18} />
              </div>
              <div>
                <p className="font-bold text-white">{flight.origin_name || flight.origin} ➔ {flight.destination_name || flight.destination}</p>
                <p className="text-white/40">{flight.airline} · {flight.departure_date} {flight.return_date ? ('- ' + flight.return_date) : ''}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#D85A30]">{flight.price_fcfa.toLocaleString()} FCFA</p>
              <p className="text-white/40 text-[10px]">Tarif par passager (Aller-Retour)</p>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1 : Passager */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/70 mb-3 flex items-center gap-2">
                <User size={14} className="text-[#D85A30]" />
                1. Passager Principal (comme sur le passeport)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-white/50 mb-1">Nom de famille *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: KOUAME"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#D85A30] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-white/50 mb-1">Prénom(s) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jean-Luc"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#D85A30] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-[11px] text-white/50 mb-1">Date de naissance</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#D85A30] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-white/50 mb-1">Nombre de passagers</label>
                  <select
                    value={passengersCount}
                    onChange={(e) => setPassengersCount(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#D85A30] focus:outline-none"
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
              <div className="border border-white/10 bg-white/[0.02] rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeHotel}
                    onChange={(e) => setIncludeHotel(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-[#D85A30] focus:ring-[#D85A30]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Building2 size={14} className="text-[#D85A30]" />
                        Ajouter l'Hôtel Économique Conseillé (Optionnel)
                      </span>
                      <span className="text-xs font-bold text-[#D85A30]">
                        +{hotel.total_price_fcfa.toLocaleString()} FCFA
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 mt-1">
                      {hotel.name} ({hotel.stars}★) · {hotel.neighborhood || flight.destination_name} · {hotel.total_nights} nuits (soit {hotel.price_per_night_fcfa.toLocaleString()} FCFA / nuit).
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* Section 3 : Règlement & Contact */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/70 mb-3 flex items-center gap-2">
                <CreditCard size={14} className="text-[#D85A30]" />
                2. Contact & Mode de Règlement Préféré
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] text-white/50 mb-1">Votre numéro de contact direct *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: +225 07 00 00 00 00"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#D85A30] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-white/50 mb-1">Moyen de paiement souhaité</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#D85A30] focus:outline-none"
                  >
                    <option value="Wave">Wave (Recommandé)</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                    <option value="Virement / Dépôt Bancaire">Virement / Dépôt Bancaire</option>
                    <option value="Carte Bancaire">Carte Bancaire (En ligne)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Total et Message d'erreur */}
            {error && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/50 rounded-lg p-3">
                {error}
              </p>
            )}

            {/* Récap Prix Total */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Montant Total Estimé</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-serif font-bold text-white">
                    {grandTotalDisplay.primary}
                  </p>
                  {grandTotalDisplay.secondary && (
                    <span className="text-xs text-white/40">
                      ({grandTotalDisplay.secondary})
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right text-[11px] text-white/40">
                <p className="flex items-center gap-1 justify-end text-emerald-400"><ShieldCheck size={14}/> Garantie Prix Négocié</p>
                <p>Émission officielle sous 1 heure</p>
              </div>
            </div>


            {/* Bouton de confirmation */}
            <button
              type="submit"
              className="w-full bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold py-4 px-6 rounded-xl uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#D85A30]/20"
            >
              Confirmer ma demande de réservation
              <ArrowRight size={16} />
            </button>

            <p className="text-center text-[10px] text-white/30">
              En confirmant, votre demande est immédiatement transmise à notre service billetterie pour vérification et émission officielle.
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
