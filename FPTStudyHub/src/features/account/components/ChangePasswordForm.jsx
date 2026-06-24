import React, { useState } from 'react';

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ShieldInfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F26F21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ChangePasswordForm = ({ onBack }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Vui lòng điền đầy đủ các thông tin mật khẩu.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }
    if (newPassword.length < 8) {
      alert('Mật khẩu mới phải dài tối thiểu 8 ký tự.');
      return;
    }
    
    alert('Mật khẩu đã được cập nhật thành công!');
    onBack();
  };

  return (
    <div className="change-password-subview">
      <button type="button" className="back-breadcrumb-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Security</span>
      </button>

      <div className="change-password-header">
        <h2 className="change-password-title">Change Password</h2>
        <p className="change-password-subtitle">Update your password regularly to keep your account secure.</p>
      </div>

      <div className="settings-content-card password-form-card">
        <form onSubmit={handleSubmit} className="settings-form">
          
          <div className="input-field-group password-input-wrapper">
            <label htmlFor="currentPassword">Current Password</label>
            <div className="password-input-relative">
              <input
                id="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                placeholder="••••••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="input-field-group password-input-wrapper">
            <label htmlFor="newPassword">New Password</label>
            <div className="password-input-relative">
              <input
                id="newPassword"
                type={showNew ? 'text' : 'password'}
                placeholder="••••••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <p className="password-requirement-hint">
              Password must be at least 8 characters and include a number and a special character.
            </p>
          </div>

          <div className="input-field-group password-input-wrapper">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="password-input-relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="form-actions-footer no-border-padding">
            <button type="button" className="form-cancel-btn" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="form-save-btn update-password-btn">
              Update Password
            </button>
          </div>

        </form>
      </div>

      <div className="security-tips-box">
        <div className="tips-shield-icon-container">
          <ShieldInfoIcon />
        </div>
        <div className="tips-text-container">
          <span className="tips-label">Tips to keep your account secure:</span>
          <span className="tips-desc">Use a strong password and don't share it with others.</span>
        </div>
      </div>

    </div>
  );
};

export default ChangePasswordForm;