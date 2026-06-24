import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Clock, User, AlertTriangle, FileText, Download } from 'lucide-react';
import { mockReports, mockTableUsers } from '../../data/mockDocuments';
import './AdminReportDetails.css';

const AdminReportDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reportId = location.state?.reportId;
  const report = mockReports.find(r => r.id === reportId) || mockReports[0];

  const [status, setStatus] = useState(report.status);
  
  const reportedUser = mockTableUsers.find(u => u.userId === report.reported.userId);
  const initialUserStatus = reportedUser ? reportedUser.status : 'Active';
  const [userStatus, setUserStatus] = useState(initialUserStatus);
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const idx = mockReports.findIndex(r => r.id === report.id);
      if (idx !== -1) {
        mockReports[idx].status = status;
      }
      
      if (report.reported.type === 'user') {
        const userIdx = mockTableUsers.findIndex(u => u.userId === report.reported.userId);
        if (userIdx !== -1) {
          mockTableUsers[userIdx].status = userStatus;
          alert(`Changes saved successfully!\nReport Status: ${status}\nUser Status (${report.reported.userId}): ${userStatus}\n\nTip: Search by User ID in the Dashboard to find this exact user.`);
        } else {
          alert('Changes saved successfully! (User not found in dashboard)');
        }
      } else {
        alert('Changes saved successfully!');
      }

      navigate('/admin/reports');
    }, 800);
  };

  return (
    <div className="admin-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => navigate('/admin/reports')}>Reports</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Investigation</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="report-details-header">
        <div className="report-title-wrapper">
          <h1 className="admin-page-title mb-0">Report {report.id}</h1>
          <span className={`badge-under-review ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
        </div>
        <button className="btn-export">
          <Download size={16} />
          Export PDF
        </button>
      </div>

      <div className="details-layout">
        {/* Left Column: Report Info */}
        <div className="details-main">
          
          {/* Metadata Card */}
          <div className="section-card mb-24">
            <div className="section-body">
              <h3 className="section-subtitle">Report Metadata</h3>
              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="metadata-label">Report ID</span>
                  <span className="metadata-value">{report.id}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Material ID</span>
                  <span className="metadata-value text-primary cursor-pointer">{report.reported.type === 'document' ? report.reported.userId : 'N/A'}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Submitted On</span>
                  <span className="metadata-value">{report.date.split('\n')[0]}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Deadline</span>
                  <span className="metadata-value text-danger d-flex-align-center gap-4">
                    <Clock size={14} /> 2 days left
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Users Row */}
          <div className="users-row mb-24">
            {/* Reporter Card */}
            <div className="user-card reporter-card">
              <div className="user-card-header">
                <User size={16} className="text-secondary" />
                <span className="user-card-role">Reporter</span>
              </div>
              <div className="user-card-body">
                <img 
                  src={report.reporter.avatar} 
                  alt="Reporter" 
                  className="user-avatar-md"
                />
                <div className="user-info">
                  <h4 className="user-name">{report.reporter.name}</h4>
                  <p className="user-email">{report.reporter.email}</p>
                  <p className="user-id">ID: {report.reporter.userId}</p>
                </div>
              </div>
            </div>

            {/* Reported User Card */}
            <div className="user-card reported-card">
              <div className="user-card-header d-flex-between">
                <div className="d-flex-align-center gap-8">
                  <User size={16} className="text-secondary" />
                  <span className="user-card-role">Reported User</span>
                </div>
                <span className="badge-flagged">FLAGGED</span>
              </div>
              <div className="user-card-body">
                <img 
                  src={report.reported.avatar} 
                  alt="Reported User" 
                  className="user-avatar-md"
                />
                <div className="user-info">
                  <h4 className="user-name">{report.reported.name}</h4>
                  <p className="user-email">{report.reported.email}</p>
                  <p className="user-id">ID: {report.reported.userId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investigation Details Card */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title-wrapper">
                <FileText size={18} className="text-warning" />
                <h3 className="section-title">Investigation Details</h3>
              </div>
              <span className="section-meta">Submitted {report.date.split('\n')[1]}</span>
            </div>
            <div className="section-body bg-light-gray">
              <p className="investigation-text">
                "{report.details}"
              </p>
            </div>
            <div className="section-footer align-right">
              <span className="char-count">{report.details.length} characters</span>
            </div>
          </div>
        </div>

        {/* Right Column: Moderation Actions */}
        <div className="details-sidebar">
          <div className="section-card">
            <div className="section-header border-bottom-0 pb-0">
              <div className="section-title-wrapper text-warning mb-16">
                <AlertTriangle size={18} />
                <h3 className="section-title">Moderation Actions</h3>
              </div>
            </div>
            
            <div className="section-body pt-16">
              <div className="form-group">
                <label className="form-label">Update Report Status</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {report.reported.type === 'user' && (
                <div className="form-group mt-16">
                  <label className="form-label">Update User Status</label>
                  <select className="form-select" value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              )}

              <div className="form-group mb-24 mt-16">
                <div className="d-flex-between mb-8">
                  <label className="form-label mb-0">Internal Notes</label>
                  <span className="text-muted text-xs">Admin only</span>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows="4" 
                  placeholder="Document your findings here..."
                ></textarea>
              </div>

              <div className="action-buttons-group">
                <button className="btn-action-warning" onClick={handleSave} disabled={isSaving}>
                  <AlertTriangle size={16} />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button className="btn-action-secondary" onClick={() => navigate('/admin/reports')}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportDetails;
