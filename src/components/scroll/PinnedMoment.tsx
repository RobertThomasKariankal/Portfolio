import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PinnedMomentProps {
  children: React.ReactNode;
  scrollHeight?: string; // e.g., "300vh"
  className?: string;
}

const PinnedMoment = ({
  children,
  scrollHeight = "300vh",
  className = "",
}: PinnedMomentProps) => {
  const container = useRef<HTMLDivElement>(null);
  const pinContent = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin the content while the container scrolls
    ScrollTrigger.create({
      trigger: container.current,
      pin: pinContent.current,
      start: "top top",
      end: `+=${scrollHeight}`,
      // Optionally add scrub animations here based on scroll progress
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ height: scrollHeight }} className={className}>
      <div ref={pinContent} className="h-screen w-full flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default PinnedMoment;
