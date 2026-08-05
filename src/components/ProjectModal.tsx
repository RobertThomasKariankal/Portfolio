import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Shield, Cpu, Layers } from "lucide-react";

export interface ProjectData {
  id: number;
  title: string;
  category: "cyber" | "ai" | "web";
  description: string;
  longDescription?: string;
  architecture?: string[];
  securityAudits?: string[];
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0d1322] border border-primary/30 rounded-3xl overflow-hidden shadow-[0_0_50px_hsl(var(--primary)/0.25)] my-8"
        >
          {/* Header Image banner */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-[#0d1322]/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-rose-500/80 text-white rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-mono text-xs font-bold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-white">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 space-y-6 text-foreground">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Overview &amp; Architecture
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {project.longDescription || project.description}
              </p>
            </div>

            {project.architecture && (
              <div className="p-5 bg-secondary/30 rounded-2xl border border-border space-y-3">
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Key System Highlights
                </h5>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs md:text-sm font-mono text-foreground/80">
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.securityAudits && (
              <div className="p-5 bg-emerald-950/20 rounded-2xl border border-emerald-500/20 space-y-3">
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Controls &amp; Mitigations
                </h5>
                <ul className="space-y-1.5 text-xs md:text-sm font-mono text-emerald-300">
                  {project.securityAudits.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                <a
                  href={project.githubUrl || "https://github.com/RobertThomasKariankal"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-primary/20 hover:text-primary rounded-full font-mono text-sm font-bold transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Code</span>
                </a>

                <a
                  href={project.liveUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:shadow-[0_0_25px_hsl(var(--primary)/0.6)] rounded-full font-mono text-sm font-bold transition-all"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                Close Window [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
