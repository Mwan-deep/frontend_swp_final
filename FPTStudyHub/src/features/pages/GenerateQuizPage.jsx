import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axiosClient from '../../utils/axiosClient';
import { Search, Plus } from 'lucide-react'; 

import QuestionTable from '../generate-quiz/components/QuestionTable';
import ManualAddCard from '../generate-quiz/components/ManualAddCard';
import Pagination from '../../shared/components/Pagination/Pagination'; 
import EditQuestionModal from '../generate-quiz/components/EditQuestionModal'; 
import CreateQuizModal from '../generate-quiz/components/CreateQuizModal'; 
import './GenerateQuiz.css';

const GenerateQuizPage = () => {
  const navigate = useNavigate();

  const [allQuestions, setAllQuestions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const docRes = await axiosClient.get('/api/v1/question-sets');
        const docsData = docRes.result || docRes.data || docRes || [];
        setDocuments(docsData);

        const qRes = await axiosClient.get('/api/v1/question-sets/questions');
        const questionsData = qRes.result || qRes.data || qRes || [];

        const formattedQuestions = questionsData.map(q => ({
          id: q.questionId || q.id,
          content: q.questionText || q.content,
          subject: q.documentTitle || "General", 
          docId: q.documentId || q.docId, 
          created: q.createdAt ? new Date(q.createdAt).toLocaleDateString('en-GB') : 'N/A'
        }));

        setAllQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const filteredQuestions = allQuestions.filter(q => {
    const matchesSearch = q.content?.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesDoc = selectedDocId === 'all' || q.docId?.toString() === selectedDocId?.toString();
    return matchesSearch && matchesDoc;
  });

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredQuestions.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectQuestion = (id) => {
    setSelectedQuestionIds(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedQuestionIds(filteredQuestions.map(q => q.id));
    } else {
      setSelectedQuestionIds([]);
    }
  };

  const handleAddQuestion = (newQuestion) => {
    const formatted = {
      id: newQuestion.questionId || newQuestion.id,
      content: newQuestion.questionText || newQuestion.content,
      subject: newQuestion.documentTitle || "Manual Input",
      docId: "all",
      created: new Date().toLocaleDateString('en-GB')
    };
    setAllQuestions([formatted, ...allQuestions]);
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setAllQuestions(allQuestions.filter(question => question.id !== id));
      setSelectedQuestionIds(selectedQuestionIds.filter(qId => qId !== id));
    }
  };

  const handleEditQuestion = (id) => {
    const questionToEdit = allQuestions.find(q => q.id === id);
    setEditingQuestion(questionToEdit);
  };

  const handleSaveModal = (updatedQuestion) => {
    setAllQuestions(allQuestions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    setEditingQuestion(null); 
  };

  const handleFinalCreateQuiz = async (modalData) => {
    if (selectedQuestionIds.length === 0) {
      alert("Please select at least 1 question!");
      return;
    }

    try {
      const payload = {
        title: modalData.title,
        description: modalData.description,
        durationMinutes: 15,
        passScore: 50,
        visibility: modalData.visibility.toUpperCase(),
        questionIds: selectedQuestionIds 
      };

      await axiosClient.post('/api/v1/quizzes/create', payload);

      alert("Great! The quiz has been saved to the system.");
      setIsCreateModalOpen(false); 
      setSelectedQuestionIds([]); 
      
      navigate('/question-sets'); 

    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to save the quiz. Please check your connection!");
    }
  };

  return (
    <div className="generate-quiz-container">
      
      <div className="gq-left-panel">
        
        {/* CLEANED TOOLBAR USING CSS CLASSES */}
        <div className="gq-top-toolbar">
          <div className="gq-toolbar-filters">
            
            <select 
              className="gq-doc-select"
              value={selectedDocId}
              onChange={(e) => {
                setSelectedDocId(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">📚 All Documents</option>
              {documents.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.title}</option>
              ))}
            </select>

            <div className="gq-search-box">
              <Search size={18} className="gq-search-icon" />
              <input 
                type="text" 
                className="gq-search-input"
                placeholder="Search question content..." 
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <button 
            className="gq-btn-create-quiz"
            onClick={() => {
              if (selectedQuestionIds.length === 0) {
                alert("You haven't selected any questions. Please check the questions first!");
                return;
              }
              setIsCreateModalOpen(true);
            }}
          >
            <Plus size={18} />
            CREATE QUIZ ({selectedQuestionIds.length})
          </button>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '10px 0', minHeight: '60vh' }}>
          {isLoading ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading question list...</p>
          ) : (
            <>
              <QuestionTable 
                data={paginatedData} 
                onDelete={handleDeleteQuestion}
                onEdit={handleEditQuestion}
                selectedIds={selectedQuestionIds}
                onSelect={handleSelectQuestion}
                onSelectAll={handleSelectAll}
              />
              <div style={{ marginTop: '16px', padding: '0 20px' }}>
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={(page) => setCurrentPage(page)} 
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - ONLY MANUAL ADD NOW */}
      <div className="gq-right-panel">
        <ManualAddCard onSaveSuccess={handleAddQuestion} />
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
