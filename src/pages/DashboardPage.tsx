import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { 
  ShieldCheck, Building, CheckCircle2,
  ArrowRight, Sparkles, ExternalLink, RefreshCw, Edit3,
  Layers, FileText, CheckSquare, BarChart3, ShieldAlert
} from "lucide-react";

interface ChecklistSummary {
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  notStartedItems: number;
  highPriorityTotal: number;
  highPriorityCompleted: number;
  completionPercentage: number;
  generatedAt: string;
}

export default function DashboardPage() {
  const { user, company, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [checklistSummary, setChecklistSummary] = useState<ChecklistSummary | null>(null);
  const [checklistItems, setChecklistItems] = useState<any[]>([]);
  const [hasChecklist, setHasChecklist] = useState<boolean>(false);
  const [isLoadingChecklist, setIsLoadingChecklist] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "company" | "obligations">("overview");

  // Company Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editState, setEditState] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editCompanySize, setEditCompanySize] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Set document title
  useEffect(() => {
    document.title = `${company?.companyName || "Enterprise"} | GRC Dashboard — GOVENICS`;
  }, [company]);

  // Sync edit form with company
  useEffect(() => {
    if (company) {
      setEditCompanyName(company.companyName || "");
      setEditWebsite(company.officialWebsite || "");
      setEditState(company.state || "");
      setEditCity(company.city || "");
      setEditCompanySize(company.companySize || "");
    }
  }, [company]);

  // Fetch checklist status
  const fetchChecklist = useCallback(async () => {
    setIsLoadingChecklist(true);
    try {
      const res = await fetch("/api/compliance/checklist", { credentials: "include" });
      const json = await res.json();
      if (res.ok && json.success && json.checklist) {
        setChecklistSummary(json.checklist.summary || null);
        setChecklistItems(json.checklist.items || []);
        setHasChecklist(true);
      } else {
        setHasChecklist(false);
      }
    } catch (err) {
      console.error("Failed to load checklist", err);
      setHasChecklist(false);
    } finally {
      setIsLoadingChecklist(false);
    }
  }, []);

  useEffect(() => {
    fetchChecklist();
  }, [fetchChecklist]);

  // Generate checklist trigger
  const handleGenerateChecklist = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/compliance/generate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success) {
        await fetchChecklist();
        navigate("/compliance-assessment");
      }
    } catch (err) {
      console.error("Failed to generate checklist", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save updated company profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setSaveSuccessMsg(null);
    try {
      const res = await fetch("/api/company/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: editCompanyName,
          officialWebsite: editWebsite,
          state: editState,
          city: editCity,
          companySize: editCompanySize,
        }),
      });
      const json = await res.json();
      if (json.success) {
        await refreshUser();
        setSaveSuccessMsg("Company profile updated successfully.");
        setTimeout(() => {
          setIsEditModalOpen(false);
          setSaveSuccessMsg(null);
        }, 1200);
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50/70 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* ─── Hero Banner & Welcome ─── */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-left">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>GRC Enterprise Workspace</span>
                  </span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-[10px] font-bold">
                    {company?.industrySector || "Enterprise"}
                  </span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-[10px] font-bold">
                    {company?.country || "India"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white">
                  Welcome, {user?.fullName || "Leader"}
                </h1>
                <p className="text-sm text-slate-300 font-medium">
                  Compliance and risk overview for{" "}
                  <span className="text-white font-bold">{company?.companyName || "Your Organisation"}</span>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/compliance-assessment"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Compliance Checklist</span>
                </Link>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* ─── KPI Metrics Grid ─── */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 text-left">
            
            {/* Total Requirements */}
            <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Obligations
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {checklistSummary ? checklistSummary.totalItems : "—"}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Applicable statutory rules
              </div>
            </div>

            {/* Completed */}
            <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Completed
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">
                {checklistSummary ? checklistSummary.completedItems : "0"}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Verified compliance items
              </div>
            </div>

            {/* In Progress */}
            <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                In Progress
              </span>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 font-heading">
                {checklistSummary ? checklistSummary.inProgressItems : "0"}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Under active review
              </div>
            </div>

            {/* High Priority */}
            <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                High Priority
              </span>
              <div className="text-2xl sm:text-3xl font-black text-rose-600 font-heading">
                {checklistSummary ? checklistSummary.highPriorityTotal : "0"}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Mandatory legal exposure
              </div>
            </div>

            {/* Overall Progress */}
            <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-2 col-span-2 lg:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Overall Progress
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {checklistSummary ? `${checklistSummary.completionPercentage}%` : "0%"}
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${checklistSummary ? checklistSummary.completionPercentage : 0}%` }}
                />
              </div>
            </div>

          </div>

          {/* ─── Prompt to Generate Checklist if Empty ─── */}
          {!isLoadingChecklist && !hasChecklist && (
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-3xl text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Checklist Required
                </span>
                <h3 className="text-xl font-black text-slate-900 font-heading">
                  Generate Your Intelligent Compliance Checklist
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  GOVENICS has calibrated your sector ({company?.industrySector}) and business activities.
                  Click below to generate your tailored statutory obligations and audit readiness checklist.
                </p>
              </div>
              <button
                onClick={handleGenerateChecklist}
                disabled={isGenerating}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Regulations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Checklist Now</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ─── Navigation Tabs ─── */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "overview"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Compliance Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("company")}
              className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "company"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Organisation Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("obligations")}
              className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "obligations"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Regulatory Jurisdictions</span>
            </button>
          </div>

          {/* ─── TAB CONTENT ─── */}

          {/* 1. Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 text-left">
              
              {/* High Priority Actions Card */}
              {checklistItems.length > 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-black text-slate-900 font-heading">
                        Key Statutory Deadlines &amp; Priority Items
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        High-priority obligations requiring immediate governance oversight.
                      </p>
                    </div>
                    <Link
                      to="/compliance-assessment"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>View All ({checklistItems.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {checklistItems
                      .filter((i) => i.priority === "High")
                      .slice(0, 5)
                      .map((item) => (
                        <div key={item.ruleId} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                                High Priority
                              </span>
                              <span className="text-[11px] font-bold text-slate-500">
                                {item.legislation}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              item.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700"
                                : item.status === "In Progress"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-slate-100 text-slate-700"
                            }`}>
                              {item.status}
                            </span>
                            <Link
                              to="/compliance-assessment"
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                            >
                              Update Status
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-3">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">No active checklist generated yet.</p>
                  <button
                    onClick={handleGenerateChecklist}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    Generate Checklist Now
                  </button>
                </div>
              )}

              {/* Quick Resources Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/sgrc/e-library"
                  className="p-5 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl transition-all shadow-xs group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    e-Library &amp; Templates
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Access statutory compliance registers, policies, and audit templates.
                  </p>
                </Link>

                <Link
                  to="/contact"
                  className="p-5 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl transition-all shadow-xs group"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Request an Audit Expert
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Book an external audit, legal gap analysis, or VAPT engagement.
                  </p>
                </Link>

                <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Data Sovereignty Verified
                  </h4>
                  <p className="text-xs text-slate-500">
                    Storage partitioned under tenant key <code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded text-slate-700">{user?.userId || "user"}</code>.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* 2. Company Profile Tab */}
          {activeTab === "company" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-left space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-heading">
                    Registered Organisation Information
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Data stored securely in Upstash Redis. Used to evaluate statutory rule triggers.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Details</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Company Name
                  </label>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{company?.companyName}</div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Official Website
                  </label>
                  <div className="text-sm font-bold text-blue-600 mt-0.5">
                    {company?.officialWebsite ? (
                      <a href={company.officialWebsite} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        <span>{company.officialWebsite}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : "Not Provided"}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Jurisdiction &amp; Location
                  </label>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {company?.city ? `${company.city}, ` : ""}{company?.state ? `${company.state}, ` : ""}{company?.country}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Industry Sector
                  </label>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{company?.industrySector}</div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Organisation Headcount
                  </label>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{company?.companySize}</div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Registration Type
                  </label>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {company?.businessRegistrationType || "Private Limited Company"}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Active Operations Triggering Compliance
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {company?.businessOperations?.map((op) => (
                      <span key={op} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">
                        {op}
                      </span>
                    )) || <span className="text-xs text-slate-400">None specified</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Regulatory Obligations Tab */}
          {activeTab === "obligations" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-left space-y-4">
              <h3 className="text-base font-black text-slate-900 font-heading">
                Applicable Statutory Frameworks
              </h3>
              <p className="text-xs text-slate-500">
                Statutory acts mapped to {company?.country || "India"} jurisdiction and your active business operations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {[
                  { name: "Companies Act, 2013", auth: "Ministry of Corporate Affairs (MCA)", desc: "Statutory filings (AOC-4, MGT-7), statutory registers, and board governance." },
                  { name: "Digital Personal Data Protection Act, 2023", auth: "Data Protection Board of India (DPBI)", desc: "Consent mechanisms, Notice mandates, Data Fiduciary privacy standards." },
                  { name: "Income Tax Act, 1961 & GST Act, 2017", auth: "CBDT & CBIC", desc: "Periodic TDS returns (24Q/26Q), monthly GSTR-1, GSTR-3B, and annual GSTR-9." },
                  { name: "Employees' Provident Funds & MP Act, 1952", auth: "EPFO", desc: "Monthly PF contributions (ECR) for entities with 20+ headcount." },
                  { name: "Employees' State Insurance Act, 1948", auth: "ESIC", desc: "Monthly ESI return filing for establishments with 10+ employees." },
                  { name: "CERT-In Cybersecurity Directives, 2022", auth: "CERT-In / MeitY", desc: "Mandatory 6-hour cybersecurity incident reporting and 180-day log retention." },
                  { name: "Factories Act, 1948 & OSHA", auth: "State Labour Departments", desc: "Factory licensing, occupational health, safety records, and hazard management." },
                  { name: "Foreign Trade (D&R) Act & FEMA", auth: "DGFT & RBI", desc: "Import Export Code (IEC) maintenance and FEMA international payment reporting." },
                ].map((act, idx) => (
                  <div key={idx} className="p-4 border border-slate-150 rounded-xl bg-slate-50/50 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-blue-600 block">{act.auth}</span>
                    <h4 className="text-xs font-bold text-slate-900">{act.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{act.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ─── Edit Profile Modal ─── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 font-heading">
                Update Organisation Profile
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={editCompanyName}
                  onChange={(e) => setEditCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Official Website
                </label>
                <input
                  type="url"
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Company Size
                </label>
                <select
                  value={editCompanySize}
                  onChange={(e) => setEditCompanySize(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-600"
                >
                  <option value="Individual / Freelancer">Individual / Freelancer</option>
                  <option value="Startup (1–10)">Startup (1–10)</option>
                  <option value="Small Enterprise (11–50)">Small Enterprise (11–50)</option>
                  <option value="Medium Enterprise (51–250)">Medium Enterprise (51–250)</option>
                  <option value="Large Enterprise (251–1000)">Large Enterprise (251–1000)</option>
                  <option value="Enterprise (1000+)">Enterprise (1000+)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  {isSavingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </Layout>
  );
}
