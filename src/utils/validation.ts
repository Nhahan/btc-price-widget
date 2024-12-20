import { ThemeName, themes } from '@/types/theme';
import { DEFAULT_COIN_SYMBOL, DEFAULT_DAYS, DEFAULT_THEME, MAX_DAYS, MIN_DAYS, VALID_COINS } from '@/const/const';
import { CoinSymbol } from '@/types/types'; // Coin validation

// Coin validation
export function getValidatedCoin(coinParam?: string | null): CoinSymbol {
  const normalizedParam = (coinParam ? coinParam.toLowerCase() : DEFAULT_COIN_SYMBOL) as CoinSymbol;
  return VALID_COINS.includes(normalizedParam) ? normalizedParam : DEFAULT_COIN_SYMBOL;
}

// Days validation
export function getValidatedDays(daysParam?: string | null): number {
  const daysNumber = parseInt(daysParam || '', 10);
  return isNaN(daysNumber) ? DEFAULT_DAYS : Math.min(Math.max(daysNumber, MIN_DAYS), MAX_DAYS);
}

// Theme validation
export function getValidatedTheme(themeParam?: string | null): ThemeName {
  const themeKey = themeParam?.toLowerCase() as ThemeName;
  return themeKey && themes.hasOwnProperty(themeKey) ? themeKey : DEFAULT_THEME;
}

// showIcon validation
export function getValidatedShowIcon(showIconParam?: string | null): boolean {
  return showIconParam?.toLowerCase() !== 'false';
}
