import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  getEvents,
  clearEvents,
  getAnalyticsSummary,
  exportToCSV,
  exportLeadsToCSV,
  addManualEvent
} from "@/utils/analytics";
import type { GrcAnalyticsEvent } from "@/utils/analytics";
import {
  BarChart3,
  Database,
  Download,
  RefreshCw,
  FileSpreadsheet,
  Play,
  Send,
  TrendingUp,
  Users,
  Layers,
  Search,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  Percent
} from "lucide-react";

export default function AnalyticsPage() {
  const [events, setEvents] = useState<GrcAnalyticsEvent[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"analytics" | "data_sheet" | "leads_sheet">("analytics");
  
  // Filtering & Pagination for Data Sheet
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Simulator State
  const [simName, setSimName] = useState("");
  const [simEmail, setSimEmail] = useState("");
  const [simCompany, setSimCompany] = useState("");
  const [simInterest, setSimInterest] = useState("Labour Compliance Audit");
  const [simSearchQuery, setSimSearchQuery] = useState("");
  const [simState, setSimState] = useState("Karnataka");
  const [simEmployees, setSimEmployees] = useState(75);
  const [simSalary, setSimSalary] = useState(18000);
  const [simType, setSimType] = useState<"search" | "estimator_calc" | "form_submit">("search");
  
  const [notification, setNotification] = useState<string | null>(null);

  // Load telemetry data
  const loadData = () => {
    const rawEvents = getEvents();
    // Sort reverse chronological
    setEvents([...rawEvents].reverse());
    setSummary(getAnalyticsSummary());
  };

  useEffect(() => {
    loadData();
    document.title = "Analytics & Telemetry Dashboard — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Internal GRC telemetry analytics, event monitoring, and lead conversion reporting for GOVENICS platform administrators.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
    
    // Listen for custom events
    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener("govenics_telemetry_updated", handleUpdate);
    return () => {
      window.removeEventListener("govenics_telemetry_updated", handleUpdate);
    };
  }, []);

  const handleClear = () => {
    if (confirm("This will clear custom telemetry logs and re-seed the database with realistic GRC data. Continue?")) {
      clearEvents();
      showNotification("Database reset & re-seeded successfully!");
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Simulate a behavior click
  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (simType === "search") {
      if (!simSearchQuery.trim()) return;
      addManualEvent({
        timestamp: new Date().toISOString(),
        type: "search",
        path: "/sgrc/e-library",
        category: "Statutory GRC",
        details: {
          query: simSearchQuery,
          resultsCount: Math.floor(Math.random() * 5) + 1
        }
      });
      showNotification(`Simulated Search: "${simSearchQuery}"`);
      setSimSearchQuery("");
    } else if (simType === "estimator_calc") {
      const calculatedLiability = Math.round(simEmployees * (simSalary * 0.12 + simSalary * 0.0325));
      addManualEvent({
        timestamp: new Date().toISOString(),
        type: "estimator_calc",
        path: "/sgrc/estimator",
        category: "Statutory GRC",
        details: {
          state: simState,
          employeeCount: simEmployees,
          avgSalary: simSalary,
          totalLiability: calculatedLiability,
          hasMines: simEmployees > 100
        }
      });
      showNotification(`Simulated Estimator Run for ${simState} (${simEmployees} employees)`);
    } else if (simType === "form_submit") {
      if (!simName || !simEmail || !simCompany) {
        alert("Please fill out Name, Email, and Company for mock GRC Lead.");
        return;
      }
      addManualEvent({
        timestamp: new Date().toISOString(),
        type: "form_submit",
        path: "/contact",
        category: simInterest.includes("DPDP") || simInterest.includes("Security") ? "Cybersecurity" :
                  simInterest.includes("BRSR") ? "ESG" : "Statutory GRC",
        details: {
          name: simName,
          email: simEmail,
          company: simCompany,
          interest: simInterest,
          message: `Injected mock business request regarding: ${simInterest}`
        }
      });
      showNotification(`Simulated Lead Submission: ${simName} (${simCompany})`);
      setSimName("");
      setSimEmail("");
      setSimCompany("");
    }
  };

  const downloadCSV = () => {
    const rawEvents = getEvents();
    const csvContent = exportToCSV(rawEvents);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `govenics_grc_telemetry_sheet_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Downloaded Telemetry CSV Sheet");
  };

  const downloadLeadsCSV = () => {
    if (!summary || summary.leads.length === 0) {
      alert("No leads data available to export.");
      return;
    }
    const csvContent = exportLeadsToCSV(summary.leads);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `govenics_grc_leads_sheet_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Downloaded GRC Leads Data Sheet");
  };

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-10 h-10 animate-spin text-blue-500" />
          <span className="font-bold text-sm tracking-wider uppercase">Loading GRC Analytics...</span>
        </div>
      </div>
    );
  }

  // Filter events for the Data Sheet view
  const filteredEvents = events.filter(e => {
    const matchesSearch = 
      e.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.details && JSON.stringify(e.details).toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType = typeFilter === "all" || e.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || e.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Simple chart percentages helpers
  const getCategoryPercent = (catName: string) => {
    const count = summary.categoryCounts[catName] || 0;
    if (summary.totalLogs === 0) return 0;
    return Math.round((count / summary.totalLogs) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-slide-up border border-blue-400/30">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">{notification}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-10 bg-slate-950/80 border-b border-slate-800 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-indigo-700/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/25 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> Govenics Auditing & Behaviour Telemetry
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                GRC Site Analytics &amp; Data Sheet
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl mt-1.5 leading-relaxed font-medium">
                Comprehensive telemetry reporting dashboard tracking client engagement, compliance estimator inputs, e-Library statutory queries, and form conversion funnels.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={downloadCSV}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                <Download className="w-4 h-4 text-blue-400" /> Export Data Sheet (CSV)
              </button>
              <button 
                onClick={downloadLeadsCSV}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-white" /> Export Leads Sheet (CSV)
              </button>
              <button 
                onClick={handleClear}
                title="Reset local databases and seed mock data"
                className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Board Layout */}
      <main className="container mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Panel: Interactive Simulation Controller */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-xl relative">
            <div className="absolute top-0 right-6 w-16 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500" />
            <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <Play className="w-4 h-4 text-emerald-400" /> Telemetry Simulator
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed font-medium mb-4">
              Simulate GRC client actions in real-time. Choose an action, fill details, and trigger to watch the live sheets and charts recompute.
            </p>

            <form onSubmit={handleSimulate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Action Type</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {[
                    { id: "search", label: "Search" },
                    { id: "estimator_calc", label: "Estimate" },
                    { id: "form_submit", label: "Lead" }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSimType(t.id as any)}
                      className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                        simType === t.id ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {simType === "search" && (
                <div className="space-y-3 animate-fade-in">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mock Search Query</label>
                    <input 
                      type="text"
                      value={simSearchQuery}
                      onChange={(e) => setSimSearchQuery(e.target.value)}
                      placeholder="e.g. Factories Act, DPDP compliance"
                      className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {simType === "estimator_calc" && (
                <div className="space-y-3 animate-fade-in">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">State/Jurisdiction</label>
                    <select
                      value={simState}
                      onChange={(e) => setSimState(e.target.value)}
                      className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Employees</label>
                      <input 
                        type="number"
                        value={simEmployees}
                        onChange={(e) => setSimEmployees(Number(e.target.value))}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Salary (₹)</label>
                      <input 
                        type="number"
                        value={simSalary}
                        onChange={(e) => setSimSalary(Number(e.target.value))}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                        step="500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {simType === "form_submit" && (
                <div className="space-y-3 animate-fade-in">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Client Name</label>
                    <input 
                      type="text"
                      value={simName}
                      onChange={(e) => setSimName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Corporate Email</label>
                    <input 
                      type="email"
                      value={simEmail}
                      onChange={(e) => setSimEmail(e.target.value)}
                      placeholder="e.g. ramesh@infotech.in"
                      className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company</label>
                    <input 
                      type="text"
                      value={simCompany}
                      onChange={(e) => setSimCompany(e.target.value)}
                      placeholder="e.g. InfoTech Corp"
                      className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">GRC Interest Domain</label>
                    <select
                      value={simInterest}
                      onChange={(e) => setSimInterest(e.target.value)}
                      className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Labour Compliance Audit">Labour Compliance Audit</option>
                      <option value="DPDP Framework Setup">DPDP Framework Setup</option>
                      <option value="BRSR Advisory & Disclosures">BRSR Advisory & Disclosures</option>
                      <option value="Offensive Security Assessment">Offensive Security Assessment</option>
                      <option value="Full Payroll GRC Processing">Full Payroll GRC Processing</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/10 transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" /> Inject Event Log &rarr;
              </button>
            </form>
          </div>

          {/* Quick Telemetry Indicators */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4">
            <h3 className="text-[10px] font-black text-slate-450 uppercase tracking-wider mb-3">Live Feed Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Active Tracking
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Total Encrypted Actions</span>
                <span className="text-white">{events.length} logs</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Auditable Sessions</span>
                <span className="text-white">{summary.sessions}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section: Tabs and Sheets */}
        <section className="lg:col-span-3 space-y-6">
          
          {/* KPI Dashboard Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
              <div className="p-3 bg-blue-600/10 text-blue-400 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider">Total Visitors</span>
                <span className="text-xl font-bold text-white leading-none mt-1">{summary.sessions}</span>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
              <div className="p-3 bg-purple-600/10 text-purple-400 rounded-xl">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider">Total Click Logs</span>
                <span className="text-xl font-bold text-white leading-none mt-1">{summary.totalLogs}</span>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
              <div className="p-3 bg-emerald-600/10 text-emerald-400 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider">Estimator Runs</span>
                <span className="text-xl font-bold text-white leading-none mt-1">{summary.estimator.totalRuns}</span>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
              <div className="p-3 bg-indigo-600/10 text-indigo-400 rounded-xl">
                <Send className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider">GRC Leads</span>
                <span className="text-xl font-bold text-white leading-none mt-1">{summary.leads.length} leads</span>
              </div>
            </div>
          </div>

          {/* Main Tab Selectors */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`pb-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "analytics"
                  ? "border-blue-500 text-blue-400 font-extrabold"
                  : "border-transparent text-slate-450 hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Analytics Summary Sheet
            </button>
            <button
              onClick={() => setActiveTab("data_sheet")}
              className={`pb-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "data_sheet"
                  ? "border-blue-500 text-blue-400 font-extrabold"
                  : "border-transparent text-slate-450 hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" /> Auditable Data Sheet (Logs)
            </button>
            <button
              onClick={() => setActiveTab("leads_sheet")}
              className={`pb-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "leads_sheet"
                  ? "border-blue-500 text-blue-400 font-extrabold"
                  : "border-transparent text-slate-450 hover:text-white"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" /> Customer Leads Sheet
            </button>
          </div>

          {/* Tab 1: Analytics Dashboard Summary */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Visual Chart: Category Interest Breakdown */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">
                    GRC Segment Distribution (Logs)
                  </h3>
                  
                  <div className="space-y-3.5">
                    {[
                      { name: "Statutory GRC", color: "bg-blue-500" },
                      { name: "Labour Law", color: "bg-indigo-500" },
                      { name: "Cybersecurity", color: "bg-purple-500" },
                      { name: "ESG", color: "bg-teal-500" },
                      { name: "HR Policy", color: "bg-amber-500" },
                      { name: "General", color: "bg-slate-500" }
                    ].map(cat => {
                      const count = summary.categoryCounts[cat.name] || 0;
                      const pct = getCategoryPercent(cat.name);
                      return (
                        <div key={cat.name} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-300">{cat.name}</span>
                            <span className="text-slate-400">{count} events ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Funnel: GRC Site Conversion Funnel */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">
                    User GRC Engagement Funnel
                  </h3>

                  <div className="space-y-5">
                    {/* Step 1 */}
                    <div className="relative p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500/10 text-blue-400 rounded-md flex items-center justify-center text-xs font-black">1</div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">General Traffic (Page Views)</span>
                          <span className="text-[10px] text-slate-450 font-medium">Visiting core Govenics service pages</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-white">{summary.typeCounts.page_view || 0}</span>
                    </div>

                    {/* Step 2 */}
                    <div className="relative p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="absolute -top-3.5 left-6 flex items-center text-slate-500">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                        <span className="text-[9px] font-bold text-blue-500 ml-1">
                          {summary.typeCounts.page_view > 0 ? Math.round(((summary.typeCounts.search + summary.typeCounts.estimator_calc) / summary.typeCounts.page_view) * 100) : 0}% Engagement
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-purple-500/10 text-purple-400 rounded-md flex items-center justify-center text-xs font-black">2</div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">Exploratory Audit (Searches &amp; Estimates)</span>
                          <span className="text-[10px] text-slate-450 font-medium">Active querying of laws and running calculators</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-white">{(summary.typeCounts.search || 0) + (summary.typeCounts.estimator_calc || 0)}</span>
                    </div>

                    {/* Step 3 */}
                    <div className="relative p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="absolute -top-3.5 left-6 flex items-center text-slate-500">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                        <span className="text-[9px] font-bold text-emerald-400 ml-1">
                          {(summary.typeCounts.search + summary.typeCounts.estimator_calc) > 0 ? Math.round((summary.leads.length / (summary.typeCounts.search + summary.typeCounts.estimator_calc)) * 100) : 0}% Sales Lead Conversion
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-emerald-500/10 text-emerald-400 rounded-md flex items-center justify-center text-xs font-black">3</div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">Conversion (Consultation Forms)</span>
                          <span className="text-[10px] text-slate-450 font-medium">Providing contacts requesting auditing setups</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-white">{summary.leads.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Estimator Metrics */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-blue-500" /> Compliance Estimator Detailed Metrics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider">Avg Employees per Query</span>
                    <span className="text-2xl font-bold text-white mt-1.5">{summary.estimator.avgEmployees}</span>
                    <span className="text-[9px] text-slate-500 leading-snug mt-1">Reflects mid-to-large business profiling.</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider">Avg Monthly Liability Computed</span>
                    <span className="text-2xl font-bold text-white mt-1.5">₹{summary.estimator.avgLiability.toLocaleString()}</span>
                    <span className="text-[9px] text-slate-500 leading-snug mt-1">Estimate calculations of combined PF/ESI codes.</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
                    <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider mb-2">Most Queried States</span>
                    {summary.estimator.stateBreakdown.length === 0 ? (
                      <span className="text-xs text-slate-500 mt-2 font-medium">No calculations simulated yet.</span>
                    ) : (
                      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[85px] scrollbar-thin">
                        {summary.estimator.stateBreakdown.slice(0, 3).map((st: any) => (
                          <div key={st.state} className="flex justify-between text-xs font-bold text-slate-300">
                            <span>{st.state}</span>
                            <span className="text-slate-400">{st.count} calculations</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom: Popular Searches and Pages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Search Queries */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3">Top Statutory Search Queries</h3>
                  <div className="divide-y divide-slate-900">
                    {summary.topSearches.length === 0 ? (
                      <p className="text-xs text-slate-500 py-3 font-medium text-center">No search queries logged.</p>
                    ) : (
                      summary.topSearches.map((s: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center py-2.5 text-xs font-semibold">
                          <span className="text-slate-300 flex items-center gap-2">
                            <Search className="w-3.5 h-3.5 text-slate-500" /> "{s.query}"
                          </span>
                          <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-blue-400">{s.count} searches</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Top GRC Pages viewed */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3">Top GRC Pages Visited</h3>
                  <div className="divide-y divide-slate-900">
                    {summary.topPageViews.map((pv: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center py-2.5 text-xs font-semibold">
                        <span className="text-slate-300 truncate max-w-[280px]">
                          {pv.name}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-purple-400 font-bold">{pv.count} visits</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Raw Telemetry Logs Data Sheet */}
          {activeTab === "data_sheet" && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h3 className="text-xs font-black text-white uppercase tracking-widest mr-auto">
                  Enrolled GRC Telemetry Records ({filteredEvents.length} matches)
                </h3>
                
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      placeholder="Search telemetry..."
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                      className="w-full md:w-48 bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <select
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="page_view">Page View</option>
                    <option value="search">Search</option>
                    <option value="estimator_calc">Estimator</option>
                    <option value="form_submit">Lead</option>
                    <option value="click">Clicks</option>
                  </select>

                  <select
                    value={categoryFilter}
                    onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="Statutory GRC">Statutory GRC</option>
                    <option value="Labour Law">Labour Law</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="ESG">ESG</option>
                    <option value="HR Policy">HR Policy</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto border border-slate-900 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider">
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">GRC Category</th>
                      <th className="p-3">Path</th>
                      <th className="p-3">Details / Parameters</th>
                      <th className="p-3 text-right">Session ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-xs">
                    {paginatedEvents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 font-semibold">
                          No telemetry events match your filter query.
                        </td>
                      </tr>
                    ) : (
                      paginatedEvents.map(e => (
                        <tr key={e.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3 text-slate-450 font-bold whitespace-nowrap">
                            {new Date(e.timestamp).toLocaleDateString()} {new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              e.type === "page_view" ? "bg-blue-500/10 text-blue-400" :
                              e.type === "search" ? "bg-purple-500/10 text-purple-400" :
                              e.type === "estimator_calc" ? "bg-emerald-500/10 text-emerald-400" :
                              e.type === "form_submit" ? "bg-red-500/10 text-red-400" :
                              "bg-slate-500/10 text-slate-400"
                            }`}>
                              {e.type.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-3 text-white font-bold">{e.category}</td>
                          <td className="p-3 text-slate-400 font-medium font-mono text-[10px] max-w-[120px] truncate" title={e.path}>{e.path}</td>
                          <td className="p-3 text-slate-300 font-mono text-[10px] max-w-[280px] truncate" title={JSON.stringify(e.details)}>
                            {e.type === "search" && `Query: "${e.details.query}" (${e.details.resultsCount} hits)`}
                            {e.type === "estimator_calc" && `State: ${e.details.state} | Staff: ${e.details.employeeCount} | Liability: ₹${e.details.totalLiability.toLocaleString()}`}
                            {e.type === "form_submit" && `Lead: ${e.details.name} | Co: ${e.details.company} | Interest: ${e.details.interest}`}
                            {e.type === "page_view" && `View: ${e.details.pageName}`}
                            {e.type === "click" && `Click: ${e.details.elementText || e.details.elementId}`}
                          </td>
                          <td className="p-3 text-right text-slate-500 font-mono text-[10px]">{e.sessionToken.slice(0, 15)}...</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-450"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-450"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Customer Leads / Submission Forms Sheet */}
          {activeTab === "leads_sheet" && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-white uppercase tracking-widest">
                  Customer Consultation Request Sheet ({summary.leads.length} Leads logged)
                </h3>
              </div>

              {summary.leads.length === 0 ? (
                <div className="p-12 text-center text-slate-500 font-semibold border border-slate-900 rounded-xl">
                  No consultation request forms submitted yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summary.leads.map((lead: any, idx: number) => (
                    <div 
                      key={idx} 
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-blue-500/40 transition-colors relative"
                    >
                      <div className="absolute top-4 right-4 text-[9px] font-bold text-slate-500 font-mono">
                        {new Date(lead.timestamp).toLocaleDateString()}
                      </div>
                      
                      <div>
                        <span className="inline-flex px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full text-[9px] font-black uppercase tracking-wider mb-2">
                          {lead.interest}
                        </span>
                        <h4 className="text-sm font-extrabold text-white">{lead.name}</h4>
                        <p className="text-xs text-slate-400 font-bold">{lead.company} &bull; <span className="text-slate-500 font-medium font-mono">{lead.email}</span></p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-950">
                        "{lead.message}"
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </section>
      </main>

      <Footer />
    </div>
  );
}
