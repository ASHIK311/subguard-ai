import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Check, Clock, Eye, ChevronRight } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import { subscriptions } from "../data/mockData";

interface CancellationItem {
  subscriptionId: string;
  status: "pending" | "in-progress" | "confirmed" | "monitoring";
  date: string;
  saving: number;
}

const initialCancellations: CancellationItem[] = [
  { subscriptionId: "nordvpn", status: "in-progress", date: "Aug 12, 2025", saving: 155.88 },
];

const steps = ["Request Submitted", "Awaiting Confirmation", "Cancellation Confirmed", "Future Charge Monitoring"];

export default function CancellationPage() {
  const [cancellations, setCancellations] = useState<CancellationItem[]>(initialCancellations);
  const [showModal, setShowModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState<string>("");
  const [reason, setReason] = useState("No longer using");
  const [step, setStep] = useState(0);

  const activeSubs = subscriptions.filter(s => s.status !== "cancelled" && !cancellations.find(c => c.subscriptionId === s.id));

  const handleCancelConfirm = () => {
    setStep(2);
    setTimeout(() => {
      setCancellations(prev => [...prev, {
        subscriptionId: selectedSub,
        status: "in-progress",
        date: "Aug 14, 2025",
        saving: (subscriptions.find(s => s.id === selectedSub)?.amount ?? 0) * 12,
      }]);
      setShowModal(false);
      setStep(0);
    }, 1500);
  };

  const getStepIndex = (status: CancellationItem["status"]) => {
    if (status === "pending") return 0;
    if (status === "in-progress") return 1;
    if (status === "confirmed") return 2;
    return 3;
  };

  return (
    <AppLayout title="Cancellation Center" subtitle="Track and manage your active cancellation requests">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Active cancellations */}
        {cancellations.map((c) => {
          const sub = subscriptions.find(s => s.id === c.subscriptionId);
          if (!sub) return null;
          const stepIdx = getStepIndex(c.status);

          return (
            <ElectricBorder key={c.subscriptionId} color="#4ADE80" borderRadius={16} intensity="normal">
              <div className="p-6 rounded-2xl border border-sg-green/20" >
                <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white" style={{ background: sub.color + "33" }}>
                      {sub.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sg-text">{sub.name}</h3>
                      <p className="text-sm text-sg-muted">Cancellation Requested · {c.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-sg-muted mb-0.5">Annual saving</div>
                    <div className="text-xl font-black text-sg-green tabular-nums">+${c.saving.toFixed(2)}/yr</div>
                  </div>
                </div>

                {/* Progress steps */}
                <div className="relative">
                  <div className="flex items-center justify-between relative z-10">
                    {steps.map((s, i) => {
                      const done = i <= stepIdx;
                      const active = i === stepIdx;
                      return (
                        <div key={s} className="flex flex-col items-center gap-1.5 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${done ? "bg-sg-green border-sg-green" : "border-sg-border"}`}>
                            {done ? <Check size={14} className="text-white" /> : <span className="text-xs text-sg-muted">{i + 1}</span>}
                          </div>
                          <span className={`text-xs text-center leading-tight ${active ? "text-sg-green font-medium" : done ? "text-sg-text2" : "text-sg-muted"}`}>
                            {s}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute top-4 left-4 right-4 h-0.5 -z-0" style={{ background: "#1e2535" }}>
                    <div className="h-full bg-sg-green transition-all" style={{ width: `${(stepIdx / (steps.length - 1)) * 100}%` }} />
                  </div>
                </div>
              </div>
            </ElectricBorder>
          );
        })}

        {/* Cancel new subscription */}
        <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl " >
          <h3 className="text-sm font-semibold text-sg-muted uppercase tracking-wider mb-4">Start New Cancellation</h3>
          <div className="space-y-2">
            {activeSubs.slice(0, 5).map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl border border-sg-border hover:border-white/15 cursor-pointer transition-all group"
                onClick={() => { setSelectedSub(sub.id); setShowModal(true); }}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ background: sub.color + "33" }}>
                    {sub.logo}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-sg-text">{sub.name}</span>
                    <div className="text-xs text-sg-muted">${sub.amount}/month</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {sub.zombieScore != null && sub.zombieScore >= 60 && (
                    <Badge variant="zombie">Zombie {sub.zombieScore}</Badge>
                  )}
                  <ChevronRight size={14} className="text-sg-muted group-hover:text-sg-text transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
        </ElectricBorder>
      </div>

      {/* Cancel modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={`Cancel ${subscriptions.find(s => s.id === selectedSub)?.name ?? "Subscription"}?`}>
        {(() => {
          const sub = subscriptions.find(s => s.id === selectedSub);
          if (!sub) return null;
          return (
            <div className="space-y-4">
              {step === 0 ? (
                <>
                  <div className="p-4 rounded-xl border border-sg-border bg-sg-elevated text-center">
                    <div className="text-xl font-black tabular-nums text-sg-red mb-1">${sub.amount}/month</div>
                    <div className="text-sm text-sg-text2">Potential saving: <span className="text-sg-green font-semibold">${(sub.amount * 12).toFixed(2)}/year</span></div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-sg-muted mb-2">Reason for cancellation</label>
                    <div className="space-y-2">
                      {["Too expensive", "No longer using", "Found alternative", "Duplicate service", "Other"].map(r => (
                        <label key={r} className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${reason === r ? "border-sg-purple/40 bg-sg-purple/5" : "border-sg-border hover:border-white/20"}`}>
                          <input type="radio" name="reason" checked={reason === r} onChange={() => setReason(r)} className="accent-purple-500" />
                          <span className="text-sm text-sg-text2">{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-sg-border text-sg-text2 transition-all" style={{ background: "#0D1118" }}>
                      Keep Subscription
                    </button>
                    <button onClick={() => setStep(1)} className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-sg-red text-white hover:bg-sg-red/80 transition-all">
                      Continue
                    </button>
                  </div>
                </>
              ) : step === 1 ? (
                <>
                  <div className="p-4 rounded-xl border border-sg-red/30 bg-sg-red/5 text-center">
                    <div className="text-3xl mb-2">⚠️</div>
                    <p className="text-sm text-sg-text">This will request cancellation of <strong>{sub.name}</strong>. Your subscription will remain active until the end of the current billing period.</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-sg-border text-sg-text2 transition-all" style={{ background: "#0D1118" }}>
                      Back
                    </button>
                    <button onClick={handleCancelConfirm} className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-sg-red text-white flex items-center justify-center gap-2">
                      {step === 2 ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <XCircle size={14} />}
                      Confirm Cancellation
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          );
        })()}
      </Modal>
    </AppLayout>
  );
}
