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

export interface ListCardProps {
  id: number;
  name: string;
  description: string;
}

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};