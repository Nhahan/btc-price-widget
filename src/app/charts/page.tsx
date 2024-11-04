'use client';

import { useEffect, useState } from 'react';
import SvgChartComponent from '@/component/SvgChartComponent';
import { ThemeName, themes } from '@/types/theme';
import { generateChart } from '@/lib/generateChart';
import { generateFakeCoinData } from '@/utils/utils';

export default function Pages() {
  const [displayedCharts, setDisplayedCharts] = useState<{ theme: ThemeName; svg: string }[]>([]);

  useEffect(() => {
    const coinData = generateFakeCoinData(30, 68000, 2000);

    const charts = (Object.keys(themes) as ThemeName[]).map((themeName) => {
      const theme = themes[themeName];
      const svg = generateChart(coinData, 'btc', 30, {
        width: 700,
        height: 350,
        bgColor: theme.bgColor,
        lineColor: theme.lineColor,
        textColor: theme.textColor,
        pointColor: theme.pointColor,
        showIcon: true,
      });
      return { theme: themeName, svg };
    });

    const renderChartsWithDelay = async () => {
      for (let i = 0; i < charts.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, i === 0 ? 0 : 275));
        setDisplayedCharts((prev) => [...prev, charts[i]]);
      }
    };

    renderChartsWithDelay();
  }, []);

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-900 text-white p-4'>
      <div className='p-8 space-y-6'>
        {displayedCharts.map((chart, index) => (
          <SvgChartComponent key={`${chart.theme}-${index}`} theme={chart.theme} svg={chart.svg} />
        ))}
      </div>
    </div>
  );
}
