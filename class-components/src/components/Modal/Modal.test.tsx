import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { vi } from 'vitest';
import type { UseQueryResult } from '@tanstack/react-query';
import { usePokemonState, type PokemonState } from '@/store/store';
import { Modal, Results } from '@/components';

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

vi.mock('./Spinner', () => ({
  default: () => <div data-testid='loading-spinner'>Loading...</div>,
}));

describe('Modal Component Tests', () => {
  const mockPokemons = [
    {
      id: '1',
      name: 'Pikachu',
      url: 'pokemon/1',
      description: 'Electric Pokémon',
    },
    {
      id: '2',
      name: 'Bulbasaur',
      url: 'pokemon/2',
      description: 'Grass Pokémon',
    },
  ];

  const queryClient = new QueryClient();
  const mockedUseQuery = vi.mocked(useQuery);
  let store: PokemonState;

  const renderComponent = (component: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{component}</MemoryRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    mockedUseQuery.mockReturnValue({
      data: mockPokemons,
      status: 'success',
      refetch: vi.fn(),
    } as unknown as UseQueryResult<typeof mockPokemons, Error>);

    store = usePokemonState.getState();
    store.clearItems();
    global.URL.createObjectURL = vi.fn();
    HTMLAnchorElement.prototype.click = vi.fn();
  });

  describe('Item Selection', () => {
    it('should toggle item selection when clicking checkboxes', async () => {
      renderComponent(<Results searchQuery="" />);

      await screen.findByRole('table');
      const checkboxes = await screen.findAllByRole('checkbox');

      expect(checkboxes).toHaveLength(mockPokemons.length);

      fireEvent.click(checkboxes[0]);

      expect(usePokemonState.getState().items).toEqual([
        expect.objectContaining({
          id: mockPokemons[0].id.toString(), // ID должен быть строкой
          name: mockPokemons[0].name,
          description: expect.any(String), // Описание может быть любым строковым значением
        }),
      ]);

      fireEvent.click(checkboxes[0]);

      expect(usePokemonState.getState().items).toEqual([]);
    });
  });

  describe('Download Functionality', () => {
    it('should show download button when items are selected', async () => {
      // 1. Устанавливаем начальное состояние с выбранным элементом
      usePokemonState.setState({
        items: [
          {
            id: '1',
            name: 'Pikachu',
            description: 'id: 1, height: 4, weight: 60',
          },
        ],
      });

      renderComponent(<Modal open={true} />);

      await screen.findByText((content) => {
        return content.includes('1 item(s) selected');
      });

      const downloadButton = await screen.findByRole('button', {
        name: /download/i,
      });
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton).toBeEnabled();
    });

    it('should trigger download when download button clicked', async () => {
      const mockDownload = vi.fn();
      vi.spyOn(
        usePokemonState.getState(),
        'downloadSelected'
      ).mockImplementation(mockDownload);

      usePokemonState.setState({
        items: [
          {
            id: '1',
            name: 'Pikachu',
            description: 'id: 1, height: 4, weight: 60',
          },
        ],
      });

      renderComponent(<Modal open={true} />);

      const downloadButton = await screen.findByRole('button', {
        name: 'Download',
      });

      fireEvent.click(downloadButton);
      expect(mockDownload).toHaveBeenCalledTimes(1);
    });
  });
});
