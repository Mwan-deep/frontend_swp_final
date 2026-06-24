import React, { useState } from 'react';
import SettingsSidebar from '../adminSettings/components/SettingsSidebar/SettingsSidebar';
import ManagerProfileSettings from '../managerSettings/components/ManagerProfileSettings/ManagerProfileSettings';
import ManagerSecuritySettings from '../managerSettings/components/ManagerSecuritySettings/ManagerSecuritySettings';
import '../adminSettings/components/SettingsSidebar/SettingsSidebar.css';
import './AdminSettings.css'; // Reusing AdminSettings layout styles

const ManagerSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-subtitle">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="settings-content">
          {activeTab === 'profile' && <ManagerProfileSettings />}
          {activeTab === 'security' && <ManagerSecuritySettings />}
        </div>
      </div>
    </>
  );
};

export default ManagerSettings;
