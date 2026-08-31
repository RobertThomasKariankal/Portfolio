import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ModeToggle } from "./ModeToggle";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 50);
      
      // Auto-hide logic can be added here
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, { scope: navRef });

  // Mobile menu animation
  useGSAP(() => {
    if (isMobileMenuOpen) {
      gsap.to(menuRef.current, { height: "auto", opacity: 1, duration: 0.5, ease: "expo.out" });
      gsap.fromTo(".mobile-link", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.1, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isMobileMenuOpen]);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      
      const target = document.querySelector(href);
      if (target) {
          // If using Lenis, this smoothly scrolls natively because Lenis hijacks scroll
          target.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="magnetic font-display text-2xl font-bold tracking-tight">
            R<span className="text-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="magnetic text-sm font-bold uppercase tracking-widest text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pl-6 border-l border-border flex items-center gap-4">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <ModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="md:hidden bg-background overflow-hidden h-0 opacity-0 border-b border-border absolute top-full left-0 right-0"
      >
        <div className="container px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="mobile-link text-2xl font-display font-bold text-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;