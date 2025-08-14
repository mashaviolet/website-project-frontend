import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./admin/AdminRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site routes */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
