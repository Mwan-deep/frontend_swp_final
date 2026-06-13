import React, { useState } from 'react';
import { Eye, Download, Heart, Share2, MoreVertical } from 'lucide-react';

const DocumentLibraryCard = ({ doc }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="doc-card">
      <div className="card-thumbnail">
        {doc.image ? (
          <img src={doc.image} alt={doc.title} className="card-image" />
        ) : (
          <div className="no-image-placeholder">
            <span>No preview</span>
          </div>
        )}
        <span className="doc-format-badge">{doc.format}</span>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title" title={doc.title}>{doc.title}</h3>
          <button className="card-menu-btn"><MoreVertical size={16} /></button>
        </div>

        <p className="card-meta">
          By {doc.author.replace('By ', '')} • {doc.date}
        </p>

        <div className="card-footer">
          <div className="card-stats">
            <div className="stat-item">
              <Eye size={14} />
              <span>{doc.views}</span>
            </div>
            <div className="stat-item">
              <Download size={14} />
              <span>{doc.downloads}</span>
            </div>
          </div>

          <div className="card-actions">
            <button
              onClick={() => setLiked(!liked)}
              className={`action-btn ${liked ? 'liked' : ''}`}
              aria-label="Like document"
            >
              <Heart size={15} />
            </button>
            <button 
              className="action-btn" 
              onClick={() => alert('Đã chia sẻ: ' + doc.title)}
              aria-label="Share document"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentLibraryCard;