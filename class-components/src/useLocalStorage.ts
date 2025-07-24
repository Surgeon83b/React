import { useState } from 'react';
import { getQueryString } from '@/helpers.ts';

type FromLocalStorage = {
  search: string;
  setSearch: (s: string) => void;
  saveSearch: () => void;
};

const UseLocalStorage = (
  handleSearch: (s: string) => void
): FromLocalStorage => {
  const [search, setSearch] = useState(() => {
    const savedSearch = localStorage.getItem('search') || '';
    handleSearch(getQueryString(savedSearch));
    return savedSearch;
  });

  const saveSearch = () => localStorage.setItem('search', search);

  return { search, setSearch, saveSearch };
};

export default UseLocalStorage;
