import React from "react";
import { Navigate } from "react-router-dom";

function RequireAdminAuth({ children }) {
  const isLoggedIn = localStorage.getItem("adminToken"); // or your auth state

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default RequireAdminAuth;
