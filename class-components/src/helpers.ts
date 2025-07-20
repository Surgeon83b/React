export const getQueryString = (searchValue: string): string => {
  return searchValue ? `/${searchValue}` : '?limit=100&offset=0';
};