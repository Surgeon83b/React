import type { ListCardProps } from '@/types.ts';
import { create } from 'zustand/react';

type State = {
  items: ListCardProps[];
};

type Action = {
  isEmpty: () => boolean;
  toggleItem: (item: ListCardProps) => void;
  isSelected: (id: string) => boolean;
  clearItems: () => void;
  downloadSelected: () => void;
};

export type PokemonState = State & Action;

export const usePokemonState = create<State & Action>((set, get) => ({
  items: [],
  isEmpty: () => !get().items.length,
  toggleItem: (checkedItem) =>
    set((state) => {
      const isSelected = state.items.find((item) => item.id === checkedItem.id);
      return {
        items: isSelected
          ? state.items.filter((item) => item.id !== checkedItem.id)
          : [...state.items, checkedItem],
      };
    }),
  isSelected: (id: string) => get().items.some((item) => item.id === id),
  clearItems: () => set({ items: [] }),
  downloadSelected: () => {
    const { items } = get();
    if (items.length === 0) return;

    // Convert to CSV
    const headers = ['Id', 'Name', 'Description']; // Add more as needed
    const csvRows = [
      headers.join(','),
      ...items.map((item) =>
        [
          `"${item.id}"`,
          `"${item.name.replace(/"/g, '""')}"`,
          `"${item.description.replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${items.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  },
}));
