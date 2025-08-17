'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/context.ts';

export const ThemeToggle = () => {
  const value = useContext(ThemeContext);
  const { theme, toggleTheme } = value || {};

  return (
    <button className='row-right' onClick={toggleTheme} >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};
