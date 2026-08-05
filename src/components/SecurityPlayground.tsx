import React, { useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, Lock, ShieldCheck, Binary, Copy, Check, RefreshCw } from "lucide-react";

export const SecurityPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"hash" | "encoder" | "entropy" | "pqc">("hash");

  // Hashing state
  const [inputText, setInputText] = useState("Hello Security World");
  const [hashAlgorithm, setHashAlgorithm] = useState<"SHA-256" | "SHA-512">("SHA-256");
  const [hashResult, setHashResult] = useState("");
  const [copied, setCopied] = useState(false);

  // Encoder state
  const [encodeInput, setEncodeInput] = useState("Cybersecurity Portfolio");
  const [encodeMode, setEncodeMode] = useState<"base64" | "hex">("base64");
  const [encodeDirection, setEncodeDirection] = useState<"encode" | "decode">("encode");

  // Entropy state
  const [password, setPassword] = useState("P@ssw0rd!2026#Sec");

  // PQC state
  const [kyberKey, setKyberKey] = useState<{ pub: string; priv: string } | null>(null);

  // Compute hash using Web Crypto API
  const computeHash = async (text: string, algo: "SHA-256" | "SHA-512") => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setHashResult(hashHex);
    } catch {
      setHashResult("Error computing hash");
    }
  };

  React.useEffect(() => {
    computeHash(inputText, hashAlgorithm);
  }, [inputText, hashAlgorithm]);

  // Compute Base64 / Hex encoding
  const getEncodedText = () => {
    try {
      if (encodeMode === "base64") {
        return encodeDirection === "encode"
          ? btoa(encodeInput)
          : atob(encodeInput);
      } else {
        if (encodeDirection === "encode") {
          return Array.from(new TextEncoder().encode(encodeInput))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        } else {
          const clean = encodeInput.replace(/\s+/g, "");
          const bytes = new Uint8Array(
            clean.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
          );
          return new TextDecoder().decode(bytes);
        }
      }
    } catch {
      return "Invalid input string";
    }
  };

  // Compute password entropy
  const calculateEntropy = (str: string) => {
    let poolSize = 0;
    if (/[a-z]/.test(str)) poolSize += 26;
    if (/[A-Z]/.test(str)) poolSize += 26;
    if (/[0-9]/.test(str)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(str)) poolSize += 32;
    if (poolSize === 0) return 0;
    const entropy = Math.round(str.length * Math.log2(poolSize));
    return entropy;
  };

  const entropyValue = calculateEntropy(password);

  const getStrengthLabel = (entropy: number) => {
    if (entropy < 28) return { label: "Very Weak", color: "text-rose-500", bg: "bg-rose-500" };
    if (entropy < 45) return { label: "Weak", color: "text-amber-500", bg: "bg-amber-500" };
    if (entropy < 65) return { label: "Moderate", color: "text-yellow-400", bg: "bg-yellow-400" };
    if (entropy < 80) return { label: "Strong", color: "text-emerald-400", bg: "bg-emerald-400" };
    return { label: "Quantum-Safe", color: "text-cyan-400", bg: "bg-cyan-400" };
  };

  const strength = getStrengthLabel(entropyValue);

  // Generate mock Kyber PQC Keypair
  const generatePQCKeys = () => {
    const pubBytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");
    const privBytes = Array.from({ length: 24 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");
    setKyberKey({
      pub: `0xKYBER1024_${pubBytes.toUpperCase()}`,
      priv: `0xPRIV_LATTICE_${privBytes.toUpperCase()}`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Security Playground</span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Interactive <span className="text-gradient">Cryptographic Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-3">
            Test live web security operations directly in your browser: hashing, Base64 encoding, entropy analysis, and Post-Quantum Key simulation.
          </p>
        </motion.div>

        {/* Card Container */}
        <div className="max-w-4xl mx-auto glass-morphism-heavy p-6 md:p-8 rounded-3xl border-primary/20">
          {/* Tool Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            <button
              onClick={() => setActiveTab("hash")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs md:text-sm font-bold transition-all ${
                activeTab === "hash"
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Crypto Hashing</span>
            </button>

            <button
              onClick={() => setActiveTab("encoder")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs md:text-sm font-bold transition-all ${
                activeTab === "encoder"
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Binary className="w-4 h-4" />
              <span>Base64 / Hex</span>
            </button>

            <button
              onClick={() => setActiveTab("entropy")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs md:text-sm font-bold transition-all ${
                activeTab === "entropy"
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Password Entropy</span>
            </button>

            <button
              onClick={() => setActiveTab("pqc")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs md:text-sm font-bold transition-all ${
                activeTab === "pqc"
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Kyber PQC Engine</span>
            </button>
          </div>

          {/* TAB 1: CRYPTO HASHING */}
          {activeTab === "hash" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Input String
                  </label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary/40 border border-border rounded-xl font-mono text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Algorithm
                  </label>
                  <select
                    value={hashAlgorithm}
                    onChange={(e) => setHashAlgorithm(e.target.value as "SHA-256" | "SHA-512")}
                    className="px-4 py-3 bg-secondary/40 border border-border rounded-xl font-mono text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="SHA-256">SHA-256</option>
                    <option value="SHA-512">SHA-512</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Computed Digest ({hashAlgorithm})
                  </span>
                  <button
                    onClick={() => copyToClipboard(hashResult)}
                    className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-4 bg-[#0b0f19] border border-cyan-500/20 rounded-xl font-mono text-xs md:text-sm text-emerald-400 break-all select-all">
                  {hashResult || "Computing..."}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENCODER */}
          {activeTab === "encoder" && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setEncodeDirection("encode")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                      encodeDirection === "encode" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => setEncodeDirection("decode")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                      encodeDirection === "decode" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    Decode
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEncodeMode("base64")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                      encodeMode === "base64" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    Base64
                  </button>
                  <button
                    onClick={() => setEncodeMode("hex")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                      encodeMode === "hex" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    Hex
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Source Text
                </label>
                <input
                  type="text"
                  value={encodeInput}
                  onChange={(e) => setEncodeInput(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary/40 border border-border rounded-xl font-mono text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  Output ({encodeMode.toUpperCase()} {encodeDirection.toUpperCase()})
                </label>
                <div className="p-4 bg-[#0b0f19] border border-cyan-500/20 rounded-xl font-mono text-xs md:text-sm text-cyan-300 break-all select-all">
                  {getEncodedText()}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENTROPY */}
          {activeTab === "entropy" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Test Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary/40 border border-border rounded-xl font-mono text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="p-4 bg-[#0b0f19] border border-border rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono uppercase text-muted-foreground">Calculated Entropy:</span>
                  <span className="text-xl font-bold font-mono text-foreground">{entropyValue} bits</span>
                </div>

                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.bg} transition-all duration-500`}
                    style={{ width: `${Math.min(100, (entropyValue / 100) * 100)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-muted-foreground">Rating:</span>
                  <span className={`font-bold ${strength.color}`}>{strength.label}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PQC ENGINE */}
          {activeTab === "pqc" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-mono text-sm font-bold text-cyan-400">Post-Quantum Lattice Key Visualizer</h4>
                  <p className="text-xs text-muted-foreground">Simulates CRYSTALS-Kyber-1024 quantum-resistant key exchange</p>
                </div>
                <button
                  onClick={generatePQCKeys}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-mono text-xs font-bold hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Generate Keypair</span>
                </button>
              </div>

              {kyberKey ? (
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold block mb-1">Public Lattice Key (Kyber-1024):</span>
                    <div className="p-3 bg-[#0b0f19] border border-cyan-500/20 rounded-xl text-emerald-400 break-all select-all">
                      {kyberKey.pub}
                    </div>
                  </div>
                  <div>
                    <span className="text-purple-400 font-bold block mb-1">Secret Key (Encapsulated):</span>
                    <div className="p-3 bg-[#0b0f19] border border-purple-500/20 rounded-xl text-purple-300 break-all select-all">
                      {kyberKey.priv}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-[#0b0f19] rounded-2xl border border-dashed border-cyan-500/20 text-muted-foreground font-mono text-xs">
                  Click "Generate Keypair" to simulate CRYSTALS-Kyber quantum key pair generation.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
