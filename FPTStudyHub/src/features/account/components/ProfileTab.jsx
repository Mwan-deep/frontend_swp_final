import React from 'react';

const ProfileTab = ({ data, onChange, onUploadPhoto, onRemovePhoto, onSave }) => {
  return (
    <form onSubmit={onSave} className="settings-form">
      <div className="profile-pic-section">
        <img src={data.avatar} alt="Profile" className="profile-large-avatar" />
        <div className="profile-pic-actions">
          <h4 className="upload-title">Profile Picture</h4>
          <p className="upload-subtitle">PNG, JPG or GIF up to 5MB.</p>
          <div className="upload-buttons-wrapper">
            <button type="button" className="upload-btn-new" onClick={onUploadPhoto}>
              Upload New
            </button>
            <button type="button" className="upload-btn-remove" onClick={onRemovePhoto}>
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
            value={data.fullName} 
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
            value={data.email} 
            onChange={onChange}
            placeholder="name@example.com" 
            required 
          />
        </div>
      </div>

      <div className="input-field-group textarea-group">
        <label htmlFor="bio">Bio</label>
        <textarea 
          id="bio" 
          name="bio" 
          rows="4"
          value={data.bio} 
          onChange={onChange}
          placeholder="Tell us a little bit about yourself..."
        ></textarea>
        <div className="char-counter">
          {data.bio.length} / 500
        </div>
      </div>

      <div className="input-field-group select-group">
        <label htmlFor="role">Primary Role</label>
        <div className="select-wrapper">
          <select 
            id="role" 
            name="role" 
            value={data.role} 
            onChange={onChange}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher / Lecturer</option>
            <option value="Admin">Administrator</option>
            <option value="Contributor">Contributor</option>
          </select>
        </div>
      </div>

      <div className="form-actions-footer">
        <button type="button" className="form-cancel-btn">
          Cancel
        </button>
        <button type="submit" className="form-save-btn">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileTab;