import { createSlice } from '@reduxjs/toolkit';
import { submitFormData } from './formThunk';
import type {FormState} from '../types';

const initialState: FormState = {
  formData: null,
  initialFormData: null,
  submitted: false,
  loading: false,
  error: null
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetForm: (state) => {
     // state.formData = null;
     // state.initialFormData = null;
      state.submitted = false;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.loading = false;
        state.initialFormData = state.formData ? {...state.formData} : null;
        state.formData = action.payload;
        state.submitted = true;
        state.error = null;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
        state.submitted = false;
      });
  }
});

export const { resetForm } = formSlice.actions;
export default formSlice.reducer;