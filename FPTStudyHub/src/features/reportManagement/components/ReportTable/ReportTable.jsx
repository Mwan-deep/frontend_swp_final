import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, RefreshCcw, MoreVertical, Edit2, Mail, UserX, AlertTriangle, FileText } from 'lucide-react';
import './ReportTable.css';

import { mockReports } from '../../../../data/mockDocuments';

const ReportTable = ({ searchTerm = '' }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredReports = mockReports.filter(report => {
    const term = searchTerm.toLowerCase();
    return report.id.toLowerCase().includes(term) ||
           report.reporter.name.toLowerCase().includes(term) ||
           report.reported.name.toLowerCase().includes(term);
  });

  const itemsPerPage = 10;
  const totalItems = filteredReports.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getReasonBadge = (reason) => {
    switch (reason) {
      case 'Spam':
        return <span className="reason-badge spam"><Mail size={14}/> Spam</span>;
      case 'Harassment':
        return <span className="reason-badge harassment"><UserX size={14}/> Harassment</span>;
      case 'Inappropriate Content':
        return <span className="reason-badge inappropriate"><AlertTriangle size={14}/> Inappropriate Content</span>;
      default:
        return <span className="reason-badge">{reason}</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="status-badge pending">{status}</span>;
      case 'Under Review':
        return <span className="status-badge review">{status}</span>;
      case 'Resolved':
        return <span className="status-badge resolved">{status}</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="report-table-container">
      {/* Table Header */}
      <div className="report-table-header">
        <h2 className="report-table-title">Active Reports</h2>
        <div className="report-table-actions">
          <button className="icon-btn-small"><RefreshCcw size={18}/></button>
          <button className="icon-btn-small"><MoreVertical size={18}/></button>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Reporter</th>
              <th>Reported User</th>
              <th>Reason</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report) => (
              <tr key={report.id}>
                <td className="report-id-cell">{report.id}</td>
                <td>
                  <div className="user-cell">
                    <img src={report.reporter.avatar} alt={report.reporter.name} className="user-cell-avatar" />
                    <div className="user-cell-info">
                      <p className="user-cell-name">{report.reporter.name}</p>
                      <p className="user-cell-email">{report.reporter.handle}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="user-cell">
                    {report.reported.type === 'user' ? (
                      <img src={report.reported.avatar} alt={report.reported.name} className="user-cell-avatar" />
                    ) : (
                      <div className="doc-icon-wrapper"><FileText size={20} className="doc-icon"/></div>
                    )}
                    <div className="user-cell-info">
                      <p className="user-cell-name">{report.reported.name}</p>
                      <p className="user-cell-email">{report.reported.handle}</p>
                    </div>
                  </div>
                </td>
                <td>{getReasonBadge(report.reason)}</td>
                <td className="date-cell whitespace-pre-line">{report.date}</td>
                <td>{getStatusBadge(report.status)}</td>
                <td className="td-actions">
                  <button className="action-btn" onClick={() => navigate('/admin/report-details', { state: { reportId: report.id } })}>
                    <Edit2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="table-footer">
        <div className="pagination-info">
          Showing {totalItems === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} reports
        </div>
        <div className="simple-pagination-controls">
          <button className="nav-arrow-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>&lt;</button>
          <button className="nav-arrow-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
