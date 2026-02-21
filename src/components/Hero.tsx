import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background watermark */}
      <div className="watermark-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        CREATIVE
      </div>

      {/* Decorative elements */}
      <div className="absolute top-24 left-10 w-4 h-4 bg-primary rounded-full animate-float shadow-[0_0_20px_hsl(var(--primary)/0.4)]" />
      <div className="absolute top-44 right-20 w-6 h-6 bg-primary rounded-full animate-float shadow-[0_0_30px_hsl(var(--primary)/0.3)]" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary rounded-full animate-float shadow-[0_0_15px_hsl(var(--primary)/0.3)]" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-card mb-6 border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Open to internships & collaborations</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Hi, I'm <span className="text-gradient drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]">Robert</span>
            <br />
            <span className="text-muted-foreground/50">Cybersecurity Student</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            B.Tech in Computer Science & Engineering (Cybersecurity).
            Passionate about ethical hacking, network security, and building secure digital systems.
          </motion.p>

        </motion.div>

        {/* Scroll indicator 
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
        </motion.div>*/}
      </div>
    </section>
  );
};

export default Hero;