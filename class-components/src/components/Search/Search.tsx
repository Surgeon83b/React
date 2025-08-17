'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Search = ({ initialSearchValue = '' }: { initialSearchValue?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearchValue);

  const handleSearch = () => {
    const trimmedValue = search.trim();
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', trimmedValue);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className='flex space-between search'>
      <input
        placeholder='Type pokemon name or leave field empty'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;