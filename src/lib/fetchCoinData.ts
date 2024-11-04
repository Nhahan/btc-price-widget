import { unstableCache } from '@/utils/cacheUtils';
import { CoinAPI, CoinDataPoint, CoinId, CoinSymbol } from '@/types/types';
import { fetchFromCoinCap, fetchFromCoinGecko, fetchFromCoinPaprika } from '@/api/api';
import { REVALIDATE_INTERVAL } from '@/lib/config';

const COIN_MAP: Record<CoinSymbol, CoinId> = {
  btc: 'bitcoin',
  eth: 'ethereum',
};

const MAX_DAYS = 31;

/**
 * Fetches daily price data for a specified coin from multiple APIs.
 * Always fetches 31 days of data to enable caching.
 * @param coinSymbol Coin ID used in APIs (e.g., 'bitcoin' or 'ethereum')
 * @returns Array of objects containing date and price
 */
export const fetchCoinData = async (coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> => {
  const coinId: CoinId = COIN_MAP[coinSymbol] || 'bitcoin';
  const dataFetchers: CoinAPI[] = [
    { coinId, fetchFunction: fetchFromCoinGecko },
    { coinId, fetchFunction: fetchFromCoinPaprika },
    { coinId, fetchFunction: fetchFromCoinCap },
  ];

  for (const { fetchFunction, coinId } of dataFetchers) {
    try {
      const data: CoinDataPoint[] = await unstableCache(() => fetchFunction(coinId, MAX_DAYS), ['coinData', coinId], {
        revalidate: REVALIDATE_INTERVAL,
      })();

      if (data.length >= MAX_DAYS) {
        return data.slice(-MAX_DAYS); // Ensure the correct number of days
      }
    } catch (error) {
      console.error(`Error fetching data for ${coinId}:`, error);
    }
  }

  console.error('Failed to fetch data from all sources.');
  return [];
};
