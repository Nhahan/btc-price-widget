import { MAX_DAYS } from '@/const/const';
import { CoinSymbol } from '@/types/types';
import { btcBase64, dogeBase64, ethBase64, pepeBase64, solBase64, xrpBase64 } from '@/base64/base64coins';

export const getCoinIconUrl = (coinSymbol: CoinSymbol): string => {
  const base64Icons: Record<CoinSymbol, string> = {
    btc: btcBase64,
    eth: ethBase64,
    doge: dogeBase64,
    xrp: xrpBase64,
    sol: solBase64,
    pepe: pepeBase64,
  };

  return base64Icons[coinSymbol] || btcBase64;
};

export const getCurrentTimestamp = (): number => {
  return new Date().getTime();
};

export const getStartTimestamp = (days: number): number => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return startDate.getTime();
};

export function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateFakeCoinData(days = MAX_DAYS, basePrice = 82500, variation = 2500, rate = 1, toFixed = 2) {
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
