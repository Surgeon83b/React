import type { Country } from '../../types.ts';
import { useEffect, useRef } from 'react';

type CountrySelectorProps = {
  items: Country[];
  loading: boolean;
  error?: string;
  onCountryChange?: (country: string) => void;
  value?: string;
  name?: string;
};

const CountrySelector = ({
  items,
  loading,
  error,
  onCountryChange,
  value,
  name = 'country',
}: CountrySelectorProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCountryChange?.(event.target.value);
  };

  useEffect(
    () => console.log('Input value:', ref.current?.value),
    [ref.current?.value]
  );

  return (
    <div className="form-group">
      <label htmlFor="country">Country:</label>

      <input
        ref={ref}
        id="country"
        name={name}
        list="country-list"
        value={value}
        onChange={onCountryChange ? handleInputChange : undefined}
        placeholder="Type or select country..."
        className={error ? 'error' : ''}
        disabled={loading}
      />

      <datalist id="country-list">
        {items.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </datalist>

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default CountrySelector;
