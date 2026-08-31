import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  // Sync Lenis with GSAP ScrollTrigger
  useGSAP(() => {
    // ScrollTrigger is automatically synced when using lenis/react according to newer docs,
    // but just to ensure it refreshes on load
    ScrollTrigger.refresh();
  });

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
