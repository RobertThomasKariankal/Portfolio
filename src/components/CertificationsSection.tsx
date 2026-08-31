import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    date: "2025",
    link: "#",
  },
  {
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2024",
    link: "#",
  },
  {
    title: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2024",
    link: "#",
  },
  {
    title: "Google Cybersecurity Professional",
    issuer: "Google / Coursera",
    date: "2023",
    link: "#",
  }
];

const CertificationsSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".cert-card");
    
    // Initial state: stacked
    gsap.set(cards, {
        y: (i) => i * 10,
        scale: (i) => 1 - (i * 0.05),
        zIndex: (i) => cards.length - i,
        transformOrigin: "top center",
    });

    // Scroll animation: fan out into grid
    gsap.to(cards, {
        y: 0,
        scale: 1,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
        }
    });
    
    // Magnetic Hover / Tilt effect on cards
    cards.forEach((card: any) => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPct = x / rect.width - 0.5;
            const yPct = y / rect.height - 0.5;
            
            gsap.to(card, {
                rotateX: yPct * -10,
                rotateY: xPct * 10,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000,
            });
        });
        
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        });
    });

  }, { scope: containerRef });

  return (
    <section id="certifications" ref={containerRef} className="section-padding bg-background relative z-10">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                    Certifications
                </h2>
                <p className="text-muted-foreground text-lg">
                    Professional credentials validating expertise in security and cloud.
                </p>
            </div>
            <div className="text-6xl font-display font-bold text-accent/20 leading-none pointer-events-none select-none">
                06
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {certificates.map((cert, i) => (
                <div key={i} className="cert-card w-full">
                    <div className="card-surface p-8 h-full flex flex-col items-start cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Award className="w-6 h-6 text-accent" />
                        </div>
                        
                        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {cert.title}
                        </h3>
                        
                        <div className="mt-auto pt-6 w-full">
                            <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">
                                {cert.issuer}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground font-bold">{cert.date}</span>
                                <a href={cert.link} className="magnetic text-accent p-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity" data-magnetic-text="Verify">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
