import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    year: "2025",
    role: "Quantum Researcher",
    company: "Personal Project",
    description:
      "Researching and implementing post-quantum cryptographic algorithms. Focusing on lattice-based cryptography to secure communications against future quantum computer attacks.",
    skills: ["Python", "Cryptography", "Math"],
  },
  {
    year: "2025",
    role: "Core Team Member",
    company: "CINEHACK AI, FISAT, Angamaly",
    description:
      "Organized and managed technical events. Collaborated with a team of developers and AI enthusiasts to build intelligent solutions for hackathon challenges.",
    skills: ["Leadership", "Event Management", "AI"],
  },
  {
    year: "2024",
    role: "NRPF Coordinator",
    company: "NSS, SJCET",
    description:
      "Coordinated the National Rural Produce Forum (NRPF) activities. Managed logistics, team coordination, and successfully executed community outreach programs.",
    skills: ["Management", "Coordination", "Communication"],
  },
];

const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Progress line fills down
    gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
        }
    });

    // 2. Timeline items animate in
    const items = gsap.utils.toArray(".timeline-item");
    items.forEach((item: any, i) => {
        const isLeft = i % 2 === 0;
        const card = item.querySelector(".timeline-card");
        const dot = item.querySelector(".timeline-dot");
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        tl.from(dot, { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)" })
          .fromTo(card, 
            { x: isLeft ? -50 : 50, opacity: 0, rotateX: 15 },
            { x: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "power3.out" },
            "-=0.2"
          );
    });

  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="section-padding bg-background relative z-10 overflow-hidden">
      <div className="container px-6 mx-auto">
        
        <div className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
                Experience
            </h2>
            <p className="text-muted-foreground text-lg">
                My journey through cybersecurity, development, and leadership.
            </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
            {/* Center Line Track */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2"></div>
            {/* Center Line Fill */}
            <div ref={lineRef} className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[1px] bg-accent -translate-x-1/2 origin-top scale-y-0 z-10"></div>

            {experienceData.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                    <div key={index} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-24 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        
                        {/* Timeline Dot */}
                        <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent -translate-x-1/2 mt-6 md:mt-0 z-20 timeline-dot shadow-[0_0_10px_var(--accent)]"></div>

                        {/* Spacer for alternating layout */}
                        <div className="hidden md:block w-5/12"></div>

                        {/* Content Card */}
                        <div className="w-full md:w-5/12 pl-16 md:pl-0 timeline-card perspective-1000">
                            <div className="p-8 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-border/50 transition-colors">
                                <div className="font-mono text-accent font-bold mb-2 uppercase tracking-widest text-sm">
                                    {item.year}
                                </div>
                                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                                    {item.role}
                                </h3>
                                <div className="text-muted-foreground font-medium mb-4">
                                    {item.company}
                                </div>
                                <p className="text-muted-foreground/80 leading-relaxed mb-6">
                                    {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.skills.map((skill, i) => (
                                        <span key={i} className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-border text-foreground">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;
