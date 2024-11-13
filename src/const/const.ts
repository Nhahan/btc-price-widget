import { ThemeName } from '@/types/theme';
import { CoinId, CoinSymbol } from '@/types/types';

export const COINS = {
  btc: { id: 'bitcoin' },
  eth: { id: 'ethereum' },
  xrp: { id: 'ripple' },
  doge: { id: 'dogecoin' },
  pepe: { id: 'pepe' },
  sol: { id: 'solana' },
} as const;

export const VALID_COINS = Object.keys(COINS) as CoinSymbol[];

export const COIN_MAP: Record<CoinSymbol, CoinId> = Object.fromEntries(
  Object.entries(COINS).map(([symbol, data]) => [symbol, data.id]),
) as Record<CoinSymbol, CoinId>;

export const MIN_DAYS = 7;
export const MAX_DAYS = 31;
export const DEFAULT_COIN_SYMBOL = 'btc' as CoinSymbol;
export const DEFAULT_DAYS = 30;
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

export const REVALIDATE_INTERVAL = parseInt(process.env.REVALIDATE_INTERVAL || '600', 10);
