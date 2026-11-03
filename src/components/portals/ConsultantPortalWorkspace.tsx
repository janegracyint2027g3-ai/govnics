// src/components/portals/ConsultantPortalWorkspace.tsx
// Phase 8.3 — Dedicated Consultant & Legal Counsel Workspace
// Features: Client assignments, audit duties, legal verification queues, and timesheets.

import React, { useState } from "react";
import {
  FileCheck,
  Clock,
  Building,
  Scale,
  Award
} from "lucide-react";

export const ConsultantPortalWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "clients" | "audits" | "verifications" | "timesheets">("overview");
  const [timesheetHours, setTimesheetHours] = useState("");
  const [timesheetDesc, setTimesheetDesc] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [timesheets, setTimesheets] = useState([
    { date: "2026-10-25", client: "Acme Industrial Technologies Ltd", hours: 4.5, description: "Review of draft POSH Internal Committee annual return." },
    { date: "2026-10-28", client: "Acme Industrial Technologies Ltd", hours: 6.0, description: "Attendance and legal sign-off on ROC Form AOC-4." }
  ]);

  const handleAddTimesheet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timesheetHours || !timesheetDesc) return;
    setTimesheets(prev => [
      {
        date: new Date().toISOString().split("T")[0],
        client: "Acme Industrial Technologies Ltd",
        hours: parseFloat(timesheetHours),
        description: timesheetDesc
      },
      ...prev
    ]);
    setTimesheetHours("");
    setTimesheetDesc("");
    setSuccessMsg("Timesheet entry logged.");
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs text-left">
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              Senior Consultant Workspace
            </span>
            <span className="text-xs text-slate-400">Bar Council No: D/1428/2008</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
            Adv. Rajesh Kumar · Regulatory Advisory Portal
          </h2>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50/50 px-4 overflow-x-auto">
        {[
          { id: "overview", label: "Overview", icon: Award },
          { id: "clients", label: "Assigned Clients", icon: Building },
          { id: "audits", label: "Audit Assignments", icon: FileCheck },
          { id: "verifications", label: "Legal Verifications", icon: Scale },
          { id: "timesheets", label: "Timesheets & Billing", icon: Clock }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Client Retainers</span>
                <div className="text-2xl font-black text-slate-900 mt-1">1 Enterprise</div>
                <span className="text-[11px] text-slate-500">Acme Industrial Technologies Ltd</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assigned Audits</span>
                <div className="text-2xl font-black text-blue-600 mt-1">2 Statutory Audits</div>
                <span className="text-[11px] text-slate-500">Factory Safety & DPDP</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Logged Hours (Month)</span>
                <div className="text-2xl font-black text-emerald-600 mt-1">104.5 hrs</div>
                <span className="text-[11px] text-slate-500">₹6,79,250 unbilled value</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "clients" && (
          <div className="border border-slate-200 rounded-xl p-4 bg-white flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Acme Industrial Technologies Ltd</h4>
              <p className="text-xs text-slate-500">Industry: Manufacturing &amp; Industrial · Location: Pune, MH</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Active Retainer
            </span>
          </div>
        )}

        {activeTab === "audits" && (
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl p-4 bg-white flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">AUD-2026-001: Q4 Statutory Labour &amp; Factory Safety Audit</h4>
                <p className="text-xs text-slate-500">Role: Lead Auditor · Step: 16. Management Review</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">Under Review</span>
            </div>
          </div>
        )}

        {activeTab === "verifications" && (
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl p-4 bg-white flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">PRV-DPDP-SEC006: Digital Personal Data Protection Act S.6</h4>
                <p className="text-xs text-slate-500">Status: Verified Primary Source · Signed off by Adv. Rajesh Kumar</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span>
            </div>
          </div>
        )}

        {activeTab === "timesheets" && (
          <div className="space-y-4">
            <form onSubmit={handleAddTimesheet} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Log Advisory Hours</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="number"
                  step="0.5"
                  placeholder="Hours (e.g. 3.5)"
                  value={timesheetHours}
                  onChange={e => setTimesheetHours(e.target.value)}
                  className="p-2 text-xs border border-slate-200 rounded-lg bg-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Description of legal advisory work"
                  value={timesheetDesc}
                  onChange={e => setTimesheetDesc(e.target.value)}
                  className="p-2 text-xs border border-slate-200 rounded-lg bg-white md:col-span-2"
                  required
                />
              </div>
              <button type="submit" className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500">
                Submit Timesheet
              </button>
              {successMsg && <span className="text-xs text-emerald-600 font-bold ml-3">{successMsg}</span>}
            </form>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Hours</th>
                    <th className="p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {timesheets.map((ts, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-medium text-slate-700">{ts.date}</td>
                      <td className="p-3 text-slate-900 font-bold">{ts.client}</td>
                      <td className="p-3 font-mono font-bold text-blue-600">{ts.hours} hrs</td>
                      <td className="p-3 text-slate-600">{ts.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
