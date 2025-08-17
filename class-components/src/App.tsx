import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ThemeProvider} from "./ThemeProvider.tsx";
import {Details} from "@/components";

function AppWrapper(props: { children: ReactNode }) {
  return <div className={'wrapper'}>{props.children}</div>;
}

const App = ( {children}: {children: React.ReactNode}) => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <AppWrapper>
        <QueryClientProvider client={queryClient}>
          {children}
          <Details />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppWrapper>

    </ThemeProvider>
  );
};

export default App;
