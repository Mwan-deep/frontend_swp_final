import React from 'react';

const PointsGuideCard = () => {
  const guides = [
    {
      text: "1 Document View = 1 Point",
      desc: "Upload high-quality documents",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    },
    {
      text: "1 Download = 2 Points",
      desc: "Help others by sharing useful files",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    },
    {
      text: "1 Quiz Attempt = 3 Points",
      desc: "Create engaging quizzes for others",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      )
    },
    {
      text: "Set visibility to PUBLIC",
      desc: "Private files/quizzes are not ranked",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    }
  ];

  return (
    <div className="community-card points-guide-card">
      <h3 className="card-section-title">HOW TO RANK UP</h3>
      
      <div className="guide-list">
        {guides.map((item, index) => (
          <div className="guide-item" key={index} style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div className="guide-icon-box" style={{ marginTop: '2px' }}>{item.icon}</div>
            <div className="guide-text" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '600', color: '#1E293B' }}>{item.text}</span>
              <span style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="view-guidelines-btn">
        View Ranking Rules
      </button>
    </div>
  );
};

export default PointsGuideCard;