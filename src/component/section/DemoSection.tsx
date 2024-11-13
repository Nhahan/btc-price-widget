'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';
import FadeIn from '../motion/FadeIn';
import { Theme, ThemeName, themes } from '@/types/theme';
import ParallaxSection from '@/component/motion/ParallaxSection';
import TypingEffect from '@/component/TypingEffect';
import useRevealOnScroll from '@/hook/useRevealOnScroll';
import ChartComponent from '@/component/ChartComponent';
import { CoinDataPoint, CoinSymbol } from '@/types/types';
import { generateFakeCoinData } from '@/utils/utils';
import { COINS, DEFAULT_DAYS, VALID_COINS } from '@/const/const';

export default function DemoSection() {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('default');
  const [coinSymbol, setCoinSymbol] = useState<CoinSymbol>('btc');
  const [data, setData] = useState<CoinDataPoint[]>([]);

  const width: number = 640;
  const height: number = width / 2;

  useEffect(() => {
    const coinSettings = COINS[coinSymbol]; // 현재 선택된 코인 설정 가져오기
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

  const currentTheme: Theme = themes[selectedTheme];

  const options = {
    width,
    height,
    bgColor: currentTheme.bgColor,
    lineColor: currentTheme.lineColor,
    textColor: currentTheme.textColor,
    pointColor: currentTheme.pointColor,
    showIcon: true,
    toFixed: COINS[coinSymbol].toFixed, // 선택된 코인의 toFixed 설정 반영
  };

  const markdownCode: string = `![Chart](https://btc-price-widget.vercel.app/api/charts?coin=${coinSymbol}&theme=${selectedTheme})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownCode).then(() => setCopied(true));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'selectedTheme') {
      setSelectedTheme(value as ThemeName);
    } else if (name === 'coinSymbol') {
      setCoinSymbol(value as CoinSymbol);
    }
  };

  return (
    <ParallaxSection className='min-h-screen flex justify-center items-center overflow-hidden'>
      <div ref={revealRef} className='w-full max-w-[720px] mx-auto px-4'>
        <FadeIn>
          <h2 className='text-4xl font-bold mb-12 text-center' style={{ color: currentTheme.textColor }}>
            {isRevealed && <TypingEffect text='Widget Demo' />}
          </h2>
        </FadeIn>
        <div className='flex flex-col gap-8'>
          <FadeIn>
            <div className='w-full bg-[#161b22] p-6 rounded-lg'>
              {data.length > 0 && (
                <ChartComponent data={data} coinSymbol={coinSymbol} days={DEFAULT_DAYS} options={options} />
              )}
            </div>
          </FadeIn>

          {/* Customization Controls */}
          <FadeIn>
            <div className='w-full bg-[#161b22] p-6 rounded-lg'>
              <form className='grid grid-cols-2 gap-4'>
                {/* Coin Symbol Selection */}
                <div>
                  <label
                    htmlFor='coinSymbol'
                    className='block text-sm font-medium mb-1'
                    style={{ color: currentTheme.textColor }}
                  >
                    Coin
                  </label>
                  <select
                    name='coinSymbol'
                    id='coinSymbol'
                    value={coinSymbol}
                    onChange={handleOptionChange}
                    className='w-full h-[36px] p-2 bg-gray-800 text-white rounded'
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
                    style={{ color: currentTheme.textColor }}
                  >
                    Theme
                  </label>
                  <select
                    name='selectedTheme'
                    id='selectedTheme'
                    value={selectedTheme}
                    onChange={handleOptionChange}
                    className='w-full h-[36px] p-2 bg-gray-800 text-white rounded'
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
            <div className='w-full bg-[#161b22] p-6 rounded-lg'>
              <h3 className='text-2xl font-bold mb-4' style={{ color: currentTheme.textColor }}>
                Add to your README
              </h3>
              <div className='relative bg-gray-800 p-4 rounded-lg border border-gray-700'>
                <code className='block text-sm text-white truncate max-w-full overflow-hidden whitespace-nowrap pr-4'>
                  {markdownCode}
                </code>
                <button
                  onClick={handleCopy}
                  className='absolute top-3 right-2 p-1 rounded hover:bg-gray-700 transition-colors'
                  aria-label='Copy Markdown Code'
                >
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </ParallaxSection>
  );
}
