import { ThemeName } from '@/types/theme';
import { CoinSymbol } from '@/types/types';

export const COINS = {
  btc: { id: 'bitcoin', basePrice: 82500, variation: 3535, rate: 1, toFixed: 2 },
  eth: { id: 'ethereum', basePrice: 3500, variation: 255, rate: 1, toFixed: 2 },
  xrp: { id: 'ripple', basePrice: 0.712311, variation: 0.1111, rate: 1, toFixed: 6 },
  doge: { id: 'dogecoin', basePrice: 0.345611, variation: 0.0555, rate: 1, toFixed: 6 },
  pepe: { id: 'pepe', basePrice: 0.00001234, variation: 0.0000055, rate: 1, toFixed: 8 },
  sol: { id: 'solana', basePrice: 222, variation: 33, rate: 1, toFixed: 2 },
} as const;

export const VALID_COINS = Object.keys(COINS) as CoinSymbol[];

export const MIN_DAYS = 7;
export const MAX_DAYS = 28;
export const DEFAULT_COIN_SYMBOL = 'btc' as CoinSymbol;
export const DEFAULT_DAYS = 28;
export const DEFAULT_THEME: ThemeName = 'default';

export const THEMES = [
  'default',
  'sunset',
  'forest',
  'ocean',
  'pastel',
  'noir',
  'neon',
  'monochrome',
  'midnight',
  'sunrise',
  'retro',
  'cyberpunk',
  'grayscale',
  'candy',
  'light',
  'dark',
  'spring',
  'summer',
  'autumn',
  'winter',
] as const;

export const REVALIDATE_INTERVAL = parseInt(process.env.REVALIDATE_INTERVAL || '1800', 10);
