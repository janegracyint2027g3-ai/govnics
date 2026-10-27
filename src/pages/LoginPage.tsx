import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { 
  ShieldCheck, Lock, Mail, Eye, EyeOff, 
  ArrowRight, AlertCircle, Sparkles, ShieldAlert
} from "lucide-react";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    document.title = "Sign In | GOVENICS GRC Client Portal";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Sign in to access your enterprise compliance workspace, custom e-library, and audit checklist history on GOVENICS.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }

    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login(email, password);

      // Log login event to Google Sheets User_Logins tab
      const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "User_Logins",
            table: "User_Logins",
            "Timestamp": new Date().toISOString(),
            "Email": email,
            "Auth Provider": "Direct Password Auth",
            "Login Status": success ? "Success" : "Failed Credentials",
            "IP Location": "Direct Web Client",
            "IP Address": "Web Client",
            "User Agent": navigator.userAgent
          }),
        }).catch(() => {/* silent */});
      }

      if (!success) {
        setError("Invalid email address or password. Try registering if you haven't yet.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout hideHeaderFooter>
      <div className="min-h-screen flex flex-col md:flex-row relative z-10">
        
        {/* Left Panel - GRC Brand Value Showcase */}
        <div className="hidden md:flex md:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Background grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-650/15 rounded-full blur-3xl" />

          {/* Header section in Left Panel */}
          <div className="relative z-10 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-[1.03] transition-transform">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-black tracking-tight font-heading text-white leading-none">
                  GOVENICS GRC
                </span>
                <span className="text-[9px] font-bold text-blue-400 tracking-wider mt-0.5 uppercase">
                  &larr; Back to Website
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-450 font-medium uppercase tracking-[0.2em] mt-2 pl-0.5">
              The Operating System for Enterprise Governance & Risk
            </p>
          </div>

          {/* Core messages */}
          <div className="relative z-10 my-auto max-w-lg space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-black font-heading leading-tight text-white">
                Living Compliance.<br/>
                <span className="text-blue-450 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Zero Missed Deadlines.
                </span>
              </h2>
              <p className="text-slate-350 text-sm font-medium leading-relaxed">
                Connect your statutory calendars, track risks dynamically, and gain instant executive oversight from a single secure portal.
              </p>
            </div>

            {/* Bullet List */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">Quantified Risk Registers</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Real-time risk scoring and mitigation workflows aligned to ISO 31000.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">Statutory Calendars</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Automated tracking of ESI, PF, CLRA and legal filings across 28 states.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">Audit Readiness</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Consolidated artifact repositories ensuring 100% external compliance validation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer info in Left Panel */}
          <div className="relative z-10 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Govenics Risk Advisory. All Rights Reserved.
          </div>
        </div>

        {/* Right Panel - Form Interface */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 bg-slate-50/50">
          <div className="w-full max-w-md space-y-6">
            
            {/* Mobile Header (Visible on smaller screens) */}
            <div className="md:hidden flex flex-col items-center text-center space-y-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight font-heading">
                GOVENICS GRC
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Governance, Risk & Compliance Division
              </p>
            </div>

            {/* Title */}
            <div className="space-y-1.5 text-left">
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                Sign In to GRC Portal
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                Access your organization's compliance dashboard and registers.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start gap-2.5 text-xs font-medium animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    Password
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Mock password recovery is not configured. Register a new account."); }} className="text-[10px] font-bold text-blue-600 hover:text-blue-750 transition-colors uppercase tracking-wider">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter security key"
                    className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-650 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-450 text-white rounded-xl shadow-lg shadow-blue-500/15 text-sm font-bold tracking-wide transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Enter GRC Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Registration Callout */}
            <div className="pt-5 border-t border-slate-200/80 text-center">
              <span className="text-xs text-slate-500 font-semibold">New to Govenics? </span>
              <Link
                to="/register"
                className="text-xs font-bold text-blue-600 hover:text-blue-750 uppercase tracking-wider transition-all"
              >
                Create a GRC Account
              </Link>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}
