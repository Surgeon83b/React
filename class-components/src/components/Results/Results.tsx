import ListCard from '../ListCard.tsx';
import Spinner from '../Spinner.tsx';
import * as React from 'react';
import './Results.css';
import { useFetchPokemon, useFetchPokemons } from '@/api/queries.ts';
import { extractIdFromUrl } from '@/helpers.ts';
import { useSearchParams } from 'react-router';
import {useEffect, useState} from 'react';
import Paginator from "@/components/Paginator/Paginator.tsx";

const Results = ({ searchQuery }: { searchQuery: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [lastSearchQuery, setLastSearchQuery] = useState(searchQuery);

  useEffect(() => {
    if (searchQuery !== lastSearchQuery) {
      setSearchParams({ page: '1' }, { replace: true });
      setLastSearchQuery(searchQuery);
    }
  }, [searchQuery, lastSearchQuery, setSearchParams]);

  const listQuery = useFetchPokemons(page);
  const itemQuery = useFetchPokemon(searchQuery);

  const { data, error, isFetching, refetch } = searchQuery ? itemQuery : listQuery;
  const showPagination = !searchQuery && data && data.length > 1;

  useEffect(() => {
    if (!searchQuery && data?.length && !searchParams.has('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [data, searchQuery, searchParams, setSearchParams]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data || isFetching) {
    return <Spinner />;
  }

  const onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchParams({ page: String(page + 1) });
  };

  const onPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchParams({ page: String(page - 1) });
  };

  return (
    <div className='results'>
      <button className='refresh' onClick={() => refetch()}>
        Refresh
      </button>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <td></td>
              <td className={'green'}>Name</td>
              <td className={'green'}>Description</td>
            </tr>
          </thead>
          <tbody>
            {data.map((card) => {
              const isPokemonType = 'id' in card;
              const id = isPokemonType
                ? String(card.id)
                : extractIdFromUrl(card?.url);
              return (
                <ListCard
                  key={id}
                  id={id}
                  name={card.name}
                  description={
                    isPokemonType
                      ? `id: ${card.id}, height: ${card.height}, weight: ${card.weight}`
                      : card.url
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
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </div>
  );
};

export default Results;
