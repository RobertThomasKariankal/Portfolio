import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  stagger?: boolean; // When true, parent stagger controls this, so we don't apply ScrollTrigger here
}

export const Reveal = ({ children, delay = 0, className = "", stagger = false }: RevealProps) => {
  const comp = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // If it's part of a stagger group, the parent handles the animation
    if (stagger) return;

    // Standard reveal
    gsap.from(comp.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: comp.current,
        start: "top 85%", // Triggers when top of element hits 85% from top of viewport
        toggleActions: "play none none none", // Play once
      },
    });
  }, { scope: comp });

  return (
    <div ref={comp} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
};

export default Reveal;
