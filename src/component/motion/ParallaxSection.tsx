import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export default function ParallaxSection({ children, offset = 100, className = '' }: ParallaxSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, offset], [0, offset / 3]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
