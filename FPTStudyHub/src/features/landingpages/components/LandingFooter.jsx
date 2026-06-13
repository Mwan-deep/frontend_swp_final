import React from 'react';
import { GraduationCap, Globe, HelpCircle } from 'lucide-react';

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="footer-left">
        <GraduationCap className="footer-logo-icon" size={20} />
        <span className="footer-logo-text">
          FPT <span className="logo-highlight">Study Hub</span>
        </span>
      </div>

      <div className="footer-center">
        <p className="copyright-text">
          &copy; {currentYear} FPT Study Hub. All rights reserved.
        </p>
      </div>

      <div className="footer-right">
        <button 
          className="footer-icon-btn" 
          aria-label="Language selection"
          onClick={() => alert('Language options: English, Vietnamese')}
        >
          <Globe size={18} />
        </button>
        <button 
          className="footer-icon-btn" 
          aria-label="Help and support"
          onClick={() => alert('Support portal opening soon...')}
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </footer>
  );
};

export default LandingFooter;