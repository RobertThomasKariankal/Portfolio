import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Rocket, Briefcase, GraduationCap, Calendar } from "lucide-react";

interface TimelineItem {
    title: string;
    organization: string;
    date: string;
    description: string;
    type: "work" | "education";
}

const experiences: TimelineItem[] = [
    {
        title: "Cybersecurity Internship",
        organization: "Tech Defense Solutions",
        date: "2024 - Present",
        description: "Conducting vulnerability assessments and assisting in incident response training.",
        type: "work",
    },
    {
        title: "B.Tech in Computer Science (Cybersecurity)",
        organization: "Global University of Engineering",
        date: "2021 - Present",
        description: "Focusing on ethical hacking, cryptography, and network security protocols.",
        type: "education",
    },
    {
        title: "Freelance Web Pen-tester",
        organization: "Various Clients",
        date: "2022 - 2023",
        description: "Performed security audits for small to medium scale web applications.",
        type: "work",
    },
    {
        title: "Security Bootcamp",
        organization: "Cyber Academy",
        date: "2021",
        description: "Intensive 6-month program covering basic to advanced security concepts.",
        type: "education",
    },
];

const ExperienceTimeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Animated Y position for the rocket
    const rocketY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto py-20 relative">
            {/* Central Dotted Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden hidden md:block">
                <div className="h-full w-full border-l-2 border-dashed border-primary/30" />

                {/* The Rocket Path Progress */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-primary origin-top"
                    style={{ height: rocketY }}
                />

                {/* Paper Rocket Icon */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 z-20 text-primary"
                    style={{ top: rocketY, y: "-50%" }}
                >
                    <div className="bg-background p-2 rounded-full border border-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
                        <Rocket className="w-6 h-6 rotate-180" />
                    </div>
                </motion.div>
            </div>

            <div className="space-y-24">
                {experiences.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                    >
                        {/* Content Card */}
                        <div className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                            <div className="glass-morphism-heavy p-8 hover-lift border-primary/10">
                                <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                        {item.type === "work" ? <Briefcase className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                                    </div>
                                    <span className="text-sm font-bold text-primary tracking-widest uppercase">{item.type}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                <p className="text-lg font-medium text-foreground/80 mb-4">{item.organization}</p>
                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                                <div className={`mt-6 flex items-center gap-2 text-primary/80 font-medium ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                    <Calendar className="w-4 h-4" />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Spacer for center line */}
                        <div className="hidden md:block w-10 h-10 bg-primary/20 rounded-full border-4 border-background z-10 shadow-[0_0_15px_hsl(var(--primary)/0.3)]" />

                        {/* Empty space for the other side */}
                        <div className="hidden md:block md:w-[45%]" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceTimeline;
