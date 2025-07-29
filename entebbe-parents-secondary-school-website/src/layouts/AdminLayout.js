import React from 'react';
import Sidebar from '../components/admin/Sidebar/Sidebar';
import '../styles/admin.css';

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>EPSS Admin Dashboard</h1>
          <div className="admin-header-actions">
            <span>Welcome, Admin</span>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="admin-main">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;