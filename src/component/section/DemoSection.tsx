import { ChangeEvent, useEffect, useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';
import FadeIn from '../motion/FadeIn';
import ParallaxSection from '@/component/motion/ParallaxSection';
import TypingEffect from '@/component/TypingEffect';
import useRevealOnScroll from '@/hook/useRevealOnScroll';
import ChartComponent from '@/component/ChartComponent';
import { CoinDataPoint, CoinSymbol } from '@/types/types';
import { generateFakeCoinData } from '@/utils/utils';
import { COINS, DEFAULT_DAYS, VALID_COINS } from '@/const/const';
import { useTheme } from '@/provider/ThemeProvider';
import { themes } from '@/types/theme';

export default function DemoSection() {
  const { theme, themeName, setThemeName } = useTheme();
  const [copied, setCopied] = useState<boolean>(false);
  const [coinSymbol, setCoinSymbol] = useState<CoinSymbol>('btc');
  const [data, setData] = useState<CoinDataPoint[]>([]);

  const width: number = 640;
  const height: number = width / 2;

  useEffect(() => {
    const coinSettings = COINS[coinSymbol];
    const generatedData = generateFakeCoinData(
      DEFAULT_DAYS,
      coinSettings.basePrice,
      coinSettings.variation,
      coinSettings.rate,
      coinSettings.toFixed,
    );
    setData(generatedData);
  }, [coinSymbol]);

  const { isRevealed, revealRef } = useRevealOnScroll();

  const options = {
    width,
    height,
    bgColor: theme.bgColor,
    lineColor: theme.lineColor,
    textColor: theme.textColor,
    pointColor: theme.pointColor,
    showIcon: true,
    toFixed: COINS[coinSymbol].toFixed,
  };

  const markdownCode: string = `![Chart](https://btc-price-widget.vercel.app/api/charts?coin=${coinSymbol}&theme=${themeName})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownCode).then(() => setCopied(true));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'selectedTheme') {
      setThemeName(value as typeof themeName);
    } else if (name === 'coinSymbol') {
      setCoinSymbol(value as CoinSymbol);
    }
  };

  const inverted = invertColor(theme.bgColor);

  return (
    <ParallaxSection className='min-h-screen flex justify-center items-center overflow-hidden'>
      <div ref={revealRef} className='w-full max-w-[720px] mx-auto px-4'>
        <FadeIn>
          <h2 className='text-4xl font-bold mb-12 text-center' style={{ color: theme.textColor }}>
            {isRevealed && <TypingEffect text='Widget Demo' />}
          </h2>
        </FadeIn>
        <div className='flex flex-col gap-8'>
          <FadeIn>
            <div
              className='w-full p-6 rounded-lg'
              style={{
                backgroundColor: `rgba(${inverted.color}, ${inverted.opacity})`,
                transition: 'background-color 0.5s ease',
              }}
            >
              <div>
                {data.length > 0 && (
                  <ChartComponent data={data} coinSymbol={coinSymbol} days={DEFAULT_DAYS} options={options} />
                )}
              </div>
            </div>
          </FadeIn>

          {/* Customization Controls */}
          <FadeIn>
            <div
              className='w-full p-6 rounded-lg'
              style={{
                backgroundColor: `rgba(${inverted.color}, ${inverted.opacity})`,
                transition: 'background-color 0.5s ease',
              }}
            >
              <form className='grid grid-cols-2 gap-4'>
                {/* Coin Symbol Selection */}
                <div>
                  <label
                    htmlFor='coinSymbol'
                    className='block text-sm font-medium mb-1'
                    style={{ color: theme.textColor }}
                  >
                    Coin
                  </label>
                  <select
                    name='coinSymbol'
                    id='coinSymbol'
                    value={coinSymbol}
                    onChange={handleOptionChange}
                    className='w-full h-[36px] p-2 rounded'
                    style={{
                      backgroundColor: theme.bgColor,
                      color: theme.textColor,
                      border: `1px solid ${theme.textColor}`,
                    }}
                  >
                    {VALID_COINS.map((coin) => (
                      <option key={coin} value={coin}>
                        {coin.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Theme Selection */}
                <div>
                  <label
                    htmlFor='selectedTheme'
                    className='block text-sm font-medium mb-1'
                    style={{ color: theme.textColor }}
                  >
                    Theme
                  </label>
                  <select
                    name='selectedTheme'
                    id='selectedTheme'
                    value={themeName}
                    onChange={handleOptionChange}
                    className='w-full h-[36px] p-2 rounded'
                    style={{
                      backgroundColor: theme.bgColor,
                      color: theme.textColor,
                      border: `1px solid ${theme.textColor}`,
                    }}
                  >
                    {Object.keys(themes).map((themeName) => (
                      <option key={themeName} value={themeName}>
                        {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </FadeIn>

          {/* Markdown Code Copy */}
          <FadeIn>
            <div
              className='w-full p-6 rounded-lg'
              style={{
                backgroundColor: `rgba(${inverted.color}, ${inverted.opacity})`,
                transition: 'background-color 0.5s ease',
              }}
            >
              <h3 className='text-2xl font-bold mb-4' style={{ color: theme.textColor }}>
                Add to your README
              </h3>
              <div
                className='relative p-4 rounded-lg border'
                style={{
                  backgroundColor: theme.bgColor,
                  border: `1px solid ${theme.textColor}`,
                }}
              >
                <code
                  className='block text-sm truncate max-w-full overflow-hidden whitespace-nowrap pr-4'
                  style={{ color: theme.textColor }}
                >
                  {markdownCode}
                </code>
                <button
                  onClick={handleCopy}
                  className='absolute top-3 right-2 p-1 rounded hover:opacity-80 transition-opacity'
                  aria-label='Copy Markdown Code'
                >
                  {copied ? (
                    <CheckCircle2 size={18} color={theme.textColor} />
                  ) : (
                    <Copy size={18} color={theme.textColor} />
                  )}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </ParallaxSection>
  );
}

function invertColor(hex: string): { color: string; opacity: number } {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const r = 255 - parseInt(hex.slice(0, 2), 16);
  const g = 255 - parseInt(hex.slice(2, 4), 16);
  const b = 255 - parseInt(hex.slice(4, 6), 16);

  const color = `${r}, ${g}, ${b}`;
  const opacity = calculateOpacity(hex);
  return { color, opacity };
}

function calculateOpacity(hex: string): number {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  const opacity = 0.1 + (brightness / 255) * 0.4;
  return Math.max(0.1, Math.min(0.4, opacity));
}
