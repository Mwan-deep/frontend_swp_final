import React from 'react';

const PointsGuideCard = () => {
  const guides = [
    {
      text: "Upload verified study materials",
      points: "+50",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      )
    },
    {
      text: "Answer forum questions",
      points: "+20",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      text: "Generate AI study guides",
      points: "+10",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      text: "Receive upvotes on resources",
      points: "+5",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      )
    }
  ];

  return (
    <div className="community-card points-guide-card">
      <h3 className="card-section-title">HOW TO EARN POINTS</h3>
      
      <div className="guide-list">
        {guides.map((item, index) => (
          <div className="guide-item" key={index}>
            <div className="guide-icon-box">{item.icon}</div>
            <div className="guide-text">
              {item.text} <span className="points-highlight">({item.points})</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="view-guidelines-btn">
        View Full Guidelines
      </button>
    </div>
  );
};

export default PointsGuideCard;