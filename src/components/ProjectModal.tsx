import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Github, ExternalLink } from "lucide-react";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(contentRef.current, 
        { y: "100%" }, 
        { y: "0%", duration: 0.6, ease: "expo.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(contentRef.current, { y: "100%", duration: 0.5, ease: "expo.in" });
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, delay: 0.2 });
    }
  }, [isOpen, project]);

  if (!project) return null;

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[100] invisible flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        ref={contentRef}
        className="w-full h-[95vh] sm:h-[90vh] bg-background rounded-t-3xl sm:rounded-3xl max-w-6xl mx-auto overflow-hidden flex flex-col shadow-2xl relative translate-y-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-96 shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = project.fallbackImage; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-background/50 hover:bg-background backdrop-blur-md rounded-full text-foreground transition-colors magnetic"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 relative -mt-20 z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-accent/10 text-accent text-xs font-mono font-bold uppercase tracking-wider rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-bold mb-6 text-foreground leading-tight">
            {project.title}
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-12 max-w-4xl">
            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-foreground font-bold mb-4 border-b border-border pb-2">Key Features</h3>
              <ul className="space-y-4">
                {project.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-accent mt-1">●</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-foreground font-bold mb-4 border-b border-border pb-2">Links & Resources</h3>
              <div className="flex flex-col gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors w-fit group">
                    <div className="p-3 bg-secondary rounded-full group-hover:bg-accent/10 transition-colors">
                      <Github className="w-5 h-5" />
                    </div>
                    <span className="font-bold uppercase tracking-wider text-sm">View Source</span>
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors w-fit group">
                    <div className="p-3 bg-secondary rounded-full group-hover:bg-accent/10 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <span className="font-bold uppercase tracking-wider text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
