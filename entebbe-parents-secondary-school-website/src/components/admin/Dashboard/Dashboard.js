import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // State to track which section is currently active
  const [activeSection, setActiveSection] = useState('overview');

  // Sample data - your partner will connect this to real backend later
  const [dashboardData] = useState({
    totalNews: 12,
    totalGalleryImages: 45,
    totalMessages: 8,
    recentActivity: [
      { action: 'New message received', time: '2 hours ago' },
      { action: 'News article published', time: '1 day ago' },
      { action: 'Gallery updated', time: '2 days ago' }
    ]
  });

  // Function to handle sidebar navigation
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Function to render different sections
  const renderMainContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="overview-section">
            <h2>Dashboard Overview</h2>
            
            {/* Quick Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{dashboardData.totalNews}</div>
                <div className="stat-label">News Articles</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{dashboardData.totalGalleryImages}</div>
                <div className="stat-label">Gallery Images</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{dashboardData.totalMessages}</div>
                <div className="stat-label">New Messages</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {dashboardData.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'news':
        return (
          <div className="content-section">
            <h2>News Management</h2>
            <p>Here you can add, edit, and delete news articles.</p>
            <div className="coming-soon">
              <p>📰 News management tools coming next!</p>
            </div>
          </div>
        );
      
      case 'gallery':
        return (
          <div className="content-section">
            <h2>Gallery Management</h2>
            <p>Here you can upload and manage gallery images.</p>
            <div className="coming-soon">
              <p>🖼️ Gallery management tools coming next!</p>
            </div>
          </div>
        );
      
      case 'messages':
        return (
          <div className="content-section">
            <h2>Messages</h2>
            <p>Here you can view messages from website visitors.</p>
            <div className="coming-soon">
              <p>💬 Message viewer coming next!</p>
            </div>
          </div>
        );
      
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>School Admin Dashboard</h1>
        </div>
        <div className="header-right">
          <span className="admin-welcome">Welcome, Admin!</span>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-main">
        {/* Sidebar Navigation */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li>
                <button 
                  className={`nav-btn ${activeSection === 'overview' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('overview')}
                >
                  📊 Overview
                </button>
              </li>
              <li>
                <button 
                  className={`nav-btn ${activeSection === 'news' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('news')}
                >
                  📰 News Management
                </button>
              </li>
              <li>
                <button 
                  className={`nav-btn ${activeSection === 'gallery' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('gallery')}
                >
                  🖼️ Gallery Management
                </button>
              </li>
              <li>
                <button 
                  className={`nav-btn ${activeSection === 'messages' ? 'active' : ''}`}
                  onClick={() => handleSectionChange('messages')}
                >
                  💬 Messages
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-content">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;