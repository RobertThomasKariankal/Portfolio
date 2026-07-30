import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Terminal, ArrowLeft, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const terminalLines = [
    { text: "$ ping unknown.target", type: "cmd" },
    { text: "> Request timeout for icmp_seq 404", type: "error" },
    { text: "$ nmap -sV target.host", type: "cmd" },
    { text: "> ERROR: Host not found (0 hosts up)", type: "error" },
    { text: "$ whoami", type: "cmd" },
    { text: "> unauthorized_visitor", type: "warn" },
    { text: "$ ls -la /pages/this_page/", type: "cmd" },
    { text: "> ls: cannot access: No such file or directory", type: "error" },
    { text: "$ sudo find / -name 'this_page' 2>/dev/null", type: "cmd" },
    { text: "> [404] Page does not exist in this dimension.", type: "error" },
    { text: "$ echo 'Navigate back to safety...'", type: "cmd" },
    { text: "> Navigate back to safety...", type: "success" },
];

const lineColors: Record<string, string> = {
    cmd: "text-primary",
    error: "text-red-400/80",
    warn: "text-yellow-400/80",
    success: "text-green-400",
};

const NotFound = () => {
    const location = useLocation();
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.error("404 Error: Non-existent route:", location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        if (visibleCount >= terminalLines.length) return;
        const t = setTimeout(() => setVisibleCount((v) => v + 1), 160);
        return () => clearTimeout(t);
    }, [visibleCount]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl w-full"
                >
                    {/* Giant 404 */}
                    <div className="text-center mb-10 relative">
                        <div className="watermark-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[16rem]">
                            404
                        </div>
                        <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                            className="relative z-10 inline-flex flex-col items-center"
                        >
                            <div className="p-5 bg-primary/20 rounded-full border border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.3)] mb-4">
                                <Shield className="w-12 h-12 text-primary" />
                            </div>
                            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-gradient">
                                404
                            </h1>
                            <p className="text-muted-foreground mt-2 text-lg">
                                Access Denied — Page Not Found
                            </p>
                        </motion.div>
                    </div>

                    {/* Terminal window */}
                    <div className="glass-morphism-heavy border-primary/20 overflow-hidden rounded-2xl mb-8">
                        {/* Traffic-light header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/15 bg-primary/5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <div className="flex items-center gap-2 ml-2">
                                <Terminal className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-mono text-muted-foreground">
                                    bash — robert@kali:~$
                                </span>
                            </div>
                        </div>

                        {/* Lines */}
                        <div className="p-6 font-mono text-sm space-y-1.5 min-h-[240px]">
                            {terminalLines.slice(0, visibleCount).map((line, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className={lineColors[line.type]}
                                >
                                    {line.text}
                                </motion.p>
                            ))}
                            {visibleCount < terminalLines.length && (
                                <span className="inline-block w-2 h-[1em] bg-primary/80 align-middle animate-pulse" />
                            )}
                        </div>
                    </div>

                    {/* Back button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-105"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return to Home Base
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;
