import { CoinDataPoint, CoinSymbol } from '@/types/types';
import {
  fetchFromBinance,
  fetchFromCoinCap,
  fetchFromCoinGecko,
  fetchFromCoinPaprika,
  fetchFromCryptoCompare,
} from '@/api/coin';
import { MAX_DAYS, REVALIDATE_INTERVAL } from '@/const/const';
import { unstableCache } from '@/utils/cacheUtils';

/**
 * Fetches daily price data for a specified coin from multiple APIs sequentially.
 * Returns data from the first successful API with sufficient data.
 * @param coinSymbol Coin symbol (e.g., 'btc', 'eth')
 * @returns Array of objects containing date and price
 */
export const fetchCoinData = async (coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> => {
  const cacheKey = ['fetchCoinData', coinSymbol];

  const fetchFunction = async (): Promise<CoinDataPoint[]> => {
    const dataFetchers = [
      { fn: fetchFromBinance, name: 'fetchFromBinance' },
      { fn: fetchFromCoinGecko, name: 'fetchFromCoinGecko' },
      { fn: fetchFromCoinPaprika, name: 'fetchFromCoinPaprika' },
      { fn: fetchFromCoinCap, name: 'fetchFromCoinCap' },
      { fn: fetchFromCryptoCompare, name: 'fetchFromCryptoCompare' },
    ];

    for (const { fn, name } of dataFetchers) {
      try {
        const data: CoinDataPoint[] = await fn(coinSymbol);

        if (data.length >= MAX_DAYS) {
          console.log(`Successfully fetched data for ${coinSymbol} using ${name}`);
          return data.slice(-MAX_DAYS);
        }
        console.warn(`${name} returned insufficient data. (Required: ${MAX_DAYS}, Received: ${data.length})`);
      } catch (error) {
        console.warn(`Error fetching data for ${coinSymbol} using ${name}:`, error);
      }
    }

    console.error('Failed to fetch data from all sources.');
    return [];
  };

  return await unstableCache(fetchFunction, cacheKey, {
    revalidate: REVALIDATE_INTERVAL,
  })();
};
