'use client';

import { useEffect, useState } from 'react';
import { themes } from '@/types/theme';
import Header from '@/component/header/header';
import HeroSection from '@/component/section/HeroSection';
import DemoSection from '@/component/section/DemoSection';
import FeaturesSection from '@/component/section/FeaturesSection';
import ParticlesBackground from '@/component/ParticlesBackground';

export default function HomePage() {
  const theme = themes['default'];
  const [dynamicHeight, setDynamicHeight] = useState<number | null>(null); // 초기값을 null로 설정

  useEffect(() => {
    const updateHeight = () => {
      setDynamicHeight(window.innerHeight * 3.05);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div style={{ backgroundColor: theme.bgColor, height: dynamicHeight || '305vh' }}>
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
