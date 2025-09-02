import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaMap, FaDirections } from 'react-icons/fa';
import '../styles/public/ContactUs.css';

function Contact() {
  const location = useLocation();
  const { section } = useParams();

  useEffect(() => {
    let target = null;
    if (section) {
      target = section;
    } else if (location.hash) {
      target = location.hash.replace('#', '');
    }
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location, section]);
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
  const schoolCoordinates = {
    lat: 0.0782,
    lng: 32.4659
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      setTimeout(() => setSubmitStatus(''), 4000);
    }, 1500);
  };

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${schoolCoordinates.lat},${schoolCoordinates.lng}&zoom=15`,
      '_blank'
    );
  };

  const getDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${schoolCoordinates.lat},${schoolCoordinates.lng}&travelmode=driving`,
      '_blank'
    );
  };

  const departments = [
    {
      name: 'Administration Office',
      head: 'Mr. Kagwwa Andrew',
      phone: '+256 774 222898',
      email: 'admin@entebbeprentsss.ac.ug'
    },
    {
      name: 'Admissions Office',
      head: 'Mr. Mugisa Arthur',
      phone: '+256 778 454545',
      email: 'admissions@entebbeprentsss.ac.ug'
    },
    {
      name: 'Academic Affairs',
      head: 'Mr. Kizito Musa',
      phone: '+256 701 234 567',
      email: 'academics@entebbeprentsss.ac.ug'
    }
  ];

  return (
    <div className="contact-page">
      {/* Departments */}
  <section className="departments-section-main fade-in" id="department-contacts">
        <div className="container">
          <h2>Department Contacts</h2>
          <div className="departments-grid">
            {departments.map((dept, index) => (
              <div key={index} className="department-card">
                <h3>{dept.name}</h3>
                <p><strong>{dept.head}</strong></p>
                <p><FaPhone className="icon" /> {dept.phone}</p>
                <p><FaEnvelope className="icon" /> {dept.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
  <section className="contact-form-section-main slide-up" id="send-message">
        <div className="container">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email Address </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Inquiry Type</label>
                <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange}>
                  <option value="general">General Inquiry</option>
                  <option value="admissions">Admissions</option>
                  <option value="academics">Academic Programs</option>
                  <option value="fees">Fees Information</option>
                  <option value="transport">Transport Services</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Subject </label>
              <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Message </label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} required rows="6" />
            </div>
            <button type="submit" className={`submit-btn ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <div className="success-message">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Updated Map Section - No API Required */}
  <section className="map-section fade-in" id="find-us">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-wrapper">
            <div className="location-card">
              <div className="location-info">
                <h3><FaMapMarkerAlt className="icon" /> Our Location</h3>
                <p><strong>Entebbe Parents Senior Secondary School</strong></p>
                <p>Entebbe, Central Region, Uganda</p>
                <p>Coordinates: {schoolCoordinates.lat}, {schoolCoordinates.lng}</p>
                <div className="location-details">
                  <p><strong>Address:</strong> Along Entebbe Road, Entebbe Municipality</p>
                  <p><strong>Landmark:</strong> Near Entebbe International Airport</p>
                </div>
              </div>
              <div className="location-visual">
                <div className="map-placeholder">
                  <div className="map-pin"><FaMapMarkerAlt /></div>
                  <p>Interactive Map</p>
                  <small>Click below to view on Google Maps</small>
                </div>
              </div>
            </div>
            <div className="map-actions">
              <button onClick={openGoogleMaps} className="map-action-btn primary">
                <FaMap className="icon" /> View on Google Maps
              </button>
              <button onClick={getDirections} className="map-action-btn secondary">
                <FaDirections className="icon" /> Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Summary */}
  <section className="contact-summary-section" id="contact-summary">
        <div className="container contact-summary-grid">
          <div className="contact-summary-card">
            <FaPhone className="icon-large" />
            <h3>Call Us</h3>
            <p>+256 774 222898</p>
            <p>+256 778 454545</p>
          </div>
          <div className="contact-summary-card">
            <FaEnvelope className="icon-large" />
            <h3>Email Us</h3>
            <p>admin@entebbeprentsss.ac.ug</p>
            <p>admissions@entebbeprentsss.ac.ug</p>
          </div>
          <div className="contact-summary-card">
            <FaClock className="icon-large" />
            <h3>Office Hours</h3>
            <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
            <p>Sat: 8:00 AM - 12:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;