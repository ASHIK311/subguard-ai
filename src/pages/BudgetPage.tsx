import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import Badge from "../components/ui/Badge";

const totalBudget = 150;
const currentSpend = 137;
const budgetUsed = (currentSpend / totalBudget) * 100;

const categoryBudgets = [
  { name: "Entertainment", budget: 60, spent: 48, color: "#A855F7" },
  { name: "Software", budget: 50, spent: 52, color: "#7DF9FF", over: true },
  { name: "Cloud", budget: 25, spent: 19, color: "#38BDF8" },
  { name: "Education", budget: 30, spent: 18, color: "#4ADE80" },
];

export default function BudgetPage() {
  return (
    <AppLayout title="Budgets" subtitle="Set limits and track your subscription spend">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Total budget */}
        <ElectricBorder color={budgetUsed >= 90 ? "#FBBF24" : "#A855F7"} borderRadius={16} intensity="normal">
          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl " >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-sg-muted uppercase tracking-wider mb-1">Total Subscription Budget</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black tabular-nums text-sg-text">${currentSpend}</span>
                  <span className="text-sg-muted mb-1">/ ${totalBudget}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black tabular-nums" style={{ color: budgetUsed >= 90 ? "#FBBF24" : "#A855F7" }}>
                  {Math.round(budgetUsed)}%
                </div>
                <p className="text-xs text-sg-muted">used</p>
              </div>
            </div>
            <div className="w-full bg-white/8 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, budgetUsed)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: budgetUsed >= 90 ? "linear-gradient(90deg, #FBBF24, #EF4444)" : "linear-gradient(90deg, #7C3AED, #A855F7)" }}
              />
            </div>
            <p className="text-xs text-sg-muted mt-2">
              ${totalBudget - currentSpend} remaining · Projected: ${currentSpend} this month
            </p>
          </div>
</ElectricBorder>
        </ElectricBorder>

        {/* Category budgets */}
        <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="space-y-3">
          <h3 className="text-sm font-semibold text-sg-muted uppercase tracking-wider">Category Budgets</h3>
          {categoryBudgets.map((cat, i) => {
            const pct = (cat.spent / cat.budget) * 100;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl "
                
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-sg-text">{cat.name}</span>
                    {cat.over && <Badge variant="warning">OVER BUDGET</Badge>}
                  </div>
                  <div className="text-sm font-semibold tabular-nums">
                    <span style={{ color: cat.over ? "#FBBF24" : cat.color }}>${cat.spent}</span>
                    <span className="text-sg-muted">/${cat.budget}</span>
                  </div>
                </div>
                <div className="w-full bg-white/8 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, pct)}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: cat.over ? "#EF4444" : cat.color }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-xs text-sg-muted">{Math.round(pct)}% used</p>
                  <p className="text-xs" style={{ color: cat.over ? "#FBBF24" : "#9BA3B4" }}>
                    {cat.over ? `$${cat.spent - cat.budget} over` : `$${cat.budget - cat.spent} left`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
</ElectricBorder>

        {/* Add budget */}
        <button className="w-full py-3 text-sm font-medium text-sg-text2 rounded-xl border border-dashed border-sg-border hover:border-sg-purple/40 hover:text-sg-purple transition-all">
          + Add Category Budget
        </button>
      </div>
    </AppLayout>
  );
}
