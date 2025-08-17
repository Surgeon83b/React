import {POKEMON_ENDPOINT} from "@/constants.ts";
import {getQueryString} from "@/helpers.ts";
import type {Pokemon, PokemonBase,} from "@/types.ts";

export const fetchPokemons = async <T extends number>(page: T): Promise<PokemonBase[]> => {
  try {
    const query = getQueryString<string, number>('', page);
    const response = await fetch(`${POKEMON_ENDPOINT}${query}`);

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    return data.results as PokemonBase[];
  } catch(error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }

}

export const fetchPokemonInfo = async <T extends string>(id: T): Promise<Pokemon> => {
  const query = getQueryString<string, number>(id, 1);
  const response = await fetch(`${POKEMON_ENDPOINT}${query}`);

  const data: Pokemon = await response.json();
  return data;
}

export const fetchPokemon = async (name: string): Promise<Pokemon[]> => {
  const query = getQueryString<string, number>(name, 1);
  const response = await fetch(`${POKEMON_ENDPOINT}${query}`);

  const data: Pokemon = await response.json();
  return [data];
}