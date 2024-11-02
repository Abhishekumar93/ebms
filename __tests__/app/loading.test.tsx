import Loading from '@/app/loading';
import { renderWithProviders } from '@/test-utils';

const renderComponent = (props = {}) => {
  const defaultProps = {
    darkColor: 'dark:after:bg-slate-300',
    color: 'after:bg-slate-700',
    loadingText: 'LOADING',
    ...props,
  };
  return renderWithProviders(<Loading {...defaultProps} />);
};

describe('Loading component', () => {
  it('Should render with default loader text', () => {
    const { getByText } = renderComponent();
    expect(getByText('LOADING')).toBeInTheDocument();
  });

  it('Should render with passed loader text', () => {
    const { getByText } = renderComponent({ loadingText: 'Testing Loader' });
    expect(getByText('Testing Loader')).toBeInTheDocument();
  });
});
