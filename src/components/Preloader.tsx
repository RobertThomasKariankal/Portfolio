import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const name = "Robert";
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1000); // Wait for exit animation
        }, 2800); // Show name for 2.8s

        return () => clearTimeout(timer);
    }, [onComplete]);

    const containerVariants: Variants = {
        exit: {
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    };

    const letterVariants: Variants = {
        initial: { y: 100, opacity: 0 },
        animate: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: 0.1 * i,
                ease: [0.6, 0.01, 0.05, 0.95],
            }
        })
    };

    return (
        <motion.div
            variants={containerVariants}
            exit="exit"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background pointer-events-none"
        >
            <div className="overflow-hidden flex gap-1 md:gap-2">
                {name.split("").map((letter, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        initial="initial"
                        animate="animate"
                        className="text-7xl md:text-[10rem] font-bold tracking-tighter text-gradient px-1"
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="mt-4 w-24 md:w-32 h-[1px] bg-primary/20 origin-left"
            />
        </motion.div>
    );
};

export default Preloader;
