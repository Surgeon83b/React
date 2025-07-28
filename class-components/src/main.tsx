import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorPage } from '@/components';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {Router} from "@/routes/Router.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <Router/>
    </ErrorBoundary>
  </StrictMode>
);
