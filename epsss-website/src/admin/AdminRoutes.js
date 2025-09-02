import React from 'react';
import { Routes, Route } from 'react-router-dom';


import AdminLayout from '../layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import AboutUsManager from './pages/AboutUsManager';
import DynamicPage from './components/DynamicPage';
import NewsManager from './pages/NewsManager';
import GalleryManager from './pages/GalleryManager';
import ProgramsManager from './pages/ProgramsManager';
import AdmissionsManager from './pages/AdmissionsManager';
import MessagesViewer from './pages/MessagesViewer';
import Login from './pages/Login';
import RequireAdminAuth from './RequireAdminAuth';
import ContactUsManager from './pages/ContactUsManager';
import HomeManager from './pages/HomeManager';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public admin route: login (no layout) */}
      <Route path="login" element={<Login />} />

      <Route path="/" element={<RequireAdminAuth><AdminLayout /></RequireAdminAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<AboutUsManager />} />
        <Route path="pages" element={<DynamicPage />} />
        <Route path="news" element={<NewsManager />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="programs" element={<ProgramsManager />} />
        <Route path="admissions" element={<AdmissionsManager />} />
  <Route path="messages" element={<MessagesViewer />} />
  <Route path="contact" element={<ContactUsManager />} />
  <Route path="home" element={<HomeManager />} />
        {/* Add more routes as needed based on your structure */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;