import React, { useState, useEffect, useRef } from 'react';

const QuizFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedSubject,
  setSelectedSubject,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
  subjects,
  difficulties,
  statuses,
  quizzes = [],
  onSearch
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch();
  };

  // Click outside to close dropdown suggestions list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const query = searchQuery.trim().toLowerCase();
  const suggestions = query
    ? quizzes.filter(q => 
        q.title.toLowerCase().includes(query) || 
        q.id.toLowerCase().includes(query) ||
        q.subject.toLowerCase().includes(query) ||
        q.source.toLowerCase().includes(query)
      )
    : [];

  const handleSuggestionClick = (quiz) => {
    setSearchQuery(quiz.title);
    setShowSuggestions(false);
    setTimeout(() => {
      onSearch(quiz.title);
    }, 50);
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-filter-bar-form">
      <div className="filter-input-wrapper search-input-wrapper" ref={dropdownRef}>
        <svg className="filter-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search quizzes, courses, or topics..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="search-suggestions-dropdown">
            {suggestions.map((quiz) => (
              <li 
                key={quiz.id} 
                onClick={() => handleSuggestionClick(quiz)}
                className="suggestion-item"
              >
                <span className="suggestion-id">{quiz.id}</span>
                <div className="suggestion-text">
                  <span className="suggestion-title">{quiz.title}</span>
                  <span className="suggestion-sub">{quiz.subject} • {quiz.source}</span>
                </div>
                {quiz.accessMode === 'private' && (
                  <span className="suggestion-lock" title="Password Protected">🔒</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filter-input-wrapper select-input-wrapper">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          aria-label="Filter by Subject"
        >
          <option value="All">All Subjects</option>
          {subjects.map((subj, idx) => (
            <option key={idx} value={subj}>{subj}</option>
          ))}
        </select>
      </div>

      <div className="filter-input-wrapper select-input-wrapper">
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          aria-label="Filter by Difficulty"
        >
          <option value="All">All Difficulties</option>
          {difficulties.map((diff, idx) => (
            <option key={idx} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      <div className="filter-input-wrapper select-input-wrapper">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          aria-label="Filter by Status"
        >
          <option value="All">Any Status</option>
          {statuses.map((stat, idx) => (
            <option key={idx} value={stat.value}>{stat.label}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="quiz-search-submit-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

export default QuizFilterBar;