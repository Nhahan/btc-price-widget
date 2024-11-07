import { NextRequest, NextResponse } from 'next/server';

const themes = [
  '',
  'default',
  'sunset',
  'forest',
  'ocean',
  'pastel',
  'noir',
  'neon',
  'monochrome',
  'midnight',
  'sunrise',
  'retro',
  'cyberpunk',
  'grayscale',
  'candy',
  'light',
  'dark',
  'spring',
  'summer',
  'autumn',
  'winter',
];
const coins = ['', 'btc', 'eth'];

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authorizationHeader = request.headers.get('Authorization');

  if (authorizationHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const baseURL = 'https://btc-price-widget.vercel.app/api/charts';
  const logMessages: string[] = [];
  const startTime = Date.now(); // processing start time

  const requests = themes.flatMap((theme) =>
    coins.map(async (coin) => {
      const url = `${baseURL}${coin ? `?coin=${coin}` : ''}${theme ? `&theme=${theme}` : ''}`;
      try {
        await fetch(url);
        logMessages.push(`Precaching succeeded: ${url}`);
      } catch (error) {
        logMessages.push(`Failed to precache: ${url} - Error: ${error}`);
      }
    }),
  );

  await Promise.all(requests);

  const totalTime = (Date.now() - startTime) / 1000;
  logMessages.unshift(`Total precaching time: ${totalTime} seconds`);

  console.log(logMessages.join('\n'));

  return NextResponse.json({ message: 'Precaching completed', totalTime: `${totalTime} seconds` });
}
