import React from 'react';
import LandingNavbar from '../landingpages/components/LandingNavbar';
import LandingHero from '../landingpages/components/LandingHero';
import LandingFooter from '../landingpages/components/LandingFooter';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <LandingNavbar />
      <LandingHero />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;