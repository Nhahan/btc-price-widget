'use client';

import { themes } from '@/types/theme';
import Header from '@/component/header/header';
import HeroSection from '@/component/section/HeroSection';
import DemoSection from '@/component/section/DemoSection';
import FeaturesSection from '@/component/section/FeaturesSection';
import ParticlesBackground from '@/component/ParticlesBackground';

export default function HomePage() {
  const theme = themes['default'];

  return (
    <div style={{ backgroundColor: theme.bgColor, height: '305vh' }}>
      <Header />
      <ParticlesBackground />
      <div>
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
      </div>
    </div>
  );
}
