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



export interface ListCardProps {
  id: string;
  name: string;
  description: string;
}

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type PokemonInfo = {
  name: string;
  url: string;
};

