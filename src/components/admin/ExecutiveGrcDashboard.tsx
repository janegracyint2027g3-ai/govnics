// src/components/admin/ExecutiveGrcDashboard.tsx
// Phase 4 — GOVENICS Executive GRC Intelligence Dashboard
// Features: Executive Overview, Compliance Posture, Risk 5x5 Heatmap, 20 Agents, Gap Assessment, Actions & Reports

import React, { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Activity,
  Search,
  Sparkles,
  Download,
  BarChart3,
  Bot
} from "lucide-react";
import { FRONTEND_AGENT_PROFILES, getSpecialistAgentList, getCrossFunctionalAgentList } from "@/data/agent-profiles";

interface RiskItem {
  riskId: string;
  riskTitle: string;
  category: string;
  likelihood: number;
  impact: number;
  score: number;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: string;
}

const SEED_DASH_RISKS: RiskItem[] = [
  { riskId: "RSK-001", riskTitle: "DPDP Act Breach Notification Sla", category: "Data Privacy", likelihood: 4, impact: 5, score: 20, severity: "Critical", status: "In Progress" },
  { riskId: "RSK-002", riskTitle: "AOC-4 & MGT-7 Delayed Filing Fees", category: "Regulatory", likelihood: 2, impact: 4, score: 8, severity: "Medium", status: "Mitigated" },
  { riskId: "RSK-003", riskTitle: "RCM GST Cash Discharge Inward Supplies", category: "Financial", likelihood: 3, impact: 4, score: 12, severity: "High", status: "In Progress" },
  { riskId: "RSK-004", riskTitle: "Safety Officer Appointment 1,000+ Workers", category: "Environmental", likelihood: 3, impact: 5, score: 15, severity: "Critical", status: "Open" }
];

export const ExecutiveGrcDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "agents" | "risk" | "actions" | "reports">("overview");
  const [selectedAgentDomain, setSelectedAgentDomain] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const specialists = getSpecialistAgentList();
  const crossFunctionals = getCrossFunctionalAgentList();

  const filteredAgents = FRONTEND_AGENT_PROFILES.filter(a => {
    if (selectedAgentDomain === "Specialists") return specialists.some(s => s.agentId === a.agentId);
    if (selectedAgentDomain === "Cross-Functional") return crossFunctionals.some(c => c.agentId === a.agentId);
    return true;
  }).filter(a =>
    a.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.roleTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Phase 4 Operational System
            </span>
            <span className="text-xs text-slate-400">Enterprise Workspace: Acme Industrial Ltd</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Executive GRC Intelligence Dashboard</h2>
          <p className="text-slate-300 text-sm mt-1">
            Unified multi-agent governance, compliance posture, risk heatmap & statutory oversight.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Exporting Executive GRC Summary Report (PDF)...")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export GRC Report
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/75 px-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-3.5 px-4 text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === "overview"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Activity className="w-4 h-4" />
          Executive Overview
        </button>

        <button
          onClick={() => setActiveTab("agents")}
          className={`py-3.5 px-4 text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === "agents"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bot className="w-4 h-4" />
          20 AI Agents Ecosystem
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-bold">20</span>
        </button>

        <button
          onClick={() => setActiveTab("risk")}
          className={`py-3.5 px-4 text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === "risk"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          5x5 Risk Heatmap
        </button>

        <button
          onClick={() => setActiveTab("actions")}
          className={`py-3.5 px-4 text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === "actions"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          Remediation Actions
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`py-3.5 px-4 text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === "reports"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          Audit & Board Reports
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Compliance Posture</span>
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">86.4%</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">↑ +4.2% from prior audit cycle</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active AI Agents</span>
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">20 / 20</div>
                <div className="text-xs text-slate-600 mt-1">12 Specialists · 8 Cross-Functional</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Critical Risk Items</span>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">2</div>
                <div className="text-xs text-red-600 font-medium mt-1">Under active mitigation plan</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Pre-Audit Index</span>
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">91.0%</div>
                <div className="text-xs text-slate-600 mt-1">Verified primary evidence attached</div>
              </div>
            </div>

            {/* Regulatory Updates & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Latest Regulatory Change Notifications
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-xs">
                    <div className="flex justify-between font-semibold text-amber-900 mb-1">
                      <span>MeitY — DPDP Draft Rules Notification</span>
                      <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-800 text-[10px]">Under Review</span>
                    </div>
                    <p className="text-amber-800/80">Sets inquiry protocols and breach report guidelines. Effective June 2026.</p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs">
                    <div className="flex justify-between font-semibold text-emerald-900 mb-1">
                      <span>SEBI — BRSR Core Assurance Scope Expansion</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 text-[10px]">Verified & Synced</span>
                    </div>
                    <p className="text-emerald-800/80">Top 500 listed entities mandate reasonable assurance. Effective April 2026.</p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  Governance & Compliance Safeguards
                </h3>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Zero-Hallucination Gate:</strong> Only verified primary knowledge collections feed agent responses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Prompt Injection Disarmed:</strong> Ingested regulatory drafts pass through defensive instruction filters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Tenant Isolation:</strong> Server-side role boundaries partition organization documents and audit logs.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 20 AGENTS */}
        {activeTab === "agents" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex gap-2">
                {["All", "Specialists", "Cross-Functional"].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedAgentDomain(d)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      selectedAgentDomain === d
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter agents by name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.map(agent => (
                <div key={agent.agentId} className="border border-slate-200 rounded-xl p-4 bg-white hover:border-blue-300 transition-colors shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{agent.agentId}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{agent.agentName}</h4>
                      <p className="text-xs text-blue-600 font-medium">{agent.roleTitle}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{agent.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Threshold: <strong>{Math.round(agent.minConfidenceThreshold * 100)}%</strong></span>
                    <span>Version: <strong>{agent.version || "v4.0"}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 5x5 RISK HEATMAP */}
        {activeTab === "risk" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Heatmap Matrix Display */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white lg:col-span-2">
                <h3 className="font-semibold text-slate-900 text-sm mb-4">Enterprise 5x5 Inherent Risk Heatmap</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-center text-xs">
                    <thead>
                      <tr>
                        <th className="p-2 text-slate-400 font-normal">Impact \ Likelihood</th>
                        <th className="p-2 font-bold text-slate-600">1 (Rare)</th>
                        <th className="p-2 font-bold text-slate-600">2 (Unlikely)</th>
                        <th className="p-2 font-bold text-slate-600">3 (Possible)</th>
                        <th className="p-2 font-bold text-slate-600">4 (Likely)</th>
                        <th className="p-2 font-bold text-slate-600">5 (Almost Certain)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 font-bold text-slate-700 text-left">5 (Catastrophic)</td>
                        <td className="p-3 bg-amber-100 text-amber-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-orange-200 text-orange-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-red-300 text-red-950 font-bold border border-white">1</td>
                        <td className="p-3 bg-red-500 text-white font-bold border border-white">1</td>
                        <td className="p-3 bg-red-600 text-white font-bold border border-white">0</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-700 text-left">4 (Major)</td>
                        <td className="p-3 bg-yellow-100 text-yellow-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-amber-200 text-amber-900 font-semibold border border-white">1</td>
                        <td className="p-3 bg-orange-300 text-orange-950 font-bold border border-white">1</td>
                        <td className="p-3 bg-red-400 text-white font-bold border border-white">0</td>
                        <td className="p-3 bg-red-500 text-white font-bold border border-white">0</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-700 text-left">3 (Moderate)</td>
                        <td className="p-3 bg-emerald-100 text-emerald-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-yellow-100 text-yellow-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-amber-200 text-amber-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-orange-300 text-orange-950 font-semibold border border-white">0</td>
                        <td className="p-3 bg-red-400 text-white font-semibold border border-white">0</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-700 text-left">2 (Minor)</td>
                        <td className="p-3 bg-emerald-50 text-emerald-800 font-semibold border border-white">0</td>
                        <td className="p-3 bg-emerald-100 text-emerald-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-yellow-100 text-yellow-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-amber-200 text-amber-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-orange-300 text-orange-950 font-semibold border border-white">0</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-700 text-left">1 (Insignificant)</td>
                        <td className="p-3 bg-emerald-50 text-emerald-800 font-semibold border border-white">0</td>
                        <td className="p-3 bg-emerald-50 text-emerald-800 font-semibold border border-white">0</td>
                        <td className="p-3 bg-emerald-100 text-emerald-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-yellow-100 text-yellow-900 font-semibold border border-white">0</td>
                        <td className="p-3 bg-amber-200 text-amber-900 font-semibold border border-white">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Risk Summary */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h3 className="font-semibold text-slate-900 text-sm mb-3">Risk Distribution Summary</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2 rounded bg-red-50 text-red-900 font-medium">
                    <span>Critical Risks (Score 16–25)</span>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-orange-50 text-orange-900 font-medium">
                    <span>High Risks (Score 10–15)</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-amber-50 text-amber-900 font-medium">
                    <span>Medium Risks (Score 5–9)</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-emerald-50 text-emerald-900 font-medium">
                    <span>Low Risks (Score 1–4)</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Items Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Risk ID</th>
                    <th className="p-3">Risk Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">L x I Score</th>
                    <th className="p-3">Severity</th>
                    <th className="p-3">Current Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SEED_DASH_RISKS.map(r => (
                    <tr key={r.riskId} className="hover:bg-slate-50/50">
                      <td className="p-3 font-mono font-bold text-slate-700">{r.riskId}</td>
                      <td className="p-3 font-medium text-slate-900">{r.riskTitle}</td>
                      <td className="p-3 text-slate-600">{r.category}</td>
                      <td className="p-3 font-bold">{r.likelihood} x {r.impact} = {r.score}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.severity === "Critical" ? "bg-red-100 text-red-800" :
                          r.severity === "High" ? "bg-orange-100 text-orange-800" :
                          "bg-amber-100 text-amber-800"
                        }`}>
                          {r.severity}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REMEDIATION ACTIONS */}
        {activeTab === "actions" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-900 text-sm">Active Corrective Remediation Items</h3>
              <button
                onClick={() => alert("Creating task action...")}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500"
              >
                + New Action Item
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Action ID</th>
                    <th className="p-3">Identified Gap</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Assigned User</th>
                    <th className="p-3">Target Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-slate-700">ACT-2026-0001</td>
                    <td className="p-3 font-medium text-slate-900">Missing monthly ECR contribution challan for contractors</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800">High</span></td>
                    <td className="p-3 text-slate-600">Human Resources</td>
                    <td className="p-3 text-slate-600">compliance.officer@govenics.com</td>
                    <td className="p-3 text-slate-600">2026-11-20</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">In Progress</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-slate-700">ACT-2026-0002</td>
                    <td className="p-3 font-medium text-slate-900">Absence of 6-hour DPDP / CERT-In breach escalation protocol</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">Critical</span></td>
                    <td className="p-3 text-slate-600">Information Security (IT/SOC)</td>
                    <td className="p-3 text-slate-600">ciso@govenics.com</td>
                    <td className="p-3 text-slate-600">2026-11-15</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Pending Review</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: REPORTS & EXPORTS */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm">Downloadable Compliance & Board Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-white flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Quarterly Executive GRC Briefing (Q3 FY 2026)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Comprehensive audit overview for Board of Directors & Audit Committee.</p>
                </div>
                <button
                  onClick={() => alert("Downloading Executive GRC Report...")}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  PDF
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-white flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Statutory Gap & Deficiency Remediation Matrix</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Itemized gap analysis across 42 statutory obligations with target dates.</p>
                </div>
                <button
                  onClick={() => alert("Downloading Remediation Matrix...")}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  XLSX
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
