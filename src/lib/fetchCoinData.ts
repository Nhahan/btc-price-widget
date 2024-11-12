import { unstableCache } from '@/utils/cacheUtils';
import { CoinAPI, CoinDataPoint, CoinId, CoinSymbol } from '@/types/types';
import { fetchFromCoinCap, fetchFromCoinGecko, fetchFromCoinPaprika } from '@/api/coin';
import { COIN_MAP, MAX_DAYS, REVALIDATE_INTERVAL } from '@/const/const';

/**
 * Fetches daily price data for a specified coin from multiple APIs.
 * Always fetches 31 days of data to enable caching.
 * @param coinSymbol Coin symbol (e.g., 'btc' or 'eth')
 * @returns Array of objects containing date and price
 */
export const fetchCoinData = async (coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> => {
  const coinId: CoinId = COIN_MAP[coinSymbol];
  const dataFetchers: CoinAPI[] = [
    { coinId, fetchFunction: fetchFromCoinGecko },
    { coinId, fetchFunction: fetchFromCoinPaprika },
    { coinId, fetchFunction: fetchFromCoinCap },
  ];

  for (const { fetchFunction, coinId } of dataFetchers) {
    console.log(`Attempting to fetch data for ${coinId} using ${fetchFunction.name}`);
    try {
      const data: CoinDataPoint[] = await unstableCache(() => fetchFunction(coinId, MAX_DAYS), ['coinData', coinId], {
        revalidate: REVALIDATE_INTERVAL,
      })();

      if (data.length >= MAX_DAYS) {
        return data.slice(-MAX_DAYS); // Ensure the correct number of days
      }
    } catch (error) {
      console.warn(`Error fetching data for ${coinId} using ${fetchFunction.name}:`, error);
    }
  }

  console.error('Failed to fetch data from all sources.');
  return [];
};
