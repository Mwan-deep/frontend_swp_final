import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../utils/axiosClient';

const ChatWindow = ({ activeSession, onSendMessage, isTyping, onSelectMaterial, chatMode, setChatMode, onNewChat }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const [materials, setMaterials] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ĐÃ SỬA: Gọi đúng API lấy toàn bộ tài liệu (Public + Private của bản thân)
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        // ĐÃ ĐỔI THÀNH /api/v1/documents ĐỂ KHỚP VỚI BACKEND
        const response = await axiosClient.get('/api/v1/documents'); 
        
        // Trích xuất dữ liệu từ response
        let data = response.result || response.data || response;
        if (!Array.isArray(data)) data = [];
        setMaterials(data);
      } catch (error) {
        console.error("Lỗi tải danh sách tài liệu:", error);
      }
    };
    fetchMaterials();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleSwitchMode = (mode) => {
    if (chatMode === mode) return;
    setChatMode(mode);
    onNewChat();
  };

  if (!activeSession) return null;

  const selectedMaterial = materials.find(m => (m.materialId || m.id) === activeSession.materialId);
  
  const filteredMaterials = materials.filter(m => 
    (m.title || 'Tài liệu không tên').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ai-chat-window-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* KHU VỰC TABS CHUYỂN ĐỔI CHẾ ĐỘ */}
      <div style={{ display: 'flex', borderBottom: '1px solid #eaebf0', marginBottom: '16px' }}>
        <button 
          onClick={() => handleSwitchMode('GENERAL')}
          style={{ flex: 1, padding: '16px', background: 'none', border: 'none', borderBottom: chatMode === 'GENERAL' ? '2px solid #ea8c42' : '2px solid transparent', color: chatMode === 'GENERAL' ? '#ea8c42' : '#667085', fontWeight: chatMode === 'GENERAL' ? '600' : '500', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          General System Chat
        </button>
        <button 
          onClick={() => handleSwitchMode('DOCUMENT')}
          style={{ flex: 1, padding: '16px', background: 'none', border: 'none', borderBottom: chatMode === 'DOCUMENT' ? '2px solid #ea8c42' : '2px solid transparent', color: chatMode === 'DOCUMENT' ? '#ea8c42' : '#667085', fontWeight: chatMode === 'DOCUMENT' ? '600' : '500', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Chat According to Document
        </button>
      </div>

      {/* VÙNG TIN NHẮN */}
      <div className="ai-chat-messages-area" style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        {activeSession.messages.length === 0 ? (
          
          <div className="ai-chat-window-empty" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#667085' }}>
            {chatMode === 'GENERAL' ? (
              <>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ea8c42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-chat-icon mb-16">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3 style={{ margin: '16px 0 8px 0', color: '#101828' }}>System Q&A</h3>
                <p style={{ margin: 0, fontSize: '14px', textAlign: 'center' }}>Enter your question, and the AI ​​will automatically scan the entire document.<br/>to find the answer for you.</p>
              </>
            ) : (
              <>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-chat-icon mb-16">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3 style={{ margin: '16px 0 8px 0', color: '#101828' }}>Chat with a specific document.</h3>
                <p style={{ margin: 0, fontSize: '14px', textAlign: 'center', marginBottom: '16px' }}>Please click on the icon 📎 attached below<br/>to choose a document before you begin.</p>
                
                {!activeSession.materialId && (
                  <button onClick={() => setShowDropdown(true)} style={{ padding: '10px 20px', backgroundColor: '#eef2ff', color: '#4f46e5', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                    Choose Document
                  </button>
                )}
              </>
            )}
          </div>

        ) : (
          <>
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

            {isTyping && (
              <div className="chat-message-row ai-row">
                <div className="chat-message-bubble ai-bubble typing-bubble">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* KHU VỰC NHẬP TIN NHẮN */}
      <div className="ai-chat-input-area" style={{ position: 'relative', marginTop: '16px' }}>
        
        {chatMode === 'DOCUMENT' && activeSession.materialId && (
          <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: '500', marginBottom: '8px', border: '1px solid #c7d2fe' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
            {selectedMaterial?.title || 'Đang đính kèm tài liệu'}
            <button onClick={() => onSelectMaterial(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px', color: '#4f46e5', display: 'flex' }} title="Gỡ đính kèm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="ai-chat-input-form" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {chatMode === 'DOCUMENT' && (
            <div className="attachment-dropdown-container" ref={dropdownRef} style={{ position: 'relative' }}>
              <button 
                type="button" className="ai-attach-btn" onClick={() => setShowDropdown(!showDropdown)} disabled={isTyping}
                style={{ background: 'none', border: 'none', color: '#667085', cursor: 'pointer', padding: '8px', borderRadius: '8px', display: 'flex' }}
                title="Đính kèm tài liệu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </button>

              {showDropdown && (
                <div className="attachment-dropdown-menu" style={{ position: 'absolute', bottom: '100%', left: '0', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #eaebf0', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '320px', zIndex: 100 }}>
                  <div style={{ padding: '12px', borderBottom: '1px solid #eaebf0' }}>
                    <div style={{ fontWeight: '600', fontSize: '13px', color: '#344054', marginBottom: '8px' }}>Select attachments</div>
                    <div style={{ position: 'relative' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '10px', top: '9px' }}>
                        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <input 
                        type="text" placeholder="Tìm kiếm tài liệu..." 
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '6px 10px 6px 30px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {filteredMaterials.length === 0 ? (
                      <div style={{ padding: '16px', textAlign: 'center', color: '#667085', fontSize: '13px' }}>Không tìm thấy tài liệu phù hợp.</div>
                    ) : (
                      <ul style={{ listStyle: 'none', margin: 0, padding: '4px' }}>
                        {filteredMaterials.map((m) => {
                          const matId = m.materialId || m.id;
                          const isSelected = matId === activeSession.materialId;
                          return (
                            <li key={matId}>
                              <button 
                                type="button"
                                onClick={() => { onSelectMaterial(matId); setShowDropdown(false); setSearchTerm(''); }}
                                style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: isSelected ? '#f9fafb' : 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#344054', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                              >
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title || 'Tài liệu không tên'}</span>
                                {isSelected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <input
            type="text"
            placeholder={
              chatMode === 'DOCUMENT' && !activeSession.materialId 
                ? "Hãy chọn tài liệu trước khi chat..." 
                : "Hỏi AI bất cứ điều gì..."
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping || (chatMode === 'DOCUMENT' && !activeSession.materialId)}
            style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 0', fontSize: '15px' }}
          />
          <button type="submit" className="ai-send-btn" disabled={!inputText.trim() || isTyping || (chatMode === 'DOCUMENT' && !activeSession.materialId)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;