import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from './Results';
import type { Pokemon } from '../../types';

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
    it('should display loading spinner when data is undefined and no error', () => {
      render(<Results data={undefined} error="" />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when error exists', () => {
      const errorMessage = 'API request failed';
      render(<Results data={undefined} error={errorMessage} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    it('should not show table when error exists', () => {
      render(<Results data={[]} error="No results found" />);

      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('should render correct number of pokemon cards', () => {
      render(<Results data={mockPokemonData} error="" />);

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(3); // Header + 2 pokemons
    });

    it('should display all pokemon details correctly', () => {
      render(<Results data={mockPokemonData} error="" />);

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
      render(<Results data={[pokemonWithoutUrl]} error="" />);

      const expectedText = `id: ${pokemonWithoutUrl.id}, height: ${pokemonWithoutUrl.height}, weight: ${pokemonWithoutUrl.weight}`;
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });
});