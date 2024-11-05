import ParallaxSection from '../motion/ParallaxSection';
import FadeIn from '../motion/FadeIn';
import { themes } from '@/types/theme';
import useRevealOnScroll from '@/hook/useRevealOnScroll';

export default function HeroSection() {
  const theme = themes['default'];
  const { isRevealed, revealRef } = useRevealOnScroll();

  return (
    <ParallaxSection className='min-h-screen flex items-center justify-center relative overflow-hidden'>
      <div className='absolute inset-0 bg-grid opacity-10' />
      <div className='text-center z-10' style={{ color: theme.textColor }}>
        <FadeIn>
          <h1 ref={revealRef} className='text-6xl font-bold mb-6'>
            Crypto Chart Widget
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className='text-xl mb-8 opacity-90 relative inline-block overflow-hidden'>
            {isRevealed && (
              <span
                className='animate-shine bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent'
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.textColor} 20%, ${theme.lineColor} 60%, ${theme.textColor} 20%)`,
                  backgroundSize: '200% 100%',
                  color: theme.textColor,
                }}
              >
                Add updated cryptocurrency charts to your GitHub README
              </span>
            )}
          </p>
        </FadeIn>
      </div>
    </ParallaxSection>
  );
}
