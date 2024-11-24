import { ChangeEvent, useEffect, useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';
import FadeIn from '../motion/FadeIn';
import ParallaxSection from '@/component/motion/ParallaxSection';
import TypingEffect from '@/component/TypingEffect';
import useRevealOnScroll from '@/hook/useRevealOnScroll';
import ChartComponent from '@/component/ChartComponent';
import { CoinDataPoint, CoinSymbol } from '@/types/types';
import { generateFakeCoinData, invertColor } from '@/utils/utils';
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
    if (coinSettings) {
      const generatedData = generateFakeCoinData(
        DEFAULT_DAYS,
        coinSettings.basePrice,
        coinSettings.variation,
        coinSettings.rate,
        coinSettings.toFixed,
      );
      setData(generatedData);
    }
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

    if (name === 'selectedTheme' && value !== themeName) {
      setThemeName(value as typeof themeName);
    } else if (name === 'coinSymbol' && value !== coinSymbol) {
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
                  <ChartComponent
                    key={coinSymbol}
                    data={data}
                    coinSymbol={coinSymbol}
                    days={DEFAULT_DAYS}
                    options={options}
                  />
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
                    className='block text-sm font-bold mb-1'
                    style={{ color: theme.textColor }}
                  >
                    Coin
                  </label>
                  <div className='relative'>
                    <select
                      name='coinSymbol'
                      id='coinSymbol'
                      value={coinSymbol}
                      onChange={handleOptionChange}
                      className='w-full h-[36px] pl-2 pr-10 rounded appearance-none'
                      style={{
                        backgroundColor: theme.bgColor,
                        color: theme.textColor,
                        border: `1px solid ${theme.textColor}`,
                        lineHeight: 'normal',
                      }}
                    >
                      {VALID_COINS.map((coin) => (
                        <option key={coin} value={coin}>
                          {coin.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
                      <svg
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='none'
                        stroke={theme.textColor}
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <polyline points='6 8 10 12 14 8' />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Theme Selection */}
                <div>
                  <label
                    htmlFor='selectedTheme'
                    className='block text-sm font-bold mb-1'
                    style={{ color: theme.textColor }}
                  >
                    Theme
                  </label>
                  <div className='relative'>
                    <select
                      name='selectedTheme'
                      id='selectedTheme'
                      value={themeName}
                      onChange={handleOptionChange}
                      className='w-full h-[36px] pl-2 pr-10 rounded appearance-none'
                      style={{
                        backgroundColor: theme.bgColor,
                        color: theme.textColor,
                        border: `1px solid ${theme.textColor}`,
                        lineHeight: 'normal',
                      }}
                    >
                      {Object.keys(themes).map((themeName) => (
                        <option key={themeName} value={themeName}>
                          {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                        </option>
                      ))}
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
                      <svg
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='none'
                        stroke={theme.textColor}
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <polyline points='6 8 10 12 14 8' />
                      </svg>
                    </div>
                  </div>
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
                className='relative p-2 h-[36px] flex items-center rounded border'
                style={{
                  backgroundColor: theme.bgColor,
                  border: `1px solid ${theme.textColor}`,
                }}
              >
                <code
                  className='block text-sm truncate max-w-full overflow-hidden pr-4'
                  style={{ color: theme.textColor }}
                >
                  {markdownCode}
                </code>
                <button
                  onClick={handleCopy}
                  className='absolute top-1 right-1 p-1 rounded hover:opacity-80 transition-opacity'
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
