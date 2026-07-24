import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Eye, Heart, Share2, FileText } from 'lucide-react';
import './DocumentLibrary.css';

const DocumentDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [isLiked, setIsLiked] = useState(false);
  
  const apiCalled = useRef(false);

  useEffect(() => {
    if (apiCalled.current) return;

    const fetchDocumentDetail = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        // ĐÃ SỬA: Trỏ API về máy chủ Render
        const response = await fetch(`https://backend-swp-final.onrender.com/api/v1/documents/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setMaterial(data);
        } else {
          alert("Không tìm thấy tài liệu hoặc bạn không có quyền truy cập!");
          navigate('/documents'); 
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết tài liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentDetail();

    return () => {
      apiCalled.current = true;
    };
  }, [id, navigate]);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const token = localStorage.getItem('token');
      
      // ĐÃ SỬA: Trỏ API tải file về máy chủ Render
      const response = await fetch(`https://backend-swp-final.onrender.com/api/v1/documents/download/${id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Không thể tải file lúc này!');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', material.fileName || 'tai_lieu');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setMaterial(prev => ({ ...prev, downloadCount: prev.downloadCount + 1 }));

    } catch (error) {
      alert(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareClick = () => {
    const docUrl = window.location.href;
    navigator.clipboard.writeText(docUrl);
    alert('Đã copy link tài liệu vào Clipboard: ' + docUrl);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  if (isLoading) {
    return (
      <div className="loading-state" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h3>Đang tải thông tin chi tiết tài liệu...</h3>
      </div>
    );
  }

  if (!material) return null;

  const googleDrivePreviewUrl = `https://drive.google.com/file/d/${material.fileUrl}/preview`;

  return (
    <div className="doc-detail-container" style={{ padding: '2rem', maxWidth: '1300px', margin: '0 auto' }}>
      
      <button 
        onClick={() => navigate(-1)} 
        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer', marginBottom: '24px', fontWeight: '600', fontSize: '0.95rem' }}
      >
        <ArrowLeft size={18} /> Quay lại thư viện
      </button>

      <div className="doc-detail-header" style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '20px', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '700', marginBottom: '12px', color: '#111827', lineHeight: '1.3' }}>
          {material.title}
        </h1>
        
        <div style={{ display: 'flex', gap: '24px', color: '#4B5563', fontSize: '0.95rem', flexWrap: 'wrap' }}>
          <span><strong>Người đăng:</strong> {material.account?.userName || 'Anonymous'}</span>
          <span><strong>Môn học:</strong> {material.subject?.subjectName || 'N/A'}</span>
          <span><strong>Kỳ học:</strong> {material.semester?.semesterName} {material.semester?.year}</span>
          <span><strong>Ngày đăng:</strong> {new Date(material.createdAt).toLocaleDateString('vi-VN')}</span>
        </div>
      </div>

      <div className="doc-detail-layout" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        
        <div className="doc-main-content" style={{ flex: '3', minWidth: '350px' }}>
          <div className="doc-preview-card" style={{ width: '100%', height: '700px', backgroundColor: '#F3F4F6', borderRadius: '12px', overflow: 'hidden', border: '1px solid #D1D5DB', marginBottom: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            {material.fileUrl ? (
              <iframe 
                src={googleDrivePreviewUrl} 
                width="100%" 
                height="100%" 
                allow="autoplay"
                style={{ border: 'none' }}
                title={material.title}
              ></iframe>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9CA3AF' }}>
                <FileText size={56} />
                <p style={{ marginTop: '12px', fontWeight: '500' }}>Không tìm thấy mã tệp dữ liệu để hiển thị bản xem trước</p>
              </div>
            )}
          </div>

          <div className="doc-description-box" style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#1F2937', marginBottom: '12px', fontWeight: '600' }}>Mô tả tài liệu</h3>
            <p style={{ lineHeight: '1.7', color: '#4B5563', whiteSpace: 'pre-wrap', fontSize: '1rem' }}>
              {material.description || 'Không có nội dung mô tả chi tiết cho tài liệu này.'}
            </p>
          </div>
        </div>

        <div className="doc-sidebar-content" style={{ flex: '1', minWidth: '280px', height: 'fit-content' }}>
          <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', position: 'sticky', top: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: '#374151', fontSize: '0.95rem', fontWeight: '500' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={20} color="#4F46E5" /> 
                <span><strong style={{ fontSize: '1.1rem', color: '#111827' }}>{material.viewCount}</strong> lượt xem</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={20} color="#10B981" /> 
                <span><strong style={{ fontSize: '1.1rem', color: '#111827' }}>{material.downloadCount}</strong> lượt tải</span>
              </div>
            </div>

            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              style={{ width: '100%', padding: '14px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: isDownloading ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '1rem', boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)', transition: 'background-color 0.2s' }}
            >
              <Download size={20} /> 
              {isDownloading ? 'Đang khởi tạo tệp...' : 'Tải tài liệu xuống'}
            </button>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button 
                onClick={handleLikeClick}
                style={{ flex: 1, padding: '10px', border: '1px solid #D1D5DB', borderRadius: '8px', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', cursor: 'pointer', color: isLiked ? '#ff4b4b' : '#374151', fontWeight: '600', fontSize: '0.9rem' }}
              >
                <Heart size={18} fill={isLiked ? "#ff4b4b" : "none"} color={isLiked ? "#ff4b4b" : "currentColor"} /> 
                {isLiked ? 'Đã lưu' : 'Lưu lại'}
              </button>
              
              <button 
                onClick={handleShareClick}
                style={{ flex: 1, padding: '10px', border: '1px solid #D1D5DB', borderRadius: '8px', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#374151', fontWeight: '600', fontSize: '0.9rem' }}
              >
                <Share2 size={18} /> Chia sẻ
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DocumentDetail;
