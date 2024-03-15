import { ErrorInfo } from "react";
import {
  ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div data-page="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {isRouteErrorResponse(error) ? (
          <i>{error.statusText}</i>
        ) : error instanceof Error ? (
          <i>{error.message}</i>
        ) : (
          <i>Unknown error</i>
        )}
      </p>
    </div>
  );
}
