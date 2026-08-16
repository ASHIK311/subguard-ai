import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import ElectricBorder from "../components/effects/ElectricBorder";
import Prism from "../components/effects/Prism";

function PasswordStrength({ password }: { password: string }) {
  const score = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#EF4444", "#FBBF24", "#38BDF8", "#4ADE80"];
  if (!password) return null;
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= score ? colors[score] : "#1e2535" }} />
        ))}
      </div>
      <p className="text-xs" style={{ color: colors[score] }}>{labels[score]}</p>
    </div>
  );
}

export default function SignupPage() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/onboarding"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: "#05070B" }}>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={1}
          />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
              <Shield size={18} className="text-white" />
            </div>
            <span className="font-bold text-sg-text">SubGuard <span className="text-sg-purple">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-sg-text mb-1">Create your account.</h1>
          <p className="text-sm text-sg-muted">Start finding hidden subscriptions</p>
        </div>

        <ElectricBorder color="#A855F7" borderRadius={16} intensity="subtle">
        <div className="p-6 h-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-sg-text2 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sg-muted" />
                <input type="text" defaultValue="Nakib Md Ashik" className="w-full pl-9 pr-3 py-2.5 text-sm bg-sg-elevated border border-sg-border rounded-xl text-sg-text placeholder-sg-muted focus:outline-none focus:border-sg-purple/60 transition-colors" placeholder="Your name" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-sg-text2 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sg-muted" />
                <input type="email" className="w-full pl-9 pr-3 py-2.5 text-sm bg-sg-elevated border border-sg-border rounded-xl text-sg-text placeholder-sg-muted focus:outline-none focus:border-sg-purple/60 transition-colors" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-sg-text2 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sg-muted" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-sm bg-sg-elevated border border-sg-border rounded-xl text-sg-text placeholder-sg-muted focus:outline-none focus:border-sg-purple/60 transition-colors"
                  placeholder="Create a password"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sg-muted hover:text-sg-text2">
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>
            <div>
              <label className="block text-xs font-medium text-sg-text2 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sg-muted" />
                <input type="password" className="w-full pl-9 pr-3 py-2.5 text-sm bg-sg-elevated border border-sg-border rounded-xl text-sg-text placeholder-sg-muted focus:outline-none focus:border-sg-purple/60 transition-colors" placeholder="Confirm password" />
              </div>
            </div>
            <label className="flex items-start gap-2 text-xs text-sg-text2 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 w-4 h-4 accent-purple-500" />
              I agree to the <a href="#" className="text-sg-purple hover:underline">Terms of Service</a> and <a href="#" className="text-sg-purple hover:underline">Privacy Policy</a>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
            >
              {loading && <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />}
              Create Account
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-sg-border" />
              <span className="text-xs text-sg-muted">or</span>
              <div className="flex-1 h-px bg-sg-border" />
            </div>

            <button type="button" onClick={() => navigate("/app/dashboard")} className="w-full py-2.5 text-sm font-medium text-sg-text rounded-xl border border-sg-border hover:border-white/20 transition-all flex items-center justify-center gap-2" style={{ background: "#0D1118" }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </form>
        </div>
        </ElectricBorder>

        <p className="text-center text-sm text-sg-muted mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-sg-purple hover:text-sg-text transition-colors font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
