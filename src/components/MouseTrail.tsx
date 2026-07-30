import { useEffect, useRef } from "react";

const MouseTrail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        type Particle = { x: number; y: number; life: number; size: number; vx: number; vy: number };
        const particles: Particle[] = [];
        let animId: number;

        const onMove = (e: MouseEvent) => {
            for (let i = 0; i < 4; i++) {
                particles.push({
                    x: e.clientX + (Math.random() - 0.5) * 12,
                    y: e.clientY + (Math.random() - 0.5) * 12,
                    life: 1,
                    size: 1.5 + Math.random() * 2.5,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life -= 0.035;
                p.x += p.vx;
                p.y += p.vy;

                if (p.life <= 0) { particles.splice(i, 1); continue; }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                // Use a fixed HSL value that matches the primary colour
                ctx.fillStyle = `rgba(100, 140, 220, ${p.life * 0.55})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        window.addEventListener("mousemove", onMove);
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
