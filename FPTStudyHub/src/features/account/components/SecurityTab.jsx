import React, { useState } from 'react';

const SecurityTab = ({ onChangePassword }) => {
  const [twoFA, setTwoFA] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: 1,
      browser: 'Chrome',
      os: 'macOS',
      location: 'Ho Chi Minh City, Vietnam',
      time: '2 days ago'
    },
    {
      id: 2,
      browser: 'Chrome',
      os: 'macOS',
      location: 'Ho Chi Minh City, Vietnam',
      time: '5 days ago'
    }
  ]);

  const handleToggle2FA = () => {
    setTwoFA(!twoFA);
  };

  const handleLogoutSession = (id) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    alert('Logged out of session successfully!');
  };

  const handleChangePassword = () => {
    if (onChangePassword) {
      onChangePassword(); // Gọi hàm kích hoạt mở ChangePasswordForm
    } else {
      alert('Simulating password change action. In a production app, this would open a change password form.');
    }
  };

  const handleSetup2FA = () => {
    alert('Simulating 2FA setup process...');
  };

  return (
    <div className="security-tab-container">
      <div className="security-card-inner">
        {/* 1. PASSWORD SECTION */}
        <div className="security-section-row">
          <div className="security-section-left">
            <div className="security-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sec-icon">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="security-text-details">
              <h4 className="security-item-title">Password</h4>
              <p className="security-item-subtitle">Last changed 35 days ago</p>
            </div>
          </div>
          <button type="button" className="sec-action-btn" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>

        {/* 2. TWO-FACTOR AUTHENTICATION */}
        <div className="security-section-row two-fa-row">
          <div className="security-section-left">
            <div className="security-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sec-icon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="security-text-details">
              <div className="title-toggle-wrapper">
                <h4 className="security-item-title">Two-Factor Authentication</h4>
              </div>
              <p className="security-item-subtitle desc-text">Add an extra layer of security to your account.</p>
              <button type="button" className="sec-action-btn setup-2fa-btn" onClick={handleSetup2FA}>
                Setup 2FA
              </button>
            </div>
          </div>
          
          <div className="toggle-container-right">
            <label className="toggle-switch">
              <input type="checkbox" checked={twoFA} onChange={handleToggle2FA} />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-state-text">{twoFA ? 'On' : 'Off'}</span>
          </div>
        </div>

        {/* Divider line */}
        <div className="sec-card-divider"></div>

        {/* 3. RECENT LOGIN ACTIVITY */}
        <div className="security-activity-section">
          <div className="activity-section-header">
            <div className="security-icon-box plain-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sec-icon">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="security-text-details">
              <h4 className="security-item-title">Recent Login Activity</h4>
              <p className="security-item-subtitle desc-text">Review locations where your account is currently logged in.</p>
            </div>
          </div>

          <div className="sessions-list-container">
            {sessions.length > 0 ? (
              sessions.map(session => (
                <div className="session-device-row" key={session.id}>
                  <div className="device-info-left">
                    <div className="device-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="device-icon">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div className="device-details">
                      <span className="device-name">{session.browser} • {session.os}</span>
                      <span className="device-location">{session.location}</span>
                    </div>
                  </div>
                  
                  <div className="device-info-right">
                    <span className="device-time">{session.time}</span>
                    <button type="button" className="sec-action-btn logout-device-btn" onClick={() => handleLogoutSession(session.id)}>
                      Logout
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-sessions-fallback">
                No active login sessions.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="security-support-footer">
        Need help? Contact support at <a href="mailto:support@fptstudyhub.edu.vn">support@fptstudyhub.edu.vn</a>
      </div>
    </div>
  );
};

export default SecurityTab;