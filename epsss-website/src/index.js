import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminApp from './admin/AdminApp'; // adjust path if needed
import './styles/colors.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Admin site */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* Public site */}
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
