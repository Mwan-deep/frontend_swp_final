import React from 'react';

const MonthlyRewardCard = () => {
  return (
    <div className="community-card monthly-reward-card">
      <h3 className="card-title">Monthly Reward</h3>
      <p className="card-subtitle">
        Top 3 students win a 1-on-1 mentorship session with an industry expert.
      </p>
      
      <div className="reward-badge-container">
        <div className="reward-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="gift-icon">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M12 11V2" />
            <path d="M12 2a3 3 0 0 0-3 3c0 2 3 6 3 6s3-4 3-6a3 3 0 0 0-3-3z" />
          </svg>
        </div>
        <div className="reward-info">
          <div className="reward-title">Mentorship Pass</div>
          <div className="reward-expiry">Ends in 4 days</div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRewardCard;