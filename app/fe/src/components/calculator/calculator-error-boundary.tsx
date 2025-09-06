'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  onBack?: () => void;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CalculatorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Calculator ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with Sentry
      // Sentry.captureException(error, { 
      //   tags: { component: 'calculator' },
      //   extra: errorInfo 
      // });
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  handleBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    } else {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Calculator Error
            </h2>
            
            <p className="text-sm text-gray-600 mb-4">
              There was an error in the compensation calculator. This might be due to invalid data or a temporary issue.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-left">
                <h3 className="text-xs font-medium text-red-800 mb-1">Error:</h3>
                <pre className="text-xs text-red-700 overflow-auto">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button
                onClick={this.handleRetry}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              
              <button
                onClick={this.handleBack}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
