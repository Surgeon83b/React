export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: File | null;
  country: string;
}

export interface FormDataWithBase64 extends Omit<FormData, 'picture'> {
  picture: string | null; // Для хранения в Redux
}

export interface Country {
  code: string;
  name: string;
}

export interface FormState {
  formData: FormDataWithBase64 | null;
  initialFormData: FormDataWithBase64 | null;
  submitted: boolean;
  loading: boolean;
  error: string | null;
}

export type FormType = 'controlled' | 'uncontrolled';