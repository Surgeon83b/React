import { MAX_PAGE_NUMBER } from '@/constants.ts';
import * as React from 'react';

type PaginatorProps = {
  page: number;
  onPrev: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Paginator = ({ page, onPrev, onNext }: PaginatorProps) => {
  return (
    <div className='flex centered-flex gap-16'>
      <button onClick={onPrev} disabled={page === 1}>
        {'<'}
      </button>
      {`Page ${page}`}
      <button onClick={onNext} disabled={page === MAX_PAGE_NUMBER}>
        {'>'}
      </button>
    </div>
  );
};
