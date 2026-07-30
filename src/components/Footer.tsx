import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/work" },
  { label: "Certificates", href: "/certificates" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/connect" },
];

const socials = [
  { icon: Github, href: "https://github.com/RobertThomasKariankal", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/robertthomaskariankal/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:robertthomaskariankal@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 items-start"
        >
          {/* Brand */}
          <div>
            <Link to="/" className="font-display text-2xl font-bold block mb-3">
              Robert<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Cybersecurity student, ethical hacker, and quantum researcher building secure digital futures.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Connect</p>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground group transition-colors"
                >
                  <span className="p-2 bg-secondary rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Robert Thomas Kariankal. All rights reserved.</p>
          <p className="inline-flex items-center gap-1">
            Made with hacks, creativity &amp; <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;