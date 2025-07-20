import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary.tsx';

const BuggyComponent = () => {
  throw new Error('Test error!');
};

const TestFallback = () => <div>Error occurred</div>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('1. Displays fallback UI when child component throws an error', () => {
    render(
      <ErrorBoundary fallback={<TestFallback />}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('2. Continues to render children when there is no error', () => {
    render(
      <ErrorBoundary fallback={<TestFallback />}>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
    expect(screen.queryByText('Error occurred')).not.toBeInTheDocument();
  });

  it('3. Logs error to console', () => {
    render(
      <ErrorBoundary fallback={<TestFallback />}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      'componentDidCatch',
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('4. Updates state when an error occurs', () => {
    const { rerender } = render(
      <ErrorBoundary fallback={<TestFallback />}>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();

    rerender(
      <ErrorBoundary fallback={<TestFallback />}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});