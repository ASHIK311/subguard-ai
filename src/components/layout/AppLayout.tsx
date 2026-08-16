import { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { Search, Bell, Sparkles, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { notifications } from "../../data/mockData";
import Hyperspeed, { hyperspeedPresets } from "../effects/Hyperspeed";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function AppLayout({ children, title, subtitle, actions }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const unread = notifications.filter((n) => !n.read).length;
  
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex min-h-screen relative overflow-hidden" style={{ background: "#05070B" }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] z-0">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>
      <div className={`md:block ${mobileMenuOpen ? "block" : "hidden"} z-50`}>
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setMobileMenuOpen(false)} 
          />
        )}
        <div className="relative z-50">
          <Sidebar 
            collapsed={isMobile ? false : collapsed} 
            onToggle={() => isMobile ? setMobileMenuOpen(false) : setCollapsed(!collapsed)} 
          />
        </div>
      </div>

      <motion.main
        animate={{ marginLeft: isMobile ? 0 : (collapsed ? 64 : 240) }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex-1 min-w-0 relative z-10"
      >
        {/* Top header */}
        <div
          className="sticky top-0 z-30 flex items-center gap-4 px-4 md:px-6 py-4 border-b border-sg-border"
          style={{ background: "rgba(5,7,11,0.85)", backdropFilter: "blur(12px)" }}
        >
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(true)} className="text-sg-text mr-1 flex-shrink-0">
              <Menu size={20} />
            </button>
          )}

          {title && (
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-sg-text truncate">{title}</h1>
              {subtitle && <p className="text-xs text-sg-muted truncate">{subtitle}</p>}
            </div>
          )}
          {!title && <div className="flex-1" />}

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sg-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 text-sm bg-sg-elevated border border-sg-border rounded-lg text-sg-text placeholder-sg-muted focus:outline-none focus:border-sg-purple/50 w-48"
              />
            </div>

            <NavLink to="/app/ai-insights" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-sg-purple/15 text-sg-purple border border-sg-purple/30 rounded-lg hover:bg-sg-purple/25 transition-all">
              <Sparkles size={12} />
              <span className="hidden sm:inline">AI</span>
            </NavLink>

            <NavLink to="/app/notifications" className="relative w-8 h-8 flex items-center justify-center rounded-lg text-sg-text2 hover:text-sg-text hover:bg-white/5 transition-all">
              <Bell size={16} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sg-red border border-sg-bg" />
              )}
            </NavLink>

            <NavLink to="/app/settings" className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all hover:scale-105 border border-sg-purple/30">
              <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
            </NavLink>
          </div>

          {actions && <div className="flex items-center gap-2 hidden sm:flex">{actions}</div>}
        </div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-6"
        >
          {children}
        </motion.div>
      </motion.main>
    </div>
  );
}
