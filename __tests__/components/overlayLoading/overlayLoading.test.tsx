import { OverlayLoading } from '@/components/overlayLoading/overlayLoading';
import { renderWithProviders } from '@/test-utils';

const renderComponent = (props = {}) => {
  const defaultProps = {
    darkColor: 'dark:after:bg-slate-300',
    color: 'after:bg-slate-700',
    loadingText: 'LOADING',
    ...props,
  };
  return renderWithProviders(<OverlayLoading {...defaultProps} />);
};

describe('Loading component', () => {
  it('Should render with default loader text', () => {
    const loadingText = 'LOADING';
    const { getByTestId } = renderComponent();
    const loadingDiv = getByTestId('loadingText');
    expect(loadingDiv).toBeInTheDocument();
    expect(loadingDiv.childElementCount).toBe(loadingText.length);
  });

  it('Should render with passed loader text', () => {
    const loadingText = 'Testing Loader';
    const { getByTestId } = renderComponent({ loadingText });
    const loadingDiv = getByTestId('loadingText');
    expect(loadingDiv).toBeInTheDocument();
    expect(loadingDiv.childElementCount).toBe(loadingText.length);
  });
});
