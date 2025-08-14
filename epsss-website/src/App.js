import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./admin/AdminRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes - must come before public routes to avoid conflicts */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Public site routes */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
