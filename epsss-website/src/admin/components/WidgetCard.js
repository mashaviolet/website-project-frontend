import React from 'react';
import '../../styles/admin/WidgetCard.css';

const WidgetCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendType = 'neutral',
  onClick,
  loading = false 
}) => {
  const getTrendClass = () => {
    switch (trendType) {
      case 'positive': return 'trend-positive';
      case 'negative': return 'trend-negative';
      case 'warning': return 'trend-warning';
      default: return 'trend-neutral';
    }
  };

  const getTrendIcon = () => {
    switch (trendType) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      case 'warning': return '⚠️';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="widget-card loading">
        <div className="widget-content">
          <div className="widget-header">
            <div className="loading-placeholder title-placeholder"></div>
            <div className="loading-placeholder icon-placeholder"></div>
          </div>
          <div className="loading-placeholder value-placeholder"></div>
          <div className="loading-placeholder trend-placeholder"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`widget-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="widget-content">
        <div className="widget-header">
          <h3 className="widget-title">{title}</h3>
          <span className="widget-icon">{icon}</span>
        </div>
        
        <div className="widget-value">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        {trend && (
          <div className={`widget-trend ${getTrendClass()}`}>
            <span className="trend-icon">{getTrendIcon()}</span>
            <span className="trend-text">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetCard;