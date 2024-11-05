import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './Components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '50%': { 'border-color': 'transparent' },
        },
        shine: {
          '0%': { backgroundPosition: '100% 0', color: 'currentColor' },
          '50%': { color: 'transparent' },
          '100%': { backgroundPosition: '-100% 0', color: 'currentColor' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.75s ease-in-out forwards',
        blink: 'blink 0.7s step-end infinite',
        shine: 'shine 0.75s ease-in-out 1s forwards',
      },
    },
  },
  plugins: [],
};

export default config;
