import React from 'react';
import { List, Search, Filter, Download, Users, BarChart2, CheckCircle } from 'lucide-react';

// Import các mảnh ghép nội bộ
import AnalyticsHeader from '../quizanalytics/components/AnalyticsHeader';
import TimeInfoCard from '../quizanalytics/components/TimeInfoCard';

import StatCard from '../questionset/components/StatCard'; 

// Import các dữ liệu tĩnh
import { ANALYTICS_TABLE_DATA, SCORE_DISTRIBUTION_DATA, HARDEST_QUESTIONS_DATA } from '../../data/quizAnalyticsData'; 
import { INITIAL_QUIZZES } from '../../data/mockQuizzes'; 

import './QuizAnalytics.css'; 

const QuizAnalyticsPage = () => {
  
  // Lấy dữ liệu của bài Quiz đầu tiên (CSD201) trong file mockQuizzes để truyền vào StatCards
  const currentQuiz = INITIAL_QUIZZES[0];

  return (
    <div className="qa-container">
      {/* 1. Header trên cùng */}
      <AnalyticsHeader />
      
      {/* 2. Card Thời Gian */}
      <TimeInfoCard />

      {/* 3. Truyền dữ liệu động từ currentQuiz vào StatCards */}
      {/* Lưu ý: Nếu StatCards cũ của bạn dùng tên biến khác, hãy đổi tên biến màu đỏ ở đây cho khớp */}
      <div className="qa-stat-cards">
        <StatCard 
          icon={Users}
          value={currentQuiz?.attempts || 0}
          label="TOTAL ATTEMPTS"
          subtext="↗ 12% Increase from last month"
          iconBg="#f3f4f6"
          iconColor="#4b5563"
        />
        <StatCard 
          icon={BarChart2}
          value={`${currentQuiz?.averageScore || 0} / 10`}
          label="AVERAGE SCORE"
          subtext={`Based on ${currentQuiz?.attempts || 0} sample data`}
          iconBg="#f3f4f6"
          iconColor="#4b5563"
        />
        <StatCard 
          icon={CheckCircle}
          value="18.2 / 20"
          label="AVERAGE CORRECT ANSWERS"
          subtext="Average accuracy 91%"
          iconBg="#f3f4f6"
          iconColor="#4b5563"
        />
      </div>

      {/* 4. Component Bảng Danh Sách Kết Quả */}
      <div className="qa-card">
        <div className="qa-card-header">
          <div className="qa-card-title">
            <List size={20} color="#b45309" />
            <h3>Results List</h3>
          </div>
          <div className="qa-card-actions">
            <div className="qa-search-box">
              <Search size={16} />
              <input type="text" placeholder="Search students..." />
            </div>
            <button className="qa-btn-outline"><Filter size={16}/> Filter data</button>
            <button className="qa-btn-outline"><Download size={16}/> Export Excel</button>
          </div>
        </div>

        <div className="qa-table-wrapper">
          <table className="qa-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>STUDENT / ID</th>
                <th>SCORE</th>
                <th>CORRECT</th>
                <th>WRONG</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              {/* Vòng lặp in dữ liệu Bảng */}
              {ANALYTICS_TABLE_DATA.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className={`qa-rank-badge rank-${row.rank}`}>{row.rank}</span>
                  </td>
                  <td>
                    <div className="qa-student-info">
                      <div className="qa-student-avatar">{row.name.substring(0, 2).toUpperCase()}</div>
                      <div className="qa-student-details">
                        <strong>{row.name}</strong>
                        <span>ID: {row.id}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="qa-score-badge">{row.score} / 10</span></td>
                  <td className="qa-text-green"><strong>{row.correct}</strong></td>
                  <td className="qa-text-red"><strong>{row.wrong}</strong></td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="qa-pagination">
          <span>Showing 1-10 of 1,248 results</span>
          <div className="qa-page-controls">
            <button>|&lt;</button>
            <button>&lt;</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span style={{ margin: '0 8px' }}>...</span>
            <button>125</button>
            <button>&gt;</button>
            <button>&gt;|</button>
          </div>
        </div>
      </div>

      {/* 5. Component Dưới cùng: Phân phối điểm số & Câu hỏi khó nhất */}
      <div className="qa-bottom-section">
        
        {/* Phân Phối Điểm Số */}
        <div className="qa-card qa-flex-1">
          <div className="qa-card-header space-between">
            <div className="qa-title-with-badge">
              <h3>Score Distribution</h3>
              <span className="qa-badge-green">↗ +4.2%</span>
            </div>
            <a href="#" className="qa-link">Details ↗</a>
          </div>

          <div className="qa-dist-table">
            <div className="qa-dist-header">
              <span>GRADE</span>
              <span>DISTRIBUTION (HEATMAP)</span>
              <span>COUNT</span>
            </div>
            
            {/* Vòng lặp in dữ liệu Phân phối */}
            {SCORE_DISTRIBUTION_DATA.map((item, idx) => (
              <div className="qa-dist-row" key={idx}>
                <span className="qa-dist-grade"><strong>{item.grade}</strong></span>
                <div className="qa-progress-bar-bg">
                  <div 
                    className="qa-progress-bar-fill" 
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  ></div>
                </div>
                <span className="qa-dist-count"><strong>{item.count}</strong> ({item.percent}%)</span>
              </div>
            ))}
          </div>

          <div className="qa-dist-footer">
            <span>Compared to previous quiz: <span className="qa-text-orange">Significant improvement in group A</span></span>
            <span className="qa-text-orange" style={{ fontSize: '16px' }}>• <span style={{fontSize: '12px', color: '#6b7280'}}>Upward trend</span></span>
          </div>
        </div>

        {/* Câu Hỏi Khó Nhất */}
        <div className="qa-card qa-flex-1">
          <div className="qa-card-header space-between">
            <h3>Hardest Questions</h3>
            <span className="qa-badge-red">NEEDS ATTENTION</span>
          </div>

          <div className="qa-hard-questions-list">
            
            {/* Vòng lặp in dữ liệu Câu hỏi khó */}
            {HARDEST_QUESTIONS_DATA.map((question, idx) => (
              <div className="qa-hq-item" key={idx}>
                <div className="qa-hq-number">{question.id}</div>
                <div className="qa-hq-content">
                  <h4>{question.title}</h4>
                  <div className="qa-hq-meta">
                    <span className="qa-text-red">Error rate: {question.wrongRate}</span>
                    <a href="#">View question</a>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizAnalyticsPage;