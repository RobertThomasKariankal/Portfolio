import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    const springX = useSpring(cursorX, { stiffness: 120, damping: 20 });
    const springY = useSpring(cursorY, { stiffness: 120, damping: 20 });

    const isHovering = useRef(false);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            dotX.set(e.clientX);
            dotY.set(e.clientY);
        };

        const enterLink = () => { isHovering.current = true; };
        const leaveLink = () => { isHovering.current = false; };

        window.addEventListener("mousemove", move);
        document.querySelectorAll("a,button").forEach((el) => {
            el.addEventListener("mouseenter", enterLink);
            el.addEventListener("mouseleave", leaveLink);
        });

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, [cursorX, cursorY, dotX, dotY]);

    // Only render on desktop
    if (typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches) return null;

    return (
        <>
            {/* Outer ring — spring-lagged */}
            <motion.div
                style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
                className="fixed top-0 left-0 w-9 h-9 rounded-full border border-primary/60 z-[9998] pointer-events-none mix-blend-difference"
            />
            {/* Inner dot — instant */}
            <motion.div
                style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9999] pointer-events-none"
            />
        </>
    );
};

export default CustomCursor;
