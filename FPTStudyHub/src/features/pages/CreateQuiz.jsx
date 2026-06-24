import React, { useState } from 'react';

import { ChevronRight, ArrowLeft } from 'lucide-react';

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