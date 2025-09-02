import React, { useEffect, useState } from 'react';
import '../../styles/admin/Dashboard.css';
import api from '../../admin/services/api';
import WidgetCard from '../components/WidgetCard';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserShield, 
  FaFileAlt, 
  FaNewspaper, 
  FaImages, 
  FaEnvelope,
  FaPlus,
  FaEdit,
  FaUpload,
  FaChartLine,
  FaClock
} from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [me, setMe] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [statsRes, meRes, activityRes] = await Promise.all([
          api.get('/auth/stats'),
          api.get('/auth/me'),
          api.get('/auth/recent-activity') // Assuming this endpoint exists
        ]);
        if (!cancelled) {
          setStats(statsRes.data);
          setMe(meRes.data);
          setRecentActivity(activityRes.data || []);
        }
      } catch (e) {
        if (!cancelled) setError('Failed to load dashboard data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const cards = [
    { 
      title: 'Admins', 
      key: 'admins', 
      icon: <FaUserShield className="widget-icon" />, 
      onClick: () => navigate('/admin/admins'),
      color: 'var(--dark-green)'
    },
    { 
      title: 'Pages', 
      key: 'pages', 
      icon: <FaFileAlt className="widget-icon" />, 
      onClick: () => navigate('/admin/pages'),
      color: 'var(--primary-green)'
    },
    { 
      title: 'News', 
      key: 'news', 
      icon: <FaNewspaper className="widget-icon" />, 
      onClick: () => navigate('/admin/news'),
      color: 'var(--light-green)'
    },
    { 
      title: 'Gallery', 
      key: 'gallery', 
      icon: <FaImages className="widget-icon" />, 
      onClick: () => navigate('/admin/gallery'),
      color: 'var(--accent-yellow)'
    },
    { 
      title: 'Messages', 
      key: 'messages', 
      icon: <FaEnvelope className="widget-icon" />, 
      onClick: () => navigate('/admin/messages'),
      color: 'var(--hover-green)'
    },
  ];

  const quickActions = [
    { 
      title: 'Create Page', 
      icon: <FaPlus />,
      action: () => navigate('/admin/pages/create')
    },
    { 
      title: 'Edit About', 
      icon: <FaEdit />,
      action: () => navigate('/admin/about')
    },
    { 
      title: 'Add News', 
      icon: <FaPlus />,
      action: () => navigate('/admin/news/create')
    },
    { 
      title: 'Upload Image', 
      icon: <FaUpload />,
      action: () => navigate('/admin/gallery/upload')
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <div className="dashboard-welcome">
          Welcome back, <span className="admin-name">{me?.username || 'Admin'}</span>
        </div>
      </div>
      
      {loading && (
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      )}
      
      {error && (
        <div className="dashboard-error">
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
      
      {!loading && !error && (
        <>
          <div className="stats-container">
            {cards.map((c) => (
              <WidgetCard
                key={c.key}
                title={c.title}
                value={stats?.[c.key] ?? 0}
                icon={c.icon}
                onClick={c.onClick}
                color={c.color}
              />
            ))}
          </div>
          
          <div className="dashboard-row">
            <div className="dashboard-card quick-actions-card">
              <div className="card-header">
                <h2 className="card-title">Quick Actions</h2>
                <FaChartLine className="card-icon" />
              </div>
              <div className="quick-actions">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="admin-btn"
                    onClick={action.action}
                  >
                    <span className="btn-icon">{action.icon}</span>
                    {action.title}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="dashboard-card system-card">
              <div className="card-header">
                <h2 className="card-title">System Information</h2>
                <FaClock className="card-icon" />
              </div>
              <div className="system-info">
                <div className="info-item">
                  <div className="info-label">Signed in as</div>
                  <div className="info-value">{me?.username || 'Unknown'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Role</div>
                  <div className="info-value">{me?.role || 'Administrator'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">API Endpoint</div>
                  <div className="info-value">
                    {process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {recentActivity.length > 0 && (
            <div className="dashboard-card activity-card">
              <div className="card-header">
                <h2 className="card-title">Recent Activity</h2>
                <FaClock className="card-icon" />
              </div>
              <div className="activity-list">
                {recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-time">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                    <div className="activity-action">
                      {activity.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;