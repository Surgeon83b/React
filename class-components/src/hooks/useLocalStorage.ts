import { useState } from 'react';

type FromLocalStorage = {
  search: string;
  setSearch: (s: string) => void;
  saveSearch: (s: string) => void;
};

const UseLocalStorage = (): FromLocalStorage => {
  const [search, setSearch] = useState(
    () => localStorage.getItem('search') || ''
  );
  const saveSearch = (s: string) => localStorage.setItem('search', s);
  return { search, setSearch, saveSearch };
};

export default UseLocalStorage;
