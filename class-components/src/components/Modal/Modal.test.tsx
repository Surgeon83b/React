import { render, screen, fireEvent, act } from '@testing-library/react';
import { usePokemonState } from '@/store/store.ts';
import { Results } from '../Results';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';

const mockPokemons = [
  {
    id: 1,
    name: 'Pikachu',
    description: 'Electric',
  },
  {
    id: 2,
    name: 'Bulbasaur',
    description: 'Grass',
  },
];

describe('Results Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  beforeEach(() => {
    usePokemonState.getState().clearItems();
    global.URL.createObjectURL = vi.fn();
    HTMLAnchorElement.prototype.click = vi.fn();
  });

  describe('Initial State', () => {
    it('should not show modal initially', () => {
      renderWithRouter(<Results data={mockPokemons} error='' />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Item Selection', () => {
    it('should toggle item selection when clicking checkboxes', () => {
      renderWithRouter(<Results data={mockPokemons} error='' />);
      const checkboxes = screen.getAllByRole('checkbox');

      expect(usePokemonState.getState().items).toEqual([]);

      fireEvent.click(checkboxes[0]);
      expect(usePokemonState.getState().items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: mockPokemons[0].id,
            name: mockPokemons[0].name,
          }),
        ])
      );

      fireEvent.click(checkboxes[0]);
      expect(usePokemonState.getState().items).toEqual([]);
    });

    it('should show modal when items are selected', () => {
      renderWithRouter(<Results data={mockPokemons} error='' />);

      act(() => {
        usePokemonState.getState().toggleItem(mockPokemons[0]);
      });

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should display correct count of selected items', () => {
      renderWithRouter(<Results data={mockPokemons} error='' />);

      act(() => {
        usePokemonState.getState().toggleItem(mockPokemons[0]);
        usePokemonState.getState().toggleItem(mockPokemons[1]);
      });

      expect(screen.getByText('2 item(s) selected')).toBeInTheDocument();
    });
  });

  describe('Download Functionality', () => {
    it('should enable download button when items are selected', () => {
      act(() => {
        usePokemonState.getState().toggleItem(mockPokemons[0]);
      });

      renderWithRouter(<Results data={mockPokemons} error='' />);
      expect(screen.getByRole('button', { name: /download/i })).toBeEnabled();
    });

    it('should trigger download when button clicked with items selected', () => {
      act(() => {
        usePokemonState.getState().toggleItem(mockPokemons[0]);
      });

      renderWithRouter(<Results data={mockPokemons} error='' />);
      fireEvent.click(screen.getByRole('button', { name: /download/i }));

      expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });
  });
});
