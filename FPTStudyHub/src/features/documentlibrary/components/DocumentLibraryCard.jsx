import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ĐÃ THÊM: Trash2 (Xóa), Globe (Công khai), Lock (Riêng tư)
import { Eye, Download, Heart, Share2, MoreVertical, Flag, Trash2, Globe, Lock } from 'lucide-react'; 

const DocumentLibraryCard = ({ 
  doc, 
  isFavorite, 
  onToggleFavorite, 
  onMarkAsRead,
  currentUser, // Nhận currentUser từ file cha
  onReport,    // Nhận hàm mở modal Report
  onDelete,           // MỚI: Hàm xử lý xóa từ component cha
  onToggleVisibility  // MỚI: Hàm đổi Public/Private từ component cha
}) => {
  const navigate = useNavigate();
  const [localLiked, setLocalLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const liked = isFavorite !== undefined ? isFavorite : localLiked;

  // SO SÁNH CHÍNH XÁC ĐỂ XÁC ĐỊNH CHỦ SỞ HỮU TÀI LIỆU
  const isOwner = currentUser && (doc.instructor === currentUser || doc.account?.userName === currentUser);

  const getFileExtension = (fileName) => {
    if (!fileName) return 'DOC';
    return fileName.split('.').pop().toUpperCase();
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return 'N/A';
    return new Date(dateInput).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  const handleCardClick = () => {
    if (onMarkAsRead) onMarkAsRead(doc.materialId);
    navigate(`/documents/${doc.materialId}`);
  };

  const handleDownloadClick = async (e) => {
    e.stopPropagation(); 
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('api_token');
      const response = await fetch(`https://backend-swp-final.onrender.com/api/v1/documents/download/${doc.materialId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Không thể tải file lúc này!');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.fileName || 'tai_lieu'); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(doc.materialId);
    else setLocalLiked(!localLiked);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const docUrl = `${window.location.origin}/documents/${doc.materialId}`;
    navigator.clipboard.writeText(docUrl);
    alert('Đã copy link tài liệu vào Clipboard: ' + docUrl);
  };

  return (
    <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div 
        className="card-thumbnail clickable" 
        onClick={handleCardClick}
        style={{ 
          position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff',
          width: '100%', height: '180px', display: 'block'
        }}
      >
        {doc.fileUrl ? (
          <iframe 
            src={`https://drive.google.com/file/d/${doc.fileUrl}/preview`} 
            title={doc.title} loading="lazy"
            style={{ 
              border: 'none', pointerEvents: 'none', width: '100%',
              height: '140%', position: 'absolute', top: '-20%', left: 0
            }}
          ></iframe>
        ) : doc.image ? (
          <img src={doc.image} alt={doc.title} className="card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="no-image-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <span>{getFileExtension(doc.fileName)}</span>
          </div>
        )}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, background: 'transparent' }}></div>
        <span className="doc-format-badge" style={{ zIndex: 2 }}>{getFileExtension(doc.fileName)}</span>
      </div>

      <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="card-title-row">
            <h3 className="card-title clickable" title={doc.title} onClick={handleCardClick}>
              {doc.title}
            </h3>
            <button className="card-menu-btn" aria-label="More options"><MoreVertical size={16} /></button>
          </div>
          <p className="card-meta">
            By {doc.account?.userName || 'Anonymous'} • {formatDate(doc.createdAt)}
          </p>
        </div>

        <div className="card-footer" style={{ marginTop: 'auto' }}>
          <div className="card-stats">
            <div className="stat-item">
              <Eye size={14} /> <span>{doc.viewCount || 0}</span>
            </div>
            <div className="stat-item clickable" onClick={handleDownloadClick}>
              <Download size={14} /> <span>{isDownloading ? '...' : (doc.downloadCount || 0)}</span>
            </div>
          </div>

          <div className="card-actions">
            <button onClick={handleLikeClick} className={`action-btn ${liked ? 'liked' : ''}`}>
              <Heart size={15} fill={liked ? "#ff4b4b" : "none"} color={liked ? "#ff4b4b" : "currentColor"} />
            </button>
            <button className="action-btn" onClick={handleShareClick}><Share2 size={15} /></button>
            
            {/* CÁC NÚT ĐẶC QUYỀN CỦA CHỦ TÀI LIỆU */}
            {isOwner && (
              <>
                {/* Nút Đổi trạng thái Public/Private */}
                <button 
                  className="action-btn"
                  onClick={(e) => { e.stopPropagation(); if (onToggleVisibility) onToggleVisibility(doc); }}
                  title={doc.visibility === 'PRIVATE' ? "Đang riêng tư - Bấm để chia sẻ" : "Đang công khai - Bấm để ẩn"}
                >
                  {doc.visibility === 'PRIVATE' ? <Lock size={15} /> : <Globe size={15} color="#10b981" />}
                </button>

                {/* Nút Xóa */}
                <button 
                  className="action-btn"
                  style={{ color: '#ef4444' }}
                  onClick={(e) => { e.stopPropagation(); if (onDelete) onDelete(doc); }}
                  title="Xóa tài liệu này"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}

            {/* NÚT REPORT: CHỈ HIỂN THỊ KHI TÀI LIỆU KHÔNG PHẢI CỦA MÌNH */}
            {!isOwner && (
              <button 
                className="action-btn" 
                style={{ color: '#ef4444' }} 
                onClick={(e) => { e.stopPropagation(); if (onReport) onReport(doc); }}
                title="Báo cáo tài liệu vi phạm"
              >
                <Flag size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentLibraryCard;