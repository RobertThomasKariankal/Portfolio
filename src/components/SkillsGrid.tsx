import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldAlert, Code2, Network, BrainCircuit } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Security Tools",
    icon: ShieldAlert,
    skills: [
      { name: "Burp Suite", level: 85 },
      { name: "Metasploit", level: 75 },
      { name: "Wireshark", level: 90 },
      { name: "Nmap", level: 80 },
    ]
  },
  {
    title: "Programming",
    icon: Code2,
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript/TS", level: 85 },
      { name: "C++", level: 70 },
      { name: "Go", level: 60 },
    ]
  },
  {
    title: "Security Skills",
    icon: Network,
    skills: [
      { name: "Penetration Testing", level: 80 },
      { name: "Cryptography", level: 75 },
      { name: "Network Security", level: 85 },
      { name: "Web App Security", level: 80 },
    ]
  },
  {
    title: "Core Concepts",
    icon: BrainCircuit,
    skills: [
      { name: "Zero Trust", level: 75 },
      { name: "OSINT", level: 80 },
      { name: "Incident Response", level: 65 },
      { name: "Quantum Concepts", level: 70 },
    ]
  }
];

const SkillsGrid = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Reveal columns with stagger
    gsap.from(".skill-col", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
        }
    });

    // Fill bars
    const bars = gsap.utils.toArray(".skill-bar-fill");
    
    bars.forEach((bar: any) => {
        const width = bar.getAttribute("data-width");
        gsap.to(bar, {
            width: `${width}%`,
            duration: 1.5,
            ease: "expo.out",
            delay: 0.2, // wait for column to appear
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });
    });

  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="section-padding bg-background relative z-10">
      <div className="container px-6 mx-auto">
        <div className="max-w-2xl mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Technical Arsenal
            </h2>
            <p className="text-muted-foreground text-lg">
                Tools and technologies I use to secure systems and build digital experiences.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {skillCategories.map((category, idx) => (
                <div key={idx} className="skill-col">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                        <category.icon className="w-6 h-6 text-accent" />
                        <h3 className="font-display text-xl font-bold text-foreground">
                            {category.title}
                        </h3>
                    </div>

                    <div className="space-y-6">
                        {category.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="group">
                                <div className="flex justify-between mb-2">
                                    <span className="font-mono text-sm font-bold text-foreground uppercase tracking-wider">{skill.name}</span>
                                    <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                    <div 
                                        className="skill-bar-fill h-full bg-accent w-0 rounded-full group-hover:shadow-[0_0_10px_var(--accent)] transition-shadow"
                                        data-width={skill.level}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
