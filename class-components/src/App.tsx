import './App.css';
import Results from './components/Results/Results.tsx';
import { useState } from 'react';
import type { SearchData } from './types.ts';
import { Search } from '@/components';
import { useSearchParams } from 'react-router';

const App = () => {
  const [data, setData] = useState<SearchData>([]);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = (newData: SearchData, err: string) => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams, { replace: true });
    setData(newData);
    setError(err);
  };

  const onSectionClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
  };

  return (
    <div className='flex wrapper full' onClick={onSectionClick}>
      <Search
        onSearch={onSearch}
        resetParams={() => {
          const newParams = new URLSearchParams();
          setSearchParams(newParams, { replace: true });
        }}
      />
      <Results data={data} error={error} />
    </div>
  );
};

export default App;
