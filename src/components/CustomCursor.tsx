import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    // High stiffness and responsive damping for instant zero-lag cursor tracking
    const springX = useSpring(cursorX, { stiffness: 900, damping: 40 });
    const springY = useSpring(cursorY, { stiffness: 900, damping: 40 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            dotX.set(e.clientX);
            dotY.set(e.clientY);
        };

        window.addEventListener("mousemove", move, { passive: true });

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, [cursorX, cursorY, dotX, dotY]);

    // Skip rendering on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches) return null;

    return (
        <>
            {/* Outer ring — ultra fast responsive spring */}
            <motion.div
                style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/70 z-[9998] pointer-events-none mix-blend-difference"
            />
            {/* Inner dot — 1:1 hardware mouse sync */}
            <motion.div
                style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary z-[9999] pointer-events-none"
            />
        </>
    );
};

export default CustomCursor;
