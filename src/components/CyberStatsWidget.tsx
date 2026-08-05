import React from "react";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Cpu, Terminal, Award, ExternalLink } from "lucide-react";

export const CyberStatsWidget: React.FC = () => {
  return (
    <div className="py-12 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-morphism-heavy p-8 border-primary/20 rounded-3xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Title Block */}
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>Cybersecurity Telemetry</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display">
                Security Profile &amp; Verification Badges
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg">
                Active security research metrics across CTF competitions, web penetration testing, and Post-Quantum Cryptography development.
              </p>
            </div>

            {/* Badges & Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border text-center space-y-1 hover:border-primary/50 transition-colors">
                <div className="flex justify-center text-cyan-400 mb-1">
                  <Terminal className="w-5 h-5" />
                </div>
                <p className="text-xl font-bold font-mono text-foreground">Top 5%</p>
                <p className="text-[11px] text-muted-foreground uppercase font-mono">TryHackMe Rank</p>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/50 border border-border text-center space-y-1 hover:border-primary/50 transition-colors">
                <div className="flex justify-center text-emerald-400 mb-1">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <p className="text-xl font-bold font-mono text-foreground">25+</p>
                <p className="text-[11px] text-muted-foreground uppercase font-mono">Vulnerabilities Found</p>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/50 border border-border text-center space-y-1 hover:border-primary/50 transition-colors">
                <div className="flex justify-center text-purple-400 mb-1">
                  <Cpu className="w-5 h-5" />
                </div>
                <p className="text-xl font-bold font-mono text-foreground">Kyber-1024</p>
                <p className="text-[11px] text-muted-foreground uppercase font-mono">PQC Encryption</p>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/50 border border-border text-center space-y-1 hover:border-primary/50 transition-colors">
                <div className="flex justify-center text-amber-400 mb-1">
                  <Award className="w-5 h-5" />
                </div>
                <p className="text-xl font-bold font-mono text-foreground">TECHLETIC 4.0</p>
                <p className="text-[11px] text-muted-foreground uppercase font-mono">CTF Winner</p>
              </div>
            </div>
          </div>

          {/* Verification Bar */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time Audit Protocol Active</span>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/RobertThomasKariankal"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>GitHub Security Repos</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/robertthomaskariankal/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>LinkedIn Certs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
