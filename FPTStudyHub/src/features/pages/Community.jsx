import React, { useState, useEffect } from 'react';
import TimeFilter from '../community/components/TimeFilter';
import LeaderboardTable  from '../community/components/LeaderboardTable';
import MonthlyRewardCard from '../community/components/MonthlyRewardCard';
import PointsGuideCard from '../community/components/PointsGuideCard';
import './Community.css';
import axiosClient from '../../utils/axiosClient'; // Dùng axios để gọi API

const Community = () => {
  const [activeFilter, setActiveFilter] = useState('monthly');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gọi API mỗi khi activeFilter thay đổi
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get(`/api/v1/community/leaderboard?filter=${activeFilter}`);
        const data = response.result || response.data || response || [];
        setLeaderboardData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi tải bảng xếp hạng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeFilter]);

  return (
    <div className="community-page-container">
      <div className="community-header">
        <div className="header-text">
          <h1 className="community-title">Leaderboard</h1>
          <p className="community-subtitle">Top contributors recognized by document views & downloads.</p>
        </div>
        <TimeFilter activeFilter={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="community-main-grid">
        <div className="leaderboard-section">
          {isLoading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Đang tính toán thứ hạng...</div>
          ) : (
            <LeaderboardTable data={leaderboardData} />
          )}
        </div>

        <div className="cards-section">
          <MonthlyRewardCard />
          <PointsGuideCard />
        </div>
      </div>
    </div>
  );
};

export default Community;