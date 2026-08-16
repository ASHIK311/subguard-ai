import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, TrendingUp, Ghost, Clock, Zap, Check } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { notifications, type Notification } from "../data/mockData";

const iconMap: Record<string, React.ElementType> = {
  price_alert: TrendingUp,
  upcoming_renewal: Clock,
  zombie_detected: Ghost,
  savings: Zap,
  trial_ending: Bell,
};

const colorMap: Record<string, string> = {
  price_alert: "#FBBF24",
  upcoming_renewal: "#38BDF8",
  zombie_detected: "#FB7185",
  savings: "#4ADE80",
  trial_ending: "#A855F7",
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState("all");

  const markAllRead = () => setNotifs(n => n.map(notif => ({ ...notif, read: true })));
  const markRead = (id: string) => setNotifs(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));

  const filtered = notifs.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "price") return n.type === "price_alert";
    if (filter === "renewals") return n.type === "upcoming_renewal";
    if (filter === "zombies") return n.type === "zombie_detected";
    return true;
  });

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <AppLayout title="Notifications" subtitle={`${unreadCount} unread`}>
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: "all", label: "All" },
              { id: "unread", label: `Unread (${unreadCount})` },
              { id: "price", label: "Price Alerts" },
              { id: "renewals", label: "Renewals" },
              { id: "zombies", label: "Zombies" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filter === f.id ? "bg-sg-purple/20 text-sg-purple border-sg-purple/30" : "text-sg-muted border-sg-border hover:border-white/20"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-sg-purple hover:text-sg-text transition-colors flex items-center gap-1.5">
              <Check size={12} /> Mark all read
            </button>
          )}
        </div>

        <div className="space-y-2">
          {filtered.map((n, i) => {
            const Icon = iconMap[n.type] ?? Bell;
            const color = colorMap[n.type] ?? "#9BA3B4";
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => markRead(n.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-white/15 ${!n.read ? "border-sg-purple/20" : "border-sg-border"}`}
                style={{ background: !n.read ? "rgba(168,85,247,0.04)" : "#101620" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + "20" }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-sg-text">{n.title}</span>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-sg-purple flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-sg-text2">{n.message}</p>
                  <p className="text-xs text-sg-muted mt-1">{n.date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Bell size={32} className="text-sg-border mx-auto mb-3" />
            <p className="text-sg-text2">No notifications found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
