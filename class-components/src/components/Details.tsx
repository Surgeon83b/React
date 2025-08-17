'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Card from '@/components/Card.tsx';
import { useFetchPokemonInfo } from '@/api/queries.ts';
import { Spinner } from '@/components';

export const Details = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const detailsId = searchParams.get('details');

  const { data, error, isLoading } = useFetchPokemonInfo(detailsId || '');

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    router.push(`?${newParams.toString()}`);
  };

  if (!detailsId || error) return null;

  return (
    <div className='details-content'>
      {isLoading || !data ? (
        <Spinner />
      ) : (
        <>
          <Card {...data} />
          <button onClick={handleClose}>Close</button>
        </>
      )}
    </div>
  );
};
