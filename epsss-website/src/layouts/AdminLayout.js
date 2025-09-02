import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';
import Header from '../admin/components/Header';
import '../styles/admin/AdminLayout.css';
import api from '../admin/services/api';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await api.get('/auth/me');
        if (!cancelled) setAuthChecked(true);
      } catch (_) {
        if (!cancelled) navigate('/admin/login', { replace: true });
      }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  if (!authChecked) return null;

  return (
    <div className={`admin-layout${sidebarOpen ? ' sidebar-open' : ' sidebar-closed'}`}> 
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="admin-content">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;