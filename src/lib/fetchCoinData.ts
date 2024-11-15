import { unstableCache } from '@/utils/cacheUtils';
import { CoinDataPoint, CoinSymbol } from '@/types/types';
import { fetchFromCoinCap, fetchFromCoinGecko, fetchFromCoinPaprika } from '@/api/coin';
import { MAX_DAYS, REVALIDATE_INTERVAL } from '@/const/const';

/**
 * Fetches daily price data for a specified coin from multiple APIs.
 * Always fetches 31 days of data to enable caching.
 * @param coinSymbol Coin symbol (e.g., 'btc' or 'eth')
 * @returns Array of objects containing date and price
 */
export const fetchCoinData = async (coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> => {
  const dataFetchers = [fetchFromCoinGecko, fetchFromCoinPaprika, fetchFromCoinCap];

  for (const fetchFunction of dataFetchers) {
    console.log(`Attempting to fetch data for ${coinSymbol} using ${fetchFunction.name}`);
    try {
      const data: CoinDataPoint[] = await unstableCache(() => fetchFunction(coinSymbol), ['coinData', coinSymbol], {
        revalidate: REVALIDATE_INTERVAL,
      })();

      if (data.length >= MAX_DAYS) {
        return data.slice(-MAX_DAYS); // Ensure the correct number of days
      }
    } catch (error) {
      console.warn(`Error fetching data for ${coinSymbol} using ${fetchFunction.name}:`, error);
    }
  }

  console.error('Failed to fetch data from all sources.');
  return [];
};
