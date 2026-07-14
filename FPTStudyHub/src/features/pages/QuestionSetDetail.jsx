import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Database, FileText } from 'lucide-react';
import axiosClient from '../../utils/axiosClient';
import './QuestionSetDetail.css';

const QuestionSetDetail = () => {
  const { id } = useParams(); // Lấy ID của bộ câu hỏi từ URL
  const navigate = useNavigate();

  const [documentDetail, setDocumentDetail] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetailAndQuestions = async () => {
      setIsLoading(true);
      try {
        // Lấy danh sách tất cả câu hỏi, sau đó lọc ra những câu thuộc documentId này
        const qRes = await axiosClient.get('/api/v1/question-sets/questions');
        const allQuestions = qRes.result || qRes.data || qRes || [];
        
        // Lọc câu hỏi theo ID tài liệu
        const filteredQuestions = allQuestions.filter(q => 
          q.documentId?.toString() === id || q.docId?.toString() === id
        );
        
        setQuestions(filteredQuestions);

        // Lấy thông tin Tên và Môn học của tài liệu (Từ câu hỏi đầu tiên)
        if (filteredQuestions.length > 0) {
          setDocumentDetail({
            title: filteredQuestions[0].documentTitle || 'Tài liệu không tên',
            subject: 'Lấy từ câu hỏi' // Bạn có thể gọi thêm API chi tiết QuestionSet nếu có
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết tài liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDetailAndQuestions();
  }, [id]);

  // Hàm chuyển hướng sang trang AI Generator với tài liệu được chọn sẵn
  const handleGoToAIGenerator = () => {
    navigate('/create-quiz', { state: { preSelectedDocId: id } });
  };

  if (isLoading) {
    return <div className="qsd-container">Đang tải dữ liệu chi tiết...</div>;
  }

  return (
    <div className="qsd-container">
      {/* Breadcrumb */}
      <div className="qsd-breadcrumb">
        <span className="qsd-breadcrumb-link" onClick={() => navigate('/question-sets')}>
          Question Sets
        </span>
        <ChevronRight size={14} />
        <span>Document Detail</span>
      </div>

      {/* Header Info */}
      <div className="qsd-header-card">
        <div className="qsd-title-group">
          <h1>{documentDetail?.title || `Document ID: ${id}`}</h1>
          <div className="qsd-meta">
            <span className="qsd-badge">{documentDetail?.subject || 'General'}</span>
            <span className="qsd-stat-text">
              <Database size={16} color="#6b7280" /> 
              {questions.length} Questions
            </span>
          </div>
        </div>
        <div className="qsd-actions">
          <button className="qsd-btn-ai" onClick={handleGoToAIGenerator}>
            <Sparkles size={16} />
            Generate Quiz with AI
          </button>
        </div>
      </div>

      {/* Questions Table */}
      <div className="qsd-content-card">
        <div className="qsd-content-header">
          <FileText size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px', color: '#b45309' }}/>
          Questions List
        </div>
        
        <div className="qsd-table-wrapper">
          <table className="qsd-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Question Content</th>
                <th style={{ width: '120px' }}>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {questions.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '40px' }}>
                    Tài liệu này chưa có câu hỏi nào.
                  </td>
                </tr>
              ) : (
                questions.map((q, index) => (
                  <tr key={q.questionId || index}>
                    <td style={{ color: '#6b7280' }}>#{q.questionId || q.id}</td>
                    <td>
                      <div className="qsd-question-content">
                        {q.questionText || q.content}
                      </div>
                      {/* Tạm thời hiển thị gạch đầu dòng nếu có options (cần API trả về options để hiện đẹp hơn) */}
                    </td>
                    <td>
                      <span className="qsd-badge" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
                        {q.difficulty || 'Medium'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionSetDetail;