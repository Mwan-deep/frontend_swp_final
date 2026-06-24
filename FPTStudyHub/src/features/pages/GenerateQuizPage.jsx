import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import FilterBar from '../generate-quiz/components/FilterBar';
import QuestionTable from '../generate-quiz/components/QuestionTable';
import ManualAddCard from '../generate-quiz/components/ManualAddCard';
import AIGeneratorCard from '../generate-quiz/components/AIGeneratorCard';
import Pagination from '../../shared/components/Pagination/Pagination'; 
import EditQuestionModal from '../generate-quiz/components/EditQuestionModal'; 
import CreateQuizModal from '../generate-quiz/components/CreateQuizModal'; 
import { QUIZ_BANK_DATA } from '../../data/generate-quiz';
import { MOCK_QUIZ_DATA } from '../../data/mockQuizzes'; 
import './GenerateQuiz.css';

const GenerateQuizPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  const [activeTab, setActiveTab] = useState('manual');
  const [tableData, setTableData] = useState(QUIZ_BANK_DATA);
  
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Quản lý danh sách câu hỏi được tích chọn
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  // Hàm xử lý khi tích chọn 1 câu hỏi
  const handleSelectQuestion = (id) => {
    setSelectedQuestionIds(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  // Hàm xử lý khi tích chọn "chọn tất cả" trên cùng
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedQuestionIds(tableData.map(q => q.id));
    } else {
      setSelectedQuestionIds([]);
    }
  };

  const handleAddQuestion = (newQuestion) => {
    setTableData([newQuestion, ...tableData]);
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setTableData(tableData.filter(question => question.id !== id));
    }
  };

  const handleEditQuestion = (id) => {
    const questionToEdit = tableData.find(q => q.id === id);
    setEditingQuestion(questionToEdit);
  };

  const handleSaveModal = (updatedQuestion) => {
    setTableData(tableData.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    setEditingQuestion(null); 
  };

  // Hàm xử lý tạo Quiz sau khi điền xong Modal
  const handleFinalCreateQuiz = (quizData) => {
    // 1. CHUYỂN ĐỔI DỮ LIỆU CÂU HỎI TỪ BẢNG SANG ĐÚNG CHUẨN CỦA TRANG THI
    const formattedQuestions = tableData
      .filter(q => selectedQuestionIds.includes(q.id))
      .map((q, index) => {
        return {
          id: index + 1, // Số thứ tự câu hỏi trong bài thi (1, 2, 3...)
          text: q.content, // ĐỔI TÊN biến content thành text cho khớp
          // Bơm 4 đáp án A B C D vào để lúc vô thi không bị lỗi văng màn hình
          options: q.options && q.options.length > 0 ? q.options : ["Option A", "Option B", "Option C", "Option D"],
          correct: 0, // Mặc định cho đáp án đầu tiên là đúng
          hint: "This is an auto-generated question."
        };
      });

    // 2. GÓI VÀO QUIZ MỚI
    const newQuiz = {
      id: `QZ-${Math.floor(Math.random() * 1000) + 1000}`,
      code: 'NEW2026',
      subject: 'Custom Generated',
      difficulty: 'INTERMEDIATE',
      title: quizData.title, 
      description: quizData.description,
      source: 'Generated from Question Bank',
      questionsCount: formattedQuestions.length, 
      questions: formattedQuestions, // Đưa mảng đã chuẩn form vào đây
      attempts: 0,
      averageScore: 0,
      publishStatus: 'ready',
      createdDate: new Date().toLocaleDateString('en-GB'),
      duration: 15,
      status: 'not-started',
      accessMode: quizData.visibility, 
      password: quizData.password, 
    };

    MOCK_QUIZ_DATA.unshift(newQuiz); 
    alert("Quiz created successfully!");
    setIsCreateModalOpen(false); 
    setSelectedQuestionIds([]); // Xóa tích sau khi tạo xong
    navigate('/my-quizzes'); 
  };

  return (
    <div className="generate-quiz-container">
      <div className="gq-left-panel">
        
        <FilterBar onCreateClick={() => {
          if (selectedQuestionIds.length === 0) {
            alert("Please select at least one question to create a quiz!");
            return;
          }
          setIsCreateModalOpen(true);
        }} />
        
        <QuestionTable 
          data={tableData} 
          onDelete={handleDeleteQuestion}
          onEdit={handleEditQuestion}
          selectedIds={selectedQuestionIds}
          onSelect={handleSelectQuestion}
          onSelectAll={handleSelectAll}
        />
        
        <div style={{ marginTop: '16px' }}>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => setCurrentPage(page)} 
          />
        </div>
      </div>

      <div className="gq-right-panel">
        <div className="gq-tabs">
          <button 
            className={`gq-tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
            onClick={() => setActiveTab('manual')}
          >
            Manual Add
          </button>
          <button 
            className={`gq-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            AI Generator
          </button>
        </div>

        {activeTab === 'manual' ? (
          <ManualAddCard onSave={handleAddQuestion} />
        ) : (
          <AIGeneratorCard />
        )}
      </div>

      {editingQuestion && (
        <EditQuestionModal 
          question={editingQuestion} 
          onClose={() => setEditingQuestion(null)}
          onSave={handleSaveModal}
        />
      )}

      {isCreateModalOpen && (
        <CreateQuizModal 
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleFinalCreateQuiz}
        />
      )}
    </div>
  );
};

export default GenerateQuizPage;