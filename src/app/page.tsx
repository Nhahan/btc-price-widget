'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateFakeCoinData, getCoinIconUrl } from '@/utils/utils';
import Image from 'next/image';
import TypingTitle from '@/component/TypingTitle';
import { getValidatedCoin, getValidatedDays, getValidatedShowIcon, getValidatedTheme } from '@/utils/validation';
import ChartComponent from '@/component/ChartComponent';
import { themes } from '@/types/theme';
import { CoinDataPoint } from '@/types/types';

function HomePage() {
  const searchParams = useSearchParams();
  const [coinData, setCoinData] = useState<CoinDataPoint[]>([]);

  const coin = getValidatedCoin(searchParams.get('coin'));
  const days = getValidatedDays(searchParams.get('days')).toString();
  const themeParam = getValidatedTheme(searchParams.get('theme'));
  const showIcon = getValidatedShowIcon(searchParams.get('icon'));
  const title = `${coin.toUpperCase()} Price Chart`;

  const options = {
    width: 700,
    height: 350,
    ...themes[themeParam],
    showIcon,
  };

  useEffect(() => {
    const data = generateFakeCoinData(parseInt(days, 10), 75000, 10000);
    setCoinData(data);
  }, [coin, days, themeParam, showIcon]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
      <div className='flex items-center mb-6 space-x-2'>
        <Image src={getCoinIconUrl(coin)} alt={`${coin.toUpperCase()} icon`} width={32} height={32} />
        <TypingTitle title={title} />
      </div>

      <div className='w-[700px] h-[350px] overflow-hidden'>
        {coinData.length > 0 && (
          <ChartComponent data={coinData} coinSymbol={coin} days={parseInt(days, 10)} options={options} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
