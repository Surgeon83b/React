import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../store/countriesSlice';
import formReducer from '../store/formSlice';

export const mockCountries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
];

export const createDefaultTestStore = () => {
  return configureStore({
    reducer: {
      countries: countryReducer,
      form: formReducer,
    },
    preloadedState: {
      countries: {
        countries: mockCountries,
        loading: false,
        error: null,
      },
      form: {
        formData: null,
        initialFormData: null,
        submitted: false,
        loading: false,
        error: null,
      },
    },
  });
};
