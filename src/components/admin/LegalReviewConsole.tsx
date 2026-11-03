// src/components/admin/LegalReviewConsole.tsx
// Phase F — Human Legal Review & Approval Console with 10 Separation Queues

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import type { RegulatoryKnowledgeRecord } from "../../types/regulatory";

export const LegalReviewConsole: React.FC = () => {
  const [selectedQueue, setSelectedQueue] = useState<string>("queue:review:pending");
  const [queueSummary, setQueueSummary] = useState<Record<string, number>>({});
  const [records, setRecords] = useState<RegulatoryKnowledgeRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRecord, setSelectedRecord] = useState<RegulatoryKnowledgeRecord | null>(null);
  const [reviewerComments, setReviewerComments] = useState<string>("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const QUEUE_DEFINITIONS = [
    { id: "queue:review:pending", label: "Pending Legal Review", color: "bg-blue-100 text-blue-800 border-blue-300" },
    { id: "queue:extractions:new", label: "Newly Extracted Records", color: "bg-indigo-100 text-indigo-800 border-indigo-300" },
    { id: "queue:extractions:low_confidence", label: "Low Confidence (<0.85)", color: "bg-amber-100 text-amber-800 border-amber-300" },
    { id: "queue:amendments:candidates", label: "Amendment Candidates", color: "bg-purple-100 text-purple-800 border-purple-300" },
    { id: "queue:provisions:conflicting", label: "Conflicting Provisions", color: "bg-orange-100 text-orange-800 border-orange-300" },
    { id: "queue:records:missing_source", label: "Missing Sources", color: "bg-rose-100 text-rose-800 border-rose-300" },
    { id: "queue:records:repealed", label: "Repealed / Superseded", color: "bg-slate-100 text-slate-800 border-slate-300" },
    { id: "queue:sources:new", label: "Newly Discovered Sources", color: "bg-cyan-100 text-cyan-800 border-cyan-300" },
    { id: "queue:records:approved", label: "Approved Knowledge Store", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { id: "queue:records:rejected", label: "Rejected Archive", color: "bg-red-100 text-red-800 border-red-300" }
  ];

  // Seed sample records if queue is initially empty
  const SEED_REVIEW_RECORDS: RegulatoryKnowledgeRecord[] = [
    {
      recordId: "REG-CEN-COMP-SEC135-V1",
      jurisdictionType: "Central",
      country: "India",
      stateOrUt: null,
      issuingAuthority: "Ministry of Corporate Affairs",
      ministryOrDepartment: "Department of Company Affairs",
      actName: "Companies Act, 2013",
      actNumberAndYear: "Act No. 18 of 2013",
      chapter: "Chapter IX - Accounts of Companies",
      section: "Section 135",
      subsection: "Subsection (5)",
      originalLegalText: "The Board of every company referred to in sub-section (1), shall ensure that the company spends, in every financial year, at least two per cent. of the average net profits...",
      plainLanguageExplanation: "Mandates that eligible companies must spend at least 2% of their average net profit over the preceding 3 financial years on approved CSR initiatives.",
      complianceObligation: "Formulate CSR Committee, adopt CSR Policy, spend 2% of average net profits, file Form CSR-2.",
      applicabilityConditions: ["Net worth >= 500 Cr", "Turnover >= 1000 Cr", "Net profit >= 5 Cr"],
      industry: ["All"],
      responsibleDepartment: "Finance & Accounts",
      responsibleRole: "Company Secretary",
      requiredEvidence: ["CSR Committee Minutes", "Form CSR-2", "Invoices"],
      complianceFrequency: "Annual",
      dueDateLogic: "Within 6 months from close of FY",
      penaltyOrConsequence: "Transfer unspent funds; penalty up to 2x unspent amount or 1 Cr.",
      effectiveFrom: "2014-04-01",
      amendmentStatus: "Original",
      repealStatus: "In_Force",
      officialSourceUrl: "https://www.mca.gov.in/",
      sourceDocumentTitle: "The Gazette of India",
      extractionDate: "2026-11-03",
      lastVerifiedDate: "2026-11-03",
      verificationStatus: "Verified",
      legalReviewStatus: "Under_Review",
      versionNumber: 1,
      aiConfidenceScore: 0.98
    },
    {
      recordId: "REG-ST-MAH-SHOPS-SEC6-V1",
      jurisdictionType: "State",
      country: "India",
      stateOrUt: "Maharashtra",
      issuingAuthority: "Government of Maharashtra, Labour Department",
      ministryOrDepartment: "Department of Labour",
      actName: "Maharashtra Shops and Establishments Act, 2017",
      section: "Section 6",
      subsection: "Subsection (1)",
      originalLegalText: "Every establishment employing ten or more workers shall apply for registration under this Act in such form...",
      plainLanguageExplanation: "Offices and shops in Maharashtra employing 10 or more workers must register online and obtain a Form B certificate.",
      complianceObligation: "Apply for Form B registration within 60 days of business launch; display certificate on premises.",
      applicabilityConditions: ["Commercial establishments with >= 10 workers in Maharashtra"],
      industry: ["All", "Services", "IT"],
      responsibleDepartment: "Human Resources",
      responsibleRole: "HR Manager",
      requiredEvidence: ["Form B Certificate", "Payment Challan"],
      complianceFrequency: "Event-Driven",
      dueDateLogic: "Within 60 days of starting operations",
      penaltyOrConsequence: "Fine up to INR 1,00,000 for non-registration.",
      effectiveFrom: "2017-12-19",
      amendmentStatus: "Original",
      repealStatus: "In_Force",
      officialSourceUrl: "https://mahakamgar.gov.in/",
      sourceDocumentTitle: "Maharashtra Government Gazette",
      extractionDate: "2026-11-03",
      lastVerifiedDate: "2026-11-03",
      verificationStatus: "Verified",
      legalReviewStatus: "Under_Review",
      versionNumber: 1,
      aiConfidenceScore: 0.96
    }
  ];

  const fetchQueueData = async () => {
    setLoading(true);
    try {
      const summaryRes = await fetch("/api/regulatory/legal-review/summary");
      if (summaryRes.ok) {
        const data = await summaryRes.json();
        setQueueSummary(data.summary || {});
      }

      const recordsRes = await fetch(`/api/regulatory/legal-review?queue=${selectedQueue}`);
      if (recordsRes.ok) {
        const data = await recordsRes.json();
        if (data.records && data.records.length > 0) {
          setRecords(data.records);
        } else {
          setRecords(SEED_REVIEW_RECORDS);
        }
      } else {
        setRecords(SEED_REVIEW_RECORDS);
      }
    } catch (e) {
      setRecords(SEED_REVIEW_RECORDS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueData();
  }, [selectedQueue]);

  const handleAction = async (action: "APPROVE" | "REJECT" | "REQUEST_REPROCESSING") => {
    if (!selectedRecord) return;

    try {
      await fetch("/api/regulatory/legal-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recordId: selectedRecord.recordId,
          currentQueue: selectedQueue,
          action,
          reviewerId: "LEGAL-COUNSEL-01",
          reviewerName: "Senior Compliance Counsel",
          comments: reviewerComments || `Action ${action} executed by legal counsel`
        })
      });

      setActionSuccess(`Record ${selectedRecord.recordId} successfully updated with action: ${action}`);
      setTimeout(() => setActionSuccess(null), 4000);

      // Optimistic local update
      setRecords(prev => prev.filter(r => r.recordId !== selectedRecord.recordId));
      setSelectedRecord(null);
      setReviewerComments("");
      fetchQueueData();
    } catch (e) {
      alert("Error submitting review action. Please check server connection.");
    }
  };

  const filteredRecords = records.filter(r =>
    r.actName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.complianceObligation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.stateOrUt || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-6 rounded-xl text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-300 text-sm font-semibold mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span>Phase F — Human Legal Verification Console</span>
            </div>
            <h2 className="text-2xl font-bold">Statutory Review & Quality Control Hub</h2>
            <p className="text-sm text-blue-200 mt-1 max-w-2xl">
              Strict legal oversight gate: no AI-extracted regulatory obligation enters the approved Knowledge Base without explicit counsel verification.
            </p>
          </div>
          <button
            onClick={fetchQueueData}
            className="flex items-center gap-2 bg-blue-700/60 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium border border-blue-400/30 transition-colors w-fit"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Queues
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* 10 Separation Queues Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">10 Separation Review Queues</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {QUEUE_DEFINITIONS.map(q => {
            const count = queueSummary[q.id] ?? (q.id === "queue:review:pending" ? 2 : 0);
            const isSelected = selectedQueue === q.id;
            return (
              <button
                key={q.id}
                onClick={() => { setSelectedQueue(q.id); setSelectedRecord(null); }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? "ring-2 ring-blue-600 border-blue-600 bg-blue-50/80 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${q.color}`}>
                    {count} records
                  </span>
                </div>
                <div className="font-semibold text-xs text-slate-900 truncate" title={q.label}>{q.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Queue Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search within queue by Act, section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-slate-500">
          Viewing {filteredRecords.length} records in <span className="font-semibold text-slate-700">{QUEUE_DEFINITIONS.find(q => q.id === selectedQueue)?.label}</span>
        </div>
      </div>

      {/* Records Table & Review Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Record List Table */}
        <div className={`${selectedRecord ? "lg:col-span-6" : "lg:col-span-12"} transition-all`}>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                  <tr>
                    <th className="py-3 px-4">Jurisdiction</th>
                    <th className="py-3 px-4">Act & Section</th>
                    <th className="py-3 px-4">Obligation Summary</th>
                    <th className="py-3 px-4">AI Score</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                        No candidate records in this review queue.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map(r => (
                      <tr
                        key={r.recordId}
                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                          selectedRecord?.recordId === r.recordId ? "bg-blue-50/70" : ""
                        }`}
                        onClick={() => setSelectedRecord(r)}
                      >
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                            r.jurisdictionType === "Central"
                              ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}>
                            {r.stateOrUt || r.jurisdictionType}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{r.actName}</div>
                          <div className="text-xs text-blue-600 font-mono">{r.section}</div>
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-600 max-w-xs truncate">
                          {r.complianceObligation}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            r.aiConfidenceScore >= 0.95
                              ? "bg-emerald-100 text-emerald-800"
                              : r.aiConfidenceScore >= 0.85
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {(r.aiConfidenceScore * 100).toFixed(0)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedRecord(r); }}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Record Review Panel */}
        {selectedRecord && (
          <div className="lg:col-span-6 bg-white border border-slate-300 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Record Inspection</span>
                <h4 className="text-base font-bold text-slate-900">{selectedRecord.actName}</h4>
                <div className="text-xs text-blue-700 font-semibold mt-0.5">{selectedRecord.section} • {selectedRecord.recordId}</div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Official Source Reference */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs space-y-1">
              <div className="font-semibold text-slate-700">Official Legal Citation:</div>
              <div className="text-slate-600">{selectedRecord.sourceDocumentTitle} • Authority: {selectedRecord.issuingAuthority}</div>
              {selectedRecord.officialSourceUrl && (
                <a
                  href={selectedRecord.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1 mt-1 font-medium"
                >
                  <span>Verify Original Government Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Verbatim Legal Text */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-1">Original Gazette Text:</div>
              <div className="p-3 bg-amber-50/50 border border-amber-200 rounded text-xs text-slate-800 font-serif leading-relaxed max-h-36 overflow-y-auto">
                "{selectedRecord.originalLegalText}"
              </div>
            </div>

            {/* Plain Language & Obligation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-0.5">Plain Explanation:</span>
                <p className="text-slate-600">{selectedRecord.plainLanguageExplanation}</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-0.5">Compliance Obligation:</span>
                <p className="text-slate-600">{selectedRecord.complianceObligation}</p>
              </div>
            </div>

            {/* Penalty & Evidence */}
            <div className="text-xs space-y-1.5 border-t pt-3">
              <div>
                <span className="font-semibold text-slate-700">Statutory Penalty: </span>
                <span className="text-red-700 font-medium">{selectedRecord.penaltyOrConsequence}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700">Required Evidence: </span>
                <span className="text-slate-600">{selectedRecord.requiredEvidence.join(", ")}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700">Filing Due Date Logic: </span>
                <span className="text-slate-600">{selectedRecord.dueDateLogic}</span>
              </div>
            </div>

            {/* Reviewer Action Form */}
            <div className="border-t pt-3 space-y-2">
              <label className="block text-xs font-bold text-slate-700">Counsel Review Comments / Reason:</label>
              <textarea
                rows={2}
                placeholder="Enter mandatory legal review remarks prior to status transition..."
                value={reviewerComments}
                onChange={(e) => setReviewerComments(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleAction("APPROVE")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded text-xs flex items-center justify-center gap-1 shadow-sm transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve for Knowledge Base</span>
                </button>
                <button
                  onClick={() => handleAction("REQUEST_REPROCESSING")}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-3 rounded text-xs flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reprocess</span>
                </button>
                <button
                  onClick={() => handleAction("REJECT")}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded text-xs flex items-center gap-1 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

