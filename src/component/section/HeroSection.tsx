import ParallaxSection from '../motion/ParallaxSection';
import FadeIn from '../motion/FadeIn';
import useRevealOnScroll from '@/hook/useRevealOnScroll';
import { useTheme } from '@/provider/ThemeProvider';

export default function HeroSection() {
  const { theme } = useTheme();
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
                  backgroundImage: `linear-gradient(135deg, ${theme.textColor} 0%, ${theme.lineColor} 20%, ${theme.textColor} 10%)`,
                  backgroundSize: '150% 100%',
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
