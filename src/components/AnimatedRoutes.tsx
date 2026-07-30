import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "@/pages/Index";
import Work from "@/pages/Work";
import Certificates from "@/pages/Certificates";
import Experience from "@/pages/Experience";
import Connect from "@/pages/Connect";
import NotFound from "@/pages/NotFound";

const pageVariants = {
    initial: { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -18, filter: "blur(6px)" },
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ minHeight: "100vh" }}
            >
                <Routes location={location}>
                    <Route path="/" element={<Index />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/connect" element={<Connect />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
