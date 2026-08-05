import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command?: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "welcome",
      output: (
        <div className="space-y-1 text-xs md:text-sm font-mono">
          <p className="text-emerald-400 font-bold">
            [+] SEC-OPS CLI v2.4.0 — Cybersecurity Terminal Interface
          </p>
          <p className="text-muted-foreground">
            Type <span className="text-cyan-400 font-bold">'help'</span> to view available security commands. Press <span className="text-cyan-400 font-bold">'ESC'</span> to exit.
          </p>
        </div>
      ),
    },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    let response: React.ReactNode;

    switch (lower) {
      case "help":
        response = (
          <div className="space-y-1 font-mono text-xs md:text-sm text-foreground/90">
            <p className="text-cyan-400 font-semibold mb-2">Available Security & Info Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2">
              <p><span className="text-emerald-400 font-bold">whoami</span> — Brief bio & status</p>
              <p><span className="text-emerald-400 font-bold">skills</span> — Security & dev tech stack</p>
              <p><span className="text-emerald-400 font-bold">projects</span> — Featured research & apps</p>
              <p><span className="text-emerald-400 font-bold">certs</span> — CTF & security credentials</p>
              <p><span className="text-emerald-400 font-bold">nmap</span> — Run simulated port scan</p>
              <p><span className="text-emerald-400 font-bold">contact</span> — Reach out / Social links</p>
              <p><span className="text-emerald-400 font-bold">matrix</span> — Digital rain visualizer</p>
              <p><span className="text-emerald-400 font-bold">clear</span> — Clear console history</p>
              <p><span className="text-emerald-400 font-bold">exit</span> — Close CLI session</p>
            </div>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="font-mono text-xs md:text-sm space-y-1 text-foreground/90">
            <p className="text-cyan-400 font-bold">&gt; USER IDENTIFIED: Robert Thomas Kariankal</p>
            <p>&gt; Role: Cybersecurity Student, Ethical Hacker, Quantum Researcher</p>
            <p>&gt; Education: B.Tech CSE (Cybersecurity) @ SJCET Palai</p>
            <p>&gt; Specialization: Web Penetration Testing, Post-Quantum Cryptography (PQC), AI Security</p>
            <p className="text-emerald-400">&gt; Status: Open for Internships & Security Research Collaborations</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="font-mono text-xs md:text-sm space-y-2 text-foreground/90">
            <p className="text-cyan-400 font-bold">[+] SECURITY & DEVOPS TECH STACK:</p>
            <p><span className="text-emerald-400">Tools:</span> Wireshark, Nmap, Burp Suite, Metasploit, Kali Linux, Nessus, Ghidra</p>
            <p><span className="text-emerald-400">Languages:</span> Python, C/C++, Bash, SQL, JavaScript/TypeScript, PowerShell</p>
            <p><span className="text-emerald-400">Domains:</span> Penetration Testing, Quantum Cryptography, Network Defense, SIEM, Vulnerability Assessment</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="font-mono text-xs md:text-sm space-y-2 text-foreground/90">
            <p className="text-cyan-400 font-bold">[+] FEATURED PROJECTS:</p>
            <p><span className="text-emerald-400">1. Quantum Enhance Secure System</span> — Post-Quantum Cryptography framework for enterprise defense.</p>
            <p><span className="text-emerald-400">2. Aegis AI</span> — Anti-harassment & anti-piracy crawling engine (CINEHACK AI Winner).</p>
            <p><span className="text-emerald-400">3. LinguaAI</span> — AI conversational English learning platform.</p>
            <p><span className="text-emerald-400">4. Speech Detection LLM</span> — Sentence vulnerability & toxicity detection model.</p>
          </div>
        );
        break;

      case "certs":
        response = (
          <div className="font-mono text-xs md:text-sm space-y-1 text-foreground/90">
            <p className="text-cyan-400 font-bold">[+] CREDENTIALS & ACHIEVEMENTS:</p>
            <p>• TECHLETIC 4.0 CTF Winner (Christ College of Engineering)</p>
            <p>• CINEHACK AI Winner (FISAT Angamaly)</p>
            <p>• Blockchain Foundation Certification (Kerala Blockchain Academy)</p>
            <p>• Quantum Computing & Security Certification (Manorama Horizon)</p>
            <p>• NPTEL Joy of Computing (IIT Ropar)</p>
          </div>
        );
        break;

      case "nmap":
        response = (
          <div className="font-mono text-xs md:text-sm space-y-1 text-emerald-400">
            <p>Starting Nmap 7.94 ( https://nmap.org ) at {new Date().toLocaleTimeString()}</p>
            <p className="text-muted-foreground">Nmap scan report for robertthomas.dev (127.0.0.1)</p>
            <p className="text-muted-foreground">Host is up (0.00042s latency).</p>
            <p className="pt-1 text-cyan-400 font-bold">PORT     STATE SERVICE     VERSION</p>
            <p>22/tcp   open  ssh         OpenSSH 9.6p1 (Debian)</p>
            <p>80/tcp   open  http        nginx/1.24.0</p>
            <p>443/tcp  open  ssl/https   Vite SPA Portfolio</p>
            <p>8443/tcp open  pqc-tunnel  Kyber-1024 Quantum Lattice Engine</p>
            <p className="pt-1 text-emerald-300 font-semibold">Nmap done: 1 IP address (1 host up) scanned in 0.48 seconds.</p>
          </div>
        );
        break;

      case "matrix":
        response = (
          <div className="font-mono text-xs text-emerald-400 space-y-0.5 animate-pulse">
            <p>01001001 01001110 01001001 01010100 01001001 01000001 01010100 01001001 01001110 01000111</p>
            <p>01010001 01010101 01000001 01001110 01010100 01010101 01001101 01011111 01000101 01001110</p>
            <p className="text-cyan-400 font-bold">&gt;&gt; MATRIX MODE ENGAGED — SYSTEM ENCRYPTED WITH KYBER-1024 &lt;&lt;</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="font-mono text-xs md:text-sm space-y-1 text-foreground/90">
            <p className="text-cyan-400 font-bold">[+] CONTACT & SOCIAL LINKS:</p>
            <p>• Email: <a href="mailto:robertthomaskariankal@gmail.com" className="text-emerald-400 underline">robertthomaskariankal@gmail.com</a></p>
            <p>• GitHub: <a href="https://github.com/RobertThomasKariankal" target="_blank" rel="noreferrer" className="text-emerald-400 underline">github.com/RobertThomasKariankal</a></p>
            <p>• LinkedIn: <a href="https://www.linkedin.com/in/robertthomaskariankal/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">linkedin.com/in/robertthomaskariankal</a></p>
            <p>• Location: Pala, Kottayam, Kerala</p>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      case "exit":
      case "close":
        onClose();
        setInput("");
        return;

      default:
        response = (
          <p className="font-mono text-xs md:text-sm text-rose-400">
            zsh: command not found: {trimmed}. Type <span className="text-cyan-400 font-bold">'help'</span> for list of commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      { id: Date.now().toString(), command: trimmed, output: response },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInput(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`w-full bg-[#0b0f19] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col ${
              isMaximized ? "h-[94vh] max-w-[96vw]" : "h-[560px] max-w-3xl"
            }`}
          >
            {/* Header */}
            <div className="bg-[#111827] px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-2">
                  <button onClick={onClose} className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity" />
                  <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity" />
                  <button onClick={() => setLogs([])} className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity" />
                </div>
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">
                  robert@sec-ops:~ (bash)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 text-muted-foreground hover:text-cyan-400 transition-colors"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 text-muted-foreground hover:text-rose-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto font-mono space-y-4 text-sm scrollbar-thin scrollbar-thumb-cyan-900">
              {logs.map((log) => (
                <div key={log.id} className="space-y-1">
                  {log.command && (
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span className="text-emerald-400 font-bold">robert@sec-ops:~$</span>
                      <span>{log.command}</span>
                    </div>
                  )}
                  <div className="pl-2">{log.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input */}
            <div className="p-3 bg-[#0d1322] border-t border-cyan-500/20 flex items-center gap-2">
              <span className="text-emerald-400 font-mono font-bold text-xs md:text-sm pl-2">
                robert@sec-ops:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command e.g. 'help'..."
                className="flex-1 bg-transparent font-mono text-xs md:text-sm text-cyan-200 placeholder:text-muted-foreground/40 focus:outline-none"
              />
              <button
                onClick={() => handleCommand(input)}
                className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1"
              >
                <span>RUN</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
