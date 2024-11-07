import { useSearchParams } from 'next/navigation';
import { renderWithProviders } from '@/test-utils';
import LoginForm from '@/components/login/loginForm';
import * as authApi from '@/utils/authApi.utils';
import { fireEvent, waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'), // Use actual implementation for other hooks
  useSearchParams: jest.fn(), // Mock the useSearchParams hook
}));

describe('login page', () => {
  it('Shows login title, form, button and external links for staff', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((param) => {
        if (param === 'role_type') return 'staff';
        return null;
      }),
    });

    const expectedResult = {
      id: 1,
      email: 'test@example.com',
      name: 'Abhishek kumar',
      role: 'staff',
    };
    jest.spyOn(authApi.default, 'getTokenKey').mockResolvedValueOnce(expectedResult);
    const { findByRole, getByLabelText, getByRole, getByTestId } = renderWithProviders(<LoginForm />);

    const title = await findByRole('heading', { name: /login to staff portal/i });
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const staffIdInput = getByLabelText(/staff id/i);

    // Assert that the elements are in the document
    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(staffIdInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(staffIdInput, { target: { value: 'staff123' } });

    // Assert that the values have been changed
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(staffIdInput).toHaveValue('staff123');

    const loginButton = getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const loadingDiv = getByTestId('loadingText');
      expect(loadingDiv).toBeInTheDocument();
      expect(loadingDiv.childElementCount).toBe('Redirecting To Dashboard'.length);
    });
  });

  it('Shows login title, form, button and external links for consumer', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((param) => {
        if (param === 'role_type') return '';
        return null;
      }),
    });

    const expectedResult = {
      id: 1,
      email: 'test@example.com',
      name: 'Abhishek kumar',
      role: 'consumer',
    };
    jest.spyOn(authApi.default, 'getTokenKey').mockResolvedValueOnce(expectedResult);
    const { findByRole, getByLabelText, getByRole, getByTestId } = renderWithProviders(<LoginForm />);

    const title = await findByRole('heading', { name: /login to consumer portal/i });
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    // Assert that the elements are in the document
    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert that the values have been changed
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');

    const loginButton = getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const loadingDiv = getByTestId('loadingText');
      expect(loadingDiv).toBeInTheDocument();
      expect(loadingDiv.childElementCount).toBe('Redirecting To Dashboard'.length);
    });
  });

  it('Shows login title, form, button and external links with no response', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((param) => {
        if (param === 'role_type') return '';
        return null;
      }),
    });

    const expectedResult = false;
    jest.spyOn(authApi.default, 'getTokenKey').mockResolvedValueOnce(expectedResult);
    const { findByRole, getByLabelText, getByRole, queryByTestId } = renderWithProviders(<LoginForm />);

    const title = await findByRole('heading', { name: /login to consumer portal/i });
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    // Assert that the elements are in the document
    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert that the values have been changed
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');

    const loginButton = getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(queryByTestId('loadingText')).not.toBeInTheDocument();
    });
  });

  it('Should toggle password visibility', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<LoginForm />);

    const passwordHidden = getByTestId('password__hidden');
    const passwordVisible = queryByTestId('password__visible');
    expect(passwordHidden).toBeInTheDocument();
    expect(passwordVisible).not.toBeInTheDocument();

    fireEvent.click(passwordHidden);

    expect(queryByTestId('password__hidden')).not.toBeInTheDocument();
    expect(getByTestId('password__visible')).toBeInTheDocument();
  });
});
