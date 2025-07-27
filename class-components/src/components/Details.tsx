import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner.tsx';
import { fetchData } from '@/api/fetch.ts';
import type { Pokemon } from '@/types.ts';
import { getQueryString } from '@/helpers.ts';
import Card from "@/components/Card.tsx";

export const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const [details, setDetails] = useState<Pokemon | null>(null);

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (detailsId) {
      const fetchDetails = async () => {
        const response = await fetchData(getQueryString(detailsId));
        if (response.data) setDetails(response.data[0]);
      };
      fetchDetails();
    }
  }, [detailsId]);

  if (!detailsId) return null;
  if (!details) return <Spinner />;

  return (
    <div className='details-content'>
      <Card {...details}/>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};
