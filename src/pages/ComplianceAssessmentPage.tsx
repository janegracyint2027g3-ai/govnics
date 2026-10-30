import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { 
  Sparkles, Search, RefreshCw, CheckCircle2,
  ExternalLink, ChevronDown, ChevronUp,
  Printer, ArrowLeft, ShieldAlert
} from "lucide-react";

interface ChecklistItem {
  ruleId: string;
  category: string;
  title: string;
  legislation: string;
  jurisdiction: string;
  authority: string;
  whyApplies: string;
  description: string;
  documentation: string;
  frequency: string;
  deadline: string;
  officialUrl?: string;
  priority: "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Completed" | "Needs Review" | "Not Applicable";
  notes?: string;
  internalDeadline?: string;
  updatedAt?: string;
}

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

export default function ComplianceAssessmentPage() {
  const { company } = useAuth();

  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [summary, setSummary] = useState<ChecklistSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Expanded items state (for viewing notes & docs)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Track pending unsaved edits { ruleId: { status, notes, internalDeadline } }
  const [pendingEdits, setPendingEdits] = useState<Record<string, Partial<ChecklistItem>>>({});

  // Set document title
  useEffect(() => {
    document.title = "Intelligent Statutory Compliance Checklist | GOVENICS";
  }, []);

  // Fetch checklist on mount
  const fetchChecklist = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/compliance/checklist", { credentials: "include" });
      const json = await res.json();
      if (res.ok && json.success && json.checklist) {
        setItems(json.checklist.items || []);
        setSummary(json.checklist.summary || null);
      } else {
        setItems([]);
        setSummary(null);
      }
    } catch (err) {
      console.error("Failed to load checklist", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChecklist();
  }, [fetchChecklist]);

  // Generate / Regenerate checklist
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/compliance/generate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (json.success && json.checklist) {
        setItems(json.checklist.items || []);
        setSummary(json.checklist.summary || null);
        setPendingEdits({});
        setSaveToast("Checklist successfully generated from your latest profile.");
        setTimeout(() => setSaveToast(null), 3000);
      }
    } catch (err) {
      console.error("Failed to generate checklist", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle item expanded view
  const toggleExpanded = (ruleId: string) => {
    setExpandedItems((prev) => ({ ...prev, [ruleId]: !prev[ruleId] }));
  };

  // Handle status change
  const handleStatusChange = (ruleId: string, newStatus: ChecklistItem["status"]) => {
    // Optimistic UI update
    setItems((prev) =>
      prev.map((it) => (it.ruleId === ruleId ? { ...it, status: newStatus } : it))
    );
    setPendingEdits((prev) => ({
      ...prev,
      [ruleId]: { ...prev[ruleId], status: newStatus },
    }));
  };

  // Handle notes change
  const handleNotesChange = (ruleId: string, notes: string) => {
    setItems((prev) =>
      prev.map((it) => (it.ruleId === ruleId ? { ...it, notes } : it))
    );
    setPendingEdits((prev) => ({
      ...prev,
      [ruleId]: { ...prev[ruleId], notes },
    }));
  };

  // Handle internal deadline change
  const handleDeadlineChange = (ruleId: string, internalDeadline: string) => {
    setItems((prev) =>
      prev.map((it) => (it.ruleId === ruleId ? { ...it, internalDeadline } : it))
    );
    setPendingEdits((prev) => ({
      ...prev,
      [ruleId]: { ...prev[ruleId], internalDeadline },
    }));
  };

  // Batch save pending updates to Redis
  const handleSaveChanges = async () => {
    const updates = Object.entries(pendingEdits).map(([ruleId, edit]) => ({
      ruleId,
      ...edit,
    }));

    if (updates.length === 0) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/compliance/checklist", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemUpdates: updates }),
      });
      const json = await res.json();
      if (json.success && json.checklist) {
        setItems(json.checklist.items || []);
        setSummary(json.checklist.summary || null);
        setPendingEdits({});
        setSaveToast("Changes saved to Upstash Redis.");
        setTimeout(() => setSaveToast(null), 3000);
      }
    } catch (err) {
      console.error("Failed to save changes", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Categories list extracted dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => set.add(it.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
      if (selectedPriority !== "All" && item.priority !== selectedPriority) return false;
      if (selectedStatus !== "All" && item.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchLegislation = item.legislation.toLowerCase().includes(q);
        const matchAuthority = item.authority.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchTitle && !matchLegislation && !matchAuthority && !matchDesc) return false;
      }
      return true;
    });
  }, [items, selectedCategory, selectedPriority, selectedStatus, searchQuery]);

  const hasPendingChanges = Object.keys(pendingEdits).length > 0;

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50/70 pt-24 pb-16 print:bg-white print:pt-4 print:pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* ─── Breadcrumb & Header ─── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-slate-200 pb-5 print:border-none">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
                <span className="text-slate-300">/</span>
                <span className="text-xs font-bold text-blue-600">Compliance Assessment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                Let's Understand Your Compliance Requirements
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Statutory obligations calibrated for <span className="text-slate-800 font-bold">{company?.companyName || "Your Organisation"}</span> ({company?.industrySector}, {company?.country || "India"}).
              </p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 print:hidden">
              {hasPendingChanges && (
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : `Save Changes (${Object.keys(pendingEdits).length})`}</span>
                </button>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-4 py-2.5 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Regenerate based on latest profile data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                <span>{isGenerating ? "Regenerating..." : "Regenerate Checklist"}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export / Print</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {saveToast && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in text-left">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveToast}</span>
            </div>
          )}

          {/* ─── Empty State / Generation Hero ─── */}
          {!isLoading && items.length === 0 && (
            <div className="p-10 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm max-w-xl mx-auto my-12">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-heading">
                Ready to Generate Your Checklist
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Click below to evaluate your company profile against our database of 20+ statutory rules, including the Companies Act, DPDP Act 2023, GST, EPF, and CERT-In mandates.
              </p>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 mx-auto"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Regulations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Compliance Checklist</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ─── Overview KPI Bar ─── */}
          {summary && (
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Statutory Compliance Maturity
                  </span>
                  <div className="text-xl font-black text-slate-900 font-heading">
                    {summary.completionPercentage}% Completed
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                    {summary.totalItems} Applicable Obligations
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">
                    {summary.completedItems} Completed
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">
                    {summary.inProgressItems} In Progress
                  </span>
                  <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold">
                    {summary.highPriorityTotal} High Priority
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${summary.completionPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* ─── Filter Bar ─── */}
          {items.length > 0 && (
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 print:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by act, authority or keyword..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                    ))}
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Needs Review">Needs Review</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>

              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                <span>Showing {filteredItems.length} of {items.length} obligations</span>
                {(selectedCategory !== "All" || selectedPriority !== "All" || selectedStatus !== "All" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedPriority("All");
                      setSelectedStatus("All");
                      setSearchQuery("");
                    }}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ─── Checklist Items List ─── */}
          {filteredItems.length > 0 && (
            <div className="space-y-4 text-left">
              {filteredItems.map((item) => {
                const isExpanded = expandedItems[item.ruleId];
                return (
                  <div
                    key={item.ruleId}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs transition-all space-y-4 hover:border-slate-350"
                  >
                    
                    {/* Header Row */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Priority Badge */}
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.priority === "High"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : item.priority === "Medium"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}>
                            {item.priority} Priority
                          </span>

                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-100">
                            {item.category}
                          </span>

                          <span className="text-[11px] font-bold text-slate-400">
                            {item.legislation}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 font-heading">
                          {item.title}
                        </h3>
                      </div>

                      {/* Status Selector & Save Trigger */}
                      <div className="flex items-center gap-2.5 shrink-0 print:hidden">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.ruleId, e.target.value as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold outline-none border transition-colors cursor-pointer ${
                            item.status === "Completed"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : item.status === "In Progress"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : item.status === "Needs Review"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : item.status === "Not Applicable"
                              ? "bg-slate-100 text-slate-500 border-slate-250"
                              : "bg-slate-50 text-slate-700 border-slate-250"
                          }`}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Needs Review">Needs Review</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => toggleExpanded(item.ruleId)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Metadata Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <div>
                        <span className="text-slate-400 font-medium block">Regulatory Authority</span>
                        <span className="font-bold text-slate-800">{item.authority}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Statutory Deadline</span>
                        <span className="font-bold text-slate-800">{item.deadline}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Reporting Frequency</span>
                        <span className="font-bold text-slate-800">{item.frequency}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Jurisdiction</span>
                        <span className="font-bold text-slate-800">{item.jurisdiction}</span>
                      </div>
                    </div>

                    {/* Description & Trigger */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="p-2.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Why this applies: </span>
                        <span>{item.whyApplies}</span>
                      </div>
                    </div>

                    {/* Expandable Details (Documentation, Notes, Internal Deadline) */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-150 space-y-3 animate-fade-in">
                        
                        {/* Required Documentation */}
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Required Artifacts &amp; Evidences
                          </span>
                          <p className="text-xs text-slate-700 font-medium">
                            {item.documentation}
                          </p>
                        </div>

                        {/* Official URL */}
                        {item.officialUrl && (
                          <div className="text-xs">
                            <a
                              href={item.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1"
                            >
                              <span>Official Regulatory Gazette / Portal</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        {/* Internal Notes & Target Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                              Internal Compliance Notes
                            </label>
                            <textarea
                              rows={2}
                              value={item.notes || ""}
                              onChange={(e) => handleNotesChange(item.ruleId, e.target.value)}
                              placeholder="e.g., Assigned to CA Sharma. Board resolution drafted on 12th Oct."
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                              Internal Target Date
                            </label>
                            <input
                              type="date"
                              value={item.internalDeadline || ""}
                              onChange={(e) => handleDeadlineChange(item.ruleId, e.target.value)}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                            />
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

          {/* ─── Legal Disclaimer ─── */}
          <div className="p-5 bg-slate-100 border border-slate-200 rounded-2xl text-left text-xs text-slate-500 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Regulatory Advisory &amp; Legal Disclaimer</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              This compliance checklist is automatically generated based on the geographical footprint, industry sector, and operational parameters supplied during company profiling. It serves as an informative governance tool to aid risk calibration and audit preparedness, and does not constitute formal legal counsel or statutory advice. Entities should consult qualified advocates, company secretaries, or chartered accountants for formal opinions on jurisdictional applicability.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
