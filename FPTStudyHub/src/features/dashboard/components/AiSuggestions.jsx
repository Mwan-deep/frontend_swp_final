import React from 'react';
import { Sparkles, Bookmark, RefreshCw } from 'lucide-react';

const SuggestionCard = ({ badge, title, desc, badgeClass }) => {
  return (
    <div className="suggestion-card">
      <div className="suggestion-header">
        <span className={`suggestion-badge ${badgeClass}`}>{badge}</span>
        <button className="bookmark-btn" aria-label="Bookmark suggestion">
          <Bookmark size={16} />
        </button>
      </div>
      <h3 className="suggestion-title">{title}</h3>
      <p className="suggestion-desc">{desc}</p>
    </div>
  );
};

const AiSuggestions = () => {
  const suggestions = [
    { badge: "Document", title: "Advanced Neural Networks Guide", desc: "A comprehensive overview of deep learning architectures...", badgeClass: "badge-blue" },
    { badge: "Quiz Prep", title: "Practice: Binary Trees", desc: "Generate a quick 10-question quiz based on the Data Structures...", badgeClass: "badge-yellow" }
  ];

  return (
    <div className="ai-suggestions-sidebar">
      <div className="sidebar-header">
        <div className="sparkles-icon">
          <Sparkles size={20} fill="#ffffff" color="#ffffff" />
        </div>
        <div className="header-text">
          <h2>AI Suggested</h2>
          <p>Based on your recent activity</p>
        </div>
      </div>

      <div className="suggestions-list">
        {suggestions.map((sug, index) => (
          <SuggestionCard 
            key={index}
            badge={sug.badge}
            title={sug.title}
            desc={sug.desc}
            badgeClass={sug.badgeClass}
          />
        ))}
      </div>

      <button 
        className="refresh-btn"
        onClick={() => alert('Refreshing AI study suggestions...')}
      >
        <RefreshCw size={15} />

        <span>Refresh Suggestions</span>
      </button>
    </div>
  );
};

export default AiSuggestions;