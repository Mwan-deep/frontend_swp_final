import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, User, AlertTriangle, FileText, Download } from 'lucide-react';
import './AdminReportDetails.css';

const AdminReportDetails = () => {
  const navigate = useNavigate();

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
          <h1 className="admin-page-title mb-0">Report #REP-1024</h1>
          <span className="badge-under-review">Under Review</span>
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
                  <span className="metadata-value">#REP-1024</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Material ID</span>
                  <span className="metadata-value text-primary cursor-pointer">DOC-8832</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Submitted On</span>
                  <span className="metadata-value">Oct 24, 2023</span>
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
                  src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random" 
                  alt="Reporter" 
                  className="user-avatar-md"
                />
                <div className="user-info">
                  <h4 className="user-name">Sarah Jenkins</h4>
                  <p className="user-email">sarah.j@student.fpt.edu.vn</p>
                  <p className="user-id">ID: USR-4421</p>
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
                  src="https://ui-avatars.com/api/?name=Michael+Chen&background=random" 
                  alt="Reported User" 
                  className="user-avatar-md"
                />
                <div className="user-info">
                  <h4 className="user-name">Michael Chen</h4>
                  <p className="user-email">m.chen2@student.fpt.edu.vn</p>
                  <p className="user-id">ID: USR-9902</p>
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
              <span className="section-meta">Submitted 10:42 AM EST</span>
            </div>
            <div className="section-body bg-light-gray">
              <p className="investigation-text">
                "The study material uploaded under DOC-8832 contains several sections that appear to be directly copied from the Fall 2022 final exam without any attribution. Furthermore, the accompanying AI-generated summary includes completely fabricated references that don't exist in the course syllabus. This violates the academic integrity guidelines for shared content."
              </p>
            </div>
            <div className="section-footer align-right">
              <span className="char-count">324 characters</span>
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
                <label className="form-label">Update Status</label>
                <select className="form-select" defaultValue="Under Review">
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="form-group mb-24">
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
                <button className="btn-action-warning">
                  <AlertTriangle size={16} />
                  Issue Warning
                </button>
                <button className="btn-action-danger">
                  <User size={16} />
                  Suspend User
                </button>
                <button className="btn-action-secondary">
                  Dismiss Report
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
