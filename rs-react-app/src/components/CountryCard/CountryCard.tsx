import {memo} from 'react';
import type {CountryData, DataField} from '../../utils/types';
import {DataTable} from '../DataTable/DataTable';
import './CountryCard.css';
import React from 'react';

interface CountryCardProps {
  country: CountryData;
  selectedYear: number;
  visibleColumns: DataField[];
  onYearSelect?: (year: number) => void;
}

export const CountryCard = memo(({
                                   country,
                                   selectedYear,
                                   visibleColumns,
                                   onYearSelect
                                 }: CountryCardProps) => {
  const getLatestPopulation = (): number | undefined => {
    const dataWithPopulation = country.data.filter(d => d.population !== undefined);
    return dataWithPopulation[dataWithPopulation.length - 1]?.population;
  };

  return (
    <div className="country-card">
      <div className="country-card-header">
        <h3 className="country-name">{country.name}</h3>
        {country.iso_code && (
          <span className="country-iso">{country.iso_code}</span>
        )}
        {country.continent && (
          <span className="country-continent">{country.continent}</span>
        )}
      </div>

      <div className="country-population">
        <span className="population-label">Population (latest): </span>
        <span className="population-value">
          {getLatestPopulation()?.toLocaleString() || 'N/A'}
        </span>
      </div>

      <DataTable
        data={country.data}
        visibleColumns={visibleColumns}
        selectedYear={selectedYear}
        onYearSelect={onYearSelect}
        className="country-data-table"
      />
    </div>
  );
});

CountryCard.displayName = 'CountryCard';