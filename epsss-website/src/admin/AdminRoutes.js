import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminApp from "./AdminApp";
import AdminLogin from "./pages/Login";
import RequireAdminAuth from "./RequireAdminAuth";

function AdminRoutes() {
  return (
    <Routes>
      {/* Public admin login route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="/admin/*"
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
