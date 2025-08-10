import type { PokemonInfo} from '@/types.ts';
import {
  keepPreviousData, queryOptions,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import {fetchPokemon, fetchPokemonInfo, fetchPokemons} from '@/api/fetchData.ts';
import {STALE_POKEMON_TIME, STALE_POKEMONS_TIME} from "@/constants.ts";

const defaultOptions = {
  queries: {
    retry: false, // Отключает повторы для всех запросов
  },
}

export const useFetchPokemons = (
  page: number,
  options?: UseQueryOptions<PokemonInfo[], Error>
) => {
  const pokemonsQueryOptions = queryOptions({
    queryKey: ['pokemons', page],
    queryFn: () => fetchPokemons(page),
    staleTime: STALE_POKEMONS_TIME,
    placeholderData: keepPreviousData,
    ...defaultOptions,
    ...options
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

export const useFetchPokemon = (name: string)=>{
  const pokemonQueryOptions = queryOptions({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
    enabled: !!name,
    placeholderData: keepPreviousData,
    staleTime: 0,
    ...defaultOptions,
  });

  return useQuery(pokemonQueryOptions);
}
