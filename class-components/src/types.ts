export type Pokemon = {
  name: string;
  id: number;
  url?: string;
  height?: number;
  weight?: number;
  sprites?: {
    front_default: string;
  };
};

export type State = {
  search: string;
  data?: Pokemon[];
};

export type SearchData = Array<Pokemon> | undefined;

export type FetchData = {
  data: SearchData;
  error?: string;
};
