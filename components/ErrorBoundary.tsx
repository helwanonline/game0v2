import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  // Fix: Initialize state using a class property initializer. This is a more modern syntax
  // than using a constructor and resolves the TypeScript errors related to `state` and `props`
  // not being found on the component instance.
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-light-text p-4 text-center">
          <img className="h-16 w-auto mb-8" src="https://i.ibb.co/r2zLLDB/5199-online.png" alt="5199.online Logo" />
          <h1 className="text-3xl font-bold text-red-500 mb-4">حدث خطأ ما</h1>
          <p className="text-lg mb-6">نأسف، لقد واجه التطبيق مشكلة غير متوقعة. الرجاء محاولة تحديث الصفحة.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 hover:bg-accent-hover"
          >
            تحديث الصفحة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
