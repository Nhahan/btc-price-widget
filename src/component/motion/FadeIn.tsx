import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollDirection } from '@/hook/useScrollDirection';

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export default function FadeIn({ children, delay = 0, duration = 0.5, className = '' }: Props) {
  const scrollDirection = useScrollDirection();

  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[scrollDirection] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
