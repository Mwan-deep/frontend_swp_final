import React from 'react';
import './ProfileSettings.css';

const ProfileSettings = () => {
  return (
    <div className="settings-card">
      <div className="profile-picture-section">
        <div className="profile-avatar-wrapper">
          <img 
            src="https://ui-avatars.com/api/?name=Alex+Johnson&background=random" 
            alt="Profile" 
            className="profile-avatar-large"
          />
        </div>
        <div className="profile-picture-info">
          <h3 className="settings-sub-title">Profile Picture</h3>
          <p className="settings-desc">PNG, JPG or GIF up to 5MB.</p>
          <div className="profile-picture-actions">
            <button className="btn-primary-small">Upload New</button>
            <button className="btn-secondary-small">Remove</button>
          </div>
        </div>
      </div>

      <div className="settings-form-row">
        <div className="settings-form-group">
          <label className="settings-label">Full Name</label>
          <input type="text" className="settings-input" defaultValue="Alex Johnson" />
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Email Address</label>
          <input type="email" className="settings-input" defaultValue="alex.johnson@example.com" />
        </div>
      </div>

      <div className="settings-form-group">
        <label className="settings-label">Bio</label>
        <textarea 
          className="settings-textarea" 
          rows="4" 
          defaultValue="Computer Science student focusing on AI and Machine Learning. Always learning, always building."
        ></textarea>
        <div className="textarea-footer">
          <span className="char-count">112 / 500</span>
        </div>
      </div>

      <div className="settings-form-group">
        <label className="settings-label">Primary Role</label>
        <select className="settings-select" defaultValue="Student">
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="settings-footer">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-save">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
