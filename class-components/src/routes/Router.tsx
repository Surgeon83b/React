import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Layout } from '@/components/Layout.tsx';
import { MainPage, About, NotFound } from '@/pages';
import { RouterUrl } from '@/routes/routes.ts';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RouterUrl.Home} element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path={RouterUrl.About} element={<About />} />
      <Route path={RouterUrl.NotFound} element={<NotFound />} />
      <Route path='*' element={<Navigate to={RouterUrl.NotFound} replace />} />
    </Routes>
  </BrowserRouter>
);
