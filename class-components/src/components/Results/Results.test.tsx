import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from './Results3.tsx';
import type { Pokemon } from '@/types.ts';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as reactQuery from '@tanstack/react-query';
import { vi, type Mock } from 'vitest';

vi.mock('./Spinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>
}));

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual as object,
    useQuery: vi.fn(),
  };
});

describe('Results3 Component', () => {
  const mockPokemonData: Pokemon[] = [
    {
      id: 1,
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      height: 4,
      weight: 60,
    },
    {
      id: 2,
      name: 'Charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
      height: 17,
      weight: 905,
    },
  ];

  const queryClient = new QueryClient();
  const mockUseQuery = reactQuery.useQuery as Mock;

  const renderResults = (searchQuery = '', initialPage = '1') => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`?page=${initialPage}`]}>
          <Results searchQuery={searchQuery} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.resetAllMocks();
    mockUseQuery.mockReturnValue({
      data: undefined,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });
  });

  describe('Loading State', () => {
    test('should display loading spinner when isFetching is true', () => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        error: null,
        isFetching: true,
        refetch: vi.fn(),
      });

      renderResults();

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when error exists', () => {
      const errorMessage = 'API request failed';

      mockUseQuery.mockReturnValue({
        data: undefined,
        error: { message: errorMessage },
        isFetching: false,
        refetch: vi.fn(),
      });

      renderResults();

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    it('should not show table when error exists', () => {
      mockUseQuery.mockReturnValue({
        data: [],
        error: { message: 'No results found' },
        isFetching: false,
        refetch: vi.fn(),
      });

      renderResults();

      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('should render correct number of pokemon cards', () => {
      mockUseQuery.mockReturnValue({
        data: mockPokemonData,
        error: null,
        isFetching: false,
        refetch: vi.fn(),
      });

      renderResults();

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(3); // Header + 2 pokemons
    });

    it('should display all pokemon details correctly', () => {
      mockUseQuery.mockReturnValue({
        data: mockPokemonData,
        error: null,
        isFetching: false,
        refetch: vi.fn(),
      });

      renderResults();

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();

      mockPokemonData.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        const expectedDescription = `id: ${pokemon.id}, height: ${pokemon.height}, weight: ${pokemon.weight}`;
        expect(screen.getByText(expectedDescription)).toBeInTheDocument();
      });
    });

    it('should use url as description when pokemon type is not detected', () => {
      const pokemonWithoutType = {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      };

      mockUseQuery.mockReturnValue({
        data: [pokemonWithoutType],
        error: null,
        isFetching: false,
        refetch: vi.fn(),
      });

      renderResults();

      expect(screen.getByText(pokemonWithoutType.url)).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('should show pagination when there are multiple results and no search query', () => {
      const mockPaginationData = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Pokemon ${i + 1}`,
        url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
      }));

      mockUseQuery.mockReturnValue({
        data: mockPaginationData,
        error: null,
        isFetching: false,
        refetch: vi.fn(),
      });

      renderResults('', '1');

      expect(screen.getByRole('button', { name: />/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /</i })).toBeInTheDocument();
    });

    it('should not show pagination when there is a search query', () => {
      mockUseQuery.mockReturnValue({
        data: mockPokemonData,
        error: null,
        isFetching: false,
        refetch: vi.fn(),
      });

      renderResults('pikachu');

      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
    });

    it('should disable previous button on first page', () => {
      const mockPaginationData = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Pokemon ${i + 1}`,
        url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
      }));

      mockUseQuery.mockReturnValue({
        data: mockPaginationData,
        error: null,
        isFetching: false,
        refetch: vi.fn(),
      });

      renderResults('', '1');

      const prevButton = screen.getByRole('button', { name: /</i });
      expect(prevButton).toBeDisabled();
    });
  });
});
