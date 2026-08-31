import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
// @ts-ignore
import Splitting from "splitting";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // Initialize splitting
    Splitting({ target: textRef.current, by: "chars" });
    
    const chars = textRef.current?.querySelectorAll(".char");
    
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Animate text characters up
    if (chars) {
        tl.from(chars, {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.05,
        delay: 0.2,
        });
    }

    // Animate counter
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].val));
      }
    }, "<"); // start at same time as text

    // Exit animation (Curtain wipe up)
    tl.to(textRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in"
    }, "+=0.5");
    
    tl.to(counterRef.current, {
        opacity: 0,
        duration: 0.4
    }, "<");

    tl.to(container.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    }, "<0.2");
    
  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-[#f5f0eb]"
    >
      <div className="overflow-hidden flex items-center justify-center">
        <h1 
          ref={textRef} 
          className="text-5xl md:text-8xl lg:text-[10rem] font-bold font-display uppercase tracking-tighter"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          Robert Thomas
        </h1>
      </div>
      
      <div 
        ref={counterRef}
        className="absolute bottom-10 right-10 text-4xl md:text-6xl font-mono font-bold text-accent"
      >
        {progress}%
      </div>
    </div>
  );
};

export default Preloader;
