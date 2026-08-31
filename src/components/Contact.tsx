import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
// @ts-ignore
import Splitting from "splitting";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(() => {
    Splitting({ target: titleRef.current, by: "chars" });
    const chars = titleRef.current?.querySelectorAll(".char");

    // Title reveal
    if (chars) {
        gsap.from(chars, {
            yPercent: 120,
            opacity: 0,
            duration: 1,
            stagger: 0.02,
            ease: "expo.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });
    }

    // Form slide up
    gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
        }
    });

    // Socials stagger
    gsap.from(".social-link", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
        }
    });

  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="min-h-screen bg-background relative z-10 flex items-center pt-24 pb-12">
      <div className="container px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Content */}
            <div>
                <h2 className="font-display font-extrabold uppercase leading-[0.85] tracking-tighter text-[clamp(3rem,8vw,8rem)] text-foreground mb-8">
                    <div className="text-reveal">
                        <span ref={titleRef} className="block">LET'S WORK</span>
                    </div>
                    <div className="text-reveal text-accent ml-2 md:ml-8">
                        <span className="block">TOGETHER</span>
                    </div>
                </h2>

                <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-md">
                    Have a project in mind or want to discuss security? Drop me a message.
                </p>

                <div className="space-y-6">
                    <div>
                        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-2">Email</p>
                        <a href="mailto:robertthomaskariankal@gmail.com" className="text-xl md:text-2xl font-bold text-foreground hover:text-accent transition-colors magnetic" data-magnetic-text="Email">
                            robertthomaskariankal@gmail.com
                        </a>
                    </div>
                    <div>
                        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-2">Location</p>
                        <p className="text-xl font-bold text-foreground">
                            Pala, Kerala, India
                        </p>
                    </div>
                    
                    <div className="pt-8 flex gap-6">
                        <a href="https://github.com/RobertThomasKariankal" target="_blank" rel="noopener noreferrer" className="social-link magnetic p-3 bg-secondary rounded-full hover:bg-accent hover:text-background transition-colors" data-magnetic-text="GitHub">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com/in/robertthomaskariankal" target="_blank" rel="noopener noreferrer" className="social-link magnetic p-3 bg-secondary rounded-full hover:bg-accent hover:text-background transition-colors" data-magnetic-text="LinkedIn">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="mailto:robertthomaskariankal@gmail.com" className="social-link magnetic p-3 bg-secondary rounded-full hover:bg-accent hover:text-background transition-colors" data-magnetic-text="Email">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Right Content - Form */}
            <div className="relative">
                {/* Background decorative element */}
                <div className="absolute inset-0 bg-accent/5 rounded-3xl -rotate-3 scale-[1.02] -z-10"></div>
                
                <form ref={formRef} action="https://formspree.io/f/mqkopwvd" method="POST" className="card-surface p-8 md:p-12 relative z-0">
                    <div className="space-y-8">
                        <div>
                            <label htmlFor="name" className="form-label">01. What's your name?</label>
                            <input type="text" id="name" name="name" required placeholder="John Doe *" className="form-input" />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="form-label">02. What's your email?</label>
                            <input type="email" id="email" name="email" required placeholder="john@example.com *" className="form-input" />
                        </div>
                        
                        <div>
                            <label htmlFor="message" className="form-label">03. How can I help?</label>
                            <textarea id="message" name="message" required placeholder="Tell me about your project... *" rows={4} className="form-input resize-none"></textarea>
                        </div>
                        
                        <button type="submit" className="btn-primary w-full magnetic" data-magnetic-text="Send">
                            Send Message <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;