import { COINS, REVALIDATE_INTERVAL } from '@/const/const';
import { NextRequest, NextResponse } from 'next/server';
import { generateChart } from '@/lib/generateChart';
import { fetchCoinData } from '@/lib/fetchCoinData';
import { CoinDataPoint, CoinSymbol } from '@/types/types';
import { Theme, themes } from '@/types/theme';
import { getValidatedCoin, getValidatedDays, getValidatedShowIcon, getValidatedTheme } from '@/utils/validation';

export const runtime = 'edge';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const { coinSymbol, days, theme, width, height, showIcon } = getValidatedParams(searchParams);

  try {
    const coinDataPoints = await fetchCoinData(coinSymbol);
    const coinData: CoinDataPoint[] = coinDataPoints.map(({ date, price }: CoinDataPoint) => ({
      date,
      price: +price.toFixed(COINS[coinSymbol].toFixed),
    }));

    if (coinData.length > 0) {
      const slicedData = coinData.slice(-days);
      const chart = generateChart(slicedData, coinSymbol, days, {
        width,
        height,
        ...theme,
        showIcon,
        toFixed: COINS[coinSymbol].toFixed,
      });

      return new NextResponse(chart, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': `public, s-maxage=${REVALIDATE_INTERVAL - 1}, stale-while-revalidate=${REVALIDATE_INTERVAL}`,
        },
      });
    }

    console.error(`No data available for coin symbol: ${coinSymbol}`);
    return new NextResponse(JSON.stringify({ error: `No data available for coin symbol: ${coinSymbol}` }), {
      status: 500,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating chart:', errorMessage);
    return new NextResponse(JSON.stringify({ error: `Failed to generate chart. Details: ${errorMessage}` }), {
      status: 500,
    });
  }
}

function getValidatedParams(searchParams: URLSearchParams): {
  coinSymbol: CoinSymbol;
  days: number;
  theme: Theme;
  width: number;
  height: number;
  showIcon: boolean;
} {
  const coinSymbol = getValidatedCoin(searchParams.get('coin'));
  const days = getValidatedDays(searchParams.get('days'));
  const themeParam = getValidatedTheme(searchParams.get('theme'));
  const theme = themes[themeParam];

  const width = parseInt(searchParams.get('width') || '', 10) || 700;
  const height = parseInt(searchParams.get('height') || '', 10) || 350;
  const showIcon = getValidatedShowIcon(searchParams.get('icon'));

  return { coinSymbol, days, theme, width, height, showIcon };
}
