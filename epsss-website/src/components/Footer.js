import React from 'react';
import '../styles/public/Footer.css';
import { FaTiktok } from 'react-icons/fa6';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa'; // icons for address, phone, email

function Footer() {
  return (
    <footer className="footer-enhanced">
      <div className="footer-content">
        
        {/* School Information */}
        <div className="footer-section">
          <h3>Entebbe Parents Secondary School</h3>
          <p>Nurturing Excellence in Education</p>
          <p><FaMapMarkerAlt className="footer-icon" /> Katabi Namate, Entebbe, Uganda</p>
          <p><FaPhone className="footer-icon" /> +256 752 630 101</p>
          <p><FaEnvelope className="footer-icon" /> entebbeparentsss@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/admissions">Admissions</a></li>
            <li><a href="/programs">Programs</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/news">News & Events</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Programs */}
        <div className="footer-section">
          <h3>Our Programs</h3>
          <ul>
            <li><a href="/programs?tab=academics">Academic Programs</a></li>
            <li><a href="/programs?tab=co-curricular">Co-Curricular Activities</a></li>
            <li><a href="/programs?tab=sports">Sports</a></li>
            <li><a href="/programs?tab=spiritual">Spiritual Development</a></li>
            <li><a href="/programs?tab=leadership">Leadership & Development</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <p>Follow us for updates</p>
          <div className="footer-social">
            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@entebbeparents.s.s" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
            
            {/* Gmail */}
            <a 
              href="mailto:entebbeparentsss@gmail.com" 
              aria-label="Gmail"
            >
              <FaEnvelope />
            </a>
            
            {/* Youtube */}
            <a 
              href="https://www.youtube.com/watch?v=d030qnCVYpw&pp=ygUgZW50ZWJiZSBwYXJlbnRzIHNlY29uZGFyeSBzY2hvb2w%3D" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Entebbe Parents Secondary School. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
