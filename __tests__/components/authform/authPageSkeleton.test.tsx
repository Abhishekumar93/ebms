import AuthPageSkeleton from '@/components/authform/authPageSkeleton';
import { renderWithProviders } from '@/test-utils';
import { callingUrlType } from '@/types/dataType.type';

const mockChildren: JSX.Element = <div>Mock Child Component</div>;

const renderComponent = (props = {}) => {
  const defaultProps = {
    children: mockChildren,
    title: 'Mock Testing',
    callingUrl: 'login' as callingUrlType,
    ...props,
  };

  return renderWithProviders(<AuthPageSkeleton {...defaultProps} />);
};

describe('Auth Page Skeleton Component', () => {
  it('Should render with callingUrl as login', () => {
    const { getByText, getByTestId } = renderComponent();

    expect(getByText('Mock Child Component')).toBeInTheDocument();
    expect(getByTestId('login__link')).toBeInTheDocument();
    expect(getByTestId('no-account-signup__link')).toBeInTheDocument();
  });

  it('Should render with callingUrl as staff-login', () => {
    const { getByText, getByTestId } = renderComponent({ callingUrl: 'staff-login' });

    expect(getByText('Mock Child Component')).toBeInTheDocument();
    expect(getByTestId('staff-login__link')).toBeInTheDocument();
    expect(getByTestId('no-account-signup__link')).toBeInTheDocument();
  });

  it('Should render with callingUrl as otp-login', () => {
    const { getByText, getByTestId } = renderComponent({ callingUrl: 'otp-login' });

    expect(getByText('Mock Child Component')).toBeInTheDocument();
    expect(getByTestId('otp-login__link')).toBeInTheDocument();
    expect(getByTestId('no-account-signup__link')).toBeInTheDocument();
  });

  it('Should render with callingUrl as signup', () => {
    const { getByText, getByTestId } = renderComponent({ callingUrl: 'signup' });

    expect(getByText('Mock Child Component')).toBeInTheDocument();
    expect(getByTestId('account-login__link')).toBeInTheDocument();
  });
});
