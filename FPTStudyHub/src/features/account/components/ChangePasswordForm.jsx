import React, { useState } from 'react';
import axiosClient from '../../../utils/axiosClient';

const EyeIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> );
const EyeOffIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg> );
const ShieldInfoIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F26F21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> );

const ChangePasswordForm = ({ onBack }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Vui lòng điền đầy đủ các thông tin mật khẩu.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }
    if (newPassword.length < 5) { // Khớp với validation trong DTO của bạn (@Size min = 5)
      alert('Mật khẩu mới phải dài tối thiểu 5 ký tự.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        oldPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmPassword
      };
      
      // Gọi API Đổi mật khẩu
      await axiosClient.post('/api/account/change_password', payload);
      alert('Mật khẩu đã được cập nhật thành công!');
      onBack();
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      alert(error.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu cũ!');
    } finally {
      setIsSubmitting(false);
    }
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
              />
              <button type="button" className="password-toggle-btn" onClick={() => setShowCurrent(!showCurrent)}>
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
              />
              <button type="button" className="password-toggle-btn" onClick={() => setShowNew(!showNew)}>
                {showNew ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
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
              />
              <button type="button" className="password-toggle-btn" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="form-actions-footer no-border-padding">
            <button type="button" className="form-cancel-btn" onClick={onBack} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="form-save-btn update-password-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;