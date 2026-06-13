import React from 'react';
import { Calendar, MoreHorizontal } from 'lucide-react';
import './Dashboard.css';

// Import chính xác các component con từ thư mục '../dashboard/components/'
import StatCard from '../dashboard/components/StatCard';
import ProgressCard from '../dashboard/components/ProgressCard';
import ActivityList from '../dashboard/components/ActivityList';
import AiSuggestions from '../dashboard/components/AiSuggestions';

// Import dữ liệu dashboardStats từ mockDocuments
import { dashboardStats } from "../../data/mockDocuments";

const Dashboard = () => {
  const formattedDate = "October 24, 2023";

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>Welcome back, <span className="highlight">Alex</span>!</h1>
          <p>Ready to study and make progress today?</p>
        </div>
        <div className="welcome-date">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Render danh sách chỉ số động bằng cách map qua dashboardStats */}
        {dashboardStats.map((item, index) => (
          <StatCard 
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
            iconBgClass={item.iconBgClass}
          />
        ))}
        {/* Component Tiến độ Học tập */}
        <ProgressCard value="75%" label="Learning Progress" />
      </div>

      {/* Grid Đồ thị & Hoạt động */}
      <div className="dashboard-main-content">
        <div className="dashboard-left-column">
          
          {/* Đồ thị Tuần */}
          <div className="dashboard-card weekly-activity-card">
            <div className="card-header">
              <h2>Weekly Study Activity</h2>
              <button className="card-menu-btn" aria-label="More options">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="chart-container">
              <svg viewBox="0 0 600 200" className="activity-svg">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f27123" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#f27123" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>

                <g className="grid-lines">
                  <line x1="40" y1="10" x2="580" y2="10" />
                  <line x1="40" y1="50" x2="580" y2="50" />
                  <line x1="40" y1="90" x2="580" y2="90" />
                  <line x1="40" y1="130" x2="580" y2="130" />
                  <line x1="40" y1="170" x2="580" y2="170" />
                </g>

                <g className="y-axis-labels">
                  <text x="15" y="15">4h</text>
                  <text x="15" y="55">3h</text>
                  <text x="15" y="95">2h</text>
                  <text x="15" y="135">1h</text>
                  <text x="15" y="175">0</text>
                </g>

                <path 
                  d="M 40,138 C 90,120 100,82 130,82 C 160,82 190,105 220,98 C 250,90 280,122 310,122 C 340,122 370,22 400,22 C 430,22 460,130 490,130 C 520,130 550,30 580,30 L 580,170 L 40,170 Z" 
                  fill="url(#chartGradient)"
                />

                <path 
                  d="M 40,138 C 90,120 100,82 130,82 C 160,82 190,105 220,98 C 250,90 280,122 310,122 C 340,122 370,22 400,22 C 430,22 460,130 490,130 C 520,130 550,30 580,30" 
                  fill="none" 
                  stroke="#f27123" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />

                <circle cx="400" cy="22" r="5" fill="#f27123" stroke="#ffffff" strokeWidth="2" />
                <circle cx="580" cy="30" r="5" fill="#f27123" stroke="#ffffff" strokeWidth="2" />
              </svg>

              <div className="x-axis-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          <div className="bottom-charts-row">
            {/* Đồ thị Cột Tháng */}
            <div className="dashboard-card monthly-uploads-card">
              <div className="card-header">
                <h2>Monthly Uploads</h2>
                <span className="growth-badge">+12%</span>
              </div>

              <div className="bar-chart-container">
                <div className="bars-wrapper">
                  <div className="bar-column">
                    <div className="bar-track"><div className="bar-fill bg-blue" style={{ height: '35%' }}></div></div>
                    <span className="bar-label">ư 1</span>
                  </div>
                  <div className="bar-column">
                    <div className="bar-track"><div className="bar-fill bg-blue" style={{ height: '55%' }}></div></div>
                    <span className="bar-label">ư 2</span>
                  </div>
                  <div className="bar-column">
                    <div className="bar-track"><div className="bar-fill bg-blue" style={{ height: '25%' }}></div></div>
                    <span className="bar-label">ư 3</span>
                  </div>
                  <div className="bar-column">
                    <div className="bar-track"><div className="bar-fill bg-orange" style={{ height: '80%' }}></div></div>
                    <span className="bar-label">ư 4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Danh sách Hoạt động */}
            <ActivityList />
          </div>
        </div>

        {/* Component Gợi ý AI */}
        <AiSuggestions />
      </div>
    </div>
  );
};

export default Dashboard;