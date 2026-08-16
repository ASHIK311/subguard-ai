import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, List } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { upcomingPayments } from "../data/mockData";
import ElectricBorder from "../components/effects/ElectricBorder";

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

export default function UpcomingPaymentsPage() {
  const [view, setView] = useState<"calendar" | "timeline">("timeline");

  const next7 = upcomingPayments.filter(p => p.daysUntil <= 7);
  const totalNext7 = next7.reduce((sum, p) => sum + p.amount, 0);
  const totalMonth = upcomingPayments.reduce((sum, p) => sum + p.amount, 0);

  const paymentsByDay: Record<number, typeof upcomingPayments> = {};
  upcomingPayments.forEach(p => {
    const day = parseInt(p.date.split(" ")[1]);
    if (!paymentsByDay[day]) paymentsByDay[day] = [];
    paymentsByDay[day].push(p);
  });

  return (
    <AppLayout title="Upcoming Payments" subtitle="Your payment forecast for the next 30 days">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Next 7 days", value: `${next7.length} charges`, sub: `$${totalNext7.toFixed(2)} total`, color: "#FB7185" },
            { label: "This month", value: `${upcomingPayments.length} payments`, sub: `$${totalMonth.toFixed(2)} total`, color: "#A855F7" },
            { label: "Largest upcoming", value: "$54.99", sub: "Adobe Creative Cloud", color: "#FBBF24" },
          ].map(m => (
            <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div key={m.label} className="p-4 rounded-xl " >
              <div className="text-xs text-sg-muted mb-1">{m.label}</div>
              <div className="text-lg font-bold tabular-nums mb-0.5" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs text-sg-muted">{m.sub}</div>
            </div>
</ElectricBorder>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <button onClick={() => setView("timeline")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${view === "timeline" ? "bg-sg-purple/20 text-sg-purple border-sg-purple/30" : "text-sg-muted border-sg-border"}`}>
            <List size={13} /> Timeline
          </button>
          <button onClick={() => setView("calendar")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${view === "calendar" ? "bg-sg-purple/20 text-sg-purple border-sg-purple/30" : "text-sg-muted border-sg-border"}`}>
            <Calendar size={13} /> Calendar
          </button>
        </div>

        {view === "timeline" && (
          <div className="space-y-2">
            {upcomingPayments.map((payment, i) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${payment.daysUntil <= 3 ? "border-sg-red/30 bg-sg-red/5" : payment.daysUntil <= 7 ? "border-sg-amber/20 bg-sg-amber/5" : "border-sg-border"}`}
                style={payment.daysUntil > 7 ? { background: "#101620" } : undefined}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: payment.color + "33" }}>
                  {payment.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-sg-text">{payment.name}</span>
                    {payment.daysUntil <= 3 && (
                      <span className="text-xs font-medium text-sg-red">Tomorrow</span>
                    )}
                  </div>
                  <div className="text-xs text-sg-muted">{payment.date} · {payment.daysUntil} day{payment.daysUntil !== 1 ? "s" : ""} away</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold tabular-nums text-sg-text">${payment.amount.toFixed(2)}</div>
                  <div className="text-xs text-sg-muted">monthly</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {view === "calendar" && (
          <div className="p-5 rounded-2xl border border-sg-border" style={{ background: "#101620" }}>
            <div className="text-center mb-4 font-semibold text-sg-text">August 2025</div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className="text-center text-xs text-sg-muted py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* August 1 starts on Friday (col 5) */}
              {[...Array(4)].map((_, i) => <div key={`empty-${i}`} />)}
              {calendarDays.map(day => {
                const payments = paymentsByDay[day];
                const today = 14;
                const isPast = day < today;
                return (
                  <div key={day}
                    className={`relative aspect-square flex flex-col items-center justify-start pt-1 rounded-lg text-xs transition-all ${
                      day === today ? "bg-sg-purple/20 text-sg-purple font-bold" :
                      isPast ? "text-sg-muted opacity-40" :
                      payments ? "bg-sg-surface2 cursor-pointer hover:bg-sg-elevated" :
                      "text-sg-text2 hover:bg-white/3"
                    }`}
                  >
                    <span>{day}</span>
                    {payments && (
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full" style={{ background: payments[0].color }} />
                    )}
                    {payments && payments.length > 0 && (
                      <div className="text-xs mt-0.5 text-sg-purple truncate w-full text-center px-0.5" style={{ fontSize: "9px" }}>
                        ${payments.reduce((s, p) => s + p.amount, 0).toFixed(0)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
