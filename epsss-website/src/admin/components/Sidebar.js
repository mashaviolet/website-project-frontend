import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/admin/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {isOpen ? (
            <h2>Entebbe Parents</h2>
          ) : (
            <span className="sidebar-logo" title="Admin Dashboard">EP</span>
          )}
          <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
            {isOpen ? '\u00ab' : '\u00bb'}
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/news" className={({ isActive }) => isActive ? 'active' : ''}>
                News
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/home" className={({ isActive }) => isActive ? 'active' : ''}>
                Home Page
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/gallery" className={({ isActive }) => isActive ? 'active' : ''}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/programs" className={({ isActive }) => isActive ? 'active' : ''}>
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/admissions" className={({ isActive }) => isActive ? 'active' : ''}>
                Admissions
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/messages" className={({ isActive }) => isActive ? 'active' : ''}>
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/pages" className={({ isActive }) => isActive ? 'active' : ''}>
                Dynamic Pages
              </NavLink>
            </li>
            {/* Add more navigation items based on your needs */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;