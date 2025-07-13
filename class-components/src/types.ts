export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type State = {
  search: string;
  data?: Pokemon[];
};
