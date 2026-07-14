import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';

import DocumentSelector from '../createquiz/components/DocumentSelector';
import QuizConfigurator from '../createquiz/components/QuizConfigurator';
import RecentQuizzesGrid from '../createquiz/components/RecentQuizzesGrid';
import './CreateQuiz.css';

const CreateQuiz = ({ onBack }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const docRes = await axiosClient.get('/api/v1/question-sets');
        const docsData = docRes.result || docRes.data || docRes || [];
        
        const formattedDocs = docsData.map(doc => ({
          id: doc.id,
          name: doc.title,
          major: doc.subject,
          course: `ID: ${doc.id}`, 
          uploadDate: doc.status
        }));
        
        setDocuments(formattedDocs);
        
        if (location.state && location.state.preSelectedDocId) {
          setSelectedDocId(location.state.preSelectedDocId);
        } else if (formattedDocs.length > 0) {
          setSelectedDocId(formattedDocs[0].id);
        }

        const quizRes = await axiosClient.get('/api/v1/quizzes/my-quizzes');
        const quizzesData = quizRes.result || quizRes.data || quizRes || [];
        
        const formattedRecent = quizzesData.slice(0, 3).map(q => ({
          id: q.quizId,
          title: q.title || 'Untitled Quiz',
          status: q.visibility === 'PUBLIC' ? 'ready' : 'processing', 
          questionsCount: q.quantity || 0,
          timeAgo: q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'
        }));

        setRecentQuizzes(formattedRecent); 
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchInitialData();
  }, [location.state]); 

  const handleBack = () => {
    if (onBack) onBack();
    else navigate('/question-sets'); 
  };

  const handleConfigSubmit = async (formData) => {
    if (!selectedDocId) {
      alert("Vui lòng chọn một tài liệu (Document) trước!");
      return;
    }

    setIsGenerating(true); 

    try {
      // 1. Gọi API nhờ AI sinh câu hỏi từ MaterialContext
      const genResponse = await axiosClient.post(
        `/api/v1/quizzes/generate-questions?materialId=${selectedDocId}&quantity=${formData.quantity}`
      );
      
      const generatedQuestions = genResponse.result || genResponse.data || genResponse;
      
      if (!Array.isArray(generatedQuestions)) {
        alert("Lỗi: Không thể sinh câu hỏi. Vui lòng kiểm tra lại tài liệu!");
        setIsGenerating(false);
        return; 
      }
      
      // 2. ĐÚNG Ý BẠN: Thông báo thành công và điều hướng về trang Question Sets
      alert("AI đã phân tích và lưu câu hỏi vào hệ thống thành công!");
      navigate('/question-sets'); 

    } catch (error) {
      console.error("Lỗi quá trình tạo Quiz:", error);
      alert("Có lỗi xảy ra khi AI sinh đề thi. Vui lòng thử lại!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="create-quiz-page-wrapper">
      <div className="create-quiz-breadcrumbs">
        <span className="breadcrumb-item link" onClick={handleBack}>Question Sets</span>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-item active">AI Generator</span>
      </div>

      <div className="create-quiz-columns">
        <DocumentSelector
          documents={documents}
          selectedDocId={selectedDocId}
          onSelectDoc={setSelectedDocId}
        />

        <QuizConfigurator
          onSubmit={handleConfigSubmit}
          isGenerating={isGenerating}
        />
      </div>

      <RecentQuizzesGrid
        recentQuizzes={recentQuizzes}
        onViewAll={handleBack}
      />
    </div>
  );
};

export default CreateQuiz;