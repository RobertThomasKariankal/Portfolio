import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const roles = [
    "Cybersecurity Student",
    "Ethical Hacker",
    "Quantum Researcher",
    "Web Pen-tester",
    "Security Enthusiast",
];

const TypingText = () => {
    const [roleIdx, setRoleIdx] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [charIdx, setCharIdx] = useState(0);

    useEffect(() => {
        const current = roles[roleIdx];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx((c) => c + 1), 70);
        } else if (!deleting && charIdx === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx((c) => c - 1), 40);
        } else if (deleting && charIdx === 0) {
            setDeleting(false);
            setRoleIdx((r) => (r + 1) % roles.length);
        }

        setDisplayed(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, roleIdx]);

    return (
        <span className="text-muted-foreground/60">
            {displayed}
            <span className="inline-block w-[2px] h-[0.85em] bg-primary align-middle ml-0.5 animate-pulse" />
        </span>
    );
};

// Floating particle dots
const Particle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
    <motion.div
        className="absolute bg-primary rounded-full"
        style={{ left: x, top: y, width: size, height: size }}
        animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    />
);

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Cyber grid background */}
            <div
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Radial spotlight */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,hsl(var(--primary)/0.08),transparent_70%)]" />

            {/* Background watermark */}
            <div className="watermark-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                CREATIVE
            </div>

            {/* Floating particles */}
            <Particle delay={0} x="8%" y="20%" size={6} />
            <Particle delay={1} x="88%" y="15%" size={9} />
            <Particle delay={2} x="75%" y="70%" size={5} />
            <Particle delay={0.5} x="15%" y="75%" size={7} />
            <Particle delay={1.5} x="50%" y="10%" size={4} />
            <Particle delay={2.5} x="93%" y="55%" size={6} />

            <div className="container relative z-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-card mb-8 border-primary/20"
                    >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm font-medium text-primary tracking-wide uppercase">
                            Open to internships &amp; collaborations
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-4 leading-[1.05]"
                    >
                        Hi, I'm{" "}
                        <span className="text-gradient drop-shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
                            Robert
                        </span>
                    </motion.h1>

                    {/* Typing subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold mb-6 h-12 flex items-center justify-center font-display"
                    >
                        <TypingText />
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.8 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        B.Tech Computer Science &amp; Engineering (Cybersecurity) at SJCET Palai.
                        Passionate about ethical hacking, quantum cryptography, and building
                        secure digital systems that matter.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link
                            to="/work"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-105 text-base"
                        >
                            View My Work
                        </Link>

                        <a
                            href="/Robert_Thomas_Resume.pdf"
                            download
                            className="inline-flex items-center gap-2 px-8 py-4 glass-card border-primary/30 font-semibold rounded-full hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 hover:scale-105 text-base"
                        >
                            <Download className="w-4 h-4" />
                            Download CV
                        </a>

                        <a
                            href="https://github.com/RobertThomasKariankal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 glass-card border-border font-semibold rounded-full hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 hover:scale-105 text-base"
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3, duration: 0.6 }}
                        className="flex flex-col items-center gap-2 text-muted-foreground"
                    >
                        <span className="text-xs font-mono tracking-widest uppercase">Scroll down</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowDown className="w-4 h-4 text-primary" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;