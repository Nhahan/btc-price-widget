'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';
import FadeIn from '../motion/FadeIn';
import { Theme, ThemeName, themes } from '@/types/theme';
import ParallaxSection from '@/component/motion/ParallaxSection';
import TypingEffect from '@/component/TypingEffect';
import useRevealOnScroll from '@/hook/useRevealOnScroll';
import ChartComponent from '@/component/ChartComponent';
import { CoinDataPoint } from '@/types/types';
import { generateFakeCoinData } from '@/utils/utils';

export default function DemoSection() {
  const [copied, setCopied] = useState<boolean>(false);

  // Fixed Coin Symbol to 'btc'
  const coinSymbol: string = 'btc';

  // State for customization options
  const [days, setDays] = useState<number>(30);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('default');

  // Fixed width and height
  const width: number = 640;
  const height: number = width / 2;

  // Generate fake data based on days
  const [data, setData] = useState<CoinDataPoint[]>([]);

  useEffect(() => {
    const generatedData = generateFakeCoinData(days);
    setData(generatedData);
  }, [days]);

  const { isRevealed, revealRef } = useRevealOnScroll();

  // Current Theme
  const currentTheme: Theme = themes[selectedTheme];

  const options = {
    width,
    height,
    bgColor: currentTheme.bgColor,
    lineColor: currentTheme.lineColor,
    textColor: currentTheme.textColor,
    pointColor: currentTheme.pointColor,
    showIcon: false, // Removed showCoinIcon, set to false
  };

  // Generate markdown code based on customization options
  const markdownCode: string = `![Crypto Chart](https://btc-price-widget.vercel.app/api/charts?coin=${coinSymbol}&theme=${selectedTheme})`;

  // Handle copying markdown code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(markdownCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle changes in customization options
  const handleOptionChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'days':
        setDays(Number(value));
        break;
      case 'selectedTheme':
        setSelectedTheme(value as ThemeName);
        break;
      default:
        break;
    }
  };

  return (
    <ParallaxSection className='min-h-screen flex justify-center items-center overflow-hidden'>
      <div ref={revealRef} className='w-full max-w-[720px] mx-auto px-4'>
        <FadeIn>
          <h2 className='text-4xl font-bold mb-12 text-center' style={{ color: currentTheme.textColor }}>
            {isRevealed && <TypingEffect text='Customize Your Crypto Chart Widget' />}
          </h2>
        </FadeIn>
        <div className='flex flex-col gap-8'>
          <FadeIn>
            <div className='w-full bg-[#161b22] p-6 rounded-lg'>
              {data.length > 0 && <ChartComponent data={data} coinSymbol={coinSymbol} days={days} options={options} />}
            </div>
          </FadeIn>

          {/* Customization Controls */}
          <FadeIn>
            <div className='w-full bg-[#161b22] p-6 rounded-lg'>
              <h3 className='text-2xl font-bold mb-4' style={{ color: currentTheme.textColor }}>
                Customization Options
              </h3>
              <form className='grid grid-cols-2 gap-4'>
                {/* Days Selection */}
                <div>
                  <label
                    htmlFor='days'
                    className='block text-sm font-medium mb-1'
                    style={{ color: currentTheme.textColor }}
                  >
                    Days
                  </label>
                  <input
                    type='number'
                    name='days'
                    id='days'
                    min='14'
                    max='31'
                    value={days}
                    onChange={handleOptionChange}
                    className='w-full h-[36px] p-2 bg-gray-800 text-white rounded'
                  />
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
                Markdown Code
              </h3>
              <div className='relative bg-gray-800 p-4 rounded-lg border border-gray-700'>
                <code className='block pb-2 text-sm text-white break-all'>{markdownCode}</code>
                <button
                  onClick={handleCopy}
                  className='absolute top-2 right-2 p-1 rounded hover:bg-gray-700 transition-colors'
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
