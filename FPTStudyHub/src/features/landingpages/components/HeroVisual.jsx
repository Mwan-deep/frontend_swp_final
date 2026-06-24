import React from 'react';
import { Sparkles } from 'lucide-react';

const HeroVisual = () => {
  return (
    <div className="hero-visual-container">
      {/* Decorative background glow */}
      <div className="bg-glow"></div>

      {/* Main mockup device frame */}
      <div className="mock-device-frame">
        <div className="device-screen">
          
          {/* Mock Document Card inside screen */}
          <div className="mock-document-card">
            <h3 className="doc-serif-title">Tachung Ploupad costorinuct</h3>
            <p className="doc-meta-placeholder">Universal document summaries, notes and learning aids.</p>
            <div className="doc-body-placeholder">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Badge: AI Summary Generated */}
      <div className="floating-badge ai-summary-badge">
        <div className="badge-header">
          <div className="sparkle-icon-wrapper">
            <Sparkles className="sparkle-icon" size={14} />
          </div>
          <span className="badge-title">AI Summary Generated</span>
        </div>
        <div className="badge-skeleton-lines">
          <div className="skeleton-line-long"></div>
          <div className="skeleton-line-short"></div>
        </div>
      </div>

      {/* Floating Badge: Quiz Score 95% */}
      <div className="floating-badge quiz-score-badge">
        <div className="quiz-score-header">
          <span className="quiz-score-label">Quiz Score</span>
          <span className="quiz-score-value">95%</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: '95%' }}></div>
        </div>
        <p className="quiz-score-subtitle">Great job! You've mastered Chapter 4.</p>
      </div>
    </div>
  );
};

export default HeroVisual;