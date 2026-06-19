import React, { useState } from 'react';
import TimeFilter from '../community/components/TimeFilter';
import LeaderboardTable  from '../community/components/LeaderboardTable';
import MonthlyRewardCard from '../community/components/MonthlyRewardCard';
import PointsGuideCard from '../community/components/PointsGuideCard';
import './Community.css';

import {Community_data} from "../../data/mockDocuments";

const Community = () => {
  const [activeFilter, setActiveFilter] = useState('monthly');

  return (
    <div className="community-page-container">
      {/* Header section with Title and Filters */}
      <div className="community-header">
        <div className="header-text">
          <h1 className="community-title">Leaderboard</h1>
          <p className="community-subtitle">Top contributors in the FPT Study Hub community.</p>
        </div>
        <TimeFilter activeFilter={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Main content grid */}
      <div className="community-main-grid">
        {/* Left Side: Leaderboard Table Card */}
        <div className="leaderboard-section">
          <LeaderboardTable data={Community_data[activeFilter]} />
        </div>

        {/* Right Side: Cards */}
        <div className="cards-section">
          <MonthlyRewardCard />
          <PointsGuideCard />
        </div>
      </div>
    </div>
  );
};

export default Community;