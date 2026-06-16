import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, User, Shield, CheckCircle } from 'lucide-react';
import './AdminAccountDetails.css';

const AdminAccountDetails = () => {
  const navigate = useNavigate();

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
            src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random" 
            alt="Sarah Jenkins" 
            className="details-avatar"
          />
          <div className="details-header-info">
            <h2 className="details-name">Sarah Jenkins</h2>
            <div className="details-badges">
              <span className="badge-id">ID: USR-88492A</span>
              <span className="badge-status-green"><span className="status-dot"></span> Active</span>
            </div>
          </div>
        </div>
        <div className="details-header-actions">
          <button className="btn-cancel" onClick={() => navigate('/admin')}>Cancel</button>
          <button className="btn-save">Save Changes</button>
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
                  <input type="text" className="form-input" defaultValue="Sarah Jenkins" />
                </div>
                <div className="form-group">
                  <label className="form-label d-flex-between">
                    Email Address
                    <span className="verified-badge"><CheckCircle size={12} /> Verified</span>
                  </label>
                  <input type="email" className="form-input" defaultValue="sarah.jenkins@student.fpt.edu.vn" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" className="form-input" defaultValue="2001-05-14" />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-select" defaultValue="Female">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bio / Notes</label>
                <textarea 
                  className="form-textarea" 
                  rows="4" 
                  defaultValue="Computer Science major, focusing on AI ethics. Actively participating in the spring hackathon."
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
                <input type="text" className="form-input disabled-dashed" value="sjenkins_cs" readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Authentication String</label>
                <input type="password" className="form-input disabled-dashed" value="••••••••••••••••••••" readOnly />
              </div>
              
              <div className="metadata-list">
                <div className="metadata-row">
                  <span className="metadata-label">Created At</span>
                  <span className="metadata-value">Oct 12, 2023, 09:41 AM</span>
                </div>
                <div className="metadata-row">
                  <span className="metadata-label">Updated At</span>
                  <span className="metadata-value">Mar 04, 2024, 14:22 PM</span>
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
                <select className="form-select">
                  <option>🟢 Active (Normal Access)</option>
                  <option>🟡 Suspended</option>
                  <option>🔴 Inactive</option>
                </select>
              </div>
              
              <div className="form-group mb-0">
                <label className="form-label">Reason for Change <span className="text-danger">*</span></label>
                <textarea 
                  className="form-textarea" 
                  rows="3" 
                  placeholder="Required if changing status from Active..."
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
