import React from 'react';
// Update these paths to match your actual file structure
import HeroSection from '../components/core/about/HeroSection';
import QuoteSection from '../components/core/about/QuoteSection';
import StoryMissionSection from '../components/core/about/StoryMissionSection';
import StatsSection from '../components/core/about/StatsSection';
import LearningSection from '../components/core/about/LearningSection';
import ContactSection from '../components/core/about/ContactSection';
import ReviewsSection from '../components/core/about/ReviewsSection';
import Footer from '../components/common/Footer';

const AboutPage = () => {
  return (
    <div className="about-page">
      <HeroSection />
      <QuoteSection />
      <StoryMissionSection />
      <StatsSection />
      <LearningSection />
      <ContactSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
