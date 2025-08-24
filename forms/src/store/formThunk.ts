import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FormData } from '../types';
import { formInputSchema } from '../validationSchema';
import { z } from 'zod';
import type { RootState } from './index.ts';

export interface FormDataWithBase64 extends Omit<FormData, 'picture'> {
  picture: string | null;
}

export const submitFormData = createAsyncThunk<
  FormDataWithBase64,
  FormData,
  { rejectValue: string }
>('form/submit', async (formData: FormData, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const countryNames = state.countries.countries.map((c) => c.name);
    const validatedData = formInputSchema(countryNames).parse(formData);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    let pictureBase64 = null;
    if (validatedData.picture instanceof File) {
      pictureBase64 = await convertFileToBase64(validatedData.picture);
    }

    const formDataWithBase64: FormDataWithBase64 = {
      ...validatedData,
      picture: pictureBase64,
    };

    localStorage.setItem('formData', JSON.stringify(formDataWithBase64));

    return formDataWithBase64;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return rejectWithValue(error.issues[0]?.message || 'Validation failed');
    }
    return rejectWithValue('Failed to submit form');
  }
});

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
