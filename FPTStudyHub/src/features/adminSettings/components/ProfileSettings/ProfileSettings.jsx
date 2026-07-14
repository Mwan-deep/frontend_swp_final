import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../utils/axiosClient';
import { getDirectImageUrl } from '../../../../utils/imageHelper'; 
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    bio: '',
    avatarUrl: '',
    role: 'Admin'
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // BỔ SUNG: Trạng thái upload ảnh

  // =========================
  // 1. LOAD PROFILE
  // =========================
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        // Đồng bộ dùng chung API lấy profile
        const response = await axiosClient.get('/api/my-profile');
        const data = response.result || response.data || response;
        
        const fetchedAvatar = data.avatarUrl || data.avatar_url || data.avatar || localStorage.getItem('avatarUrl');

        setProfile({
          fullName: data.fullName || data.userName || '',
          email: data.email || '',
          bio: data.bio || '',
          avatarUrl: fetchedAvatar || '',
          role: data.roles && data.roles.length > 0 ? data.roles[0].name : 'Admin'
        });

        if (fetchedAvatar) {
            localStorage.setItem('avatarUrl', fetchedAvatar);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin cá nhân:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyProfile();
  }, []);

  // =========================
  // 2. LOGIC UPLOAD & REMOVE PHOTO 
  // =========================
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
      
      setProfile(prev => ({ ...prev, avatarUrl: newAvatarUrl }));
      
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
      e.target.value = ''; 
    }
  };

  const handleRemovePhoto = () => {
    setProfile(prev => ({ ...prev, avatarUrl: '' }));
  };

  // =========================
  // 3. SAVE PROFILE
  // =========================
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axiosClient.put('/api/my-profile', {
        fullName: profile.fullName,
        email: profile.email,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl 
      });
      
      if (profile.avatarUrl) {
          localStorage.setItem('avatarUrl', profile.avatarUrl);
      }
      
      // Dispatch event để Header tự động đổi ảnh ngay lập tức mà không cần reload trang
      window.dispatchEvent(new Event('notificationsUpdated'));
      alert('Cập nhật thông tin hồ sơ thành công!');
      
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi lưu thay đổi!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bio' && value.length > 500) return;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div style={{ padding: '40px' }}>Đang tải thông tin cá nhân...</div>;

  return (
    <div className="settings-card">
      {/* =========================
          PROFILE IMAGE
      ========================== */}
      <div className="profile-picture-section">
        <div className="profile-avatar-wrapper">
          {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR */}
          <img 
            src={profile.avatarUrl ? getDirectImageUrl(profile.avatarUrl) : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'Admin')}&background=random`} 
            alt="Profile" 
            className="profile-avatar-large"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'Admin')}&background=random`;
            }}
          />
        </div>
        <div className="profile-picture-info">
          <h3 className="settings-sub-title">Profile Picture</h3>
          <p className="settings-desc">PNG, JPG or GIF up to 5MB.</p>
          <div className="profile-picture-actions">
            {/* THAY NÚT BUTTON BẰNG INPUT FILE ẨN */}
            <input
              type="file"
              id="adminAvatarUpload"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleUploadPhoto}
            />
            <label 
              htmlFor="adminAvatarUpload" 
              className="btn-primary-small" 
              style={{ cursor: isUploading ? 'not-allowed' : 'pointer', display: 'inline-block', textAlign: 'center', lineHeight: '36px' }}
            >
              {isUploading ? 'Uploading...' : 'Upload New'}
            </label>

            <button 
              className="btn-secondary-small" 
              onClick={handleRemovePhoto} 
              disabled={isUploading}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          FORM ROW
      ========================== */}
      <div className="settings-form-row">
        <div className="settings-form-group">
          <label className="settings-label">Full Name</label>
          <input 
            type="text" 
            className="settings-input" 
            name="fullName"
            value={profile.fullName || ''} 
            onChange={handleChange}
          />
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Email Address (Read-only)</label>
          <input 
            type="email" 
            className="settings-input disabled" 
            name="email"
            value={profile.email || ''} 
            readOnly
            title="Không thể thay đổi email hệ thống"
          />
        </div>
      </div>

      {/* =========================
          BIO
      ========================== */}
      <div className="settings-form-group">
        <label className="settings-label">Bio</label>
        <textarea 
          className="settings-textarea" 
          rows="4" 
          name="bio"
          value={profile.bio || ''}
          onChange={handleChange}
        ></textarea>
        <div className="textarea-footer">
          <span className="char-count">{profile.bio?.length || 0} / 500</span>
        </div>
      </div>

      {/* =========================
          FOOTER
      ========================== */}
      <div className="settings-footer">
        {/* Lấy lại logic cũ, reload lại form khi nhấn Hủy */}
        <button className="btn-cancel" onClick={() => window.location.reload()}>Cancel</button>
        <button className="btn-save" onClick={handleSave} disabled={isSaving || isUploading}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;