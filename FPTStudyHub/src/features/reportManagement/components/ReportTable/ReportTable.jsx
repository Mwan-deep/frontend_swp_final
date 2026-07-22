import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, RefreshCcw, MoreVertical, Mail, UserX, AlertTriangle, FileText, ExternalLink } from 'lucide-react';
import { getDirectImageUrl } from '../../../../utils/imageHelper'; // ĐÃ THÊM IMPORT HÀM XỬ LÝ ẢNH
import './ReportTable.css';

// Nhận mảng reports và isLoading từ component cha
const ReportTable = ({ reports = [], isLoading = false, searchTerm = '', statusFilter = 'all' }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);

  // Lọc dữ liệu dựa trên từ khóa và bộ lọc trạng thái
  const filteredReports = reports.filter(report => {
    const term = searchTerm.toLowerCase();
    
    // Tìm kiếm theo ID báo cáo, tên người tố cáo, hoặc tên tài liệu
    const matchesSearch = 
      report.reportId?.toString().includes(term) ||
      (report.reporter?.fullName || report.reporter?.userName || '').toLowerCase().includes(term) ||
      (report.material?.title || '').toLowerCase().includes(term);

    let matchesStatus = true;
    if (statusFilter === 'all') {
      matchesStatus = report.status !== 'RESOLVED';
    } else {
      matchesStatus = report.status === statusFilter.toUpperCase();
    }

    return matchesSearch && matchesStatus;
  });

  // Gom nhóm các báo cáo nhắm vào cùng 1 tài liệu (materialId)
  const groupedMap = new Map();
  filteredReports.forEach(report => {
    const docId = report.material?.materialId;
    if (!docId) return;

    if (!groupedMap.has(docId)) {
      groupedMap.set(docId, { ...report, groupCount: 1 });
    } else {
      const existing = groupedMap.get(docId);
      existing.groupCount += 1;
    }
  });
  
  const groupedReports = Array.from(groupedMap.values());

  // Phân trang
  const itemsPerPage = 10;
  const totalItems = groupedReports.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = groupedReports.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const getReasonBadge = (reason) => {
    if (!reason) return <span className="reason-badge">Unknown</span>;
    if (reason.includes('Bản quyền') || reason.toLowerCase().includes('copyright')) {
      return <span className="reason-badge spam">© Copyright</span>;
    }
    if (reason.includes('Spam') || reason.toLowerCase().includes('spam')) {
       return <span className="reason-badge spam"><Mail size={14} /> Spam</span>;
    }
    return <span className="reason-badge inappropriate"><AlertTriangle size={14} /> Inappropriate Content</span>;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="status-badge pending">Waiting for Review</span>;
      case 'UNDER_REVIEW':
        return <span className="status-badge review">Under Review</span>;
      case 'RESOLVED':
        return <span className="status-badge resolved">Resolved</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px' }}>Loading data...</div>;
  }

  return (
    <div className="report-table-container">
      {/* Table Header */}
      <div className="report-table-header">
        <h2 className="report-table-title">Activity Report List (Active Reports)</h2>
        <div className="report-table-actions">
          <button className="icon-btn-small" onClick={() => window.location.reload()}><RefreshCcw size={18} /></button>
          <button className="icon-btn-small"><MoreVertical size={18} /></button>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Reporter</th>
              <th>Violating Document</th>
              <th>Reason (Summary)</th>
              <th>Total Count</th>
              <th>Report Date</th>
              <th>Status</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>No matching reports found.</td>
              </tr>
            ) : (
              currentReports.map((report) => {
                const reportCount = report.groupCount;
                return (
                  <tr key={report.reportId}>
                    <td className="report-id-cell">#{report.reportId}</td>
                    <td>
                      <div className="user-cell">
                        {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR TẠI ĐÂY */}
                        <img 
                          src={report.reporter?.avatarUrl ? getDirectImageUrl(report.reporter.avatarUrl) : `https://ui-avatars.com/api/?name=${report.reporter?.userName || 'U'}&background=random`} 
                          alt="Reporter" 
                          className="user-cell-avatar" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${report.reporter?.userName || 'U'}&background=random`;
                          }}
                        />
                        <div className="user-cell-info">
                          <p className="user-cell-name">{reportCount > 1 ? 'Nhiều người dùng' : (report.reporter?.fullName || report.reporter?.userName)}</p>
                          <p className="user-cell-email">{reportCount > 1 ? `${reportCount} tài khoản` : report.reporter?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="doc-icon-wrapper"><FileText size={20} className="doc-icon" /></div>
                        <div className="user-cell-info">
                          <p className="user-cell-name" title={report.material?.title}>
                            {report.material?.title?.length > 20 ? report.material?.title.substring(0, 20) + '...' : report.material?.title}
                          </p>
                          <p className="user-cell-email">Owner: {report.reportedUser?.userName}</p>
                        </div>
                      </div>
                    </td>
                    <td>{getReasonBadge(report.description)}</td>
                    <td>
                      <span className="total-reports-badge">
                        {reportCount} Reports <ExternalLink size={12} style={{ marginLeft: '2px' }} />
                      </span>
                    </td>
                    <td className="date-cell whitespace-pre-line">{new Date(report.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td>{getStatusBadge(report.status)}</td>
                    <td className="td-actions">
                      <button
                        className={`text-action-btn ${reportCount > 1 ? 'review-all' : 'view-record'}`}
                        onClick={() => {
                          if (reportCount > 1) {
                            // Chuyển sang màn hình Investigation (Xem gộp nhiều đơn của 1 tài liệu)
                            navigate('/admin/investigate-document', { state: { materialId: report.material?.materialId } });
                          } else {
                            // Chuyển sang màn hình Details (Xem chi tiết 1 đơn lẻ)
                            navigate('/admin/report-details', { state: { reportId: report.reportId } });
                          }
                        }}
                      >
                        {reportCount > 1 ? 'Review All' : 'See details'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="table-footer">
        <div className="pagination-info">
          Displaying {totalItems === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalItems)} / {totalItems} results
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