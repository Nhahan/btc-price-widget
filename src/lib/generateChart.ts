import { ChartOptions, CoinDataPoint, CoinSymbol } from '@/types/types';
import { getCoinIconUrl } from '@/utils/utils';
import { COINS } from '@/const/const';

export function generateChart(
  data: CoinDataPoint[],
  coinSymbol: CoinSymbol,
  days: number,
  options: ChartOptions,
): string {
  const { width, height, bgColor, lineColor, textColor, pointColor, showIcon } = options;
  const padding = { top: 50, right: 37, bottom: 35, left: 57 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const toFixed = options.toFixed || 2;

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

  const labelPaddingX = toFixed > 6 ? -36 : -28;
  let labelPaddingY = secondLastPoint.y < lastPoint.y ? 20 : -20;

  if (isLastPointLow && lastPoint.y >= secondLastPoint.y) {
    labelPaddingY = -5;
  }

  const titleText = `${COINS[coinSymbol as CoinSymbol].name} Chart (${days} Days)`;
  const titleX = (width - titleText.length * 10 - 30) / 2;

  const numLabels = Math.max(2, Math.floor(width / 100));
  const labelIndices = Array.from({ length: numLabels }, (_, i) =>
    Math.round((i * (data.length - 1)) / (numLabels - 1)),
  );

  const points =
    data.length <= 50
      ? pointsArray
          .map(
            (p) => `
      <circle 
        cx="${p.x}" 
        cy="${p.y}" 
        r="3" 
        fill="${pointColor}">
        <animate 
          attributeName="opacity" 
          from="0" 
          to="1" 
          dur="0.5s" 
          begin="2s" 
          fill="freeze" 
        />
      </circle>
    `,
          )
          .join('')
      : '';

  const xAxisLabels = labelIndices
    .map(
      (idx) => `
    <text
      x="${pointsArray[idx].x}"
      y="${height - padding.bottom + 20}"
      text-anchor="middle"
      fill="${textColor}"
      font-size="12"
    >${data[idx].date}</text>
  `,
    )
    .join('');

  const yAxisLabels = [minPrice, +((minPrice + maxPrice) / 2).toFixed(toFixed), maxPrice]
    .map((price, idx) => {
      const formattedPrice = price > 1000 ? (price / 1000).toFixed(toFixed) + 'k' : price.toFixed(toFixed); // ensures the decimal places match toFixed setting

      return `
      <g>
        <text
          x="${padding.left - 10 + toFixed ** 1.6}"
          y="${padding.top + (chartHeight - (idx * chartHeight) / 2)}"
          text-anchor="end"
          fill="${textColor}"
          font-size="12"
        >
          $${formattedPrice}
        </text>
        <line
          x1="${padding.left}"
          y1="${padding.top + (chartHeight - (idx * chartHeight) / 2)}"
          x2="${width - padding.right}"
          y2="${padding.top + (chartHeight - (idx * chartHeight) / 2)}"
          stroke="${textColor}"
          stroke-opacity="0.2"
        />
      </g>
    `;
    })
    .join('');

  // Combine all elements into final SVG
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect x="0" y="0" width="100%" height="100%" fill="${bgColor}" rx="4.5" />
      
      <g transform="translate(${titleX}, 35)">
        ${showIcon ? `<image href="${getCoinIconUrl(coinSymbol)}" x="0" y="-20" width="24" height="24" />` : ''}
        <text x="30" y="0" text-anchor="start" fill="${textColor}" font-size="20" font-weight="600">
          ${titleText}
        </text>
      </g>

      <path
        d="${pathData}"
        fill="none"
        stroke="${lineColor}"
        stroke-width="2"
        stroke-dasharray="${totalLength}"
        stroke-dashoffset="${totalLength}"
      >
        <animate 
          attributeName="stroke-dashoffset" 
          from="${totalLength}" 
          to="0" 
          dur="2s" 
          fill="freeze" 
        />
      </path>

      ${points}
      ${xAxisLabels}
      ${yAxisLabels}

      <text 
        x="${lastPoint.x + labelPaddingX}" 
        y="${lastPoint.y + labelPaddingY}" 
        fill="${textColor}" 
        font-size="12"
      >$${lastPrice.toFixed(toFixed)}</text>
    </svg>
  `.trim();
}
