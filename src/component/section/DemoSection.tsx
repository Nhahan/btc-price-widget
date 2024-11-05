import { useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';
import FadeIn from '../motion/FadeIn';
import { themes } from '@/types/theme';
import ChartSection from '@/component/section/ChartSection';
import ParallaxSection from '@/component/motion/ParallaxSection';
import TypingEffect from '@/component/TypingEffect';
import useRevealOnScroll from '@/hook/useRevealOnScroll';

export default function DemoSection() {
  const [copied, setCopied] = useState(false);
  const theme = themes['default'];
  const markdownCode = `![Crypto Chart](https://btc-price-widget.vercel.app/api/charts)`;
  const { isRevealed, revealRef } = useRevealOnScroll();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ParallaxSection className='min-h-screen flex items-center justify-center relative overflow-hidden w-full'>
      <div ref={revealRef}>
        <FadeIn>
          <h2 className='text-4xl font-bold mb-12 text-center' style={{ color: theme.textColor }}>
            {isRevealed && <TypingEffect text='Live Demo' />}
          </h2>
        </FadeIn>
        <FadeIn>
          <div className='rounded-lg p-6 mb-12' style={{ color: theme.textColor, backgroundColor: '#161b22' }}>
            {isRevealed && <ChartSection />}
          </div>
        </FadeIn>
        <FadeIn>
          <div className='bg-[#161b22] rounded-lg p-6'>
            <h3 className='text-2xl font-bold mb-4' style={{ color: theme.textColor }}>
              Add to your README
            </h3>
            <div className='p-4 rounded-lg relative bg-[#161b22] border border-[#30363d]'>
              <code className='block pb-2' style={{ color: theme.textColor }}>
                {markdownCode}
              </code>
              <button
                onClick={handleCopy}
                className='absolute top-3 right-3 p-1.5 rounded hover:bg-[#1f2428] transition-colors'
                style={{ color: theme.lineColor }}
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </ParallaxSection>
  );
}
