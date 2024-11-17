import './globals.css';
import { ReactNode, Suspense } from 'react';
import ThemeProvider from '@/provider/ThemeProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <title>Crypto Chart Widget</title>
      </head>
      <body>
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
