import {getCoinIconUrl, getCoinName} from '@/utils/utils';
import {CoinDataPoint} from "@/types/types";

interface ChartOptions {
	width: number;
	height: number;
	bgColor: string;
	lineColor: string;
	textColor: string;
	pointColor: string;
	showIcon: boolean;
}

export const generateChart = (
	data: CoinDataPoint[],
	coinSymbol: string,
	days: number,
	options: ChartOptions
): string => {
	const width = options.width;
	const height = options.height;
	const padding = { top: 50, right: 30, bottom: 50, left: 60 };
	const chartWidth = width - padding.left - padding.right;
	const chartHeight = height - padding.top - padding.bottom;

	const bgColor = options.bgColor;
	const lineColor = options.lineColor;
	const textColor = options.textColor;
	const pointColor = options.pointColor;
	const showIcon = options.showIcon;

	const maxPrice = Math.max(...data.map((d) => d.price));
	const minPrice = Math.min(...data.map((d) => d.price));
	const priceRange = maxPrice - minPrice || 1;

	const pointsArray = data.map((d, i) => {
		const x = (i / (data.length - 1 || 1)) * chartWidth + padding.left;
		const y = padding.top + chartHeight - ((d.price - minPrice) / priceRange) * chartHeight;
		return { x, y };
	});

	const pathData = pointsArray
		.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
		.join(' ');

	const totalLength = pointsArray.reduce((acc, curr, idx, arr) => {
		if (idx === 0) return 0;
		const prev = arr[idx - 1];
		return acc + Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));
	}, 0);

	const animatePath = `
    <path
      d="${pathData}"
      fill="none"
      stroke="${lineColor}"
      stroke-width="2"
      ${totalLength > 0 ? `stroke-dasharray="${totalLength}" stroke-dashoffset="${totalLength}"` : ''}
    >
      ${
		totalLength > 0
			? `<animate attributeName="stroke-dashoffset" from="${totalLength}" to="0" dur="2s" fill="freeze" />`
			: ''
	}
    </path>
  `;

	const circles =
		data.length <= 50
			? pointsArray
				.map((p) => {
					return `
              <circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="3" fill="${pointColor}">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2s" fill="freeze" />
              </circle>
            `;
				})
				.join('')
			: '';

	const numLabels = Math.min(7, Math.max(4, Math.floor(data.length / 10) + 4));
	const labelIndices = Array.from({ length: numLabels }, (_, idx) =>
		Math.round((idx / (numLabels - 1 || 1)) * (data.length - 1))
	);

	const xLabels = labelIndices
		.map((i) => {
			const d = data[i];
			const x = (i / (data.length - 1 || 1)) * chartWidth + padding.left;
			const y = height - padding.bottom + 20;
			return `
        <text x="${x.toFixed(2)}" y="${y}" text-anchor="middle" fill="${textColor}" font-size="12">
          ${d.date}
        </text>
      `;
		})
		.join('');

	const yLabels = [minPrice, (minPrice + maxPrice) / 2, maxPrice]
		.map((price, i) => {
			const y = padding.top + (chartHeight - (i * chartHeight) / 2);
			return `
        <text x="${padding.left - 10}" y="${y}" text-anchor="end" fill="${textColor}" font-size="12">
          $${(price / 1000).toFixed(1)}k
        </text>
        <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="${textColor}" stroke-opacity="0.2" />
      `;
		})
		.join('');

	const coinIconUrl = getCoinIconUrl(coinSymbol);
	const coinName = getCoinName(coinSymbol);

	const titleText = `${coinName} Price Chart (${days} Days)`;
	const titleTextLength = titleText.length * 10;
	const titleGroupTransformX = (width - titleTextLength - (showIcon ? 30 : 0)) / 2;

	const lastPrice = data[data.length - 1].price;
	const lastPoint = pointsArray[pointsArray.length - 1];
	const secondLastPoint = pointsArray[pointsArray.length - 2];

	const labelPaddingX = -33;
	const labelPaddingY = secondLastPoint.y < lastPoint.y ? 20 : -20; // Avoid overlap with previous point

	const lastPriceX = Math.min(lastPoint.x + labelPaddingX, width - padding.right);
	const lastPriceY = lastPoint.y + labelPaddingY;

	const lastPriceLabel = `
    <text x="${lastPriceX}" y="${lastPriceY}" fill="${textColor}" font-size="12">
      $${lastPrice.toFixed(2)}
    </text>
  `;

	return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect x="0" y="0" width="100%" height="100%" fill="${bgColor}" rx="4.5" />

  <g transform="translate(${titleGroupTransformX}, 35)">
    ${
		showIcon
			? `<image href="${coinIconUrl}" x="0" y="-20" width="24" height="24" />
       <text x="30" y="0" text-anchor="start" fill="${textColor}" font-size="20" font-weight="600">${titleText}</text>`
			: `<text x="0" y="0" text-anchor="start" fill="${textColor}" font-size="20" font-weight="600">${titleText}</text>`
	}
  </g>

  ${yLabels}
  ${xLabels}
  ${animatePath}
  ${circles}
  ${lastPriceLabel}
  
</svg>
  `.trim();
};
