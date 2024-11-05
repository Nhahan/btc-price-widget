import ParallaxSection from '../motion/ParallaxSection';
import FadeIn from '../motion/FadeIn';
import { themes } from '@/types/theme';

export default function HeroSection() {
  const theme = themes['default'];

  return (
    <ParallaxSection className='min-h-screen flex items-center justify-center relative overflow-hidden'>
      <div className='absolute inset-0 bg-grid opacity-10' />
      <div className='text-center z-10' style={{ color: theme.textColor }}>
        <FadeIn>
          <h1 className='text-6xl font-bold mb-6'>Crypto Charts Widget</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className='text-xl mb-8 opacity-90'>Add live cryptocurrency price charts to your GitHub README</p>
        </FadeIn>
      </div>
    </ParallaxSection>
  );
}
