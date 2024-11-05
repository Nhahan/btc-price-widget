import React from 'react';
import { ChartOptions, CoinDataPoint } from '@/types/types';
import { getCoinIconUrl, getCoinName } from '@/utils/utils';

type Props = {
  data: CoinDataPoint[];
  coinSymbol: string;
  days: number;
  options: ChartOptions;
};

export default function ChartComponent({ data, coinSymbol, days, options }: Props) {
  const { width, height, bgColor, lineColor, textColor, pointColor, showIcon } = options;
  const padding = { top: 50, right: 37, bottom: 35, left: 57 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxPrice = Math.max(...data.map((d) => d.price));
  const minPrice = Math.min(...data.map((d) => d.price));
  const priceRange = maxPrice - minPrice || 1;

  const pointsArray = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * chartWidth + padding.left;
    const y = padding.top + chartHeight - ((d.price - minPrice) / priceRange) * chartHeight;
    return { x, y };
  });

  const pathData = pointsArray.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const totalLength = pointsArray.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return 0;
    const prev = arr[idx - 1];
    return acc + Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));
  }, 0);

  const lastPrice = data[data.length - 1].price;
  const lastPoint = pointsArray[pointsArray.length - 1];
  const secondLastPoint = pointsArray[pointsArray.length - 2];

  const minYThreshold = height - padding.bottom - 10;
  const isLastPointLow = lastPoint.y > minYThreshold;

  const labelPaddingX = -30;
  let labelPaddingY = secondLastPoint.y < lastPoint.y ? 20 : -20;

  if (isLastPointLow && lastPoint.y >= secondLastPoint.y) {
    labelPaddingY = -5;
  }

  const titleText = `${getCoinName(coinSymbol)} Price Chart (${days} Days)`;

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
      <rect x='0' y='0' width='100%' height='100%' fill={bgColor} rx='4.5' />

      {/* Title */}
      <g transform={`translate(${(width - titleText.length * 10 - 30) / 2}, 35)`}>
        {showIcon && <image href={getCoinIconUrl(coinSymbol)} x='0' y='-20' width='24' height='24' />}
        <text x='30' y='0' textAnchor='start' fill={textColor} fontSize='20' fontWeight='600'>
          {titleText}
        </text>
      </g>

      {/* Price Line */}
      <path
        d={pathData}
        fill='none'
        stroke={lineColor}
        strokeWidth='2'
        strokeDasharray={totalLength}
        strokeDashoffset={totalLength}
      >
        <animate attributeName='stroke-dashoffset' from={totalLength} to='0' dur='2s' fill='freeze' />
      </path>

      {/* Points */}
      {data.length <= 50 &&
        pointsArray.map((p, idx) => (
          <circle key={idx} cx={p.x} cy={p.y} r='3' fill={pointColor}>
            <animate attributeName='opacity' from='0' to='1' dur='0.5s' begin='2s' fill='freeze' />
          </circle>
        ))}

      {/* X-axis Labels */}
      {pointsArray
        .filter((_, idx) => idx % Math.max(1, Math.floor(data.length / 7)) === 0)
        .map((p, idx) => (
          <text key={idx} x={p.x} y={height - padding.bottom + 20} textAnchor='middle' fill={textColor} fontSize='12'>
            {data[idx].date}
          </text>
        ))}

      {/* Y-axis Labels */}
      {[minPrice, (minPrice + maxPrice) / 2, maxPrice].map((price, idx) => (
        <g key={idx}>
          <text
            x={padding.left - 10}
            y={padding.top + (chartHeight - (idx * chartHeight) / 2)}
            textAnchor='end'
            fill={textColor}
            fontSize='12'
          >
            ${(price / 1000).toFixed(1)}k
          </text>
          <line
            x1={padding.left}
            y1={padding.top + (chartHeight - (idx * chartHeight) / 2)}
            x2={width - padding.right}
            y2={padding.top + (chartHeight - (idx * chartHeight) / 2)}
            stroke={textColor}
            strokeOpacity='0.2'
          />
        </g>
      ))}

      {/* Last Price Label */}
      <text x={lastPoint.x + labelPaddingX} y={lastPoint.y + labelPaddingY} fill={textColor} fontSize='12'>
        ${lastPrice.toFixed(2)}
      </text>
    </svg>
  );
}
