import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminApp from "./AdminApp";
import AdminLogin from "./pages/Login";
import RequireAdminAuth from "./RequireAdminAuth";

function AdminRoutes() {
  return (
    <Routes>
      {/* Public admin login route */}
      <Route path="login" element={<AdminLogin />} />

      {/* Default admin route - show login if no specific path */}
      <Route path="" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="dashboard"
        element={
          // <RequireAdminAuth>
            <AdminApp />
          // </RequireAdminAuth>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
