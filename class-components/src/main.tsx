import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorPage } from '@/components';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import App from "@/App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
        <App/>
    </ErrorBoundary>
  </StrictMode>
);
