import React, { useState } from 'react';
import { 
  Archive, 
  CheckCircle, 
  Users, 
  Plus, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để điều hướng trang
import QuizStatsCard from '../quizzes/components/QuizStatsCard';
import QuizFilter from '../quizzes/components/QuizFilter';
import QuizTable from '../quizzes/components/QuizTable';
import './Quizzes.css';


import QuizIntro from '../learning/components/QuizIntro';
import QuizResults from '../learning/components/QuizResults';
import SecureQuizAuth from '../learning/components/SecureQuizAuth';
import QuizTaking from '../learning/components/QuizTaking';


import { INITIAL_QUIZZES } from "../../data/mockQuizzes";

const MOCK_STATS_DATA = {
  totalQuizzes: INITIAL_QUIZZES?.length || 0,
  activeQuizzes: INITIAL_QUIZZES?.filter(q => q.status === 'active' || q.status === 'running').length || 0,
  totalAttempts: 142
};

const Quizzes = () => {
  const navigate = useNavigate(); // Khởi tạo hook navigate
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // --- THÊM STATE QUẢN LÝ TIẾN TRÌNH LUỒNG LÀM BÀI ---
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizFlowStage, setQuizFlowStage] = useState('list'); // 'list' | 'auth' | 'intro' | 'taking' | 'results'
  const [userAnswers, setUserAnswers] = useState({});

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = (quiz.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) || 
                          (quiz.code?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    const quizPublishStatus = quiz.publishStatus || quiz.status;
    const matchesStatus = selectedStatus === 'all' || quizPublishStatus === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredQuizzes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedQuizzes = filteredQuizzes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // --- KHI BẤM START BẮT ĐẦU LÀM BÀI THI ---
  const handleStartQuiz = (id) => {
    const quiz = quizzes.find(q => q.id === id);
    if (!quiz) return;

    // Chuẩn bị câu hỏi và cấu hình (để dự phòng nếu quiz chưa khai báo câu hỏi sẵn)
    const quizWithQuestions = {
      ...quiz,
      questions: quiz.questions || [
        {
          id: 1,
          text: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correct: 1
        },
        {
          id: 2,
          text: "Which of the following data structures works on the Last In First Out (LIFO) principle?",
          options: ["Queue", "Stack", "Tree", "Graph"],
          correct: 1
        }
      ],
      duration: quiz.duration || 15,
      password: quiz.password || "1234"
    };

    setActiveQuiz(quizWithQuestions);

    // Kiểm tra xem đề thi là Private (yêu cầu pass) hay Public
    if (quiz.accessMode === 'private' || quiz.password) {
      setQuizFlowStage('auth'); // Chuyển sang màn hình nhập password
    } else {
      setQuizFlowStage('intro'); // Chuyển trực tiếp sang màn hình Intro giới thiệu
    }
  };

  const handleShowStats = (id) => {
    alert(`Viewing statistics for quiz ID: ${id}`);
  };

  const handleCreateNewQuiz = () => {
    navigate('/create-quiz'); // Thực hiện điều hướng sang trang tạo quiz mới
  };

  // --- CÁC HÀM XỬ LÝ CHUYỂN TIẾP TRẠNG THÁI THI ---
  const handleAuthSuccess = () => {
    setQuizFlowStage('intro');
  };

  const handleCancelFlow = () => {
    setActiveQuiz(null);
    setQuizFlowStage('list');
  };

  const handleStartQuestions = () => {
    setQuizFlowStage('taking');
  };

  const handleQuizSubmit = (answers) => {
    setUserAnswers(answers);
    setQuizFlowStage('results');
  };

  const handleQuizFinish = (score) => {
    // Cập nhật điểm thi và đánh dấu hoàn thành cục bộ
    const updatedQuizzes = quizzes.map(q => 
      q.id === activeQuiz.id 
        ? { ...q, status: 'completed', score: score } 
        : q
    );
    setQuizzes(updatedQuizzes);
    setActiveQuiz(null);
    setQuizFlowStage('list');
  };

  // --- HIỂN THỊ CÁC MÀN HÌNH THEO TIẾN TRÌNH LUỒNG LÀM BÀI ---
  if (quizFlowStage === 'auth' && activeQuiz) {
    return (
      <SecureQuizAuth 
        activeQuiz={activeQuiz} 
        onAuthSuccess={handleAuthSuccess} 
        onCancel={handleCancelFlow} 
      />
    );
  }

  if (quizFlowStage === 'intro' && activeQuiz) {
    return (
      <QuizIntro 
        activeQuiz={activeQuiz} 
        onStartQuiz={handleStartQuestions} 
        onCancel={handleCancelFlow} 
      />
    );
  }

  if (quizFlowStage === 'taking' && activeQuiz) {
    return (
      <QuizTaking 
        activeQuiz={activeQuiz} 
        onSubmit={handleQuizSubmit} 
      />
    );
  }

  if (quizFlowStage === 'results' && activeQuiz) {
    return (
      <QuizResults 
        activeQuiz={activeQuiz} 
        userAnswers={userAnswers} 
        onFinish={handleQuizFinish} 
      />
    );
  }

  return (
    <div className="quizzes-dashboard-wrapper">
      <div className="quizzes-header-row">
        <div className="header-text-group">
          <h1 className="quizzes-page-title">Quiz Management</h1>
          <p className="quizzes-page-subtitle">
            Manage, create, and analyze AI-generated quizzes.
          </p>
        </div>
        <button className="btn-create-quiz" onClick={handleCreateNewQuiz}>
          <Plus size={18} />
          Create Quiz
        </button>
      </div>

      <div className="quizzes-stats-grid">
        <QuizStatsCard
          icon={Archive}
          badgeText="+12%"
          badgeType="success"
          value={MOCK_STATS_DATA.totalQuizzes}
          label="Total Quizzes"
          iconBg="#fef3c7"
          iconColor="#d97706"
        />
        <QuizStatsCard
          icon={CheckCircle}
          badgeText="Running"
          badgeType="success"
          value={MOCK_STATS_DATA.activeQuizzes}
          label="Active Quizzes"
          iconBg="#dcfce7"
          iconColor="#15803d"
        />
        <QuizStatsCard
          icon={Users}
          badgeText="This Semester"
          badgeType="default"
          value={MOCK_STATS_DATA.totalAttempts}
          label="Total Attempts"
          iconBg="#ffedd5"
          iconColor="#ea580c"
        />
      </div>

      <div className="quizzes-table-card">
        <QuizFilter
          searchQuery={searchQuery}
          setSearchQuery={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          selectedStatus={selectedStatus}
          setSelectedStatus={(val) => {
            setSelectedStatus(val);
            setCurrentPage(1);
          }}
        />

        <QuizTable
          quizzes={paginatedQuizzes}
          onStart={handleStartQuiz}
          onStats={handleShowStats}
        />

        <div className="quizzes-table-footer">
          <div className="footer-record-count">
            Showing {filteredQuizzes.length > 0 ? startIndex + 1 : 0}-
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredQuizzes.length)} of {filteredQuizzes.length} quizzes
          </div>
          {totalPages > 1 && (
            <div className="quizzes-pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn page-num-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;