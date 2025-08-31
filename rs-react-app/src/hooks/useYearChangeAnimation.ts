import { useEffect, useRef } from "react";

export const useYearChangeAnimation = (selectedYear: number) => {
  const prevYearRef = useRef<number>(selectedYear);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (prevYearRef.current !== selectedYear && selectRef.current) {
      selectRef.current.classList.add("yearChanged");

      const timer = setTimeout(() => {
        if (selectRef.current) {
          selectRef.current.classList.remove("yearChanged");
        }
      }, 300);

      prevYearRef.current = selectedYear;

      return () => clearTimeout(timer);
    }
  }, [selectedYear]);

  return selectRef;
};
