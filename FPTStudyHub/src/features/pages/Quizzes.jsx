import React, { useState, useEffect } from 'react';
import {
  Archive,
  CheckCircle,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient'; 

import QuizStatsCard from '../quizzes/components/QuizStatsCard';
import QuizFilter from '../quizzes/components/QuizFilter';
import QuizTable from '../quizzes/components/QuizTable';
import './Quizzes.css';

import QuizIntro from '../learning/components/QuizIntro';
import QuizResults from '../learning/components/QuizResults';
import SecureQuizAuth from '../learning/components/SecureQuizAuth';
import QuizTaking from '../learning/components/QuizTaking';

const Quizzes = () => {
  const navigate = useNavigate();
  
  // --- STATE LƯU TRỮ DỮ LIỆU TỪ API ---
  const [quizzes, setQuizzes] = useState([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // --- STATE QUẢN LÝ TIẾN TRÌNH LUỒNG LÀM BÀI ---
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizFlowStage, setQuizFlowStage] = useState('list'); // 'list' | 'auth' | 'intro' | 'taking' | 'results'
  const [gradedResult, setGradedResult] = useState(null);

  // 1. TỰ ĐỘNG GỌI API KHI VÀO TRANG
  useEffect(() => {
    const fetchQuizzesAndStats = async () => {
      try {
        const myQuizzesRes = await axiosClient.get('/api/v1/quizzes/my-quizzes');
        
        // ĐÃ SỬA: Gọi API Bảng xếp hạng để lấy số lượt NGƯỜI KHÁC làm quiz của mình
        const leaderboardRes = await axiosClient.get('/api/v1/community/leaderboard');

        const quizzesData = myQuizzesRes.result || myQuizzesRes.data || myQuizzesRes || [];
        const leaderboardData = leaderboardRes.result || leaderboardRes.data || leaderboardRes || [];

        // Tìm số liệu thống kê của bản thân trong Bảng xếp hạng
        const myLeaderboardStats = leaderboardData.find(user => user.currentUser === true);
        const realTotalAttempts = myLeaderboardStats ? myLeaderboardStats.totalQuizAttempts : 0;

        // Ép kiểu DTO Backend về chuẩn mà Bảng (Table) đang cần
        const formattedQuizzes = quizzesData.map(q => ({
          quizId: q.quizId, 
          id: q.quizId,     
          title: q.title || "Untitled Quiz",
          code: q.visibility === 'PUBLIC' ? 'Public' : 'Private', 
          questionsCount: q.quantity || 0,
          status: 'ready', 
          visibility: q.visibility, 
          createdDate: q.createdAt ? new Date(q.createdAt).toLocaleDateString('en-GB') : 'N/A'
        }));

        setQuizzes(formattedQuizzes); 
        
        // ĐÃ SỬA: Cập nhật bằng đúng con số thực tế
        setTotalAttempts(realTotalAttempts); 

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu quiz:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzesAndStats();
  }, []);

  // 2. LỌC DỮ LIỆU THEO TỪ KHÓA VÀ TRẠNG THÁI
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = (quiz.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                          (quiz.quizId?.toString().includes(searchQuery.toLowerCase()) || false);

    const quizStatus = quiz.visibility?.toLowerCase() || 'active';
    const matchesStatus = selectedStatus === 'all' || quizStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredQuizzes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedQuizzes = filteredQuizzes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 3. TÍNH TOÁN STATS TỰ ĐỘNG
  const statsData = {
    totalQuizzes: quizzes.length,
    activeQuizzes: quizzes.filter(q => q.visibility === 'PUBLIC' || q.status === 'ACTIVE').length,
    totalAttempts: totalAttempts
  };

  // 4. KHI BẤM START: GỌI API LẤY ĐỀ THI VÀ CHUYỂN LUỒNG
  const handleStartQuiz = async (id) => {
    try {
      const response = await axiosClient.get(`/api/v1/quizzes/${id}/take`);
      const quizData = response.result || response.data || response;

      setActiveQuiz(quizData);

      if (quizData.visibility === 'PRIVATE' || quizData.password) {
        setQuizFlowStage('auth'); 
      } else {
        setQuizFlowStage('intro'); 
      }
    } catch (error) {
      console.error("Lỗi lấy đề thi:", error);
      alert("Không thể tải đề thi. Vui lòng thử lại!");
    }
  };

  const handleShowStats = (id) => {
    navigate(`/analytics/${id}`); 
  };

  const handleCreateNewQuiz = () => {
    navigate('/question-sets'); 
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

  const handleQuizSubmit = (backendResult) => {
    setGradedResult(backendResult); 
    setQuizFlowStage('results'); 
  };
  
  const handleQuizFinish = (score) => {
    setActiveQuiz(null);
    setQuizFlowStage('list');
  };

  if (quizFlowStage === 'results' && activeQuiz) {
    return (
      <QuizResults
        activeQuiz={activeQuiz}
        gradedResult={gradedResult}
        onFinish={handleQuizFinish}
        onRetake={() => handleStartQuiz(activeQuiz.quizId || activeQuiz.id)}
      />
    );
  }

  const handleToggleVisibility = async (quizId, currentVisibility) => {
    const newStatus = currentVisibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
    try {
      await axiosClient.patch(`/api/v1/quizzes/${quizId}/visibility?status=${newStatus}`);
      
      setQuizzes(prevQuizzes => prevQuizzes.map(q => {
        if (q.quizId === quizId) {
          return {
            ...q,
            visibility: newStatus,
            code: newStatus === 'PUBLIC' ? 'Public' : 'Private'
          };
        }
        return q;
      }));
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Không thể cập nhật trạng thái lúc này. Vui lòng thử lại!");
    }
  };

  if (isLoading) {
    return <div className="quizzes-dashboard-wrapper"><p style={{padding: '20px'}}>Loading exam data...</p></div>;
  }

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
        gradedResult={gradedResult}
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
          value={statsData.totalQuizzes}
          label="Total Quizzes"
          iconBg="#fef3c7"
          iconColor="#d97706"
        />
        <QuizStatsCard
          icon={CheckCircle}
          badgeText="Public"
          badgeType="success"
          value={statsData.activeQuizzes}
          label="Public Quizzes" 
          iconBg="#dcfce7"
          iconColor="#15803d"
        />
        <QuizStatsCard
          icon={Users}
          badgeText="This Semester"
          badgeType="default"
          value={statsData.totalAttempts}
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
          onToggleVisibility={handleToggleVisibility}
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
