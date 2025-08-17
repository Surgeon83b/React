'use client';

import { useSearchParams } from 'next/navigation';
import { Results, Search } from '@/components';
import { useState, useEffect } from 'react';
import { fetchPokemon, fetchPokemons } from '@/api/fetchData.ts';
import type { Pokemon, PokemonBase } from '@/types.ts';

export function PokemonList({
  initialData = [],
  initialPage = 1,
}: {
  initialData?: Array<Pokemon | PokemonBase>;
  initialPage?: number;
}) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || initialPage;
  const searchQuery = searchParams.get('search') || '';

  const [data, setData] = useState<Array<Pokemon | PokemonBase>>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (page === initialPage && initialData.length > 0 && !searchQuery) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = searchQuery
          ? await fetchPokemon(searchQuery)
          : await fetchPokemons(page);
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [searchQuery, page, initialPage, initialData]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Search initialSearchValue={searchQuery} />
      <Results
        initialData={data}
        initialSearchQuery={searchQuery}
        initialPage={Number(page)}
      />
    </>
  );
}
