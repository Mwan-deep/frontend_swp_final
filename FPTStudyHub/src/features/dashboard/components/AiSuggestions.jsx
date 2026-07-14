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

// Đã thêm props { suggestions }
const AiSuggestions = ({ suggestions }) => {
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
        {/* Kiểm tra nếu không có data (Dù Backend của chúng ta luôn trả về list mặc định, nhưng vẫn nên check để UI không vỡ) */}
        {!suggestions || suggestions.length === 0 ? (
           <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
             <p>Đang chờ AI phân tích dữ liệu...</p>
           </div>
        ) : (
          suggestions.map((sugText, index) => (
            <SuggestionCard 
              key={index}
              badge="AI Tip" 
              title="Gợi ý cá nhân hóa" 
              desc={sugText} // Nội dung từ Gemini được nhét vào đây
              badgeClass={index % 2 === 0 ? "badge-blue" : "badge-yellow"} // Đổi màu badge xen kẽ cho đẹp mắt
            />
          ))
        )}
      </div>

      <button 
        className="refresh-btn"
        onClick={() => window.location.reload()} // Click vào đây sẽ gọi lại API reload trang
      >
        <RefreshCw size={15} />
        <span>Refresh Suggestions</span>
      </button>
    </div>
  );
};

export default AiSuggestions;