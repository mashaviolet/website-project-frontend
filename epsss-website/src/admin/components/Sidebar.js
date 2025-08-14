import React, { useState } from 'react';
import '../../styles/admin/Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'about', label: 'About Us', icon: '📋' },
    { id: 'programs', label: 'Programs', icon: '🎓' },
    { id: 'admissions', label: 'Admissions', icon: '📝' },
    { id: 'news', label: 'News & Events', icon: '📰' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'contact', label: 'Contact Us', icon: '📞' },
    { id: 'messages', label: 'Messages', icon: '💬' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-section">
          {!isCollapsed && (
            <>
              <div className="logo-icon">🎓</div>
              <h2 className="logo-text">Admin Panel</h2>
            </>
          )}
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-text">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-section">
          <div className="user-avatar">👤</div>
          {!isCollapsed && (
            <div className="user-info">
              <p className="user-name">Admin User</p>
              <p className="user-role">Administrator</p>
            </div>
          )}
        </div>
        <button className="logout-btn" title={isCollapsed ? 'Logout' : ''}>
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;