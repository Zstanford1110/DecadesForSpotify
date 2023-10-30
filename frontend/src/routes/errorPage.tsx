import { isRouteErrorResponse, useRouteError } from "react-router-dom";


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Type guard utility function to check if the error is a RouteErrorResponse
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>{error.status + ' ' + error.statusText + ' ' + error.data }</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>Unknown error</p>
      </div>
    );
  }
}