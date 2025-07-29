import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../components/admin/Login/Login';
import Dashboard from '../components/admin/Dashboard/Dashboard';
import NewsManager from '../components/admin/NewsManager/NewsManager';
import GalleryManager from '../components/admin/GalleryManager/GalleryManager';
import MessagesViewer from '../components/admin/MessagesViewer/MessagesViewer';
import Sidebar from '../components/admin/Sidebar/Sidebar';

function AdminRoutes() {
  return (
    <Routes>
      {/* Admin Login - no layout */}
      <Route path="/login" element={<AdminLogin />} />
      
      {/* Dashboard with its own layout */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Other admin components - you can decide later if they need AdminLayout */}
      <Route path="/news" element={<NewsManager />} />
      <Route path="/gallery" element={<GalleryManager />} />
      <Route path="/messages" element={<MessagesViewer />} />
      <Route path="/sidebar" element={<Sidebar />} />
    </Routes>
  );
}

export default AdminRoutes;