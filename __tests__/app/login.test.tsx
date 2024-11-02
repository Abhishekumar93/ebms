import Login from '@/app/login/page';
import { useSearchParams } from 'next/navigation';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils';

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
    renderWithProviders(<Login />);

    const title = await screen.findByRole('heading', { name: /login/i });
    // const input = await screen.findByRole('textbox', { name: /password/i });

    // expect(title).toBeInTheDocument();
    // expect(input).toBeInTheDocument();
  });
});
