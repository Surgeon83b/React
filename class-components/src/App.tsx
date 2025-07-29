import { Router } from './routes/Router';
import { ThemeProvider } from '@/ThemeProvider.tsx';
import './App.css';
import type {ReactNode} from "react";

function AppWrapper(props: { children: ReactNode }) {
  return <div className={'wrapper'}>{props.children}</div>;
}

const App = () => {
  return (
    <ThemeProvider>
      <AppWrapper>
        <Router />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
