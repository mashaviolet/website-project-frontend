import React from 'react';
import '../styles/Button.css';

const Button = ({ children, className, ...props }) => {
  return (
    <button className={`admin-btn ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;