import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react'; // Import thêm ArrowLeft icon
import { useNavigate } from 'react-router-dom';
import DocumentSelector from '../createquiz/components/DocumentSelector';
import QuizConfigurator from '../createquiz/components/QuizConfigurator';
import RecentQuizzesGrid from '../createquiz/components/RecentQuizzesGrid';
import './CreateQuiz.css';

import { MOCK_DOCUMENTS } from "../../data/mockQuizzes";

const MOCK_RECENT_QUIZZES = [
  {
    id: "rec1",
    title: "CSD201 - Quiz 1: Tree Structures",
    status: "ready",
    questionsCount: 20,
    timeAgo: "2 days ago"
  },
  {
    id: "rec2",
    title: "ENW201 - Final Revision Unit 1-5",
    status: "processing",
    questionsCount: null,
    timeAgo: "5 minutes ago"
  },
  {
    id: "rec3",
    title: "MAI201 - Mock Exam: Probability",
    status: "failed",
    questionsCount: null,
    timeAgo: "1 day ago"
  }
];

const CreateQuiz = ({ onBack }) => {
  const navigate = useNavigate();
  const [selectedDocId, setSelectedDocId] = useState("doc2"); // default selected CSD201

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/my-quizzes'); // Quay về trang quản lý /my-quizzes
    }
  };

  const handleConfigSubmit = (formData) => {
    const selectedDoc = MOCK_DOCUMENTS.find(doc => doc.id === selectedDocId);
    if (!selectedDoc) {
      alert("Please select a document first!");
      return;
    }

    alert(
      `AI is generating a quiz!\n` +
      `- Document: ${selectedDoc.name}\n` +
      `- Questions: ${formData.questionsCount}\n` +
      `- Difficulty: ${formData.difficulty}\n` +
      `- Time Limit: ${formData.startDate || 'N/A'} to ${formData.endDate || 'N/A'}\n` +
      `- Prompt Hint: ${formData.customPrompt || 'None'}`
    );
    handleBack();
  };

  return (
    <div className="create-quiz-page-wrapper">
      {/* 1. Breadcrumbs */}
      <div className="create-quiz-breadcrumbs">
        <span className="breadcrumb-item link" onClick={handleBack}>Dashboard</span>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-item active">Create Quiz</span>
      </div>

     

      {/* 3. Columns Section */}
      <div className="create-quiz-columns">
        {/* Left Side: Select Document */}
        <DocumentSelector 
          documents={MOCK_DOCUMENTS}
          selectedDocId={selectedDocId}
          onSelectDoc={setSelectedDocId}
        />

        {/* Right Side: Quiz Configurator */}
        <QuizConfigurator 
          onSubmit={handleConfigSubmit}
        />
      </div>

      {/* 4. Recent Quizzes Grid Section */}
      <RecentQuizzesGrid 
        recentQuizzes={MOCK_RECENT_QUIZZES}
        onViewAll={handleBack}
      />
    </div>
  );
};

export default CreateQuiz;