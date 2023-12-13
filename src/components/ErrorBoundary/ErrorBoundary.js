import React, { Component } from "react";

/**
 * This should be replaced. It's only applies for production.
 * Its nice tool just in cases you need to use it, but we shouldn't use in all application.
 */
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ""
  };

  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true,
      errorMessage: error
    });
  };

  render() {
    if (this.state.hasError) {
      return <h1>this.state.errorMessage</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
