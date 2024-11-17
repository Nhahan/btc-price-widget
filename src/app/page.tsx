'use client';

import { useEffect, useState } from 'react';
import Header from '@/component/header/header';
import HeroSection from '@/component/section/HeroSection';
import DemoSection from '@/component/section/DemoSection';
import FeaturesSection from '@/component/section/FeaturesSection';
import ParticlesBackground from '@/component/ParticlesBackground';
import { useTheme } from '@/provider/ThemeProvider';

export default function HomePage() {
  const { theme } = useTheme();
  const [dynamicHeight, setDynamicHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      setDynamicHeight(window.innerHeight * 3.05);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.bgColor,
        height: dynamicHeight || '305vh',
        transition: 'background-color 0.5s ease',
      }}
    >
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
