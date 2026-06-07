'use client';

import { Component, type ReactNode } from 'react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Niečo sa pokazilo</h1>
            <p className="text-gray-500 mb-6">{this.state.error?.message || 'Neočakávaná chyba'}</p>
            <Button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}>
              Obnoviť stránku
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
