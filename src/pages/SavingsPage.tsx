import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, TrendingDown } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import { savingsOpportunities, subscriptions } from "../data/mockData";
import CountUp from "../components/ui/CountUp";
import Badge from "../components/ui/Badge";

const simSubs = subscriptions.filter(s => s.status !== "cancelled").slice(0, 8);

export default function SavingsPage() {
  const [toggled, setToggled] = useState<Record<string, boolean>>(
    Object.fromEntries(simSubs.map(s => [s.id, true]))
  );

  const total = simSubs.reduce((sum, s) => sum + s.amount, 0);
  const simulated = simSubs.filter(s => toggled[s.id]).reduce((sum, s) => sum + s.amount, 0);
  const saved = total - simulated;

  return (
    <AppLayout title="Savings Opportunities" subtitle="SubGuard found ways to bring your money back">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero savings */}
        <div className="text-center py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-sg-muted uppercase tracking-widest mb-2">YOU COULD SAVE</p>
            <div className="text-6xl md:text-8xl font-black tabular-nums mb-2" style={{ color: "#4ADE80", textShadow: "0 0 40px rgba(74,222,128,0.3)" }}>
              $<CountUp end={635} duration={1.5} />
              <span className="text-4xl md:text-5xl">.76</span>
            </div>
            <p className="text-sg-text2 text-lg">per year</p>
          </motion.div>
        </div>

        {/* Opportunities */}
        <div>
          <h3 className="text-sm font-semibold text-sg-muted uppercase tracking-wider mb-4">Recommended Actions</h3>
          <div className="space-y-3">
            {savingsOpportunities.map((opp, i) => {
              const sub = subscriptions.find(s => s.id === opp.subscriptionId);
              const urgencyColor = opp.urgency === "critical" ? "#EF4444" : opp.urgency === "high" ? "#FB7185" : "#FBBF24";

              return (
                <motion.div key={opp.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <ElectricBorder color={urgencyColor} borderRadius={14} intensity={opp.urgency === "critical" ? "intense" : "normal"}>
                    <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl " >
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: (sub?.color ?? "#888") + "33" }}>
                            {sub?.logo ?? "?"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h4 className="text-base font-bold text-sg-text">{opp.name}</h4>
                              <Badge variant={opp.urgency === "critical" ? "critical" : opp.urgency === "high" ? "zombie" : "warning"}>
                                {opp.urgency.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-sg-text2">{opp.reason}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black tabular-nums" style={{ color: "#4ADE80" }}>
                            +${opp.yearly.toFixed(2)}
                          </div>
                          <div className="text-xs text-sg-muted">/year · +${opp.monthly.toFixed(2)}/mo</div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-sg-border text-sg-text2 hover:border-white/20 transition-all">
                          Learn More
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-white transition-all hover:opacity-90"
                          style={{ background: urgencyColor }}>
                          {opp.action === "cancel" || opp.action === "cancel-trial" ? "Cancel Now" : "Downgrade"}
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
</ElectricBorder>
                  </ElectricBorder>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Savings Simulator */}
        <div>
          <h3 className="text-sm font-semibold text-sg-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <Zap size={14} /> SAVINGS SIMULATOR
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="lg:col-span-3 p-5 rounded-2xl " >
              <p className="text-sm text-sg-text2 mb-4">Toggle subscriptions to simulate savings</p>
              <div className="space-y-2.5">
                {simSubs.map(sub => (
                  <div key={sub.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ background: sub.color + "33" }}>
                        {sub.logo}
                      </div>
                      <span className={`text-sm transition-all ${toggled[sub.id] ? "text-sg-text" : "text-sg-muted line-through"}`}>{sub.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums text-sg-text2">${sub.amount.toFixed(2)}</span>
                      <button
                        onClick={() => setToggled(t => ({ ...t, [sub.id]: !t[sub.id] }))}
                        className={`relative w-10 h-5 rounded-full transition-all ${toggled[sub.id] ? "bg-sg-green" : "bg-sg-border"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${toggled[sub.id] ? "left-5" : "left-0.5"}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
</ElectricBorder>

            <div className="lg:col-span-2 space-y-4">
              {[
                { label: "CURRENT COST", value: total, color: "#9BA3B4", prefix: "$" },
                { label: "SIMULATED", value: simulated, color: "#7DF9FF", prefix: "$" },
              ].map(m => (
                <ElectricBorder key={m.label} color={m.color} borderRadius={14} intensity="subtle">
                  <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl " >
                    <p className="text-xs text-sg-muted font-semibold tracking-widest mb-1">{m.label}</p>
                    <p className="text-3xl font-black tabular-nums" style={{ color: m.color }}>
                      {m.prefix}{m.value.toFixed(0)}
                      <span className="text-base text-sg-muted font-normal">/mo</span>
                    </p>
                  </div>
</ElectricBorder>
                </ElectricBorder>
              ))}

              <ElectricBorder color="#4ADE80" borderRadius={14} intensity="intense">
                <div className="p-5 rounded-2xl border border-sg-green/20 bg-sg-green/5">
                  <p className="text-xs font-semibold tracking-widest mb-1" style={{ color: "#4ADE80" }}>SAVE</p>
                  <p className="text-4xl font-black tabular-nums" style={{ color: "#4ADE80" }}>
                    ${Math.max(0, saved).toFixed(0)}
                    <span className="text-base font-normal text-sg-muted">/mo</span>
                  </p>
                  <p className="text-sm font-bold mt-1" style={{ color: "#4ADE80" }}>
                    ${Math.max(0, saved * 12).toFixed(0)}/year
                  </p>
                </div>
              </ElectricBorder>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
