import { NextRequest, NextResponse } from 'next/server';
import { generateChart } from '@/lib/generateChart';
import { fetchCoinData } from '@/lib/fetchCoinData';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const coinParam = searchParams.get('coin')?.toLowerCase();
	const coin = coinParam === 'btc' || coinParam === 'eth' ? coinParam : 'btc';
	const days = parseInt(searchParams.get('days') || '', 10);
	const validatedDays = days >= 7 && days <= 31 ? days : 30;

	const coinMap: { [key: string]: string } = {
		btc: 'bitcoin',
		eth: 'ethereum',
	};

	const coinId = coinMap[coin];

	const width = parseInt(searchParams.get('width') || '', 10) || 700;
	const height = parseInt(searchParams.get('height') || '', 10) || 350;
	const bgColor = searchParams.get('bg_color') || '#0d1117';
	const lineColor = searchParams.get('line_color') || '#58a6ff';
	const textColor = searchParams.get('text_color') || '#c9d1d9';
	const pointColor = searchParams.get('point_color') || '#f78166';
	const showIcon = searchParams.get('icon') !== 'false';

	try {
		// Fetch coin data with caching
		const coinData = await fetchCoinData(coinId);

		if (coinData.length === 0) {
			return NextResponse.json(
				{ error: `Failed to fetch data for ${coin}.` },
				{ status: 500 }
			);
		}

		const slicedData = coinData.slice(-validatedDays);

		const chart = generateChart(slicedData, coin, validatedDays, {
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
				// Remove Cache-Control header to prevent caching the SVG itself
			},
		});
	} catch (error) {
		console.error('Error generating chart:', error);
		return NextResponse.json(
			{ error: 'Failed to generate chart.' },
			{ status: 500 }
		);
	}
}
