import React, { useState } from 'react';
import ChatSessions from '../aifeatures/components/ChatSessions';
import ChatWindow from '../aifeatures/components/ChatWindow';
import NoteBook from '../aifeatures/components/NoteBook';
import { INITIAL_SESSIONS, INITIAL_NOTES } from "../../data/mockDocuments";
import './AIFeatures.css';

const AIFeatures = () => {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [isTyping, setIsTyping] = useState(false);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  // Xử lý gửi tin nhắn mới
  const handleSendMessage = (text) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text
    };

    setSessions(prevSessions =>
      prevSessions.map(session => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, userMessage]
          };
        }
        return session;
      })
    );

    // Giả lập AI phản hồi sau khi chờ 1.2s
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Based on FPT Study Hub AI database, regarding "${text}":\n\nThis is an automated study response analyzing your document materials. Please let me know if you need to summarize another chapter or highlight specific terms.`
      };

      setSessions(prevSessions =>
        prevSessions.map(session => {
          if (session.id === activeSessionId) {
            return {
              ...session,
              messages: [...session.messages, aiResponse]
            };
          }
          return session;
        })
      );
      setIsTyping(false);
    }, 1200);
  };

  // Tạo hội thoại chat mới
  const handleNewChat = () => {
    const newSession = {
      id: Date.now(),
      title: 'Untitled Study Session',
      category: 'today',
      messages: []
    };

    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  // Các hàm xử lý NoteBook
  const handleAddNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      time: 'Hôm nay, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleUpdateNote = (id, newText) => {
    setNotes(prev =>
      prev.map(note => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  return (
    <div className="ai-features-page-wrapper">
      <div className="ai-features-grid-layout">
        
        {/* Cột 1: Lịch sử hội thoại */}
        <div className="ai-grid-column sidebar-column">
          <ChatSessions 
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Cột 2: Khung Chat AI */}
        <div className="ai-grid-column chat-column">
          <ChatWindow 
            activeSession={activeSession}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
          />
        </div>

        {/* Cột 3: NoteBook */}
        <div className="ai-grid-column notebook-column">
          <NoteBook 
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onUpdateNote={handleUpdateNote}
          />
        </div>

      </div>
    </div>
  );
};

export default AIFeatures;