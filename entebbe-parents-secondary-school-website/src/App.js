import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/AboutUs';
import Admissions from './pages/Admissions';
import Programs from './pages/Programs';
import News from './pages/News'
import Gallery from './pages/Gallery';
import Contact from './pages/ContactUs';
import './styles/colors.css';
function App() {
return (
<Router>
<Navbar />
<Routes>
<Route path='/' element={<Home />} />
<Route path='/about' element={<About />} />
<Route path='/admissions' element={<Admissions />} />
<Route path='/programs' element={<Programs />} />
<Route path='/news' element={<News />} />
<Route path='/gallery' element={<Gallery/>} />
<Route path='/contact' element={<Contact/>} />
</Routes>
<Footer />
</Router>
);
}
export default App;