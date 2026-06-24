import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Download, FileText, CheckCircle, Trash2, ShieldAlert, CheckSquare, X, Filter } from 'lucide-react';
import { mockReports, mockDocumentQueue, mockTableUsers } from '../../data/mockDocuments';
import './AdminDocumentInvestigation.css';

const AdminDocumentInvestigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const materialId = location.state?.materialId || 'DOC-1001';
  
  // Find document info
  const documentInfo = mockDocumentQueue.find(d => d.id === materialId) || {
    id: materialId,
    name: 'Unknown Document',
    author: { name: 'Unknown', avatar: '' }
  };

  // Find all reports for this material
  const allRelatedReports = mockReports.filter(r => r.reported.userId === materialId);
  const totalReports = allRelatedReports.length;

  const [selectedReport, setSelectedReport] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = allRelatedReports.filter(report => {
    if (statusFilter === 'all') {
      return report.status !== 'Resolved';
    }
    return report.status === statusFilter;
  });
  
  // Moderation states for selected report
  const [reportStatus, setReportStatus] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const openReportDetails = (report) => {
    setSelectedReport(report);
    setReportStatus(report.status);
    const reportedUser = mockTableUsers.find(u => u.userId === report.reported.userId);
    setUserStatus(reportedUser ? reportedUser.status : 'Active');
  };

  const closeReportDetails = () => {
    setSelectedReport(null);
  };

  const handleSaveModeration = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Actual update logic
      const reportIndex = mockReports.findIndex(r => r.id === selectedReport.id);
      if (reportIndex !== -1) {
        mockReports[reportIndex].status = reportStatus;
      }
      
      if (selectedReport.reported.type === 'user') {
        const userIdx = mockTableUsers.findIndex(u => u.userId === selectedReport.reported.userId);
        if (userIdx !== -1) {
          mockTableUsers[userIdx].status = userStatus;
        }
      }
      
      alert(`Changes saved successfully for report ${selectedReport.id}`);
      closeReportDetails();
    }, 800);
  };

  const handleBanAccount = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Update mock data
      allRelatedReports.forEach(r => r.status = 'Resolved');
      
      // Suspend uploader
      const authorId = documentInfo.author?.userId;
      if (authorId) {
        const userIdx = mockTableUsers.findIndex(u => u.userId === authorId);
        if (userIdx !== -1) {
          mockTableUsers[userIdx].status = 'Suspended';
          mockTableUsers[userIdx].account_status = 'Suspended';
        }
      }
      
      alert('Account banned and reports resolved.');
      navigate('/admin/reports');
    }, 600);
  };

  const handleResolveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      allRelatedReports.forEach(r => r.status = 'Resolved');
      alert('Reports resolved.');
      navigate('/admin/reports');
    }, 600);
  };

  const getReasonBadge = (reason) => {
    if (reason === 'Copyright Violation' || reason.includes('Copyright')) {
      return <span className="reason-badge spam">© Copyright</span>;
    }
    if (reason === 'Inaccurate Information' || reason === 'Inappropriate Content' || reason.includes('Inappropriate')) {
      return <span className="reason-badge inappropriate"><ShieldAlert size={14}/> Inappropriate</span>;
    }
    return <span className="reason-badge">{reason}</span>;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="status-badge pending">PENDING</span>;
      case 'Under Review':
        return <span className="status-badge review">IN REVIEW</span>;
      case 'Resolved':
        return <span className="status-badge resolved">RESOLVED</span>;
      default:
        return <span className="status-badge">{status ? status.toUpperCase() : ''}</span>;
    }
  };

  return (
    <div className="admin-page-container document-investigation-page">
      {/* Top Header */}
      <div className="investigation-top-header">
        <button className="btn-back-clean" onClick={() => navigate('/admin/reports')}>
          <ArrowLeft size={18} />
          Investigation Dashboard
        </button>
      </div>

      <div className="investigation-content">
        {/* Breadcrumb */}
        <div className="breadcrumb-wrapper mb-16">
          <div className="breadcrumb">
            <span className="breadcrumb-link" onClick={() => navigate('/admin/reports')}>Report Management</span>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{documentInfo.name}</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="report-details-header mb-24">
          <div className="report-title-wrapper">
            <h1 className="admin-page-title mb-0">{documentInfo.name}</h1>
            <span className="badge-critical"><ShieldAlert size={14} /> Critical Status</span>
          </div>
          <button className="btn-export-solid">
            <Download size={16} />
            Export Report
          </button>
        </div>

        {/* Document Actions Row */}
        <div className="investigation-actions-row mb-24">
          {/* Left: Document Info Card */}
          <div className="investigation-doc-card">
            <div className="doc-icon-box">
              <FileText size={24} className="text-secondary" />
            </div>
            <div className="doc-info-cols">
              <div className="doc-info-col">
                <span className="doc-info-label">Material ID</span>
                <span className="doc-info-value">{documentInfo.id}</span>
              </div>
              <div className="doc-info-col">
                <span className="doc-info-label">Uploader</span>
                <div className="uploader-info">
                  <img src={documentInfo.author?.avatar || 'https://ui-avatars.com/api/?name=Uploader'} alt="Uploader" className="uploader-avatar" />
                  <span className="doc-info-value">{documentInfo.author?.name || 'Unknown'}</span>
                </div>
              </div>
              <div className="doc-info-col">
                <span className="doc-info-label">Total Reports</span>
                <span className="doc-info-value text-danger font-bold">{totalReports}</span>
              </div>
            </div>
          </div>

          {/* Right: Global Actions */}
          <div className="investigation-global-actions">
            <button className="btn-doc-action danger" onClick={handleBanAccount} disabled={isSaving}>
              <Trash2 size={16} /> Ban Account
            </button>
            <button className="btn-doc-action primary" onClick={handleResolveAll} disabled={isSaving}>
              <CheckSquare size={16} /> Resolve
            </button>
          </div>
        </div>

        {/* Layout for Table and Side Panel */}
        <div className={`investigation-layout ${selectedReport ? 'panel-open' : ''}`}>
          {/* Main Table */}
          <div className="investigation-table-container">
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', borderBottom: '1px solid #eaebf0' }}>
              <div className="filter-dropdown-container">
                <Filter size={16} className="filter-dropdown-icon" />
                <select 
                  className="btn-filter select-filter-with-icon"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Filter</option>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">In Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Reporter</th>
                  <th>Reason/Category</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr 
                    key={report.id} 
                    className={selectedReport?.id === report.id ? 'selected-row' : ''}
                    onClick={() => openReportDetails(report)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="report-id-cell">{report.id}</td>
                    <td>
                      <div className="user-cell">
                        <img src={report.reporter.avatar} alt={report.reporter.name} className="user-cell-avatar" />
                        <span className="user-cell-name">{report.reporter.name}</span>
                      </div>
                    </td>
                    <td>{getReasonBadge(report.reason)}</td>
                    <td className="date-cell">{report.date.replace('\n', ' • ')}</td>
                    <td>{getStatusBadge(report.status)}</td>
                    <td className="td-actions">
                      <button className="text-action-btn view-record" onClick={(e) => { e.stopPropagation(); openReportDetails(report); }}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-footer">
              <div className="pagination-info">Showing {filteredReports.length} of {totalReports} reports</div>
              <div className="simple-pagination-controls">
                <button className="nav-arrow-btn">&lt;</button>
                <button className="nav-arrow-btn active">1</button>
                <button className="nav-arrow-btn">&gt;</button>
              </div>
            </div>
          </div>

          {/* Side Panel for Moderation */}
          {selectedReport && (
            <div className="investigation-side-panel">
              <div className="side-panel-header">
                <h3 className="side-panel-title">Report Details</h3>
                <button className="btn-close-panel" onClick={closeReportDetails}><X size={20} /></button>
              </div>
              
              <div className="side-panel-content">
                <div className="panel-section mb-24">
                  <h4 className="panel-section-title">Investigation Text</h4>
                  <div className="bg-light-gray p-16 br-8">
                    <p className="investigation-text m-0">{selectedReport.details}</p>
                  </div>
                </div>

                <div className="panel-section">
                  <div className="d-flex-align-center gap-8 mb-16 text-warning">
                    <ShieldAlert size={18} />
                    <h4 className="panel-section-title m-0">Moderation Actions</h4>
                  </div>
                  
                  <div className="form-group mb-16">
                    <label className="form-label">Update Report Status</label>
                    <select className="form-select" value={reportStatus} onChange={(e) => setReportStatus(e.target.value)}>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">In Review</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  {selectedReport.reported.type === 'user' && (
                    <div className="form-group mb-16">
                      <label className="form-label">Update User Status</label>
                      <select className="form-select" value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  )}

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
                    <button className="btn-action-warning" onClick={handleSaveModeration} disabled={isSaving}>
                      <ShieldAlert size={16} />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button className="btn-action-secondary" onClick={closeReportDetails}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDocumentInvestigation;
