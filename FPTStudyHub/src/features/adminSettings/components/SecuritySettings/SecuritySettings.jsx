import React, { useState } from 'react';
import { Laptop, Smartphone, Eye, EyeOff } from 'lucide-react';
import { adminSettings, mockUsers } from '../../../../data/mockDocuments';
import './SecuritySettings.css';

const SecuritySettings = () => {
  const [security, setSecurity] = useState({ ...adminSettings.security });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const adminUser = mockUsers.find(u => u.role === 'admin') || mockUsers[2];

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('Please fill in all password fields.');
      return;
    }
    if (passwords.current !== adminUser.password) {
      alert('Current password is incorrect.');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert('New password and confirm password do not match.');
      return;
    }
    setIsUpdatingPassword(true);
    setTimeout(() => {
      adminUser.password = passwords.new;
      setIsUpdatingPassword(false);
      setPasswords({ current: '', new: '', confirm: '' });
      alert('Password updated successfully!');
    }, 600);
  };

  const handleToggle2FA = () => {
    const newVal = !security.twoFactorEnabled;
    setSecurity(prev => ({ ...prev, twoFactorEnabled: newVal }));
    adminSettings.security.twoFactorEnabled = newVal;
    alert(`Two-Factor Authentication has been ${newVal ? 'enabled' : 'disabled'}.`);
  };

  const handleNotificationChange = (field) => {
    const newVal = !security.notifications[field];
    const newNotifications = { ...security.notifications, [field]: newVal };
    setSecurity(prev => ({ ...prev, notifications: newNotifications }));
  };

  const handleSaveNotifications = () => {
    setIsSavingNotifications(true);
    setTimeout(() => {
      adminSettings.security.notifications = { ...security.notifications };
      setIsSavingNotifications(false);
      alert('Security notification preferences saved!');
    }, 600);
  };

  return (
    <div className="settings-card">
      {/* Password Management */}
      <div className="security-section">
        <h3 className="settings-sub-title">Password Management</h3>
        <p className="settings-desc">Ensure your account is using a long, random password to stay secure.</p>
        
        <div className="settings-form-group">
          <label className="settings-label">Current Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showCurrent ? "text" : "password"} 
              className="settings-input" 
              value={passwords.current}
              onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
              style={{ paddingRight: '40px' }}
            />
            <button 
              type="button" 
              onClick={() => setShowCurrent(!showCurrent)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center' }}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="settings-form-row">
          <div className="settings-form-group">
            <label className="settings-label">New Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showNew ? "text" : "password"} 
                className="settings-input" 
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                style={{ paddingRight: '40px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center' }}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="settings-form-group">
            <label className="settings-label">Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showConfirm ? "text" : "password"} 
                className="settings-input" 
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                style={{ paddingRight: '40px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center' }}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        
        <button 
          className="btn-primary-small" 
          onClick={handlePasswordUpdate}
          disabled={isUpdatingPassword}
        >
          {isUpdatingPassword ? 'Updating...' : 'Update Password'}
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="security-section split-section">
        <div className="split-content">
          <h3 className="settings-sub-title">Two-Factor Authentication</h3>
          <p className="settings-desc mb-0">Add an extra layer of security to your account.</p>
        </div>
        <button 
          className={`btn-secondary-light ${security.twoFactorEnabled ? 'active' : ''}`}
          onClick={handleToggle2FA}
        >
          {security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
        </button>
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
            <input 
              type="checkbox" 
              checked={security.notifications.loginAlerts}
              onChange={() => handleNotificationChange('loginAlerts')}
              className="mr-2"
            />
            <span className="notification-label">Login alerts</span>
          </label>
          <label className="notification-item">
            <input 
              type="checkbox" 
              checked={security.notifications.passwordChange}
              onChange={() => handleNotificationChange('passwordChange')}
              className="mr-2"
            />
            <span className="notification-label">Password change notifications</span>
          </label>
        </div>
        <div className="settings-footer mt-16">
          <button 
            className="btn-save" 
            onClick={handleSaveNotifications}
            disabled={isSavingNotifications}
          >
            {isSavingNotifications ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
