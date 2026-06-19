import React, { useState, useEffect, useRef } from 'react';

const ChatWindow = ({ activeSession, onSendMessage, isTyping }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống cuối khi có tin nhắn mới hoặc AI đang gõ
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  if (!activeSession) {
    return (
      <div className="ai-chat-window-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-chat-icon">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <p>Select a chat session or create a new one to start studying with AI.</p>
      </div>
    );
  }

  return (
    <div className="ai-chat-window-container">
      {/* Vùng tin nhắn */}
      <div className="ai-chat-messages-area">
        {/* Nhãn thời gian hiển thị động theo giờ máy tính của bạn */}
        <div className="chat-date-separator">
          <span>Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {activeSession.messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div key={message.id} className={`chat-message-row ${isUser ? 'user-row' : 'ai-row'}`}>
              <div className={`chat-message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
                {message.text.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          );
        })}

        {/* Hoạt ảnh bong bóng gõ tin nhắn của AI */}
        {isTyping && (
          <div className="chat-message-row ai-row">
            <div className="chat-message-bubble ai-bubble typing-bubble">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Widget chuyển trang nổi */}
      <div className="ai-chat-page-switcher-floating">
        <button className="page-switch-btn" onClick={() => alert('Navigating to previous section of PDF')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="page-switch-divider"></div>
        <button className="page-switch-btn" onClick={() => alert('Navigating to next section of PDF')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Ô nhập tin nhắn */}
      <div className="ai-chat-input-area">
        <form onSubmit={handleSubmit} className="ai-chat-input-form">
          <input
            type="text"
            placeholder="Ask AI anything about this document..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" className="ai-send-btn" disabled={!inputText.trim() || isTyping}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;