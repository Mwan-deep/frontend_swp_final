import React, { useState } from 'react';
import { accounts } from '../../../../data/mockDocuments';
import '../../../adminSettings/components/ProfileSettings/ProfileSettings.css';

const ManagerProfileSettings = () => {
  // Find the manager user in mock data
  const initialManager = accounts.find(u => u.role === 'Manager') || accounts[3];
  
  const [profile, setProfile] = useState({
    fullName: initialManager.full_name,
    email: initialManager.email,
    bio: initialManager.bio || '',
    role: initialManager.role,
    avatar: initialManager.avatar_url
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      // Sync with mockDocument (accounts array)
      initialManager.full_name = profile.fullName;
      initialManager.name = profile.fullName;
      initialManager.fullName = profile.fullName;
      initialManager.email = profile.email;
      initialManager.bio = profile.bio;
      initialManager.avatar_url = profile.avatar;
      initialManager.avatar = profile.avatar;
      
      setIsSaving(false);
      alert('Profile settings saved successfully!');
    }, 600);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings-card">
      <div className="profile-picture-section">
        <div className="profile-avatar-wrapper">
          <img 
            src={profile.avatar} 
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
          <input 
            type="text" 
            className="settings-input" 
            name="fullName"
            value={profile.fullName} 
            onChange={handleChange}
          />
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Email Address</label>
          <input 
            type="email" 
            className="settings-input" 
            name="email"
            value={profile.email} 
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="settings-form-group">
        <label className="settings-label">Bio</label>
        <textarea 
          className="settings-textarea" 
          rows="4" 
          name="bio"
          value={profile.bio}
          onChange={handleChange}
        ></textarea>
        <div className="textarea-footer">
          <span className="char-count">{profile.bio.length} / 500</span>
        </div>
      </div>

      <div className="settings-form-group">
        <label className="settings-label">Primary Role</label>
        <select 
          className="settings-select" 
          name="role"
          value={profile.role}
          onChange={handleChange}
          disabled
        >
          <option value="Student">Student</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="settings-footer">
        <button 
          className="btn-cancel" 
          onClick={() => setProfile({
            fullName: initialManager.full_name,
            email: initialManager.email,
            bio: initialManager.bio || '',
            role: initialManager.role,
            avatar: initialManager.avatar_url
          })}
        >
          Cancel
        </button>
        <button 
          className="btn-save" 
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ManagerProfileSettings;
