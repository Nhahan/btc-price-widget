'use client';

import { useEffect, useRef, useState } from 'react';
import SvgChartComponent from '@/component/SvgChartComponent';
import { ThemeName, themes } from '@/types/theme';
import { generateChart } from '@/lib/generateChart';
import { generateFakeCoinData } from '@/utils/utils';
import { COINS, DEFAULT_DAYS } from '@/const/const';

export default function Pages() {
  const [displayedCharts, setDisplayedCharts] = useState<{ theme: ThemeName; svg: string }[]>([]);
  const addedThemes = useRef<Set<ThemeName>>(new Set());

  useEffect(() => {
    const charts = createChart();
    const renderChartsWithDelay = async () => {
      for (let i = 0; i < charts.length; i++) {
        const { theme, svg } = charts[i];

        if (!addedThemes.current.has(theme)) {
          addedThemes.current.add(theme);
          setDisplayedCharts((prev) => [...prev, { theme, svg }]);

          if (i !== 0) {
            await new Promise((resolve) => setTimeout(resolve, 333));
          }
        }
      }
    };

    renderChartsWithDelay();
  }, []);

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-900 text-white p-4'>
      <div className='p-8 space-y-6'>
        {displayedCharts.map((chart) => (
          <SvgChartComponent key={chart.theme} theme={chart.theme} svg={chart.svg} />
        ))}
      </div>
    </div>
  );
}

function createChart() {
  const coinData = generateFakeCoinData(DEFAULT_DAYS, 68000, 2000);

  return (Object.keys(themes) as ThemeName[]).map((themeName) => {
    const theme = themes[themeName];
    const svg = generateChart(coinData, 'btc', DEFAULT_DAYS, {
      width: 700,
      height: 350,
      bgColor: theme.bgColor,
      lineColor: theme.lineColor,
      textColor: theme.textColor,
      pointColor: theme.pointColor,
      showIcon: true,
      toFixed: COINS['btc'].toFixed,
    });
    return { theme: themeName, svg };
  });
}
