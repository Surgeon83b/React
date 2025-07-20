import type { Pokemon } from '../types.ts';

const POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

export const fetchData = async (
  params: string
): Promise<{ data?: Pokemon[]; error?: string }> => {
  try {
    const response = await fetch(`${POKEMON_ENDPOINT}${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data: ('results' in data) ? data.results : [data], error: undefined };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      data: undefined,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
