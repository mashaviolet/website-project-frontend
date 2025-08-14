import React, { useState, useEffect } from 'react';
import WidgetCard from '../components/WidgetCard';
import '../../styles/admin/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalPrograms: 0,
    totalNews: 0,
    unreadMessages: 0,
    totalGalleryItems: 0,
    recentAdmissions: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data from your Flask backend
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Replace with your Flask API endpoints
      const response = await fetch('/api/admin/dashboard-stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setRecentActivities(data.recentActivities || []);
      } else {
        // Fallback with mock data for development
        setStats({
          totalStudents: 1247,
          totalPrograms: 12,
          totalNews: 45,
          unreadMessages: 23,
          totalGalleryItems: 156,
          recentAdmissions: 34
        });
        
        setRecentActivities([
          { id: 1, action: 'New student application received', time: '2 hours ago', type: 'admission' },
          { id: 2, action: 'News article "School Event 2024" published', time: '5 hours ago', type: 'news' },
          { id: 3, action: 'Gallery updated with 12 new photos', time: '1 day ago', type: 'gallery' },
          { id: 4, action: 'Contact form submitted by parent', time: '2 days ago', type: 'message' },
          { id: 5, action: 'Program "Advanced Mathematics" updated', time: '3 days ago', type: 'program' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set mock data as fallback
      setStats({
        totalStudents: 1247,
        totalPrograms: 12,
        totalNews: 45,
        unreadMessages: 23,
        totalGalleryItems: 156,
        recentAdmissions: 34
      });
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'admission': return '🎓';
      case 'news': return '📰';
      case 'gallery': return '📸';
      case 'message': return '💬';
      case 'program': return '📚';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening at your school today.</p>
      </div>

      {/* Stats Widgets Row */}
      <div className="dashboard-stats">
        <WidgetCard
          title="Total Students"
          value={stats.totalStudents}
          icon="👥"
          trend="+12 this month"
          trendType="positive"
        />
        <WidgetCard
          title="Active Programs"
          value={stats.totalPrograms}
          icon="📚"
          trend="2 new programs"
          trendType="positive"
        />
        <WidgetCard
          title="Published News"
          value={stats.totalNews}
          icon="📰"
          trend="+5 this week"
          trendType="positive"
        />
        <WidgetCard
          title="Unread Messages"
          value={stats.unreadMessages}
          icon="💬"
          trend="High priority"
          trendType="warning"
        />
      </div>

      {/* Second Row of Stats */}
      <div className="dashboard-stats">
        <WidgetCard
          title="Gallery Items"
          value={stats.totalGalleryItems}
          icon="📸"
          trend="+20 this month"
          trendType="positive"
        />
        <WidgetCard
          title="New Admissions"
          value={stats.recentAdmissions}
          icon="🎓"
          trend="This semester"
          trendType="neutral"
        />
        <WidgetCard
          title="System Status"
          value="Online"
          icon="✅"
          trend="All systems operational"
          trendType="positive"
        />
        <WidgetCard
          title="Last Backup"
          value="2h ago"
          icon="💾"
          trend="Automated backup"
          trendType="positive"
        />
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activities</h2>
            <button className="refresh-btn" onClick={fetchDashboardData}>
              🔄 Refresh
            </button>
          </div>
          <div className="activities-list">
            {recentActivities.length > 0 ? (
              recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <span className="activity-icon">{getActivityIcon(activity.type)}</span>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activities">
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <button className="action-btn primary">
              <span className="action-icon">➕</span>
              Add News Article
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">📝</span>
              Review Applications
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">📸</span>
              Upload Photos
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">💬</span>
              View Messages
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">⚙️</span>
              Site Settings
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">📊</span>
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="dashboard-footer">
        <div className="system-info">
          <div className="info-item">
            <strong>Server Status:</strong> 
            <span className="status-indicator online"></span> Online
          </div>
          <div className="info-item">
            <strong>Last Login:</strong> {new Date().toLocaleString()}
          </div>
          <div className="info-item">
            <strong>Version:</strong> Admin Panel v2.1.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;