import {useState, useEffect, useMemo, useCallback} from 'react';
import type {CountryData, YearlyData} from '../utils/types';

export const useCountriesData = () => {
  const [data, setData] = useState<Map<string, CountryData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'idle' | 'downloading' | 'parsing' | 'complete'>('idle');

  const fetchData = useCallback(async (isMinimal = false) => {
    setIsLoading(true);
    setProgress(0);
    setStage('downloading');
    setError(null);

    try {
      console.log('Attempting to fetch data from GitHub...');

      const rawUrl = 'https://raw.githubusercontent.com/Surgeon83b/React/main/rs-react-app/owid-co2-data.json';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(rawUrl, {
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProgress(30);

      const jsonData = await response.json();

      setProgress(60);
      setStage('parsing');

      const parsedData = new Map<string, CountryData>();
      const countries: [string, unknown][] = Object.entries(jsonData);
      const totalCountries = isMinimal ? Math.min(50, countries.length) : countries.length;

      let processed = 0;
      for (const [countryName, unknownData] of countries) {
        const countryData = unknownData as CountryData;

        if (countryData?.data?.length > 0) {
          parsedData.set(countryName, {
            name: countryName,
            iso_code: countryData.iso_code || '',
            continent: countryData.continent || '',
            data: countryData.data.sort((a: YearlyData, b: YearlyData) => (a.year || 0) - (b.year || 0))
          });
        }

        processed++;

        const parseProgress = 60 + Math.round((processed / totalCountries) * 40);
        setProgress(parseProgress);

        if (processed % 25 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }

        if (isMinimal && processed >= 50) break;
      }

      setData(parsedData);
      setProgress(100);
      setStage('complete');
      console.log('Data loaded successfully from GitHub');

    } catch (err) {
      console.error('GitHub fetch error:', err);

      if (err.name === 'AbortError') {
        setError('Request timeout. The server is not responding.');
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Network error. Please check your internet connection.');
      } else if (err.message.includes('CORS')) {
        setError('CORS error. Try loading the file from a different source.');
      } else {
        setError(`Failed to load data: ${err.message}`);
      }

      setProgress(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  const getRegions = useMemo(() => {
    const regions = new Set<string>();
    console.log(data);
    data.forEach(country => {
      if (country.continent) regions.add(country.continent);
    });
    return Array.from(regions).sort();
  }, [data]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    data.forEach(country => {
      country.data.forEach(entry => {
        if (entry.year) years.add(entry.year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [data]);

  return {
    data,
    isLoading,
    error,
    progress,
    stage,
    retry,
    getRegions,
    availableYears
  };
};

