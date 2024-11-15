import { CoinSymbol } from '@/types/types';

export const getCoinIconUrl = (coinSymbol: CoinSymbol): string => {
  return `/images/${coinSymbol}.png`;
};

export const getCurrentTimestamp = (): number => {
  return Date.now();
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateFakeCoinData(days = 31, basePrice = 82500, variation = 2500, rate = 1, toFixed = 2) {
  let price = basePrice,
    lt = ((Math.random() - 0.5) * variation) / 100,
    st = ((Math.random() - 0.5) * variation) / 50;

  return Array.from({ length: days }, (_, i) => {
    const date = new Date(Date.now() - (days - 1 - i) * 86400000).toISOString().split('T')[0];

    if (Math.random() < 0.15) lt = ((Math.random() - 0.5) * variation) / 100;
    if (Math.random() < 0.5) st = ((Math.random() - 0.5) * variation) / 50;

    // Calculate the new price with variations and ensure it's non-negative
    price = Math.max(price + lt + st + ((Math.random() - 0.5) * variation) / 10, 0);

    if (i % 15 === 0) lt += ((Math.random() - 0.5) * variation) / 20;

    // Adjust the final price by multiplying by the rate and formatting
    const finalPrice = price * rate;

    return { date, price: parseFloat(finalPrice.toFixed(toFixed)) };
  });
}
