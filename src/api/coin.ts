import { CoinDataPoint, CoinPaprikaData, CoinSymbol } from '@/types/types';
import { getCurrentDate, getCurrentTimestamp } from '@/utils/utils';
import { MAX_DAYS, REVALIDATE_INTERVAL } from '@/const/const';

const days = MAX_DAYS;

/**
 * Fetches daily price data for a specified coin from CoinGecko.
 */
export const fetchFromCoinGecko = async (coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> => {
  const coinId = COIN_ID_LOOKUP.gecko[coinSymbol];

  const response = await fetch(
    `${process.env.COINGECKO_API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
    {
      next: { revalidate: REVALIDATE_INTERVAL },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for ${coinId} from CoinGecko. Status: ${response.status}`);
  }

  const data = await response.json();
  const prices: [number, number][] = data.prices;

  return prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString().slice(0, 10), // YYYY-MM-DD format
    price,
  }));
};

/**
 * Fetches daily price data for a specified coin from CoinPaprika.
 */
export const fetchFromCoinPaprika = async (coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> => {
  const coinId = COIN_ID_LOOKUP.paprika[coinSymbol];

  const response = await fetch(
    `${process.env.COINPAPRIKA_API_URL}/coins/${coinId}/ohlcv/historical?start=${getStartDate(
      days,
    )}&end=${getCurrentDate()}`,
    {
      next: { revalidate: REVALIDATE_INTERVAL },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for ${coinId} from CoinPaprika. Status: ${response.status}`);
  }

  const data: CoinPaprikaData[] = await response.json();
  return data.map((item) => ({
    date: item.time_open.split('T')[0], // YYYY-MM-DD format
    price: item.close,
  }));
};

/**
 * Fetches daily price data for a specified coin from CoinCap.
 */
export const fetchFromCoinCap = async (coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> => {
  const coinId = COIN_ID_LOOKUP.cap[coinSymbol];

  const response = await fetch(
    `${process.env.COINCAP_API_URL}/assets/${coinId}/history?interval=d1&start=${getStartTimestamp(
      days,
    )}&end=${getCurrentTimestamp()}`,
    {
      next: { revalidate: REVALIDATE_INTERVAL },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for ${coinId} from CoinCap. Status: ${response.status}`);
  }

  const data = await response.json();
  const prices: { priceUsd: string; time: number }[] = data.data;

  return prices.map((item) => ({
    date: new Date(item.time).toISOString().slice(0, 10), // YYYY-MM-DD format
    price: parseFloat(item.priceUsd),
  }));
};

export const COIN_ID_LOOKUP: Record<string, Record<string, string>> = {
  gecko: {
    btc: 'bitcoin',
    eth: 'ethereum',
    xrp: 'ripple',
    doge: 'dogecoin',
    pepe: 'pepe',
    sol: 'solana',
  },
  paprika: {
    btc: 'bitcoin',
    eth: 'ethereum',
    xrp: 'ripple',
    doge: 'dogecoin',
    pepe: 'pepe',
    sol: 'solana',
  },
  cap: {
    btc: 'btc',
    eth: 'eth',
    xrp: 'xrp',
    doge: 'doge',
    pepe: 'pepe',
    sol: 'sol',
  },
};

const getStartDate = (days: number): string => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return startDate.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const getStartTimestamp = (days: number): number => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return startDate.getTime();
};
