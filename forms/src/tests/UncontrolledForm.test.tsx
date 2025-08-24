import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { submitFormData } from '../store/formThunk';
import { checkPasswordStrength } from '../helpers';
import UncontrolledForm from '../Forms/UncontrolledForm';
import '@testing-library/jest-dom';
import { createDefaultTestStore } from './testHelpers';

jest.mock('../store/formThunk');
jest.mock('../helpers');

const mockOnClose = jest.fn();

const renderFormWithStore = (
  store: ReturnType<typeof createDefaultTestStore>
) => {
  return render(
    <Provider store={store}>
      <UncontrolledForm onClose={mockOnClose} />
    </Provider>
  );
};

describe('UncontrolledForm', () => {
  let store: ReturnType<typeof createDefaultTestStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    (checkPasswordStrength as jest.Mock).mockReturnValue('Weak');
    store = createDefaultTestStore();
  });

  describe('Test form rendering with all required fields', () => {
    it('should render all required form fields', () => {
      renderFormWithStore(store);

      expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/age:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();

      expect(screen.getByTestId('password')).toBeInTheDocument();
      expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();

      expect(screen.getByTestId('male')).toBeInTheDocument();
      expect(screen.getByTestId('female')).toBeInTheDocument();
      expect(screen.getByTestId('other')).toBeInTheDocument();

      expect(screen.getByTestId('picture')).toBeInTheDocument();

      expect(screen.getByTestId('country')).toBeInTheDocument();

      expect(screen.getByTestId('acceptTerms')).toBeInTheDocument();

      expect(
        screen.getByRole('button', { name: /submit/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /reset/i })
      ).toBeInTheDocument();
    });
  });

  describe('Test field validation', () => {
    it('should show validation errors for initially empty fields', async () => {
      renderFormWithStore(store);

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/First letter must be uppercase/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Age must be positive/i)).toBeInTheDocument();
        expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
        expect(
          screen.getByText(
            /Password must contain at least 1 special character/i
          )
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Invalid input: expected string, received null/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Please select a valid country from the list/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Only JPEG and PNG files are allowed/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/You must accept the terms and conditions/i)
        ).toBeInTheDocument();
      });
    });

    it('should validate email format', async () => {
      renderFormWithStore(store);

      fireEvent.input(screen.getByLabelText(/email:/i), {
        target: { value: 'invalid-email' },
      });

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByTestId('email-error')).toBeInTheDocument();
        expect(screen.getByTestId('email-error').textContent).toMatch(/email/i);
      });
    });

    it('should validate age range', async () => {
      const store = createDefaultTestStore();
      renderFormWithStore(store);

      fireEvent.input(screen.getByLabelText(/age:/i), {
        target: { value: '-5' },
      });

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByTestId('age-error')).toHaveTextContent(
          /Age must be positive/i
        );
      });
    });

    it('should validate password confirmation', async () => {
      const store = createDefaultTestStore();

      renderFormWithStore(store);

      fireEvent.input(screen.getByTestId('password'), {
        target: { value: 'password123' },
      });

      fireEvent.input(screen.getByTestId('confirmPassword'), {
        target: { value: 'different' },
      });

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText(/Passwords don't match/i)).toBeInTheDocument();
      });
    });
  });

  describe('Test password strength calculation', () => {
    it('should show password strength when typing', () => {
      (checkPasswordStrength as jest.Mock).mockReturnValue('Strong');

      renderFormWithStore(store);

      fireEvent.change(screen.getByTestId('password'), {
        target: { value: 'strongPassword123!' },
      });

      expect(checkPasswordStrength).toHaveBeenCalledWith('strongPassword123!');
      expect(screen.getByText(/strength:/i)).toBeInTheDocument();
      expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });
  });

  describe('Test form submission', () => {
    it('should submit form with valid data', async () => {
      const mockSubmit = submitFormData as unknown as jest.Mock;
      mockSubmit.mockReturnValue({ type: 'fulfilled' });

      renderFormWithStore(store);

      fireEvent.input(screen.getByLabelText(/name:/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.input(screen.getByLabelText(/age:/i), {
        target: { value: '25' },
      });
      fireEvent.input(screen.getByLabelText(/email:/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.input(screen.getByLabelText(/password:/i), {
        target: { value: 'Password123!' },
      });
      fireEvent.input(screen.getByLabelText(/confirm password:/i), {
        target: { value: 'Password123!' },
      });
      fireEvent.click(screen.getByLabelText(/male/i));
      fireEvent.change(screen.getByLabelText(/country:/i), {
        target: { value: 'US' },
      });

      const file = new File(['test'], 'test.png', { type: 'image/png' });
      fireEvent.change(screen.getByLabelText(/picture:/i), {
        target: { files: [file] },
      });

      fireEvent.click(
        screen.getByLabelText(/i accept the terms and conditions/i)
      );

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });
    });

    it('should show loading state during submission', () => {
      renderFormWithStore(store);

      expect(
        screen.getByRole('button', { name: /submitting\.\.\./i })
      ).toBeDisabled();
    });

    it('should show error message when submission fails', () => {
      renderFormWithStore(store);

      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });

  describe('Test error message display and clearing', () => {
    it('should clear errors when reset button is clicked', async () => {
      renderFormWithStore(store);

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: /reset/i }));

      await waitFor(() => {
        expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
      });
    });

    it('should clear form fields when reset button is clicked', () => {
      renderFormWithStore(store);

      fireEvent.input(screen.getByLabelText(/name:/i), {
        target: { value: 'Test Name' },
      });

      fireEvent.click(screen.getByRole('button', { name: /reset/i }));

      expect(screen.getByLabelText(/name:/i)).toHaveValue('');
    });
  });
});
