import React from 'react';
import '../styles/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-enhanced">
      <div className="footer-content">
        {/* School Information */}
        <div className="footer-section">
          <h3>Entebbe Parents Secondary School</h3>
          <p>Nurturing Excellence in Education</p>
          <p>📍 Katabi Namate, Entebbe, Uganda. </p>
          <p>📞 +256 752 630 101</p>
          <p>✉️ entebbeparentsss@gmail.com.</p>
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

        {/* Programs - Updated with actual program categories */}
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
          <p>Follow us on social media for updates</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
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