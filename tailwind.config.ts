import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        typing: {
          '0%': { width: '0%' },
          '99%': { width: '100%' },
          '100%': {  width: '100%', borderColor: 'transparent' },
        },
        'blink-caret': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.75s ease-in-out forwards',
        typing: 'typing 1.5s steps(15, end) forwards',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
