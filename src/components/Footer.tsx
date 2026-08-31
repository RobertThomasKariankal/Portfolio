import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

const Footer = () => {
  const lenis = useLenis();

  const handleBackToTop = () => {
    if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background relative z-10 border-t border-border pt-12 pb-8 overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display font-bold text-xl mb-1">Robert Thomas<span className="text-accent">.</span></span>
            <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <button 
            onClick={handleBackToTop}
            className="magnetic flex flex-col items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors"
            data-magnetic-text="Top"
          >
            <div className="p-3 rounded-full bg-secondary group-hover:bg-accent group-hover:text-background transition-colors">
                <ArrowUp className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest">Back to top</span>
          </button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;