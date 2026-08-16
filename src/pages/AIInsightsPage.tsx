import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, ArrowRight, TrendingDown, Ghost, Copy, CreditCard } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import WebThreads from "../components/effects/WebThreads";
import ElectricBorder from "../components/effects/ElectricBorder";
import Badge from "../components/ui/Badge";

const suggestions = [
  "How can I save $50/month?",
  "Which services should I cancel?",
  "What got more expensive recently?",
  "How much will I spend next month?",
  "Find my duplicate subscriptions.",
  "Show me my zombie subscriptions.",
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  cards?: Array<{ name: string; action: string; saving: string; color: string; icon: string }>;
}

const aiResponses: Record<string, Message> = {
  save: {
    id: "r1", role: "assistant",
    content: "I found 4 opportunities that could save you approximately $52.98/month and $635.76/year. Here's what I recommend:",
    cards: [
      { name: "NordVPN", action: "Cancel — Zombie Score 91", saving: "+$12.99/mo", color: "#FB7185", icon: "V" },
      { name: "Apple Music", action: "Duplicate with Spotify", saving: "+$10.99/mo", color: "#FA2D48", icon: "♪" },
      { name: "Canva", action: "Downgrade to free tier", saving: "+$8.00/mo", color: "#00C4CC", icon: "C" },
      { name: "Adobe CC", action: "Switch to lower plan", saving: "+$21.00/mo", color: "#FF0000", icon: "A" },
    ]
  },
  cancel: {
    id: "r2", role: "assistant",
    content: "Based on your usage data, these services are candidates for cancellation. They score high on the zombie scale or are clear duplicates:",
    cards: [
      { name: "NordVPN", action: "Zombie Score: 91 — not used in 3 months", saving: "$155.88/yr", color: "#FB7185", icon: "V" },
      { name: "Apple Music", action: "You already have Spotify active", saving: "$131.88/yr", color: "#FA2D48", icon: "♪" },
      { name: "YouTube Premium", action: "Zombie Score: 42 — low usage", saving: "$167.88/yr", color: "#FF0000", icon: "Y" },
    ]
  },
  expensive: {
    id: "r3", role: "assistant",
    content: "I detected 2 price increases this month that added $9/month to your bill:",
    cards: [
      { name: "Canva Pro", action: "$12.99 → $15.99 (+23%)", saving: "+$36/yr", color: "#FBBF24", icon: "C" },
      { name: "NordVPN", action: "$10.99 → $12.99 (+18%)", saving: "+$24/yr", color: "#FBBF24", icon: "V" },
    ]
  },
};

const getAiResponse = (msg: string): Message => {
  const lower = msg.toLowerCase();
  if (lower.includes("save") || lower.includes("$50")) return aiResponses.save;
  if (lower.includes("cancel") || lower.includes("zombie")) return aiResponses.cancel;
  if (lower.includes("expensive") || lower.includes("price") || lower.includes("more expensive")) return aiResponses.expensive;
  return {
    id: Date.now().toString(), role: "assistant",
    content: "I analyzed your subscription data. You currently have 16 active subscriptions costing $184.72/month. Your biggest opportunities are with NordVPN (Zombie Score 91), Apple Music (duplicate with Spotify), and Canva (23% recent price increase). Want me to walk you through each one?",
  };
};

export default function AIInsightsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      content: "Hi Nakib! I'm SubGuard AI. I've analyzed your 16 subscriptions. I found $635.76 in potential annual savings. What would you like to know?",
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const response = getAiResponse(msg);
      setMessages(prev => [...prev, { ...response, id: Date.now().toString() }]);
    }, 1200);
  };

  return (
    <AppLayout title="SubGuard AI" subtitle="Your personal subscription intelligence assistant">
      {/* WebThreads ambient background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <WebThreads
          color1="#5227FF"
          color2="#A855F7"
          color3="#7DF9FF"
          speed={0.15}
          threadCount={5}
          frequency={4}
          spread={0.22}
          taper={1.2}
          position={0.35}
          glow={0.03}
          falloff={0.5}
          thickness={0.9}
          brightness={0.4}
          opacity={0.7}
          mirror
          grain
          grainIntensity={0.04}
          mouseInteraction
          mouseStrength={0.25}
        />
      </div>
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-140px)] relative" style={{ zIndex: 1 }}>
        {/* Suggestion chips */}
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-sg-border text-sg-text2 hover:border-sg-purple/40 hover:text-sg-purple hover:bg-sg-purple/5 transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mr-3 mt-1"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
                    <Sparkles size={14} className="text-white" />
                  </div>
                )}
                <div className={`max-w-lg ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-3`}>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white"
                        : "text-sg-text"
                    }`}
                    style={msg.role === "user"
                      ? { background: "linear-gradient(135deg, #7C3AED, #A855F7)" }
                      : { background: "#101620", border: "1px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    {msg.content}
                  </div>
                  {msg.cards && (
                    <div className="space-y-2 w-full">
                      {msg.cards.map((card, i) => (
                        <ElectricBorder key={i} color={card.color} borderRadius={12} intensity="subtle">
                          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="flex items-center gap-3 p-3 rounded-xl " >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: card.color + "33" }}>
                              {card.icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-sg-text">{card.name}</div>
                              <div className="text-xs text-sg-muted">{card.action}</div>
                            </div>
                            <div className="text-sm font-bold" style={{ color: "#4ADE80" }}>{card.saving}</div>
                            <button className="px-2 py-1 text-xs font-medium rounded-lg bg-sg-purple/15 text-sg-purple hover:bg-sg-purple/25 transition-all">
                              Act
                            </button>
                          </div>
</ElectricBorder>
                        </ElectricBorder>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
                <Sparkles size={14} className="text-white" />
              </div>
              <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="flex gap-1 px-4 py-3 rounded-2xl " >
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-sg-purple"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                  />
                ))}
              </div>
</ElectricBorder>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-sg-border pt-4">
          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="flex items-center gap-3 p-3 rounded-2xl  focus-within:border-sg-purple/50 transition-all" >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask SubGuard AI anything about your subscriptions..."
              className="flex-1 bg-transparent text-sm text-sg-text placeholder-sg-muted focus:outline-none"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              className="w-8 h-8 flex items-center justify-center rounded-xl transition-all disabled:opacity-30 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
</ElectricBorder>
        </div>
      </div>
    </AppLayout>
  );
}
