import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Search, Binary } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { useCyberUi } from "@/context/CyberUiContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/work" },
  { label: "Certificates", href: "/certificates" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/connect" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openTerminal, openCommandPalette, isMatrixActive, toggleMatrix } = useCyberUi();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-2 left-4 right-4 z-50 transition-all duration-500 rounded-2xl ${
        isScrolled ? "glass-morphism-heavy py-1" : "bg-transparent py-2"
      }`}
    >
      <div className="container px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl font-bold flex items-center gap-1">
            Robert<span className="text-primary">.</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest hidden sm:inline-block ml-1">
              SEC-OPS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href ? "text-primary font-bold" : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <button
                onClick={openCommandPalette}
                title="Search & Commands (Ctrl+K)"
                className="p-2 rounded-xl bg-secondary/60 hover:bg-primary/20 hover:text-primary transition-all text-xs font-mono flex items-center gap-1.5 border border-border"
              >
                <Search className="w-4 h-4" />
                <span className="text-[11px] font-bold text-muted-foreground hidden lg:inline">⌘K</span>
              </button>

              <button
                onClick={openTerminal}
                title="Open Cyber CLI Terminal"
                className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all border border-cyan-500/30 flex items-center gap-1.5 text-xs font-mono font-bold"
              >
                <Terminal className="w-4 h-4" />
                <span className="hidden lg:inline">&gt;_ CLI</span>
              </button>

              <button
                onClick={toggleMatrix}
                title="Toggle Matrix Digital Rain"
                className={`p-2 rounded-xl transition-all border text-xs font-mono ${
                  isMatrixActive
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    : "bg-secondary/60 hover:bg-primary/20 hover:text-primary border-border"
                }`}
              >
                <Binary className="w-4 h-4" />
              </button>

              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={openTerminal}
              className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
            >
              <Terminal className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden rounded-b-2xl"
          >
            <div className="container px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <ModeToggle />
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCommandPalette();
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold"
                >
                  Command Palette (⌘K)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;