import { Component } from 'react';
import ErrorPage from '../../pages/ErrorPage';

/**
 * Class component required by React for catching render/lifecycle errors
 * in the tree below it. Wraps the whole app (see App.jsx) so a crash in
 * any one page shows a friendly recovery screen instead of a blank app.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production this is where you'd forward to an error-tracking service.
    console.error('ScoopCo crashed:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} onRetry={this.handleReset} />;
    }
    return this.props.children;
  }
}
