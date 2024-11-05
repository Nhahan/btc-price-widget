import FadeIn from '../motion/FadeIn';
import { themes } from '@/types/theme';
import ParallaxSection from '@/component/motion/ParallaxSection';

export default function FeaturesSection() {
  const theme = themes['default'];

  const features = [
    { title: 'Real-time Data', description: 'Live cryptocurrency price updates' },
    { title: 'Customizable', description: 'Multiple themes and display options' },
    { title: 'Easy Integration', description: 'Simple markdown integration for GitHub' },
    { title: 'Multiple Coins', description: 'Support for various cryptocurrencies' },
  ];

  return (
    <ParallaxSection className='h-screen flex items-center justify-center relative overflow-hidden w-full'>
      <div
        style={{
          backgroundColor: theme.bgColor,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <FadeIn>
          <h2 className='text-4xl font-bold mb-12 text-center' style={{ color: theme.textColor }}>
            Features
          </h2>
        </FadeIn>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className='p-6 rounded-lg h-full' style={{ backgroundColor: '#161b22' }}>
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
