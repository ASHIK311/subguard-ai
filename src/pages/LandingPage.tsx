import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Play, Check, ChevronRight, Star, ArrowRight, Lock, Zap, Eye, Bell, ShoppingBag, User } from "lucide-react";
import SplashCursor from "../components/effects/SplashCursor";
import RotatingText from "../components/effects/RotatingText";
import BrandMarquee from "../components/effects/BrandMarquee";
import ScrollReveal from "../components/effects/ScrollReveal";
import ElectricBorder from "../components/effects/ElectricBorder";
import CountUp from "../components/ui/CountUp";
import LightPillar from "../components/effects/LightPillar";
import Prism from "../components/effects/Prism";
import Strands from "../components/effects/Strands";
import GhostCursor from "../components/effects/GhostCursor";

const navItems = ["Features", "How It Works", "Security", "Pricing", "Demo"];

const features = [
  { icon: "👻", title: "Zombie Hunter", desc: "Detect subscriptions you pay for but never use. Score them 0–100 and decide their fate.", color: "#FB7185" },
  { icon: "📈", title: "Price Watch", desc: "Get alerted the moment any subscription silently increases its price on you.", color: "#FBBF24" },
  { icon: "🔄", title: "Duplicate Finder", desc: "Surface overlapping services in the same category — you don't need two music apps.", color: "#7DF9FF" },
  { icon: "⏳", title: "Trial Tracker", desc: "Never get blindsided by a free trial converting to a paid plan again.", color: "#38BDF8" },
  { icon: "✨", title: "AI Recommendations", desc: "SubGuard AI analyzes your spending patterns and tells you exactly what to cut.", color: "#A855F7" },
  { icon: "💰", title: "Savings Simulator", desc: "Toggle subscriptions on/off and watch your savings update in real time.", color: "#4ADE80" },
];

const howItWorks = [
  { num: "01", title: "Connect", desc: "Link your bank or credit card, or import a statement. SubGuard reads transactions — nothing else.", color: "#A855F7" },
  { num: "02", title: "Detect", desc: "AI identifies every recurring charge, even the ones buried in 'miscellaneous' or billed annually.", color: "#7DF9FF" },
  { num: "03", title: "Analyze", desc: "Each subscription gets a health score. Zombies, price hikes, and duplicates surface automatically.", color: "#4ADE80" },
  { num: "04", title: "Save", desc: "Review AI-powered recommendations and act. Cancel, downgrade, or consolidate — in seconds.", color: "#FBBF24" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Product Designer", avatar: "S", text: "Found 4 subscriptions I completely forgot about. Cancelled them and saved $180 in the first week.", savings: "$180" },
  { name: "Marcus Lee", role: "Software Engineer", avatar: "M", text: "SubGuard caught that my Canva plan went up 23% without any notice. Would never have spotted that myself.", savings: "$36" },
  { name: "Priya Nair", role: "Startup Founder", avatar: "P", text: "The zombie score concept is genius. NordVPN had a score of 91 and I hadn't opened it in 6 months.", savings: "$156" },
];

const faqs = [
  { q: "Is my banking data safe?", a: "SubGuard uses read-only connections and never stores your banking credentials. All data is encrypted in transit and at rest." },
  { q: "How does SubGuard detect subscriptions?", a: "Our AI analyzes your transaction patterns to identify recurring charges — even annual or irregular ones — and matches them against a database of 50,000+ known services." },
  { q: "Can I use SubGuard without connecting a bank?", a: "Yes. You can manually add subscriptions, upload a bank statement CSV, or connect via PayPal. Full features require a connection." },
  { q: "What is a Zombie subscription?", a: "A zombie subscription is a service you're paying for but no longer using. SubGuard assigns a Zombie Score (0–100) based on usage signals, subscription age, duplicate detection, and renewal patterns." },
];

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(Number((totalScroll / windowHeight) * 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#05070B", color: "#F7F8FA", fontFamily: "Inter, sans-serif" }}>
      <SplashCursor />

      {/* TOP PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 z-[100]" style={{ width: `${scrollProgress}%`, background: "linear-gradient(90deg, #7C3AED, #4ADE80, #7DF9FF)", transition: "width 0.1s ease-out" }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 mt-1 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-bold text-sg-text">SubGuard<span className="text-sg-purple"> AI</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase().replace(/\s+/g, "-"))?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-medium text-white/90 bg-white/5 hover:bg-white/15 px-4 py-2 rounded-full transition-all"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-white/80 hover:text-white transition-colors px-2 md:px-4 py-2">
              Login
            </Link>
            <Link to="/signup" className="relative group flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 text-sm font-bold text-white bg-white/5 border border-white/20 rounded-full transition-all hover:border-sg-cyan backdrop-blur-md overflow-hidden">
              <span className="relative z-10">Register</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-16 md:pt-12 pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>

        <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] md:text-xs font-bold mb-4 md:mb-6 border backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}>
              <Zap size={14} fill="currentColor" className="text-cyan-400" />
              AI-POWERED SUBSCRIPTION INTELLIGENCE
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1.1] mb-6 drop-shadow-2xl text-white"
            style={{ letterSpacing: "-0.03em", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
          >
            Stop paying for{" "}
            <br />
            <span className="relative inline-block mt-1">
              <span className="inline-block text-[#00F0FF]" style={{ textShadow: "0 0 30px rgba(0,240,255,0.6)" }}>
                <RotatingText
                  words={[
                    "Forgotten Subscriptions",
                    "Zombie Services",
                    "Hidden Renewals",
                    "Silent Price Hikes",
                    "Duplicate Services",
                  ]}
                  className="font-black"
                />
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl font-display font-semibold max-w-4xl mx-auto mb-3 tracking-wide text-white"
            style={{ 
              textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 0 10px rgba(0,240,255,0.4)"
            }}
          >
            Take back control of your recurring spending.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-[17px] font-display font-normal max-w-3xl mx-auto mb-6 leading-relaxed text-[#F8FAFC]"
            style={{ 
              textShadow: "0 2px 10px rgba(0,0,0,0.9)" 
            }}
          >
            SubGuard automatically discovers recurring payments, identifies hidden financial leaks, tracks stealth price increases and shows exactly what you can cancel to save money.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="w-full mb-8"
          >
            <BrandMarquee />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 flex-wrap mt-2 mb-8 md:mb-10"
          >
            <Link to="/onboarding"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-full transition-all hover:scale-105 hover:shadow-2xl uppercase tracking-wide"
              style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}>
              <Zap size={16} fill="currentColor" />
              Explore Subscriptions
              <ArrowRight size={16} />
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-full border transition-all uppercase tracking-wide bg-white/5 backdrop-blur-sm hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)", boxShadow: "0 0 20px rgba(0,0,0,0.5)" }}
            >
              View All Plans
            </button>
          </motion.div>

          {/* Carousel Indicators */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center gap-2 justify-center"
          >
            <div className="w-8 h-1.5 rounded-full" style={{ background: "#00F0FF", boxShadow: "0 0 10px #00F0FF" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </motion.div>

          {/* Hero product preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 relative"
          >
            <ElectricBorder color="#7DF9FF" borderRadius={20} intensity="normal">
              <div className="rounded-2xl overflow-hidden h-full">
                {/* Mock dashboard header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-sg-border">
                  <div className="w-3 h-3 rounded-full bg-sg-red/60" />
                  <div className="w-3 h-3 rounded-full bg-sg-amber/60" />
                  <div className="w-3 h-3 rounded-full bg-sg-green/60" />
                  <span className="ml-3 text-xs text-sg-muted">subguard.ai/dashboard</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
                    {[
                      { label: "Monthly", value: "$184.72", sub: "↓ 8.4% vs last month", color: "#A855F7" },
                      { label: "Yearly", value: "$2,216", sub: "commitment", color: "#7DF9FF" },
                      { label: "Potential Savings", value: "$624/yr", sub: "18% of spending", color: "#4ADE80" },
                      { label: "Active Services", value: "16", sub: "2 trials", color: "#38BDF8" },
                      { label: "Zombie Services", value: "3", sub: "need review", color: "#FB7185" },
                      { label: "Upcoming", value: "$54.99", sub: "in 3 days", color: "#FBBF24" },
                    ].map((m) => (
                      <div key={m.label} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="text-xs text-sg-muted mb-1">{m.label}</div>
                        <div className="font-bold tabular-nums" style={{ color: m.color, fontSize: "clamp(12px, 1.5vw, 18px)" }}>{m.value}</div>
                        <div className="text-xs text-sg-muted mt-0.5 truncate">{m.sub}</div>
                      </div>
                    ))}
                  </div>
                  {/* Fake chart bars */}
                  <div className="flex items-end gap-1.5 h-16">
                    {[60, 72, 85, 90, 78, 75, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                        className="flex-1 rounded-t-sm"
                        style={{ background: i === 6 ? "#A855F7" : "rgba(168,85,247,0.3)" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ElectricBorder>

            {/* Floating chips */}
            {[
              { label: "Netflix", value: "-$15.99", color: "#E50914", delay: 0, pos: "-top-4 -left-4 md:left-8" },
              { label: "Spotify", value: "-$10.99", color: "#1DB954", delay: 0.2, pos: "-top-4 right-4 md:right-24" },
              { label: "Canva", value: "PRICE ↑ 23%", color: "#FBBF24", delay: 0.4, pos: "-bottom-4 left-4 md:left-16" },
              { label: "NordVPN", value: "ZOMBIE 91", color: "#FB7185", delay: 0.6, pos: "-bottom-4 right-4 md:right-12" },
            ].map((chip) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{ delay: 0.9 + chip.delay, duration: 0.4, y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: chip.delay } }}
                className={`absolute ${chip.pos} hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border`}
                style={{ background: "rgba(13,17,24,0.95)", borderColor: chip.color + "40", color: chip.color, zIndex: 10 }}
              >
                <span className="font-semibold">{chip.label}</span>
                <span style={{ opacity: 0.8 }}>{chip.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
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
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ letterSpacing: "-0.02em" }}>
                From financial noise to<br /><span className="sg-gradient-text">total visibility.</span>
              </h2>
              <p className="text-sg-text2">Four steps. No complexity.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <ElectricBorder color={step.color} borderRadius={16} intensity="subtle">
                  <div className="p-6 rounded-2xl h-full">
                    <div className="text-3xl font-black mb-3 tabular-nums" style={{ color: step.color, opacity: 0.4 }}>{step.num}</div>
                    <h3 className="text-xl font-bold mb-2 text-sg-text">{step.title}</h3>
                    <p className="text-sm text-sg-text2 leading-relaxed">{step.desc}</p>
                  </div>
                </ElectricBorder>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <Strands
            colors={["#FB7185", "#7C3AED", "#F43F5E"]}
            count={3}
            speed={0.5}
            amplitude={1.2}
            waviness={1}
            thickness={0.8}
            glow={2.6}
            taper={3}
            spread={1}
            intensity={0.6}
            saturation={2}
            opacity={1}
            scale={1.5}
          />
        </div>
        <div className="px-6 max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ letterSpacing: "-0.02em" }}>
            Small subscriptions become<br /><span style={{ color: "#FB7185" }}>expensive habits.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-center flex-wrap gap-4 mb-8">
            {["$9.99", "$14.99", "$7.99", "$19.99", "$54.99"].map((price, i) => (
              <motion.div
                key={price}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-4 py-2 rounded-xl text-sg-text font-mono font-semibold border"
                style={{ background: "#101620", borderColor: "rgba(255,255,255,0.08)" }}
              >
                {price}
              </motion.div>
            ))}
            <span className="text-sg-muted text-xl">+</span>
            <div className="text-2xl font-black" style={{ color: "#4ADE80" }}>More...</div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="text-6xl md:text-8xl font-black tabular-nums mb-4" style={{ color: "#FB7185" }}>
            $<CountUp end={1764} />
            <span className="text-3xl md:text-4xl text-sg-muted">.60</span>
            <span className="text-2xl md:text-3xl text-sg-muted"> / YEAR</span>
          </div>
          <p className="text-lg text-sg-text2 mb-2">The problem isn't one subscription.</p>
          <p className="text-lg text-sg-text2">It's everything you forgot was still charging you.</p>
        </ScrollReveal>
      </div>
    </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ letterSpacing: "-0.02em" }}>
              Your entire subscription life,<br /><span className="sg-gradient-text">finally visible.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Tab showcase */}
        <div className="mb-6 flex items-center gap-2 flex-wrap justify-center">
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${activeTab === i ? "text-white border-transparent" : "text-sg-text2 border-sg-border hover:border-white/20"}`}
              style={activeTab === i ? { background: `${f.color}20`, borderColor: `${f.color}50`, color: f.color } : {}}
            >
              {f.icon} {f.title}
            </button>
          ))}
        </div>

        <ElectricBorder color={features[activeTab].color} borderRadius={20} intensity="normal">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-8 md:p-12 h-full"
          >
            <div className="text-5xl mb-4">{features[activeTab].icon}</div>
            <h3 className="text-3xl font-black mb-3" style={{ color: features[activeTab].color }}>{features[activeTab].title}</h3>
            <p className="text-lg text-sg-text2 max-w-lg">{features[activeTab].desc}</p>
          </motion.div>
        </ElectricBorder>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <ElectricBorder color={f.color} borderRadius={12} intensity="subtle" className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="p-5 rounded-xl cursor-pointer transition-all h-full"
                onClick={() => setActiveTab(i)}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className="font-semibold text-sg-text mb-1">{f.title}</h4>
                <p className="text-sm text-sg-text2">{f.desc}</p>
              </motion.div>
              </ElectricBorder>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SAVINGS METRICS + SECURITY — shared GhostCursor background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0" style={{ position: 'relative', height: '100%' }}>
          <GhostCursor
            color="#B497CF"
            brightness={2}
            edgeIntensity={0}
            trailLength={50}
            inertia={0.5}
            grainIntensity={0.05}
            bloomStrength={0.1}
            bloomRadius={1}
            bloomThreshold={0.025}
            fadeDelayMs={1000}
            fadeDurationMs={1500}
          />
        </div>

        {/* SAVINGS METRICS */}
        <section className="relative py-24 px-6 max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-black mb-12 text-sg-text relative z-10">Average SubGuard user detects</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {[
              { value: 14, label: "subscriptions detected", suffix: "", color: "#7DF9FF" },
              { value: 3, label: "zombie services", suffix: "", color: "#FB7185" },
              { value: 2, label: "unnecessary duplicates", suffix: "", color: "#FBBF24" },
              { value: 624, label: "potential annual savings", suffix: "", prefix: "$", color: "#4ADE80" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <ElectricBorder color={stat.color} borderRadius={16} intensity="subtle" className="h-full">
                <div className="p-6 rounded-2xl h-full">
                  <div className="text-4xl md:text-5xl font-black tabular-nums mb-2" style={{ color: stat.color }}>
                    <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-sg-text2">{stat.label}</div>
                </div>
                </ElectricBorder>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* SECURITY */}
        <section id="security" className="relative py-24 px-6 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4" style={{ letterSpacing: "-0.02em" }}>
                Financial intelligence without<br /><span className="sg-gradient-text">sacrificing privacy.</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: Lock, title: "Encrypted Data", desc: "AES-256 encryption at rest. TLS 1.3 in transit. Your data is unreadable to anyone but you." },
              { icon: Eye, title: "Read-Only Access", desc: "SubGuard only reads your transactions. We can never move money, initiate payments, or modify accounts." },
              { icon: Shield, title: "No Credentials Stored", desc: "We connect via secure OAuth tokens. Your banking password never touches our servers." },
              { icon: Bell, title: "Privacy Controls", desc: "You control exactly what data SubGuard can see. Revoke access anytime from Settings." },
              { icon: Zap, title: "Export & Delete", desc: "Download all your data or permanently delete your account at any time. No lock-in." },
              { icon: Check, title: "Secure Connections", desc: "Bank-grade connection protocols. All third-party integrations are vetted and monitored." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <ElectricBorder color="#A855F7" borderRadius={12} intensity="subtle" className="h-full">
                <div className="p-5 rounded-xl h-full">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgba(168,85,247,0.15)", color: "#A855F7" }}>
                    <item.icon size={16} />
                  </div>
                  <h4 className="font-semibold text-sg-text mb-1">{item.title}</h4>
                  <p className="text-sm text-sg-text2">{item.desc}</p>
                </div>
                </ElectricBorder>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-black text-center mb-12">Real savings. Real people.</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
              <div className="p-6 rounded-2xl h-full flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#FBBF24" className="text-sg-amber" />)}
                </div>
                <p className="text-sm text-sg-text2 mb-4 flex-1 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>{t.avatar}</div>
                    <div>
                      <div className="text-sm font-medium text-sg-text">{t.name}</div>
                      <div className="text-xs text-sg-muted">{t.role}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: "#4ADE80" }}>Saved {t.savings}</div>
                </div>
              </div>
              </ElectricBorder>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3" style={{ letterSpacing: "-0.02em" }}>Simple, honest pricing.</h2>
            <p className="text-sg-text2">No hidden fees. Cancel anytime.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Free", price: "$0", period: "/month", color: "#9BA3B4",
              features: ["Up to 5 subscriptions", "Basic recurring tracking", "Renewal reminders", "Basic analytics"],
              cta: "Get Started Free", highlight: false
            },
            {
              name: "Pro", price: "$7.99", period: "/month", color: "#A855F7",
              features: ["Unlimited subscriptions", "Zombie Detector", "Price Watch", "Duplicate Finder", "AI Assistant", "Advanced reports", "Smart cancellation", "Savings Simulator"],
              cta: "Start Pro Trial", highlight: true
            },
            {
              name: "Family", price: "$12.99", period: "/month", color: "#7DF9FF",
              features: ["Everything in Pro", "Up to 5 family members", "Shared subscriptions", "Duplicate family detection", "Family spending dashboard"],
              cta: "Start Family Trial", highlight: false
            }
          ].map((plan, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <ElectricBorder color={plan.color} borderRadius={20} intensity={plan.highlight ? "normal" : "subtle"}>
                <div className={`relative p-7 rounded-2xl h-full flex flex-col ${plan.highlight ? "" : ""}`}
                  style={plan.highlight ? { background: "rgba(168,85,247,0.05)" } : undefined}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
                      RECOMMENDED
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-2" style={{ color: plan.color }}>{plan.name}</div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-sg-text">{plan.price}</span>
                      <span className="text-sg-muted mb-1">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-sg-text2">
                        <Check size={14} style={{ color: plan.color, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup"
                    className="block text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                    style={plan.highlight
                      ? { background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "white" }
                      : { background: "rgba(255,255,255,0.05)", color: plan.color, border: `1px solid ${plan.color}30` }
                    }>
                    {plan.cta}
                  </Link>
                </div>
              </ElectricBorder>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-black text-center mb-10">Frequently asked</h2>
        </ScrollReveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ElectricBorder key={i} color="#A855F7" borderRadius={12} intensity="subtle">
            <div className="rounded-xl overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-sg-text hover:bg-white/3 transition-all"
              >
                {faq.q}
                <ChevronRight
                  size={16}
                  className="text-sg-muted flex-shrink-0 transition-transform"
                  style={{ transform: activeFaq === i ? "rotate(90deg)" : "none" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-5 pb-4 text-sm text-sg-text2">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </ElectricBorder>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Your subscriptions shouldn't<br /><span className="sg-gradient-text">control your money.</span>
          </h2>
          <p className="text-sg-text2 mb-8">Find the waste before the next charge arrives.</p>
          <Link to="/onboarding"
            className="inline-flex items-center gap-2 px-10 py-4 text-lg font-semibold text-white rounded-2xl transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", boxShadow: "0 0 60px rgba(168,85,247,0.3)" }}>
            Start My Free Scan
            <ArrowRight size={20} />
          </Link>
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-sg-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
              <Shield size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm text-sg-text">SubGuard <span className="text-sg-purple">AI</span></span>
          </div>
          <p className="text-xs text-sg-muted">Find it. Understand it. Kill the waste. © 2025 SubGuard AI</p>
          <div className="flex gap-4 text-xs text-sg-muted">
            <a href="#" className="hover:text-sg-text">Privacy</a>
            <a href="#" className="hover:text-sg-text">Terms</a>
            <a href="#" className="hover:text-sg-text">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

