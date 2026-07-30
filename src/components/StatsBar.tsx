import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Code2, FolderGit2, Award } from "lucide-react";

const stats = [
    { icon: FolderGit2, value: 5, label: "Projects Built", suffix: "+" },
    { icon: Shield, value: 6, label: "Certifications", suffix: "" },
    { icon: Code2, value: 4, label: "Years Coding", suffix: "+" },
    { icon: Award, value: 2, label: "Hackathons", suffix: "" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(current);
            if (current >= target) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
};

const StatsBar = () => (
    <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 border-y border-primary/10" />
        <div className="container px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map(({ icon: Icon, value, label, suffix }, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="p-3 bg-primary/15 rounded-2xl mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.1)] group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
                            <Icon className="w-6 h-6" />
                        </div>
                        <p className="text-3xl md:text-4xl font-extrabold font-display text-gradient mb-1">
                            <Counter target={value} suffix={suffix} />
                        </p>
                        <p className="text-sm text-muted-foreground font-medium tracking-wide">{label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default StatsBar;
