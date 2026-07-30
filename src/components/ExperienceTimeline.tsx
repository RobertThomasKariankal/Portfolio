import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Rocket, Briefcase, GraduationCap, Calendar, Heart } from "lucide-react";

interface TimelineItem {
    title: string;
    organization: string;
    date: string;
    description: string;
    type: "work" | "education" | "Volunteer";
    /** Drop your image into public/images/ and set the filename here, e.g. "quantum.jpg" */
    image?: string;
}

const experiences: TimelineItem[] = [
    {
        title: "Quantum Researcher",
        organization: "Personal Project",
        date: "2025 - Present",
        description: "Improvising Quantum Enhanced Secure Communication Systems.",
        type: "work",
        image: "exp-quantum.jpg",
    },
    {
        title: "CINEHACK AI",
        organization: "Federal Institute of Science And Technology (FISAT), Angamaly",
        date: "2025",
        description: "Created Aegis — solved online harassment and illegal piracy of original content using Advanced AI Detection and Crawlers.",
        type: "education",
        image: "exp-cinehack.jpg",
    },
    {
        title: "NRPF Unit Coordinator",
        organization: "National Service Scheme (NSS), SJCET",
        date: "2024 - 2025",
        description: "NRPF is a flagship NSS Kerala environmental initiative that mobilizes student volunteers to lead afforestation, waste management, water conservation, and sustainability actions across campuses and communities.",
        type: "Volunteer",
        image: "exp-nss.jpg",
    },
    {
        title: "B.Tech in Computer Science (Cybersecurity)",
        organization: "St Joseph's College of Engineering And Technology, Palai",
        date: "2023 - Present",
        description: "Focusing on ethical hacking, cryptography, and network security protocols.",
        type: "education",
        image: "exp-btech.jpg",
    },
    {
        title: "Freelance Web Pen-tester",
        organization: "Various Clients",
        date: "2023 - 2025",
        description: "Performed security audits for small to medium scale web applications.",
        type: "work",
        image: "exp-pentest.jpg",
    },
    {
        title: "Security Bootcamp",
        organization: "Edwhere",
        date: "2024",
        description: "Intensive 6-month program covering basic to advanced security concepts.",
        type: "education",
        image: "exp-bootcamp.jpg",
    },
];

const typeIcon = (type: TimelineItem["type"]) => {
    if (type === "work") return <Briefcase className="w-5 h-5" />;
    if (type === "Volunteer") return <Heart className="w-5 h-5" />;
    return <GraduationCap className="w-5 h-5" />;
};

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
        <div ref={containerRef} className="max-w-5xl mx-auto py-20 relative">
            {/* Central Dotted Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden hidden md:block">
                <div className="h-full w-full border-l-2 border-dashed border-primary/30" />

                <motion.div
                    className="absolute top-0 left-0 w-full bg-primary origin-top"
                    style={{ height: rocketY }}
                />

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
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        viewport={{ once: true, margin: "-80px" }}
                        className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-0 ${
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                    >
                        {/* ── Content Card ────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                            className={`w-full md:w-[45%] flex flex-col ${
                                index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                            }`}
                        >
                            <div className="glass-morphism-heavy p-8 hover-lift border-primary/10 group h-full flex flex-col justify-between">
                                <div>
                                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                        <div className="p-2 bg-primary/20 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            {typeIcon(item.type)}
                                        </div>
                                        <span className="text-xs font-bold text-primary tracking-widest uppercase border border-primary/30 px-3 py-1 rounded-full">
                                            {item.type}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-base font-medium text-foreground/70 mb-3">{item.organization}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                </div>

                                <div className={`mt-6 flex items-center gap-2 text-primary/80 font-medium text-sm ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Center dot ──────────────────────── */}
                        <div className="hidden md:flex items-center justify-center w-12 flex-shrink-0 z-10">
                            <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />
                        </div>

                        {/* ── Image Panel ─────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            viewport={{ once: true }}
                            className={`w-full md:w-[45%] group ${
                                index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                            }`}
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-primary/20 shadow-[0_8px_40px_hsl(var(--primary)/0.12)] aspect-[4/3] bg-primary/5">
                                {item.image ? (
                                    <>
                                        <img
                                            src={`/images/${item.image}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                img.style.display = "none";
                                                const fb = img.parentElement?.querySelector(".img-fallback") as HTMLElement;
                                                if (fb) fb.style.display = "flex";
                                            }}
                                        />
                                        {/* Fallback (shown by JS if image 404s) */}
                                        <div className="img-fallback hidden w-full h-full absolute inset-0 flex-col items-center justify-center">
                                            <div className="relative flex items-center justify-center mb-4">
                                                <div className="absolute w-20 h-20 rounded-full border border-primary/20 animate-ping" />
                                                <div className="absolute w-14 h-14 rounded-full border border-primary/30" />
                                                <div className="p-4 bg-primary/20 rounded-full text-primary z-10">{typeIcon(item.type)}</div>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground font-mono text-center px-6 leading-relaxed">
                                                Drop <span className="text-primary font-semibold">{item.image}</span><br />
                                                into <span className="text-primary font-semibold">public/images/</span>
                                            </p>
                                        </div>
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                        <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <span className="bg-primary text-primary-foreground px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                {item.type}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                        <div className="relative flex items-center justify-center mb-4">
                                            <div className="absolute w-24 h-24 rounded-full border border-primary/15 animate-ping" />
                                            <div className="absolute w-16 h-16 rounded-full border border-primary/25" />
                                            <div className="p-5 bg-primary/20 rounded-full text-primary z-10">{typeIcon(item.type)}</div>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground font-mono text-center px-6">
                                            Add your photo here
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceTimeline;
