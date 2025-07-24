import type { Pokemon } from '@/types.ts';
import Card from '../Card.tsx';
import Spinner from '../Spinner.tsx';
import { PAGE_SIZE } from '@/components/constants.ts';
import { useSearchParams } from 'react-router';
import { useState } from 'react';

interface ResultProps {
  data: Array<Pokemon> | undefined;
  error: string;
}

export const Results = ({ data, error }: ResultProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Новое состояние
  const page = Number(searchParams.get('page')) || 1;

  if (!error && data?.length && !isDataLoaded) {
    setIsDataLoaded(true);
    if (!searchParams.has('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }

  if (!error && !data?.length) return <Spinner />;

  if (error) {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('page');
    setSearchParams(newParams, { replace: true });

    return <div>{error}</div>;
  }

  const maxPage = Math.ceil((data?.length ?? 0) / PAGE_SIZE);
  const dataPage = data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onNext = () => setSearchParams({ page: String(page + 1) });
  const onPrev = () => setSearchParams({ page: String(page - 1) });

  return (
    dataPage?.length && (
      <>
        Results
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <td className={'green'}>Name</td>
                <td className={'green'}>Description</td>
              </tr>
            </thead>
            <tbody>
              {dataPage.map((card) => (
                <Card
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
        <div className='flex centered-flex gap-16'>
          <button onClick={onPrev} disabled={page === 1}>
            {'<'}
          </button>
          {`Page ${page}`}
          <button onClick={onNext} disabled={page === maxPage}>
            {'>'}
          </button>
        </div>
      </>
    )
  );
};

export default Results;
