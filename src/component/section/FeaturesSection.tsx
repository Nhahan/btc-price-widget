import FadeIn from '../motion/FadeIn';
import ParallaxSection from '@/component/motion/ParallaxSection';
import TypingEffect from '@/component/TypingEffect';
import useRevealOnScroll from '@/hook/useRevealOnScroll';
import { useTheme } from '@/provider/ThemeProvider';
import { invertColor } from '@/utils/utils';

export default function FeaturesSection() {
  const { theme } = useTheme();
  const { isRevealed, revealRef } = useRevealOnScroll();

  const features = [
    { title: 'Updated Data', description: 'Timely cryptocurrency price updates' },
    { title: 'Customizable', description: 'Multiple themes and display options' },
    { title: 'Easy Integration', description: 'Simple markdown integration for GitHub' },
    { title: 'Multiple Coins', description: 'Support for various cryptocurrencies' },
  ];

  const inverted = invertColor(theme.bgColor);

  return (
    <ParallaxSection className='h-screen flex items-center justify-center relative overflow-hidden w-full'>
      <div ref={revealRef}>
        <FadeIn>
          <h2 className='text-4xl font-bold mb-12 text-center' style={{ color: theme.textColor }}>
            {isRevealed && <TypingEffect text='Features' />}
          </h2>
        </FadeIn>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className='p-6 rounded-lg h-full'
                style={{
                  backgroundColor: `rgba(${inverted.color}, ${inverted.opacity})`,
                  transition: 'background-color 0.5s ease',
                }}
              >
                <h3 className='text-xl font-bold mb-2' style={{ color: theme.lineColor }}>
                  {feature.title}
                </h3>
                <p style={{ color: theme.textColor }}>{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
