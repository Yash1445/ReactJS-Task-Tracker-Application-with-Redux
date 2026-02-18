import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // keep for external logging
    console.error('Unhandled app error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto mt-20 max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          Something went wrong. Please refresh the page.
        </div>
      );
    }

    return this.props.children;
  }
}