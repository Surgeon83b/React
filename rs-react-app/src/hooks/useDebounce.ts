import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
