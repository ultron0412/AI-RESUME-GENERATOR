import { Component } from "react";
import { HiExclamationTriangle } from "react-icons/hi2";
import "./NotFound.css"; // Reuse the styles from NotFound for simplicity

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <div className="error-content glass fade-in">
            <HiExclamationTriangle className="error-icon" />
            <h1>Something went wrong</h1>
            <p>An unexpected error occurred in the application.</p>
            <div className="error-actions">
              <button
                className="btn-primary"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
              <button
                className="btn-secondary"
                onClick={() => (window.location.href = "/")}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
