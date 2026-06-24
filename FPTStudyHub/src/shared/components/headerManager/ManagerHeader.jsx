import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ManagerHeader.css';

const ManagerHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="manager-header">
      <div className="manager-header-search">
        <Search size={18} className="manager-search-icon" />
        <input
          type="text"
          placeholder="Tìm kiếm tài liệu, người dùng..."
          className="manager-search-input"
        />
      </div>

      <div className="manager-header-actions">
        <button className="manager-icon-btn">
          <Bell size={20} />
          <span className="manager-notif-dot"></span>
        </button>
        <button className="manager-icon-btn">
          <HelpCircle size={20} />
        </button>
        <div className="manager-header-profile" onClick={() => navigate('/manager/settings')}>
          <div className="manager-profile-info">
            <span className="manager-profile-name">Manager</span>
            <span className="manager-profile-role">Admin Access</span>
          </div>
          <img
            src="https://ui-avatars.com/api/?name=Manager&background=random"
            alt="Profile"
            className="manager-header-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default ManagerHeader;
