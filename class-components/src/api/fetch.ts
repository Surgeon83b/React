import type { PokemonData } from '../types.ts';

export const fetchData = async (
  params: string
): Promise<{ data?: PokemonData; error?: string }> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: undefined };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      data: undefined,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
