import '@workspace/ui/globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { Providers } from '@/components/providers';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>
          <main className="mx-auto max-w-4xl p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
