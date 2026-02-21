import Navbar from "@/components/Navbar";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Experience = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-32 pb-20">
                <div className="container px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional <span className="text-gradient">Journey</span></h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            My path through cybersecurity, from academic foundations to professional challenges.
                        </p>
                    </motion.div>
                    <ExperienceTimeline />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Experience;
