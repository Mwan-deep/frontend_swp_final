import React, { useState } from 'react';
import { Eye, Download, Heart, Share2, MoreVertical } from 'lucide-react';

const DocumentLibraryCard = ({ 
  doc, 
  isFavorite, 
  onToggleFavorite, 
  onMarkAsRead 
}) => {
  const [localLiked, setLocalLiked] = useState(false);
  
  // Trạng thái yêu thích: sử dụng giá trị đồng bộ từ parent hoặc fallback về local state
  const liked = isFavorite !== undefined ? isFavorite : localLiked;

  const handleCardClick = () => {
    if (onMarkAsRead) {
      onMarkAsRead(doc.id);
    }
    alert(`Xem chi tiết thành công tài liệu: ${doc.title}`);
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation();
    if (onMarkAsRead) {
      onMarkAsRead(doc.id);
    }
    alert(`Tải tài liệu thành công: ${doc.title}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(doc.id);
    } else {
      setLocalLiked(!localLiked);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    alert('Đã chia sẻ: ' + doc.title);
  };

  return (
    <div className="doc-card">
      <div 
        className="card-thumbnail clickable" 
        onClick={handleCardClick}
      >
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
          <h3 
            className="card-title clickable" 
            title={doc.title}
            onClick={handleCardClick}
          >
            {doc.title}
          </h3>
          <button className="card-menu-btn" aria-label="More options"><MoreVertical size={16} /></button>
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
            <div 
              className="stat-item clickable" 
              onClick={handleDownloadClick}
            >
              <Download size={14} />
              <span>{doc.downloads}</span>
            </div>
          </div>

          <div className="card-actions">
            <button
              onClick={handleLikeClick}
              className={`action-btn ${liked ? 'liked' : ''}`}
              aria-label="Like document"
            >
              <Heart size={15} />
            </button>
            <button 
              className="action-btn" 
              onClick={handleShareClick}
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