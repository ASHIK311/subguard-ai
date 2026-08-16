import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ghost, Skull, TrendingUp, Clock, Copy, AlertCircle, RotateCcw } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import ZombieScore from "../components/ui/ZombieScore";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { subscriptions } from "../data/mockData";

const zombies = subscriptions.filter(s => s.status === "zombie" || (s.zombieScore && s.zombieScore >= 60));

const zombieReasons = {
  nordvpn: [
    { icon: Clock, label: "Low reported usage", detail: "No active sessions detected in 3+ months", points: 30 },
    { icon: RotateCcw, label: "Automatic renewal active", detail: "Renews automatically every month", points: 10 },
    { icon: Copy, label: "Similar VPN detected", detail: "You have another VPN in your subscriptions", points: 20 },
    { icon: Clock, label: "Active for 14 months", detail: "Long subscription duration with declining use", points: 10 },
    { icon: TrendingUp, label: "Recent price increase", detail: "Price went up from $10.99 to $12.99 recently", points: 15 },
    { icon: AlertCircle, label: "Manual low-usage report", detail: "You marked this as rarely used", points: 6 },
  ],
  "apple-music": [
    { icon: Copy, label: "Duplicate service", detail: "Spotify is also active — same category", points: 20 },
    { icon: Clock, label: "Low usage detected", detail: "Last opened 2 months ago", points: 30 },
    { icon: Clock, label: "Active for 16 months", detail: "Long subscription duration with low use", points: 10 },
    { icon: RotateCcw, label: "Automatic renewal", detail: "Renews monthly without confirmation", points: 10 },
    { icon: AlertCircle, label: "Inactivity pattern", detail: "Usage has been declining for 4 months", points: 8 },
  ],
  todoist: [
    { icon: Clock, label: "Low reported usage", detail: "No tasks created in 2+ months", points: 30 },
    { icon: Copy, label: "Notion also active", detail: "Notion serves the same purpose", points: 20 },
    { icon: Clock, label: "Active for 11 months", detail: "Regular payment with zero engagement", points: 12 },
    { icon: RotateCcw, label: "Automatic renewal", detail: "Renews monthly silently", points: 10 },
  ],
};

const scoreExplanation = [
  { label: "Usage inactivity", points: 30 },
  { label: "Duplicate service", points: 20 },
  { label: "Manual low-usage report", points: 15 },
  { label: "Recent price increase", points: 15 },
  { label: "Long subscription duration", points: 10 },
  { label: "Automatic renewal active", points: 10 },
];

export default function ZombieHunterPage() {
  const [selected, setSelected] = useState(zombies[0]);
  const [showKillModal, setShowKillModal] = useState(false);
  const [killed, setKilled] = useState<string[]>([]);
  const [killDone, setKillDone] = useState(false);

  const reasons = zombieReasons[selected.id as keyof typeof zombieReasons] ?? zombieReasons.nordvpn;
  const totalWaste = zombies.reduce((sum, z) => sum + z.amount, 0);

  const handleKill = () => {
    setKillDone(true);
    setTimeout(() => {
      setKilled(prev => [...prev, selected.id]);
      setShowKillModal(false);
      setKillDone(false);
    }, 1500);
  };

  return (
    <AppLayout title="Zombie Hunter" subtitle="Subscriptions alive on your bank statement but dead in your life">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top metrics */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Zombies Detected", value: `${zombies.length - killed.length}`, color: "#FB7185" },
            { label: "Monthly Waste", value: `$${(totalWaste).toFixed(2)}`, color: "#FBBF24" },
            { label: "Annual Waste", value: `$${(totalWaste * 12).toFixed(2)}`, color: "#FB7185" },
          ].map(m => (
            <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div key={m.label} className="p-4 rounded-xl  text-center" >
              <div className="text-2xl font-black tabular-nums mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs text-sg-muted">{m.label}</div>
            </div>
</ElectricBorder>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zombie list */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-sg-muted uppercase tracking-wider">Detected Zombies</h3>
            {zombies.map(z => {
              const isDead = killed.includes(z.id);
              return (
                <motion.button
                  key={z.id}
                  onClick={() => !isDead && setSelected(z)}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    selected.id === z.id && !isDead ? "border-sg-red/40 bg-sg-red/5" : isDead ? "border-sg-border opacity-40" : "border-sg-border hover:border-sg-red/30"
                  }`}
                  style={{ background: isDead ? "transparent" : "#101620" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: z.color + "33" }}>
                      {isDead ? "💀" : z.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-sg-text">{z.name}</span>
                        {isDead && <Badge variant="default">KILLED</Badge>}
                      </div>
                      <p className="text-xs text-sg-muted">${z.amount}/month</p>
                    </div>
                    {z.zombieScore != null && !isDead && <ZombieScore score={z.zombieScore} size="sm" showLabel={false} />}
                  </div>
                </motion.button>
              );
            })}

            {/* Score explanation */}
            <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="mt-4 p-4 rounded-xl " >
              <h4 className="text-xs font-semibold text-sg-muted uppercase tracking-wider mb-3">Score Weights</h4>
              <div className="space-y-2">
                {scoreExplanation.map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-sg-text2">{s.label}</span>
                    <span className="text-xs font-mono text-sg-muted">+{s.points}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-sg-border text-xs text-sg-muted">
                  Classifications: <span className="text-sg-green">0–25 Healthy</span> · <span className="text-sg-blue">26–50 Watch</span> · <span className="text-sg-amber">51–75 At Risk</span> · <span className="text-sg-red">76–100 Zombie</span>
                </div>
              </div>
            </div>
</ElectricBorder>
          </div>

          {/* Selected zombie detail */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ElectricBorder color="#FB7185" borderRadius={16} intensity={selected.zombieScore && selected.zombieScore >= 76 ? "intense" : "normal"}>
                  <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl border border-sg-red/20" >
                    <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: selected.color + "33" }}>
                          {selected.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black text-sg-text">{selected.name}</h2>
                            <Badge variant="zombie">ZOMBIE</Badge>
                          </div>
                          <p className="text-sm text-sg-muted">{selected.plan}</p>
                        </div>
                      </div>
                      {selected.zombieScore != null && <ZombieScore score={selected.zombieScore} size="lg" />}
                    </div>

                    <h3 className="text-sm font-semibold text-sg-muted uppercase tracking-wider mb-3">Why it's a zombie</h3>
                    <div className="space-y-2.5 mb-6">
                      {reasons.map((r, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-xl border border-sg-border"
                          style={{ background: "rgba(251,113,133,0.05)" }}
                        >
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-sg-red/15">
                            <r.icon size={13} className="text-sg-red" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-sg-text">{r.label}</span>
                              <span className="text-xs font-mono text-sg-red">+{r.points}</span>
                            </div>
                            <p className="text-xs text-sg-text2">{r.detail}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 rounded-xl border border-sg-border" style={{ background: "#0D1118" }}>
                        <div className="text-xs text-sg-muted mb-1">Monthly Impact</div>
                        <div className="text-xl font-black text-sg-red tabular-nums">${selected.amount}</div>
                      </div>
                      <div className="p-3 rounded-xl border border-sg-border" style={{ background: "#0D1118" }}>
                        <div className="text-xs text-sg-muted mb-1">Annual Impact</div>
                        <div className="text-xl font-black text-sg-red tabular-nums">${(selected.amount * 12).toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelected(zombies[(zombies.indexOf(selected) + 1) % zombies.length])}
                        className="px-4 py-2.5 text-sm font-medium rounded-xl border border-sg-border text-sg-text2 hover:text-sg-text transition-all"
                        style={{ background: "#0D1118" }}
                      >
                        Keep
                      </button>
                      <button className="px-4 py-2.5 text-sm font-medium rounded-xl border border-sg-amber/30 text-sg-amber hover:bg-sg-amber/10 transition-all">
                        Review
                      </button>
                      <button
                        onClick={() => setShowKillModal(true)}
                        className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-sg-red text-white hover:bg-sg-red/80 transition-all flex items-center justify-center gap-2"
                      >
                        <Skull size={14} /> Kill Subscription
                      </button>
                    </div>
                  </div>
</ElectricBorder>
                </ElectricBorder>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Kill confirmation modal */}
      <Modal open={showKillModal} onClose={() => setShowKillModal(false)} title={`Cancel ${selected.name}?`}>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-sg-red/20 bg-sg-red/5 text-center">
            <div className="text-3xl mb-2">💀</div>
            <div className="text-2xl font-black text-sg-red tabular-nums">${selected.amount}/month</div>
            <div className="text-sm text-sg-text2 mt-1">Potential saving: ${(selected.amount * 12).toFixed(2)}/year</div>
          </div>

          <div>
            <label className="block text-xs font-medium text-sg-muted mb-2">Reason for cancellation</label>
            <div className="space-y-2">
              {["Too expensive", "No longer using", "Found alternative", "Duplicate service", "Other"].map(r => (
                <label key={r} className="flex items-center gap-2 p-2.5 rounded-xl border border-sg-border hover:border-white/20 cursor-pointer transition-all">
                  <input type="radio" name="reason" className="accent-purple-500" />
                  <span className="text-sm text-sg-text2">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setShowKillModal(false)} className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-sg-border text-sg-text2 transition-all" style={{ background: "#0D1118" }}>
              Keep Subscription
            </button>
            <button
              onClick={handleKill}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-sg-red text-white hover:bg-sg-red/80 transition-all flex items-center justify-center gap-2"
            >
              {killDone ? <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Processing...</> : <><Skull size={14} /> Confirm Kill</>}
            </button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}
