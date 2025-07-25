import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { styled } from 'styled-components';

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
  info: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ error, info });
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      return <ErrorBoundaryFallbackComponent />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  padding: 40px;
  border: 2px #78909c solid;
  border-radius: 5px;
  font-size: 24px;
  color: #78909c;
`;

const ErrorBoundaryFallbackComponent = () => (
  <Layout>
    <Message>
      Oops! something went wrong
      <span role="img" aria-label="face-emoji">
        😞
      </span>
    </Message>
  </Layout>
);
