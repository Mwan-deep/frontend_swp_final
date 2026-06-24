import React, { useState } from 'react';
import SettingsSidebar from '../adminSettings/components/SettingsSidebar/SettingsSidebar';
import ProfileSettings from '../adminSettings/components/ProfileSettings/ProfileSettings';
import SecuritySettings from '../adminSettings/components/SecuritySettings/SecuritySettings';
import './AdminSettings.css';

const AdminSettings = () => {
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
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
