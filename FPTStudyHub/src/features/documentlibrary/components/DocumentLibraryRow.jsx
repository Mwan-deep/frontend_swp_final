import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';

const DocumentLibraryRow = ({ doc, onMarkAsRead }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const getFileExtension = (fileName) => {
    if (!fileName) return 'DOC';
    return fileName.split('.').pop().toUpperCase();
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return 'N/A';
    return new Date(dateInput).toLocaleDateString('vi-VN');
  };

  const handleRowClick = () => {
    if (onMarkAsRead) {
      onMarkAsRead(doc.materialId);
    }
  };

  // Logic tải file tương tự như Card
  const handleDownloadClick = async (e) => {
    e.stopPropagation(); // Không kích hoạt sự kiện click của toàn bộ hàng
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/v1/documents/download/${doc.materialId}`, {
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

  return (
    <div className="list-row-item clickable" onClick={handleRowClick}>
      <div className="list-left-info">
        <span className="list-format-tag">{getFileExtension(doc.fileName)}</span>
        <div>
          <h4>{doc.title}</h4>
          <p>By {doc.account?.userName || 'Anonymous'} • {formatDate(doc.createdAt)}</p>
        </div>
      </div>
      <div className="list-right-stats">
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Eye size={16} /> <span>{doc.viewCount || 0}</span>
        </div>
        
        {/* Nút download có thể click trực tiếp từ Row */}
        <div 
          className="download-btn-row" 
          onClick={handleDownloadClick}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}
        >
          <Download size={16} /> 
          <span>{isDownloading ? 'Đang tải...' : (doc.downloadCount || 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentLibraryRow;