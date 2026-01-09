import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">

        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand-section">
            <div className="footer-brand">
              <div className="brand-logo-container">
                <img src={logo} alt="JUMA TREK Logo" className="footer-logo" />
              </div>
              <div className="brand-text">
                <h2 className="brand-name">JUMA TREK</h2>
                <p className="brand-tagline">Authentic Himalayan Adventures</p>
              </div>
            </div>
            <p className="footer-description">
              Experience Nepal's majestic Himalayas with expert local guides. We create authentic, responsible adventures that benefit local communities.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com" className="social-link" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com" className="social-link" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://x.com" className="social-link" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.youtube.com" className="social-link" title="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Popular Treks */}
          <div className="footer-column">
            <h4 className="footer-title">Popular Treks</h4>
            <ul className="footer-links">
              <li><Link to="/trek/1">Everest Base Camp</Link></li>
              <li><Link to="/trek/2">Annapurna Circuit</Link></li>
              <li><Link to="/trek/3">Langtang Valley</Link></li>
              <li><Link to="/trek/4">Manaslu Circuit</Link></li>
              <li><Link to="/trek/5">Upper Mustang</Link></li>
              <li><Link to="/all-treks" className="view-all">View All Treks →</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/guides">Our Guides</a></li>
              <li><a href="/blog">Blog</a></li>
              
            </ul>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/#faq" onClick={(e) => {
                // If we're already on the home page, scroll to the FAQ section
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const element = document.getElementById('faq');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}>FAQ</Link></li>
              <li><Link to="/packing-lists">Packing Lists</Link></li>
              <li><Link to="/travel-tips">Travel Tips</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <p>Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <p>+977-1-XXXX-XXXX</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <p><a href="mailto:info@jumatrek.com">info@jumatrek.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-credits">
            <p>&copy; 2024 JUMA TREK. All rights reserved.</p>
          </div>
          <div className="footer-badges">
            <div className="badge">
              <i className="fas fa-certificate"></i>
              <span>Licensed & Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;