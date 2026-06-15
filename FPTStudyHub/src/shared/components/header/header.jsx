import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          FPT <span>Study Hub</span>
        </Link>
      </div>
      
      <div className="header-center">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search documents, subjects, authors..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
        
        <div className="avatar-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
            alt="User Profile" 
            className="avatar-img"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;