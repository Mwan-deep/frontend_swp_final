import React from 'react';
import { getDirectImageUrl } from '../../../utils/imageHelper'; // ĐÃ IMPORT TRỞ LẠI

const ProfileTab = ({ data, onChange, onUploadPhoto, onRemovePhoto, onSave, isUploading }) => {
  return (
    <form onSubmit={onSave} className="settings-form">
      <div className="profile-pic-section">

        <img
          src={getDirectImageUrl(data.avatarUrl)}
          alt="Profile"
          className="profile-large-avatar"
          referrerPolicy="no-referrer" // THÊM DÒNG NÀY VÀO TẤT CẢ CÁC THẺ IMG
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${data.fullName || 'User'}&background=random`;
          }}
        />

        <div className="profile-pic-actions">
          <h4 className="upload-title">Profile Picture</h4>
          <p className="upload-subtitle">PNG, JPG or GIF up to 5MB.</p>
          <div className="upload-buttons-wrapper">
            <input
              type="file"
              id="avatarUploadInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onUploadPhoto(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />
            <label htmlFor="avatarUploadInput" className="upload-btn-new" style={{ cursor: isUploading ? 'not-allowed' : 'pointer', display: 'inline-block', textAlign: 'center' }}>
              {isUploading ? 'Uploading...' : 'Upload New'}
            </label>
            <button type="button" className="upload-btn-remove" onClick={onRemovePhoto} disabled={isUploading}>
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="form-grid-columns">
        <div className="input-field-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName || ''}
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="input-field-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email || ''}
            onChange={onChange}
            placeholder="name@example.com"
            readOnly
            style={{ backgroundColor: '#F1F5F9', color: '#64748B', cursor: 'not-allowed' }}
          />
        </div>
      </div>

      <div className="input-field-group textarea-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows="4"
          value={data.bio || ''}
          onChange={onChange}
          placeholder="Tell us a little bit about yourself..."
        ></textarea>
        <div className="char-counter">
          {(data.bio || '').length} / 500
        </div>
      </div>

      <div className="form-actions-footer">
        <button type="button" className="form-cancel-btn" onClick={() => window.location.reload()}>
          Cancel
        </button>
        <button type="submit" className="form-save-btn" disabled={isUploading}>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileTab;