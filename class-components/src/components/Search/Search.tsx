import { type ChangeEvent } from 'react';
import { fetchData } from '@/api/fetch';
import type { SearchData } from '@/types';
import { getQueryString } from '@/helpers';
import useLocalStorage from '@/useLocalStorage.ts';

interface SearchProps {
  onSearch: (data: SearchData, error: string) => void;
  resetParams: () => void;
}

export const Search = ({ onSearch, resetParams }: SearchProps) => {
  const { search, setSearch, saveSearch } = useLocalStorage(handleSearch);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  function handleSearch(query: string) {
    const timerId = setTimeout(async () => {
      resetParams();
      onSearch([], '');
      try {
        const { data, error } = await fetchData(query);
        onSearch(data, error ?? '');
      } catch (err) {
        onSearch([], err instanceof Error ? err.message : 'Unknown error');
      }
    }, 500);

    return () => clearTimeout(timerId);
  }

  const handleClick = () => {
    const trimmedSearch = search.trim();
    setSearch(trimmedSearch);
    saveSearch(trimmedSearch);
    handleSearch(getQueryString(trimmedSearch));
  };

  return (
    <div className='flex space-between search'>
      <input
        placeholder={'Type pokemon name or leave field empty'}
        value={search}
        onChange={handleInputChange}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
