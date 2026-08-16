import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, ArrowRight, Wifi, CreditCard, Upload, FileText, Plus, Loader2 } from "lucide-react";
import Hyperspeed, { hyperspeedPresets } from "../components/effects/Hyperspeed";
import Strands from "../components/effects/Strands";

const goals = [
  { id: "save", icon: "💰", title: "Save money", desc: "Find subscriptions to cut" },
  { id: "forgotten", icon: "🔍", title: "Find forgotten subscriptions", desc: "Uncover what's been charging you" },
  { id: "prices", icon: "📈", title: "Watch price increases", desc: "Alert me when prices go up" },
  { id: "renewals", icon: "🔔", title: "Track renewals", desc: "Know what's due each month" },
  { id: "trials", icon: "⏳", title: "Prevent trial charges", desc: "Cancel before they convert" },
  { id: "understand", icon: "📊", title: "Understand recurring spending", desc: "See the full picture" },
];

const sources = [
  { id: "bank", icon: Wifi, title: "Connect Bank", desc: "Automatic transaction sync", status: "connected" },
  { id: "credit", icon: CreditCard, title: "Connect Credit Card", desc: "Visa, Mastercard, Amex", status: "connected" },
  { id: "paypal", icon: "P", title: "PayPal", desc: "Sync PayPal transactions", status: "idle" },
  { id: "statement", icon: Upload, title: "Upload Statement", desc: "PDF or CSV bank export", status: "idle" },
  { id: "csv", icon: FileText, title: "Import CSV", desc: "Any financial CSV format", status: "idle" },
  { id: "manual", icon: Plus, title: "Manual Entry", desc: "Add subscriptions yourself", status: "idle" },
];

const scanLog = [
  { delay: 400, text: "Analyzing transaction patterns...", type: "info" },
  { delay: 900, text: "Netflix detected — $15.99/month", type: "detect" },
  { delay: 1300, text: "Spotify detected — $10.99/month", type: "detect" },
  { delay: 1700, text: "Scanning for price changes...", type: "info" },
  { delay: 2100, text: "Canva price history found — 23% increase", type: "warning" },
  { delay: 2500, text: "NordVPN recurring pattern detected", type: "detect" },
  { delay: 2900, text: "Checking for zombie subscriptions...", type: "info" },
  { delay: 3300, text: "Adobe trial detected — expires in 3 days", type: "warning" },
  { delay: 3700, text: "AWS, Figma, GitHub identified...", type: "detect" },
  { delay: 4100, text: "Analyzing duplicate services...", type: "info" },
  { delay: 4500, text: "Apple Music + Spotify — potential duplicate", type: "warning" },
  { delay: 4900, text: "Calculating zombie scores...", type: "info" },
  { delay: 5300, text: "NordVPN Zombie Score: 91 — HIGH RISK", type: "zombie" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["save", "forgotten"]);
  const [connectedSources, setConnectedSources] = useState<string[]>(["bank", "credit"]);
  const [scanProgress, setScanProgress] = useState(0);
  const [logEntries, setLogEntries] = useState<typeof scanLog>([]);
  const [scanDone, setScanDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (step !== 2) return;
    setScanProgress(0);
    setLogEntries([]);
    setScanDone(false);

    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 1.4;
      });
    }, 80);

    scanLog.forEach(({ delay, text, type }) => {
      setTimeout(() => setLogEntries((prev) => [...prev, { delay, text, type }]), delay);
    });

    setTimeout(() => setScanDone(true), 6000);
    return () => clearInterval(interval);
  }, [step]);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]);
  };

  const toggleSource = (id: string) => {
    setConnectedSources((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: "#05070B" }}>
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
      {step < 2 && (
        <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
          <Strands
            colors={["#A855F7", "#7DF9FF", "#3B82F6"]}
            count={3}
            speed={0.5}
            amplitude={1}
            waviness={1}
            thickness={0.7}
            glow={2.6}
            taper={3}
            spread={1}
            intensity={0.6}
            saturation={2}
            opacity={1}
            scale={1.5}
          />
        </div>
      )}

      {/* Logo */}
      <div className="fixed top-6 left-6 flex items-center gap-2 z-10">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
          <Shield size={16} className="text-white" />
        </div>
        <span className="font-bold text-sm text-sg-text">SubGuard <span className="text-sg-purple">AI</span></span>
      </div>

      {/* Step indicator */}
      {step < 3 && (
        <div className="fixed top-6 right-6 flex items-center gap-2 z-10">
          {[0, 1, 2].map((s) => (
            <div key={s} className="w-2 h-2 rounded-full transition-all" style={{ background: s <= step ? "#A855F7" : "#1e2535" }} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 0: Goals */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-xl relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-sg-text mb-2" style={{ letterSpacing: "-0.02em" }}>
                What should SubGuard protect you from?
              </h1>
              <p className="text-sg-text2">Select everything that matters to you.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {goals.map((goal) => (
                <motion.button
                  key={goal.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${selectedGoals.includes(goal.id) ? "border-sg-purple/50 bg-sg-purple/10" : "border-sg-border bg-sg-surface hover:border-white/20"}`}
                >
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <div className="text-sm font-semibold text-sg-text mb-0.5">{goal.title}</div>
                  <div className="text-xs text-sg-muted">{goal.desc}</div>
                  {selectedGoals.includes(goal.id) && (
                    <div className="mt-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#A855F7" }}>
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={selectedGoals.length === 0}
              className="w-full py-3 text-base font-semibold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
            >
              Continue <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {/* STEP 1: Connect sources */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-xl relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-sg-text mb-2" style={{ letterSpacing: "-0.02em" }}>Where should we look?</h1>
              <p className="text-sg-text2">Connect at least one source to start scanning.</p>
            </div>
            <div className="space-y-3 mb-8">
              {sources.map((src) => {
                const connected = connectedSources.includes(src.id);
                return (
                  <motion.button
                    key={src.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleSource(src.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${connected ? "border-sg-green/40 bg-sg-green/5" : "border-sg-border bg-sg-surface hover:border-white/20"}`}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: connected ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)", color: connected ? "#4ADE80" : "#9BA3B4" }}>
                      {typeof src.icon === "string" ? <span className="text-sm font-bold">{src.icon}</span> : <src.icon size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-sg-text">{src.title}</div>
                      <div className="text-xs text-sg-muted">{src.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${connected ? "border-sg-green bg-sg-green" : "border-sg-border"}`}>
                      {connected && <Check size={10} className="text-white" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="px-6 py-3 text-sm font-medium text-sg-text2 rounded-xl border border-sg-border hover:border-white/20 transition-all">
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={connectedSources.length === 0}
                className="flex-1 py-3 text-base font-semibold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
              >
                Start Scanning <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: HYPERSPEED SCAN */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex flex-col items-center justify-center z-20">
            <div className="absolute inset-0" style={{ background: "#05070B" }}>
              <Hyperspeed effectOptions={hyperspeedPresets.one} />
            </div>
            <div className="absolute inset-0" style={{ background: "rgba(5,7,11,0.5)" }} />

            <div className="relative z-10 text-center max-w-lg px-6 w-full">
              {!scanDone ? (
                <>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-xs font-semibold tracking-widest text-sg-purple mb-4"
                  >
                    SYSTEM SCANNING
                  </motion.div>
                  <h2 className="text-3xl font-black text-sg-text mb-2">Analyzing your transactions...</h2>
                  <div className="text-6xl font-black tabular-nums mb-2" style={{ color: "#7DF9FF" }}>
                    {Math.min(100, Math.round(scanProgress))}%
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-1.5 mb-6 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #7C3AED, #7DF9FF)", width: `${scanProgress}%` }}
                    />
                  </div>

                  <div className="text-sm text-sg-text2 mb-6">2,471 transactions analyzed</div>

                  <div className="space-y-1.5 max-h-48 overflow-hidden text-left">
                    {logEntries.map((entry, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Loader2 size={10} className="animate-spin flex-shrink-0" style={{ color: entry.type === "zombie" ? "#FB7185" : entry.type === "warning" ? "#FBBF24" : entry.type === "detect" ? "#4ADE80" : "#9BA3B4" }} />
                        <span style={{ color: entry.type === "zombie" ? "#FB7185" : entry.type === "warning" ? "#FBBF24" : entry.type === "detect" ? "#4ADE80" : "#9BA3B4" }}>
                          {entry.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="text-3xl font-black text-sg-text mb-2">Scan complete.</h2>
                  <p className="text-sg-text2 mb-8">Here's what we found in your accounts.</p>
                  <div className="grid grid-cols-2 gap-3 mb-8 text-center">
                    {[
                      { label: "Monthly Recurring", value: "$187.46", color: "#A855F7" },
                      { label: "Yearly Commitment", value: "$2,249.52", color: "#7DF9FF" },
                      { label: "Subscriptions Found", value: "14", color: "#4ADE80" },
                      { label: "Zombie Services", value: "3", color: "#FB7185" },
                      { label: "Potential Savings", value: "$624.20/yr", color: "#4ADE80" },
                      { label: "Price Increases", value: "2", color: "#FBBF24" },
                    ].map((m) => (
                      <div key={m.label} className="p-4 rounded-xl border border-sg-border" style={{ background: "rgba(16,22,32,0.8)" }}>
                        <div className="text-xl font-black tabular-nums mb-1" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-xs text-sg-muted">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/app/dashboard")}
                    className="w-full py-3 text-base font-semibold text-white rounded-xl transition-all hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
                  >
                    Open My Dashboard <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
