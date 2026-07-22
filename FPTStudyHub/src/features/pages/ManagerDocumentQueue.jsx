import React, { useState, useEffect } from 'react';
import { Filter, FileText, AlertCircle, Share2, X, CheckCircle, Trash2, Eye, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';
import { getDirectImageUrl } from '../../utils/imageHelper'; // ĐÃ THÊM IMPORT
import './ManagerDocumentQueue.css';

const ManagerDocumentQueue = () => {
  const location = useLocation();
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [reportFilter, setReportFilter] = useState('ALL');

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');

  const fetchQueueData = async () => {
    try {
      setIsLoading(true);
      const [docsRes, reportsRes] = await Promise.all([
        axiosClient.get('/api/v1/documents/all'),
        axiosClient.get('/api/reports')
      ]);

      const docsData = Array.isArray(docsRes) ? docsRes : (Array.isArray(docsRes?.result) ? docsRes.result : []);
      const reportsData = Array.isArray(reportsRes) ? reportsRes : (Array.isArray(reportsRes?.result) ? reportsRes.result : []);

      const enrichedDocs = docsData.map(doc => {
        const docReports = reportsData.filter(r => r.material?.materialId === doc.materialId);
        return { ...doc, reports: docReports };
      });

      enrichedDocs.sort((a, b) => {
        if (b.reports.length !== a.reports.length) {
          return b.reports.length - a.reports.length;
        }
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });

      setDocs(enrichedDocs);

      const initialId = location.state?.selectedDocId;
      if (initialId) {
        const found = enrichedDocs.find(d => d.materialId === initialId);
        handleSelectDoc(found || enrichedDocs[0] || null);
      } else {
        handleSelectDoc(enrichedDocs[0] || null);
      }
    } catch (error) {
      console.error("Data loading error Queue:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueData();
  }, [location.state?.selectedDocId]);

  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc);
    setIsDeleting(false);
    setDeleteReason('');
  };

  const confirmDelete = async () => {
    if (!deleteReason.trim()) {
      alert("Please enter a reason for deleting the document to notify the uploader!");
      return;
    }

    if (window.confirm("Are you sure you want to PERMANENTLY delete this document with the above reason?")) {
      try {
        await axiosClient.delete(`/api/v1/documents/${selectedDoc.materialId}?reason=${encodeURIComponent(deleteReason)}`);
        alert("Document deleted successfully. The system has sent a notification with the reason to the uploader.");
        fetchQueueData();
        setSelectedDoc(null);
        setIsDeleting(false);
        setDeleteReason('');
      } catch (error) {
        alert("Error deleting document: " + (error.response?.data || error.message));
      }
    }
  };

  const handleApprove = async (id) => {
    if (window.confirm("Mark this document as SAFE and dismiss all reports? The uploader will receive a trust notification.")) {
      try {
        await axiosClient.put('/api/v1/documents/' + id + '/visibility', { visibility: 'PUBLIC' });
        alert("Document has been marked as Safe. A notification has been sent to the uploader.");
        const newDocs = docs.map(d =>
          d.materialId === id ? { ...d, visibility: 'PUBLIC', reports: [] } : d
        );
        setDocs(newDocs);
        if (selectedDoc && selectedDoc.materialId === id) {
          setSelectedDoc({ ...selectedDoc, visibility: 'PUBLIC', reports: [] });
        }
      } catch (error) {
        alert("System error: " + (error.response?.data?.message || error.response?.data || error.message));
      }
    }
  };

  const getFileExtension = (fileName) => {
    if (!fileName) return 'DOC';
    return fileName.split('.').pop().toUpperCase();
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 KB';
    return (bytes / 1024).toFixed(2) + ' KB';
  };

  const filteredDocs = docs.filter(doc => {
    const keyword = searchTerm.toLowerCase();
    const matchTitle = (doc.title || '').toLowerCase().includes(keyword);
    const matchSubject = (doc.subject?.subjectName || '').toLowerCase().includes(keyword);
    const isSearchMatch = matchTitle || matchSubject;

    const docStatus = (doc.visibility || 'PRIVATE').toUpperCase();
    const isStatusMatch = statusFilter === 'ALL' || docStatus === statusFilter;

    const hasReports = doc.reports && doc.reports.length > 0;
    const isReportMatch = reportFilter === 'ALL' ||
      (reportFilter === 'REPORTED' && hasReports) ||
      (reportFilter === 'NORMAL' && !hasReports);

    return isSearchMatch && isStatusMatch && isReportMatch;
  });

  if (isLoading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading document queue...</div>;
  }

  return (
    <div className="manager-document-queue">
      <div className="queue-main-content">
        <div className="queue-header">
          <h2>Document Queue</h2>
          <div className="queue-status">
            <span>Status:</span>
            <span className="status-badge-pending">{filteredDocs.length} Matching Documents</span>
          </div>
        </div>

        <div className="queue-filters" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="filter-group" style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
            <input
              type="text"
              placeholder="Search document name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
            />
          </div>

          <div className="filter-group">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: 'pointer', outline: 'none' }}>
              <option value="ALL">All Statuses</option>
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          <div className="filter-group">
            <select value={reportFilter} onChange={(e) => setReportFilter(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: 'pointer', outline: 'none' }}>
              <option value="ALL">All (Reported & Normal)</option>
              <option value="REPORTED">Reported Documents</option>
              <option value="NORMAL">Normal Documents</option>
            </select>
          </div>
        </div>

        <div className="queue-table-wrapper">
          <table className="queue-table">
            <thead>
              <tr>
                <th>Document / File Name</th>
                <th>Subject</th>
                <th>Reported</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#6b7280' }}>No documents found matching the filter criteria.</td></tr>
              ) : (
                filteredDocs.map(doc => (
                  <tr key={doc.materialId}
                    className={selectedDoc?.materialId === doc.materialId ? "selected-row" : ""}
                    onClick={() => handleSelectDoc(doc)}
                    style={{ cursor: 'pointer' }}>
                    <td className="doc-name-cell">
                      <div className="doc-icon-wrapper">
                        <FileText size={18} className="icon-pdf" />
                      </div>
                      <div>
                        <div className="doc-title" title={doc.title}>
                          {doc.title?.length > 25 ? doc.title.substring(0, 25) + '...' : doc.title}
                        </div>
                        <div className="doc-id">ID: #{doc.materialId}</div>
                      </div>
                    </td>
                    <td>{doc.subject?.subjectName || 'Khác'}</td>
                    <td>
                      {doc.reports?.length > 0 ? (
                        <span className="report-count" style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                          {doc.reports.length} <AlertCircle size={12} style={{ display: 'inline' }} />
                        </span>
                      ) : (
                        <span style={{ color: '#6b7280' }}>0</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-pill ${doc.visibility === 'PUBLIC' ? 'approved' : 'pending'}`}>
                        {doc.visibility || 'PRIVATE'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDoc && (
        <div className="queue-details-panel">
          <div className="details-header">
            <h3>Document Details</h3>
            <div className="details-actions">
              <Share2 size={18} className="details-icon-btn" />
              <X size={18} className="details-icon-btn" onClick={() => setSelectedDoc(null)} />
            </div>
          </div>

          <div className="details-doc-info">
            <div className="details-doc-icon">
              <FileText size={32} className="icon-pdf" />
            </div>
            <div>
              <h4 className="details-doc-title">{selectedDoc.title}</h4>
              <div className="details-doc-meta">
                <span className="meta-pill">{getFileExtension(selectedDoc.fileName)}</span>
                <span className="meta-pill">{formatSize(selectedDoc.fileSize)}</span>
              </div>
            </div>
          </div>

          <div className="details-meta-grid">
            <div className="meta-item">
              <span className="meta-label">SUBJECT</span>
              <span className="meta-value">{selectedDoc.subject?.subjectName || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SEMESTER</span>
              <span className="meta-value">{selectedDoc.semester?.displayName || 'N/A'}</span>
            </div>
            <div className="meta-item full-width">
              <span className="meta-label">UPLOADER</span>
              <div className="meta-user">
                {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR */}
                <img 
                  src={selectedDoc.account?.avatarUrl ? getDirectImageUrl(selectedDoc.account.avatarUrl) : `https://ui-avatars.com/api/?name=${selectedDoc.account?.userName || 'U'}&background=random`} 
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${selectedDoc.account?.userName || 'U'}&background=random`;
                  }}
                />
                <span>{selectedDoc.account?.userName || 'Unknown'}</span>
              </div>
            </div>
            <div className="meta-item full-width">
              <span className="meta-label">UPLOAD TIME</span>
              <span className="meta-value">{selectedDoc.createdAt ? new Date(selectedDoc.createdAt).toLocaleString('vi-VN') : 'N/A'}</span>
            </div>
          </div>

          {selectedDoc.reports && selectedDoc.reports.length > 0 && (
            <div className="details-reports-box">
              <div className="reports-box-header" style={{ backgroundColor: '#fef2f2', color: '#ef4444', padding: '10px', borderRadius: '8px 8px 0 0', fontWeight: 'bold' }}>
                <AlertCircle size={16} /> Accused ({selectedDoc.reports.length} times)
              </div>
              <div className="reports-list" style={{ border: '1px solid #fecaca', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '10px', backgroundColor: '#fff' }}>
                {selectedDoc.reports.map(rep => (
                  <div key={rep.reportId} className="report-item" style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '8px', marginBottom: '8px' }}>
                    <p style={{ margin: 0, fontSize: '13px' }}>
                      <strong>{rep.reporter?.userName || 'Anonymous'}:</strong> "{rep.description}"
                    </p>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{rep.createdAt ? new Date(rep.createdAt).toLocaleDateString('vi-VN') : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="details-action-buttons" style={{ marginTop: '24px' }}>
            {!isDeleting ? (
              <>
                <div className="action-row">
                  {selectedDoc.reports && selectedDoc.reports.length > 0 && (
                    <button className="btn-approve" onClick={() => handleApprove(selectedDoc.materialId)}>
                      <CheckCircle size={18} /> Approve Safety
                    </button>
                  )}

                  <button className="btn-flag" onClick={() => window.open(`/documents/${selectedDoc.materialId}`, '_blank')}>
                    <Eye size={18} /> View Original File
                  </button>
                </div>

                <button className="btn-delete" onClick={() => setIsDeleting(true)}>
                  <Trash2 size={18} /> Delete Document
                </button>
              </>
            ) : (
              <div className="delete-reason-box">
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#b91c1c', marginBottom: '4px' }}>
                  Delete Reason (Send to Uploader):
                </label>
                <textarea
                  placeholder="E.g: Document violates copyright..."
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                />
                <div className="delete-actions-row">
                  <button className="btn-cancel-delete" onClick={() => setIsDeleting(false)}>Hủy</button>
                  <button className="btn-confirm-delete" onClick={confirmDelete}>Confirm Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDocumentQueue;