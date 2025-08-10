import { Router } from './routes/Router';
import { ThemeProvider } from '@/ThemeProvider.tsx';
import './App.css';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function AppWrapper(props: { children: ReactNode }) {
  return <div className={'wrapper'}>{props.children}</div>;
}

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <AppWrapper>
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppWrapper>

    </ThemeProvider>
  );
};

export default App;
