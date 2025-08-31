import React, { memo, useCallback } from "react";
import styles from "./YearSelector.module.css";
import { useYearChangeAnimation } from "../../hooks/useYearChangeAnimation.ts";

interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onChange: (year: number) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export const YearSelector = memo(
  ({
    years = [],
    selectedYear,
    onChange,
    className = "",
    label = "Select Year",
    disabled = false,
  }: YearSelectorProps) => {
    const selectRef = useYearChangeAnimation(selectedYear);

    const handleYearChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(event.target.value, 10);
        if (!isNaN(year)) {
          onChange(year);
        }
      },
      [onChange],
    );

    const handlePreviousYear = useCallback(() => {
      const currentIndex = years.indexOf(selectedYear);
      if (currentIndex < years.length - 1) {
        onChange(years[currentIndex + 1]);
      }
    }, [years, selectedYear, onChange]);

    const handleNextYear = useCallback(() => {
      const currentIndex = years.indexOf(selectedYear);
      if (currentIndex < years.length - 1) {
        onChange(years[currentIndex - 1]);
      }
    }, [years, selectedYear, onChange]);

    const hasPreviousYear = years.indexOf(selectedYear) < years.length - 1;
    const hasNextYear = years.indexOf(selectedYear) > 0;

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
            {"<"}
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
            {years.map((year) => (
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
            {">"}
          </button>
        </div>

        <div className={styles.yearInfo}>
          <span className={styles.yearRange}>
            {years[years.length - 1]} - {years[0]}
          </span>
        </div>
      </div>
    );
  },
);

YearSelector.displayName = "YearSelector";
