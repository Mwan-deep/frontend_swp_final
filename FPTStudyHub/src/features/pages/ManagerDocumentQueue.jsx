import React, { useState } from 'react';
import { Search, Filter, FileText, AlertCircle, Share2, X, CheckCircle, Flag, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { mockReports, mockDocumentQueue } from '../../data/mockDocuments';
import './ManagerDocumentQueue.css';

const ManagerDocumentQueue = () => {
  const location = useLocation();
  const [docs, setDocs] = useState(mockDocumentQueue);

  // Read selected document ID from navigation state if available
  const initialSelectedDoc = location.state?.selectedDocId 
    ? mockDocumentQueue.find(d => d.id === location.state.selectedDocId) 
    : docs[0];

  const [selectedDoc, setSelectedDoc] = useState(initialSelectedDoc || null);

  const handleDelete = (id) => {
    // Mutate global mock array to sync with Dashboard
    const globalIndex = mockDocumentQueue.findIndex(d => d.id === id);
    if (globalIndex > -1) mockDocumentQueue.splice(globalIndex, 1);

    const newDocs = docs.filter(d => d.id !== id);
    setDocs(newDocs);
    if (selectedDoc && selectedDoc.id === id) {
      setSelectedDoc(newDocs[0] || null);
    }
  };

  const handleApprove = (id) => {
    // Mutate global mock array to sync with Dashboard
    const globalItem = mockDocumentQueue.find(d => d.id === id);
    if (globalItem) globalItem.status = 'APPROVED';

    const newDocs = docs.map(d => d.id === id ? { ...d, status: 'APPROVED' } : d);
    setDocs(newDocs);
    if (selectedDoc && selectedDoc.id === id) {
      setSelectedDoc({ ...selectedDoc, status: 'APPROVED' });
    }
  };

  return (
    <div className="manager-document-queue">
      <div className="queue-main-content">
        <div className="queue-header">
          <h2>Document Queue</h2>
          <div className="queue-status">
            <span>Queue status:</span>
            <span className="status-badge-pending">{docs.length} Items Pending</span>
          </div>
        </div>

        <div className="queue-filters">
          <div className="filter-group">
            <label>Subject</label>
            <select><option>All Subjects</option></select>
          </div>
          <div className="filter-group">
            <label>Major</label>
            <select><option>IT</option></select>
          </div>
          <div className="filter-group">
            <label>Semester</label>
            <select><option>Fall 2023</option></select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select><option>All Status</option></select>
          </div>
          <button className="btn-filter-icon"><Filter size={18} /></button>
        </div>

        <div className="queue-table-wrapper">
          <table className="queue-table">
            <thead>
              <tr>
                <th>Material ID / File Name</th>
                <th>Department</th>
                <th>Reported</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id} 
                    className={selectedDoc?.id === doc.id ? "selected-row" : ""}
                    onClick={() => setSelectedDoc(doc)}>
                  <td className="doc-name-cell">
                    <div className="doc-icon-wrapper">
                       <FileText size={18} className="icon-pdf" />
                    </div>
                    <div>
                      <div className="doc-title">{doc.name}</div>
                      <div className="doc-id">ID: {doc.id}</div>
                    </div>
                  </td>
                  <td>{doc.department}</td>
                  <td>
                    <span className="report-count">{doc.reports.length} <AlertCircle size={12} /></span>
                  </td>
                  <td>
                    <span className={`status-pill ${doc.status.toLowerCase()}`}>{doc.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDoc && (
        <div className="queue-details-panel">
          <div className="details-header">
            <h3>Details Panel</h3>
            <div className="details-actions">
              <Share2 size={18} className="details-icon-btn"/>
              <X size={18} className="details-icon-btn"/>
            </div>
          </div>

          <div className="details-doc-info">
             <div className="details-doc-icon">
                <FileText size={32} className="icon-pdf" />
             </div>
             <div>
                <h4 className="details-doc-title">{selectedDoc.name}</h4>
                <div className="details-doc-meta">
                  <span className="meta-pill">{selectedDoc.format}</span>
                  <span className="meta-pill">{selectedDoc.size}</span>
                  <span className="meta-pill">{selectedDoc.pages}</span>
                </div>
             </div>
          </div>

          <div className="details-meta-grid">
             <div className="meta-item">
               <span className="meta-label">MAJOR</span>
               <span className="meta-value">Software Engineering</span>
             </div>
             <div className="meta-item">
               <span className="meta-label">SEMESTER</span>
               <span className="meta-value">Fall 2023</span>
             </div>
             <div className="meta-item full-width">
               <span className="meta-label">CREATED BY</span>
               <div className="meta-user">
                 <img src={selectedDoc.author.avatar} alt="Avatar" />
                 <span>{selectedDoc.author.name} ({selectedDoc.author.handle})</span>
               </div>
             </div>
             <div className="meta-item full-width">
               <span className="meta-label">CREATION TIME</span>
               <span className="meta-value">{selectedDoc.creationTime}</span>
             </div>
          </div>

          <div className="details-tags">
             <span className="meta-label">Tags</span>
             <div className="tags-list">
               {selectedDoc.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
             </div>
          </div>

          <div className="details-reports-box">
             <div className="reports-box-header">
               <AlertCircle size={16} /> Thông tin Báo cáo ({selectedDoc.reports.length})
             </div>
             <div className="reports-list">
               {selectedDoc.reports.map(rep => (
                 <div key={rep.id} className="report-item">
                   <p><strong>User {rep.reporter.handle}:</strong> "{rep.description || rep.reason}"</p>
                 </div>
               ))}
             </div>
          </div>

          <div className="details-action-buttons">
             <div className="action-row">
               <button className="btn-approve" onClick={() => handleApprove(selectedDoc.id)}>
                 <CheckCircle size={18} /> Approve
               </button>
               <button className="btn-flag">
                 <Flag size={18} /> Flag/Plagiarism
               </button>
             </div>
             <button className="btn-delete" onClick={() => handleDelete(selectedDoc.id)}>
               <Trash2 size={18} /> Xóa tài liệu
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDocumentQueue;
