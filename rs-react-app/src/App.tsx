import React, {Suspense, useState, useMemo, useCallback} from 'react';
import {useCountriesData} from './hooks/useCountriesData';
import {YearSelector} from './components/YearSelector/YearSelector';
import {SearchBar} from './components/SearchBar/SearchBar';
import {FilterDropdown} from './components/FilterDropdown/FilterDropdown';
import {SortButton} from './components/SortButton/SortButton';
import {CountryCard} from './components/CountryCard/CountryCard';
import {Modal} from './components/Modal/Modal';
import {SkeletonLoader} from './components/SkeletonLoader/SkeletonLoader';
import {ProgressIndicator} from './components/ProgressIndicator/ProgressIndicator';
import type {CountryData, DataField} from './utils/types';
import {useColumnSelection} from "./hooks/useColumnSelection";
import './App.css';
import styles from './components/SortButton/SortButton.module.css';

const CountryList = React.memo(({
                                  countries,
                                  selectedYear,
                                  visibleColumns
                                }: {
  countries: CountryData[];
  selectedYear: number;
  visibleColumns: DataField[];
}) => {
  if (countries.length === 0) {
    return (
      <div className="no-data">
        <h3>No countries found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="country-list">
      {countries.map(country => (
        <CountryCard
          key={country.name}
          country={country}
          selectedYear={selectedYear}
          visibleColumns={visibleColumns}
        />
      ))}
    </div>
  );
});

CountryList.displayName = 'CountryList';

function App() {
  const {data, isLoading, error, getRegions, availableYears, progress, stage} = useCountriesData();
  const [selectedYear, setSelectedYear] = useState<number>(2020);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {visibleColumns, toggleColumn} = useColumnSelection();

  const filteredCountries = useMemo(() => {
    return Array.from(data.values()).filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || (country.continent && country.continent === selectedRegion);
      return matchesSearch && matchesRegion;
    });
  }, [data, searchQuery, selectedRegion]);

  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      const aData = a.data.find(d => d.year === selectedYear);
      const bData = b.data.find(d => d.year === selectedYear);

      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const aValue = aData?.population ?? 0;
        const bValue = bData?.population ?? 0;
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
  }, [filteredCountries, selectedYear, sortBy, sortOrder]);

  const handleSortChange = useCallback((newSortBy: 'name' | 'population') => {
    if (newSortBy === sortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  }, [sortBy]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <p>Please try refreshing the page or check your internet connection.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <ProgressIndicator
        progress={progress}
        isLoading={isLoading}
        stage={stage}
      />

      {!isLoading && !error && (
        <>
          <div className="controls">
            <YearSelector
              selectedYear={selectedYear}
              onChange={setSelectedYear}
              years={availableYears}
            />
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search countries..."
            />
            <FilterDropdown
              regions={getRegions}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              placeholder="Filter by continent"
            />

            <div className="sort-buttons">
              <SortButton
                label="Sort by Name"
                isActive={sortBy === 'name'}
                sortOrder={sortOrder}
                onClick={() => handleSortChange('name')}
              />
              <SortButton
                label="Sort by Population"
                isActive={sortBy === 'population'}
                sortOrder={sortOrder}
                onClick={() => handleSortChange('population')}
              />
            </div>

            <button
              className={styles.sortButton}
              onClick={() => setIsModalOpen(true)}
            >
              Select Columns
            </button>
          </div>

          <Suspense fallback={<SkeletonLoader/>}>
            <CountryList
              countries={sortedCountries}
              selectedYear={selectedYear}
              visibleColumns={visibleColumns}
            />
          </Suspense>

          {isModalOpen && (
            <Modal
              visibleColumns={visibleColumns}
              onColumnToggle={toggleColumn}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;