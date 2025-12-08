import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['trips', 'training', 'gear', 'seasons', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial active section
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for fixed header
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header id="header">
      <div className="container topbar">
        <div className="brand" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <div className="logo">JT</div>
          <div>
            <div className="brand-text">JUMA TREK</div>
            <div className="brand-tagline">Walk in Nepal</div>
          </div>
        </div>
        <nav id="nav" className={mobileMenuOpen ? 'mobile-open' : ''}>
          <ul>
            {['trips', 'training', 'gear', 'seasons', 'about', 'contact'].map((section) => (
              <li key={section}>
                <a 
                  href={`#${section}`} 
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                    if (mobileMenuOpen) setMobileMenuOpen(false);
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <Link 
                to="/booking" 
                className="btn btn-book" 
                onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
              >
                <i className="fas fa-calendar-alt"></i> Book Now
              </Link>
            </li>
          </ul>
        </nav>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <style jsx>{`
        #header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background-color: white;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .nav-link {
          display: inline-block;
          padding: 8px 16px;
          margin: 0 4px;
          border-radius: 6px;
          color: #4a6fa5; /* Matching the blue color from the Book Now button */
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          font-weight: 500;
          background-color: transparent;
        }

        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #3a5a80; /* Slightly darker blue on hover */
          box-shadow: 0 2px 8px rgba(74, 111, 165, 0.2);
        }

        .nav-link.active {
          background-color: rgba(74, 111, 165, 0.15); /* Light blue background for active state */
          color: #4a6fa5;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(74, 111, 165, 0.2);
        }

        .nav-link.active:hover {
          background-color: rgba(74, 111, 165, 0.2);
          box-shadow: 0 2px 8px rgba(74, 111, 165, 0.3);
        }

        .mobile-open ul {
          display: flex !important;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          padding: 10px 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .mobile-open .nav-link {
          margin: 4px 0;
          padding: 10px 16px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        @media (min-width: 769px) {
          #nav ul {
            display: flex !important;
            align-items: center;
          }
          
          #header .topbar {
            padding: 5px 0;
            transition: all 0.3s ease;
          }
          
          #header.scrolled .topbar {
            padding: 10px 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

