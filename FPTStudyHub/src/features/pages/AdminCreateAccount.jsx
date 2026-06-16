import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, Info, Calendar, RefreshCcw, Eye } from 'lucide-react';
import './AdminCreateAccount.css';

const AdminCreateAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => navigate('/admin')}>Dashboard</span>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-current">Create Account</span>
      </div>

      <div className="create-account-layout">
        {/* Left Column: Form */}
        <div className="create-account-main">
          <div className="card-header">
            <h2 className="card-title">Create New Admin Account</h2>
            <p className="card-subtitle">Fill in the details below to authorize a new staff member within the FPT Study Hub ecosystem.</p>
          </div>

          <div className="card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Manager ID</label>
                <div className="input-with-icon">
                  <input type="text" className="form-input disabled" value="FPT-88291" readOnly />
                  <Lock size={16} className="input-icon-right" />
                </div>
                <span className="input-hint">Auto-generated system identifier</span>
              </div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="e.g. Dr. Nguyen Van A" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon-left" />
                  <input type="email" className="form-input has-icon-left" placeholder="admin@fpt.edu.vn" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <input type="password" className="form-input has-icon-right" defaultValue="password123" />
                  <Eye size={16} className="input-icon-right clickable" />
                </div>
                {/* Password strength indicator mock */}
                <div className="password-strength">
                  <div className="strength-bar filled"></div>
                  <div className="strength-bar filled"></div>
                  <div className="strength-bar filled"></div>
                  <div className="strength-bar filled"></div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Department</label>
                <select className="form-select">
                  <option>Select Department</option>
                  <option>Computer Science</option>
                  <option>Business</option>
                  <option>IT Support</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select className="form-select">
                  <option>Select Role</option>
                  <option>Manager</option>
                  <option>Senior Admin</option>
                  <option>Moderator</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="footer-meta">
              <span className="meta-item"><Calendar size={14} /> Created: <strong>Today (System Assigned)</strong></span>
              <span className="meta-item"><RefreshCcw size={14} /> Last Sync: <strong>Pending</strong></span>
            </div>
            <div className="footer-actions">
              <button className="btn-cancel" onClick={() => navigate('/admin')}>Cancel</button>
              <button className="btn-save">Create Account</button>
            </div>
          </div>
        </div>

        {/* Right Column: Info Cards */}
        <div className="create-account-sidebar">
          {/* Role Permissions Card */}
          <div className="info-card">
            <div className="info-card-header">
              <Info size={18} className="info-icon" />
              <h3 className="info-title">Role Permissions</h3>
            </div>
            
            <div className="permission-item">
              <h4 className="permission-name">Manager</h4>
              <p className="permission-desc">Full access to users, reports, and financial oversight.</p>
            </div>
            
            <div className="permission-item">
              <h4 className="permission-name">Senior Admin</h4>
              <p className="permission-desc">Can modify content and manage basic user roles.</p>
            </div>
          </div>

          {/* Image Card */}
          <div className="image-card">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
              alt="Data Analysis" 
              className="card-image"
            />
            <div className="image-overlay">
              <p>"Empowering academic excellence through systematic precision."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateAccount;
