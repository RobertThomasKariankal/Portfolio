import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background watermark */}
      <div className="watermark-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        CREATIVE
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      <div className="container relative z-10 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Open to internships & collaborations</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Hi, I'm <span className="text-gradient">Robert</span>
            <br />
            <span className="text-muted-foreground">Cybersecurity Student</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            B.Tech in Computer Science & Engineering (Cybersecurity). 
            Passionate about ethical hacking, network security, and building secure digital systems.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href="#portfolio" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:shadow-[0_0_30px_hsl(84_81%_44%/0.5)] transition-all duration-300"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-full hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll down</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;