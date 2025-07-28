import { Router } from './routes/Router';
import { ThemeProvider } from '@/ThemeProvider.tsx';

const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;
