export type Pokemon = {
  name: string;
  id?: string;
  url?: string;
  height?: number;
  weight?: number
};

export type State = {
  search: string;
  data?: Pokemon[];
};
