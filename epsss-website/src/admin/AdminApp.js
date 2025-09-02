import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import '../styles/colors.css'; // Your color theme
import './styles/AdminApp.css';

const AdminApp = () => {
  return (
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  );
};

export default AdminApp;