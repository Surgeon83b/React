import { PAGE_SIZE } from '@/components/constants.ts';

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
