import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { 
  ShieldCheck, Lock, Mail, User as UserIcon, Building, 
  ArrowRight, ArrowLeft, AlertCircle, CheckCircle2,
  Scale, ShieldAlert, Heart, Coins, FolderGit2,
  Briefcase, Globe
} from "lucide-react";

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Page Steps: 1 = Account Credentials, 2 = GRC Calibration
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [orgSize, setOrgSize] = useState("100-500");
  const [primaryStandard, setPrimaryStandard] = useState("ISO 27001");
  const [maturity, setMaturity] = useState("Partially Managed");
  const [grcScope, setGrcScope] = useState<string[]>(["Regulatory Compliance"]);
  const [industry, setIndustry] = useState("Technology & SaaS");
  const [geoFootprint, setGeoFootprint] = useState("Single-State Operations");

  // Redirect if already authenticated
  useEffect(() => {
    document.title = "Register GRC Account | Calibrate Compliance Workspace — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Create your GOVENICS enterprise account. Calibrate statutory frameworks, select your industry maturity, and configure your personalized GRC dashboard.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Standard GRC Options
  const primaryStandardOptions = [
    { value: "ISO 27001", label: "ISO 27001 (Information Security)" },
    { value: "SOC 2", label: "SOC 2 (Trust Principles)" },
    { value: "Factories Act", label: "Factories Act & Labour Laws (SGRC)" },
    { value: "BRSR / ESG", label: "BRSR & ESG Disclosures" },
    { value: "ISO 31000", label: "ISO 31000 (Enterprise Risk)" },
    { value: "DPDP Act / GDPR", label: "DPDP Act & Data Privacy" },
    { value: "NABH / NAAC", label: "NABH, NAAC & Quality Accreditations" }
  ];

  const grcScopeOptions = [
    { value: "Regulatory Compliance", label: "Regulatory & Labour Law", icon: Scale, desc: "Factory Acts, trade licenses, filings" },
    { value: "Cybersecurity", label: "Cyber & Tech Posture", icon: ShieldAlert, desc: "VAPT, SOC 2, threats audit" },
    { value: "ESG & Sustainability", label: "ESG / BRSR Reporting", icon: Heart, desc: "Carbon footprint, board governance" },
    { value: "Managed Payroll & HR", label: "Statutory Payroll & HR", icon: Coins, desc: "PF, ESI, ESOPs, compliance HRIS" },
    { value: "BPO & Digitization", label: "BPO Operations", icon: FolderGit2, desc: "Record management, back-office claims" }
  ];

  const maturityOptions = [
    { value: "Ad-hoc", label: "Ad-hoc / Manual", desc: "Excel lists, high manual labor, prone to missing filings" },
    { value: "Partially Managed", label: "Partially Managed", desc: "A blend of simple software lists and external legal consultants" },
    { value: "Fully Automated", label: "Fully Automated / Monitored", desc: "Real-time compliance triggers, automated audits and trackers" }
  ];

  const handleToggleScope = (scopeVal: string) => {
    if (grcScope.includes(scopeVal)) {
      if (grcScope.length > 1) {
        setGrcScope(grcScope.filter(s => s !== scopeVal));
      }
    } else {
      setGrcScope([...grcScope, scopeVal]);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate Step 1
    if (!fullName.trim() || !email.trim() || !password.trim() || !designation.trim()) {
      setError("Please fill in all credentials and designation fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate Step 2
    if (!companyName.trim()) {
      setError("Please enter your Company Name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = {
        fullName,
        email,
        password,
        companyName,
        orgSize,
        primaryStandard,
        maturity,
        grcScope,
        designation,
        industry,
        geoFootprint
      };

      await register(userData);

      // Log registration to Google Sheets (fire-and-forget)
      const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "Registered_Users",
            table: "Registered_Users",
            "Full Name": fullName,
            "Email": email,
            "Company": companyName,
            "Designation": designation,
            "Industry": industry,
            "Org Size": orgSize,
            "GRC Scope": Array.isArray(grcScope) ? grcScope.join(", ") : grcScope,
            "Primary Standard": primaryStandard,
            "Maturity Level": maturity,
            "Geo Footprint": geoFootprint,
            "Source Page": "/register",
            "Lead Source": "Website Registration",
            "Timestamp": new Date().toISOString(),
          }),
        }).catch(() => {/* silent */});
      }

      // Registration auto-logs in and handles redirection
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please check credentials.");
      setStep(1); // Return to step 1 to fix credentials if email matches existing, etc.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout hideHeaderFooter>
      <div className="min-h-screen flex flex-col md:flex-row">
        
        {/* Left Panel - Calibration Info */}
        <div className="hidden md:flex md:w-1/3 bg-slate-900 text-white p-10 flex-col justify-between relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-[1.03] transition-transform">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-black tracking-tight font-heading text-white leading-none">
                  GOVENICS GRC
                </span>
                <span className="text-[8px] font-bold text-blue-450 tracking-wider mt-0.5 uppercase">
                  &larr; Back to Website
                </span>
              </div>
            </Link>
            <p className="text-[10px] text-slate-450 font-extrabold uppercase tracking-widest">
              Account Registration Setup
            </p>
          </div>

          {/* Calibration guide / info cards */}
          <div className="relative z-10 space-y-6 my-auto">
            <div className="space-y-2 text-left">
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Why GRC Calibration?</span>
              <h3 className="text-xl font-bold font-heading text-white">We Calibrate Your GRC Experience.</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Unlike general platforms, Govenics dynamically filters statutory registers, calculators, and calendars based on your state boundaries, compliance maturity, and targets.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${step >= 1 ? "bg-blue-600 border-blue-600 text-white" : "border-slate-700 text-slate-500"}`}>
                  1
                </div>
                <span className={`text-xs font-bold ${step === 1 ? "text-white" : "text-slate-450"}`}>Credentials Configuration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${step >= 2 ? "bg-blue-600 border-blue-600 text-white" : "border-slate-700 text-slate-500"}`}>
                  2
                </div>
                <span className={`text-xs font-bold ${step === 2 ? "text-white" : "text-slate-450"}`}>GRC Scope Calibration</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[9px] text-slate-500 font-bold tracking-widest uppercase">
            ISO 27001 & SOC 2 COMPLIANT SECURITY
          </div>
        </div>

        {/* Right Panel - Steps Forms */}
        <div className="w-full md:w-2/3 flex items-center justify-center p-6 sm:p-10 md:p-16 bg-slate-50/50">
          <div className="w-full max-w-2xl space-y-6">
            
            {/* Title / Info */}
            <div className="space-y-1 text-left">
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                Create Govenics GRC Account
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                {step === 1 
                  ? "Enter credentials to secure your client compliance environment."
                  : "Specify your organization's regulatory boundaries and compliance needs."}
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start gap-2.5 text-xs font-medium animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: Account Credentials */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value); setError(null); }}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                      Work Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(null); }}
                        placeholder="john@company.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                      Choose Password (Min. 6 chars)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(null); }}
                        placeholder="Minimum 6 characters"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Designation */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                      Designation / Role
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={designation}
                        onChange={(e) => { setDesignation(e.target.value); setError(null); }}
                        placeholder="e.g. Compliance Officer"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Step 1 */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/15 text-sm font-bold tracking-wide transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <span>Continue to GRC Calibration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: GRC Profile Calibration */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in text-left">
                
                {/* Org & Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                      Company Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => { setCompanyName(e.target.value); setError(null); }}
                        placeholder="Company Ltd."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Organization Size */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                      Total Employee Count
                    </label>
                    <select
                      value={orgSize}
                      onChange={(e) => setOrgSize(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                    >
                      <option value="Under 100">Under 100 Employees</option>
                      <option value="100-500">100 - 500 Employees</option>
                      <option value="500-1000">500 - 1,000 Employees</option>
                      <option value="1000+">1,000+ Employees</option>
                    </select>
                  </div>
                </div>

                {/* Industry & GeoFootprint */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Industry Vertical */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                      Industry Sector / Vertical
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-355 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      >
                        <option value="Technology & SaaS">Technology & SaaS</option>
                        <option value="Manufacturing & Industrial">Manufacturing & Heavy Industrial</option>
                        <option value="Financial Services & Banking">Financial Services & Banking</option>
                        <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                        <option value="Retail & Consumer Goods">Retail & Consumer Goods</option>
                        <option value="Infrastructure & Real Estate">Infrastructure & Real Estate</option>
                        <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                        <option value="Energy & Utilities">Energy & Public Utilities</option>
                      </select>
                    </div>
                  </div>

                  {/* Geographic Footprint */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                      Compliance Geographic Footprint
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <select
                        value={geoFootprint}
                        onChange={(e) => setGeoFootprint(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 hover:border-slate-355 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      >
                        <option value="Single-State Operations">Single-State Operations</option>
                        <option value="Multi-State Operations">Multi-State (2-5 states)</option>
                        <option value="Pan-India Operations">Pan-India footprint</option>
                        <option value="Global Operations">Global / Multi-National footprint</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Primary GRC Standard */}
                <div className="space-y-1 text-left col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                    Primary Target Framework / Standard
                  </label>
                  <select
                    value={primaryStandard}
                    onChange={(e) => setPrimaryStandard(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                  >
                    {primaryStandardOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* GRC Scope (Multi-select boxes) */}
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                    Required Compliance Divisions (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {grcScopeOptions.map((opt) => {
                      const ScopeIcon = opt.icon;
                      const isSelected = grcScope.includes(opt.value);
                      return (
                        <div
                          key={opt.value}
                          onClick={() => handleToggleScope(opt.value)}
                          className={`p-4 border rounded-2xl cursor-pointer select-none transition-all duration-300 flex items-start gap-3.5 hover:shadow-md ${
                            isSelected 
                              ? "bg-blue-50/50 border-blue-500/60 shadow-md shadow-blue-500/5" 
                              : "bg-white border-slate-200 hover:border-slate-350"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                            isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            <ScopeIcon className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5 text-left min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-slate-800 truncate">{opt.label}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                            </div>
                            <p className="text-[10px] text-slate-450 leading-relaxed font-semibold line-clamp-2">
                              {opt.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Compliance Maturity (Radio custom list) */}
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1 block">
                    Current Compliance Maturity
                  </label>
                  <div className="flex flex-col gap-2.5">
                    {maturityOptions.map((opt) => {
                      const isSelected = maturity === opt.value;
                      return (
                        <div
                          key={opt.value}
                          onClick={() => setMaturity(opt.value)}
                          className={`p-3 px-4 border rounded-xl cursor-pointer select-none flex items-center justify-between transition-all hover:bg-slate-50/50 ${
                            isSelected 
                              ? "bg-blue-50/20 border-blue-500/40" 
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-black text-slate-800">{opt.label}</span>
                            <span className="text-[10px] text-slate-450 font-semibold mt-0.5">{opt.desc}</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? "border-blue-600" : "border-slate-350"
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation and Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 px-4 py-3 border border-slate-250 hover:bg-slate-100/50 text-slate-650 rounded-xl text-xs font-bold transition-all shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-450 text-white rounded-xl shadow-lg shadow-blue-500/15 text-sm font-bold tracking-wide transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Registering Environment...</span>
                      </>
                    ) : (
                      <>
                        <span>Finalize Calibration & Create Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Back to Login Callout */}
            <div className="pt-4 border-t border-slate-200/80 text-center">
              <span className="text-xs text-slate-500 font-semibold">Already have a calibrated workspace? </span>
              <Link
                to="/login"
                className="text-xs font-bold text-blue-600 hover:text-blue-750 uppercase tracking-wider transition-all"
              >
                Sign In Instead
              </Link>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}
