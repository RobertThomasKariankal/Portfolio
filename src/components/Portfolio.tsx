import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Quantum Enhance Secure Communication System",
    description: "Quantum-Resistant Secure Communication System is a future-ready security framework designed to protect digital communication from both current cyber threats and emerging quantum computing risks.",
    tags: ["Post Quantum Cryptography", "Secure Communication", "Enterprise Security", "Network Security"],
    image: "https://www.nist.gov/sites/default/files/styles/960_x_960_limit/public/images/2023/08/22/PQC_Algo_Pre-standardization-vid.jpg?itok=tpUkOrYt",
  },
  {
    id: 2,
    title: "Aegis",
    description: "Aegis is a powerful YouTube comment analysis tool that detects bot comments, harassment, spam, and copyright violations in real-time. Built with Python Flask backend and modern JavaScript frontend.",
    tags: ["Illegal piracy detection", "Copyrighted Content Analysis", "Harassment Detection", "Spam Detection"],
    image: "https://blog-c01b515e.scoredetect.com/wp-content/uploads/2025/05/image_23c05e989b1642923067ec175f1e287d.jpeg",
  },
  {
    id: 3,
    title: "LinguaAI",
    description: "LinguaAI is an AI-powered web platform that enhances English learning through role-based conversational practice, contextual feedback, and voice-enabled interaction, delivering personalized tutoring experiences.",
    tags: ["AI-powered Interview Preparation", "Role-based conversational practice", "Language Learning", "Personalized tutoring"],
    image: "https://www.mindinventory.com/blog/wp-content/uploads/2020/08/language-learning-app.webp",
  }, {
    id: 4,
    title: "Speech Detection",
    description: "Large Data model That identifies the vulgernous of a sentence.",
    tags: ["LLM", "Miniproject", "Comment Safety"],
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&h=400&fit=crop",
  }, {
    id: 5,
    title: "Plant Shop Mobile App",
    description: "A modern e-commerce mobile application for plant lovers with seamless checkout experience.",
    tags: ["UI/UX Design", "App Design", "Wireframe"],
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&h=400&fit=crop",
  }
];

const Portfolio = () => {
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
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <span className="text-sm font-medium text-primary">My Portfolio</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Let's Have a Look
              <br />
              at <span className="text-gradient">My Portfolio</span>
            </h2>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 w-fit"
            >
              View All Projects
            </a>
          </div>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-morphism-heavy p-8 hover-lift group border-white/5"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110 shadow-2xl"
                  />
                </div>

                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="clay-morphism-primary px-5 py-2 text-xs font-bold uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group/link"
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    <span>View Project</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;