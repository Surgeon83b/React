import { useContext } from 'react';
import { ThemeContext } from '@/context.ts';

export const ThemeToggle = () => {
  const value = useContext(ThemeContext);
  const { theme, toggleTheme } = value || {};

  return (
    <div className='flex row-right'>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
};
