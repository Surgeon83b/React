import { Suspense } from 'react';
import { Spinner } from '@/components/Spinner';
import { PokemonList } from '@/components/PokemonList';
import { Details, Modal } from '@/components';
import { fetchPokemons } from '@/api/fetchData.ts';

export default async function MainPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const initialPage = Number(searchParams.page) || 1;
  const initialPokemons = await fetchPokemons(initialPage);

  return (
    <div className='wrapper'>
      <Suspense fallback={<Spinner />}>
        <PokemonList initialData={initialPokemons} initialPage={initialPage}/>
      </Suspense>
      <Details />
      <Modal />
    </div>
  );
}
