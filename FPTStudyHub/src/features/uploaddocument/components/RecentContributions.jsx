import React, { useState, useEffect } from 'react';
import { FileText, Eye } from 'lucide-react';

const RecentContributions = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyDocs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/v1/documents/my-contributions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setDocs(data);
        }
      } catch (err) {
        console.error("Lỗi tải contributions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyDocs();
  }, []);

  return (
    <div className="recent-contributions-wrapper" style={{ marginTop: '40px' }}>
      <div className="contributions-section-header">
        <h3 className="contributions-section-title">Your Recent Contributions</h3>
        <a href="#/documents" className="view-all-contributions-link">View all uploads</a>
      </div>

      <div className="contributions-grid">
        {loading ? (
          <p>Loading your documents...</p>
        ) : docs.length === 0 ? (
          <p>You haven't uploaded any documents yet.</p>
        ) : (
          docs.map((doc) => (
            <div key={doc.id} className="contribution-document-card">
              <div className="contribution-card-top">
                <div className="contribution-file-icon-wrapper">
                  <FileText size={24} />
                </div>
                {/* Status badge: nếu Backend có thuộc tính status thì dùng, không thì để mặc định 'Public' */}
                <span className="contribution-status-badge public">
                  {doc.visibility || 'Public'}
                </span>
              </div>

              <div className="contribution-card-details">
                <h4 className="contribution-doc-title">{doc.title}</h4>
                // Thay đổi cách hiển thị metadata trong RecentContributions.jsx
                <span className="contribution-doc-meta">
                  {doc.semester?.displayName || 'N/A'} &bull; {doc.subject?.subjectName}
                </span>
              </div>

              <div className="contribution-card-footer">
                <span className="contribution-date">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </span>
                <div className="contribution-views">
                  <Eye size={14} className="views-icon" />
                  <span>{doc.viewCount || 0}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentContributions;