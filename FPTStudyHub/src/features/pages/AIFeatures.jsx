import React, { useState, useEffect } from 'react';
import ChatSessions from '../aifeatures/components/ChatSessions';
import ChatWindow from '../aifeatures/components/ChatWindow';
import axiosClient from '../../utils/axiosClient';
import './AIFeatures.css';

const AIFeatures = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [chatCache, setChatCache] = useState({});

  // ĐÃ THÊM: State quản lý chế độ Chat
  const [chatMode, setChatMode] = useState('GENERAL'); // 'GENERAL' hoặc 'DOCUMENT'

  const fetchSessions = async () => {
    try {
      const response = await axiosClient.get('/api/v1/chat/sessions');
      const data = response.result || response.data || [];
      setSessions(data);
    } catch (error) {
      console.error("Lỗi tải danh sách phiên chat:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (!activeSessionId) {
      setCurrentMessages([]);
      setSelectedMaterialId(null);
      return;
    }

    // ĐÃ THÊM: Khi click vào phiên cũ, tự động nhận diện chế độ Chat
    const currentSession = sessions.find(s => s.id === activeSessionId);
    if (currentSession) {
      if (currentSession.materialId) {
        setSelectedMaterialId(currentSession.materialId);
        setChatMode('DOCUMENT');
      } else {
        setSelectedMaterialId(null);
        setChatMode('GENERAL');
      }
    }

    if (chatCache[activeSessionId]) {
      setCurrentMessages(chatCache[activeSessionId]);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get(`/api/v1/chat/history?sessionId=${activeSessionId}`);
        const historyData = res.result || res.data || [];
        setCurrentMessages(historyData);
        setChatCache(prev => ({ ...prev, [activeSessionId]: historyData }));
      } catch (err) {
        console.error("Lỗi lấy lịch sử chat:", err);
      }
    };

    fetchHistory();
  }, [activeSessionId, sessions, chatCache]);

  const handleNewChat = () => {
    setActiveSessionId(null);
    setCurrentMessages([]);
    setSelectedMaterialId(null);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text };
    const updatedMessages = [...currentMessages, userMessage];
    setCurrentMessages(updatedMessages);
    
    if (activeSessionId) {
       setChatCache(prev => ({ ...prev, [activeSessionId]: updatedMessages }));
    }

    setIsTyping(true);

    try {
      let url = `/api/v1/chat/ask?prompt=${encodeURIComponent(text)}`;
      if (activeSessionId) url += `&sessionId=${activeSessionId}`;
      if (selectedMaterialId && chatMode === 'DOCUMENT') url += `&materialId=${selectedMaterialId}`;

      const response = await axiosClient.post(url);
      const data = response.result || response.data || response;
      
      const answerText = data.answer || "AI đã xử lý nhưng không trả về nội dung.";
      const returnedSessionId = data.sessionId; 
      
      const aiResponse = { id: Date.now() + 1, sender: 'ai', text: answerText };
      const finalMessages = [...updatedMessages, aiResponse];

      setCurrentMessages(finalMessages);

      if (!activeSessionId) {
        setActiveSessionId(returnedSessionId);
        const newSessionObj = {
          id: returnedSessionId,
          title: data.title || text.substring(0, 30) + '...',
          materialId: chatMode === 'DOCUMENT' ? selectedMaterialId : null,
          createdAt: new Date().toISOString()
        };
        
        setSessions(prev => [newSessionObj, ...prev]);
        setChatCache(prev => ({ ...prev, [returnedSessionId]: finalMessages }));
      } else {
        setChatCache(prev => ({ ...prev, [activeSessionId]: finalMessages }));
      }
      
    } catch (error) {
      console.error("Lỗi hệ thống Chat:", error);
      const errorResponse = { id: Date.now() + 1, sender: 'ai', text: "Xin lỗi, AI đang gặp sự cố. Vui lòng thử lại sau!" };
      const finalMessagesWithError = [...updatedMessages, errorResponse];
      
      setCurrentMessages(finalMessagesWithError);
      if (activeSessionId) {
         setChatCache(prev => ({ ...prev, [activeSessionId]: finalMessagesWithError }));
      }
    } finally {
      setIsTyping(false);
    }
  };

  const activeSessionForChild = {
     id: activeSessionId,
     messages: currentMessages,
     materialId: selectedMaterialId
  };

  return (
    <div className="ai-features-page-wrapper">
      <div className="ai-features-grid-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
        
        <div className="ai-grid-column sidebar-column">
          <ChatSessions 
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewChat={handleNewChat}
          />
        </div>

        <div className="ai-grid-column chat-column">
          <ChatWindow 
            activeSession={activeSessionForChild}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            onSelectMaterial={(matId) => setSelectedMaterialId(matId)}
            // Bổ sung các Props mới
            chatMode={chatMode}
            setChatMode={setChatMode}
            onNewChat={handleNewChat}
          />
        </div>

      </div>
    </div>
  );
};

export default AIFeatures;