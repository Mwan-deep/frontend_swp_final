import React from 'react';
import { User, Shield } from 'lucide-react';
import './SettingsSidebar.css';

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="settings-sidebar">
      <ul className="settings-nav-list">
        <li>
          <button 
            className={`settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            Profile
          </button>
        </li>
        <li>
          <button 
            className={`settings-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} />
            Security
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
