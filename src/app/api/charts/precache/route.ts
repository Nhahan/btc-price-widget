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
  const logMessages = [];

  for (const theme of themes) {
    for (const coin of coins) {
      const url = `${baseURL}${coin ? `?coin=${coin}` : ''}${theme ? `&theme=${theme}` : ''}`;
      try {
        await fetch(url);
        logMessages.push(`Precaching succeeded: ${url}`);
      } catch (error) {
        logMessages.push(`Failed to precache: ${url} - Error: ${error}`);
      }
    }
  }

  console.log(logMessages.join('\n'));

  return NextResponse.json({ message: 'Precaching completed' });
}
