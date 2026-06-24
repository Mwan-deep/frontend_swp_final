import React from 'react';
import { ArrowLeft, Calendar, Building2, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnalyticsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="qa-header">
      <div className="qa-header-left">
        <button className="qa-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="qa-title">Detailed Quiz Analytics</h1>
      </div>
      
      <div className="qa-header-right">
        <div className="qa-filter">
          <Calendar size={16} />
          <select><option>Last 30 Days</option></select>
        </div>
        <div className="qa-filter">
          <Building2 size={16} />
          <select><option>All Departments</option></select>
        </div>
        <button className="qa-back-btn" style={{border: 'none'}}>
          <Bell size={20} color="#4b5563" />
        </button>
        <img src="https://i.pravatar.cc/150?img=11" alt="User" className="qa-avatar" />
      </div>
    </div>
  );
};

export default AnalyticsHeader;