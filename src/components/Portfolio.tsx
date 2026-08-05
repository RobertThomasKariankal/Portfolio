import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Filter, Layers } from "lucide-react";
import { ProjectModal, ProjectData } from "./ProjectModal";

const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "Quantum Enhance Secure Communication System",
    category: "cyber",
    description: "Quantum-Resistant Secure Communication System is a future-ready security framework designed to protect digital communication from both current cyber threats and emerging quantum computing risks.",
    longDescription: "Designed and prototyped a Post-Quantum Cryptography (PQC) framework utilizing lattice-based algorithms (CRYSTALS-Kyber key encapsulation & Dilithium digital signatures). Protects data exchange against Harvest Now, Decrypt Later quantum attacks.",
    architecture: [
      "CRYSTALS-Kyber-1024 Key Exchange",
      "Lattice-based Signature Schemes",
      "Hybrid TLS 1.3 Tunneling",
      "Quantum Random Number Generator (QRNG) seed"
    ],
    securityAudits: [
      "Zero-knowledge proof validation",
      "Mitigated Side-Channel Attack vectors",
      "Encrypted end-to-end payload routing"
    ],
    tags: ["Post Quantum Cryptography", "Secure Communication", "Enterprise Security", "Network Security"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop",
    githubUrl: "https://github.com/RobertThomasKariankal",
    liveUrl: "https://github.com/RobertThomasKariankal"
  },
  {
    id: 2,
    title: "Aegis AI",
    category: "ai",
    description: "Aegis is a powerful YouTube comment analysis tool that detects bot comments, harassment, spam, and copyright violations in real-time. Built with Python Flask backend and modern JavaScript frontend.",
    longDescription: "Award-winning CINEHACK AI solution created at FISAT Angamaly. Features intelligent Web Crawler agents that analyze comment sections, identify coordinated bot networks, flag copyright infringing clips, and filter toxic commentary.",
    architecture: [
      "Python Flask Microservices",
      "Fine-tuned BERT NLP Classification",
      "Real-time YouTube API Data Crawlers",
      "Interactive Threat Dashboard"
    ],
    securityAudits: [
      "Automated Bot Network Pattern Recognition",
      "Digital Watermark & Copyright Signature matching",
      "Spam & Harassment Confidence Scoring"
    ],
    tags: ["Illegal piracy detection", "Copyrighted Content Analysis", "Harassment Detection", "Spam Detection"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop",
    githubUrl: "https://github.com/RobertThomasKariankal",
    liveUrl: "https://github.com/RobertThomasKariankal"
  },
  {
    id: 3,
    title: "LinguaAI Platform",
    category: "ai",
    description: "LinguaAI is an AI-powered web platform that enhances English learning through role-based conversational practice, contextual feedback, and voice-enabled interaction, delivering personalized tutoring experiences.",
    longDescription: "An interactive AI learning assistant built with React and LLM API integrations. Conducts scenario-based mock interviews, provides grammar corrections, and analyzes voice tone for ESL learners.",
    architecture: [
      "React + Tailwind SPA Frontend",
      "Speech-to-Text & TTS API Integrations",
      "Role-playing Prompt Context Engine",
      "Real-time Fluency Analytics"
    ],
    securityAudits: [
      "Sanitized Prompt Injection Filters",
      "Session Token Encryption",
      "Strict Privacy-First Audio Stream Processing"
    ],
    tags: ["AI Interview Prep", "Role-based Conversations", "Language Learning", "Voice Interaction"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
    githubUrl: "https://github.com/RobertThomasKariankal",
    liveUrl: "https://github.com/RobertThomasKariankal"
  },
  {
    id: 4,
    title: "Speech & Sentiment Vulnerability Model",
    category: "cyber",
    description: "Large language data model that identifies security vulnerabilities, toxic sentiment, and policy violations in conversational sentences.",
    longDescription: "Mini-project focused on fine-tuning natural language models to detect adversarial prompt attacks, malicious code injection attempts in text forms, and toxic content in web comments.",
    architecture: [
      "Transformer-based Sentiment Classifier",
      "Adversarial Prompt Dataset",
      "Custom Tokenizer & Rule Engine"
    ],
    securityAudits: [
      "Tested against Jailbreak Prompts",
      "SQLi & XSS String Recognition"
    ],
    tags: ["LLM Security", "Sentence Safety", "Miniproject", "Adversarial Prompting"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
    githubUrl: "https://github.com/RobertThomasKariankal",
    liveUrl: "https://github.com/RobertThomasKariankal"
  },
  {
    id: 5,
    title: "EcoPlant E-Commerce App",
    category: "web",
    description: "A modern, responsive web and mobile application for plant enthusiasts with interactive cataloging and smooth checkout experience.",
    longDescription: "Full-stack mobile UI concept focused on slick user experience, fast cart management, dynamic filter search, and clean design system principles.",
    architecture: [
      "React UI Component Library",
      "State Management Store",
      "Optimized SVG Assets & Micro-animations"
    ],
    securityAudits: [
      "PCI-DSS Mock Payment Gateway Validation",
      "Input Sanitization on Search & Checkout"
    ],
    tags: ["UI/UX Design", "React Web App", "E-Commerce", "Responsive Layout"],
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&h=500&fit=crop",
    githubUrl: "https://github.com/RobertThomasKariankal",
    liveUrl: "https://github.com/RobertThomasKariankal"
  }
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "cyber", label: "Cybersecurity & PQC" },
  { id: "ai", label: "AI & ML Systems" },
  { id: "web", label: "Web Applications" },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 relative">
      {/* Background watermark */}
      <div className="watermark-text top-20 left-0">PORTFOLIO</div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Featured Work &amp; Research</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                Cybersecurity &amp; <span className="text-gradient">Tech Portfolio</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Explore projects spanning quantum-resistant cryptography, AI threat mitigation, and secure web platform development.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 bg-secondary/40 p-2 rounded-2xl border border-border w-fit">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-morphism-heavy p-8 hover-lift group border-primary/10 rounded-3xl"
              >
                <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}>
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="w-full lg:w-1/2 overflow-hidden rounded-2xl relative cursor-pointer group/img"
                  >
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                      <span className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-mono font-bold text-xs shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                        Explore Case Study
                      </span>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-72 md:h-[360px] object-cover transition-transform duration-700 group-hover:scale-105 shadow-2xl rounded-2xl"
                    />
                  </div>

                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-semibold uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="font-display text-2xl md:text-3xl font-bold cursor-pointer hover:text-primary transition-colors"
                    >
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-primary font-mono font-bold text-sm hover:underline group/link"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Portfolio;