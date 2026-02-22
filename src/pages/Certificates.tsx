import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, ExternalLink, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const certifications = [
    {
        title: "TECHLETIC 4.0 CTF",
        issuer: "Christ College Of Engineering, Irinjalakuda.",
        date: "2023",
        description: "Validated foundational cybersecurity skills by successfully compromising a host system and extracting hidden flags through steganography and advanced security analysis.",
        status: "Completed",
        link: "#",
        icon: Award
    }, {

        title: "CINEHACK AI",
        issuer: "FISAT",
        date: "2025",
        description: "National Level Film-Based Hackathon.",
        status: "Completed",
        link: "#",
        icon: ShieldCheck
    },
    {
        title: "AI Fusion: Exploring Robotics and Artificial Intelligence",
        issuer: "SJCET",
        date: "2024",
        description: "The “AI Fusion” event showcased the integration of robotics, artificial intelligence, and IoT for smart automation and real-time decision-making systems.",
        status: "Completed",
        link: "#",
        icon: FileText

    }, {
        title: "The Joy Of Computing Using Python",
        issuer: "IIT Ropar",
        date: "2025",
        description: "A 30-hour immersive course that builds logical thinking and problem-solving skills through Python programming while inspiring exploration of modern computing.",
        status: "Completed",
        link: "https://media.licdn.com/dms/image/v2/D4E2DAQEsIl6HSVlb9g/profile-treasury-document-images_1280/B4EZiFF0v5HEAU-/1/1754579558616?e=1772668800&v=beta&t=1DNYUbEkjkdM_zZesgn_jx7152jUu5uB4OMmAHe9cZM",
        icon: FileText

    }, {
        title: "Blockchain Foundation Program",
        issuer: "Kerala Blockchain Academy(KBA)",
        date: "7-10-2025",
        description: "An advanced, in-depth blockchain program covering core technologies, architectures, and real-world applications, reinforced through multi-level assessments and comprehensive practical learning.",
        status: "Completed",
        link: "#",
        icon: FileText

    }, {
        title: "AI Fusion: Exploring Robotics and Artificial Intelligence",
        issuer: "SJCET",
        date: "2024",
        description: "The “AI Fusion” event showcased the integration of robotics, artificial intelligence, and IoT for smart automation and real-time decision-making systems.",
        status: "Completed",
        link: "#",
        icon: FileText

    }

];

const skillPages = [
    {
        title: "Security Tools",
        skills: ["Wireshark", "Nmap", "Burp Suite", "Metasploit", "Kali Linux", "Nessus"],
    },
    {
        title: "Programming",
        skills: ["Python", "Bash Scripting", "SQL", "JavaScript", "C/C++", "PowerShell"],
    },
    {
        title: "Core Skills",
        skills: ["Network Security", "Penetration Testing", "Cryptography", "Malware Analysis", "SIEM", "Incident Response"],
    },
];

const Certificates = () => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const nextPage = () => setCurrentPage((prev) => (prev + 1) % skillPages.length);
    const prevPage = () => setCurrentPage((prev) => (prev - 1 + skillPages.length) % skillPages.length);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-32 pb-20">
                <div className="container px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Expertise & <span className="text-gradient">Credentials</span></h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            A comprehensive overview of my technical proficiency and the professional certifications that validate my skills.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto items-start">
                        {/* Certifications - Now Span 2 columns on large screens */}
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Award className="w-8 h-8 text-primary" />
                                Certifications
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group glass-morphism-heavy p-8 border-primary/10 hover-lift flex flex-col h-full"
                                    >
                                        <div className="mb-6 flex justify-between items-start">
                                            <div className="p-4 bg-primary/20 rounded-2xl shadow-[0_0_20px_hsl(var(--primary)/0.2)] text-primary">
                                                <cert.icon className="w-8 h-8" />
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${cert.status === "Completed" ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted text-muted-foreground"
                                                }`}>
                                                {cert.status}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                                        <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">{cert.issuer} • {cert.date}</p>

                                        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                                            {cert.description}
                                        </p>

                                        <div className="pt-6 border-t border-white/5 mt-auto">
                                            <a
                                                href={cert.link}
                                                className="flex items-center justify-center gap-2 w-full py-3 bg-secondary/50 hover:bg-primary hover:text-primary-foreground rounded-xl font-bold transition-all duration-300"
                                            >
                                                View Certificate
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Skills section - Sticky on large screens */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                                Technical Skills
                            </h2>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="glass-morphism-heavy p-8 border-primary/10"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-primary">{skillPages[currentPage].title}</h3>
                                    <div className="flex gap-2">
                                        <button onClick={prevPage} className="p-2 rounded-full hover:bg-primary/20 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                                        <button onClick={nextPage} className="p-2 rounded-full hover:bg-primary/20 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentPage}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="grid grid-cols-1 gap-3"
                                        >
                                            {skillPages[currentPage].skills.map((skill) => (
                                                <div key={skill} className="px-4 py-3 bg-secondary/30 rounded-lg border border-border flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                    <span className="font-medium">{skill}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Certificates;
