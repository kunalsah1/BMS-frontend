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
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/add/quotation" element={<CreateQuotation />} />
        <Route path="/setup" element={<Setup />} />
      </Route>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

export default router;
