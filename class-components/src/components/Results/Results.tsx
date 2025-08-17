'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {extractIdFromUrl, getSearchParams, isPokemon} from '@/helpers';
import { Spinner, ListCard, Paginator } from '@/components';
import { useFetchPokemon, useFetchPokemons } from '@/api/queries';
import { keepPreviousData } from '@tanstack/react-query';
import type { Pokemon, PokemonBase } from '@/types';

interface ResultsProps {
  initialData?: Array<Pokemon | PokemonBase>;
  initialSearchQuery?: string;
  initialPage: number;
}

export const Results = ({
  initialData = [],
  initialSearchQuery = '',
  initialPage = 1,
}: ResultsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMounted, setIsMounted] = useState(false);
  const page = Number(searchParams?.get('page')) || initialPage;
  const searchQuery = searchParams?.get('search') || initialSearchQuery;
  const [lastSearchQuery, setLastSearchQuery] = useState(searchQuery);

  const shouldUseClientData = isMounted && typeof window !== 'undefined';

  const listQuery = useFetchPokemons(page, {
    enabled: shouldUseClientData && !searchQuery,
    placeholderData: keepPreviousData,
    initialData: !searchQuery ? initialData : undefined,
  });

  const itemQuery = useFetchPokemon(searchQuery, {
    enabled: shouldUseClientData && !!searchQuery,
    initialData: searchQuery && initialData.length > 0
      ? [initialData[0]]
      : undefined
  });

  const {
    data =initialData,
    error,
    isFetching,
    refetch,
  } = searchQuery ? itemQuery : listQuery;

  const params = getSearchParams(searchParams);
  const showPagination = !searchQuery && data.length > 1;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (searchQuery !== lastSearchQuery) {
      params.set('page', '1');
      params.set('search', searchQuery);
      router.replace(`${pathname}?${params.toString()}`);
      setLastSearchQuery(searchQuery);
    }
  }, [searchQuery, lastSearchQuery, pathname, router, searchParams, params]);

  const updatePage = (newPage: number) => {
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (error) {
    return <div className='error'>{error.message}</div>;
  }

  if (!data.length && isFetching && !initialData.length) {
    return <Spinner />;
  }

  return (
    <div className='results'>
      <button
        className='refresh'
        onClick={() => refetch()}
        aria-label='Refresh data'
      >
        Refresh
      </button>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='green'>Name</th>
              <th className='green'>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((card) => {
              const isPokemonInfo = isPokemon(card);
              const id = isPokemonInfo ? String(card.id) : extractIdFromUrl(card.url ?? '');

              return (
                <ListCard
                  key={id}
                  id={id}
                  name={card.name}
                  description={
                    isPokemonInfo
                      ? `id: ${card.id}, height: ${card.height}, weight: ${card.weight}`
                      : (card.url ?? '')
                  }
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <Paginator
          page={page}
          onPrev={() => updatePage(page - 1)}
          onNext={() => updatePage(page + 1)}
        />
      )}
    </div>
  );
};
