'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCoinIconUrl } from '@/utils/utils';
import Image from 'next/image';
import TypingTitle from '@/component/TypingTitle';
import { getValidatedCoin, getValidatedDays, getValidatedShowIcon, getValidatedTheme } from '@/utils/validation';

function HomePage() {
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartUrl, setChartUrl] = useState('');

  const coin = getValidatedCoin(searchParams.get('coin'));
  const days = getValidatedDays(searchParams.get('days')).toString();
  const theme = getValidatedTheme(searchParams.get('theme'));
  const showIcon = getValidatedShowIcon(searchParams.get('icon'));
  const title = `${coin.toUpperCase()} Price Chart`;

  useEffect(() => {
    const link =
      (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
      (document.createElement('link') as HTMLLinkElement);
    link.rel = 'icon';
    link.href = `/${coin}.ico`;
    document.head.appendChild(link);

    setChartUrl(`/api/charts?coin=${coin}&days=${days}&theme=${theme}&icon=${showIcon}&nonce=${generateNonce()}`);
  }, [coin, days, theme, showIcon]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
      <div className='flex items-center mb-6 space-x-2'>
        {isLoaded && <Image src={getCoinIconUrl(coin)} alt={`${coin.toUpperCase()} icon`} width={32} height={32} />}
        <TypingTitle title={title} />
      </div>

      <div className='w-[700px] h-[350px] overflow-hidden'>
        <Suspense fallback={<div>Loading chart...</div>}>
          {chartUrl && (
            <img
              src={chartUrl}
              alt={`${coin.toUpperCase()} Price Chart`}
              className={`w-full h-full object-cover ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default HomePage;

function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
