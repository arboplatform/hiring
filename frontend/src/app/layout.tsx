import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Shell } from '@src/components/Shell';

library.add(fas);
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Imóveis',
    default: 'Imóveis',
  },
  description: 'Veja seus imóveis listados!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <Notifications position="top-right" zIndex={1000} />
          <Shell>{children}</Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
