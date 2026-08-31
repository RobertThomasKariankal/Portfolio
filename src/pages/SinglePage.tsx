import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutMarquee from "../components/AboutMarquee";
import Portfolio from "../components/Portfolio";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SkillsGrid from "../components/SkillsGrid";
import CertificationsSection from "../components/CertificationsSection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgressBar from "../components/scroll/ScrollProgressBar";

const SinglePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Disable scroll while preloading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Trigger a small scroll to ensure ScrollTrigger calculates positions correctly after preloader leaves
      window.scrollBy(0, 1);
      setTimeout(() => window.scrollBy(0, -1), 10);
    }
    
    return () => {
        document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <div 
        className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <ScrollProgressBar />
        <Navbar />
        
        <main>
          <Hero />
          <AboutMarquee />
          <Portfolio />
          <ExperienceTimeline />
          <SkillsGrid />
          <CertificationsSection />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SinglePage;
