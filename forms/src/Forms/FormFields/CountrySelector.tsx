import type {Country} from "../../types.ts";

type CountrySelectorProps = {
  items:  Country[];
  loading: boolean;
  error?: string;
};

const CountrySelector = ({items, loading, error}:CountrySelectorProps) => {
  return (
    <div className="form-group">
      <label htmlFor="country">Country:</label>
      <select
        id="country"
        name="country"
        className={error ? 'error' : ''}
        disabled={loading}
      >
        <option value="">Select a country</option>
        {items.map(country => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default CountrySelector;