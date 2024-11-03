export interface CoinDataPoint {
	date: string;
	price: number;
}

interface CoinPaprikaData {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface CoinAPI {
	coinId: string;
	fetchFunction: (coinId: string, days: number) => Promise<CoinDataPoint[]>;
}

const COIN_MAP: { [key: string]: string } = {
	btc: 'bitcoin',
	eth: 'ethereum',
};

/**
 * Fetches daily price data for a specified coin from multiple APIs.
 * Always fetches 31 days of data to enable caching.
 * @param coinId Coin ID used in APIs (e.g., 'btc' or 'eth')
 * @returns Array of objects containing date and price
 */
export const fetchCoinData = async (coinId: string): Promise<CoinDataPoint[]> => {
	const days = 31;
	const coinName = COIN_MAP[coinId] || 'bitcoin';

	const dataFetchers: CoinAPI[] = [
		{ coinId: coinName, fetchFunction: fetchFromCoinGecko },
		{ coinId: `btc-${coinName}`, fetchFunction: fetchFromCoinPaprika },
		{ coinId: coinName, fetchFunction: fetchFromCoinCap },
	];

	for (const { fetchFunction, coinId } of dataFetchers) {
		try {
			const data = await fetchFunction(coinId, days);
			if (data.length >= days) {
				return data.slice(-days); // Ensure the correct number of days
			}
		} catch (error) {
			console.error(`Error fetching data for ${coinId}:`, error);
		}
	}

	console.error('Failed to fetch data from all sources.');
	return [];
};

/**
 * Fetches data from CoinGecko API
 */
const fetchFromCoinGecko = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
	const response = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch data for ${coinId} from CoinGecko. Status: ${response.status}`);
	}

	const data = await response.json();
	const prices: [number, number][] = data.prices;

	return formatCoinData(prices);
};

/**
 * Fetches data from CoinPaprika API
 */
const fetchFromCoinPaprika = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
	const response = await fetch(
		`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${getStartDate(days)}&end=${getCurrentDate()}`
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
 * Fetches data from CoinCap API
 */
const fetchFromCoinCap = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
	const response = await fetch(
		`https://api.coincap.io/v2/assets/${coinId}/history?interval=d1&range=${days}d`
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch data for ${coinId} from CoinCap. Status: ${response.status}`);
	}

	const data = await response.json();
	const prices: { priceUsd: number; time: number }[] = data.data;

	return prices.map((item) => ({
		date: new Date(item.time).toISOString().slice(0, 10), // YYYY-MM-DD format
		price: item.priceUsd,
	}));
};

/**
 * Formats the raw price data into CoinDataPoint array.
 * @param prices Raw price data from APIs.
 * @returns Array of CoinDataPoint.
 */
const formatCoinData = (prices: [number, number][]): CoinDataPoint[] => {
	return prices.map(([timestamp, price]) => ({
		date: new Date(timestamp).toISOString().slice(0, 10), // YYYY-MM-DD format
		price,
	}));
};

/**
 * Get the current date in YYYY-MM-DD format.
 */
const getCurrentDate = (): string => {
	return new Date().toISOString().split('T')[0];
};

/**
 * Get the start date for fetching historical data based on the number of days.
 * @param days Number of days to go back.
 */
const getStartDate = (days: number): string => {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);
	return startDate.toISOString().split('T')[0]; // YYYY-MM-DD format
};
