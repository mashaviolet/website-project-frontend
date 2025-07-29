import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontendRoutes from './FrontendRoutes';
import AdminRoutes from './AdminRoutes';

function AppRoutes() {
  return (
    <Routes>
      {/* Frontend Routes */}
      <Route path="/*" element={<FrontendRoutes />} />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default AppRoutes;