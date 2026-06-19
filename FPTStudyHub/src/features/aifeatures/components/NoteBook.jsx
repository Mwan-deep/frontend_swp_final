import React, { useState } from 'react';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const NoteBook = ({ notes, onAddNote, onDeleteNote, onUpdateNote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleCreateNote = () => {
    if (!newNoteText.trim()) return;
    onAddNote(newNoteText.trim());
    setNewNoteText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateNote();
    }
  };

  const startEditNote = (note) => {
    setEditingNoteId(note.id);
    setEditingText(note.text);
  };

  const handleSaveEdit = (id) => {
    if (!editingText.trim()) return;
    onUpdateNote(id, editingText.trim());
    setEditingNoteId(null);
  };

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ai-notebook-container">
      {/* Tiêu đề */}
      <div className="notebook-header">
        <h3 className="notebook-title">NoteBook</h3>
        <span className="notebook-subtitle">(non-AI, user-driven)</span>
      </div>

      {/* Thanh Tìm kiếm */}
      <div className="notebook-search-wrapper">
        <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Khung Soạn thảo Note mới */}
      <div className="notebook-textarea-wrapper">
        <textarea
          placeholder="Add a new note... (press Enter to save)"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="3"
        />
      </div>

      {/* Danh sách Notes */}
      <div className="notebook-notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="notebook-note-card">
              {editingNoteId === note.id ? (
                <div className="note-card-edit-wrapper">
                  <textarea
                    className="note-edit-textarea"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows="2"
                  />
                  <div className="note-edit-actions">
                    <button className="note-save-edit-btn" onClick={() => handleSaveEdit(note.id)}>
                      <SaveIcon /> Save
                    </button>
                    <button className="note-cancel-edit-btn" onClick={() => setEditingNoteId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="note-card-text">{note.text}</p>
                  <div className="note-card-footer">
                    <span className="note-card-time">{note.time}</span>
                    <div className="note-card-actions">
                      <button className="note-action-btn edit" onClick={() => startEditNote(note)} aria-label="Edit note">
                        <EditIcon />
                      </button>
                      <button className="note-action-btn delete" onClick={() => onDeleteNote(note.id)} aria-label="Delete note">
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="notebook-notes-empty">
            {searchQuery ? "No matching notes found." : "No notes saved yet."}
          </div>
        )}
      </div>

      {/* Nút lưu Note dưới cùng */}
      <button className="notebook-add-btn" onClick={handleCreateNote} disabled={!newNoteText.trim()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>New Note</span>
      </button>
    </div>
  );
};

export default NoteBook;