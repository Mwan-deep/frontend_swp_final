import React, { useState, useEffect } from 'react';
import SettingsTabs from '../account/components/SettingsTabs';
import ProfileTab from '../account/components/ProfileTab';
import SecurityTab from '../account/components/SecurityTab';
import ChangePasswordForm from '../account/components/ChangePasswordForm';
import axiosClient from '../../utils/axiosClient';
import './Account.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: '', email: '', bio: '', avatarUrl: ''
  });

  // 1. GỌI API ĐẾN CONTROLLER MỚI
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosClient.get(`/api/my-profile`); 
        const userData = response.result || response.data || response;
        
        const fetchedAvatar = userData.avatarUrl || userData.avatar_url || userData.avatar || localStorage.getItem('avatarUrl');
        
        setProfileData({
          fullName: userData.fullName || '',
          email: userData.email || '',
          bio: userData.bio || '',
          avatarUrl: fetchedAvatar || '' 
        });

        if (fetchedAvatar) {
          localStorage.setItem('avatarUrl', fetchedAvatar);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin cá nhân:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bio' && value.length > 500) return;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // 2. UPLOAD ẢNH ĐẾN CONTROLLER MỚI
  const handleUploadPhoto = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axiosClient.post(`/api/my-profile/upload-avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const updatedAccount = response.result || response.data || response;
      const newAvatarUrl = updatedAccount.avatarUrl || updatedAccount.avatar_url || updatedAccount.avatar;
      
      setProfileData(prev => ({ ...prev, avatarUrl: newAvatarUrl }));
      
      if (newAvatarUrl) {
        localStorage.setItem('avatarUrl', newAvatarUrl);
      }
      window.dispatchEvent(new Event('notificationsUpdated'));
      
      alert("Tải ảnh đại diện thành công! Vui lòng lưu thay đổi.");
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
      alert("Upload ảnh thất bại! Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setProfileData(prev => ({ ...prev, avatarUrl: '' }));
  };

  // 3. LƯU PROFILE ĐẾN CONTROLLER MỚI
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updatePayload = {
        fullName: profileData.fullName,
        email: profileData.email,
        bio: profileData.bio,
        avatarUrl: profileData.avatarUrl
      };
      
      await axiosClient.put(`/api/my-profile`, updatePayload); 
      
      if (profileData.avatarUrl) {
          localStorage.setItem('avatarUrl', profileData.avatarUrl);
      }
      window.dispatchEvent(new Event('notificationsUpdated'));

      alert('Cập nhật hồ sơ thành công!');
    } catch (error) {
      console.error("Lỗi cập nhật hồ sơ:", error);
      alert('Không thể lưu thay đổi. Vui lòng kiểm tra lại thông tin!');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsChangingPassword(false); 
  };

  return (
    <div className="settings-page-container">
      <div className="settings-layout-grid">
        <SettingsTabs activeTab={activeTab} onChange={handleTabChange} />

        <div className="settings-right-pane">
          {activeTab === 'profile' && (
            <>
              <h2 className="tab-pane-title">Profile</h2>
              <p className="tab-pane-subtitle">Manage your personal profile information.</p>
              <div className="settings-content-card">
                {isLoading ? (
                  <p style={{ padding: '20px', color: '#64748B' }}>Đang tải dữ liệu hồ sơ...</p>
                ) : (
                  <ProfileTab 
                    data={profileData}
                    onChange={handleProfileChange}
                    onUploadPhoto={handleUploadPhoto}
                    onRemovePhoto={handleRemovePhoto}
                    onSave={handleSaveProfile}
                    isUploading={isUploading}
                  />
                )}
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