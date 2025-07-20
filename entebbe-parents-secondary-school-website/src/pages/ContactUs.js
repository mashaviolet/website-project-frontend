import React, { useState, useEffect } from 'react';
import '../styles/ContactUs.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let script = null;
    
    // Initialize map function - define this FIRST
    const initMap = () => {
      try {
        const schoolLocation = { lat: 0.0782, lng: 32.4659 }; // Entebbe coordinates
        
        const mapElement = document.getElementById('google-map');
        if (!mapElement) return;

        const map = new window.google.maps.Map(mapElement, {
          zoom: 15,
          center: schoolLocation,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#4a90e2' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry.fill',
              stylers: [{ color: '#f5f5f5' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#d4d4d4' }]
            },
            {
              featureType: 'poi.school',
              elementType: 'all',
              stylers: [{ visibility: 'on' }, { color: '#4CAF50' }]
            }
          ]
        });

        // Custom marker with school icon
        const marker = new window.google.maps.Marker({
          position: schoolLocation,
          map: map,
          title: 'Entebbe Parents Secondary School',
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" fill="#4CAF50" stroke="#fff" stroke-width="4"/>
                <text x="24" y="30" text-anchor="middle" fill="white" font-size="20" font-weight="bold">🏫</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(48, 48),
            anchor: new window.google.maps.Point(24, 24)
          }
        });

        // Enhanced info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="map-info-window">
              <div class="info-header">
                <h3>Entebbe Parents Secondary School</h3>
                <div class="school-rating">
                  <span class="stars">⭐⭐⭐⭐⭐</span>
                  <span class="rating-text">Excellent School</span>
                </div>
              </div>
              <div class="info-content">
                <p class="address"><strong>📍 Address:</strong><br>Plot 15, Kampala Road<br>Entebbe, Uganda</p>
                <div class="contact-info">
                  <p><strong>📞 Phone:</strong> +256 414 320 123</p>
                  <p><strong>✉️ Email:</strong> info@entebbeprentsss.ac.ug</p>
                </div>
                <div class="info-actions">
                  <a href="https://www.google.com/maps/dir//0.0782,32.4659" target="_blank" class="directions-btn">
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          `,
          maxWidth: 350
        });

        // Event listeners for marker
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Open info window by default after a short delay
        setTimeout(() => {
          infoWindow.open(map, marker);
        }, 1000);

        // Add click listener to map to close info window
        map.addListener('click', () => {
          infoWindow.close();
        });

        setMapLoaded(true);
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError(true);
      }
    };

    // Assign initMap to window so it can be called by Google Maps API
    window.initMap = initMap;

    const loadGoogleMapsScript = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Check if script is already loading
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        return;
      }
      
      script = document.createElement('script');

      // Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      script.id = 'google-maps-script'; // Add an ID for easier identification
      
      script.onload = () => setMapLoaded(true);
      script.onerror = () => setMapError(true);
      
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    // Cleanup function
    return () => {
      // Clean up the global initMap function
      if (window.initMap) {
        delete window.initMap;
      }
      
      // Only remove the script if we created it and it still exists
      if (script && script.parentNode) {
        try {
          script.parentNode.removeChild(script);
        } catch (error) {
          
          // Script may have already been removed, ignore the error
          console.log('Script cleanup: Script already removed or not found');
        }
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone Numbers',
      details: [
        '+256 414 320 123 (Main Office)',
        '+256 772 456 789 (Admissions)',
        '+256 701 234 567 (Director)'
      ]
    },
    {
      icon: '✉️',
      title: 'Email Addresses',
      details: [
        'info@entebbeprentsss.ac.ug',
        'admissions@entebbeprentsss.ac.ug',
        'director@entebbeprentsss.ac.ug'
      ]
    },
    {
      icon: '📍',
      title: 'Physical Address',
      details: [
        'Entebbe Parents Secondary School',
        'Plot 15, Kampala Road',
        'P.O. Box 1234, Entebbe, Uganda'
      ]
    },
    {
      icon: '🕒',
      title: 'Office Hours',
      details: [
        'Monday - Friday: 8:00 AM - 5:00 PM',
        'Saturday: 9:00 AM - 1:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  const departments = [
    {
      name: 'Administration Office',
      head: 'Mrs. Sarah Nakato',
      phone: '+256 414 320 123',
      email: 'admin@entebbeprentsss.ac.ug',
      role: 'School Administrator'
    },
    {
      name: 'Admissions Office',
      head: 'Mr. John Mubiru',
      phone: '+256 772 456 789',
      email: 'admissions@entebbeprentsss.ac.ug',
      role: 'Admissions Officer'
    },
    {
      name: 'Academic Affairs',
      head: 'Dr. Grace Namuli',
      phone: '+256 701 234 567',
      email: 'academics@entebbeprentsss.ac.ug',
      role: 'Academic Director'
    },
    {
      name: 'Student Affairs',
      head: 'Mr. Patrick Ssozi',
      phone: '+256 750 123 456',
      email: 'students@entebbeprentsss.ac.ug',
      role: 'Student Affairs Officer'
    },
    {
      name: 'Finance Office',
      head: 'Mrs. Betty Asiimwe',
      phone: '+256 782 345 678',
      email: 'finance@entebbeprentsss.ac.ug',
      role: 'Finance Officer'
    },
    {
      name: 'Transport & Logistics',
      head: 'Mr. David Kiwanuka',
      phone: '+256 704 567 890',
      email: 'transport@entebbeprentsss.ac.ug',
      role: 'Transport Coordinator'
    }
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p className="hero-subtitle">
            We're here to help! Get in touch with Entebbe Parents Secondary School for any inquiries, 
            admissions information, or general questions.
          </p>
        </div>
      </div>

      {/* Quick Contact Info */}
      <div className="quick-contact-section">
        <div className="contact-cards">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-card">
              <div className="contact-icon">{info.icon}</div>
              <h3>{info.title}</h3>
              <div className="contact-details">
                {info.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-main-content">
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inquiryType">Inquiry Type</label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="admissions">Admissions</option>
                  <option value="academics">Academic Programs</option>
                  <option value="fees">Fee Information</option>
                  <option value="transport">Transport Services</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Enter the subject of your inquiry"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">
                ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        <div className="departments-section">
          <h2>Department Contacts</h2>
          <div className="departments-grid">
            {departments.map((dept, index) => (
              <div key={index} className="department-card">
                <h3>{dept.name}</h3>
                <div className="department-info">
                  <p className="department-head">
                    <strong>{dept.head}</strong>
                    <span className="role">{dept.role}</span>
                  </p>
                  <div className="department-contacts">
                    <p className="phone">📞 {dept.phone}</p>
                    <p className="email">✉️ {dept.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
// All other code stays the same...
// Only the JSX around #google-map is modified

{/* Interactive Google Map Section */}
<div className="map-section">
  <h2>Find Us</h2>
  <div className="map-container">
    <div className="map-wrapper">
      {/* Google Map Container */}
      <div className="google-map-container">
        <div className="google-map">
          {!mapLoaded && !mapError && (
            <div className="map-loading">
              <div className="loading-spinner"></div>
              <p>Loading interactive map...</p>
            </div>
          )}
          {mapError && (
            <div className="map-fallback">
              <div className="fallback-content">
                <h3>📍 Entebbe Parents Secondary School</h3>
                <p>Plot 15, Kampala Road, Entebbe, Uganda</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=0.0782,32.4659" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="fallback-link"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          )}

          {/* This is the real Google Maps div - React should leave it empty */}
          <div id="google-map" />
        </div>
      </div>

      {/* Map Actions */}
      <div className="map-actions">
        <a 
          href="https://www.google.com/maps/search/?api=1&query=0.0782,32.4659" 
          target="_blank" 
          rel="noopener noreferrer"
          className="map-action-btn primary"
        >
          <span className="btn-icon">🗺️</span>
          Open in Google Maps
        </a>
        <a 
          href="https://www.google.com/maps/dir//0.0782,32.4659" 
          target="_blank" 
          rel="noopener noreferrer"
          className="map-action-btn secondary"
        >
          <span className="btn-icon">🧭</span>
          Get Directions
        </a>
      </div>
    </div>

    <div className="map-info">
      <div className="location-details">
        <h3>📍 Our Location</h3>
        <p className="address">Plot 15, Kampala Road, Entebbe, Uganda</p>
        <p className="postal">P.O. Box 1234, Entebbe</p>
        <p className="coordinates">Coordinates: 0.0782°N, 32.4659°E</p>
      </div>

      <div className="directions-info">
        <h4>🚗 How to Get Here</h4>
        <ul>
          <li>From Kampala: Take Entebbe Road towards Entebbe Airport (45 mins)</li>
          <li>Turn right at Kampala Road junction</li>
          <li>Continue for 200m - school is on your left</li>
          <li>Look for the green and yellow school signage</li>
        </ul>
      </div>

      <div className="landmarks-info">
        <h4>🏛️ Nearby Landmarks</h4>
        <ul>
          <li>Entebbe International Airport (5 km)</li>
          <li>Entebbe Municipal Council (2 km)</li>
          <li>Imperial Resort Beach Hotel (3 km)</li>
          <li>Entebbe Golf Club (1 km)</li>
          <li>Lake Victoria Shores (2.5 km)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

      {/* Emergency Contacts */}
      <div className="emergency-section">
        <h2>Emergency Contacts</h2>
        <div className="emergency-grid">
          <div className="emergency-card">
            <div className="emergency-icon">🚨</div>
            <h3>School Emergency</h3>
            <p className="emergency-number">+256 701 234 567</p>
            <p className="emergency-time">24/7 Available</p>
          </div>
          <div className="emergency-card">
            <div className="emergency-icon">🏥</div>
            <h3>Medical Emergency</h3>
            <p className="emergency-number">+256 414 320 124</p>
            <p className="emergency-time">School Hours</p>
          </div>
          <div className="emergency-card">
            <div className="emergency-icon">🚌</div>
            <h3>Transport Emergency</h3>
            <p className="emergency-number">+256 704 567 890</p>
            <p className="emergency-time">Transport Hours</p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="social-section">
        <h2>Connect With Us</h2>
        <p className="social-subtitle">Stay updated with school news and events</p>
        <div className="social-links">
          <a href="#" className="social-link facebook">
            <span className="social-icon">📘</span>
            <div className="social-content">
              <strong>Facebook</strong>
              <span>Latest updates & photos</span>
            </div>
          </a>
          <a href="#" className="social-link twitter">
            <span className="social-icon">🐦</span>
            <div className="social-content">
              <strong>Twitter</strong>
              <span>News & announcements</span>
            </div>
          </a>
          <a href="#" className="social-link instagram">
            <span className="social-icon">📸</span>
            <div className="social-content">
              <strong>Instagram</strong>
              <span>School life & events</span>
            </div>
          </a>
          <a href="#" className="social-link youtube">
            <span className="social-icon">🎥</span>
            <div className="social-content">
              <strong>YouTube</strong>
              <span>Videos & virtual tours</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;