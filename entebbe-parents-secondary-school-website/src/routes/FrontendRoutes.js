import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontendLayout from '../layouts/FrontendLayout';
import Home from '../components/frontend/Home/Home';
import AboutUs from '../components/frontend/About/AboutUs';
import Admissions from '../components/frontend/Admissions/Admissions';
import Programs from '../components/frontend/Programs/Programs';
import News from '../components/frontend/News/News';
import Gallery from '../components/frontend/Gallery/Gallery';
import ContactUs from '../components/frontend/Contact/ContactUs';

function FrontendRoutes() {
  return (
    <FrontendLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/news" element={<News />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </FrontendLayout>
  );
}

export default FrontendRoutes;