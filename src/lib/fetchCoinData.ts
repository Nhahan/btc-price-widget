import { getCurrentDate, getCurrentTimestamp } from "@/utils/utils";
import { unstableCache } from "@/utils/cacheUtils";

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
	btc: "bitcoin",
	eth: "ethereum",
};

const revalidate = 30;

/**
 * Fetches daily price data for a specified coin from multiple APIs.
 * Always fetches 31 days of data to enable caching.
 * @param coinId Coin ID used in APIs (e.g., 'bitcoin' or 'ethereum')
 * @returns Array of objects containing date and price
 */
export const fetchCoinData = async (coinId: string): Promise<CoinDataPoint[]> => {
	const days = 31;
	const coinName = COIN_MAP[coinId] || "bitcoin";

	const dataFetchers: CoinAPI[] = [
		{ coinId: coinName, fetchFunction: fetchFromCoinGecko },
		{ coinId: coinName, fetchFunction: fetchFromCoinPaprika },
		{ coinId: coinName, fetchFunction: fetchFromCoinCap },
	];

	for (const { fetchFunction, coinId } of dataFetchers) {
		try {
			const data = await unstableCache(
				() => fetchFunction(coinId, days),
				["coinData", coinId],
				{
					revalidate,
				}
			)();

			if (data.length >= days) {
				return data.slice(-days); // Ensure the correct number of days
			}
		} catch (error) {
			console.error(`Error fetching data for ${coinId}:`, error);
		}
	}

	console.error("Failed to fetch data from all sources.");
	return [];
};

const fetchFromCoinGecko = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
	const response = await fetch(
		`${process.env.COINGECKO_API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
		{
			next: { revalidate },
		}
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

const fetchFromCoinPaprika = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
	const response = await fetch(
		`${process.env.COINPAPRIKA_API_URL}/coins/${coinId}/ohlcv/historical?start=${getStartDate(
			days
		)}&end=${getCurrentDate()}`,
		{
			next: { revalidate },
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch data for ${coinId} from CoinPaprika. Status: ${response.status}`);
	}

	const data: CoinPaprikaData[] = await response.json();
	return data.map((item) => ({
		date: item.time_open.split("T")[0], // YYYY-MM-DD format
		price: item.close,
	}));
};

const fetchFromCoinCap = async (coinId: string, days: number): Promise<CoinDataPoint[]> => {
	const response = await fetch(
		`${process.env.COINCAP_API_URL}/assets/${coinId}/history?interval=d1&start=${getStartTimestamp(
			days
		)}&end=${getCurrentTimestamp()}`,
		{
			next: { revalidate },
		}
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
	return startDate.toISOString().split("T")[0]; // YYYY-MM-DD format
};

const getStartTimestamp = (days: number): number => {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);
	return startDate.getTime();
};
