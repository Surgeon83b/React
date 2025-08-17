'use client';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode | ((props: FallbackProps) => ReactNode);
  children?: ReactNode;
  onReset?: () => void;
}

interface FallbackProps {
  error: Error;
  reset: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  handleReset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const fallback = this.props.fallback;

      if (typeof fallback === 'function') {
        return fallback({
          error: this.state.error!,
          reset: this.handleReset,
        });
      }

      return fallback;
    }

    return this.props.children;
  }
}
