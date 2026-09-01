"use client";

import React from 'react';
import { Globe } from 'lucide-react';
import { CurrencyCode } from '../lib/currency';

interface CurrencySelectorProps {
  currentCurrency: CurrencyCode | 'AUTO';
  onChange: (c: CurrencyCode | 'AUTO') => void;
}

export default function CurrencySelector({ currentCurrency, onChange }: CurrencySelectorProps) {
  const options: { value: CurrencyCode | 'AUTO'; label: string }[] = [
    { value: 'AUTO', label: '🌍 Auto (Locale)' },
    { value: 'EUR', label: '🇪🇺 EUR (€)' },
    { value: 'USD', label: '🇺🇸 USD ($)' },
    { value: 'CAD', label: '🇨🇦 CAD ($)' },
    { value: 'XOF', label: '🇨🇮 FCFA' },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-white/5 border border-white/15 rounded-full px-3 py-1 text-xs text-white/90 shadow-sm">
      <Globe size={13} className="text-[#D85A30]" />
      <select
        value={currentCurrency}
        onChange={(e) => onChange(e.target.value as CurrencyCode | 'AUTO')}
        className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer pr-1"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#111] text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
