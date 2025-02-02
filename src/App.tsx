import * as Sentry from "@sentry/react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import ErrorPage from "./Components/Error404";
import ErrorBoundary from "./Components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

function App() {
  const sentryFallBack = <ErrorPage />;
  return (
    <>
      <Sentry.ErrorBoundary fallback={sentryFallBack}>
        <ErrorBoundary>
          <RouterProvider router={router} />
          <Toaster />
        </ErrorBoundary>
      </Sentry.ErrorBoundary>
    </>
  );
}

export default App;
