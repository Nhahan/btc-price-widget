import { NextRequest, NextResponse } from 'next/server';
import { generateChart } from '@/lib/generateChart';
import { fetchCoinData } from '@/lib/fetchCoinData';
import { REVALIDATE_INTERVAL } from '@/lib/config';
import { CoinSymbol } from '@/types/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const coinSymbol: CoinSymbol = searchParams.get('coin')?.toLowerCase() === 'eth' ? 'eth' : 'btc';
  const days = parseInt(searchParams.get('days') || '', 10);
  const validatedDays = days >= 7 && days <= 31 ? days : 30;

  const width = parseInt(searchParams.get('width') || '', 10) || 700;
  const height = parseInt(searchParams.get('height') || '', 10) || 350;
  const bgColor = searchParams.get('bg_color') || '#0d1117';
  const lineColor = searchParams.get('line_color') || '#58a6ff';
  const textColor = searchParams.get('text_color') || '#c9d1d9';
  const pointColor = searchParams.get('point_color') || '#f78166';
  const showIcon = searchParams.get('icon') !== 'false';

  try {
    const coinData = await fetchCoinData(coinSymbol);

    if (coinData.length === 0) {
      return NextResponse.json({ error: `Failed to fetch data for ${coinSymbol}.` }, { status: 500 });
    }

    const slicedData = coinData.slice(-validatedDays);

    const chart = generateChart(slicedData, coinSymbol, validatedDays, {
      width,
      height,
      bgColor,
      lineColor,
      textColor,
      pointColor,
      showIcon,
    });

    return new NextResponse(chart, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': `public, s-maxage=${REVALIDATE_INTERVAL}, stale-while-revalidate=43200`,
      },
    });
  } catch (error) {
    console.error('Error generating chart:', error);
    return NextResponse.json({ error: 'Failed to generate chart.' }, { status: 500 });
  }
}
