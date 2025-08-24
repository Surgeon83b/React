import { z } from 'zod';

export const formInputSchema = (names: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .regex(/^[A-Z]/, 'First letter must be uppercase'),

      age: z
        .number()
        .min(0, 'Age cannot be negative')
        .int('Age must be an integer')
        .positive('Age must be positive'),

      email: z.email('Invalid email address'),

      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[0-9]/, 'Password must contain at least 1 number')
        .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
        .regex(
          /[^A-Za-z0-9]/,
          'Password must contain at least 1 special character'
        ),

      confirmPassword: z.string(),

      gender: z.string().min(1, 'Gender is required'),

      acceptTerms: z
        .boolean()
        .refine(
          (val) => val === true,
          'You must accept the terms and conditions'
        ),

      picture: z
        .instanceof(File)
        .nullable()
        .refine(
          (file) => !file || file.size <= 5 * 1024 * 1024,
          'File size must be less than 5MB'
        )
        .refine(
          (file) =>
            !file ||
            ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
          'Only JPEG and PNG files are allowed'
        ),

      country: z
        .string()
        .min(1, 'Country is required')
        .refine((value) => names.includes(value), {
          message: 'Please select a valid country from the list',
          path: ['country'],
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });
