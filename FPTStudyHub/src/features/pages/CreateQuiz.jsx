import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DocumentSelector from '../createquiz/components/DocumentSelector';
import QuizConfigurator from '../createquiz/components/QuizConfigurator';
import RecentQuizzesGrid from '../createquiz/components/RecentQuizzesGrid';
import './CreateQuiz.css';

// Import đúng các biến có sẵn trong file dữ liệu của bạn
import { MOCK_DOCUMENTS, MOCK_QUIZ_DATA } from "../../data/mockQuizzes";

const CreateQuiz = ({ onBack }) => {
  const navigate = useNavigate();
  const [selectedDocId, setSelectedDocId] = useState("doc2");

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/my-quizzes');
    }
  };

  const handleConfigSubmit = (formData) => {
    const selectedDoc = MOCK_DOCUMENTS.find(doc => doc.id === selectedDocId);
    if (!selectedDoc) {
      alert("Please select a document first!");
      return;
    }

    // Chuyển hướng sang trang Generate Quiz mới
    navigate('/generate-quiz');
  };

  return (
    <div className="create-quiz-page-wrapper">
      <div className="create-quiz-breadcrumbs">
        <span className="breadcrumb-item link" onClick={handleBack}>Dashboard</span>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-item active">Create Quiz</span>
      </div>

      <div className="create-quiz-columns">
        <DocumentSelector 
          documents={MOCK_DOCUMENTS}
          selectedDocId={selectedDocId}
          onSelectDoc={setSelectedDocId}
        />

        <QuizConfigurator 
          onSubmit={handleConfigSubmit}
        />
      </div>

      {/* Truyền MOCK_QUIZ_DATA vào thay vì MOCK_RECENT_QUIZZES */}
      <RecentQuizzesGrid 
        recentQuizzes={MOCK_QUIZ_DATA}
        onViewAll={handleBack}
      />
    </div>
  );
};

export default CreateQuiz;