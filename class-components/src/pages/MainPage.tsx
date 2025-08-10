import '../App.css';
import Results from '../components/Results/Results.tsx';
import { useState } from 'react';
import {Modal, Search} from '@/components';
import {useSearchParams} from "react-router";
import {usePokemonState} from "@/store/store.ts";

export const MainPage = () => {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const { isEmpty, clearItems } = usePokemonState();

  const onSearch = (value: string) => {
    clearItems();
    setSearch(value);
    setSearchParams({ page: '1' }, { replace: true });
  };

  const onSectionClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
  };

  return (
    <div className='flex wrapper full' onClick={onSectionClick}>
      <Search onSearch={onSearch} />
      <Results searchQuery={search} />
      <Modal open={!isEmpty()} />
    </div>
  );
};
