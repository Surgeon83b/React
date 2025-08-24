import React, { useRef, useEffect, useState } from 'react';
import { z } from 'zod';
import { formInputSchema } from '../validationSchema';
import { submitFormData } from '../store/formThunk';
import { resetForm } from '../store/formSlice';
import { useAppDispatch, type RootState, useAppSelector } from '../store';
import type { FormData } from '../types';
import './Form.css';
import CountrySelector from './FormFields/CountrySelector.tsx';
import { checkPasswordStrength, getPasswordStrengthColor } from '../helpers.ts';

type UncontrolledFormProps = {
  onClose: () => void;
};

const UncontrolledForm: React.FC<UncontrolledFormProps> = ({
  onClose,
}: UncontrolledFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state: RootState) => state.countries);
  const { submitted, loading, error } = useAppSelector(
    (state: RootState) => state.form
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  useEffect(() => {
    if (submitted) {
      if (formRef.current) {
        formRef.current.reset();
      }
      setPasswordStrength('');
    }
  }, [submitted]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordStrength(checkPasswordStrength(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formValues: Partial<FormData> = {
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string) || 0,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
      picture: formData.get('picture') as File,
      country: formData.get('country') as string,
    };

    try {
      const validatedData = formInputSchema(
        countries.map((country) => country.name)
      ).parse(formValues) as FormData;
      setErrors({});

      dispatch(submitFormData(validatedData)).then(onClose);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path && issue.path.length > 0) {
            const fieldName = String(issue.path[0]);
            newErrors[fieldName] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setErrors({});
    setPasswordStrength('');
    dispatch(resetForm());
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form-container">
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          min="0"
          className={errors.age ? 'error' : ''}
        />
        {errors.age && <span className="error-message">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
          className={errors.password ? 'error' : ''}
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
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <div className="radio-group">
          <label htmlFor="male">
            <input type="radio" id="male" name="gender" value="male" />
            Male
          </label>
          <label htmlFor="female">
            <input type="radio" id="female" name="gender" value="female" />
            Female
          </label>
          <label htmlFor="other">
            <input type="radio" id="other" name="gender" value="other" />
            Other
          </label>
        </div>
        {errors.gender && (
          <span className="error-message">{errors.gender}</span>
        )}
      </div>

      <CountrySelector
        items={countries}
        loading={loading}
        error={errors.country}
      />

      <div className="form-group">
        <label htmlFor="picture">Picture:</label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept=".jpg,.jpeg,.png"
          className={errors.picture ? 'error' : ''}
        />
        {errors.picture && (
          <span className="error-message">{errors.picture}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="acceptTerms" className="checkbox-label">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            className={errors.acceptTerms ? 'error' : ''}
          />
          I accept the Terms and Conditions
        </label>
        {errors.acceptTerms && (
          <span className="error-message">{errors.acceptTerms}</span>
        )}
      </div>

      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
