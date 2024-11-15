import { NextRequest, NextResponse } from 'next/server';
import { THEMES, VALID_COINS } from '@/const/const';

/**
 * Handles POST requests to precache chart data for all combinations of coins and themes.
 * Ensures that only authorized requests with the correct cron secret are processed.
 * @param request NextRequest object containing the request details
 * @returns NextResponse indicating the result of the precaching operation
 */
export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authorizationHeader = request.headers.get('Authorization');

  if (authorizationHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const baseURL = 'https://btc-price-widget.vercel.app/api/charts';
  const logMessages: string[] = [];
  const startTime = Date.now();

  // Generate all URL combination caches
  const requests = THEMES.flatMap((theme) =>
    VALID_COINS.map(async (coin) => {
      const params = new URLSearchParams();
      if (coin) params.set('coin', coin);
      if (theme) params.set('theme', theme);

      const url = `${baseURL}?${params.toString()}`;
      try {
        await fetch(url);
        logMessages.push(`Precaching succeeded: ${url}`);
      } catch (error) {
        logMessages.push(`Failed to precache: ${url} - Error: ${error}`);
      }
    }),
  );

  // Execute all fetch requests concurrently
  await Promise.all(requests);

  const totalTime = (Date.now() - startTime) / 1000;
  logMessages.unshift(`Total precaching time: ${totalTime} seconds`);

  console.log(logMessages.join('\n'));

  return NextResponse.json({ message: 'Precaching completed', totalTime: `${totalTime} seconds` });
}
