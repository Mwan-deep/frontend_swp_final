import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon-wrapper">{icon}</div>
    <div className="feature-info">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  </div>
);

const HeroSection = () => {
  const features = [
    {
      title: "Secure Data Handling",
      description: "All your research and documents are protected with institutional-grade encryption.",
      icon: (
        <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M12 11v5" />
          <path d="M12 8h.01" />
        </svg>
      )
    },
    {
      title: "Academic Integrity",
      description: "Integrated tools to maintain high academic standards and citation accuracy.",
      icon: (
        <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    }
  ];

  return (
    <div className="hero-section-overlay">
      <div className="hero-content">
        <h1 className="hero-title">Academic<br />Intelligence<br />System.</h1>
        <p className="hero-description">
          Empowering the FPT community with AI-driven document management and collaborative learning tools.
        </p>
        <div className="features-container">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;