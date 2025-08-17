import type {Pokemon, PokemonBase} from '@/types.ts';
import {
  keepPreviousData, queryOptions,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import {fetchPokemon, fetchPokemonInfo, fetchPokemons} from '@/api/fetchData.ts';
import {STALE_POKEMON_TIME} from "@/constants.ts";

const defaultOptions = {
  queries: {
    retry: false,
  },
}

export const useFetchPokemons = (
  page: number,
  options?: Partial<UseQueryOptions<PokemonBase[], Error>>
) => {
  const pokemonsQueryOptions = queryOptions({
    queryKey: ['pokemons', page],
    queryFn: () => fetchPokemons(page),
    staleTime: 0,
    ...defaultOptions,
    ...options,
    ...(options?.initialData ? { placeholderData: undefined } : { placeholderData: keepPreviousData })
  });

  return useQuery(pokemonsQueryOptions);
};

export const useFetchPokemonInfo = (id: string)=>{
  const pokemonQueryOptions = queryOptions({
    queryKey: ['pokemonInfo', id],
    queryFn: () => fetchPokemonInfo(id),
    enabled: !!id,
    placeholderData: keepPreviousData,
    staleTime: STALE_POKEMON_TIME,
    ...defaultOptions,
  });

  return useQuery(pokemonQueryOptions);
}

export const useFetchPokemon = (name: string, options?: Partial<UseQueryOptions<Pokemon[], Error>>)=>{
  const pokemonQueryOptions = queryOptions({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
    enabled: !!name,
    staleTime: 0,
    ...defaultOptions,
    ...options,
    ...(options?.initialData ? { placeholderData: undefined } : { placeholderData: keepPreviousData })
  });

  return useQuery(pokemonQueryOptions);
}
