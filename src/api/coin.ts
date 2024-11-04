import { CoinDataPoint, CoinPaprikaData } from '@/types/types';
import { getCurrentDate, getCurrentTimestamp } from '@/utils/utils';
import { REVALIDATE_INTERVAL } from '@/lib/config';

const revalidate = REVALIDATE_INTERVAL;

export const fetchFromCoinGecko = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
  const response = await fetch(
    `${process.env.COINGECKO_API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
    {
      next: { revalidate },
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

export const fetchFromCoinPaprika = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
  const response = await fetch(
    `${process.env.COINPAPRIKA_API_URL}/coins/${coinId}/ohlcv/historical?start=${getStartDate(
      days,
    )}&end=${getCurrentDate()}`,
    {
      next: { revalidate },
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

export const fetchFromCoinCap = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
  const response = await fetch(
    `${process.env.COINCAP_API_URL}/assets/${coinId}/history?interval=d1&start=${getStartTimestamp(
      days,
    )}&end=${getCurrentTimestamp()}`,
    {
      next: { revalidate },
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
