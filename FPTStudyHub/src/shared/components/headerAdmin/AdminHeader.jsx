import React from 'react';
import { Search, Bell, History, ShieldCheck } from 'lucide-react';
import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="admin-header-search">
        <Search size={18} className="admin-search-icon" />
        <input
          type="text"
          placeholder="Global Admin Search..."
          className="admin-search-input"
        />
      </div>

      <div className="admin-header-actions">
        <button className="admin-icon-btn">
          <Bell size={20} />
          <span className="admin-notif-dot"></span>
        </button>
        <button className="admin-icon-btn">
          <History size={20} />
        </button>
        <button className="admin-icon-btn">
          <ShieldCheck size={20} />
        </button>
        <div className="header-profile">
          <img
            src="https://ui-avatars.com/api/?name=Admin+Admin&background=random"
            alt="Profile"
            className="header-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
