import React from 'react';
import { Laptop, Smartphone } from 'lucide-react';
import './SecuritySettings.css';

const SecuritySettings = () => {
  return (
    <div className="settings-card">
      {/* Password Management */}
      <div className="security-section">
        <h3 className="settings-sub-title">Password Management</h3>
        <p className="settings-desc">Ensure your account is using a long, random password to stay secure.</p>
        
        <div className="settings-form-group">
          <label className="settings-label">Current Password</label>
          <input type="password" className="settings-input" />
        </div>
        
        <div className="settings-form-row">
          <div className="settings-form-group">
            <label className="settings-label">New Password</label>
            <input type="password" className="settings-input" />
          </div>
          <div className="settings-form-group">
            <label className="settings-label">Confirm New Password</label>
            <input type="password" className="settings-input" />
          </div>
        </div>
        
        <button className="btn-primary-small">Update Password</button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="security-section split-section">
        <div className="split-content">
          <h3 className="settings-sub-title">Two-Factor Authentication</h3>
          <p className="settings-desc mb-0">Add an extra layer of security to your account.</p>
        </div>
        <button className="btn-secondary-light">Enable 2FA</button>
      </div>

      {/* Active Sessions */}
      <div className="security-section">
        <h3 className="settings-sub-title">Active Sessions</h3>
        <p className="settings-desc">You're currently logged in on these devices.</p>
        
        <div className="session-list">
          <div className="session-item">
            <div className="session-icon">
              <Laptop size={20} />
            </div>
            <div className="session-info">
              <h4 className="session-title">MacBook Pro • Chrome</h4>
              <p className="session-meta">Ho Chi Minh City, Vietnam • Current Session</p>
            </div>
          </div>
          
          <div className="session-item">
            <div className="session-icon">
              <Smartphone size={20} />
            </div>
            <div className="session-info">
              <h4 className="session-title">iPhone 15 Pro • App</h4>
              <p className="session-meta">Hanoi, Vietnam • 2 hours ago</p>
            </div>
            <button className="btn-text-danger">Log out</button>
          </div>
        </div>
      </div>

      {/* Security Notifications */}
      <div className="security-section no-border">
        <h3 className="settings-sub-title">Security Notifications</h3>
        <p className="settings-desc">Control how you receive security alerts.</p>
        
        <div className="notification-list">
          <label className="notification-item">
            <span className="notification-label">Login alerts</span>
          </label>
          <label className="notification-item">
            <span className="notification-label">Password change notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
