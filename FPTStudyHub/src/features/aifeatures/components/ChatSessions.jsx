import React from 'react';

const ChatSessions = ({ sessions, activeSessionId, onSelectSession, onNewChat }) => {
  // Nhóm các session theo thời gian
  const todaySessions = sessions.filter(s => s.category === 'today');
  const pastSessions = sessions.filter(s => s.category === 'past');

  return (
    <div className="ai-chat-sessions-sidebar">
      {/* Nút Tạo Chat mới */}
      <button className="ai-new-chat-btn" onClick={onNewChat}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>New Chat</span>
      </button>

      {/* Hôm nay */}
      <div className="session-group">
        <h4 className="session-group-title">TODAY</h4>
        <div className="session-items-list">
          {todaySessions.map((session) => (
            <button
              key={session.id}
              className={`session-item-btn ${activeSessionId === session.id ? 'active' : ''}`}
              onClick={() => onSelectSession(session.id)}
            >
              <svg className="session-item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="session-item-title-text">{session.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 7 ngày qua */}
      <div className="session-group">
        <h4 className="session-group-title">PREVIOUS 7 DAYS</h4>
        <div className="session-items-list">
          {pastSessions.map((session) => (
            <button
              key={session.id}
              className={`session-item-btn ${activeSessionId === session.id ? 'active' : ''}`}
              onClick={() => onSelectSession(session.id)}
            >
              <svg className="session-item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="session-item-title-text">{session.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSessions;