import { NextRequest, NextResponse } from 'next/server';
import { generateChart } from '@/lib/generateChart';
import { fetchCoinData } from '@/lib/fetchCoinData';
import { REVALIDATE_INTERVAL } from '@/lib/config';
import { CoinSymbol } from '@/types/types';
import { themes } from '@/types/theme';
import { getValidatedCoin, getValidatedDays, getValidatedShowIcon, getValidatedTheme } from '@/utils/validation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const coinSymbol: CoinSymbol = getValidatedCoin(searchParams.get('coin')) as CoinSymbol;
  const validatedDays = getValidatedDays(searchParams.get('days'));
  const themeParam = getValidatedTheme(searchParams.get('theme'));
  const theme = themes[themeParam];

  const width = parseInt(searchParams.get('width') || '', 10) || 700;
  const height = parseInt(searchParams.get('height') || '', 10) || 350;
  const showIcon = getValidatedShowIcon(searchParams.get('icon'));

  try {
    const coinData = await fetchCoinData(coinSymbol);

    if (coinData.length === 0) {
      return NextResponse.json({ error: `Failed to fetch data for ${coinSymbol}.` }, { status: 500 });
    }

    const slicedData = coinData.slice(-validatedDays);

    const chart = generateChart(slicedData, coinSymbol, validatedDays, {
      width,
      height,
      ...theme,
      showIcon,
    });

    return new NextResponse(chart, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': `public, s-maxage=${REVALIDATE_INTERVAL}, stale-while-revalidate=28800`,
      },
    });
  } catch (error) {
    console.error('Error generating chart:', error);
    return NextResponse.json({ error: 'Failed to generate chart.' }, { status: 500 });
  }
}
