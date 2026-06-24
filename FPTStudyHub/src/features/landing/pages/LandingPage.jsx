// src/features/landing/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Sparkles, ArrowRight, Globe, HelpCircle } from 'lucide-react';
import './LandingPage.css'; // Import CSS thuần

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* Header */}
      <header className="lp-header">
        <div className="lp-logo">
          <GraduationCap size={28} color="#f58232" />
          <span>FPT Study Hub</span>
        </div>
        <div className="lp-nav-actions">
          <button className="lp-btn-login" onClick={() => navigate('/login')}>Login</button>
          <button className="lp-btn-register" onClick={() => navigate('/register')}>Register</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="lp-hero">
        {/* Left Content */}
        <div className="lp-hero-content">
          <div className="lp-badge">
            <Sparkles size={16} color="#f58232" />
            <span>New AI Features Available</span>
          </div>
          
          <h1 className="lp-title">
            Master Your Learning with <br />
            <span className="lp-highlight">AI-Powered</span> Intelligence.
          </h1>
          
          <p className="lp-description">
            Manage documents, generate summaries, and ace your quizzes 
            with the ultimate study companion for FPT students. Designed for 
            clarity, focus, and academic excellence.
          </p>
          
          <div className="lp-actions">
            <button className="lp-btn-primary" onClick={() => navigate('/dashboard')}>
              Get Started Free <ArrowRight size={18} />
            </button>
            <button className="lp-btn-outline" onClick={() => navigate('/documents')}>
              Explore Documents
            </button>
          </div>
          
          <div className="lp-social-proof">
            <div className="lp-avatars">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="lp-avatar" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="User" className="lp-avatar" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jack" alt="User" className="lp-avatar" />
              <div className="lp-avatar lp-avatar-more">5k+</div>
            </div>
            <span className="lp-proof-text">Trusted by thousands of students</span>
          </div>
        </div>

        {/* Right Visuals */}
        <div className="lp-hero-visuals">
          <div className="lp-tablet-mockup">
            <div className="lp-doc-mockup"></div>
          </div>

          {/* Floating Card 1 */}
          <div className="lp-floating-card lp-card-top-right">
            <div className="lp-card-header">
              <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{background: '#eef2ff', padding: '4px', borderRadius: '4px', color: '#4f46e5'}}>
                  <Sparkles size={14} />
                </div>
                AI Summary Generated
              </span>
            </div>
            <div style={{height: '6px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '8px', width: '100%'}}></div>
            <div style={{height: '6px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '8px', width: '80%'}}></div>
            <div style={{height: '6px', background: '#e2e8f0', borderRadius: '3px', width: '90%'}}></div>
          </div>

          {/* Floating Card 2 */}
          <div className="lp-floating-card lp-card-bottom-left">
            <div className="lp-card-header">
              <span>Quiz Score</span>
              <span className="lp-score">95%</span>
            </div>
            <div className="lp-progress-bar">
              <div className="lp-progress-fill"></div>
            </div>
            <p className="lp-card-text">Great job! You've mastered Chapter 4.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-logo" style={{fontSize: '1rem', color: '#1a1e2d'}}>
          <GraduationCap size={20} color="#f58232" />
          <span>FPT Study Hub</span>
        </div>
        <div>
          © 2024 FPT Study Hub. All rights reserved.
        </div>
        <div className="lp-footer-icons">
          <Globe size={20} cursor="pointer" />
          <HelpCircle size={20} cursor="pointer" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;