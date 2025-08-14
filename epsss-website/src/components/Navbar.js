import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/public/Navbar.css';
import badge from '../assets/logo2.png';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const location = useLocation();
  const navbarRef = useRef(null);

  // Dropdown menu items
  const dropdownItems = {
    'about-us': [
      { label: 'Our History', id: 'our-history' },
      { label: 'Our Achievements', id: 'our-achievements' },
      { label: 'Our Foundation', id: 'our-foundation' },
      { label: 'Academic Excellence', id: 'academic-excellence' },
      { label: 'Our Leadership', id: 'our-leadership' },
      { label: 'Our Facilities', id: 'our-facilities' },
      { label: 'Community Engagement', id: 'community-engagement' }
    ],
    'admissions': [
      { label: 'Requirements', id: 'requirements' },
      { label: 'Fee Structure', id: 'fee-structure' },
      { label: 'Important Dates', id: 'important-dates' },
      { label: 'Application Process', id: 'application-process' }
    ],
    'programs': [
      { label: 'Academics', id: 'academics' },
      { label: 'Co-Curricular', id: 'co-curricular' },
      { label: 'Sports', id: 'sports' },
      { label: 'Spiritual & Leadership', id: 'spiritual-leadership' }
    ],
    'news': [
      { label: 'Latest News', id: 'latest-news' },
      { label: 'Upcoming Events', id: 'upcoming-events' }
    ],
    'contact-us': [
      { label: 'Department Contacts', id: 'department-contacts' },
      { label: 'Send Us a Message', id: 'send-message' },
      { label: 'Find Us', id: 'find-us' }
    ]
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdowns({});
  }, [location]);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null); // Close any open dropdowns when toggling mobile menu
  };

  const handleDropdownToggle = (dropdownName) => {
    if (window.innerWidth <= 768) {
      // Mobile: toggle accordion style
      setMobileDropdowns(prev => ({
        ...prev,
        [dropdownName]: !prev[dropdownName]
      }));
    } else {
      // Desktop: hover behavior handled by CSS
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    }
  };

  const handleDropdownItemClick = (pageRoute, sectionId) => {
    // Close all menus
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdowns({});

    // Navigate to page and scroll to section
    if (location.pathname === pageRoute) {
      // Already on the page, just scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest' 
          });
        }
      }, 100);
    }
    // If navigating to different page, the scrolling will be handled by the target page
  };

  const renderDropdownContent = (items, pageRoute, isMobile = false) => {
    return (
      <div className={`nav-dropdown-content ${isMobile ? 'mobile-dropdown' : ''}`}>
        {items.map((item, index) => (
          <Link
            key={index}
            to={`${pageRoute}#${item.id}`}
            onClick={() => handleDropdownItemClick(pageRoute, item.id)}
            className="dropdown-item"
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  };

  const renderNavLink = (to, label, dropdownKey) => {
    const isActive = location.pathname === to;
    const hasDropdown = dropdownItems[dropdownKey];

    if (!hasDropdown) {
      // Regular link without dropdown
      return (
        <Link
          to={to}
          className={isActive ? 'active' : ''}
        >
          {label}
        </Link>
      );
    }

    // Link with dropdown
    return (
      <div 
        className={`nav-dropdown ${isActive ? 'active' : ''}`}
        onMouseEnter={() => {
          if (window.innerWidth > 768) {
            clearTimeout(window.dropdownTimeout);
            setActiveDropdown(dropdownKey);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth > 768) {
            window.dropdownTimeout = setTimeout(() => {
              setActiveDropdown(null);
            }, 200); // 200ms delay before closing
          }
        }}
      >
        <Link
          to={to}
          className={`nav-link-with-dropdown ${isActive ? 'active' : ''}`}
          onClick={(e) => {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              handleDropdownToggle(dropdownKey);
            }
          }}
        >
          {label}
          <span className="dropdown-arrow">
            {window.innerWidth <= 768 
              ? (mobileDropdowns[dropdownKey] ? '▼' : '▶') 
              : '▼'
            }
          </span>
        </Link>
        
        {/* Desktop dropdown */}
        {window.innerWidth > 768 && activeDropdown === dropdownKey && 
          renderDropdownContent(dropdownItems[dropdownKey], to)
        }
        
        {/* Mobile dropdown */}
        {window.innerWidth <= 768 && mobileDropdowns[dropdownKey] && 
          renderDropdownContent(dropdownItems[dropdownKey], to, true)
        }
      </div>
    );
  };

  return (
    <nav ref={navbarRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">
        <img
          src={badge}
          alt="EPSS Logo"
          className="badge-logo"
          style={{ width: '60px', height: '60px' }}
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
        {/* Home - no dropdown */}
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>

        {/* About Us - with dropdown */}
        {renderNavLink('/about-us', 'About Us', 'about-us')}

        {/* Admissions - with dropdown */}
        {renderNavLink('/admissions', 'Admissions', 'admissions')}

        {/* Programs - with dropdown */}
        {renderNavLink('/programs', 'Programs', 'programs')}

        {/* News & Events - with dropdown */}
        {renderNavLink('/news', 'News & Events', 'news')}

        {/* Gallery - with dropdown */}
        {renderNavLink('/gallery', 'Gallery', 'gallery')}

        {/* Contact Us - with dropdown */}
        {renderNavLink('/contact-us', 'Contact Us', 'contact-us')}
      </div>
    </nav>
  );
}

export default Navbar;