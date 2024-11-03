"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCoinIconUrl } from '@/utils/utils';
import Image from "next/image";

const VALID_COINS = ['btc', 'eth'];
const MIN_DAYS = 7;
const MAX_DAYS = 31;

function HomePage() {
  const searchParams = useSearchParams();
  const [coin, setCoin] = useState('btc');
  const [days, setDays] = useState('30');
  const [chartUrl, setChartUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const title = `${coin.toUpperCase()} Price Chart`;
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const coinParam = searchParams.get('coin');
    const daysParam = searchParams.get('days');

    setCoin(getValidatedCoin(coinParam));
    setDays(getValidatedDays(daysParam));

    document.title = title;
    const link =
      (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
      (document.createElement('link') as HTMLLinkElement);
    link.rel = 'icon';
    link.href = `/${coin}.ico`;
    document.getElementsByTagName('head')[0].appendChild(link);

    setChartUrl(
      `/api/charts?coin=${coin}&days=${days}&icon=false&nonce=${generateNonce()}`
    );
  }, [searchParams]);

  useEffect(() => {
    let index = -1;
    function typeCharacter() {
      if (index < title.length - 1) {
        setDisplayedTitle((prev) => prev + title[index]);
        index++;
        const randomDelay = Math.floor(Math.random() * 175) + 65;
        setTimeout(typeCharacter, randomDelay);
      } else {
        setShowCursor(false);
      }
    }
    typeCharacter();

    return () => clearInterval(100);
  }, [title]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex items-center mb-6 space-x-2">
        <Image
          src={getCoinIconUrl(coin)}
          alt={`${coin.toUpperCase()} icon`}
          width={32}
          height={32}
        />
        <h1 className="text-3xl font-bold inline-block whitespace-nowrap">
          {displayedTitle}
          <span
            className={`border-r-2 border-current animate-blink ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
        </h1>
      </div>

      <div className="w-[700px] h-[350px] overflow-hidden">
        {chartUrl && (
          <img
            src={chartUrl}
            alt={`${coin.toUpperCase()} Price Chart`}
            className={`w-full h-full object-cover ${
              isLoaded ? 'animate-fade-in' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;

function getValidatedCoin(coinParam?: string | null): string {
  return VALID_COINS.includes(coinParam || '') ? coinParam! : 'btc';
}

function getValidatedDays(daysParam?: string | null): string {
  return Math.min(
    Math.max(+daysParam! || 30, MIN_DAYS),
    MAX_DAYS
  ).toString();
}

function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
