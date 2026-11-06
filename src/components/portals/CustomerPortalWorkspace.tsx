// src/components/portals/CustomerPortalWorkspace.tsx
// Phase 6, 7 & 8 — GOVENICS Unified Customer Workspace
// Features: Compliance Register, Calendar, Audits, CAPA, Evidence, Integrations, Subscription Sandbox, Team RBAC

import React, { useState } from "react";
import {
  ShieldCheck,
  Calendar,
  Layers,
  FileCheck,
  RotateCcw,
  Upload,
  Link2,
  CreditCard,
  Users,
  Search,
  Download,
  PlusCircle,
  ShieldAlert
} from "lucide-react";
import { SecurityControllerConsole } from "@/components/security/SecurityControllerConsole";

export const CustomerPortalWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "register" | "calendar" | "audits" | "capa" | "evidence" | "integrations" | "billing" | "team" | "security"
  >("overview");

  const [registerFilter, setRegisterFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [sandboxMessage, setSandboxMessage] = useState<string | null>(null);

  // Seed compliance obligations
  const obligations = [
    {
      id: "OBL-2026-001",
      title: "Mandatory Certified Safety Officer Appointment",
      act: "Factories Act 1948 & MH Factories Rules 1963",
      section: "Section 40-B / Rule 68",
      department: "Health, Safety & Environment (HSE)",
      dueDate: "2026-12-31",
      status: "Compliant",
      risk: "Critical",
      owner: "ehs.lead@acme-ind.com"
    },
    {
      id: "OBL-2026-002",
      title: "DPDP Act Consent Management & Breach Escalation Drill",
      act: "Digital Personal Data Protection Act, 2023",
      section: "Section 6 & 8(6)",
      department: "Information Security (IT/SOC)",
      dueDate: "2026-11-30",
      status: "In Progress",
      risk: "Critical",
      owner: "ciso@acme-ind.com"
    },
    {
      id: "OBL-2026-003",
      title: "Annual Financial Statement ROC Filing (Form AOC-4)",
      act: "The Companies Act, 2013",
      section: "Section 137",
      department: "Legal & Secretarial",
      dueDate: "2026-10-30",
      status: "Compliant",
      risk: "High",
      owner: "compliance@acme-ind.com"
    },
    {
      id: "OBL-2026-004",
      title: "Reverse Charge Mechanism (RCM) GST Cash Settlement",
      act: "Central Goods and Services Tax Act, 2017",
      section: "Section 9(3)",
      department: "Finance & Accounts",
      dueDate: "2026-11-20",
      status: "Compliant",
      risk: "High",
      owner: "tax.lead@acme-ind.com"
    },
    {
      id: "OBL-2026-005",
      title: "Fixed-Term Worker Gratuity Pro-Rata Disbursement",
      act: "Code on Social Security, 2020",
      section: "Section 53 Proviso",
      department: "Human Resources",
      dueDate: "2026-11-25",
      status: "In Progress",
      risk: "Medium",
      owner: "hr.ops@acme-ind.com"
    }
  ];

  // Seed calendar events
  const calendarEvents = [
    { title: "Monthly GST RCM Cash Settlement (GSTR-3B)", date: "2026-11-20", type: "Tax Filing", status: "Upcoming", dept: "Finance" },
    { title: "Fixed-Term Gratuity Milestone Review", date: "2026-11-25", type: "Labour Mandate", status: "Upcoming", dept: "HR" },
    { title: "DPDP Act CMP Consent Verification Drill", date: "2026-11-30", type: "Data Privacy", status: "Critical", dept: "IT/SOC" },
    { title: "Maharashtra Factory Licence Renewal (Form 4)", date: "2026-12-15", type: "Licence Expiry", status: "Licence", dept: "HSE" }
  ];

  // Seed audits
  const audits = [
    {
      id: "AUD-2026-001",
      title: "Q4 Statutory Labour & Factory Safety Audit",
      type: "Factory compliance audit",
      scope: "Pune Plant workforce registers & DISH approvals",
      period: "FY 2026-27 Q3-Q4",
      auditor: "Adv. R. Deshmukh (Lead Auditor)",
      step: "16. Management Review",
      findingsCount: 2,
      risk: "Medium"
    },
    {
      id: "AUD-2026-002",
      title: "DPDP Act Data Fiduciary Information Security Audit",
      type: "Cybersecurity audit",
      scope: "ERP & HRMS endpoints",
      period: "FY 2026-27 Annual",
      auditor: "V. Menon (CERT-In Empaneled)",
      step: "18. Final Report Published",
      findingsCount: 0,
      risk: "Low"
    }
  ];

  // Seed CAPA
  const capas = [
    {
      id: "CAPA-2026-001",
      finding: "Contractor Manpower PF ECR Reconciliation Lag",
      rootCause: "5-Whys: Invoicing was not gated on digital PF scroll upload.",
      action: "Mandate Form 12A PF challan before invoice release.",
      owner: "hr.ops@acme-ind.com",
      status: "Under Execution",
      dueDate: "2026-11-20"
    },
    {
      id: "CAPA-2026-002",
      finding: "ETP Continuous Sensor Calibration Drift",
      rootCause: "Fishbone: Shift turnover led to manual logging omissions.",
      action: "Linked sensors to CPCB OCEMS with automated drift alert.",
      owner: "ehs.lead@acme-ind.com",
      status: "Verification Pending",
      dueDate: "2026-11-10"
    }
  ];

  // Seed integrations
  const integrations = [
    { name: "Google Workspace", category: "Productivity", status: "Connected", sync: "Daily at 02:00 UTC", features: "Drive Evidence Sync, Sheets Export" },
    { name: "Microsoft 365", category: "Productivity", status: "Connected", sync: "Daily at 04:00 UTC", features: "SharePoint Vault, Outlook Reminders" },
    { name: "Atlassian Jira", category: "Project Management", status: "Connected", sync: "Hourly", features: "Audit Findings & CAPA Sync" },
    { name: "Slack", category: "Communication", status: "Connected", sync: "Real-time", features: "Critical Risk & Escalation Alerts" },
    { name: "SAP S/4HANA", category: "ERP and HRMS", status: "Configuration Required", sync: "Scheduled", features: "Vendor Tax Master Validation" }
  ];

  // Seed team members
  const teamMembers = [
    { name: "Rajesh V. Patil", email: "admin@acme-ind.com", role: "Organization Administrator", dept: "Executive", status: "Active" },
    { name: "Sunil Deshpande", email: "compliance@acme-ind.com", role: "Compliance Officer", dept: "Legal & Secretarial", status: "Active" },
    { name: "Vikram Sen", email: "ciso@acme-ind.com", role: "Department Manager", dept: "IT/SOC", status: "Active" },
    { name: "Meera Kulkarni", email: "ehs.lead@acme-ind.com", role: "Department Manager", dept: "Health & Safety (HSE)", status: "Active" },
    { name: "Adv. Rajesh Kumar", email: "rajesh.kumar@govenics-advisory.com", role: "Consultant", dept: "External Legal Counsel", status: "Verified" }
  ];

  const handleSimulatePayment = () => {
    setSandboxMessage(`Sandbox order created for ${selectedPlan} tier! Invoice INV-2026-${Date.now().toString().slice(-4)} generated in sandbox mode.`);
    setTimeout(() => {
      setIsSandboxModalOpen(false);
      setSandboxMessage(null);
    }, 2000);
  };

  const filteredObligations = obligations.filter(o => {
    if (registerFilter !== "All" && o.status !== registerFilter) return false;
    if (searchQuery && !o.title.toLowerCase().includes(searchQuery.toLowerCase()) && !o.act.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs text-left">
      {/* Workspace Navigation Bar */}
      <div className="bg-slate-900 p-4 sm:p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Enterprise Customer Workspace
            </span>
            <span className="text-xs text-slate-400">Tenant: Acme Industrial Technologies Ltd</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
            Comprehensive GRC Operations &amp; Intelligence Hub
          </h2>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 bg-slate-50/50 px-4 overflow-x-auto">
        {[
          { id: "overview", label: "Overview", icon: ShieldCheck },
          { id: "register", label: "Compliance Register", icon: Layers },
          { id: "calendar", label: "Calendar & Deadlines", icon: Calendar },
          { id: "audits", label: "Audits & Findings", icon: FileCheck },
          { id: "capa", label: "CAPA Management", icon: RotateCcw },
          { id: "evidence", label: "Evidence Vault", icon: Upload },
          { id: "integrations", label: "Integrations & APIs", icon: Link2 },
          { id: "billing", label: "Subscription & Billing", icon: CreditCard },
          { id: "team", label: "Team & RBAC", icon: Users },
          { id: "security", label: "Security Controller", icon: ShieldAlert }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Compliance Index</span>
                <div className="text-2xl font-black text-emerald-600 mt-1">94.8%</div>
                <span className="text-[11px] text-slate-500">5 of 5 statutory obligations active</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Audits</span>
                <div className="text-2xl font-black text-blue-600 mt-1">2 Audits</div>
                <span className="text-[11px] text-slate-500">1 Review, 1 Published</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CAPA Actions</span>
                <div className="text-2xl font-black text-amber-600 mt-1">2 Actions</div>
                <span className="text-[11px] text-slate-500">Under execution with evidence</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Connected Connectors</span>
                <div className="text-2xl font-black text-indigo-600 mt-1">4 Active</div>
                <span className="text-[11px] text-slate-500">Google, M365, Jira, Slack</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-white">
              <h3 className="font-bold text-slate-900 text-sm">Regulatory Health &amp; Trust Gate Status</h3>
              <p className="text-xs text-slate-600 mt-1">
                All applicable obligations are cryptographically mapped to verified primary source records in the GOVENICS Regulatory Intelligence Engine.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: COMPLIANCE REGISTER */}
        {activeTab === "register" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex gap-2">
                {["All", "Compliant", "In Progress"].map(st => (
                  <button
                    key={st}
                    onClick={() => setRegisterFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      registerFilter === st ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search obligations or Acts..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Obligation ID</th>
                    <th className="p-3">Title &amp; Act Reference</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Risk</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredObligations.map(ob => (
                    <tr key={ob.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-mono font-bold text-slate-500">{ob.id}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{ob.title}</div>
                        <div className="text-[11px] text-slate-500">{ob.act} · {ob.section}</div>
                      </td>
                      <td className="p-3 text-slate-600">{ob.department}</td>
                      <td className="p-3 font-medium text-slate-800">{ob.dueDate}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ob.risk === "Critical" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {ob.risk}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ob.status === "Compliant" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {ob.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CALENDAR */}
        {activeTab === "calendar" && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Upcoming Statutory Deadlines &amp; Filings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calendarEvents.map((evt, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{evt.type}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{evt.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Department: {evt.dept} · Due: {evt.date}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {evt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AUDITS */}
        {activeTab === "audits" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Active &amp; Completed Audit Programmes</h3>
              <button
                onClick={() => alert("Audit creation modal launched.")}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-blue-500"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Audit</span>
              </button>
            </div>

            <div className="space-y-3">
              {audits.map(aud => (
                <div key={aud.id} className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">{aud.id}</span>
                    <h4 className="font-bold text-slate-900 text-sm">{aud.title}</h4>
                    <p className="text-xs text-slate-500">{aud.scope} · Lead: {aud.auditor}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {aud.step}
                    </span>
                    <button
                      onClick={() => alert(`Downloading audit report for ${aud.id}...`)}
                      className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                      title="Download Audit Report"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CAPA */}
        {activeTab === "capa" && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Corrective &amp; Preventive Actions (Root-Cause 5-Whys)</h3>
            <div className="space-y-3">
              {capas.map(c => (
                <div key={c.id} className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{c.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{c.finding}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {c.rootCause}
                  </p>
                  <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                    <span>Action: {c.action}</span>
                    <span>Owner: {c.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: EVIDENCE */}
        {activeTab === "evidence" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Evidence Document Vault (KRM Integrated)</h3>
              <button
                onClick={() => alert("Upload evidence dialog launched.")}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-blue-500"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Submit Evidence</span>
              </button>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-xs text-slate-600">
              Evidence files uploaded here are hashed with SHA-256 for cryptographic immutability and mapped directly to statutory compliance requirements.
            </div>
          </div>
        )}

        {/* TAB 7: INTEGRATIONS */}
        {activeTab === "integrations" && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Enterprise Integrations &amp; Connectors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integ, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{integ.category}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{integ.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{integ.features}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Sync: {integ.sync}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    integ.status === "Connected" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {integ.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: BILLING */}
        {activeTab === "billing" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Current Subscription &amp; Billing Sandbox</h3>
                <p className="text-xs text-slate-500">Plan: Enterprise Tier · Billed Annually</p>
              </div>
              <button
                onClick={() => setIsSandboxModalOpen(true)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Test Sandbox Checkout</span>
              </button>
            </div>

            {sandboxMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800">
                {sandboxMessage}
              </div>
            )}

            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-2">Past Invoices</h4>
              <div className="flex justify-between items-center text-xs py-2 border-b border-slate-100">
                <span className="font-mono font-bold text-slate-700">INV-2026-0042</span>
                <span className="text-slate-600">Enterprise Plan Annual (₹35,39,988.20 incl GST)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Paid</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: TEAM */}
        {activeTab === "team" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Organization Users &amp; 11-Role Access Control</h3>
              <button
                onClick={() => alert("Invite user dialog opened.")}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-blue-500"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Invite Member</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Assigned Role</th>
                    <th className="p-3">Department</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teamMembers.map((tm, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-900">{tm.name}</td>
                      <td className="p-3 text-slate-600">{tm.email}</td>
                      <td className="p-3 font-medium text-blue-700">{tm.role}</td>
                      <td className="p-3 text-slate-600">{tm.dept}</td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {tm.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 10: SECURITY CONTROLLER */}
        {activeTab === "security" && (
          <SecurityControllerConsole />
        )}
      </div>

      {/* Sandbox Checkout Modal */}
      {isSandboxModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Simulate Sandbox Checkout</h3>
            <p className="text-xs text-slate-500">
              Test subscription creation and sandbox payment gateway simulation without any actual credit card charge.
            </p>

            <div className="space-y-2">
              {["Starter", "Professional", "Business", "Enterprise"].map(plan => (
                <label key={plan} className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 text-xs font-medium cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="plan"
                    checked={selectedPlan === plan}
                    onChange={() => setSelectedPlan(plan)}
                  />
                  <span>{plan} Tier</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsSandboxModalOpen(false)}
                className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulatePayment}
                className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500"
              >
                Simulate Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
