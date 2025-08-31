import React from 'react';
import styles from './Modal.module.css';
import type {DataField} from "../../utils/types.ts";

interface ModalProps {
  visibleColumns: string[];
  onColumnToggle: (column: DataField, isVisible: boolean) => void;
  onClose: () => void;
}

const availableColumns: string[] = [
  'population',
  'co2',
  'co2_per_capita',
  'methane',
  'oil_co2',
  'temperature_change_from_co2'
];

export const Modal: React.FC<ModalProps> = React.memo(({
                                                         visibleColumns,
                                                         onColumnToggle,
                                                         onClose
                                                       }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onColumnToggle(name as DataField, checked);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Select Columns to Display</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>
          {availableColumns.map((column) => (
            <label key={column} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name={column}
                checked={visibleColumns.includes(column)}
                onChange={handleCheckboxChange}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxText}>
                {column.replace(/_/g, ' ').toUpperCase()}
              </span>
            </label>
          ))}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.applyButton} onClick={onClose}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';