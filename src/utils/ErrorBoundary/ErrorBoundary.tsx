import { Button } from "@mui/material";
import { Component, ErrorInfo, FC, JSX, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ marginTop: "80px" }}>
          <h1>Данные не доступны</h1>
          <Button
            style={{ margin: "10px 0px" }}
            variant="contained"
            color="primary"
            onClick={() => this.setState({ hasError: false })}
          >
            Обновить страницу?
          </Button>
          <div>Если после обновления страницы данные не появились, перезагрузите сервер.</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const WithErrorBoundary = (Component: FC) => (props: JSX.IntrinsicAttributes & { children?: ReactNode }) =>
  (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
