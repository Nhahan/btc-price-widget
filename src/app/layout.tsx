import './globals.css';
import { ReactNode, Suspense } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <title>Crypto Charts Widget</title>
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
