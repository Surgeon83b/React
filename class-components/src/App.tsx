import './App.css';
import Search from './components/Search/Search.tsx';
import Results from './components/Results/Results.tsx';
import { useState } from 'react';
import type { SearchData } from './types.ts';
import { ErrorBoundary } from './components/ErrorBoundary';
import ErrorPage from './components/ErrorPage.tsx';

const App = () => {
  const [data, setData] = useState<SearchData>([]);
  const [error, setError] = useState('');

  const onSearch = (newData: SearchData, err: string) => {
    setData(newData);
    setError(err);
  };

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <div className='flex wrapper full'>
        <div className='info'>
          <Search onSearch={onSearch} placeholder={'Search'} />
          <Results data={data} error={error} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
