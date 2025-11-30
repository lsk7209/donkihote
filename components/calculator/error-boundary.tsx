'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CalculatorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 프로덕션에서는 에러 추적 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      // 예: Sentry.captureException(error, { extra: errorInfo })
    } else {
      console.error('Calculator Error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full max-w-md mx-auto p-6 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                계산기 오류
              </h2>
              <p className="text-sm text-red-600 mb-4">
                계산 중 오류가 발생했습니다. 페이지를 새로고침해주세요.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                새로고침
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

