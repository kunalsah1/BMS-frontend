import React from "react";
import { getItemInLocalStorage } from "../utils/localStorage";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getItemInLocalStorage("accessToken") || null;
  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
