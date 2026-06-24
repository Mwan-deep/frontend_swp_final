import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroVisual from './HeroVisual';

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-hero">
      <div className="hero-content-left">
        {/* New AI Features Badge */}
        <div className="ai-features-badge">
          <Sparkles className="badge-sparkle" size={14} />
          <span>New AI Features Available</span>
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Master Your Learning with{' '}
          <span className="highlight-wrapper">
            <span className="highlight-orange">AI-Powered</span>
            <svg className="underline-svg" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 C30,2 70,8 100,5" stroke="#f27123" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>{' '}
          Intelligence.
        </h1>

        {/* Description */}
        <p className="hero-description">
          Manage documents, generate summaries, and ace your quizzes with the ultimate study companion for FPT students. Designed for clarity, focus, and academic excellence.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <button 
            className="btn-primary-cta"
            onClick={() => navigate('/login')}
          >
            Get Started Free <ArrowRight size={16} className="btn-arrow" />
          </button>
          <button 
            className="btn-secondary-cta"
            onClick={() => navigate('/documents')}
          >
            Explore Documents
          </button>
        </div>

        {/* Social Proof */}
        <div className="hero-social-proof">
          <div className="avatar-group">
            <img 
              className="proof-avatar" 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" 
              alt="Student 1" 
            />
            <img 
              className="proof-avatar" 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
              alt="Student 2" 
            />
            <img 
              className="proof-avatar" 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Student 3" 
            />
            <div className="avatar-count-badge">5k+</div>
          </div>
          <span className="proof-text">Trusted by thousands of students</span>
        </div>
      </div>

      <div className="hero-content-right">
        <HeroVisual />
      </div>
    </section>
  );
};

export default LandingHero;