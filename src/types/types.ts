export interface CoinDataPoint {
	date: string;
	price: number;
}

export interface CoinPaprikaData {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

export interface CoinAPI {
	coinId: string;
	fetchFunction: (coinId: string, days: number) => Promise<CoinDataPoint[]>;
}
