import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Wrench, ChevronLeft, ChevronRight } from "lucide-react";

const certifications = [
  { title: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", status: "In Progress" },
  { title: "CompTIA Security+", issuer: "CompTIA", status: "Planned" },
  { title: "Google Cybersecurity Certificate", issuer: "Google", status: "Completed" },
];

const skillPages = [
  {
    title: "Security Tools",
    skills: ["Wireshark", "Nmap", "Burp Suite", "Metasploit", "Kali Linux", "Nessus"],
  },
  {
    title: "Programming",
    skills: ["Python", "Bash Scripting", "SQL", "JavaScript", "C/C++", "PowerShell"],
  },
  {
    title: "Core Skills",
    skills: ["Network Security", "Penetration Testing", "Cryptography", "Malware Analysis", "SIEM", "Incident Response"],
  },
];

const Journey = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % skillPages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + skillPages.length) % skillPages.length);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background watermark */}
      <div className="watermark-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        SKILLS & CERTS
      </div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <span className="text-sm font-medium text-primary">Certifications & Skills</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            My <span className="text-gradient">Certifications &</span>
            <br />
            <span className="text-gradient">Technical</span> Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-morphism-heavy p-10 border-white/10"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-primary/20 rounded-2xl shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-3xl font-bold">Certifications</h3>
            </div>

            <div className="space-y-8">
              {certifications.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start justify-between gap-6 pb-8 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.issuer}</p>
                  </div>
                  <span className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg ${item.status === "Completed"
                    ? "clay-morphism-primary"
                    : item.status === "In Progress"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-muted/50 text-muted-foreground"
                    }`}>
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills with Sliding Pages */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-morphism-heavy p-10 border-white/10"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/20 rounded-2xl shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-3xl font-bold">Technical Skills</h3>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={nextPage}
                  className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>

            {/* Sliding Content */}
            <div className="relative overflow-hidden min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-primary mb-6">
                    {skillPages[currentPage].title}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {skillPages[currentPage].skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="px-4 py-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                      >
                        <span className="font-medium text-foreground">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Page Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {skillPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === index
                    ? "w-6 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
