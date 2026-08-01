import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List, Search, Filter, Download, Users, BarChart2, CheckCircle } from 'lucide-react';
import axiosClient from '../../utils/axiosClient';

import AnalyticsHeader from '../quizanalytics/components/AnalyticsHeader';
import TimeInfoCard from '../quizanalytics/components/TimeInfoCard';
import StatCard from '../questionset/components/StatCard'; 

import './QuizAnalytics.css'; 

const QuizAnalyticsPage = () => {
  // GET QUIZ ID FROM THE URL
  const { id } = useParams(); 
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA FROM BACKEND
  useEffect(() => {
    // IF NO ID IN URL -> Stop loading and exit
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get(`/api/v1/quizzes/${id}/analytics`);
        setData(response.result || response.data || response);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [id]);

  if (isLoading) return <div style={{padding: '50px', textAlign: 'center'}}>Loading system analytics data...</div>;
  if (!data) return <div style={{padding: '50px', textAlign: 'center'}}>No analytics data found for this Quiz.</div>;

  return (
    <div className="qa-container">
      {/* 1. Header (With actual Quiz title) */}
      <AnalyticsHeader title={data.title} />
      
      {/* 2. Time Card */}
      <TimeInfoCard createdAt={data.createdAt} />

      {/* 3. Pass dynamic data to StatCards */}
      <div className="qa-stat-cards">
        <StatCard 
          icon={Users}
          value={data.totalAttempts}
          label="TOTAL ATTEMPTS"
          subtext="Successful submissions"
          iconBg="#f3f4f6" iconColor="#4b5563"
        />
        <StatCard 
          icon={BarChart2}
          value={`${data.averageScore} / 10`}
          label="AVERAGE SCORE"
          subtext={`Based on ${data.totalAttempts} submissions`}
          iconBg="#f3f4f6" iconColor="#4b5563"
        />
        <StatCard 
          icon={CheckCircle}
          value={`${data.averageCorrect} / ${data.totalQuestions}`}
          label="AVERAGE CORRECT ANSWERS"
          subtext={`Accuracy ~ ${Math.round((data.averageCorrect / data.totalQuestions) * 100 || 0)}%`}
          iconBg="#f3f4f6" iconColor="#4b5563"
        />
      </div>

      {/* 4. ACTUAL Results List Table Component */}
      <div className="qa-card">
        <div className="qa-card-header">
          <div className="qa-card-title">
            <List size={20} color="#b45309" />
            <h3>Results List</h3>
          </div>
          <div className="qa-card-actions">
            <div className="qa-search-box">
              <Search size={16} /><input type="text" placeholder="Search students..." />
            </div>
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
              </tr>
            </thead>
            <tbody>
              {data.resultsTable && data.resultsTable.length > 0 ? (
                data.resultsTable.map((row, idx) => (
                  <tr key={idx}>
                    <td><span className={`qa-rank-badge rank-${row.rank}`}>{row.rank}</span></td>
                    <td>
                      <div className="qa-student-info">
                        <div className="qa-student-avatar">{row.name.substring(0, 2).toUpperCase()}</div>
                        <div className="qa-student-details">
                          <strong>{row.name}</strong><span>ID: {row.accountId}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="qa-score-badge">{row.score} / 10</span></td>
                    <td className="qa-text-green"><strong>{row.correct}</strong></td>
                    <td className="qa-text-red"><strong>{row.wrong}</strong></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={{textAlign:'center', padding: '20px'}}>No one has taken this quiz yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Score Distribution */}
      <div className="qa-bottom-section">
        <div className="qa-card qa-flex-1">
          <div className="qa-card-header space-between">
            <div className="qa-title-with-badge">
              <h3>Score Distribution</h3>
            </div>
          </div>
          <div className="qa-dist-table">
            <div className="qa-dist-header">
              <span>GRADE</span><span>DISTRIBUTION (HEATMAP)</span><span>COUNT</span>
            </div>
            {data.scoreDistribution.map((item, idx) => (
              <div className="qa-dist-row" key={idx}>
                <span className="qa-dist-grade" style={{width: '130px'}}><strong>{item.grade}</strong></span>
                <div className="qa-progress-bar-bg">
                  <div className="qa-progress-bar-fill" style={{ width: `${item.percent}%`, backgroundColor: item.color }}></div>
                </div>
                <span className="qa-dist-count" style={{width: '80px', textAlign: 'right'}}><strong>{item.count}</strong> ({item.percent}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="qa-card qa-flex-1">
          <div className="qa-card-header space-between">
            <h3>Hardest Questions</h3>
            <span className="qa-badge-red">NEEDS ATTENTION</span>
          </div>
          <div className="qa-hard-questions-list">
            {data.hardestQuestions.map((q, idx) => (
              <div className="qa-hq-item" key={idx}>
                <div className="qa-hq-number">{q.id}</div>
                <div className="qa-hq-content">
                  <h4>{q.title}</h4>
                  <div className="qa-hq-meta">
                    <span className="qa-text-red">Error rate: {q.wrongRate}</span>
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
