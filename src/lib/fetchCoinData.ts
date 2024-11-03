import {unstableCache} from "@/utils/cacheUtils";
import {CoinAPI, CoinDataPoint} from "@/types/types";
import {fetchFromCoinCap, fetchFromCoinGecko, fetchFromCoinPaprika} from "@/api/api";

const COIN_MAP: { [key: string]: string } = {
	btc: "bitcoin",
	eth: "ethereum",
};

const REVALIDATE = 30;
const DAYS = 31;

/**
 * Fetches daily price data for a specified coin from multiple APIs.
 * Always fetches 31 days of data to enable caching.
 * @param coinId Coin ID used in APIs (e.g., 'bitcoin' or 'ethereum')
 * @returns Array of objects containing date and price
 */
export const fetchCoinData = async (coinId: string): Promise<CoinDataPoint[]> => {
	const coinName = COIN_MAP[coinId] || "bitcoin";

	const dataFetchers: CoinAPI[] = [
		{ coinId: coinName, fetchFunction: fetchFromCoinGecko },
		{ coinId: coinName, fetchFunction: fetchFromCoinPaprika },
		{ coinId: coinName, fetchFunction: fetchFromCoinCap },
	];

	for (const { fetchFunction, coinId } of dataFetchers) {
		try {
			const data: CoinDataPoint[] = await unstableCache(
				() => fetchFunction(coinId, DAYS),
				["coinData", coinId],
				{
					revalidate: REVALIDATE,
				}
			)();

			if (data.length >= DAYS) {
				return data.slice(-DAYS); // Ensure the correct number of days
			}
		} catch (error) {
			console.error(`Error fetching data for ${coinId}:`, error);
		}
	}

	console.error("Failed to fetch data from all sources.");
	return [];
};
