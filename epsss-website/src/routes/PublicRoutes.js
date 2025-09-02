// src/routes/PublicRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Admissions from "../pages/Admissions";
import Gallery from "../pages/Gallery";
import ContactUs from "../pages/ContactUs";
import News from "../pages/News";
import Programs from "../pages/Programs";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
  <Route path="/about-us" element={<MainLayout><AboutUs /></MainLayout>} />
  <Route path="/about-us/:section" element={<MainLayout><AboutUs /></MainLayout>} />
  <Route path="/admissions" element={<MainLayout><Admissions /></MainLayout>} />
  <Route path="/admissions/:section" element={<MainLayout><Admissions /></MainLayout>} />
      <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
  <Route path="/contact-us" element={<MainLayout><ContactUs /></MainLayout>} />
  <Route path="/contact-us/:section" element={<MainLayout><ContactUs /></MainLayout>} />
  <Route path="/news" element={<MainLayout><News /></MainLayout>} />
  <Route path="/news/:section" element={<MainLayout><News /></MainLayout>} />
  <Route path="/programs" element={<MainLayout><Programs /></MainLayout>} />
  <Route path="/programs/:section" element={<MainLayout><Programs /></MainLayout>} />
    </Routes>
  );
}

export default PublicRoutes;
