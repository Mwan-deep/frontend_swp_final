import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, User, Shield, CheckCircle } from 'lucide-react';
import { mockTableUsers } from '../../data/mockDocuments';
import './AdminAccountDetails.css';

const AdminAccountDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId || 1;
  const initialUser = mockTableUsers.find(u => u.id === userId) || mockTableUsers[0];

  const [formData, setFormData] = useState({
    id: initialUser.id,
    fullName: initialUser.name,
    email: initialUser.email,
    dob: initialUser.dob || '2001-05-14',
    gender: initialUser.gender || 'Female',
    bio: initialUser.bio || 'Computer Science major, focusing on AI ethics. Actively participating in the spring hackathon.',
    status: initialUser.status,
    reason: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.status !== 'Active' && !formData.reason.trim()) {
      alert('Please provide a reason for changing the status.');
      return;
    }
    
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      
      // Update mockTableUsers array
      const userIndex = mockTableUsers.findIndex(u => u.id === formData.id);
      if (userIndex !== -1) {
        mockTableUsers[userIndex].name = formData.fullName;
        mockTableUsers[userIndex].email = formData.email;
        mockTableUsers[userIndex].status = formData.status;
        mockTableUsers[userIndex].dob = formData.dob;
        mockTableUsers[userIndex].gender = formData.gender;
        mockTableUsers[userIndex].bio = formData.bio;
      }

      alert('Account details saved successfully!');
      navigate('/admin');
    }, 800);
  };

  return (
    <div className="admin-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => navigate('/admin')}>Dashboard</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Account Details</span>
        </div>
        <div className="sync-status">
          <span className="sync-dot"></span> Last synced: Just now
        </div>
      </div>

      {/* Top Profile Card */}
      <div className="details-header-card">
        <div className="details-header-profile">
          <img 
            src={initialUser.avatar} 
            alt={formData.fullName} 
            className="details-avatar"
          />
          <div className="details-header-info">
            <h2 className="details-name">{formData.fullName}</h2>
            <div className="details-badges">
              <span className="badge-id">ID: {initialUser.userId}</span>
              <span className="badge-status-green"><span className="status-dot"></span> {formData.status}</span>
            </div>
          </div>
        </div>
        <div className="details-header-actions">
          <button className="btn-cancel" onClick={() => navigate('/admin')} disabled={isSaving}>Cancel</button>
          <button className="btn-save" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="details-layout">
        {/* Left Column: Personal Information */}
        <div className="details-main">
          <div className="section-card">
            <div className="section-header">
              <div className="section-title-wrapper">
                <User size={18} className="section-icon" />
                <h3 className="section-title">Personal Information</h3>
              </div>
              <span className="section-meta">Editable Fields</span>
            </div>

            <div className="section-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="fullName" className="form-input" value={formData.fullName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label d-flex-between">
                    Email Address
                    <span className="verified-badge"><CheckCircle size={12} /> Verified</span>
                  </label>
                  <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" name="dob" className="form-input" value={formData.dob} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bio / Notes</label>
                <textarea 
                  name="bio"
                  className="form-textarea" 
                  rows="4" 
                  value={formData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security & Control */}
        <div className="details-sidebar">
          {/* Security & Metadata Card */}
          <div className="section-card bg-light">
            <div className="section-header border-bottom-0 pb-0">
              <div className="section-title-wrapper">
                <Shield size={18} className="section-icon" />
                <h3 className="section-title">Security & Metadata</h3>
              </div>
            </div>
            <div className="section-body pt-16">
              <div className="form-group">
                <label className="form-label">System Username</label>
                <input type="text" className="form-input disabled-dashed" value={initialUser.email.split('@')[0]} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Authentication String</label>
                <input type="password" className="form-input disabled-dashed" value="••••••••••••••••••••" readOnly />
              </div>
              
              <div className="metadata-list">
                <div className="metadata-row">
                  <span className="metadata-label">Created At</span>
                  <span className="metadata-value">{initialUser.date}, 09:41 AM</span>
                </div>
                <div className="metadata-row">
                  <span className="metadata-label">Updated At</span>
                  <span className="metadata-value">Just now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Control Card */}
          <div className="section-card border-warning">
            <div className="section-body">
              <div className="section-title-wrapper text-warning mb-16">
                <User size={18} className="section-icon" />
                <h3 className="section-title">Status Control</h3>
              </div>
              <p className="status-desc">Modifying the account status will immediately affect the user's access to the FPT Study Hub ecosystem.</p>
              
              <div className="form-group">
                <label className="form-label">Target Status</label>
                <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                  <option value="Active">🟢 Active (Normal Access)</option>
                  <option value="Suspended">🟡 Suspended</option>
                  <option value="Inactive">🔴 Inactive</option>
                </select>
              </div>
              
              <div className="form-group mb-0">
                <label className="form-label">Reason for Change <span className="text-danger">*</span></label>
                <textarea 
                  name="reason"
                  className="form-textarea" 
                  rows="3" 
                  placeholder="Required if changing status from Active..."
                  value={formData.reason}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountDetails;
