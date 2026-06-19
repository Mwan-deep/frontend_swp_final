import React from 'react';

const SettingsTabs = ({ activeTab, onChange }) => {
  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg className="tab-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    {
      id: 'security',
      label: 'Security',
      icon: (
        <svg className="tab-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    }
  ];

  return (
    <div className="settings-tabs-column">
      <h2 className="settings-column-title">Settings</h2>
      <div className="settings-tabs-sidebar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsTabs;