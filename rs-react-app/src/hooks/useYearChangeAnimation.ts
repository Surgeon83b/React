import { useEffect, useRef } from 'react';

export const useYearChangeAnimation = (selectedYear: number) => {
  const prevYearRef = useRef<number>(selectedYear);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (prevYearRef.current !== selectedYear && selectRef.current) {
      // Добавляем класс анимации
      selectRef.current.classList.add('yearChanged');

      // Убираем класс после завершения анимации
      const timer = setTimeout(() => {
        if (selectRef.current) {
          selectRef.current.classList.remove('yearChanged');
        }
      }, 300);

      prevYearRef.current = selectedYear;

      return () => clearTimeout(timer);
    }
  }, [selectedYear]);

  return selectRef;
};