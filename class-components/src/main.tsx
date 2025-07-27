import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { NotFound } from '@/pages/NotFound.tsx';
import About from '@/pages/About.tsx';
import { Layout } from '@/components/Layout.tsx';
import { ErrorPage } from '@/components';
import { ErrorBoundary } from '@/components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<App />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
