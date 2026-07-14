import React, { useState } from 'react';
import { Laptop, Smartphone, Eye, EyeOff } from 'lucide-react';
import axiosClient from '../../../../utils/axiosClient';
import './SecuritySettings.css';

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  // States mô phỏng cho các tính năng chưa có Backend
  const [security, setSecurity] = useState({ twoFactorEnabled: false, notifications: { loginAlerts: true, passwordChange: true } });
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // GỌI API ĐỔI MẬT KHẨU (Đã fix lỗi URL và Method)
  const handlePasswordUpdate = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('Vui lòng điền đầy đủ các ô mật khẩu!');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert('Mật khẩu mới và Nhập lại mật khẩu không khớp!');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      // 1. Dùng POST
      // 2. Đường dẫn là /change_password (có gạch dưới)
      // 3. Gửi thêm confirmNewPassword
      await axiosClient.post('/api/account/change_password', {
        oldPassword: passwords.current,
        newPassword: passwords.new,
        confirmNewPassword: passwords.confirm
      });
      
      alert('Mật khẩu của bạn đã được cập nhật thành công!');
      setPasswords({ current: '', new: '', confirm: '' }); // Xóa trắng form
    } catch (error) {
      alert(error.response?.data?.message || 'Mật khẩu cũ không chính xác hoặc có lỗi xảy ra!');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleToggle2FA = () => {
    setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
    alert('Tính năng 2FA hiện tại đang chạy ở chế độ Demo.');
  };

  const handleNotificationChange = (field) => {
    setSecurity(prev => ({ 
      ...prev, 
      notifications: { ...prev.notifications, [field]: !prev.notifications[field] } 
    }));
  };

  const handleSaveNotifications = () => {
    setIsSavingNotifications(true);
    setTimeout(() => {
      setIsSavingNotifications(false);
      alert('Đã lưu tùy chọn thông báo thành công (Demo)!');
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
        
        <button className="btn-primary-small" onClick={handlePasswordUpdate} disabled={isUpdatingPassword}>
          {isUpdatingPassword ? 'Updating...' : 'Update Password'}
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
              <p className="session-meta">Current Session</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;