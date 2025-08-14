import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Import your page components (you'll create these next)
import Dashboard from './pages/Dashboard';
import AboutUsManager from './pages/AboutUsManager';
import ProgramsManager from './pages/ProgramsManager';
import AdmissionsManager from './pages/AdmissionsManager';
import NewsManager from './pages/NewsManager';
import GalleryManager from './pages/GalleryManager';
import ContactUsManager from './pages/ContactUsManager';
import MessagesViewer from './pages/MessagesViewer';

import '../styles/admin/AdminApp.css';

const AdminApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return <AboutUsManager />;
      case 'programs':
        return <ProgramsManager />;
      case 'admissions':
        return <AdmissionsManager />;
      case 'news':
        return <NewsManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'contact':
        return <ContactUsManager />;
      case 'messages':
        return <MessagesViewer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-app">
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      {/* Main Content Area */}
      <div className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Topbar */}
        <Topbar
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Page Content */}
        <div className="admin-content">
          <div className="content-wrapper">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;