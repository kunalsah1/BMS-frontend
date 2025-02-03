import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import RootLayout from "../Containers/RootLayout";
import Dashboard from "../Pages/Main/Dashboard";
import Quotation from "../Pages/Main/Quotation";
import CreateQuotation from "../Pages/SubPages/CreateQuotation";
import Setup from "../Pages/Setup/Setup";
import Profile from "../Pages/Main/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/quotation"
          element={
            <ProtectedRoutes>
              <Quotation />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/add/quotation"
          element={
            <ProtectedRoutes>
              <CreateQuotation />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/setup"
          element={
            <ProtectedRoutes>
              <Setup />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

export default router;
