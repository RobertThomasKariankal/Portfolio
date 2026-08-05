import { useEffect, useRef } from "react";

const MouseTrail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize, { passive: true });

        type Particle = { x: number; y: number; life: number; size: number; vx: number; vy: number };
        const particles: Particle[] = [];
        let animId: number;

        const onMove = (e: MouseEvent) => {
            // Lightweight 1 particle per mousemove frame for fluid performance
            particles.push({
                x: e.clientX,
                y: e.clientY,
                life: 1,
                size: 2 + Math.random() * 2,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
            });
            if (particles.length > 25) particles.shift();
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life -= 0.05;
                p.x += p.vx;
                p.y += p.vy;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(104, 144, 208, ${p.life * 0.4})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        draw();

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[9996] pointer-events-none"
            aria-hidden="true"
        />
    );
};

export default MouseTrail;
