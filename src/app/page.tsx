"use client";

import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {getCoinIconUrl} from "@/utils/utils";

const VALID_COINS = ['btc', 'eth'];
const MIN_DAYS = 7;
const MAX_DAYS = 31;

function HomePage() {
  const searchParams = useSearchParams();
  const [coin, setCoin] = useState('btc');
  const [days, setDays] = useState('30');
  const [chartUrl, setChartUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false); // 로딩 완료 상태 추가

  useEffect(() => {
    const coinParam = searchParams.get('coin');
    const daysParam = searchParams.get('days');

    setCoin(getValidatedCoin(coinParam));
    setDays(getValidatedDays(daysParam));

    document.title = `${coin.toUpperCase()} Price Chart`;
    const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement)
      || document.createElement('link') as HTMLLinkElement;
    link.rel = 'icon';
    link.href = `/${coin}.ico`;
    document.getElementsByTagName('head')[0].appendChild(link);

    setChartUrl(`/api/charts?coin=${coin}&days=${days}&icon=false&nonce=${generateNonce()}`);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex items-center mb-6 space-x-2">
        <img
          src={getCoinIconUrl(coin)}
          alt={`${coin.toUpperCase()} icon`}
          className="w-8 h-8"
        />
        <h1
          className="text-3xl font-bold inline-block overflow-hidden whitespace-nowrap border-r-2 border-current animate-typing animate-blink-caret">
          {coin.toUpperCase()} Price Chart
        </h1>
      </div>

      <div className="w-[700px] h-[350px] overflow-hidden">
        {chartUrl && (
          <img
            src={chartUrl}
            alt={`${coin.toUpperCase()} Price Chart`}
            className={`w-full h-full object-cover ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)} // 이미지 로드 완료 시 애니메이션 클래스 추가
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
  return Math.min(Math.max(+daysParam! || 30, MIN_DAYS), MAX_DAYS).toString();
}

function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
