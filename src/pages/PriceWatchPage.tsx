import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import Badge from "../components/ui/Badge";
import { subscriptions } from "../data/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const priceIncreases = subscriptions.filter(s => s.priceChange);

const priceHistories: Record<string, Array<{ month: string; amount: number }>> = {
  canva: [
    { month: "Jan", amount: 12.99 }, { month: "Feb", amount: 12.99 }, { month: "Mar", amount: 12.99 },
    { month: "Apr", amount: 12.99 }, { month: "May", amount: 12.99 }, { month: "Jun", amount: 12.99 },
    { month: "Jul", amount: 15.99 }, { month: "Aug", amount: 15.99 },
  ],
  nordvpn: [
    { month: "Jan", amount: 10.99 }, { month: "Feb", amount: 10.99 }, { month: "Mar", amount: 10.99 },
    { month: "Apr", amount: 10.99 }, { month: "May", amount: 10.99 }, { month: "Jun", amount: 12.99 },
    { month: "Jul", amount: 12.99 }, { month: "Aug", amount: 12.99 },
  ],
};

export default function PriceWatchPage() {
  return (
    <AppLayout title="Price Watch" subtitle="Know when a subscription silently becomes more expensive">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Increases This Month", value: "2", color: "#FBBF24" },
            { label: "Extra Monthly Cost", value: "+$9.00", color: "#FB7185" },
            { label: "Projected Annual", value: "+$108/yr", color: "#FB7185" },
          ].map(m => (
            <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div key={m.label} className="p-4 rounded-xl  text-center" >
              <div className="text-2xl font-black tabular-nums mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs text-sg-muted">{m.label}</div>
            </div>
</ElectricBorder>
          ))}
        </div>

        {/* Price increase cards */}
        {priceIncreases.map((sub, i) => {
          const history = priceHistories[sub.id] ?? priceHistories.canva;
          const change = sub.priceChange!;
          const pct = (((change.to - change.from) / change.from) * 100).toFixed(1);

          return (
            <motion.div key={sub.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <ElectricBorder color="#FBBF24" borderRadius={16} intensity="normal">
                <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl border border-sg-amber/20" >
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0" style={{ background: sub.color + "33" }}>
                        {sub.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-sg-text">{sub.name.toUpperCase()}</h3>
                          <Badge variant="warning">PRICE INCREASE</Badge>
                        </div>
                        <p className="text-sm text-sg-muted">{sub.plan} · {sub.account}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-xs text-sg-muted mb-0.5">Previous</div>
                          <div className="text-lg font-bold text-sg-text2 line-through tabular-nums">${change.from}</div>
                        </div>
                        <TrendingUp size={20} className="text-sg-amber" />
                        <div>
                          <div className="text-xs text-sg-muted mb-0.5">Current</div>
                          <div className="text-2xl font-black text-sg-amber tabular-nums">${change.to}</div>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center justify-end gap-2">
                        <span className="text-sm font-semibold text-sg-red">+{pct}%</span>
                        <span className="text-xs text-sg-muted">Annual impact: +${((change.to - change.from) * 12).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs text-sg-muted mb-2">Price history</p>
                    <ResponsiveContainer width="100%" height={100}>
                      <AreaChart data={history} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                        <defs>
                          <linearGradient id={`priceGrad-${sub.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fill: "#687084", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#687084", fontSize: 10 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                        <Tooltip formatter={(v: any) => [`$${v}`, "Price"]} contentStyle={{ background: "#0D1118", border: "1px solid #ffffff14", borderRadius: 8, fontSize: 11 }} />
                        <ReferenceLine y={change.from} stroke="#FBBF2440" strokeDasharray="3 3" />
                        <Area type="stepAfter" dataKey="amount" stroke="#FBBF24" strokeWidth={2} fill={`url(#priceGrad-${sub.id})`} dot={{ fill: "#FBBF24", r: 3, strokeWidth: 0 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium rounded-xl border border-sg-border text-sg-text2 hover:text-sg-text hover:border-white/20 transition-all" style={{ background: "#0D1118" }}>
                      Accept Increase
                    </button>
                    <button className="px-4 py-2 text-sm font-medium rounded-xl border border-sg-blue/30 text-sg-blue hover:bg-sg-blue/10 transition-all">
                      Compare Alternatives
                    </button>
                    <button className="px-4 py-2 text-sm font-medium rounded-xl bg-sg-red/15 text-sg-red border border-sg-red/30 hover:bg-sg-red/25 transition-all">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
</ElectricBorder>
              </ElectricBorder>
            </motion.div>
          );
        })}

        {/* Monitored subscriptions */}
        <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl " >
          <h3 className="text-sm font-semibold text-sg-text mb-4 flex items-center gap-2">
            <AlertTriangle size={14} className="text-sg-muted" />
            All Monitored Services
          </h3>
          <div className="space-y-2">
            {subscriptions.filter(s => s.status !== "cancelled").map(sub => (
              <div key={sub.id} className="flex items-center justify-between py-2 border-b border-sg-border last:border-none">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ background: sub.color + "33" }}>
                    {sub.logo}
                  </div>
                  <span className="text-sm text-sg-text">{sub.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm tabular-nums text-sg-text2">${sub.amount}/mo</span>
                  {sub.priceChange ? (
                    <Badge variant="warning">↑ {(((sub.priceChange.to - sub.priceChange.from) / sub.priceChange.from) * 100).toFixed(0)}%</Badge>
                  ) : (
                    <Badge variant="healthy">Stable</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
</ElectricBorder>
      </div>
    </AppLayout>
  );
}
