import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LandingNavbar from '../landingpages/components/LandingNavbar';
import LandingHero from '../landingpages/components/LandingHero';
import LandingFooter from '../landingpages/components/LandingFooter';
import { ArrowLeft, FileText, Clock, Target, Award, XCircle } from 'lucide-react'; // Thêm XCircle Icon
import './LandingPage.css';

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reviewedQuizData = location.state?.reviewedQuizData;

  return (
    <div className="landing-page-container">
      <LandingNavbar />
      
      {reviewedQuizData ? (
        <div style={{ padding: '80px 20px', minHeight: '75vh', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ 
            backgroundColor: 'white', padding: '40px', borderRadius: '16px', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', maxWidth: '750px', width: '100%',
            borderTop: '4px solid #f27123' 
          }}>
            <button 
              onClick={() => navigate('/learning')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', marginBottom: '32px', fontWeight: '600', fontSize: '15px' }}
            >
              <ArrowLeft size={18} /> Back to Learning Hub
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ width: '72px', height: '72px', backgroundColor: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Award size={36} color="#22C55E" />
              </div>
              <h1 style={{ fontSize: '32px', color: '#0F172A', margin: '0 0 12px 0', fontWeight: 'bold' }}>
                Assessment Records
              </h1>
              <p style={{ color: '#64748B', fontSize: '16px', margin: 0 }}>
                You have successfully completed this module. Review your performance below.
              </p>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '28px' }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ backgroundColor: '#DBEAFE', color: '#1D4ED8', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>
                  {reviewedQuizData.subject}
                </span>
                <h3 style={{ fontSize: '22px', color: '#1E293B', margin: '12px 0 8px 0' }}>{reviewedQuizData.title}</h3>
                <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>Quiz ID: {reviewedQuizData.id} • Created by: {reviewedQuizData.source}</p>
              </div>
              
              {/* BẢNG ĐIỀU KHIỂN ĐÃ ĐƯỢC CHIA THÀNH 4 CỘT */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
                
                {/* 1. Điểm số */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', color: '#f27123', marginBottom: '8px' }}>
                    <Target size={24} />
                  </div>
                  <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>Highest Score</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>
                    {reviewedQuizData.score}<span style={{fontSize: '18px', color: '#64748B'}}> pts</span>
                  </p>
                </div>
                
                {/* 2. Tổng số câu */}
                <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', color: '#3B82F6', marginBottom: '8px' }}>
                    <FileText size={24} />
                  </div>
                  <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>Total Questions</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>
                    {reviewedQuizData.questionsCount}
                  </p>
                </div>

                {/* 3. SỐ CÂU SAI (Được lấy từ Database: totalWrong) */}
                <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', color: '#EF4444', marginBottom: '8px' }}>
                    <XCircle size={24} />
                  </div>
                  <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>Incorrect</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#EF4444', margin: 0 }}>
                    {reviewedQuizData.totalWrong}
                  </p>
                </div>
                
                {/* 4. Thời gian */}
                <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', color: '#8B5CF6', marginBottom: '8px' }}>
                    <Clock size={24} />
                  </div>
                  <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>Duration</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>
                    {reviewedQuizData.duration}<span style={{fontSize: '18px', color: '#64748B'}}>m</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <LandingHero />
      )}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;