import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Lock, Eye, Database, Palette, CreditCard, Link, Trash2 } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import ProfileCard from "../components/effects/ProfileCard";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "accounts", label: "Connected Accounts", icon: Link },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "privacy", label: "Privacy", icon: Eye },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "data", label: "Data & Export", icon: Database },
];

const connectedAccounts = [
  { name: "Chase Bank", type: "Bank", last4: "4242", status: "connected", icon: "🏦" },
  { name: "Visa Credit Card", type: "Credit Card", last4: "8821", status: "connected", icon: "💳" },
  { name: "PayPal", type: "Wallet", last4: "", status: "disconnected", icon: "P" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    renewalReminders: true,
    zombieDetected: true,
    weeklySummary: false,
    emailDigest: true,
  });

  return (
    <AppLayout title="Settings">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar tabs */}
          <div className="md:w-48 flex-shrink-0">
            <nav className="space-y-0.5">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all text-left ${activeTab === tab.id ? "bg-sg-purple/15 text-sg-purple" : "text-sg-text2 hover:text-sg-text hover:bg-white/5"}`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              {activeTab === "profile" && (
                <div className="space-y-5">
                  <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl flex justify-center items-center" >
                    <div className="w-full max-w-sm profile-card-area">
                      <ProfileCard
                        name="Nakib Md Ashik"
                        title="Pro Plan User"
                        handle="nakib"
                        avatarUrl="/avatar.png"
                        showUserInfo={false}
                        enableTilt={true}
                        enableMobileTilt={false}
                        behindGlowColor="rgba(168, 85, 247, 0.55)"
                        behindGlowEnabled={true}
                        innerGradient="linear-gradient(145deg,#2a1745 0%,#101427 55%,#15182c 100%)"
                      >
                        <div className="mt-8 space-y-4 px-4 pb-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            {[
                              { label: "Full Name", value: "Nakib Md Ashik" },
                              { label: "Email", value: "nakib@example.com" },
                              { label: "Handle", value: "@nakib" },
                              { label: "Currency", value: "USD ($)" },
                            ].map(f => (
                              <div key={f.label}>
                                <label className="block text-[10px] font-semibold text-white/50 mb-1 uppercase tracking-wider">{f.label}</label>
                                <input defaultValue={f.value} className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sg-purple/50 transition-colors backdrop-blur-md" />
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-2">
                            <button className="w-full px-4 py-2.5 text-xs font-bold rounded-lg text-white transition-all hover:opacity-90 shadow-lg" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
                              Save Profile
                            </button>
                          </div>
                        </div>
                      </ProfileCard>
                    </div>
                  </div>
</ElectricBorder>
                </div>
              )}

              {activeTab === "accounts" && (
                <div className="space-y-3">
                  {connectedAccounts.map(acc => (
                    <div key={acc.name} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${acc.status === "connected" ? "border-sg-green/30 bg-sg-green/5" : "border-sg-border"}`}
                      style={acc.status === "disconnected" ? { background: "#101620" } : undefined}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                        {acc.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-sg-text">{acc.name}</span>
                          {acc.last4 && <span className="text-xs text-sg-muted">••••{acc.last4}</span>}
                        </div>
                        <span className="text-xs text-sg-muted">{acc.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {acc.status === "connected" ? (
                          <>
                            <span className="text-xs font-medium text-sg-green">Connected</span>
                            <button className="text-xs text-sg-muted hover:text-sg-red transition-colors">Disconnect</button>
                          </>
                        ) : (
                          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sg-purple/15 text-sg-purple border border-sg-purple/30 hover:bg-sg-purple/25 transition-all">
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 text-sm text-sg-muted border border-dashed border-sg-border rounded-xl hover:border-sg-purple/40 hover:text-sg-purple transition-all">
                    + Add Account
                  </button>
                </div>
              )}

              {activeTab === "notifications" && (
                <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl  space-y-4" >
                  <h3 className="text-base font-semibold text-sg-text mb-4">Notification Preferences</h3>
                  {Object.entries(notifications).map(([key, val]) => {
                    const labels: Record<string, string> = {
                      priceAlerts: "Price Alerts",
                      renewalReminders: "Renewal Reminders",
                      zombieDetected: "Zombie Detected",
                      weeklySummary: "Weekly Summary",
                      emailDigest: "Email Digest",
                    };
                    return (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-sg-border last:border-none">
                        <span className="text-sm text-sg-text">{labels[key]}</span>
                        <button
                          onClick={() => setNotifications(n => ({ ...n, [key]: !val }))}
                          className={`relative w-10 h-5 rounded-full transition-all ${val ? "bg-sg-green" : "bg-sg-border"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${val ? "left-5" : "left-0.5"}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
</ElectricBorder>
              )}

              {activeTab === "privacy" && (
                <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl  space-y-4" >
                  <h3 className="text-base font-semibold text-sg-text mb-2">Privacy Controls</h3>
                  <p className="text-sm text-sg-text2">SubGuard uses read-only transaction access. We never store your banking credentials or move money.</p>
                  <div className="pt-4 border-t border-sg-border">
                    <button className="flex items-center gap-2 text-sm text-sg-red hover:text-sg-critical transition-colors">
                      <Trash2 size={14} /> Delete Account & All Data
                    </button>
                  </div>
                </div>
</ElectricBorder>
              )}

              {(activeTab === "security" || activeTab === "appearance" || activeTab === "data") && (
                <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl " >
                  <p className="text-sg-text2 text-sm">This section is available in the full application.</p>
                </div>
</ElectricBorder>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
