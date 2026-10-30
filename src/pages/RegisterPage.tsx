import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { 
  ShieldCheck, Lock, Mail, User as UserIcon, Building, 
  ArrowRight, ArrowLeft, AlertCircle, CheckCircle2,
  Phone, Globe, MapPin, Eye, EyeOff, Sparkles, Check,
  X
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const INDUSTRY_SECTORS = [
  "Manufacturing & Industrial",
  "Banking Financial Services & Insurance (BFSI)",
  "Healthcare & Pharmaceuticals",
  "Information Technology & Technology Services",
  "Logistics & Supply Chain",
  "Energy & Utilities",
  "Construction & Infrastructure",
  "Retail & E-Commerce",
  "Education",
  "Telecommunications",
  "Automotive & Auto Components",
  "Chemicals & Petrochemicals",
  "Food Processing",
  "Electronics & Semiconductors",
  "Textiles",
  "Professional Services",
  "Other"
];

const COMPANY_SIZES = [
  { value: "Individual / Freelancer", label: "Individual / Freelancer (1 person)" },
  { value: "Startup (1–10)", label: "Startup (1–10 employees)" },
  { value: "Small Enterprise (11–50)", label: "Small Enterprise (11–50 employees)" },
  { value: "Medium Enterprise (51–250)", label: "Medium Enterprise (51–250 employees)" },
  { value: "Large Enterprise (251–1000)", label: "Large Enterprise (251–1,000 employees)" },
  { value: "Enterprise (1000+)", label: "Enterprise (1,000+ employees)" },
];

const DEFAULT_OPERATIONS = [
  "Import and Export",
  "Manufacturing",
  "Distribution",
  "Financial Transactions",
  "Data Processing",
  "Healthcare Services",
  "Employee Management",
  "International Operations",
  "Supply Chain Management",
  "Cloud Infrastructure",
  "Consumer Data Collection",
  "Third-Party Vendor Management"
];

const REGISTRATION_TYPES = [
  "Private Limited Company (Pvt Ltd)",
  "Public Limited Company (Ltd)",
  "Limited Liability Partnership (LLP)",
  "Partnership Firm",
  "Sole Proprietorship",
  "Section 8 Company / NGO",
  "Foreign Subsidiary / Branch Office",
  "Other"
];

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Singapore",
  "United Arab Emirates",
  "Germany",
  "Australia",
  "Canada",
  "Saudi Arabia",
  "Japan",
  "Other"
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi NCR", "Goa", 
  "Gujarat", "Haryana", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", 
  "West Bengal", "Other State/UT"
];

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Multi-step: 1 = Personal, 2 = Organisation, 3 = Review, 4 = Created
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Personal Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Real-time checks
  const [emailChecking, setEmailChecking] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [userIdChecking, setUserIdChecking] = useState(false);
  const [userIdAvailable, setUserIdAvailable] = useState<boolean | null>(null);

  // Step 2: Organisation Info
  const [companyName, setCompanyName] = useState("");
  const [officialWebsite, setOfficialWebsite] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("");
  const [industrySector, setIndustrySector] = useState(INDUSTRY_SECTORS[0]);
  const [subIndustry, setSubIndustry] = useState("");
  const [companySize, setCompanySize] = useState(COMPANY_SIZES[2].value);
  const [businessOperations, setBusinessOperations] = useState<string[]>([
    "Manufacturing", "Employee Management", "Data Processing"
  ]);
  const [customOperationInput, setCustomOperationInput] = useState("");
  const [businessRegistrationType, setBusinessRegistrationType] = useState(REGISTRATION_TYPES[0]);

  // Step 3: Terms
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    document.title = "Register Enterprise Account | GOVENICS GRC";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Register your organization on GOVENICS. Secure profile management, Redis-backed data isolation, and automated statutory compliance checklists.";
    if (metaDesc) {
      metaDesc.setAttribute("content", descContent);
    }

    if (isAuthenticated && step < 4) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, step]);

  // Debounced email availability check
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setEmailAvailable(null);
        return;
      }
      setEmailChecking(true);
      try {
        const res = await fetch(`/api/auth/check-availability?email=${encodeURIComponent(email)}`);
        const json = await res.json();
        setEmailAvailable(json.available);
      } catch {
        setEmailAvailable(null);
      } finally {
        setEmailChecking(false);
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [email]);

  // Debounced user ID availability check
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!userId || userId.length < 3) {
        setUserIdAvailable(null);
        return;
      }
      setUserIdChecking(true);
      try {
        const res = await fetch(`/api/auth/check-availability?userId=${encodeURIComponent(userId)}`);
        const json = await res.json();
        setUserIdAvailable(json.available);
      } catch {
        setUserIdAvailable(null);
      } finally {
        setUserIdChecking(false);
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [userId]);

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0 to 4
  };
  const pwdScore = getPasswordStrength(password);
  const pwdStrengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Enterprise Secure"];
  const pwdStrengthColors = ["bg-slate-300", "bg-rose-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"];

  // Toggle business operations
  const toggleOperation = (op: string) => {
    if (businessOperations.includes(op)) {
      setBusinessOperations(businessOperations.filter(o => o !== op));
    } else {
      setBusinessOperations([...businessOperations, op]);
    }
  };

  const handleAddCustomOperation = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    const trimmed = customOperationInput.trim();
    if (trimmed && !businessOperations.includes(trimmed)) {
      setBusinessOperations([...businessOperations, trimmed]);
      setCustomOperationInput("");
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = "Valid business email is required.";
    if (emailAvailable === false) errs.email = "This email is already registered.";
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, "").length < 7) {
      errs.mobileNumber = "Valid mobile number is required.";
    }
    if (!userId.trim() || userId.length < 3) {
      errs.userId = "User ID must be at least 3 characters.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(userId)) {
      errs.userId = "Only letters, numbers, and underscores allowed.";
    }
    if (userIdAvailable === false) errs.userId = "This User ID is already taken.";
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      errs.password = "Min 8 characters, at least 1 uppercase and 1 number.";
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!companyName.trim()) errs.companyName = "Company / Organisation name is required.";
    if (!country.trim()) errs.country = "Country is required.";
    if (!industrySector.trim()) errs.industrySector = "Industry sector is required.";
    if (!companySize.trim()) errs.companySize = "Company size is required.";
    if (businessOperations.length === 0) {
      errs.businessOperations = "Select at least one primary business operation.";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Next Step Handlers
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleProceedToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Final Registration Submission
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms || !agreePrivacy) {
      setError("Please accept the Terms of Service and Privacy Policy to create your account.");
      return;
    }

    setIsSubmitting(true);
    try {
      const fullMobile = `${countryCode} ${mobileNumber.trim()}`;
      const payload = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: fullMobile,
        userId: userId.trim().toLowerCase(),
        password,
        confirmPassword,
        companyName: companyName.trim(),
        officialWebsite: officialWebsite.trim() || undefined,
        country: country.trim(),
        state: state.trim() || undefined,
        city: city.trim() || undefined,
        industrySector,
        subIndustry: subIndustry.trim() || undefined,
        companySize,
        businessOperations,
        businessRegistrationType,
      };

      const result = await register(payload);

      // Google Sheets Telemetry Webhook (Preserved)
      const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "Registered_Users",
            table: "Registered_Users",
            "Timestamp": new Date().toISOString(),
            "Full Name": fullName,
            "Email": email,
            "Mobile": fullMobile,
            "User ID": userId,
            "Company": companyName,
            "Industry": industrySector,
            "Company Size": companySize,
            "Country": country,
            "Registration Status": result.success ? "Success" : "Failed",
            "IP Address": "Web Client"
          }),
        }).catch(() => {/* silent telemetry */});
      }

      if (!result.success) {
        setError(result.error || "Registration failed. Please check the inputs.");
        if (result.errors) setFieldErrors(result.errors);
      } else {
        // Move to Success step
        setStep(4);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred during account provisioning.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout hideHeaderFooter>
      <div className="min-h-screen flex flex-col lg:flex-row relative z-10 bg-slate-900">
        
        {/* ─── Left Panel: Enterprise Branding & Progress ─── */}
        <div className="w-full lg:w-5/12 bg-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-650/15 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="relative z-10 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-650 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black tracking-tight font-heading text-white leading-none">
                  GOVENICS
                </span>
                <span className="text-[9px] font-bold text-blue-400 tracking-widest uppercase mt-0.5">
                  &larr; Back to Public Portal
                </span>
              </div>
            </Link>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest pl-0.5">
              Enterprise Governance, Risk & Statutory Compliance
            </p>
          </div>

          {/* Stepper Guide */}
          <div className="relative z-10 my-8 sm:my-12 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Onboarding Stage {step} of 4</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white leading-tight">
                {step === 1 && "Personal & Account Credentials"}
                {step === 2 && "Company Profiling & Operations"}
                {step === 3 && "Review & Legal Governance"}
                {step === 4 && "Account Provisioned Successfully!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {step === 1 && "Provide your official business identity. All enterprise accounts utilize isolated Upstash Redis key spaces."}
                {step === 2 && "Calibrate your company footprint, industry sector, and operational activities to auto-generate statutory compliance checklists."}
                {step === 3 && "Verify your profile details before your corporate compliance workspace is provisioned."}
                {step === 4 && "Your isolated security space is ready. You can now generate an intelligent compliance checklist aligned to Indian and international regulations."}
              </p>
            </div>

            {/* Stepper Dots / Bars */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              {[
                { s: 1, title: "Personal Information", desc: "Identity & Security Key" },
                { s: 2, title: "Organisation Profile", desc: "Industry, Jurisdiction & Scope" },
                { s: 3, title: "Review & Confirmation", desc: "Verify & Legal Consent" },
                { s: 4, title: "Ready for Compliance", desc: "Checklist Generation" },
              ].map((item) => (
                <div key={item.s} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                    step === item.s
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : step > item.s
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-500 border border-slate-700"
                  }`}>
                    {step > item.s ? <Check className="w-3.5 h-3.5" /> : item.s}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-xs font-bold ${step === item.s ? "text-white" : "text-slate-400"}`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Guarantee Trust Card */}
          <div className="relative z-10 pt-4 border-t border-slate-800/80 text-left text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold text-[11px]">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Zero-Knowledge Credential Storage</span>
            </div>
            <p className="text-[10px] text-slate-500">
              All passwords salted and hashed via bcrypt (12 rounds). Data strictly isolated in isolated Upstash Redis key namespaces.
            </p>
          </div>
        </div>

        {/* ─── Right Panel: Form Interface ─── */}
        <div className="w-full lg:w-7/12 bg-slate-50 flex flex-col justify-center p-6 sm:p-10 lg:p-14 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto">
            
            {/* Top Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start gap-3 text-xs font-medium animate-fade-in text-left">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">Registration Alert</span>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                STEP 1: PERSONAL INFORMATION
            ═══════════════════════════════════════════════════════════════ */}
            {step === 1 && (
              <form onSubmit={handleProceedToStep2} className="space-y-5 text-left">
                <div className="pb-3 border-b border-slate-200">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Step 1 of 4</span>
                  <h3 className="text-xl font-black text-slate-900 font-heading">Personal Information &amp; Credentials</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Your personal identity as the primary enterprise administrator.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: "" });
                        }}
                        placeholder="e.g., Rajesh Sharma"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                    {fieldErrors.fullName && <p className="text-xs text-rose-600 font-medium">{fieldErrors.fullName}</p>}
                  </div>

                  {/* Business Email */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      {emailChecking && <span className="text-[10px] text-slate-400 font-medium">Checking...</span>}
                      {emailAvailable === true && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Available
                        </span>
                      )}
                      {emailAvailable === false && (
                        <span className="text-[10px] text-rose-600 font-bold flex items-center gap-0.5">
                          <X className="w-3 h-3" /> Already taken
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                        }}
                        placeholder="name@company.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                    {fieldErrors.email && <p className="text-xs text-rose-600 font-medium">{fieldErrors.email}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-24 px-2 py-2.5 bg-white border border-slate-250 rounded-xl text-slate-800 text-sm font-semibold outline-none focus:border-blue-600"
                      >
                        <option value="+91">IN (+91)</option>
                        <option value="+1">US (+1)</option>
                        <option value="+44">UK (+44)</option>
                        <option value="+65">SG (+65)</option>
                        <option value="+971">AE (+971)</option>
                        <option value="+49">DE (+49)</option>
                        <option value="+61">AU (+61)</option>
                      </select>
                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                            if (fieldErrors.mobileNumber) setFieldErrors({ ...fieldErrors, mobileNumber: "" });
                          }}
                          placeholder="98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>
                    {fieldErrors.mobileNumber && <p className="text-xs text-rose-600 font-medium">{fieldErrors.mobileNumber}</p>}
                  </div>

                  {/* Preferred User ID */}
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        Preferred User ID <span className="text-rose-500">*</span>
                      </label>
                      {userIdChecking && <span className="text-[10px] text-slate-400 font-medium">Checking...</span>}
                      {userIdAvailable === true && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> User ID Available
                        </span>
                      )}
                      {userIdAvailable === false && (
                        <span className="text-[10px] text-rose-600 font-bold flex items-center gap-0.5">
                          <X className="w-3 h-3" /> User ID Taken
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">@</span>
                      <input
                        type="text"
                        required
                        value={userId}
                        onChange={(e) => {
                          setUserId(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""));
                          if (fieldErrors.userId) setFieldErrors({ ...fieldErrors, userId: "" });
                        }}
                        placeholder="rajesh_grc"
                        className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Unique handle for your portal sign in. Letters, numbers, and underscores only.
                    </span>
                    {fieldErrors.userId && <p className="text-xs text-rose-600 font-medium">{fieldErrors.userId}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
                        }}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {password && (
                      <div className="space-y-1 pt-1">
                        <div className="flex gap-1 h-1.5">
                          {[1, 2, 3, 4].map((bar) => (
                            <div
                              key={bar}
                              className={`flex-1 rounded-full transition-all ${
                                pwdScore >= bar ? pwdStrengthColors[pwdScore] : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-500 font-medium">Strength:</span>
                          <span className="font-bold text-slate-700">{pwdStrengthLabels[pwdScore]}</span>
                        </div>
                      </div>
                    )}
                    {fieldErrors.password && <p className="text-xs text-rose-600 font-medium">{fieldErrors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: "" });
                        }}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {confirmPassword && confirmPassword !== password && (
                      <p className="text-xs text-rose-600 font-medium">Passwords do not match</p>
                    )}
                    {confirmPassword && confirmPassword === password && (
                      <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Passwords match
                      </p>
                    )}
                    {fieldErrors.confirmPassword && (
                      <p className="text-xs text-rose-600 font-medium">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>

                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Already registered?{" "}
                    <Link to="/login" className="font-bold text-blue-600 hover:underline">
                      Sign in here
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Proceed to Organisation Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                STEP 2: ORGANISATION INFORMATION
            ═══════════════════════════════════════════════════════════════ */}
            {step === 2 && (
              <form onSubmit={handleProceedToStep3} className="space-y-5 text-left">
                <div className="pb-3 border-b border-slate-200 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Step 2 of 4</span>
                    <h3 className="text-xl font-black text-slate-900 font-heading">Company Profiling &amp; Scope</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Powers the intelligent statutory checklist generator.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Company Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Registered Company Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => {
                          setCompanyName(e.target.value);
                          if (fieldErrors.companyName) setFieldErrors({ ...fieldErrors, companyName: "" });
                        }}
                        placeholder="e.g., Acme Technologies India Pvt Ltd"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                    {fieldErrors.companyName && <p className="text-xs text-rose-600 font-medium">{fieldErrors.companyName}</p>}
                  </div>

                  {/* Official Website */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Official Website <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="url"
                        value={officialWebsite}
                        onChange={(e) => setOfficialWebsite(e.target.value)}
                        placeholder="https://acmecorp.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* State / Province */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      State / Province
                    </label>
                    {country === "India" ? (
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none"
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State or Region"
                        className="w-full px-3 py-2.5 bg-white border border-slate-250 rounded-xl text-slate-800 text-sm font-semibold outline-none focus:border-blue-600"
                      />
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      City / Headquarters
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g., Mumbai, Bengaluru, Hyderabad"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Industry Sector (All 17 from spec) */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Industry Sector <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={industrySector}
                      onChange={(e) => setIndustrySector(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-slate-250 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm font-semibold outline-none"
                    >
                      {INDUSTRY_SECTORS.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sub-Industry & Registration Type */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Sub-Industry / Focus Area
                    </label>
                    <input
                      type="text"
                      value={subIndustry}
                      onChange={(e) => setSubIndustry(e.target.value)}
                      placeholder="e.g., FinTech SaaS, MedTech, Precision Auto"
                      className="w-full px-3 py-2.5 bg-white border border-slate-250 focus:border-blue-600 rounded-xl text-slate-800 text-sm font-semibold outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Business Registration Type
                    </label>
                    <select
                      value={businessRegistrationType}
                      onChange={(e) => setBusinessRegistrationType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-slate-250 focus:border-blue-600 rounded-xl text-slate-800 text-sm font-semibold outline-none"
                    >
                      {REGISTRATION_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Company Size */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Organisation Size (Headcount) <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {COMPANY_SIZES.map((size) => (
                        <button
                          key={size.value}
                          type="button"
                          onClick={() => setCompanySize(size.value)}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                            companySize === size.value
                              ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm ring-1 ring-blue-600"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-350"
                          }`}
                        >
                          <span className="block">{size.value}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Business Operations (Multi-select pills + custom add) */}
                  <div className="space-y-1.5 sm:col-span-2 pt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        Primary Business Operations <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-slate-400">
                        {businessOperations.length} selected
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Select all operations your enterprise conducts. Regulatory rules match against these operations.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {DEFAULT_OPERATIONS.map((op) => {
                        const isSelected = businessOperations.includes(op);
                        return (
                          <button
                            key={op}
                            type="button"
                            onClick={() => toggleOperation(op)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-slate-900 text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span>{op}</span>
                            {isSelected ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Operation Add */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={customOperationInput}
                        onChange={(e) => setCustomOperationInput(e.target.value)}
                        onKeyDown={handleAddCustomOperation}
                        placeholder="Add other custom operation..."
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-blue-600"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomOperation}
                        className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                      >
                        Add Tag
                      </button>
                    </div>

                    {fieldErrors.businessOperations && (
                      <p className="text-xs text-rose-600 font-medium">{fieldErrors.businessOperations}</p>
                    )}
                  </div>

                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Proceed to Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                STEP 3: REVIEW & CONFIRMATION
            ═══════════════════════════════════════════════════════════════ */}
            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-5 text-left">
                <div className="pb-3 border-b border-slate-200 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Step 3 of 4</span>
                    <h3 className="text-xl font-black text-slate-900 font-heading">Review &amp; Final Confirmation</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Verify your account and organisation setup before provisioning.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Edit Info
                  </button>
                </div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Account Summary */}
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Personal Identity</span>
                      <button type="button" onClick={() => setStep(1)} className="text-[10px] font-bold text-blue-600 hover:underline">
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-black text-slate-900">{fullName}</div>
                      <div className="text-xs text-slate-600 font-medium">{email}</div>
                      <div className="text-xs text-slate-500">{countryCode} {mobileNumber}</div>
                      <div className="text-xs text-blue-600 font-bold">User ID: @{userId}</div>
                    </div>
                  </div>

                  {/* Organisation Summary */}
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Organisation</span>
                      <button type="button" onClick={() => setStep(2)} className="text-[10px] font-bold text-blue-600 hover:underline">
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-black text-slate-900">{companyName}</div>
                      <div className="text-xs text-slate-600 font-semibold">{industrySector}</div>
                      <div className="text-xs text-slate-500">
                        {city ? `${city}, ` : ""}{state}, {country}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">Headcount: {companySize}</div>
                    </div>
                  </div>

                  {/* Operations Scope */}
                  <div className="sm:col-span-2 p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Active Business Operations ({businessOperations.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {businessOperations.map((op) => (
                        <span key={op} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-bold">
                          {op}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Legal Consents */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-xs text-slate-700">
                      <span className="font-bold">Master Services &amp; Terms of Use Agreement</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        I confirm that I am an authorized representative of {companyName || "this organisation"} and agree to the GOVENICS Enterprise Terms of Service.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-xs text-slate-700">
                      <span className="font-bold">Privacy Policy &amp; Redis Data Sovereignty</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        I consent to the processing and encrypted cloud storage of regulatory compliance metadata in compliance with the Digital Personal Data Protection (DPDP) Act 2023.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Final Action Buttons */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !agreeTerms || !agreePrivacy}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Provisioning Redis Keyspace...</span>
                      </>
                    ) : (
                      <>
                        <span>Provision GRC Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                STEP 4: ACCOUNT PROVISIONED SUCCESS
            ═══════════════════════════════════════════════════════════════ */}
            {step === 4 && (
              <div className="space-y-6 text-center py-6 animate-fade-in">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Registration Complete
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                    Welcome to GOVENICS, {fullName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your organisation <span className="font-bold text-slate-800">{companyName}</span> has been provisioned with dedicated key-value storage in Upstash Redis.
                  </p>
                </div>

                {/* Action Card */}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl max-w-lg mx-auto text-left space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Intelligent Regulatory Checklist Ready
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Based on {industrySector} and {country} jurisdiction rules.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate("/compliance-assessment")}
                      className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Generate Compliance Checklist</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold text-center transition-colors"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </Layout>
  );
}
