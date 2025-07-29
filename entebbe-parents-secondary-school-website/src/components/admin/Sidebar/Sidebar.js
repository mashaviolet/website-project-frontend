import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  // Navigation menu items
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      path: '/admin/dashboard',
      type: 'single'
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: '💬',
      path: '/admin/messages',
      type: 'single',
      badge: 5 // Number of unread messages
    },
    {
      id: 'content',
      title: 'Content Management',
      icon: '📝',
      type: 'submenu',
      children: [
        {
          id: 'news',
          title: 'News & Updates',
          icon: '📰',
          path: '/admin/news'
        },
        {
          id: 'gallery',
          title: 'Gallery',
          icon: '🖼️',
          path: '/admin/gallery'
        },
        {
          id: 'programs',
          title: 'Academic Programs',
          icon: '🎓',
          path: '/admin/programs'
        }
      ]
    },
    {
      id: 'admissions',
      title: 'Admissions',
      icon: '🎒',
      type: 'submenu',
      children: [
        {
          id: 'applications',
          title: 'Applications',
          icon: '📋',
          path: '/admin/applications',
          badge: 12
        },
        {
          id: 'requirements',
          title: 'Requirements',
          icon: '📄',
          path: '/admin/requirements'
        },
        {
          id: 'fees',
          title: 'Fee Structure',
          icon: '💰',
          path: '/admin/fees'
        }
      ]
    },
    {
      id: 'students',
      title: 'Students',
      icon: '👥',
      type: 'submenu',
      children: [
        {
          id: 'student-records',
          title: 'Student Records',
          icon: '📚',
          path: '/admin/students'
        },
        {
          id: 'attendance',
          title: 'Attendance',
          icon: '📅',
          path: '/admin/attendance'
        },
        {
          id: 'grades',
          title: 'Grades & Results',
          icon: '📊',
          path: '/admin/grades'
        }
      ]
    },
    {
      id: 'staff',
      title: 'Staff Management',
      icon: '👨‍🏫',
      type: 'submenu',
      children: [
        {
          id: 'teachers',
          title: 'Teachers',
          icon: '🧑‍🏫',
          path: '/admin/teachers'
        },
        {
          id: 'admin-staff',
          title: 'Admin Staff',
          icon: '👔',
          path: '/admin/admin-staff'
        },
        {
          id: 'schedules',
          title: 'Schedules',
          icon: '⏰',
          path: '/admin/schedules'
        }
      ]
    },
    {
      id: 'finance',
      title: 'Finance',
      icon: '💳',
      type: 'submenu',
      children: [
        {
          id: 'payments',
          title: 'Payments',
          icon: '💸',
          path: '/admin/payments'
        },
        {
          id: 'expenses',
          title: 'Expenses',
          icon: '📊',
          path: '/admin/expenses'
        },
        {
          id: 'reports',
          title: 'Financial Reports',
          icon: '📈',
          path: '/admin/financial-reports'
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      type: 'submenu',
      children: [
        {
          id: 'school-info',
          title: 'School Information',
          icon: '🏫',
          path: '/admin/school-info'
        },
        {
          id: 'users',
          title: 'User Management',
          icon: '👤',
          path: '/admin/users'
        },
        {
          id: 'backup',
          title: 'Backup & Security',
          icon: '🔒',
          path: '/admin/backup'
        }
      ]
    }
  ];

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle submenu toggle
  const handleSubmenuToggle = (menuId) => {
    if (isCollapsed) {
      // If sidebar is collapsed, don't expand submenus
      return;
    }
    setExpandedSubmenu(expandedSubmenu === menuId ? null : menuId);
  };

  // Check if current path matches menu item
  const isActiveItem = (path) => {
    return location.pathname === path;
  };

  // Check if submenu has active child
  const hasActiveChild = (children) => {
    return children.some(child => isActiveItem(child.path));
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Add your logout logic here
      localStorage.removeItem('adminToken'); // Example
      navigate('/admin/login');
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-section">
          <div className="logo">
            🏫
          </div>
          {!isCollapsed && (
            <div className="school-info">
              <h3>EPSS</h3>
              <p>Admin Panel</p>
            </div>
          )}
        </div>
        <button 
          className="collapse-btn"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? '▶️' : '◀️'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              {item.type === 'single' ? (
                <button
                  className={`nav-link ${isActiveItem(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                  title={isCollapsed ? item.title : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="nav-text">{item.title}</span>
                      {item.badge && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </button>
              ) : (
                <div className={`submenu-container ${hasActiveChild(item.children) ? 'has-active' : ''}`}>
                  <button
                    className={`nav-link submenu-trigger ${expandedSubmenu === item.id ? 'expanded' : ''}`}
                    onClick={() => handleSubmenuToggle(item.id)}
                    title={isCollapsed ? item.title : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="nav-text">{item.title}</span>
                        <span className="submenu-arrow">
                          {expandedSubmenu === item.id ? '🔽' : '▶️'}
                        </span>
                      </>
                    )}
                  </button>
                  
                  {!isCollapsed && (
                    <ul className={`submenu ${expandedSubmenu === item.id ? 'expanded' : ''}`}>
                      {item.children.map((child) => (
                        <li key={child.id} className="submenu-item">
                          <button
                            className={`submenu-link ${isActiveItem(child.path) ? 'active' : ''}`}
                            onClick={() => handleNavigation(child.path)}
                          >
                            <span className="submenu-icon">{child.icon}</span>
                            <span className="submenu-text">{child.title}</span>
                            {child.badge && (
                              <span className="submenu-badge">{child.badge}</span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            👤
          </div>
          {!isCollapsed && (
            <div className="user-details">
              <h4>Admin User</h4>
              <p>Administrator</p>
            </div>
          )}
        </div>
        
        <div className="footer-actions">
          <button 
            className="action-btn"
            onClick={() => navigate('/admin/profile')}
            title={isCollapsed ? 'Profile Settings' : ''}
          >
            <span className="action-icon">👤</span>
            {!isCollapsed && <span>Profile</span>}
          </button>
          
          <button 
            className="action-btn logout-btn"
            onClick={handleLogout}
            title={isCollapsed ? 'Logout' : ''}
          >
            <span className="action-icon">🚪</span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Quick Stats (when collapsed) */}
      {isCollapsed && (
        <div className="quick-stats">
          <div className="stat-item" title="Unread Messages">
            💬 <span className="stat-count">5</span>
          </div>
          <div className="stat-item" title="Pending Applications">
            📋 <span className="stat-count">12</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;