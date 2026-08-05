import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import StatsBar from "@/components/StatsBar";
import { CyberStatsWidget } from "@/components/CyberStatsWidget";
import { SecurityPlayground } from "@/components/SecurityPlayground";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            <Hero />
            <div className="relative z-10 -mt-10 mb-12">
              <SkillsMarquee />
            </div>
            <CyberStatsWidget />
            <SecurityPlayground />
            <StatsBar />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;