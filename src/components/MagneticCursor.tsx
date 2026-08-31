import { useEffect, useRef } from "react";
import gsap from "gsap";

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Hide native cursor only for fine pointer devices, fallback via CSS
    
    // QuickTo for high performance tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.15,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.15,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Add magnetic hover effects
    const links = document.querySelectorAll<HTMLElement>("a, button, .magnetic, [data-magnetic]");

    links.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        // Expand cursor
        gsap.to(cursorRef.current, {
          width: 64,
          height: 64,
          backgroundColor: "transparent",
          border: "1px solid var(--accent)",
          duration: 0.3,
        });
        
        if (textRef.current && (link.hasAttribute("data-magnetic-text") || link.tagName === 'A')) {
          textRef.current.innerText = link.getAttribute("data-magnetic-text") || "View";
          gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
        }
      });

      link.addEventListener("mouseleave", () => {
        // Reset cursor
        gsap.to(cursorRef.current, {
          width: 16,
          height: 16,
          backgroundColor: "var(--accent)",
          border: "none",
          duration: 0.3,
        });
        
        if (textRef.current) {
          gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
          setTimeout(() => {
             if(textRef.current) textRef.current.innerText = "";
          }, 200);
        }
      });
      
      // Magnetic pull effect on the element itself
      if (link.classList.contains('magnetic')) {
          link.addEventListener("mousemove", (e) => {
            const rect = link.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            
            gsap.to(link, {
                x, y, duration: 0.3, ease: "power2.out"
            });
          });
          
          link.addEventListener("mouseleave", () => {
             gsap.to(link, {
                 x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)"
             });
          });
      }
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:flex"
      style={{
        boxShadow: "0 0 10px var(--accent)",
      }}
    >
        <span ref={textRef} className="text-[10px] font-mono font-bold text-accent opacity-0 pointer-events-none"></span>
    </div>
  );
};

export default MagneticCursor;
