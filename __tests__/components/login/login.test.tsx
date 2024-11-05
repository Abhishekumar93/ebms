import { useSearchParams } from 'next/navigation';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';
import LoginForm from '@/components/login/loginForm';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'), // Use actual implementation for other hooks
  useSearchParams: jest.fn(), // Mock the useSearchParams hook
}));

describe('login page', () => {
  it('Shows login title, form, button and external links', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((param) => {
        if (param === 'role_type') return 'staff';
        return null;
      }),
    });
    const { findByRole } = renderWithProviders(<LoginForm />);

    const title = await findByRole('heading', { name: /login to staff portal/i }); // Adjusted to match the title
    const emailInput = await findByRole('textbox', { name: /email/i }); // Finding the email input
    const passwordInput = await findByRole('textbox', { name: /password/i }); // Finding the password input

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
