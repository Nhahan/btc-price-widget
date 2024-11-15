import { CoinDataPoint, CoinPaprikaData, CoinSymbol } from '@/types/types';
import { getCurrentDate, getCurrentTimestamp, getStartDate, getStartTimestamp } from '@/utils/utils';
import { MAX_DAYS, REVALIDATE_INTERVAL } from '@/const/const';

/**
 * Common fetch function to retrieve JSON data from a given URL.
 * @param url API endpoint URL
 * @returns JSON response
 */
async function fetchJSON(url: string): Promise<any> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_INTERVAL },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fetch error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Fetches daily price data for a specified coin from Binance.
 * @param coinSymbol Coin symbol (e.g., 'btc', 'eth')
 * @returns Array of objects containing date and price
 */
export async function fetchFromBinance(coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> {
  const coinId = COIN_ID_LOOKUP.binance[coinSymbol];
  if (!coinId) {
    throw new Error(`Binance does not support the symbol '${coinSymbol}'.`);
  }

  const url = `${process.env.BINANCE_API_URL}/klines?symbol=${coinId}&interval=1d&limit=${MAX_DAYS}`;
  const data = await fetchJSON(url);

  return data.map((item: any[]) => ({
    date: new Date(item[0]).toISOString().slice(0, 10),
    price: parseFloat(item[4]), // Close price
  }));
}

/**
 * Fetches daily price data for a specified coin from CoinGecko.
 * @param coinSymbol Coin symbol (e.g., 'btc', 'eth')
 * @returns Array of objects containing date and price
 */
export async function fetchFromCoinGecko(coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> {
  const coinId = COIN_ID_LOOKUP.gecko[coinSymbol];
  if (!coinId) {
    throw new Error(`CoinGecko does not support the symbol '${coinSymbol}'.`);
  }

  const url = `${process.env.COINGECKO_API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${MAX_DAYS}&interval=daily`;
  const data = await fetchJSON(url);

  const prices: [number, number][] = data.prices;

  return prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString().slice(0, 10), // YYYY-MM-DD format
    price,
  }));
}

/**
 * Fetches daily price data for a specified coin from CoinPaprika.
 * @param coinSymbol Coin symbol (e.g., 'btc', 'eth')
 * @returns Array of objects containing date and price
 */
export async function fetchFromCoinPaprika(coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> {
  const coinId = COIN_ID_LOOKUP.paprika[coinSymbol];
  if (!coinId) {
    throw new Error(`CoinPaprika does not support the symbol '${coinSymbol}'.`);
  }

  const startDate = getStartDate(MAX_DAYS);
  const endDate = getCurrentDate();

  const url = `${process.env.COINPAPRIKA_API_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`;
  const data: CoinPaprikaData[] = await fetchJSON(url);

  return data.map((item) => ({
    date: item.time_open.split('T')[0], // YYYY-MM-DD format
    price: item.close,
  }));
}

/**
 * Fetches daily price data for a specified coin from CoinCap.
 * @param coinSymbol Coin symbol (e.g., 'btc', 'eth')
 * @returns Array of objects containing date and price
 */
export async function fetchFromCoinCap(coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> {
  const coinId = COIN_ID_LOOKUP.cap[coinSymbol];
  if (!coinId) {
    throw new Error(`CoinCap does not support the symbol '${coinSymbol}'.`);
  }

  const startTimestamp = getStartTimestamp(MAX_DAYS);
  const endTimestamp = getCurrentTimestamp();

  const url = `${process.env.COINCAP_API_URL}/assets/${coinId}/history?interval=d1&start=${startTimestamp}&end=${endTimestamp}`;
  const data = await fetchJSON(url);

  const prices: { priceUsd: string; time: number }[] = data.data;

  return prices.map((item) => ({
    date: new Date(item.time).toISOString().slice(0, 10), // YYYY-MM-DD format
    price: parseFloat(item.priceUsd),
  }));
}

/**
 * Fetches daily price data for a specified coin from CryptoCompare.
 * @param coinSymbol Coin symbol (e.g., 'btc', 'eth')
 * @returns Array of objects containing date and price
 */
export async function fetchFromCryptoCompare(coinSymbol: CoinSymbol): Promise<CoinDataPoint[]> {
  const coinId = COIN_ID_LOOKUP.cryptocompare[coinSymbol];
  if (!coinId) {
    throw new Error(`CryptoCompare does not support the symbol '${coinSymbol}'.`);
  }

  const url = `${process.env.CRYPTOCOMPARE_API_URL}/data/v2/histoday?fsym=${coinId}&tsym=USD&limit=${MAX_DAYS}`;

  const data = await fetchJSON(url);

  if (data.Response !== 'Success') {
    throw new Error(`CryptoCompare API error: ${data.Message}`);
  }

  const prices = data.Data.Data; // Array of { time, close, ... }

  return prices.map((item: { time: number; close: number }) => ({
    date: new Date(item.time * 1000).toISOString().slice(0, 10), // YYYY-MM-DD format
    price: item.close,
  }));
}

export const COIN_ID_LOOKUP: Record<string, Record<CoinSymbol, string>> = {
  binance: {
    btc: 'BTCUSDT',
    eth: 'ETHUSDT',
    xrp: 'XRPUSDT',
    doge: 'DOGEUSDT',
    pepe: 'PEPEUSDT',
    sol: 'SOLUSDT',
  },
  gecko: {
    btc: 'bitcoin',
    eth: 'ethereum',
    xrp: 'ripple',
    doge: 'dogecoin',
    pepe: 'pepe',
    sol: 'solana',
  },
  paprika: {
    btc: 'btc-bitcoin',
    eth: 'eth-ethereum',
    xrp: 'xrp-xrp',
    doge: 'doge-dogecoin',
    pepe: 'pepe-pepe',
    sol: 'sol-solana',
  },
  cap: {
    btc: 'bitcoin',
    eth: 'ethereum',
    xrp: 'ripple',
    doge: 'dogecoin',
    pepe: 'pepe',
    sol: 'solana',
  },
  cryptocompare: {
    btc: 'BTC',
    eth: 'ETH',
    xrp: 'XRP',
    doge: 'DOGE',
    pepe: 'PEPE',
    sol: 'SOL',
  },
};
