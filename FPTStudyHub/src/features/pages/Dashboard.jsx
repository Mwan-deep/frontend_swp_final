import React, { useState, useEffect } from 'react';
import { Calendar, MoreHorizontal, FileText, Clock, TrendingUp } from 'lucide-react';
import './Dashboard.css';

import StatCard from '../dashboard/components/StatCard';
import ProgressCard from '../dashboard/components/ProgressCard';
import ActivityList from '../dashboard/components/ActivityList';
import AiSuggestions from '../dashboard/components/AiSuggestions';

import axiosClient from '../../utils/axiosClient';
import { parseJwt } from '../../service/authService';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Student");

  // Format ngày tháng hiện tại (VD: October 24, 2023)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
    
  }).format(new Date());

  useEffect(() => {
    // 1. Lấy tên user từ Token
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload?.name) setUserName(payload.name);
      else if (payload?.sub) setUserName(payload.sub.split('@')[0]);
    }

    // 2. Gọi API lấy dữ liệu Dashboard (Backend tự động lấy ID qua SecurityContext)
    const fetchDashboardData = async () => {
      try {
        const response = await axiosClient.get(`/api/v1/dashboard/summary`);
        setData(response.result);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-container"><p style={{ padding: '20px' }}>Loading data...</p></div>;
  }

  // --- HÀM TÍNH TOÁN ĐỘ THỊ ĐƯỜNG (SVG LINE CHART) TỰ ĐỘNG ---
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Trục Y của SVG chạy từ 10 (Max) đến 170 (Min)
  const MAX_MINUTES = 240;

  const points = daysOfWeek.map((day, index) => {
    const minutes = data?.weeklyActivity?.[day] || 0;
    const y = 170 - (Math.min(minutes, MAX_MINUTES) / MAX_MINUTES) * 160;
    return { x: 40 + index * 90, y: y };
  });

  // Tạo chuỗi tọa độ nét cong mượt (Bezier Curve)
  let linePath = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    linePath += ` C ${cx},${prev.y} ${cx},${curr.y} ${curr.x},${curr.y}`;
  }

  const fillPath = `${linePath} L 580,170 L 40,170 Z`;

  // --- HÀM TÍNH TOÁN BIỂU ĐỒ CỘT (BAR CHART) TỰ ĐỘNG ---
  const uploads = data?.monthlyUploadsPerWeek || [0, 0, 0, 0];
  const maxUpload = Math.max(...uploads, 1);

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>Welcome back, <span className="highlight">{userName}</span>!</h1>
          <p>Ready to study and make progress today?</p>
        </div>
        <div className="welcome-date">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={FileText}
          value={data?.totalDocuments || 0}
          label="Total Documents"
          iconBgClass="bg-orange-light"
        />
        <StatCard
          icon={Clock}
          value={`${Math.floor((data?.totalStudyMinutes || 0) / 60)}h ${(data?.totalStudyMinutes || 0) % 60}m`}
          label="Study Time"
          iconBgClass="bg-blue-light"
        />
        <StatCard
          icon={TrendingUp}
          value={`${data?.monthlyGrowthPercentage || 0}%`}
          label="Monthly Growth"
          iconBgClass="bg-green-light"
        />
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
                    <stop offset="0%" stopColor="#f27123" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f27123" stopOpacity="0.0" />
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

                <path d={fillPath} fill="url(#chartGradient)" />

                <path
                  d={linePath}
                  fill="none"
                  stroke="#f27123"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {points.map((point, index) => (
                  <circle key={index} cx={point.x} cy={point.y} r="5" fill="#f27123" stroke="#ffffff" strokeWidth="2" />
                ))}
              </svg>

              <div className="x-axis-labels">
                {daysOfWeek.map(day => <span key={day}>{day}</span>)}
              </div>
            </div>
          </div>

          <div className="bottom-charts-row">
            {/* Đồ thị Cột Tháng */}
            <div className="dashboard-card monthly-uploads-card">
              <div className="card-header">
                <h2>Monthly Uploads</h2>
                <span className="growth-badge">+{data?.monthlyGrowthPercentage || 0}%</span>
              </div>

              <div className="bar-chart-container">
                <div className="bars-wrapper">
                  {uploads.map((val, index) => (
                    <div className="bar-column" key={index}>
                      <div className="bar-track">
                        <div
                          className={`bar-fill ${index === 3 ? 'bg-orange' : 'bg-blue'}`}
                          style={{ height: `${(val / maxUpload) * 100}%` }}>
                        </div>
                      </div>
                      <span className="bar-label">Week {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Component Danh sách Hoạt động */}
            <ActivityList activities={data?.recentActivities || []} />
          </div>
        </div>

        {/* Component Gợi ý AI */}
        <AiSuggestions suggestions={data?.aiSuggestions || []} />
      </div>
    </div>
  );
};

export default Dashboard;