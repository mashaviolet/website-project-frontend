import React from 'react';
import api from '../../admin/services/api';
import '../../styles/admin/Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <button
          className="admin-btn"
          onClick={async () => {
            try {
              await api.post('/auth/logout');
            } catch (_) {}
            window.location.assign('/admin/login');
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;