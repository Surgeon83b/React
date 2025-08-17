'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/ThemeProvider.tsx';
import {ErrorBoundary, ErrorPage} from "@/components";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppWrapper>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary
            fallback={<ErrorPage />}
            onReset={() => {
              queryClient.resetQueries()
            }}
          >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ErrorBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppWrapper>
    </ThemeProvider>
  );
}

export function AppWrapper({ children }: { children: ReactNode }) {
  return <div className='wrapper'>{children}</div>;
}
