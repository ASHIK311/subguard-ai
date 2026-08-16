import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Check, X } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ElectricBorder from "../components/effects/ElectricBorder";
import Badge from "../components/ui/Badge";
import BrandLogo from "../components/ui/BrandLogo";

const duplicates = [
  {
    id: "music",
    category: "Music Streaming",
    a: { id: "spotify", name: "Spotify", logo: <BrandLogo id="spotify" />, color: "#1DB954", amount: 10.99, lastUsed: "Today", features: ["✓ Podcasts", "✓ Social", "✓ Lyrics", "✓ Android Auto", "✗ Spatial Audio"] },
    b: { id: "apple-music", name: "Apple Music", logo: <BrandLogo id="apple-music" />, color: "#FA2D48", amount: 10.99, lastUsed: "2 months ago", features: ["✓ Spatial Audio", "✓ Apple Devices", "✗ Podcasts", "✗ Social Features", "✗ Free Tier"] },
    combined: 21.98,
    saving: 131.88,
  },
];

export default function DuplicateFinderPage() {
  const [kept, setKept] = useState<Record<string, string>>({});

  return (
    <AppLayout title="Duplicate Finder" subtitle="Services doing the same job, both billing you">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Duplicate Pairs", value: "1", color: "#7DF9FF" },
            { label: "Wasted Monthly", value: "$10.99", color: "#FB7185" },
            { label: "Annual Waste", value: "$131.88", color: "#4ADE80" },
          ].map(m => (
            <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div key={m.label} className="p-4 rounded-xl  text-center" >
              <div className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs text-sg-muted">{m.label}</div>
            </div>
</ElectricBorder>
          ))}
        </div>

        {duplicates.map((dup) => (
          <ElectricBorder key={dup.id} color="#7DF9FF" borderRadius={16} intensity="normal">
            <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-6 rounded-2xl border border-sg-cyan/20" >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <Badge variant="cyan">{dup.category}</Badge>
                  <p className="text-sm text-sg-muted mt-1">Combined cost: ${dup.combined}/month · Potential saving: ${dup.saving}/year</p>
                </div>
                <div className="text-sm font-bold" style={{ color: "#4ADE80" }}>Save ${dup.saving}/yr</div>
              </div>

              <div className="grid grid-cols-5 gap-4 items-start">
                {/* Service A */}
                <div className="col-span-2">
                  <motion.div
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${kept[dup.id] === dup.a.id ? "border-sg-green/50 bg-sg-green/5" : kept[dup.id] === dup.b.id ? "border-sg-border opacity-50" : "border-sg-border hover:border-sg-green/30"}`}
                    whileHover={{ scale: kept[dup.id] ? 1 : 1.01 }}
                    onClick={() => setKept(k => ({ ...k, [dup.id]: dup.a.id }))}
                    style={{ background: kept[dup.id] === dup.a.id ? undefined : "#0D1118" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: dup.a.color + "33" }}>
                        {dup.a.logo}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-sg-text">{dup.a.name}</div>
                        <div className="text-xs text-sg-green">Used {dup.a.lastUsed}</div>
                      </div>
                    </div>
                    <div className="text-xl font-black tabular-nums text-sg-text mb-3">${dup.a.amount}<span className="text-xs text-sg-muted font-normal">/mo</span></div>
                    <div className="space-y-1">
                      {dup.a.features.map(f => (
                        <div key={f} className={`text-xs ${f.startsWith("✓") ? "text-sg-green" : "text-sg-muted"}`}>{f}</div>
                      ))}
                    </div>
                    {kept[dup.id] === dup.a.id && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-sg-green">
                        <Check size={12} /> KEEPING THIS
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* VS */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-sg-border flex items-center justify-center">
                      <ArrowLeftRight size={16} className="text-sg-muted" />
                    </div>
                    <span className="text-xs font-bold text-sg-muted">VS</span>
                  </div>
                </div>

                {/* Service B */}
                <div className="col-span-2">
                  <motion.div
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${kept[dup.id] === dup.b.id ? "border-sg-green/50 bg-sg-green/5" : kept[dup.id] === dup.a.id ? "border-sg-border opacity-50" : "border-sg-border hover:border-sg-red/30"}`}
                    whileHover={{ scale: kept[dup.id] ? 1 : 1.01 }}
                    onClick={() => setKept(k => ({ ...k, [dup.id]: dup.b.id }))}
                    style={{ background: kept[dup.id] === dup.b.id ? undefined : "#0D1118" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: dup.b.color + "33" }}>
                        {dup.b.logo}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-sg-text">{dup.b.name}</div>
                        <div className="text-xs text-sg-red">Used {dup.b.lastUsed}</div>
                      </div>
                    </div>
                    <div className="text-xl font-black tabular-nums text-sg-text mb-3">${dup.b.amount}<span className="text-xs text-sg-muted font-normal">/mo</span></div>
                    <div className="space-y-1">
                      {dup.b.features.map(f => (
                        <div key={f} className={`text-xs ${f.startsWith("✓") ? "text-sg-green" : "text-sg-muted"}`}>{f}</div>
                      ))}
                    </div>
                    {kept[dup.id] === dup.b.id && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-sg-green">
                        <Check size={12} /> KEEPING THIS
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {kept[dup.id] && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex gap-3">
                  <button className="flex-1 py-2 text-sm font-semibold rounded-xl text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
                    Confirm — Cancel {kept[dup.id] === dup.a.id ? dup.b.name : dup.a.name}
                  </button>
                  <button className="px-4 py-2 text-sm text-sg-muted rounded-xl border border-sg-border hover:border-white/20 transition-all" onClick={() => setKept(k => ({ ...k, [dup.id]: "" }))}>
                    Keep Both
                  </button>
                </motion.div>
              )}
            </div>
</ElectricBorder>
          </ElectricBorder>
        ))}

        <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle" className="h-full">
<div className="p-5 rounded-2xl  text-center" >
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-lg font-bold text-sg-text mb-1">No other duplicates found</h3>
          <p className="text-sm text-sg-text2">SubGuard monitors your subscriptions continuously. We'll alert you if duplicates appear.</p>
        </div>
</ElectricBorder>
      </div>
    </AppLayout>
  );
}
