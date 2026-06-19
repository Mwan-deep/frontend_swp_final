import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, Info, Calendar, RefreshCcw, Eye } from 'lucide-react';
import { mockTableUsers } from '../../data/mockDocuments';
import './AdminCreateAccount.css';

const AdminCreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: '',
    gender: 'Female',
    department: '',
    role: 'Admin'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    if (!formData.fullName || !formData.email) {
      alert('Please fill in required fields (Name and Email).');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      
      const newId = mockTableUsers.length > 0 ? Math.max(...mockTableUsers.map(u => u.id)) + 1 : 1;
      const today = new Date();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dateStr = `${monthNames[today.getMonth()]} ${String(today.getDate()).padStart(2, '0')}, ${today.getFullYear()}`;
      
      const newUser = {
        id: newId,
        name: formData.fullName,
        email: formData.email,
        userId: `${formData.role === 'Student' ? 'SE' : formData.role === 'Faculty' ? 'FA' : 'AD'}${Math.floor(100000 + Math.random() * 900000)}`,
        role: formData.role,
        status: 'Active',
        date: dateStr,
        dob: formData.dob,
        gender: formData.gender,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=random`
      };

      mockTableUsers.unshift(newUser);

      alert('Account created successfully!');
      navigate('/admin');
    }, 800);
  };

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
                <input type="text" name="fullName" className="form-input" placeholder="e.g. Dr. Nguyen Van A" value={formData.fullName} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon-left" />
                  <input type="email" name="email" className="form-input has-icon-left" placeholder="admin@fpt.edu.vn" value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <input type="password" name="password" className="form-input has-icon-right" placeholder="Enter password" value={formData.password} onChange={handleChange} />
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

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Department</label>
                <select name="department" className="form-select" value={formData.department} onChange={handleChange}>
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business">Business</option>
                  <option value="IT Support">IT Support</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                  <option value="Admin">Admin</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Student">Student</option>
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
              <button className="btn-cancel" onClick={() => navigate('/admin')} disabled={isSaving}>Cancel</button>
              <button className="btn-save" onClick={handleCreate} disabled={isSaving}>
                {isSaving ? 'Creating...' : 'Create Account'}
              </button>
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
