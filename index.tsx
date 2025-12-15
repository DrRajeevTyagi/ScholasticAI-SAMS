import React, { ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#fef2f2', height: '100vh', color: '#991b1b' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Something went wrong.</h1>
          <p style={{ marginBottom: '20px' }}>The application crashed. Here is the error:</p>
          <pre style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', border: '1px solid #fca5a5' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => { 
                // 1. Clear simple settings
                localStorage.clear(); 
                // 2. Clear the heavy database (Critical fix)
                const req = indexedDB.deleteDatabase('ScholasticDB');
                req.onsuccess = () => window.location.reload();
                req.onerror = () => window.location.reload();
                req.onblocked = () => window.location.reload();
            }}
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#991b1b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Clear Data & Reload (Factory Reset)
          </button>
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#7f1d1d' }}>
            Warning: This will delete all local data and restore the demo dataset.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error("React Mount Error:", error);
  rootElement.innerHTML = `<div style="padding: 20px; color: red;">
    <h3>Failed to initialize application</h3>
    <pre>${error instanceof Error ? error.message : String(error)}</pre>
  </div>`;
}