// src/components/ErrorBoundary.tsx

import React, { Component} from "react";
import type { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // Catch errors in children and update state
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Optional: Log error info
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // You can also send errors to a logging service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="p-6 bg-white rounded shadow text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Something went wrong.</h2>
            <p className="text-gray-700">Please refresh the page or contact support.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
