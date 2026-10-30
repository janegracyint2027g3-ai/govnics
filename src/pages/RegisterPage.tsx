import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { 
  ShieldCheck, Lock, Mail, User as UserIcon, 
  ArrowRight, ArrowLeft, AlertCircle, CheckCircle2,
  Phone, Eye, EyeOff, Sparkles, Check,
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
  { value: "Individual / Freelancer", label: "Individual (1)" },
  { value: "Startup (1–10)", label: "Startup (1–10)" },
  { value: "Small Enterprise (11–50)", label: "Small (11–50)" },
  { value: "Medium Enterprise (51–250)", label: "Medium (51–250)" },
  { value: "Large Enterprise (251–1000)", label: "Large (251–1k)" },
  { value: "Enterprise (1000+)", label: "Enterprise (1k+)" },
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

  // Active Tab: 1 = "basic" (Basic Information), 2 = "company" (Company Information), 3 = "success"
  const [activeTab, setActiveTab] = useState<"basic" | "company" | "success">("basic");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── Tab 1: Basic Information ───
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

  // ─── Tab 2: Company Information ───
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

  // Consents
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Redirect if already authenticated
  useEffect(() => {
    document.title = "Register Enterprise Account | GOVENICS GRC";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Register your organization on GOVENICS. Multi-tabbed setup for basic credentials and company profiling.";
    if (metaDesc) {
      metaDesc.setAttribute("content", descContent);
    }

    if (isAuthenticated && activeTab !== "success") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, activeTab]);

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
    return score;
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

  // Validate Tab 1: Basic Information
  const validateBasicInfo = () => {
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
      errs.password = "Min 8 chars, 1 uppercase, 1 number.";
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Tab 2: Company Information
  const validateCompanyInfo = () => {
    const errs: Record<string, string> = {};
    if (!companyName.trim()) errs.companyName = "Company name is required.";
    if (!country.trim()) errs.country = "Country is required.";
    if (!industrySector.trim()) errs.industrySector = "Industry sector is required.";
    if (!companySize.trim()) errs.companySize = "Company size is required.";
    if (businessOperations.length === 0) {
      errs.businessOperations = "Select at least one business operation.";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Check if Tab 1 is currently valid (for tab indicator)
  const isBasicValid = Boolean(
    fullName.trim() &&
    email.trim() &&
    /\S+@\S+\.\S+/.test(email) &&
    emailAvailable !== false &&
    userId.trim().length >= 3 &&
    userIdAvailable !== false &&
    password.length >= 8 &&
    confirmPassword === password
  );

  const isCompanyValid = Boolean(
    companyName.trim() &&
    country.trim() &&
    industrySector.trim() &&
    businessOperations.length > 0
  );

  // Tab switch handler
  const handleTabClick = (tab: "basic" | "company") => {
    setError(null);
    if (tab === "company") {
      // Validate basic info first
      if (!validateBasicInfo()) {
        setError("Please complete the required basic information before moving to company details.");
        return;
      }
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Move from Tab 1 to Tab 2
  const handleProceedToCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (validateBasicInfo()) {
      setActiveTab("company");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Final Submit from Tab 2
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate both tabs
    const basicOk = validateBasicInfo();
    const companyOk = validateCompanyInfo();

    if (!basicOk) {
      setActiveTab("basic");
      setError("Please check the basic information fields for errors.");
      return;
    }

    if (!companyOk) {
      setError("Please fill in the required company details.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
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

      // Google Sheets Webhook — Store all registration details
      const webhookUrl =
        import.meta.env.VITE_TELEMETRY_WEBHOOK_URL ||
        "https://script.google.com/macros/s/AKfycbwr2WjTDd7hft1gK_3GAHgfBjNOjSgtoOoR093PHHmJ6Egua7P6e79WA2_qLynuC0m3Qg/exec";

      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "Registered_Users",
            table: "Registered_Users",
            "Timestamp": new Date().toISOString(),
            "Full Name": fullName.trim(),
            "Business Email": email.trim().toLowerCase(),
            "Mobile Number": fullMobile,
            "User ID": `@${userId.trim().toLowerCase()}`,
            "Company Name": companyName.trim(),
            "Official Website": officialWebsite.trim() || "—",
            "Country": country.trim(),
            "State / Region": state.trim() || "—",
            "City": city.trim() || "—",
            "Industry Sector": industrySector,
            "Sub-Industry": subIndustry.trim() || "—",
            "Company Size": companySize,
            "Registration Type": businessRegistrationType || "—",
            "Business Operations": businessOperations.join(", "),
            "Terms Accepted": agreeTerms ? "Yes" : "No",
            "Registration Status": result.success ? "Success" : "Failed",
            "User Agent": navigator.userAgent,
          }),
        }).catch(() => {/* silent */});
      }

      if (!result.success) {
        setError(result.error || "Registration failed. Please check inputs.");
        if (result.errors) setFieldErrors(result.errors);
      } else {
        setActiveTab("success");
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
        
        {/* ─── Left Branding Panel ─── */}
        <div className="w-full lg:w-4/12 bg-slate-900 text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-650 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-black tracking-tight font-heading text-white leading-none">
                  GOVENICS
                </span>
                <span className="text-[9px] font-bold text-blue-400 tracking-widest uppercase mt-0.5">
                  &larr; Back to Public Portal
                </span>
              </div>
            </Link>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest pl-0.5">
              Enterprise Governance &amp; Compliance OS
            </p>
          </div>

          {/* Quick value cards */}
          <div className="relative z-10 my-8 space-y-4 text-left hidden sm:block">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Fast Onboarding
              </span>
              <h3 className="text-xl font-black font-heading text-white">
                2-Step Quick Registration
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fill in your basic credentials, set your company profile, and get an automated compliance checklist in seconds.
              </p>
            </div>

            <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Automated Regulatory Calibration</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Matches your industry and operations against 20+ verified Indian Acts (Companies Act, DPDP 2023, GST, EPF).
              </p>
            </div>
          </div>

          {/* Footer security */}
          <div className="relative z-10 text-left text-[11px] text-slate-400 space-y-1 pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Isolated Redis Cloud Storage</span>
            </div>
            <p className="text-[10px] text-slate-500">
              12-round bcrypt security. Data segregated per enterprise tenant.
            </p>
          </div>
        </div>

        {/* ─── Right Panel: Multi-Tabbed Form ─── */}
        <div className="w-full lg:w-8/12 bg-slate-50 flex flex-col justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto space-y-5">
            
            {/* Top Error Alert */}
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start gap-2.5 text-xs font-medium text-left animate-fade-in shadow-xs">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">Please check your inputs:</span>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                INTERACTIVE TAB HEADER (TAB 1 vs TAB 2)
            ═══════════════════════════════════════════════════════════════ */}
            {activeTab !== "success" && (
              <div className="bg-white border border-slate-250 p-1.5 rounded-2xl shadow-xs grid grid-cols-2 gap-2 text-left">
                
                {/* Tab 1 Button */}
                <button
                  type="button"
                  onClick={() => handleTabClick("basic")}
                  className={`p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "basic"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-600"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                      activeTab === "basic" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {isBasicValid ? <Check className="w-4 h-4 text-emerald-400" /> : "1"}
                    </div>
                    <div>
                      <div className="text-xs font-black tracking-tight leading-tight">
                        Basic Information
                      </div>
                      <div className={`text-[10px] font-medium leading-none mt-0.5 ${
                        activeTab === "basic" ? "text-blue-100" : "text-slate-400"
                      }`}>
                        Identity &amp; Credentials
                      </div>
                    </div>
                  </div>
                  {isBasicValid && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      activeTab === "basic" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      Done
                    </span>
                  )}
                </button>

                {/* Tab 2 Button */}
                <button
                  type="button"
                  onClick={() => handleTabClick("company")}
                  className={`p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "company"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-600"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                      activeTab === "company" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {isCompanyValid ? <Check className="w-4 h-4 text-emerald-400" /> : "2"}
                    </div>
                    <div>
                      <div className="text-xs font-black tracking-tight leading-tight">
                        Company Information
                      </div>
                      <div className={`text-[10px] font-medium leading-none mt-0.5 ${
                        activeTab === "company" ? "text-blue-100" : "text-slate-400"
                      }`}>
                        Profile &amp; Operations
                      </div>
                    </div>
                  </div>
                  {isCompanyValid && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      activeTab === "company" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      Done
                    </span>
                  )}
                </button>

              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                TAB 1 CONTENT: BASIC INFORMATION
            ═══════════════════════════════════════════════════════════════ */}
            {activeTab === "basic" && (
              <form onSubmit={handleProceedToCompany} className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4 text-left animate-fade-in">
                
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-black text-slate-900 font-heading">
                      Tab 1: Basic Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Your identity as the primary account administrator.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Step 1 of 2
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Full Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: "" });
                        }}
                        placeholder="e.g., Rajesh Sharma"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-slate-800 text-xs font-semibold outline-none transition-all"
                      />
                    </div>
                    {fieldErrors.fullName && <p className="text-xs text-rose-600">{fieldErrors.fullName}</p>}
                  </div>

                  {/* Business Email */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      {emailChecking && <span className="text-[10px] text-slate-400">Checking...</span>}
                      {emailAvailable === true && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Available
                        </span>
                      )}
                      {emailAvailable === false && (
                        <span className="text-[10px] text-rose-600 font-bold flex items-center gap-0.5">
                          <X className="w-3 h-3" /> Taken
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                        }}
                        placeholder="rajesh@company.com"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-slate-800 text-xs font-semibold outline-none transition-all"
                      />
                    </div>
                    {fieldErrors.email && <p className="text-xs text-rose-600">{fieldErrors.email}</p>}
                  </div>

                  {/* Mobile Number with Country Code */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-1.5">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-20 px-1.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-bold outline-none"
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+65">+65 (SG)</option>
                        <option value="+971">+971 (UAE)</option>
                      </select>
                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          required
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                            if (fieldErrors.mobileNumber) setFieldErrors({ ...fieldErrors, mobileNumber: "" });
                          }}
                          placeholder="98765 43210"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-slate-800 text-xs font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>
                    {fieldErrors.mobileNumber && <p className="text-xs text-rose-600">{fieldErrors.mobileNumber}</p>}
                  </div>

                  {/* Preferred User ID */}
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                        Preferred User ID <span className="text-rose-500">*</span>
                      </label>
                      {userIdChecking && <span className="text-[10px] text-slate-400">Checking...</span>}
                      {userIdAvailable === true && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Available
                        </span>
                      )}
                      {userIdAvailable === false && (
                        <span className="text-[10px] text-rose-600 font-bold flex items-center gap-0.5">
                          <X className="w-3 h-3" /> Taken
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">@</span>
                      <input
                        type="text"
                        required
                        value={userId}
                        onChange={(e) => {
                          setUserId(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""));
                          if (fieldErrors.userId) setFieldErrors({ ...fieldErrors, userId: "" });
                        }}
                        placeholder="rajesh_grc"
                        className="w-full pl-7 pr-3 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-slate-800 text-xs font-semibold outline-none transition-all"
                      />
                    </div>
                    {fieldErrors.userId && <p className="text-xs text-rose-600">{fieldErrors.userId}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
                        }}
                        placeholder="Min 8 chars, 1 uppercase, 1 number"
                        className="w-full pl-9 pr-9 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-slate-800 text-xs font-semibold outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {password && (
                      <div className="space-y-0.5 pt-0.5">
                        <div className="flex gap-1 h-1">
                          {[1, 2, 3, 4].map((bar) => (
                            <div
                              key={bar}
                              className={`flex-1 rounded-full transition-all ${
                                pwdScore >= bar ? pwdStrengthColors[pwdScore] : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-[9px] text-slate-500">
                          <span>Password Strength</span>
                          <span className="font-bold">{pwdStrengthLabels[pwdScore]}</span>
                        </div>
                      </div>
                    )}
                    {fieldErrors.password && <p className="text-xs text-rose-600">{fieldErrors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: "" });
                        }}
                        placeholder="Re-enter security password"
                        className="w-full pl-9 pr-9 py-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-slate-800 text-xs font-semibold outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {confirmPassword && confirmPassword === password && (
                      <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Passwords match
                      </p>
                    )}
                    {fieldErrors.confirmPassword && <p className="text-xs text-rose-600">{fieldErrors.confirmPassword}</p>}
                  </div>

                </div>

                {/* Tab 1 Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Already registered?{" "}
                    <Link to="/login" className="font-bold text-blue-600 hover:underline">
                      Sign In
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                  >
                    <span>Next: Company Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                TAB 2 CONTENT: COMPANY INFORMATION (COMPACT & BITE-SIZED)
            ═══════════════════════════════════════════════════════════════ */}
            {activeTab === "company" && (
              <form onSubmit={handleFinalSubmit} className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5 text-left animate-fade-in">
                
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-black text-slate-900 font-heading">
                      Tab 2: Company Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tailors your statutory obligations and audit registers.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Step 2 of 2
                  </span>
                </div>

                {/* Sub-Card 1: Organisation & Location */}
                <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                    1. Corporate Entity &amp; Jurisdiction
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g., Acme Technologies India Pvt Ltd"
                        className="w-full px-3 py-2 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
                      />
                      {fieldErrors.companyName && <p className="text-xs text-rose-600">{fieldErrors.companyName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                        Official Website <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={officialWebsite}
                        onChange={(e) => setOfficialWebsite(e.target.value)}
                        placeholder="https://acmecorp.com"
                        className="w-full px-3 py-2 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:col-span-2">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                          Country <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                          State / Region
                        </label>
                        {country === "India" ? (
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
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
                            placeholder="State"
                            className="w-full px-2 py-1.5 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
                          />
                        )}
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          className="w-full px-2 py-1.5 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                        Registration Type
                      </label>
                      <select
                        value={businessRegistrationType}
                        onChange={(e) => setBusinessRegistrationType(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
                      >
                        {REGISTRATION_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

                {/* Sub-Card 2: Industry & Scale */}
                <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                    2. Industry Sector &amp; Headcount
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                        Industry Sector <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={industrySector}
                        onChange={(e) => setIndustrySector(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
                      >
                        {INDUSTRY_SECTORS.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                        Sub-Industry Focus
                      </label>
                      <input
                        type="text"
                        value={subIndustry}
                        onChange={(e) => setSubIndustry(e.target.value)}
                        placeholder="e.g., FinTech SaaS, MedTech"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-250 rounded-xl text-xs font-semibold outline-none focus:border-blue-600"
                      />
                    </div>

                    {/* Compact Size Pills */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                        Company Headcount <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                        {COMPANY_SIZES.map((size) => (
                          <button
                            key={size.value}
                            type="button"
                            onClick={() => setCompanySize(size.value)}
                            className={`py-1.5 px-1 rounded-lg border text-[11px] font-bold text-center transition-all ${
                              companySize === size.value
                                ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-350"
                            }`}
                          >
                            <span>{size.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Card 3: Operations & Trigger Tags */}
                <div className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                      3. Active Business Operations ({businessOperations.length})
                    </span>
                    <span className="text-[10px] text-slate-400">Pills trigger statutory acts</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {DEFAULT_OPERATIONS.map((op) => {
                      const isSelected = businessOperations.includes(op);
                      return (
                        <button
                          key={op}
                          type="button"
                          onClick={() => toggleOperation(op)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            isSelected
                              ? "bg-slate-900 text-white shadow-2xs"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span>{op}</span>
                          {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Custom Tag */}
                  <div className="flex gap-1.5 pt-1">
                    <input
                      type="text"
                      value={customOperationInput}
                      onChange={(e) => setCustomOperationInput(e.target.value)}
                      onKeyDown={handleAddCustomOperation}
                      placeholder="Add other operation..."
                      className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomOperation}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>

                {/* Consents */}
                <div className="space-y-2 pt-1 text-xs text-slate-600">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600"
                    />
                    <span className="text-[11px]">
                      I agree to the <span className="font-bold text-slate-800">GOVENICS Terms of Service</span> &amp; <span className="font-bold text-slate-800">DPDP Act 2023</span> Data Processing Consent.
                    </span>
                  </label>
                </div>

                {/* Tab 2 Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("basic")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Basic Info
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !agreeTerms}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-black shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Provisioning Account...</span>
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
                SUCCESS STATE: ACCOUNT PROVISIONED
            ═══════════════════════════════════════════════════════════════ */}
            {activeTab === "success" && (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Registration Complete
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 font-heading">
                    Welcome to GOVENICS, {fullName}!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Your organisation <span className="font-bold text-slate-800">{companyName}</span> has been provisioned with isolated Upstash Redis storage.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/compliance-assessment")}
                    className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Compliance Checklist</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </Layout>
  );
}
