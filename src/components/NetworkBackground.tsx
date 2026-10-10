import { useEffect, useRef } from "react";
import gsap from "gsap";

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Configuration
    const particleCount = prefersReducedMotion ? 40 : 80;
    const connectionDistance = 150;
    const mouseConnectionDistance = 200;
    const baseSpeed = prefersReducedMotion ? 0 : 0.5;

    // State
    const particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 }; // Start far away
    let animationFrameId: number;
    let isVisible = true;

    // Accent color from CSS variables (assumed to be electric lime/blue based on theme)
    // We'll use a generic bright color for now, ideally this would fetch the CSS var
    const particleColor = "rgba(255, 255, 255, 0.15)";
    const lineColor = "rgba(255, 255, 255, 0.05)";
    const highlightColor = "rgba(200, 255, 0, 0.4)"; // The accent color

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * baseSpeed;
        this.vy = (Math.random() - 0.5) * baseSpeed;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        if (prefersReducedMotion) return;

        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw(ctx: CanvasRenderingContext2D, distanceToMouse: number) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (distanceToMouse < mouseConnectionDistance) {
            // Brighten particles near mouse
            const intensity = 1 - distanceToMouse / mouseConnectionDistance;
            ctx.fillStyle = `rgba(200, 255, 0, ${intensity * 0.8})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = highlightColor;
        } else {
            ctx.fillStyle = particleColor;
            ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      }
    }

    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const render = () => {
      if (!isVisible) {
          animationFrameId = requestAnimationFrame(render);
          return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p, index) => {
        p.update();
        
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        p.draw(ctx, distMouse);

        // Draw connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            // Opacity based on distance between particles
            let opacity = 1 - dist / connectionDistance;
            
            // If both particles are near mouse, highlight the connection
            const distMouse2 = Math.sqrt(Math.pow(mouse.x - p2.x, 2) + Math.pow(mouse.y - p2.y, 2));
            if (distMouse < mouseConnectionDistance && distMouse2 < mouseConnectionDistance) {
                // Boost opacity for connections near mouse
                const maxMouseDist = Math.max(distMouse, distMouse2);
                const highlightIntensity = 1 - maxMouseDist / mouseConnectionDistance;
                ctx.strokeStyle = `rgba(200, 255, 0, ${opacity * highlightIntensity * 0.5})`;
            } else {
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.05})`;
            }
            
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event Listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Visibility API to pause animation when tab is inactive
    const handleVisibilityChange = () => {
        isVisible = document.visibilityState === "visible";
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen hidden md:block"
      style={{ willChange: "transform" }}
    />
  );
};

export default NetworkBackground;
