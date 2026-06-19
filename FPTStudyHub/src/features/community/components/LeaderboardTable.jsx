import React from 'react';

// Badge Components using custom SVG icons
const GoldMedalIcon = () => (
  <svg className="badge-svg gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" title="Top Contributor">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const SilverMedalIcon = () => (
  <svg className="badge-svg silver" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" title="Top 3 Contributor">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const BronzeMedalIcon = () => (
  <svg className="badge-svg bronze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" title="Top 5 Contributor">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const CapIcon = () => (
  <svg className="badge-svg cap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" title="Verified Mentor">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const FireIcon = () => (
  <svg className="badge-svg fire" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" title="Trending Contributor">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const RenderBadges = ({ badges }) => {
  return (
    <div className="badges-list">
      {badges.includes('gold') && <GoldMedalIcon />}
      {badges.includes('silver') && <SilverMedalIcon />}
      {badges.includes('bronze') && <BronzeMedalIcon />}
      {badges.includes('cap') && <CapIcon />}
      {badges.includes('fire') && <FireIcon />}
    </div>
  );
};

const LeaderboardRow = ({ student }) => {
  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-first';
    if (rank === 2) return 'rank-second';
    if (rank === 3) return 'rank-third';
    return 'rank-normal';
  };

  return (
    <tr className="leaderboard-row">
      <td className="rank-cell">
        <span className={`rank-number ${getRankClass(student.rank)}`}>
          {student.rank}
        </span>
      </td>
      <td className="student-cell">
        <div className="student-info-wrapper">
          <img src={student.avatar} alt={student.name} className="student-avatar" />
          <div className="student-details">
            <span className="student-name">{student.name}</span>
            <span className="student-major">{student.major}</span>
          </div>
        </div>
      </td>
      <td className="points-cell">
        <span className="points-value">{student.points}</span>
      </td>
      <td className="badges-cell">
        <RenderBadges badges={student.badges} />
      </td>
    </tr>
  );
};

const UserRankRow = ({ user }) => {
  return (
    <div className="user-rank-row-container">
      <div className="user-rank-left">
        <span className="user-rank-number">{user.rank}</span>
        <div className="user-profile">
          <div className="user-avatar-wrapper">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <span className="status-dot"></span>
          </div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-trend">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="trend-arrow">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              {user.rankTrend}
            </span>
          </div>
        </div>
      </div>
      <div className="user-rank-right">
        <div className="user-points-info">
          <span className="user-points">{user.points}</span>
          <span className="user-percentile">{user.percentile}</span>
        </div>
      </div>
    </div>
  );
};

const LeaderboardTable = ({ data }) => {
  const topStudents = data.filter(s => !s.currentUser);
  const currentUserData = data.find(s => s.currentUser);

  return (
    <div className="leaderboard-table-card">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="rank-th">Rank</th>
            <th className="student-th">Student</th>
            <th className="points-th">Points</th>
            <th className="badges-th">Badges</th>
          </tr>
        </thead>
        <tbody>
          {topStudents.map((student) => (
            <LeaderboardRow key={student.rank} student={student} />
          ))}
        </tbody>
      </table>

      {currentUserData && <UserRankRow user={currentUserData} />}
    </div>
  );
};

export default LeaderboardTable;