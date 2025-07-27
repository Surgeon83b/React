import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from './Results';
import type { Pokemon } from '@/types.ts';
import {MemoryRouter} from "react-router";

vi.mock('./Spinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>
}));

describe('Results Component', () => {
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

  describe('Loading State', () => {
    test('should display loading spinner when data is undefined and no error', () => {
      const { container } = render(
        <MemoryRouter>
          <Results data={undefined} error={''} />
        </MemoryRouter>
      );

      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when error exists', () => {
      const errorMessage = 'API request failed';
      render(<MemoryRouter><Results data={undefined} error={errorMessage} /></MemoryRouter>);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    it('should not show table when error exists', () => {
      render(<MemoryRouter><Results data={[]} error="No results found" /></MemoryRouter>);

      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('should render correct number of pokemon cards', () => {
      render(<MemoryRouter><Results data={mockPokemonData} error="" /></MemoryRouter>);

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(3); // Header + 2 pokemons
    });

    it('should display all pokemon details correctly', () => {
      render(<MemoryRouter><Results data={mockPokemonData} error="" /></MemoryRouter>);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();

      mockPokemonData.forEach(pokemon => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        const expectedDescription = pokemon.url
          ? pokemon.url
          : `id: ${pokemon.id}, height: ${pokemon.height}, weight: ${pokemon.weight}`;
        expect(screen.getByText(expectedDescription)).toBeInTheDocument();
      });
    });

    it('should use fallback description when url is missing', () => {
      const pokemonWithoutUrl = {
        ...mockPokemonData[0],
        url: undefined
      };
      render(<MemoryRouter><Results data={[pokemonWithoutUrl]} error="" /></MemoryRouter>);

      const expectedText = `id: ${pokemonWithoutUrl.id}, height: ${pokemonWithoutUrl.height}, weight: ${pokemonWithoutUrl.weight}`;
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });
});