import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List, SlidersHorizontal, TrendingUp, Ghost, AlertTriangle } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import Badge from "../components/ui/Badge";
import ZombieScore from "../components/ui/ZombieScore";
import Modal from "../components/ui/Modal";
import { subscriptions, type Subscription } from "../data/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const filters = ["All", "Active", "Trials", "Zombie", "Price Increased", "Cancelled"];
const sorts = ["Highest Cost", "Upcoming Renewal", "Zombie Score"];

const priceHistory = [
  { month: "Mar", amount: 12.99 },
  { month: "Apr", amount: 12.99 },
  { month: "May", amount: 12.99 },
  { month: "Jun", amount: 12.99 },
  { month: "Jul", amount: 15.99 },
  { month: "Aug", amount: 15.99 },
];

function SubscriptionDetail({ sub, onClose }: { sub: Subscription; onClose: () => void }) {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "price history", "payments", "ai analysis"];

  return (
    <Modal open onClose={onClose} size="lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0" style={{ background: sub.color + "33" }}>
          {sub.logo}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-sg-text">{sub.name}</h2>
            <Badge variant={sub.status === "healthy" ? "healthy" : sub.status === "zombie" ? "zombie" : sub.status === "trial" ? "trial" : "review"}>
              {sub.status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-sg-muted">{sub.plan}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black tabular-nums text-sg-text">${sub.amount}</div>
          <div className="text-xs text-sg-muted">/ month</div>
        </div>
      </div>

      <div className="flex gap-1 mb-5">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${tab === t ? "bg-sg-purple/20 text-sg-purple" : "text-sg-muted hover:text-sg-text2"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Next Payment", value: sub.nextPayment },
              { label: "Annual Cost", value: `$${(sub.amount * 12).toFixed(2)}` },
              { label: "Lifetime Spend", value: `$${sub.lifetimeSpend.toFixed(2)}` },
              { label: "First Detected", value: sub.startDate },
            ].map(m => (
              <div key={m.label} className="p-3 rounded-xl border border-sg-border" style={{ background: "#0D1118" }}>
                <div className="text-xs text-sg-muted mb-1">{m.label}</div>
                <div className="text-sm font-semibold text-sg-text">{m.value}</div>
              </div>
            ))}
          </div>
          {sub.status === "zombie" && sub.zombieScore && (
            <div className="p-4 rounded-xl border border-sg-red/30 bg-sg-red/5">
              <div className="flex items-center gap-3">
                <ZombieScore score={sub.zombieScore} size="lg" />
                <div>
                  <p className="text-sm font-semibold text-sg-red">This subscription is a zombie</p>
                  <p className="text-xs text-sg-text2">Low usage detected over 3+ months. Consider cancellation.</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <button className="flex-1 py-2 text-sm font-medium rounded-xl border border-sg-border text-sg-text hover:border-white/20 transition-all" style={{ background: "#0D1118" }}>
              Manage Plan
            </button>
            <button className="flex-1 py-2 text-sm font-medium rounded-xl bg-sg-red/15 text-sg-red border border-sg-red/30 hover:bg-sg-red/25 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      {tab === "price history" && (
        <div>
          {sub.priceChange ? (
            <div className="mb-4 p-3 rounded-xl border border-sg-amber/30 bg-sg-amber/5">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={14} className="text-sg-amber" />
                <span className="text-sg-amber font-semibold">Price increased from ${sub.priceChange.from} to ${sub.priceChange.to}</span>
              </div>
            </div>
          ) : null}
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={priceHistory}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#687084", fontSize: 11 }} axisLine={false} tickLine={false} domain={[10, 18]} />
              <Tooltip formatter={(v: any) => [`$${v}`, "Price"]} contentStyle={{ background: "#0D1118", border: "1px solid #ffffff14", borderRadius: 8, fontSize: 12 }} />
              <Area type="stepAfter" dataKey="amount" stroke="#FBBF24" strokeWidth={2} fill="url(#priceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === "ai analysis" && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-sg-purple/20 bg-sg-purple/5">
            <p className="text-xs text-sg-purple font-semibold mb-2">✨ AI Analysis</p>
            <p className="text-sm text-sg-text2">
              Based on your usage patterns, this subscription scores {sub.zombieScore ?? "low"} on the zombie scale.{" "}
              {sub.status === "zombie" ? "You have not actively used this service in over 3 months. Cancelling would save $" + (sub.amount * 12).toFixed(2) + " annually." : "Your usage appears consistent with the plan cost."}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}

function SubCard({ sub, onClick }: { sub: Subscription; onClick: () => void }) {
  const statusColors: Record<string, string> = {
    healthy: "#4ADE80", review: "#FBBF24", zombie: "#FB7185", trial: "#38BDF8", cancelled: "#687084"
  };
  const electricColor = statusColors[sub.status];

  return (
    <ElectricBorder color={electricColor} borderRadius={14} intensity={sub.status === "zombie" ? "normal" : "subtle"}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={onClick}
        className="p-4 rounded-2xl cursor-pointer transition-all h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: sub.color + "33" }}>
              {sub.logo}
            </div>
            <div>
              <div className="text-sm font-semibold text-sg-text">{sub.name}</div>
              <div className="text-xs text-sg-muted">{sub.plan}</div>
            </div>
          </div>
          <Badge variant={sub.status === "healthy" ? "healthy" : sub.status === "zombie" ? "zombie" : sub.status === "trial" ? "trial" : "review"}>
            {sub.status === "zombie" ? "HIGH RISK" : sub.status === "trial" ? "TRIAL" : sub.status === "review" && sub.priceChange ? "REVIEW" : sub.status.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-black tabular-nums text-sg-text">
              ${sub.amount}<span className="text-xs text-sg-muted font-normal">/mo</span>
            </div>
            {sub.priceChange && (
              <div className="text-xs text-sg-amber flex items-center gap-1 mt-0.5">
                <TrendingUp size={10} /> PRICE ↑ 23%
              </div>
            )}
            {sub.status === "trial" && sub.trialEnds && (
              <div className="text-xs text-sg-blue mt-0.5">Expires in 3 days</div>
            )}
          </div>
          {sub.zombieScore != null && (
            <ZombieScore score={sub.zombieScore} size="sm" showLabel={false} />
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-sg-border">
          <p className="text-xs text-sg-muted">Next payment {sub.nextPayment}</p>
        </div>
      </motion.div>
    </ElectricBorder>
  );
}

export default function SubscriptionsPage() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Highest Cost");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Subscription | null>(null);

  const filtered = subscriptions
    .filter(s => {
      if (filter === "Active") return s.status !== "cancelled";
      if (filter === "Trials") return s.status === "trial";
      if (filter === "Zombie") return s.status === "zombie";
      if (filter === "Price Increased") return !!s.priceChange;
      if (filter === "Cancelled") return s.status === "cancelled";
      return true;
    })
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "Highest Cost") return b.amount - a.amount;
      if (sort === "Zombie Score") return (b.zombieScore ?? 0) - (a.zombieScore ?? 0);
      return 0;
    });

  const totalMonthly = subscriptions.filter(s => s.status !== "cancelled").reduce((sum, s) => sum + s.amount, 0);

  return (
    <AppLayout title="Your Subscriptions" subtitle={`${subscriptions.length} total · $${totalMonthly.toFixed(2)}/month`}>
      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sg-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search subscriptions..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-sg-elevated border border-sg-border rounded-xl text-sg-text placeholder-sg-muted focus:outline-none focus:border-sg-purple/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-3 py-2 text-sm bg-sg-elevated border border-sg-border rounded-xl text-sg-text2 focus:outline-none cursor-pointer"
            >
              {sorts.map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="flex border border-sg-border rounded-xl overflow-hidden">
              <button onClick={() => setView("cards")} className={`p-2 transition-all ${view === "cards" ? "bg-sg-purple/20 text-sg-purple" : "text-sg-muted hover:text-sg-text2"}`}>
                <LayoutGrid size={15} />
              </button>
              <button onClick={() => setView("table")} className={`p-2 transition-all ${view === "table" ? "bg-sg-purple/20 text-sg-purple" : "text-sg-muted hover:text-sg-text2"}`}>
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap mb-5">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filter === f ? "bg-sg-purple/20 text-sg-purple border-sg-purple/30" : "text-sg-muted border-sg-border hover:border-white/20 hover:text-sg-text2"}`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-sg-muted self-center">{filtered.length} results</span>
        </div>

        {/* Cards view */}
        {view === "cards" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((sub, i) => (
              <motion.div key={sub.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <SubCard sub={sub} onClick={() => setSelected(sub)} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Table view */}
        {view === "table" && (
          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="rounded-2xl  overflow-hidden" >
            <table className="w-full">
              <thead>
                <tr className="border-b border-sg-border">
                  {["Service", "Plan", "Amount", "Next Payment", "Status", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-sg-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(sub => (
                  <tr key={sub.id} className="border-b border-sg-border last:border-none hover:bg-white/3 cursor-pointer transition-all" onClick={() => setSelected(sub)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: sub.color + "33" }}>
                          {sub.logo}
                        </div>
                        <span className="text-sm font-medium text-sg-text">{sub.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-sg-text2">{sub.plan}</td>
                    <td className="px-4 py-3 text-sm font-semibold tabular-nums text-sg-text">${sub.amount}/mo</td>
                    <td className="px-4 py-3 text-sm text-sg-text2">{sub.nextPayment}</td>
                    <td className="px-4 py-3">
                      <Badge variant={sub.status === "healthy" ? "healthy" : sub.status === "zombie" ? "zombie" : sub.status === "trial" ? "trial" : "review"}>
                        {sub.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sg-muted">
                      {sub.zombieScore != null && <ZombieScore score={sub.zombieScore} size="sm" showLabel={false} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
</ElectricBorder>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sg-text2">No subscriptions found</p>
          </div>
        )}
      </div>

      {selected && <SubscriptionDetail sub={selected} onClose={() => setSelected(null)} />}
    </AppLayout>
  );
}
