import React from 'react';
import { FileText, SlidersHorizontal } from 'lucide-react';

const DocumentSelector = ({ documents, selectedDocId, onSelectDoc }) => {
  return (
    <div className="create-card document-selector-card">
      <div className="card-header">
        <div className="header-titles">
          <h2 className="card-title">1. Select Document</h2>
          <p className="card-subtitle">Choose a document for AI to analyze and generate questions.</p>
        </div>
        <button className="btn-filter-docs" title="Filter Documents">
          <SlidersHorizontal size={16} />
        </button>
      </div>

      <div className="document-table-wrapper">
        <table className="document-table">
          <thead>
            <tr>
              <th>DOCUMENT NAME</th>
              <th>MAJOR</th>
              <th>COURSE</th>
              <th>UPLOAD DATE</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const isSelected = selectedDocId === doc.id;
              return (
                <tr 
                  key={doc.id}
                  className={`document-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectDoc(doc.id)}
                >
                  <td className="col-doc-name">
                    <div className="doc-name-wrapper">
                      <FileText size={18} className="doc-icon" />
                      <span className="doc-name-text">{doc.name}</span>
                    </div>
                  </td>
                  <td className="col-doc-major">{doc.major}</td>
                  <td className="col-doc-course">{doc.course}</td>
                  <td className="col-doc-date">{doc.uploadDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentSelector;