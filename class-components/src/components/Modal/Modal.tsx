'use client';

import './Modal.css';
import { usePokemonState } from '@/store/store.ts';
import { memo, useEffect, useState } from 'react';

export const Modal = memo(() => {
  const { items, clearItems, downloadSelected, isEmpty } = usePokemonState();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [closeDuration, setCloseDuration] = useState('0.3s');

  useEffect(() => {
    const duration = getComputedStyle(document.documentElement)
      .getPropertyValue('--animation-duration')
      .trim() || '0.3s';
    setCloseDuration(duration);
  }, []);

  useEffect(() => {
    if (!isEmpty()) {
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
  }, [isEmpty(), closeDuration]);

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
