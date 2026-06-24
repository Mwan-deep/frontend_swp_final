import React, { useState, useEffect } from 'react';
import QuizFilterBar from '../learning/components/QuizFilterBar';
import QuizCard from '../learning/components/QuizCard';
import SecureQuizAuth from '../learning/components/SecureQuizAuth';
import QuizIntro from '../learning/components/QuizIntro';
import QuizTaking from '../learning/components/QuizTaking';
import QuizResults from '../learning/components/QuizResults';
import { INITIAL_QUIZZES } from "../../data/mockQuizzes";
import './Learning.css';
import Pagination from '../../shared/components/Pagination/Pagination';

const SUBJECTS_LIST = ['Computer Science', 'Software Engineering', 'Economics'];
const DIFFICULTIES_LIST = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const STATUSES_LIST = [
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'not-started', label: 'Not Started' }
];

const Learning = () => {
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  
  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Workflow Navigation states: 'dashboard' | 'auth' | 'intro' | 'taking' | 'results'
  const [view, setView] = useState('dashboard');
  const [activeQuiz, setActiveQuiz] = useState(null);

  // Active quiz taking results (to pass from taking to results screen)
  const [userAnswers, setUserAnswers] = useState({});

  // Perform search & filter
  const handleSearchFilter = () => {
    let result = quizzes;
    const query = searchQuery.trim().toLowerCase();

    if (query !== '') {
      // TRƯỜNG HỢP 2: Tìm kiếm chính xác tuyệt đối theo Mã ID (Ví dụ: QZ005)
      const exactMatch = quizzes.find(q => q.id.toLowerCase() === query);
      if (exactMatch) {
        result = [exactMatch];
      } else {
        // TRƯỜNG HỢP 1: Tìm kiếm theo từ khóa (Quét cả bài Public và Private)
        result = result.filter(q => 
          q.title.toLowerCase().includes(query) || 
          q.subject.toLowerCase().includes(query) ||
          q.source.toLowerCase().includes(query)
        );
      }
    } else {
      // TRẠNG THÁI MẶC ĐỊNH: Ẩn hoàn toàn bài Private, chỉ hiển thị bài Public
      result = result.filter(q => q.accessMode === 'public');
    }

    // Áp dụng các bộ lọc phụ (Subject, Difficulty, Status)
    if (selectedSubject !== 'All') {
      result = result.filter(q => q.subject === selectedSubject);
    }
    if (selectedDifficulty !== 'All') {
      result = result.filter(q => q.difficulty === selectedDifficulty);
    }
    if (selectedStatus !== 'All') {
      result = result.filter(q => q.status === selectedStatus);
    }

    setFilteredQuizzes(result);
  };

  // Run filter on initial mount or when selections change
  useEffect(() => {
    handleSearchFilter();
    setCurrentPage(1); // Reset về trang 1 khi lọc thay đổi
  }, [searchQuery, selectedSubject, selectedDifficulty, selectedStatus, quizzes]);

  // Submit search button trigger
  const handleSearchSubmit = (forcedQuery) => {
    if (typeof forcedQuery === 'string') {
      setSearchQuery(forcedQuery);
      setSearchInput(forcedQuery);
    } else {
      setSearchQuery(searchInput);
    }
  };

  // Handle Quiz Action click
  const handleQuizAction = (quizId, actionType) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    setActiveQuiz(quiz);

    if (quiz.accessMode === 'private') {
      setView('auth');
    } else {
      setView('intro');
    }
  };

  const handleQuizSubmit = (answers) => {
    setUserAnswers(answers);
    setView('results');
  };

  const handleQuizFinished = (finalScore) => {
    // Update quiz status in quizzes list
    const updatedQuizzes = quizzes.map(q => {
      if (q.id === activeQuiz.id) {
        return {
          ...q,
          status: 'completed',
          score: Math.max(q.score || 0, finalScore)
        };
      }
      return q;
    });
    setQuizzes(updatedQuizzes);
    setView('dashboard');
    setActiveQuiz(null);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuizzes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedQuizzes = filteredQuizzes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Render sub-views depending on current view state
  if (view === 'auth' && activeQuiz) {
    return (
      <SecureQuizAuth 
        activeQuiz={activeQuiz}
        onAuthSuccess={() => setView('intro')}
        onCancel={() => {
          setView('dashboard');
          setActiveQuiz(null);
        }}
      />
    );
  }

  if (view === 'intro' && activeQuiz) {
    return (
      <QuizIntro 
        activeQuiz={activeQuiz}
        onStartQuiz={() => setView('taking')}
        onCancel={() => {
          setView('dashboard');
          setActiveQuiz(null);
        }}
      />
    );
  }

  if (view === 'taking' && activeQuiz) {
    return (
      <QuizTaking 
        activeQuiz={activeQuiz}
        onSubmit={handleQuizSubmit}
      />
    );
  }

  if (view === 'results' && activeQuiz) {
    return (
      <QuizResults 
        activeQuiz={activeQuiz}
        userAnswers={userAnswers}
        onFinish={handleQuizFinished}
      />
    );
  }

  // --- DEFAULT VIEW: DASHBOARD SEARCH, FILTERS & CARDS GRID ---
  return (
    <div className="learning-page-wrapper">
      
      {/* 1. Page Header Block */}
      <div className="learning-header-container">
        <div className="header-text-block">
          <h1 className="learning-page-title">Knowledge Check</h1>
          <p className="learning-page-subtitle">
            Validate your learning with AI-generated and instructor-verified quizzes.
          </p>
        </div>
      </div>

      {/* 2. Filter & Search Bar Row */}
      <div className="learning-filter-bar-container">
        <QuizFilterBar 
          searchQuery={searchInput}
          setSearchQuery={setSearchInput}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          subjects={SUBJECTS_LIST}
          difficulties={DIFFICULTIES_LIST}
          statuses={STATUSES_LIST}
          quizzes={quizzes}
          onSearch={handleSearchSubmit}
        />
      </div>

      {/* 3. Quiz Grid Cards */}
      <div className="quizzes-grid-layout">
        {paginatedQuizzes.length > 0 ? (
          paginatedQuizzes.map((quiz) => (
            <QuizCard 
              key={quiz.id}
              quiz={quiz}
              onAction={handleQuizAction}
            />
          ))
        ) : (
          <div className="quizzes-empty-state">
            <h3>No quizzes match your filters.</h3>
            <p>Try clearing your search query or choosing different category dropdowns.</p>
          </div>
        )}
      </div>

      {/* 4. Pagination Component */}
      {totalPages > 1 && (
        <div className="learning-pagination-container">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

    </div>
  );
};

export default Learning;