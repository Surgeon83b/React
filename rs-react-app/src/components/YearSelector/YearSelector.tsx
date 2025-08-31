import React, {memo, useCallback} from 'react';
import styles from './YearSelector.module.css';
import {useYearChangeAnimation} from "../../hooks/useYearChangeAnimation.ts";

interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onChange: (year: number) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export const YearSelector = memo(({
                                    years=[],
                                    selectedYear,
                                    onChange,
                                    className = '',
                                    label = 'Select Year',
                                    disabled = false
                                  }: YearSelectorProps) => {
  const selectRef = useYearChangeAnimation(selectedYear);

  const handleYearChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    if (!isNaN(year)) {
      onChange(year);
    }
  }, [onChange]);

  const handlePreviousYear = useCallback(() => {
    const currentIndex = years.indexOf(selectedYear);
    if (currentIndex > 0) {
      onChange(years[currentIndex - 1]);
    }
  }, [years, selectedYear, onChange]);

  const handleNextYear = useCallback(() => {
    const currentIndex = years.indexOf(selectedYear);
    if (currentIndex < years.length - 1) {
      onChange(years[currentIndex + 1]);
    }
  }, [years, selectedYear, onChange]);

  // Проверяем, есть ли предыдущий/следующий год
  const hasPreviousYear = years.indexOf(selectedYear) > 0;
  const hasNextYear = years.indexOf(selectedYear) < years.length - 1;

  if (years.length === 0) {
    return (
      <div className={`${styles.yearSelector} ${className}`}>
        <span className={styles.noYears}>No years available</span>
      </div>
    );
  }

  return (
    <div className={`${styles.yearSelector} ${className}`}>
      {label && (
        <label htmlFor="year-select" className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.controls}>
        <button
          type="button"
          onClick={handlePreviousYear}
          disabled={disabled || !hasPreviousYear}
          className={styles.navButton}
          aria-label="Previous year"
        >
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <select
          ref={selectRef}
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
          disabled={disabled}
          className={styles.select}
          aria-label="Select year"
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleNextYear}
          disabled={disabled || !hasNextYear}
          className={styles.navButton}
          aria-label="Next year"
        >
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      <div className={styles.yearInfo}>
        <span className={styles.yearRange}>
          {years[years.length - 1]} - {years[0]}
        </span>
      </div>
    </div>
  );
});

YearSelector.displayName = 'YearSelector';