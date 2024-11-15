import { COINS } from '@/const/const';

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

export type CoinSymbol = keyof typeof COINS;
export type CoinName = (typeof COINS)[CoinSymbol]['id'];

export interface ChartOptions {
  width: number;
  height: number;
  bgColor: string;
  lineColor: string;
  textColor: string;
  pointColor: string;
  showIcon: boolean;
  toFixed: number;
}
