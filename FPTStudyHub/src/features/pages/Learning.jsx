import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import QuizFilterBar from '../learning/components/QuizFilterBar';
import QuizCard from '../learning/components/QuizCard';
import SecureQuizAuth from '../learning/components/SecureQuizAuth';
import QuizIntro from '../learning/components/QuizIntro';
import QuizTaking from '../learning/components/QuizTaking';
import QuizResults from '../learning/components/QuizResults';
import './Learning.css';
import Pagination from '../../shared/components/Pagination/Pagination';

import axiosClient from '../../utils/axiosClient';

const STATUSES_LIST = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

const Learning = () => {
  const navigate = useNavigate(); 
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [dynamicCreators, setDynamicCreators] = useState(['All']);
  const [selectedCreator, setSelectedCreator] = useState('All');

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Đã xóa state selectedSubject
  
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;
  const [view, setView] = useState('dashboard');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [pendingActionType, setPendingActionType] = useState('take');

  useEffect(() => {
    const fetchLearningData = async () => {
      setIsLoading(true);
      try {
        const publicRes = await axiosClient.get('/api/v1/quizzes/all');
        const myQuizzesRes = await axiosClient.get('/api/v1/quizzes/my-quizzes');
        const historyRes = await axiosClient.get('/api/v1/quizzes/history');

        const extractData = (res) => Array.isArray(res) ? res : (res?.result || res?.data || res || []);

        const publicQuizzes = extractData(publicRes);
        const myQuizzes = extractData(myQuizzesRes);
        const historyAttempts = extractData(historyRes);

        const quizMap = new Map();

        publicQuizzes.forEach(q => {
          quizMap.set(q.quizId, {
            id: q.quizId.toString(),
            quizId: q.quizId,
            title: q.title || 'Untitled Quiz',
            subject: q.subject ? q.subject.trim() : 'General', 
            source: q.account?.userName || 'Community', 
            questionsCount: q.quantity || 0,
            duration: q.duration || 15,
            status: 'not-started', 
            score: 0,
            totalWrong: 0,
            completedQuestions: 0,
            accessMode: 'public',
            password: q.password || ''
          });
        });

        myQuizzes.forEach(q => {
          if (!quizMap.has(q.quizId)) {
            quizMap.set(q.quizId, {
              id: q.quizId.toString(),
              quizId: q.quizId,
              title: q.title || 'Untitled Quiz',
              subject: q.subject ? q.subject.trim() : 'General', 
              source: 'Me',
              questionsCount: q.quantity || 0,
              duration: q.duration || 15,
              status: 'not-started', 
              score: 0,
              totalWrong: 0,
              completedQuestions: 0,
              accessMode: q.visibility?.toLowerCase() === 'public' ? 'public' : 'private',
              password: q.password || ''
            });
          } else {
            const existingQuiz = quizMap.get(q.quizId);
            existingQuiz.source = 'Me';
          }
        });

        historyAttempts.sort((a, b) => {
          if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return 1;
          if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') return -1;
          return 0;
        }).forEach(attempt => {
          const qId = attempt.quizId;
          if (quizMap.has(qId)) {
            const existingQuiz = quizMap.get(qId);
            
            if (attempt.status === 'IN_PROGRESS') {
                existingQuiz.status = 'in-progress';
                try {
                   existingQuiz.draftAnswers = attempt.savedAnswers ? JSON.parse(attempt.savedAnswers) : {};
                   existingQuiz.completedQuestions = Object.keys(existingQuiz.draftAnswers).length;
                } catch(e) { console.error("Lỗi parse JSON:", e) }
            } else {
                existingQuiz.status = 'completed';
                existingQuiz.score = Math.max(existingQuiz.score || 0, attempt.score || 0);
                existingQuiz.totalWrong = attempt.totalWrong || 0;
            }
          }
        });

        const finalQuizzes = Array.from(quizMap.values());
        setQuizzes(finalQuizzes);
        
        finalQuizzes.forEach(q => {
          if (q.status !== 'completed') {
            const draft = localStorage.getItem(`quiz_draft_${q.quizId}`);
            if (draft) {
              q.status = 'in-progress';
              q.completedQuestions = Object.keys(JSON.parse(draft)).length;
            }
          }
        });

        setQuizzes(finalQuizzes);
        
        setDynamicCreators(['All', ...new Set(finalQuizzes.map(q => q.source))].filter(Boolean));
        // Đã xóa setDynamicSubjects
      } catch (error) {
        console.error("Lỗi tải data Learning:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLearningData();
  }, []);

  const handleSearchFilter = () => {
    let result = quizzes;
    const query = searchQuery.trim().toLowerCase();
    
    // Gộp tìm kiếm: Tên, ID, Tên môn học (subject) và Tên người tạo
    if (query !== '') {
      result = result.filter(q => 
        (q.title && q.title.toLowerCase().includes(query)) || 
        (q.id && q.id.toLowerCase().includes(query)) ||
        (q.subject && q.subject.toLowerCase().includes(query)) ||
        (q.source && q.source.toLowerCase().includes(query))
      );
    }
    
    if (selectedCreator && selectedCreator !== 'All') {
      result = result.filter(q => q.source && q.source.toLowerCase() === selectedCreator.toLowerCase());
    }
    
    if (selectedStatus && selectedStatus !== 'All') {
      result = result.filter(q => q.status === selectedStatus);
    }
    
    setFilteredQuizzes(result);
  };

  useEffect(() => {
    handleSearchFilter();
    setCurrentPage(1); 
  // Đã xóa selectedSubject khỏi dependency array
  }, [searchQuery, selectedCreator, selectedStatus, quizzes]); 

  const handleSearchSubmit = (forcedQuery) => {
    setSearchQuery(typeof forcedQuery === 'string' ? forcedQuery : searchInput);
    if (typeof forcedQuery === 'string') setSearchInput(forcedQuery);
  };

  const handleQuizAction = async (quizId, actionType) => {
    const targetQuiz = quizzes.find(q => q.id === quizId?.toString() || q.quizId === quizId);
    
    if (actionType === 'review') {
      navigate('/', { state: { reviewedQuizData: targetQuiz } });
      return;
    }

    setPendingActionType(actionType);
    try {
      const response = await axiosClient.get(`/api/v1/quizzes/${quizId}/take`);
      const activeQuizData = { ...targetQuiz, ...(response.result || response.data || response) };
      setActiveQuiz(activeQuizData);

      if (activeQuizData.accessMode === 'private' || activeQuizData.visibility === 'PRIVATE') {
        setView('auth');
      } else {
        setView(actionType === 'resume' ? 'taking' : 'intro');
      }
    } catch (error) {
      alert("Không thể mở bài thi lúc này, vui lòng thử lại.");
    }
  };

  const handleQuizSubmit = (gradedResult) => {
    setUserAnswers(gradedResult);
    setView('results');
  };

  const handleQuizFinished = (finalScore) => {
    setQuizzes(quizzes.map(q => {
      if (q.id === activeQuiz.id?.toString() || q.quizId === activeQuiz.quizId) {
        return { ...q, status: 'completed', score: Math.max(q.score || 0, finalScore) };
      }
      return q;
    }));
    setView('dashboard');
    setActiveQuiz(null);
  };

  const totalPages = Math.ceil(filteredQuizzes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedQuizzes = filteredQuizzes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (view === 'auth' && activeQuiz) {
    return <SecureQuizAuth activeQuiz={activeQuiz} onAuthSuccess={() => setView(pendingActionType === 'resume' ? 'taking' : 'intro')} onCancel={() => { setView('dashboard'); setActiveQuiz(null); }} />;
  }
  if (view === 'intro' && activeQuiz) {
    return <QuizIntro activeQuiz={activeQuiz} onStartQuiz={() => setView('taking')} onCancel={() => { setView('dashboard'); setActiveQuiz(null); }} />;
  }
  if (view === 'taking' && activeQuiz) {
    return <QuizTaking activeQuiz={activeQuiz} onSubmit={handleQuizSubmit} />;
  }
  if (view === 'results' && activeQuiz) {
    return <QuizResults 
             activeQuiz={activeQuiz} 
             gradedResult={userAnswers} 
             onFinish={handleQuizFinished} 
             onRetake={() => handleQuizAction(activeQuiz.quizId || activeQuiz.id, 'take')} 
           />;
  }

  return (
    <div className="learning-page-wrapper">
      <div className="learning-header-container">
        <div className="header-text-block">
          <h1 className="learning-page-title">Knowledge Check</h1>
          <p className="learning-page-subtitle">Validate your learning with AI-generated and instructor-verified quizzes.</p>
        </div>
      </div>
      <div className="learning-filter-bar-container">
        <QuizFilterBar 
          searchQuery={searchInput} setSearchQuery={setSearchInput}
          selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
          selectedCreator={selectedCreator} setSelectedCreator={setSelectedCreator}
          creators={dynamicCreators.filter(c => c !== 'All')}
          statuses={STATUSES_LIST}
          quizzes={quizzes} onSearch={handleSearchSubmit}
        />
      </div>
      <div className="quizzes-grid-layout">
        {isLoading ? (
          <div style={{ textAlign: 'center', width: '100%', padding: '40px', color: '#64748B' }}>Loading Exam Data...</div>
        ) : paginatedQuizzes.length > 0 ? (
          paginatedQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} onAction={handleQuizAction} />)
        ) : (
          <div className="quizzes-empty-state">
            <h3>No quizzes match your filters.</h3>
            <p>Try clearing your search query or choosing different category dropdowns.</p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="learning-pagination-container">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
        </div>
      )}
    </div>
  );
};
export default Learning;
