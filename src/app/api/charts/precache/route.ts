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

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authorizationHeader = request.headers.get('Authorization');

  if (authorizationHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const baseURL = 'https://btc-price-widget.vercel.app/api/charts/precache';

  for (const theme of themes) {
    for (const coin of coins) {
      const url = `${baseURL}${coin ? `?coin=${coin}` : ''}${theme ? `&theme=${theme}` : ''}`;
      try {
        console.log(`Precaching ${url}`);
        await fetch(url);
      } catch (error) {
        console.error(`Failed to precache ${url}`, error);
      }
    }
  }

  return NextResponse.json({ message: 'Precaching completed' });
}
