import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingDown, TrendingUp, AlertTriangle, Ghost, ArrowRight, Clock } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import Badge from "../components/ui/Badge";
import { subscriptions, spendingByMonth, categoryBreakdown, upcomingPayments, notifications } from "../data/mockData";

const metrics = [
  { label: "Monthly Spend", value: "$184.72", sub: "↓ 8.4% vs last month", subColor: "#4ADE80", icon: TrendingDown, color: "#A855F7", electricColor: "#A855F7" },
  { label: "Yearly Commitment", value: "$2,216.64", sub: "Active subscriptions", subColor: "#9BA3B4", icon: null, color: "#7DF9FF", electricColor: "#7DF9FF" },
  { label: "Potential Savings", value: "$624.20", sub: "18% of spending", subColor: "#4ADE80", icon: TrendingDown, color: "#4ADE80", electricColor: "#4ADE80", highlight: true },
  { label: "Active Services", value: "16", sub: "2 trials active", subColor: "#38BDF8", icon: null, color: "#38BDF8", electricColor: "#38BDF8" },
];

const needsAttention = subscriptions.filter(s => s.status === "zombie" || s.status === "review" || s.status === "trial").slice(0, 3);

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl border border-sg-border text-xs" style={{ background: "#0D1118" }}>
      <p className="text-sg-muted mb-0.5">{label}</p>
      <p className="font-bold text-sg-purple">${payload[0].value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [chartRange, setChartRange] = useState("6M");

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Greeting */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-sg-text">Good morning, Nakib 👋</h2>
            <p className="text-sm text-sg-muted mt-0.5">Here's what's happening with your subscriptions.</p>
          </div>
          <Link to="/app/ai-insights" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-sg-purple/30 bg-sg-purple/10 text-sg-purple hover:bg-sg-purple/20 transition-all">
            ✨ Ask AI Assistant
          </Link>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <ElectricBorder color={m.electricColor} borderRadius={14} intensity={m.highlight ? "intense" : "subtle"} className="h-full">
                <div className="p-5 h-full">
                  <p className="text-xs text-sg-muted mb-2">{m.label}</p>
                  <p className="text-2xl font-black tabular-nums mb-1" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-xs" style={{ color: m.subColor }}>{m.sub}</p>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <ElectricBorder color="#A855F7" borderRadius={16} className="h-full">
              <div className="p-5 h-full">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-semibold text-sg-text">Subscription Spending</h3>
                  <p className="text-xs text-sg-muted mt-0.5">Monthly recurring charges</p>
                </div>
                <div className="flex gap-1">
                  {["1M", "3M", "6M", "1Y"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setChartRange(r)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${chartRange === r ? "bg-sg-purple/20 text-sg-purple" : "text-sg-muted hover:text-sg-text2"}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={spendingByMonth} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                  <defs>
                    <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="amount" stroke="#A855F7" strokeWidth={2} fill="url(#spendGrad)" dot={{ fill: "#A855F7", r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#A855F7" }} />
                </AreaChart>
              </ResponsiveContainer>
              </div>
            </ElectricBorder>
          </motion.div>

          {/* Category donut */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <ElectricBorder color="#38BDF8" borderRadius={16} className="h-full">
              <div className="p-5 h-full">
              <h3 className="text-base font-semibold text-sg-text mb-4">Categories</h3>
              <div className="flex justify-center mb-4">
                <PieChart width={150} height={150}>
                  <Pie data={categoryBreakdown} cx={70} cy={70} innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="space-y-2">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                      <span className="text-sg-text2">{cat.name}</span>
                    </div>
                    <span className="font-medium text-sg-text">{cat.value}%</span>
                  </div>
                ))}
              </div>
              </div>
            </ElectricBorder>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Needs Attention */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <ElectricBorder color="#FBBF24" borderRadius={16} className="h-full">
              <div className="p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-sg-text flex items-center gap-2">
                  <AlertTriangle size={15} className="text-sg-amber" /> Needs Attention
                </h3>
                <Link to="/app/subscriptions" className="text-xs text-sg-purple hover:text-sg-text transition-colors">View all</Link>
              </div>
              <div className="space-y-3">
                {needsAttention.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-3 p-3 rounded-xl border border-sg-border hover:border-white/15 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 text-white" style={{ background: sub.color + "33" }}>
                      {sub.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-sg-text">{sub.name}</span>
                        {sub.status === "zombie" && sub.zombieScore && (
                          <Badge variant="zombie">Zombie {sub.zombieScore}</Badge>
                        )}
                        {sub.status === "review" && sub.priceChange && (
                          <Badge variant="warning">PRICE ↑ 23%</Badge>
                        )}
                        {sub.status === "trial" && (
                          <Badge variant="trial">TRIAL</Badge>
                        )}
                      </div>
                      <p className="text-xs text-sg-muted truncate">
                        {sub.status === "zombie" ? `$${sub.amount}/month — not used in months` :
                         sub.status === "review" && sub.priceChange ? `$${sub.priceChange.from} → $${sub.priceChange.to} (+23.1%)` :
                         `Expires in 3 days — then $${sub.amount}/month`}
                      </p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums" style={{ color: sub.status === "zombie" ? "#FB7185" : sub.status === "trial" ? "#38BDF8" : "#FBBF24" }}>
                      ${sub.amount}
                    </span>
                  </div>
                ))}
              </div>
              </div>
            </ElectricBorder>
          </motion.div>

          {/* Upcoming payments */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <ElectricBorder color="#4ADE80" borderRadius={16} className="h-full">
              <div className="p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-sg-text flex items-center gap-2">
                  <Clock size={15} className="text-sg-blue" /> Upcoming Payments
                </h3>
                <Link to="/app/upcoming" className="text-xs text-sg-purple hover:text-sg-text transition-colors">View calendar</Link>
              </div>
              <div className="space-y-2.5">
                {upcomingPayments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 text-white" style={{ background: payment.color + "33" }}>
                        {payment.logo}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-sg-text">{payment.name}</div>
                        <div className="text-xs text-sg-muted">{payment.date}</div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-sg-text">
                      ${payment.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-sg-border flex items-center justify-between">
                  <span className="text-xs text-sg-muted">Next 7 days — 5 charges</span>
                  <span className="text-sm font-bold text-sg-text">$96.83</span>
                </div>
              </div>
              </div>
            </ElectricBorder>
          </motion.div>
        </div>

        {/* Recent notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <ElectricBorder color="#7DF9FF" borderRadius={16} className="h-full">
            <div className="p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-sg-text">Recent Alerts</h3>
              <Link to="/app/notifications" className="text-xs text-sg-purple hover:text-sg-text transition-colors flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${!n.read ? "border-sg-purple/20 bg-sg-purple/5" : "border-sg-border"}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${
                    n.type === "price_alert" ? "bg-sg-amber/15 text-sg-amber" :
                    n.type === "zombie_detected" ? "bg-sg-red/15 text-sg-red" :
                    n.type === "upcoming_renewal" ? "bg-sg-blue/15 text-sg-blue" :
                    "bg-sg-green/15 text-sg-green"
                  }`}>
                    {n.type === "zombie_detected" ? <Ghost size={13} /> : n.type === "price_alert" ? <TrendingUp size={13} /> : <Clock size={13} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-sg-text">{n.title}</span>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-sg-purple flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-sg-muted mt-0.5 truncate">{n.message}</p>
                  </div>
                  <span className="text-xs text-sg-muted flex-shrink-0">{n.date.split(",")[0]}</span>
                </div>
              ))}
            </div>
            </div>
          </ElectricBorder>
        </motion.div>
      </div>
    </AppLayout>
  );
}
