export type Pokemon = {
  name: string;
  id?: number;
  url?: string;
  height?: number;
  weight?: number
};

export type State = {
  search: string;
  data?: Pokemon[];
};
