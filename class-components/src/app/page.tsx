import { fetchPokemon, fetchPokemons } from '@/api/fetchData.ts';
import { Results } from '@/components/Results/Results.tsx';
import { Details, Modal, Search } from '@/components';

export default async function MainPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || '';

  const initialData = searchQuery
    ? [await fetchPokemon(searchQuery).catch(() => [])]
    : await fetchPokemons(page).catch(() => []);

  return (
    <div className='wrapper'>
      <Search initialSearchValue={searchQuery} />
      <Results
        initialData={initialData}
        initialSearchQuery={searchQuery}
        initialPage={page}
      />
      <Details />
      <Modal />
    </div>
  );
}
