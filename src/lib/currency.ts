export type CurrencyCode = 'XOF' | 'EUR' | 'USD' | 'CAD';

export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  XOF: 1,
  EUR: 655.957,
  USD: 600,
  CAD: 440,
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  XOF: 'FCFA',
  EUR: '€',
  USD: '$',
  CAD: '$ CAD',
};

export function getNaturalCurrency(originCode?: string): CurrencyCode {
  if (!originCode) return 'XOF';
  const org = originCode.toUpperCase().trim();

  // Europe / France
  if (['CDG', 'ORY', 'NCE', 'LYS', 'MRS', 'BOD', 'TLS', 'BRU', 'FRA', 'AMS', 'MAD', 'BCN', 'FCO', 'MXP', 'LIS', 'GVA'].includes(org)) {
    return 'EUR';
  }

  // USA & Moyen-Orient & Asie
  if (['JFK', 'EWR', 'LAX', 'MIA', 'ORD', 'SFO', 'DXB', 'CAN', 'PEK', 'PVG', 'NRT', 'HND', 'SIN', 'BKK', 'JED'].includes(org)) {
    return 'USD';
  }

  // Canada
  if (['YUL', 'YYZ', 'YVR', 'YOW', 'YQB'].includes(org)) {
    return 'CAD';
  }

  // Afrique de l'Ouest et Centrale
  return 'XOF';
}

export function convertFromFcfa(fcfaAmount: number, targetCurrency: CurrencyCode): number {
  if (!fcfaAmount) return 0;
  if (targetCurrency === 'XOF') return Math.round(fcfaAmount);
  const rate = EXCHANGE_RATES[targetCurrency];
  const converted = fcfaAmount / rate;
  
  // Arrondir joliment (ex: 395 € au lieu de 396.37 €)
  if (targetCurrency === 'EUR' || targetCurrency === 'USD' || targetCurrency === 'CAD') {
    return Math.round(converted / 5) * 5 || Math.round(converted);
  }
  return Math.round(converted);
}

export function formatPriceDisplay(
  fcfaAmount: number,
  originCode?: string,
  userSelectedCurrency?: CurrencyCode | 'AUTO'
): { primary: string; secondary: string; symbol: string; currency: CurrencyCode; amount: number } {
  const currency: CurrencyCode = (!userSelectedCurrency || userSelectedCurrency === 'AUTO')
    ? getNaturalCurrency(originCode)
    : userSelectedCurrency;

  const symbol = CURRENCY_SYMBOLS[currency];
  const convertedAmount = convertFromFcfa(fcfaAmount, currency);

  let primary = '';
  if (currency === 'EUR') {
    primary = `${convertedAmount.toLocaleString('fr-FR')} €`;
  } else if (currency === 'USD') {
    primary = `$${convertedAmount.toLocaleString('en-US')}`;
  } else if (currency === 'CAD') {
    primary = `${convertedAmount.toLocaleString('fr-CA')} $ CAD`;
  } else {
    primary = `${Math.round(fcfaAmount).toLocaleString('fr-FR')} FCFA`;
  }

  // Équivalent secondaire indicatif
  let secondary = '';
  if (currency === 'EUR' || currency === 'USD' || currency === 'CAD') {
    secondary = `~ ${Math.round(fcfaAmount).toLocaleString('fr-FR')} FCFA`;
  } else {
    const inEur = convertFromFcfa(fcfaAmount, 'EUR');
    secondary = `~ ${inEur} € / $${convertFromFcfa(fcfaAmount, 'USD')}`;
  }

  return {
    primary,
    secondary,
    symbol,
    currency,
    amount: convertedAmount,
  };
}
