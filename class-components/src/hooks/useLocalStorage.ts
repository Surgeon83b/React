'use client';

import { useState, useEffect } from 'react';

interface FromLocalStorage {
  search: string;
  setSearch: (value: string) => void;
  saveSearch: (value: string) => void;
}

export const useLocalStorage = (): FromLocalStorage => {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setSearch(localStorage.getItem('search') || '');
  }, []);

  const saveSearch = (s: string) => {
    localStorage.setItem('search', s);
    setSearch(s);
  };

  return { search, setSearch, saveSearch };
};