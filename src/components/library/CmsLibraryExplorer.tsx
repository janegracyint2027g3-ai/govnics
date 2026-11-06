// src/components/library/CmsLibraryExplorer.tsx
// Unified WordPress CMS E-Library Explorer Component for GOVENICS GRC

import React, { useState } from "react";
import { useLibraryCms, type CmsResource } from "@/hooks/useLibraryCms";
import {
  BookOpen, Search, Filter, RefreshCw, FileText, Download,
  ExternalLink, X, Eye, Building2, AlertCircle
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Resources" },
  { id: "ebooks", label: "E-books" },
  { id: "blogs", label: "Articles & Blogs" },
  { id: "acts", label: "Acts & Legislation" },
  { id: "regulations", label: "Rules & Regulations" },
  { id: "guides", label: "Compliance Guides" },
  { id: "industry-reports", label: "Industry Reports" },
  { id: "checklists", label: "Checklists" },
  { id: "templates", label: "Templates & Forms" },
  { id: "regulatory-updates", label: "Regulatory Updates" }
];

const OFFERINGS = [
  "All",
  "Regulatory Compliance",
  "Labour & Employment",
  "Environmental & EHS",
  "Licensing & Permits",
  "Taxation & Trade",
  "Export & Trade Services",
  "Supply Chain Compliance",
  "Escrow Services",
  "Enterprise Governance",
  "Risk Management",
  "ESG & Sustainability",
  "Cybersecurity & Privacy"
];

const INDUSTRIES = [
  "All",
  "Manufacturing & Industrial",
  "Automotive & Auto Components",
  "Pharmaceuticals & Medical Devices",
  "Electronics & Semiconductors",
  "Chemicals & Petrochemicals",
  "Textiles",
  "Food Processing",
  "BFSI & Fintech",
  "Healthcare",
  "IT & Technology",
  "Logistics & Supply Chain",
  "Infrastructure & Construction",
  "Energy & Utilities",
  "Retail & Consumer Goods",
  "Agriculture"
];

export const CmsLibraryExplorer: React.FC = () => {
  const {
    resources,
    loading,
    error,
    total,
    totalPages,
    page,
    setPage,
    category,
    setCategory,
    offering,
    setOffering,
    industry,
    setIndustry,
    search,
    setSearch,
    fetchResources,
    syncWithCms,
    isSyncing
  } = useLibraryCms();

  const [activeDocument, setActiveDocument] = useState<CmsResource | null>(null);
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResources();
  };

  return (
    <div className="space-y-6 text-left">
      {/* ─── Top CMS Banner & Telemetry ─── */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-900/40 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-black uppercase tracking-wider text-sky-400 font-heading">
              Central WordPress CMS E-Library
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              REST API Synced
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Content managed directly through WordPress at <span className="font-mono text-sky-300">cms.govenics.com</span>. Published statutory guides, e-books, checklists, and legal gazettes synchronize dynamically into this portal.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={syncWithCms}
            disabled={isSyncing || loading}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-white" : ""}`} />
            <span>{isSyncing ? "Syncing..." : "Sync with WordPress"}</span>
          </button>
          <a
            href="https://cms.govenics.com/wp-admin/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700"
          >
            <span>WP Admin</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* ─── Category Filter Pills ─── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setCategory(cat.id);
              setPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              category === cat.id
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ─── Search & Dropdown Filters Bar ─── */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Acts, E-books, Guidelines, Circulars, Slabs..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                fetchResources({ search: "" });
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        <div className="flex items-center gap-2">
          {/* Offering Filter */}
          <div className="relative min-w-[170px]">
            <select
              value={offering}
              onChange={(e) => {
                setOffering(e.target.value);
                setPage(1);
              }}
              className="w-full appearance-none px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer pr-7"
            >
              <option value="All">All Offerings (12)</option>
              {OFFERINGS.filter(o => o !== "All").map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Industry Filter */}
          <div className="relative min-w-[170px]">
            <select
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                setPage(1);
              }}
              className="w-full appearance-none px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer pr-7"
            >
              <option value="All">All Industries (15)</option>
              {INDUSTRIES.filter(i => i !== "All").map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <Building2 className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ─── Results Summary Bar ─── */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <span className="font-bold text-slate-800">{resources.length}</span> of <span className="font-bold text-slate-800">{total}</span> published resources from WordPress
        </span>
        {(offering !== "All" || industry !== "All" || category !== "all" || search) && (
          <button
            onClick={() => {
              setCategory("all");
              setOffering("All");
              setIndustry("All");
              setSearch("");
              setPage(1);
            }}
            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
          >
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* ─── Resource Cards Grid ─── */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 bg-white rounded-2xl border border-slate-200">
          <RefreshCw className="w-7 h-7 text-blue-600 animate-spin" />
          <p className="text-xs font-bold text-slate-600">Retrieving content from WordPress REST API...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>WordPress CMS API Connection Notice</span>
          </div>
          <p className="text-xs text-rose-700 leading-relaxed">{error}</p>
          <button
            onClick={() => fetchResources()}
            className="mt-2 px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold"
          >
            Retry Connection
          </button>
        </div>
      ) : resources.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No resources found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No published resources in WordPress match your current filter selection. Log in to <span className="font-bold">cms.govenics.com/wp-admin</span> to publish a new resource.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group text-left"
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    {doc.documentType}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">
                    {doc.documentId}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {doc.title}
                </h4>

                {/* Excerpt */}
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {doc.description}
                </p>

                {/* Metadata List */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Offering:</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[180px]">{doc.offering}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Industry:</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[180px]">{doc.industry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Jurisdiction:</span>
                    <span className="font-semibold text-slate-700">{doc.country} • {doc.state}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Published:</span>
                    <span className="font-semibold text-slate-700">{doc.publicationDate || "Active"}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveDocument(doc)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {doc.pdfUrl && (
                    <button
                      onClick={() => setActivePdfUrl(doc.pdfUrl)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors"
                      title="Preview / Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {doc.sourceUrl && (
                    <a
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                      title="Official Source Authority"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Pagination ─── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs text-slate-600 font-bold px-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* ─── Modal 1: Document Detail & Rich Content Reader ─── */}
      {activeDocument && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in text-left">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-150 flex items-start justify-between bg-slate-50/50">
              <div className="space-y-1.5 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {activeDocument.documentType}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    {activeDocument.documentId}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 leading-snug">
                  {activeDocument.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDocument(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 scrollbar-thin">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-150 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Offering</span>
                  <span className="font-bold text-slate-800">{activeDocument.offering}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Industry</span>
                  <span className="font-bold text-slate-800">{activeDocument.industry}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Jurisdiction</span>
                  <span className="font-bold text-slate-800">{activeDocument.country} • {activeDocument.state}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Applicable Act</span>
                  <span className="font-bold text-slate-800">{activeDocument.applicableAct}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Version</span>
                  <span className="font-bold text-slate-800">{activeDocument.version}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Author</span>
                  <span className="font-bold text-slate-800">{activeDocument.author}</span>
                </div>
              </div>

              {/* Rich HTML Content from WordPress */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Document Overview &amp; Content
                </h4>
                <div
                  className="prose prose-sm max-w-none text-slate-700 leading-relaxed text-xs space-y-2"
                  dangerouslySetInnerHTML={{ __html: activeDocument.content || activeDocument.description }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-150 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Source: cms.govenics.com (Post #{activeDocument.id})
              </span>
              <div className="flex items-center gap-2">
                {activeDocument.pdfUrl && (
                  <a
                    href={activeDocument.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}
                {activeDocument.sourceUrl && (
                  <a
                    href={activeDocument.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Official Gazette Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Modal 2: PDF Previewer ─── */}
      {activePdfUrl && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in text-left">
            <div className="p-4 border-b border-slate-150 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-slate-800 font-mono truncate max-w-md">
                  {activePdfUrl}
                </span>
              </div>
              <button
                onClick={() => setActivePdfUrl(null)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <iframe
              src={activePdfUrl}
              title="PDF Preview"
              className="w-full flex-1 border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
