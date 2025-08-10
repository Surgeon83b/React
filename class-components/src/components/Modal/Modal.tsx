import './Modal.css';
import { usePokemonState } from '@/store/store.ts';
import {memo, useEffect, useState} from 'react';

export const Modal = memo(({ open }: { open: boolean }) => {
  const { items, clearItems, downloadSelected } = usePokemonState();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(open);

  const closeDuration = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--animation-duration');

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      setIsAnimatingOut(false);
    } else {
      setIsAnimatingOut(true);
      const timer = setTimeout(
        () => {
          setIsMounted(false);
        },
        parseFloat(closeDuration) * 1000
      );

      return () => clearTimeout(timer);
    }
  }, [open, closeDuration]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`popup-bottom-sheet ${isAnimatingOut ? 'closed' : ''}`}
      onClick={(e) => e.stopPropagation()}
      role='dialog'
    >
      <div className='popup-content'>
        <h4>{`${items.length} item(s) selected`}</h4>
        <div className='flex gap-16 row-centered'>
          <button onClick={clearItems}>UnselectAll</button>
          <button onClick={downloadSelected}>Download</button>
        </div>
      </div>
    </div>
  );
});
