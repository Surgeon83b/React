import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Country } from '../types';

export const fetchCountries = createAsyncThunk<
  Country[],
  void,
  { rejectValue: string }
>('countries/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,cca2'
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data
      .map((country: { cca2: string; name: { common: string } }) => ({
        code: country.cca2,
        name: country.name.common,
      }))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch countries';
      });
  },
});

export default countrySlice.reducer;
