import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import { CoinDataPoint } from '@/types/types';
import { getValidatedCoin, getValidatedDays, getValidatedShowIcon, getValidatedTheme } from '@/utils/validation';
import { themes } from '@/types/theme';
import { generateFakeCoinData } from '@/utils/utils';
import ChartComponent from '@/component/ChartComponent';
import FadeIn from '@/component/motion/FadeIn';

export default function ChartSection() {
  const searchParams = useSearchParams();
  const [coinData, setCoinData] = useState<CoinDataPoint[]>([]);

  const coin = getValidatedCoin(searchParams.get('coin'));
  const days = getValidatedDays(searchParams.get('days')).toString();
  const themeParam = getValidatedTheme(searchParams.get('theme'));
  const showIcon = getValidatedShowIcon(searchParams.get('icon'));

  const options = {
    width: 668,
    height: 300,
    ...themes[themeParam],
    showIcon,
  };

  useEffect(() => {
    const data = generateFakeCoinData(parseInt(days, 10), 75000, 10000);
    setCoinData(data);
  }, [coin, days, themeParam, showIcon]);

  return (
    <FadeIn>
      <div className='flex items-center justify-center border border-[#30363d] rounded-lg'>
        {coinData.length > 0 && (
          <ChartComponent data={coinData} coinSymbol={coin} days={parseInt(days, 10)} options={options} />
        )}
      </div>
    </FadeIn>
  );
}
