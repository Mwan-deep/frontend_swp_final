import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="landing-navbar">
      <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <GraduationCap className="logo-icon" size={26} />
        <span className="logo-text">FPT <span className="logo-highlight">Study Hub</span></span>
      </div>
      <div className="navbar-actions">
        <button 
          className="btn-login"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button 
          className="btn-register"
          onClick={() => navigate('/dashboard')}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;