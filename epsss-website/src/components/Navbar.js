import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
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
      { label: 'Our Foundation', id: 'our-foundation' },
      { label: 'Our Leadership', id: 'our-leadership' },
      { label: 'Our Achievements', id: 'our-achievements' },
      { label: 'Our Facilities', id: 'our-facilities' }
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
      { label: 'Spiritual', id: 'spiritual' },
      { label: 'Leadership', id: 'leadership' }
    ],
    'news': [
      { label: 'Latest News', id: 'latest-news' },
      { label: 'Upcoming Events', id: 'upcoming-events' },
      { label: 'Newsletter Signup', id: 'newsletter-signup' }
    ],
    'contact-us': [
      { label: 'Department Contacts', id: 'department-contacts' },
      { label: 'Send Us a Message', id: 'send-message' },
      { label: 'Find Us', id: 'find-us' },
      { label: 'Contact Summary', id: 'contact-summary' }
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
      // Mobile: toggle only the clicked dropdown independently
      setMobileDropdowns(prev => ({
        ...prev,
        [dropdownName]: !prev[dropdownName]
      }));
    } else {
      // Desktop: hover behavior handled by CSS
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    }
  };


  const renderNavLink = (to, label, dropdownKey) => {
    const isActive = location.pathname === to;
    const hasDropdown = dropdownItems[dropdownKey];
    const isMobile = window.innerWidth <= 768;
    const isDropdownOpen = isMobile ? mobileDropdowns[dropdownKey] : activeDropdown === dropdownKey;

    if (!hasDropdown) {
      // Regular link without dropdown, no arrow
      return (
        <Link
          to={to}
          className={isActive ? 'active' : ''}
        >
          {label}
        </Link>
      );
    }

    // Mobile: main link on left, arrow on right (only for dropdowns)
    if (isMobile) {
      return (
        <div className={`nav-dropdown mobile${isDropdownOpen ? ' mobile-open' : ''} ${isActive ? 'active' : ''}`}> 
          <div className="mobile-dropdown-row">
            <Link
              to={to}
              className={`nav-link-with-dropdown ${isActive ? 'active' : ''}`}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setActiveDropdown(null);
                setMobileDropdowns({});
              }}
              style={{ flex: 1 }}
            >
              {label}
            </Link>
            <button
              className="dropdown-arrow-btn"
              aria-label="Toggle dropdown"
              onClick={e => {
                e.preventDefault();
                handleDropdownToggle(dropdownKey);
              }}
              aria-expanded={!!mobileDropdowns[dropdownKey]}
            >
              <FaChevronDown style={{ transform: mobileDropdowns[dropdownKey] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
          </div>
          <div
            className="nav-dropdown-content"
            style={{ display: isDropdownOpen ? 'block' : undefined }}
          >
            {dropdownItems[dropdownKey].map((item, idx) => {
              let linkTo = `${to}#${item.id}`;
              if (dropdownKey === 'about-us') {
                linkTo = `/about-us/${item.id}`;
              } else if (dropdownKey === 'admissions') {
                linkTo = `/admissions/${item.id}`;
              } else if (dropdownKey === 'programs') {
                linkTo = `/programs/${item.id}`;
              } else if (dropdownKey === 'news') {
                linkTo = `/news/${item.id}`;
              } else if (dropdownKey === 'contact-us') {
                linkTo = `/contact-us/${item.id}`;
              }
              return (
                <Link
                  key={idx}
                  to={linkTo}
                  className="dropdown-item"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveDropdown(null);
                    setMobileDropdowns({});
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      );
    }

    // Desktop: only dropdown links show the arrow
    return (
      <div 
        className={`nav-dropdown${isDropdownOpen ? ' open' : ''} ${isActive ? 'active' : ''}`}
        onMouseEnter={() => {
          clearTimeout(window.dropdownTimeout);
          setActiveDropdown(dropdownKey);
        }}
        onMouseLeave={() => {
          window.dropdownTimeout = setTimeout(() => {
            setActiveDropdown(null);
          }, 200);
        }}
      >
        <Link
          to={to}
          className={`nav-link-with-dropdown ${isActive ? 'active' : ''}`}
        >
          {label}
          <span className="dropdown-arrow">
            <FaChevronDown />
          </span>
        </Link>
        <div
          className="nav-dropdown-content"
          style={{ display: isDropdownOpen ? 'block' : undefined }}
        >
          {dropdownItems[dropdownKey].map((item, idx) => {
            let linkTo = `${to}#${item.id}`;
            if (dropdownKey === 'about-us') {
              linkTo = `/about-us/${item.id}`;
            } else if (dropdownKey === 'admissions') {
              linkTo = `/admissions/${item.id}`;
            } else if (dropdownKey === 'programs') {
              linkTo = `/programs/${item.id}`;
            } else if (dropdownKey === 'news') {
              linkTo = `/news/${item.id}`;
            } else if (dropdownKey === 'contact-us') {
              linkTo = `/contact-us/${item.id}`;
            }
            return (
              <Link
                key={idx}
                to={linkTo}
                className="dropdown-item"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveDropdown(null);
                  setMobileDropdowns({});
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <nav ref={navbarRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      
      {/* Logo with school name */}
      <Link to="/" className="logo">
        <img
          src={badge}
          alt="EPSS Logo"
          className="badge-logo"
        />
        <span className="school-name">Entebbe Parents Secondary School</span>
      </Link>

      {/* Mobile menu button */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Nav links */}
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        {renderNavLink('/about-us', 'About Us', 'about-us')}
        {renderNavLink('/admissions', 'Admissions', 'admissions')}
        {renderNavLink('/programs', 'Programs', 'programs')}
        {renderNavLink('/news', 'News & Events', 'news')}
        {renderNavLink('/gallery', 'Gallery', 'gallery')}
        {renderNavLink('/contact-us', 'Contact Us', 'contact-us')}
      </div>
    </nav>
  );
}

export default Navbar;
