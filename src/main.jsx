import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught component error:", error, errorInfo);
    // If error is a transient DOM unmount error (e.g. removeChild / NotFoundError), auto-recover
    const errorStr = error?.toString() || '';
    if (errorStr.includes('NotFoundError') || errorStr.includes('removeChild')) {
      setTimeout(() => {
        this.setState({ hasError: false, error: null });
      }, 50);
    }
  }

  render() {
    if (this.state.hasError) {
      const errorStr = this.state.error?.toString() || '';
      // Transient DOM errors auto-recover, so render children if recovering
      if (errorStr.includes('NotFoundError') || errorStr.includes('removeChild')) {
        return this.props.children;
      }

      return (
        <div style={{ padding: '40px', background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>Application Notice</h2>
          <p style={{ color: '#a3a3a3', margin: '12px 0 24px 0', maxWidth: '500px', textAlign: 'center' }}>{errorStr}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{ padding: '12px 24px', background: '#ffffff', color: '#000000', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Refresh View
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
