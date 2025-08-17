'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, type KeyboardEvent } from 'react';
import {useLocalStorage} from "@/hooks/useLocalStorage.ts";

const Search3 = () => {
  const router = useRouter();
  const { search, setSearch, saveSearch } = useLocalStorage();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmedValue = search.trim();
    setSearch(trimmedValue);
    saveSearch(trimmedValue);

    const params = new URLSearchParams(window.location.search);
    params.set('search', trimmedValue);
    params.set('page', '1'); // Сброс пагинации при новом поиске
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className='flex space-between search'>
      <input
        placeholder='Type pokemon name or leave field empty'
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search3;