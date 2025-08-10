import {type ChangeEvent} from 'react';
import useLocalStorage from '@/hooks/useLocalStorage.ts';
import './Search.css';

interface SearchProps {
  onSearch: (search: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const { search, setSearch, saveSearch } = useLocalStorage();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmedValue = search.trim();
    setSearch(trimmedValue);
    saveSearch(trimmedValue);
    if (onSearch) {
      onSearch(trimmedValue);
    }
  };

  return (
    <div className='flex space-between search'>
      <input
        placeholder={'Type pokemon name or leave field empty'}
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
