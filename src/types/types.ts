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
  coinId: CoinId;
  fetchFunction: (coinId: CoinId, days: number) => Promise<CoinDataPoint[]>;
}

export type CoinSymbol = 'btc' | 'eth';
export type CoinId = 'bitcoin' | 'ethereum';

export interface ChartOptions {
  width: number;
  height: number;
  bgColor: string;
  lineColor: string;
  textColor: string;
  pointColor: string;
  showIcon: boolean;
}
