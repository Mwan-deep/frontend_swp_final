import React, { useState } from 'react';
import SettingsTabs from '../account/components/SettingsTabs';
import ProfileTab from '../account/components/ProfileTab';
import SecurityTab from '../account/components/SecurityTab';
import ChangePasswordForm from '../account/components/ChangePasswordForm';
import './Account.css';
import {Profile_data} from "../../data/mockDocuments";


const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Trạng thái dữ liệu cá nhân
  const [profileData, setProfileData] = useState(Profile_data);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bio' && value.length > 500) return;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPhoto = () => {
    const newAvatars = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    ];
    const randomAvatar = newAvatars[Math.floor(Math.random() * newAvatars.length)];
    setProfileData(prev => ({ ...prev, avatar: randomAvatar }));
  };

  const handleRemovePhoto = () => {
    setProfileData(prev => ({ 
      ...prev, 
      avatar: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2394A3B8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' 
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Profile changes saved successfully!');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsChangingPassword(false); // Reset chuyển đổi form đổi mật khẩu khi chuyển tab
  };

  return (
    <div className="settings-page-container">
      <div className="settings-layout-grid">
        {/* Menu Tab cột trái */}
        <SettingsTabs activeTab={activeTab} onChange={handleTabChange} />

        {/* Khung nội dung hiển thị cột phải */}
        <div className="settings-right-pane">
          {activeTab === 'profile' && (
            <>
              <h2 className="tab-pane-title">Profile</h2>
              <p className="tab-pane-subtitle">Manage your personal profile information.</p>
              <div className="settings-content-card">
                <ProfileTab 
                  data={profileData}
                  onChange={handleProfileChange}
                  onUploadPhoto={handleUploadPhoto}
                  onRemovePhoto={handleRemovePhoto}
                  onSave={handleSaveProfile}
                />
              </div>
            </>
          )}

          {activeTab === 'security' && (
            isChangingPassword ? (
              <ChangePasswordForm onBack={() => setIsChangingPassword(false)} />
            ) : (
              <>
                <h2 className="tab-pane-title">Security</h2>
                <p className="tab-pane-subtitle">Manage your account security settings.</p>
                
                <div className="settings-content-card security-card">
                  <SecurityTab onChangePassword={() => setIsChangingPassword(true)} />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;