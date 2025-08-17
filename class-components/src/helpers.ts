import { PAGE_SIZE } from '@/components/constants.ts';
import { ReadonlyURLSearchParams } from 'next/navigation';
import type { Pokemon } from '@/types.ts';

export const getQueryString = <T extends string, K extends number>(
  searchValue: T,
  page: K
): string => {
  return searchValue
    ? `/${searchValue}`
    : `?limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`;
};

export const extractIdFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

export function isPokemon(item: unknown): item is Pokemon {
  return typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'height' in item &&
    'weight' in item;
}

export const getSearchParams = (searchParams: ReadonlyURLSearchParams | null) =>
  new URLSearchParams(Array.from(searchParams?.entries() ?? []));
