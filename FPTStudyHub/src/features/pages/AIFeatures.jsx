import React, { useState, useEffect } from 'react';
import ChatSessions from '../aifeatures/components/ChatSessions';
import ChatWindow from '../aifeatures/components/ChatWindow';
import axiosClient from '../../utils/axiosClient';
import './AIFeatures.css';

const AIFeatures = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // State để ghi nhớ ID của các tài liệu ĐÃ TẢI lịch sử thành công (Chống sập Backend)
  const [loadedHistoryIds, setLoadedHistoryIds] = useState(new Set());

  // 1. GỌI API LẤY DANH SÁCH TÀI LIỆU (SIDEBAR)
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axiosClient.get('/api/v1/question-sets');
        const docsData = response.result || response.data || [];

        const formattedSessions = docsData.map(doc => ({
          id: doc.id,
          title: doc.title || "Tài liệu không tên",
          category: 'today', 
          messages: [] 
        }));

        setSessions(formattedSessions);
        if (formattedSessions.length > 0) {
          setActiveSessionId(formattedSessions[0].id);
        }
      } catch (error) {
        console.error("Lỗi tải danh sách tài liệu chat:", error);
      }
    };
    fetchMaterials();
  }, []);

  // 2. GỌI API KÉO LỊCH SỬ CHAT (Đã vá lỗi vòng lặp vô tận)
  useEffect(() => {
    if (!activeSessionId) return;
    // Bỏ qua nếu lịch sử của tài liệu này đã được tải rồi
    if (loadedHistoryIds.has(activeSessionId)) return;

    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get(`/api/v1/chat/history?materialId=${activeSessionId}`);
        const historyData = res.result || res.data || [];
        
        setSessions(prevSessions => prevSessions.map(s => {
          if (s.id === activeSessionId) {
            return { ...s, messages: historyData };
          }
          return s;
        }));

        // Đánh dấu tài liệu này đã tải xong lịch sử
        setLoadedHistoryIds(prev => new Set(prev).add(activeSessionId));

      } catch (err) {
        console.error("Lỗi lấy lịch sử chat:", err);
      }
    };

    fetchHistory();
  }, [activeSessionId, loadedHistoryIds]);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  // 3. HÀM GỬI TIN NHẮN (API THẬT)
  const handleSendMessage = async (text) => {
    if (!activeSessionId) {
      alert("Vui lòng chọn một tài liệu để bắt đầu trò chuyện!");
      return;
    }

    const userMessage = { id: Date.now(), sender: 'user', text };

    setSessions(prevSessions =>
      prevSessions.map(session => {
        if (session.id === activeSessionId) {
          return { ...session, messages: [...session.messages, userMessage] };
        }
        return session;
      })
    );

    setIsTyping(true);

    try {
      const response = await axiosClient.post(
        `/api/v1/chat/ask?materialId=${activeSessionId}&prompt=${encodeURIComponent(text)}`
      );

      const answerText = response.result?.answer || response.data?.answer || response.answer;

      const aiResponse = { id: Date.now() + 1, sender: 'ai', text: answerText || "AI đã xử lý nhưng không trả về nội dung." };

      setSessions(prevSessions =>
        prevSessions.map(session => {
          if (session.id === activeSessionId) {
            return { ...session, messages: [...session.messages, aiResponse] };
          }
          return session;
        })
      );
    } catch (error) {
      console.error("Lỗi hệ thống Chat:", error);
      const errorResponse = { id: Date.now() + 1, sender: 'ai', text: "Xin lỗi, AI đang gặp sự cố hoặc Backend chưa bật. Vui lòng thử lại sau!" };

      setSessions(prevSessions =>
        prevSessions.map(session => {
          if (session.id === activeSessionId) {
            return { ...session, messages: [...session.messages, errorResponse] };
          }
          return session;
        })
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    alert("Vui lòng Upload một tài liệu mới bên trang Dashboard để tạo phiên Chat mới!");
  };

  return (
    <div className="ai-features-page-wrapper">
      
      {/* KHUNG GIAO DIỆN BÂY GIỜ CHỈ CÒN 2 CỘT */}
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
            activeSession={activeSession}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
          />
        </div>

      </div>
    </div>
  );
};

export default AIFeatures;