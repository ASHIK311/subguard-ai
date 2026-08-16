import { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import Badge from "../components/ui/Badge";
import { transactions } from "../data/mockData";
import ElectricBorder from "../components/effects/ElectricBorder";

const categories = ["All", "Entertainment", "Software", "Cloud", "Dining", "Shopping", "Transport"];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = transactions.filter(t => {
    const matchSearch = !search || t.merchant.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || t.category === category;
    return matchSearch && matchCat;
  });

  return (
    <AppLayout title="Transactions" subtitle={`${transactions.length} transactions · Last 30 days`}>
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sg-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-sg-elevated border border-sg-border rounded-xl text-sg-text placeholder-sg-muted focus:outline-none focus:border-sg-purple/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${category === c ? "bg-sg-purple/20 text-sg-purple border-sg-purple/30" : "text-sg-muted border-sg-border hover:border-white/20"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="rounded-2xl  overflow-hidden" >
          <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-sg-border">
            {["Merchant", "Category", "Date", "Account", "Type", "Amount"].map((h, i) => (
              <div key={h} className={`text-xs font-semibold text-sg-muted ${i === 0 ? "col-span-3" : i === 1 ? "col-span-2" : i === 2 ? "col-span-2" : i === 3 ? "col-span-2" : i === 4 ? "col-span-1" : "col-span-2 text-right"}`}>
                {h}
              </div>
            ))}
          </div>
          <div>
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-sg-border last:border-none hover:bg-white/2 transition-all items-center"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}>
                    {t.logo}
                  </div>
                  <span className="text-sm font-medium text-sg-text truncate">{t.merchant}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-sg-text2">{t.category}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-sg-muted">{t.date}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-sg-muted truncate">{t.account}</span>
                </div>
                <div className="col-span-1">
                  <Badge variant={t.type === "recurring" ? "purple" : t.type === "trial" ? "trial" : "default"}>
                    {t.type === "recurring" ? "Recurring" : t.type === "trial" ? "Trial" : ""}
                  </Badge>
                </div>
                <div className="col-span-2 text-right">
                  <span className={`text-sm font-semibold tabular-nums ${t.type === "recurring" ? "text-sg-purple" : "text-sg-text"}`}>
                    -${t.amount.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
</ElectricBorder>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sg-text2 text-sm">No transactions found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
