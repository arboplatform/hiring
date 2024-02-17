'use client';

import { Header } from './Header';

import { AppShell, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

export const Shell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const HEADER_HEIGHT = 80;
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: HEADER_HEIGHT, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <Header />
      <AppShell.Main
        pt={`calc(${rem(HEADER_HEIGHT)} + var(--mantine-spacing-md))`}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
