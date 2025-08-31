import { useState, useCallback } from 'react';
import type {DataField} from '../utils/types';

export const useColumnSelection = (initialColumns: DataField[] = ['population', 'co2', 'co2_per_capita']) => {
  const [visibleColumns, setVisibleColumns] = useState<DataField[]>(initialColumns);

  const toggleColumn = useCallback((column: DataField, isVisible: boolean) => {
    setVisibleColumns(prev =>
      isVisible
        ? [...prev, column]
        : prev.filter(col => col !== column)
    );
  }, []);

  const resetColumns = useCallback(() => {
    setVisibleColumns(initialColumns);
  }, [initialColumns]);

  return {
    visibleColumns,
    toggleColumn,
    resetColumns,
    setVisibleColumns
  };
};