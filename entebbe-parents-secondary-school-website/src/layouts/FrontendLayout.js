import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const FrontendLayout = ({ children }) => {
  return (
    <div className="frontend-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default FrontendLayout;