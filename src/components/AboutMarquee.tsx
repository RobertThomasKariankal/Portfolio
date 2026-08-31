import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "splitting/dist/splitting.css";
// @ts-ignore
import Splitting from "splitting";
import { FolderGit2, Shield, Code2, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Web Design",
  "Automation",
  "Scripting",
  "App Design",
  "Cloud Security",
  "Wireframe",
  "Networking",
  "UI/UX Design",
  "Pentesting",
  "Prototyping",
  "Figma",
  "Data Analysis"
];

const stats = [
    { icon: FolderGit2, value: 5, label: "Projects Built", suffix: "+" },
    { icon: Shield, value: 6, label: "Certifications", suffix: "" },
    { icon: Code2, value: 4, label: "Years Coding", suffix: "+" },
    { icon: Award, value: 2, label: "Hackathons", suffix: "" },
];

const AboutMarquee = () => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text Reveal Word by Word
    Splitting({ target: textRef.current, by: "words" });
    const words = textRef.current?.querySelectorAll(".word");

    if (words) {
      gsap.from(words, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      });
    }

    // 2. Stats spring counter
    const counters = statsRef.current?.querySelectorAll(".stat-num");
    
    if (counters) {
        counters.forEach((counter: any) => {
            const target = parseFloat(counter.getAttribute("data-target"));
            gsap.fromTo(counter, 
                { innerHTML: 0 },
                {
                    innerHTML: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 80%",
                    }
                }
            );
        });
    }

    // 3. Stats cards stagger up
    const cards = statsRef.current?.querySelectorAll(".stat-card");
    if(cards) {
        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
            }
        });
    }

  }, { scope: container });

  return (
    <section ref={container} className="section-padding bg-background relative z-20">
      <div className="container px-6 mx-auto mb-32">
        <h2 ref={textRef} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl">
          I build secure digital experiences that push boundaries.
        </h2>
      </div>

      {/* Infinite Marquee */}
      <div className="w-full overflow-hidden bg-foreground text-background py-10 mb-32 border-y border-border flex flex-col gap-4 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex animate-marquee whitespace-nowrap">
            {[...skills, ...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex items-center mx-8">
                <span className="w-3 h-3 rounded-full bg-accent mr-8"></span>
                <span className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wide">
                {skill}
                </span>
            </div>
            ))}
        </div>
        <div className="flex animate-marquee-reverse whitespace-nowrap opacity-50">
            {[...skills, ...skills, ...skills].reverse().map((skill, index) => (
            <div key={`rev-${index}`} className="flex items-center mx-8">
                <span className="w-3 h-3 rounded-full bg-accent mr-8"></span>
                <span className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wide">
                {skill}
                </span>
            </div>
            ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container px-6 mx-auto" ref={statsRef}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
                <div key={i} className="stat-card flex flex-col items-start border-t border-border pt-6">
                    <stat.icon className="w-8 h-8 text-accent mb-4" />
                    <div className="font-display text-5xl md:text-7xl font-bold mb-2">
                        <span className="stat-num" data-target={stat.value}>0</span>
                        <span className="text-accent">{stat.suffix}</span>
                    </div>
                    <p className="text-muted-foreground font-mono uppercase tracking-widest text-sm font-bold">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMarquee;
