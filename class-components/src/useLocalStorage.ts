import { useState } from 'react';
import { getQueryString } from '@/helpers.ts';

type FromLocalStorage = {
  search: string;
  setSearch: (s: string) => void;
  saveSearch: (s: string) => void;
};

const UseLocalStorage = (
  handleSearch: (s: string) => void
): FromLocalStorage => {
  const [search, setSearch] = useState(() => {
    const savedSearch = localStorage.getItem('search') || '';
    handleSearch(getQueryString(savedSearch));
    return savedSearch;
  });

  const saveSearch = (s: string) => localStorage.setItem('search', s);

  return { search, setSearch, saveSearch };
};

export default UseLocalStorage;
