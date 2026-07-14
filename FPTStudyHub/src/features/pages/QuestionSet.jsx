import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Database, Code, Briefcase, FileText, CheckCircle } from 'lucide-react';

// Import Components
import StatCard from '../questionset/components/StatCard';
import QuestionSetCard from '../questionset/components/QuestionSetCard';
import AddNewSetCard from '../questionset/components/AddNewSetCard';
import './QuestionSet.css';

// Import Axios để gọi API
import axiosClient from '../../utils/axiosClient';

const QuestionSet = () => {
  const navigate = useNavigate();

  // State quản lý dữ liệu
  const [questionSets, setQuestionSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMajor, setFilterMajor] = useState('all');

  // Gọi API lấy danh sách bộ câu hỏi khi vào trang
  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await axiosClient.get('/api/v1/question-sets');
        const setsData = response.result || response.data || response || [];
        setQuestionSets(setsData);
      } catch (error) {
        console.error("Lỗi tải danh sách Question Sets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionSets();
  }, []);

  const handleCreateNew = () => {
    navigate('/generate-quiz');
  };

  const handleCardClick = (setId) => {
    // Trỏ tới trang chi tiết dựa theo ID
    navigate(`/question-sets/${setId}`); 
  };

  const handleAddNewSet = () => {
    navigate('/create-quiz');
  };

  const getIconAndColorForSubject = (subject) => {
    const subjLower = subject?.toLowerCase() || '';
    if (subjLower.includes('it') || subjLower.includes('computer') || subjLower.includes('software')) {
      return { icon: Code, iconColor: '#2563EB', iconBg: '#DBEAFE' }; 
    }
    if (subjLower.includes('business') || subjLower.includes('eco')) {
      return { icon: Briefcase, iconColor: '#059669', iconBg: '#D1FAE5' }; 
    }
    if (subjLower.includes('data') || subjLower.includes('database')) {
      return { icon: Database, iconColor: '#D97706', iconBg: '#FEF3C7' }; 
    }
    return { icon: BookOpen, iconColor: '#6366F1', iconBg: '#E0E7FF' }; 
  };

  // Vẫn giữ lại biến đếm Active Sets cho thanh thống kê phía trên nếu bạn thấy cần
  const activeSets = questionSets.filter(set => set.status?.toLowerCase() === 'active').length;
  const totalQuestionsSum = questionSets.reduce((sum, set) => sum + (set.totalQuestions || 0), 0);

  const dynamicStats = [
    {
      id: 1,
      label: "Total Sets",
      value: questionSets.length,
      icon: FileText,
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
      subtext: "Across all subjects",
      subtextType: "info"
    },
    {
      id: 2,
      label: "Active Sets",
      value: activeSets,
      icon: CheckCircle,
      iconColor: "#059669",
      iconBg: "#D1FAE5",
      subtext: "Currently in use",
      subtextType: "success"
    },
    {
      id: 3,
      label: "Total Questions",
      value: totalQuestionsSum,
      icon: Database,
      iconColor: "#D97706",
      iconBg: "#FEF3C7",
      subtext: "Available in bank",
      subtextType: "warning"
    }
  ];

  const filteredSets = questionSets.filter(set => {
    if (filterMajor === 'all') return true;
    if (filterMajor === 'it') return set.subject?.toLowerCase().includes('it') || set.subject?.toLowerCase().includes('software');
    if (filterMajor === 'business') return set.subject?.toLowerCase().includes('business');
    return true;
  });

  if (isLoading) {
    return <div className="question-set-container"><p style={{padding: '20px'}}>Đang tải bộ câu hỏi...</p></div>;
  }

  return (
    <div className="question-set-container">
      {/* Header */}
      <div className="qs-header">
        <div className="qs-title-section">
          <h1>Question Set Management</h1>
          <p>Organize and manage shared examination resources across faculties.</p>
        </div>
        <div className="qs-actions">
          <select 
            className="qs-select" 
            value={filterMajor}
            onChange={(e) => setFilterMajor(e.target.value)}
          >
            <option value="all">All Majors</option>
            <option value="it">Info. Technology</option>
            <option value="business">Business Admin</option>
          </select>
          
          <button className="qs-btn-create" onClick={handleCreateNew}>
            <Plus size={18} />
            Create New Quizz
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="qs-stats-grid">
        {dynamicStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Cards Grid */}
      <div className="qs-cards-grid">
        {filteredSets.map((qset) => {
          const theme = getIconAndColorForSubject(qset.subject);
          
          return (
            <div key={qset.id || qset.questionSetId} onClick={() => handleCardClick(qset.id || qset.questionSetId)} style={{cursor: 'pointer'}}>
              <QuestionSetCard 
                title={qset.title || qset.name}
                subject={qset.subject}
                totalQuestions={qset.totalQuestions || 0}
                // Đã xóa 2 thuộc tính downloads và status truyền vào
                icon={theme.icon}
                iconColor={theme.iconColor}
                iconBg={theme.iconBg}
              />
            </div>
          );
        })}
        
        {/* Nút Add New */}
        <AddNewSetCard onClick={handleAddNewSet} />
      </div>
    </div>
  );
};

export default QuestionSet;