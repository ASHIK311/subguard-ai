import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CreditCard, ArrowUpDown, Calendar, PiggyBank,
  Ghost, TrendingUp, Copy, Sparkles, Zap, XCircle, BarChart3,
  Bell, Users, Settings, HelpCircle, User, ChevronLeft, ChevronRight,
  Shield, LogOut
} from "lucide-react";

const navSections = [
  {
    label: "OVERVIEW",
    items: [{ icon: LayoutDashboard, label: "Dashboard", to: "/app/dashboard" }],
  },
  {
    label: "MONEY",
    items: [
      { icon: CreditCard, label: "Subscriptions", to: "/app/subscriptions" },
      { icon: ArrowUpDown, label: "Transactions", to: "/app/transactions" },
      { icon: Calendar, label: "Upcoming Payments", to: "/app/upcoming" },
      { icon: PiggyBank, label: "Budgets", to: "/app/budget" },
    ],
  },
  {
    label: "INTELLIGENCE",
    items: [
      { icon: Ghost, label: "Zombie Hunter", to: "/app/zombie-hunter" },
      { icon: TrendingUp, label: "Price Watch", to: "/app/price-watch" },
      { icon: Copy, label: "Duplicate Finder", to: "/app/duplicates" },
      { icon: Sparkles, label: "AI Insights", to: "/app/ai-insights" },
      { icon: Zap, label: "Savings Opportunities", to: "/app/savings" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { icon: XCircle, label: "Cancellation Center", to: "/app/cancellation" },
      { icon: BarChart3, label: "Reports", to: "/app/reports" },
      { icon: Bell, label: "Notifications", to: "/app/notifications", badge: 3 },
      { icon: Users, label: "Family", to: "/app/family" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen flex flex-col z-40 overflow-hidden"
      style={{ background: "#080B10", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 relative"
          style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
          <Shield size={16} className="text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-sg-green border-2 border-sg-bg2" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
              <span className="text-sg-text font-bold text-sm tracking-wide">SubGuard</span>
              <span className="text-sg-purple font-bold text-sm tracking-wide"> AI</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="ml-auto w-6 h-6 flex items-center justify-center rounded text-sg-muted hover:text-sg-text transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-2 mb-1 text-xs font-semibold tracking-widest text-sg-muted"
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all duration-150 group relative ${
                        isActive
                          ? "bg-sg-purple/15 text-sg-purple"
                          : "text-sg-text2 hover:text-sg-text hover:bg-white/5"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-sg-purple"
                          />
                        )}
                        <item.icon size={16} className="flex-shrink-0" />
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex-1 truncate"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {!collapsed && (item as any).badge && (
                          <span className="w-5 h-5 rounded-full bg-sg-purple text-white text-xs flex items-center justify-center font-medium">
                            {(item as any).badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="flex-shrink-0 border-t border-sg-border px-2 py-3 space-y-0.5">
        {[
          { icon: HelpCircle, label: "Help", to: "/app/help" },
          { icon: Settings, label: "Settings", to: "/app/settings" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all ${
                isActive ? "bg-sg-purple/15 text-sg-purple" : "text-sg-text2 hover:text-sg-text hover:bg-white/5"
              }`
            }
          >
            <item.icon size={16} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}

        <div className="flex items-center gap-1 w-full">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex-1 flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-sg-text2 hover:text-sg-text hover:bg-white/5 transition-all"
            title={collapsed ? "Profile" : undefined}
          >
            <div className="w-6 h-6 rounded-md flex-shrink-0 border border-sg-purple/40 overflow-hidden shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 text-left overflow-hidden">
                  <div className="text-xs font-medium text-sg-text truncate">Nakib Md Ashik</div>
                  <div className="text-xs text-sg-muted truncate">Pro Plan</div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          {!collapsed && (
            <button
              onClick={() => navigate("/")}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-sg-muted hover:text-sg-red hover:bg-sg-red/10 transition-colors flex-shrink-0"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Profile popup */}
      <AnimatePresence>
        {showProfile && !collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-24 left-2 right-2 bg-sg-elevated border border-sg-border rounded-xl p-3 z-50 space-y-1"
          >
            <NavLink to="/app/settings" className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-sg-text2 hover:text-sg-text hover:bg-white/5 transition-all" onClick={() => setShowProfile(false)}>
              <User size={14} />Profile & Settings
            </NavLink>
            <button
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-sg-red hover:bg-sg-red/10 transition-all"
              onClick={() => navigate("/")}
            >
              <LogOut size={14} />Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
