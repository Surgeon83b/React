import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../store';
import { submitFormData } from '../store/formThunk';
import { formInputSchema } from '../validationSchema';
import CountrySelector from './FormFields/CountrySelector.tsx';
import { checkPasswordStrength, getPasswordStrengthColor } from '../helpers.ts';
import type { FormData } from '../types.ts';
import { resetForm } from '../store/formSlice.ts';
import GenderRadio from './FormFields/GenderRadio.tsx';

type ControlledFormProps = {
  onClose: () => void;
};

export const ControlledForm: React.FC<ControlledFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { countries, loading: countriesLoading } = useAppSelector(
    (state) => state.countries
  );
  const { loading, error } = useAppSelector((state) => state.form);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(
      formInputSchema(countries.map((country) => country.name))
    ),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptTerms: false,
      country: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setValue('picture', file, { shouldValidate: true });
  };

  const password = watch('password');
  const [passwordStrength, setPasswordStrength] = React.useState('');

  React.useEffect(() => {
    const strength = checkPasswordStrength(password || '');
    setPasswordStrength(strength);
  }, [password]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      await dispatch(submitFormData(data)).unwrap();
      onClose();
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  const handleReset = () => {
    reset();
    dispatch(resetForm());
  };

  const handleCountryChange = (country: string) => {
    setValue('country', country, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className={errors.name ? 'error' : ''}
          {...register('name')}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          className={errors.age ? 'error' : ''}
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && (
          <span className="error-message">{errors.age.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className={errors.email ? 'error' : ''}
          {...register('email')}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className={errors.password ? 'error' : ''}
          {...register('password')}
        />
        {passwordStrength && (
          <div className="password-strength">
            Strength:{' '}
            <span style={{ color: getPasswordStrengthColor(passwordStrength) }}>
              {passwordStrength}
            </span>
          </div>
        )}
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          className={errors.confirmPassword ? 'error' : ''}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className="error-message">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <GenderRadio
        register={register('gender')}
        errorMessage={errors.gender?.message}
      />

      <div className="form-group">
        <CountrySelector
          items={countries}
          loading={countriesLoading}
          error={errors.country?.message}
          onCountryChange={handleCountryChange}
          value={getValues('country')}
        />
        {errors.country && (
          <span className="error-message">{errors.country.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="picture">Picture:</label>
        <input
          type="file"
          id="picture"
          accept=".jpg,.jpeg,.png"
          className={errors.picture ? 'error' : ''}
          onChange={handleFileChange}
        />
        {errors.picture && (
          <span className="error-message">{errors.picture.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="acceptTerms" className="checkbox-label">
          <input
            type="checkbox"
            id="acceptTerms"
            {...register('acceptTerms')}
          />
          I accept the Terms and Conditions
        </label>
        {errors.acceptTerms && (
          <span className="error-message">{errors.acceptTerms.message}</span>
        )}
      </div>

      <div className="form-buttons">
        <button type="submit" disabled={!isValid || isSubmitting || loading}>
          {loading || isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};
