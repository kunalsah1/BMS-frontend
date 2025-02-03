import * as Sentry from "@sentry/react";
import { Navigate, RouterProvider } from "react-router-dom";
import router from "./Routes";
import ErrorPage from "./Components/Error404";
import ErrorBoundary from "./Components/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { getItemInLocalStorage } from "./utils/localStorage";
import { useEffect } from "react";

function App() {
  const token = getItemInLocalStorage("accessToken");

  useEffect(() => {
    const checkLoggedIn = () => {
      if (token) {
        return <Navigate to={"/dashboard"} />;
      }
    };
    checkLoggedIn();
  }, []);
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
