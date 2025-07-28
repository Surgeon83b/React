import type { Pokemon } from '@/types.ts';
import ListCard from '../ListCard.tsx';
import Spinner from '../Spinner.tsx';
import { PAGE_SIZE } from '@/components/constants.ts';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import * as React from 'react';

interface ResultProps {
  data: Array<Pokemon> | undefined;
  error: string;
}

export const Results = ({ data, error }: ResultProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (data?.length && !searchParams.has('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [data, searchParams, setSearchParams]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data || !data.length) {
    return <Spinner />;
  }

  const maxPage = Math.ceil((data?.length ?? 0) / PAGE_SIZE);
  const dataPage = data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchParams({ page: String(page + 1) });
  };
  const onPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchParams({ page: String(page - 1) });
  };

  return (
    <div className={'results'}>
      Results
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
            {dataPage.map((card) => (
              <ListCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={
                  card.url ??
                  `id: ${card.id}, height: ${card.height}, weight: ${card.weight}`
                }
              />
            ))}
          </tbody>
        </table>
      </div>
      {maxPage > 1 && (
        <div className='flex centered-flex gap-16'>
          <button onClick={onPrev} disabled={page === 1}>
            {'<'}
          </button>
          {`Page ${page}`}
          <button onClick={onNext} disabled={page === maxPage}>
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;
