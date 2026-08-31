import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Github, Download } from "lucide-react";
// @ts-ignore
import Splitting from "splitting";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    Splitting({ target: title1Ref.current, by: "chars" });
    Splitting({ target: title2Ref.current, by: "chars" });
    
    const chars1 = title1Ref.current?.querySelectorAll(".char");
    const chars2 = title2Ref.current?.querySelectorAll(".char");

    // Initial Reveal Animation
    const tl = gsap.timeline({ delay: 3 }); // wait for preloader

    if (chars1 && chars2) {
        tl.from([...chars1, ...chars2], {
            yPercent: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.03,
            ease: "expo.out",
        });
    }

    tl.fromTo(imgRef.current, 
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1.5, ease: "power3.inOut" },
        "-=0.8"
    );

    tl.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1");

    // Scroll Animations
    // 1. Parallax Image
    gsap.to(imgRef.current?.querySelector("img") || [], {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });

    // 2. Section Fade out and scale down
    gsap.to(container.current, {
        opacity: 0,
        scale: 0.9,
        y: -100,
        scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
        }
    });

  }, { scope: container });

  return (
    <section 
        id="hero"
        ref={container} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="container px-6 grid lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col z-20">
            <h1 className="font-display font-extrabold uppercase leading-[0.85] tracking-tighter mix-blend-difference text-foreground z-20">
                <div className="text-reveal">
                    <span ref={title1Ref} className="text-[clamp(4rem,10vw,10rem)] block">ROBERT</span>
                </div>
                <div className="text-reveal mt-2 md:mt-0 lg:ml-12">
                    <span ref={title2Ref} className="text-[clamp(4rem,10vw,10rem)] block">THOMAS</span>
                </div>
            </h1>

            <div ref={subRef} className="mt-12 lg:ml-12 max-w-xl">
                <p className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    Cybersecurity Researcher <br/>
                    <span className="text-muted-foreground font-normal">&amp; Creative Developer</span>
                </p>
                <p className="text-muted-foreground/80 mb-8 max-w-md">
                    B.Tech Computer Science &amp; Engineering (Cybersecurity) at SJCET Palai. Building secure digital experiences that push boundaries.
                </p>

                <div className="flex flex-wrap gap-4">
                    <a href="#portfolio" className="btn-primary magnetic" data-magnetic-text="Go">
                        Explore Work
                    </a>
                    <a href="/Robert_Thomas_Resume.pdf" download className="btn-outline magnetic" data-magnetic-text="Get">
                        <Download className="w-4 h-4" /> CV
                    </a>
                    <a href="https://github.com/RobertThomasKariankal" target="_blank" rel="noopener noreferrer" className="btn-outline magnetic !p-4" data-magnetic-text="GitHub">
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>

        {/* Image Parallax Mask */}
        <div className="lg:col-span-5 absolute lg:relative inset-0 lg:inset-auto h-[60vh] lg:h-[80vh] opacity-20 lg:opacity-100 -z-10 lg:z-10 pointer-events-none">
            <div ref={imgRef} className="w-full h-full overflow-hidden rounded-3xl" style={{ clipPath: "inset(100% 0 0 0)" }}>
                {/* Fallback placeholder while user uploads real image */}
                <img 
                    src="/images/robert-portrait.jpg" 
                    alt="Robert Thomas"
                    className="w-full h-[120%] object-cover object-center"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=1200&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay"></div>
            </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-muted-foreground">Scroll</span>
          <ArrowDown className="w-4 h-4 text-accent animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;