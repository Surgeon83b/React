import React from 'react';
import {CountryCard} from '../CountryCard/CountryCard.tsx';
import type {CountryData, DataField} from '../../utils/types.ts';
import './CountryList.css';

interface CountryListProps {
  countries: CountryData[];
  selectedYear: number;
  visibleColumns: DataField[];
}

export const CountryList = React.memo(({
                                         countries,
                                         selectedYear,
                                         visibleColumns
                                       }: CountryListProps) => {
  if (countries.length === 0) {
    return (
      <div className="country-list empty">
        <p>No countries found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="country-list">
      <div className="country-list-header">
        <span>Showing {countries.length} countries</span>
      </div>
      <div className="country-list-grid">
        {countries.map(country => (
          <CountryCard
            key={country.name}
            country={country}
            selectedYear={selectedYear}
            visibleColumns={visibleColumns}
          />
        ))}
      </div>
    </div>
  );
});

CountryList.displayName = 'CountryList';