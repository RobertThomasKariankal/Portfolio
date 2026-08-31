import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

export const projects = [
  {
    id: 1,
    title: "Quantum Secure Communication",
    description: "Post-quantum cryptographic protocols implementation for secure data transmission over untrusted networks.",
    image: "/images/project-1.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop",
    tags: ["Python", "Cryptography", "Network Security"],
    github: "https://github.com",
    demo: "#",
    features: ["Lattice-based cryptography", "Forward secrecy", "Quantum resistance"]
  },
  {
    id: 2,
    title: "Zero-Trust Architecture",
    description: "Enterprise-grade zero trust network model with continuous authentication and strict access controls.",
    image: "/images/project-2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    tags: ["Cloud", "IAM", "Infrastructure"],
    github: "https://github.com",
    features: ["Micro-segmentation", "Identity Provider Integration", "MFA"]
  },
  {
    id: 3,
    title: "Automated Penetration Suite",
    description: "Custom orchestration tool for automated vulnerability scanning and report generation.",
    image: "/images/project-3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    tags: ["Go", "Docker", "Security Automation"],
    github: "https://github.com",
    features: ["Parallel execution", "Custom exploits", "PDF Reporting"]
  },
  {
    id: 4,
    title: "Secure Cloud Storage",
    description: "End-to-end encrypted cloud storage solution with client-side key management.",
    image: "/images/project-4.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1614064641913-6b71a2dbbb46?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Node.js", "AES-256"],
    github: "https://github.com",
    demo: "#",
    features: ["Client-side encryption", "Zero-knowledge architecture", "File sharing"]
  }
];

const Portfolio = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray(".project-panel");
    
    // Horizontal scroll pinning
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + (scrollWrapperRef.current?.offsetWidth || 0),
      }
    });

    // Image Parallax within cards
    sections.forEach((section: any) => {
        const img = section.querySelector("img");
        gsap.to(img, {
            xPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => "+=" + (scrollWrapperRef.current?.offsetWidth || 0),
                scrub: true,
            }
        });
    });

  }, { scope: containerRef });

  return (
    <>
      <section 
        id="portfolio" 
        ref={containerRef}
        className="h-screen bg-background text-foreground overflow-hidden flex items-center relative z-20"
      >
        <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-10 mix-blend-difference text-foreground">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">
            Selected Work
          </h2>
          <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mt-2">
            Scroll horizontally
          </p>
        </div>

        <div ref={scrollWrapperRef} className="flex h-full w-[400vw] lg:w-[300vw]">
          {projects.map((project, i) => (
            <div 
              key={project.id} 
              className="project-panel w-screen h-full flex items-center justify-center p-6 md:p-12 lg:p-24 relative"
            >
              <div className="w-full max-w-6xl aspect-[4/3] md:aspect-[16/9] relative group cursor-pointer overflow-hidden rounded-2xl" onClick={() => setSelectedProject(project)}>
                
                {/* Background Number */}
                <div className="absolute -right-10 -bottom-20 font-display font-bold text-[20rem] leading-none text-foreground/5 z-0 pointer-events-none select-none">
                    0{i+1}
                </div>

                <div className="absolute inset-0 overflow-hidden bg-muted">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center scale-[1.2] transition-transform duration-700 group-hover:scale-[1.25]"
                    onError={(e) => { e.currentTarget.src = project.fallbackImage; }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                </div>

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                  <div className="flex flex-wrap gap-2 mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-background/80 backdrop-blur-md text-foreground text-xs font-mono font-bold uppercase rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 text-white/80 font-mono text-sm tracking-widest uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 magnetic" data-magnetic-text="View">
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
};

export default Portfolio;