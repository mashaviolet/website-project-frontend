import React, { useState } from 'react';
import '../../styles/admin/Topbar.css';

const Topbar = ({ activeTab, sidebarCollapsed, toggleMobileSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const getPageTitle = (tab) => {
    const titles = {
      dashboard: 'Dashboard',
      about: 'About Us Management',
      programs: 'Programs Management',
      admissions: 'Admissions Management',
      news: 'News & Events Management',
      gallery: 'Gallery Management',
      contact: 'Contact Us Management',
      messages: 'Messages'
    };
    return titles[tab] || 'Admin Panel';
  };

  const notifications = [
    { id: 1, type: 'message', text: 'New contact form submission', time: '5 min ago' },
    { id: 2, type: 'update', text: 'Program information updated', time: '1 hour ago' },
    { id: 3, type: 'alert', text: 'Server maintenance scheduled', time: '2 hours ago' }
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };

  return (
    <div className={`topbar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="topbar-left">
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileSidebar}
        >
          ☰
        </button>
        
        <div className="page-title">
          <h1>{getPageTitle(activeTab)}</h1>
          <div className="breadcrumb">
            <span>Admin</span>
            <span className="breadcrumb-separator">></span>
            <span className="breadcrumb-current">{getPageTitle(activeTab)}</span>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="topbar-actions">
          <div className="notification-wrapper">
            <button 
              className="notification-btn"
              onClick={toggleNotifications}
            >
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
            
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <button className="mark-all-read">Mark all read</button>
                </div>
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`notification-item ${notification.type}`}>
                      <div className="notification-content">
                        <p className="notification-text">{notification.text}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="notification-footer">
                  <button className="view-all-btn">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="profile-wrapper">
            <button 
              className="profile-btn"
              onClick={toggleProfile}
            >
              <div className="profile-avatar">👤</div>
              <span className="profile-name">Admin</span>
              <span className="profile-arrow">▼</span>
            </button>

            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <div className="profile-avatar-large">👤</div>
                  <div className="profile-details">
                    <h4>Administrator</h4>
                    <p>admin@school.com</p>
                  </div>
                </div>
                <div className="profile-menu">
                  <button className="profile-menu-item">
                    <span className="menu-icon">⚙️</span>
                    Settings
                  </button>
                  <button className="profile-menu-item">
                    <span className="menu-icon">👤</span>
                    Profile
                  </button>
                  <button className="profile-menu-item">
                    <span className="menu-icon">🔐</span>
                    Change Password
                  </button>
                  <hr className="menu-divider" />
                  <button className="profile-menu-item logout">
                    <span className="menu-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {(showNotifications || showProfile) && (
        <div 
          className="overlay"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default Topbar;