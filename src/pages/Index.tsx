import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import Portfolio from "@/components/Portfolio";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <Portfolio />
      <div id="journey">
        <Journey />
      </div>
      <SkillsMarquee />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;