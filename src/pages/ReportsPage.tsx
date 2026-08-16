import { motion } from "framer-motion";
import { Download, Share2, TrendingUp, TrendingDown } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { spendingByMonth, categoryBreakdown } from "../data/mockData";
import ElectricBorder from "../components/effects/ElectricBorder";

const forecastData = [
  ...spendingByMonth,
  { month: "Sep", amount: 179, forecast: true },
  { month: "Oct", amount: 175, forecast: true },
  { month: "Nov", amount: 172, forecast: true },
];

const savingsHistory = [
  { month: "Feb", saved: 0 },
  { month: "Mar", saved: 0 },
  { month: "Apr", saved: 12 },
  { month: "May", saved: 12 },
  { month: "Jun", saved: 24 },
  { month: "Jul", saved: 36 },
  { month: "Aug", saved: 48 },
];

export default function ReportsPage() {
  return (
    <AppLayout title="Reports" subtitle="August 2025 Subscription Report">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Report header */}
        <div className="p-6 rounded-2xl border border-sg-border" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(16,22,32,1) 100%)" }}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs text-sg-muted uppercase tracking-wider mb-1">Monthly Report</p>
              <h2 className="text-3xl font-black text-sg-text mb-1">August 2025</h2>
              <p className="text-sg-text2 text-sm">Subscription intelligence summary</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-sg-border text-sg-text2 hover:border-white/20 transition-all" style={{ background: "#0D1118" }}>
                <Download size={12} /> Export PDF
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-sg-border text-sg-text2 hover:border-white/20 transition-all" style={{ background: "#0D1118" }}>
                <Share2 size={12} /> Share
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Monthly Spend", value: "$184.72", color: "#A855F7" },
              { label: "Change", value: "+4.8%", color: "#FB7185" },
              { label: "New", value: "2", color: "#38BDF8" },
              { label: "Cancelled", value: "1", color: "#4ADE80" },
              { label: "Price Increases", value: "2", color: "#FBBF24" },
              { label: "Saved", value: "$23.99", color: "#4ADE80" },
            ].map(m => (
              <div key={m.label}>
                <div className="text-xs text-sg-muted mb-0.5">{m.label}</div>
                <div className="text-lg font-black tabular-nums" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Spending */}
          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl " >
            <h3 className="text-sm font-semibold text-sg-text mb-4">Monthly Spending</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={spendingByMonth} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <XAxis dataKey="month" tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [`$${v}`, "Spend"]} contentStyle={{ background: "#0D1118", border: "1px solid #ffffff14", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="amount" fill="#A855F7" radius={[4, 4, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
</ElectricBorder>

          {/* Forecast */}
          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl " >
            <h3 className="text-sm font-semibold text-sg-text mb-4">Annual Forecast</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={forecastData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7DF9FF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7DF9FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [`$${v}`, "Spend"]} contentStyle={{ background: "#0D1118", border: "1px solid #ffffff14", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="amount" stroke="#7DF9FF" strokeWidth={2} fill="url(#forecastGrad)" dot={{ fill: "#7DF9FF", r: 3, strokeWidth: 0 }} strokeDasharray={(d: any) => d.forecast ? "4 4" : undefined} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
</ElectricBorder>

          {/* Category distribution */}
          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl " >
            <h3 className="text-sm font-semibold text-sg-text mb-4">Category Distribution</h3>
            <div className="flex items-center gap-6">
              <PieChart width={130} height={130}>
                <Pie data={categoryBreakdown} cx={60} cy={60} innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                  {categoryBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div className="space-y-2 flex-1">
                {categoryBreakdown.map(cat => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                      <span className="text-sg-text2">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sg-muted">{cat.value}%</span>
                      <span className="text-sg-text tabular-nums">${cat.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </ElectricBorder>

          {/* Savings history */}
          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl " >
            <h3 className="text-sm font-semibold text-sg-text mb-4">Cumulative Savings</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={savingsHistory} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [`$${v}`, "Saved"]} contentStyle={{ background: "#0D1118", border: "1px solid #ffffff14", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="saved" stroke="#4ADE80" strokeWidth={2} fill="url(#savingsGrad)" dot={{ fill: "#4ADE80", r: 3, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
</ElectricBorder>
        </div>
      </div>
    </AppLayout>
  );
}
