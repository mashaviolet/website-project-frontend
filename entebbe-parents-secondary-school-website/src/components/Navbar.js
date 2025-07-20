import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import badge from '../assets/badge.jpg';

function Navbar() {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
const location = useLocation();
// Handle scroll effect
useEffect(() => {
const handleScroll = () => {
setIsScrolled(window.scrollY > 50);
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
// Close mobile menu when route changes
useEffect(() => {
setIsMobileMenuOpen(false);
}, [location]);
const toggleMobileMenu = () => {
setIsMobileMenuOpen(!isMobileMenuOpen);
};
return (
<nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
<Link to="/" className="logo">
<img
src={badge}
alt="EPSS Logo"
className="badge-logo"
style={{ width: '60px', height: '60'}}
/>
</Link>

<button
className="mobile-menu-toggle"
onClick={toggleMobileMenu}
aria-label="Toggle mobile menu"
>
{isMobileMenuOpen ? '✕' : '☰'}
</button>

<div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
<Link
to="/"
className={location.pathname === '/' ? 'active' : ''}
>
Home
</Link>
<Link
to="/about"
className={location.pathname === '/about' ? 'active' : ''}
>
About Us
</Link>
<Link
to="/admissions"
className={location.pathname === '/admissions' ? 'active' : ''}
>
Admissions
</Link>
<Link
to="/programs"
className={location.pathname === '/programs' ? 'active' : ''}
>
Programs
</Link>
<Link
to="/news"
className={location.pathname === '/news' ? 'active' : ''}
>
News & Events
</Link>
<Link
to="/gallery"
className={location.pathname === '/gallery' ? 'active' : ''}
>
Gallery
</Link>
<Link
to="/contact"
className={location.pathname === '/contact' ? 'active' : ''}
>
Contact Us
</Link>
</div>
</nav>
);
}
export default Navbar;