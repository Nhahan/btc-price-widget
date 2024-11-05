import { motion, useScroll, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';
import { themes } from '@/types/theme';

export default function Header() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const pointerEvents = useTransform(opacity, (value) => (value <= 0.1 ? 'none' : 'auto'));
  const theme = themes['default'];

  return (
    <motion.header
      style={{
        opacity,
        pointerEvents,
      }}
      className='fixed top-0 w-full bg-opacity-50 backdrop-blur-sm z-50'
    >
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div style={{ color: theme.lineColor }} className='text-xl font-bold'>
          Crypto Chart Widget
        </div>
        <motion.a
          href='https://github.com/Nhahan/btc-price-widget'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-2'
          style={{ color: theme.lineColor }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Github size={24} />
          <span>GitHub</span>
        </motion.a>
      </div>
    </motion.header>
  );
}
