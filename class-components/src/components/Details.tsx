import { useSearchParams } from 'react-router';
import Spinner from '@/components/Spinner.tsx';
import Card from '@/components/Card.tsx';
import { useFetchPokemonInfo } from '@/api/queries.ts';

export const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const { data, error, isLoading } = useFetchPokemonInfo(detailsId || '');

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
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
