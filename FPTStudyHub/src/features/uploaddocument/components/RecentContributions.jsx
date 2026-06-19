/* RecentContributions.jsx */
import React from 'react';
import { FileText, Eye } from 'lucide-react';
import { RECENT_DOCS } from "../../../data/uploaddocument";

const RecentContributions = () => {
  return (
    <div className="recent-contributions-wrapper" style={{ marginTop: '40px' }}>
      
      {/* Section Header */}
      <div className="contributions-section-header">
        <h3 className="contributions-section-title">Your Recent Contributions</h3>
        <a 
          href="#/documents" 
          className="view-all-contributions-link"
          onClick={(e) => {
            e.preventDefault();
            alert('Redirecting to your uploads...');
          }}
        >
          View all uploads
        </a>
      </div>

      {/* Contributions Grid */}
      <div className="contributions-grid">
        {RECENT_DOCS.map((doc) => (
          <div key={doc.id} className="contribution-document-card">
            
            {/* Top Row: Icon & Status Badge */}
            <div className="contribution-card-top">
              <div className="contribution-file-icon-wrapper">
                <FileText size={24} />
              </div>
              <span className={`contribution-status-badge ${doc.status.toLowerCase()}`}>
                {doc.status}
              </span>
            </div>

            {/* Middle Content: Title & Course Meta */}
            <div className="contribution-card-details">
              <h4 className="contribution-doc-title">{doc.title}</h4>
              <span className="contribution-doc-meta">
                {doc.category} &bull; {doc.code}
              </span>
            </div>

            {/* Bottom Row: Time and Views */}
            <div className="contribution-card-footer">
              <span className="contribution-date">{doc.timeAgo}</span>
              <div className="contribution-views">
                <Eye size={14} className="views-icon" />
                <span>{doc.views}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RecentContributions;