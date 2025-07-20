import React from 'react';
import './Card.css'; // If you create a Card.css file

const Card = ({ 
  title, 
  children, 
  image, 
  imageAlt,
  footer,
  className = '',
  onClick
}) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt || title} />
        </div>
      )}
      
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        <div className="card-body">
          {children}
        </div>
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;