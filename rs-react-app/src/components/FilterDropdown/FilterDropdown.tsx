import React from "react";
import styles from "./FilterDropdown.module.css";

interface FilterDropdownProps {
  regions: string[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  placeholder?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = React.memo(
  ({
    regions,
    selectedRegion,
    onRegionChange,
    placeholder = "Select region...",
  }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onRegionChange(event.target.value);
    };

    return (
      <div className={styles.dropdownContainer}>
        <select
          value={selectedRegion}
          onChange={handleChange}
          className={styles.dropdown}
        >
          <option value="">{placeholder}</option>
          {regions?.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

FilterDropdown.displayName = "FilterDropdown";
