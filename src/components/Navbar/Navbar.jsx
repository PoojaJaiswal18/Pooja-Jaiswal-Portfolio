import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('about');
  const sections = ['about', 'skills', 'projects', 'contact'];
  
  useEffect(() => {
    
    handleScroll();
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100; 
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const element = document.getElementById(section);
      
      if (element) {
        const offsetTop = element.offsetTop;
        
        if (scrollPosition >= offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    }
  };
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };
  
  return (
    <>
      <nav className="vertical-nav">
        <ul className="nav-dots">
          {sections.map((section) => (
            <li key={section} className="nav-item">
              <button 
                className={`nav-dot ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollToSection(section)}
                aria-label={section}
              >
                <span className="dot"></span>
                <span className="nav-label">{section.toUpperCase()}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="social-links">
        <a href="https://www.linkedin.com/in/pooja-jaiswal-45776b229/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
        <a href="https://github.com/PoojaJaiswal18" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="mailto:jaiswal.pooja1809@gmail.com" aria-label="Email">
          <FaEnvelope />
        </a>
        <a href="https://leetcode.com/u/Pooja-Jaiswal18" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
          <SiLeetcode />
        </a>
      </div>
    </>
  );
};

export default Navbar;