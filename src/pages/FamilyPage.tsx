import { motion } from "framer-motion";
import { Users, Plus, AlertTriangle } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import { familyMembers, subscriptions } from "../data/mockData";

const familyTotal = familyMembers.reduce((s, m) => s + m.monthly, 0);

export default function FamilyPage() {
  return (
    <AppLayout title="Family" subtitle="Manage subscriptions across all family members">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Summary */}
        <ElectricBorder color="#A855F7" borderRadius={16} intensity="normal">
          <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl border border-sg-purple/20 flex items-center justify-between flex-wrap gap-4" >
            <div>
              <p className="text-xs text-sg-muted uppercase tracking-wider mb-1">Family Monthly Total</p>
              <div className="text-4xl font-black tabular-nums text-sg-text">${familyTotal}</div>
              <p className="text-sm text-sg-muted mt-1">{familyMembers.reduce((s, m) => s + m.subscriptions, 0)} total subscriptions across {familyMembers.length} members</p>
            </div>
            <div className="flex gap-4">
              {familyMembers.map(m => (
                <div key={m.id} className="text-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white mb-1 mx-auto" style={{ background: m.color + "44", border: `2px solid ${m.color}` }}>
                    {m.avatar}
                  </div>
                  <div className="text-xs font-medium text-sg-text">${m.monthly}</div>
                </div>
              ))}
            </div>
          </div>
</ElectricBorder>
        </ElectricBorder>

        {/* Member cards */}
        <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="space-y-4">
          {familyMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl "
              
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold text-white" style={{ background: member.color + "44", border: `2px solid ${member.color}` }}>
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-sg-text">{member.name}</h3>
                    <p className="text-xs text-sg-muted">{member.subscriptions} subscriptions · ${member.monthly}/month</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black tabular-nums" style={{ color: member.color }}>${member.monthly}</div>
                  <div className="text-xs text-sg-muted">/month</div>
                </div>
              </div>

              <div className="w-full bg-white/8 rounded-full h-1.5 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(member.monthly / familyTotal) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: member.color }}
                />
              </div>
              <p className="text-xs text-sg-muted">{Math.round((member.monthly / familyTotal) * 100)}% of family total</p>
            </motion.div>
          ))}
        </div>
</ElectricBorder>

        {/* Shared subscriptions alert */}
        <div className="p-5 rounded-2xl border border-sg-amber/30 bg-sg-amber/5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-sg-amber flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-sg-amber mb-1">Netflix detected on two accounts</p>
              <p className="text-sm text-sg-text2">Nakib and Sarah both have Netflix subscriptions. Using a shared family plan could save $191.88/year.</p>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sg-amber/15 text-sg-amber border border-sg-amber/30 hover:bg-sg-amber/25 transition-all">
                  View Family Plans
                </button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-sg-border text-sg-muted hover:text-sg-text2 transition-all">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Invite */}
        <button className="w-full py-4 text-sm font-medium text-sg-text2 rounded-xl border border-dashed border-sg-border hover:border-sg-purple/40 hover:text-sg-purple transition-all flex items-center justify-center gap-2">
          <Plus size={16} /> Invite Family Member
        </button>
      </div>
    </AppLayout>
  );
}
