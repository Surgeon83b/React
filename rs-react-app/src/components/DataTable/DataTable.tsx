import React from 'react';
import type {YearlyData, DataField} from '../../utils/types';
import styles from './DataTable.module.css';

interface DataTableProps {
  data: YearlyData[];
  visibleColumns: DataField[];
  selectedYear?: number;
  onYearSelect?: (year: number) => void;
  className?: string;
}

export const DataTable = React.memo(({
                                       data,
                                       visibleColumns,
                                       selectedYear,
                                       onYearSelect,
                                       className = ''
                                     }: DataTableProps) => {
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => b.year - a.year); // Новейшие годы сначала
  }, [data]);

  const formatValue = (value: number | undefined): string => {
    if (value === undefined || value === null) return 'N/A';

    if (typeof value === 'number') {
      // Форматирование в зависимости от величины числа
      if (value === 0) return '0';
      if (Math.abs(value) < 0.001) return value.toExponential(2);
      if (Math.abs(value) < 1) return value.toFixed(3);
      if (Math.abs(value) < 10) return value.toFixed(2);
      if (Math.abs(value) < 1000) return value.toFixed(1);
      return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }

    return String(value);
  };

  const handleRowClick = (year: number) => {
    if (onYearSelect) {
      onYearSelect(year);
    }
  };

  if (data.length === 0) {
    return (
      <div className={`${styles.dataTable} ${className}`}>
        <div className={styles.empty}>No data available</div>
      </div>
    );
  }

  return (
    <div className={`${styles.dataTable} ${className}`}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.header}>
          <tr>
            <th className={styles.yearHeader}>Year</th>
            {visibleColumns.map(column => (
              <th key={column} className={styles.columnHeader}>
                {formatColumnName(column)}
              </th>
            ))}
          </tr>
          </thead>
          <tbody className={styles.body}>
          {sortedData.map((yearData) => (
            <tr
              key={yearData.year}
              className={`${styles.row} ${
                selectedYear === yearData.year ? styles.selectedRow : ''
              } ${onYearSelect ? styles.clickableRow : ''}`}
              onClick={() => handleRowClick(yearData.year)}
            >
              <td className={styles.yearCell}>{yearData.year}</td>
              {visibleColumns.map(column => (
                <td key={column} className={styles.dataCell}>
                  {formatValue(yearData[column])}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

// Вспомогательная функция для форматирования названий колонок
const formatColumnName = (column: string): string => {
  return column
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

DataTable.displayName = 'DataTable';