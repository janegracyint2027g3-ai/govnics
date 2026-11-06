// src/components/security/AppTokenManagement.tsx
// GOVENICS GRC — Enterprise Application Token Management & Token Expiry Console
// Full lifecycle: Generate, Monitor Expiry, Verify, Rotate, Revoke, and Sync with Google Sheets.

import React, { useState, useEffect, useMemo } from "react";
import {
  KeyRound, ShieldCheck, ShieldAlert, Clock, AlertTriangle,
  CheckCircle2, Copy, Check, RotateCcw, Trash2, ExternalLink,
  FileSpreadsheet, Plus, Search, RefreshCw, X, Lock,
  ArrowUpRight
} from "lucide-react";

export interface AppToken {
  tokenId: string;
  name: string;
  clientOwner: string;
  environment: "Production" | "Staging" | "Development";
  scopes: string[];
  keyPrefix: string;
  createdAt: string;
  expiresAt: string;
  durationDays: number;
  daysRemaining: number;
  status: "Active" | "Expiring Soon" | "Expired" | "Revoked";
  lastUsedAt: string | null;
  revokedAt: string | null;
  revokedReason: string | null;
  ipAddress?: string;
  syncedToSheetAt: string | null;
  sheetSyncStatus: "Synced" | "Pending" | "Error";
}

export interface TokenStats {
  total: number;
  active: number;
  expiringSoon: number;
  expired: number;
  revoked: number;
  syncedToSheet: number;
  sheetUrl?: string;
}

const AVAILABLE_SCOPES = [
  { id: "compliance:read", label: "compliance:read", desc: "Read compliance obligations, registers, and tasks" },
  { id: "compliance:write", label: "compliance:write", desc: "Submit and modify compliance entries & evidence" },
  { id: "regulatory:read", label: "regulatory:read", desc: "Access statutory acts, rules, and gazette notifications" },
  { id: "elibrary:read", label: "elibrary:read", desc: "Read E-Library resources, articles, and download E-Books" },
  { id: "audits:read", label: "audits:read", desc: "View internal & external audit schedules and findings" },
  { id: "audits:write", label: "audits:write", desc: "Log audit findings, CAPA plans, and sign-offs" },
  { id: "webhooks:receive", label: "webhooks:receive", desc: "Receive automated outbound compliance alert webhooks" }
];

const DURATION_PRESETS = [
  { days: 7, label: "7 Days", desc: "Short-term evaluation or test" },
  { days: 30, label: "30 Days", desc: "Standard monthly rotation" },
  { days: 60, label: "60 Days", desc: "Bi-monthly lifecycle" },
  { days: 90, label: "90 Days", desc: "Quarterly Enterprise Cadence (Recommended)" },
  { days: 180, label: "180 Days", desc: "Half-yearly service cycle" },
  { days: 365, label: "365 Days", desc: "Annual production integration" },
  { days: 0, label: "Custom Date", desc: "Choose specific expiration date" }
];

export const AppTokenManagement: React.FC = () => {
  const [tokens, setTokens] = useState<AppToken[]>([]);
  const [stats, setStats] = useState<TokenStats>({
    total: 0,
    active: 0,
    expiringSoon: 0,
    expired: 0,
    revoked: 0,
    syncedToSheet: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [envFilter, setEnvFilter] = useState<string>("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Modals state
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);
  const [showSecretModal, setShowSecretModal] = useState<{ rawToken: string; record: AppToken } | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [showRevokeModal, setShowRevokeModal] = useState<AppToken | null>(null);

  // Form states for Generate
  const [appName, setAppName] = useState<string>("");
  const [clientOwner, setClientOwner] = useState<string>("admin@govenics.com");
  const [environment, setEnvironment] = useState<"Production" | "Staging" | "Development">("Production");
  const [durationDays, setDurationDays] = useState<number>(90);
  const [customExpiryDate, setCustomExpiryDate] = useState<string>("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "compliance:read",
    "regulatory:read",
    "elibrary:read"
  ]);

  // Form states for Verify
  const [verifyTokenInput, setVerifyTokenInput] = useState<string>("");
  const [verifyResult, setVerifyResult] = useState<any | null>(null);
  const [verifying, setVerifying] = useState<boolean>(false);

  // Form state for Revoke
  const [revokeReason, setRevokeReason] = useState<string>("Deprecated or replaced by newer integration");
  const [revoking, setRevoking] = useState<boolean>(false);

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // ─── Fetch Tokens from API ─────────────────────────────────────────────────
  const fetchTokens = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tokens/list");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTokens(data.tokens || []);
      if (data.stats) setStats(data.stats);
    } catch (err: any) {
      console.warn("[AppTokenManagement] Error fetching tokens:", err.message);
      showToast("Failed to fetch tokens from API", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  // ─── Manual Sync to Google Sheet ───────────────────────────────────────────
  const handleSyncGoogleSheet = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/tokens/sync-sheet", { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      showToast(
        data.message || `Successfully synced ${data.result?.synced || tokens.length} tokens to Google Sheet tab 'App Tokens'`,
        "success"
      );
      await fetchTokens();
    } catch (err: any) {
      console.error("[AppTokenManagement] Sync error:", err);
      showToast(`Google Sheets sync error: ${err.message}`, "error");
    } finally {
      setSyncing(false);
    }
  };

  // ─── Generate Token Handler ───────────────────────────────────────────────
  const handleGenerateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim()) {
      showToast("Application name is required", "error");
      return;
    }

    try {
      const res = await fetch("/api/tokens/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: appName.trim(),
          clientOwner: clientOwner.trim(),
          environment,
          durationDays: durationDays === 0 ? undefined : durationDays,
          customExpiryDate: durationDays === 0 ? customExpiryDate : undefined,
          scopes: selectedScopes
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setShowGenerateModal(false);
      setShowSecretModal({
        rawToken: data.token,
        record: data.record
      });

      // Reset form
      setAppName("");
      showToast("Token generated & synced to Google Sheet!", "success");
      await fetchTokens();
    } catch (err: any) {
      showToast(`Failed to generate token: ${err.message}`, "error");
    }
  };

  // ─── Verify Token Handler ─────────────────────────────────────────────────
  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyTokenInput.trim()) return;

    setVerifying(true);
    setVerifyResult(null);
    try {
      const res = await fetch("/api/tokens/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verifyTokenInput.trim() })
      });

      const data = await res.json();
      setVerifyResult(data);
    } catch (err: any) {
      setVerifyResult({ valid: false, error: err.message });
    } finally {
      setVerifying(false);
    }
  };

  // ─── Revoke Token Handler ─────────────────────────────────────────────────
  const handleRevokeToken = async () => {
    if (!showRevokeModal) return;
    setRevoking(true);
    try {
      const res = await fetch("/api/tokens/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId: showRevokeModal.tokenId,
          reason: revokeReason.trim()
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showToast(`Token ${showRevokeModal.tokenId} revoked and marked in Google Sheet`, "info");
      setShowRevokeModal(null);
      await fetchTokens();
    } catch (err: any) {
      showToast(`Revocation error: ${err.message}`, "error");
    } finally {
      setRevoking(false);
    }
  };

  // ─── Rotate Token Handler ─────────────────────────────────────────────────
  const handleRotateToken = async (token: AppToken) => {
    if (!window.confirm(`Are you sure you want to rotate token '${token.name}'? The existing token key will be immediately revoked and replaced with a newly generated key.`)) {
      return;
    }

    try {
      const res = await fetch("/api/tokens/rotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId: token.tokenId,
          durationDays: token.durationDays || 90
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setShowSecretModal({
        rawToken: data.token,
        record: data.record
      });

      showToast(`Token rotated successfully. Previous token revoked in Google Sheet.`, "success");
      await fetchTokens();
    } catch (err: any) {
      showToast(`Rotation error: ${err.message}`, "error");
    }
  };

  // ─── Filtered Tokens List ──────────────────────────────────────────────────
  const filteredTokens = useMemo(() => {
    return tokens.filter(t => {
      const matchesSearch =
        search === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tokenId.toLowerCase().includes(search.toLowerCase()) ||
        t.clientOwner.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        t.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesEnv =
        envFilter === "All" ||
        t.environment.toLowerCase() === envFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesEnv;
    });
  }, [tokens, search, statusFilter, envFilter]);

  return (
    <div className="w-full space-y-6">
      {/* ─── Toast Alert ─── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border text-sm font-medium transition-all ${
            toast.type === "success"
              ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/40 backdrop-blur-md"
              : toast.type === "error"
              ? "bg-rose-950/90 text-rose-200 border-rose-500/40 backdrop-blur-md"
              : "bg-blue-950/90 text-blue-200 border-blue-500/40 backdrop-blur-md"
          }`}
        >
          {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toast.type === "error" && <AlertTriangle className="w-4 h-4 text-rose-400" />}
          {toast.type === "info" && <ShieldAlert className="w-4 h-4 text-blue-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ─── Header & Hero ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 text-white border border-slate-700/60 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase border border-indigo-500/30 mb-3">
              <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enterprise Identity & API Security</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Application Token Management & Expiry Engine
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Issue, monitor, rotate, and revoke cryptographic application tokens with real-time expiration tracking.
              All token states, expiry countdowns, and audit events automatically synchronize with your connected{" "}
              <strong className="text-indigo-200">Google Sheet (Tab: App Tokens)</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSyncGoogleSheet}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-600 text-sm font-semibold transition-all shadow-sm disabled:opacity-50"
              title="Synchronize all token records to Google Sheet tab"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>{syncing ? "Syncing to Sheets..." : "Sync to Google Sheet"}</span>
            </button>

            <button
              onClick={() => {
                setShowVerifyModal(true);
                setVerifyResult(null);
                setVerifyTokenInput("");
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-600 text-sm font-semibold transition-all shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Verify Token</span>
            </button>

            <button
              onClick={() => setShowGenerateModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40"
            >
              <Plus className="w-4 h-4" />
              <span>Generate New Token</span>
            </button>
          </div>
        </div>

        {/* ─── Metric KPI Badges ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-8 pt-6 border-t border-slate-700/60">
          <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/50">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Tokens</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.total}</div>
            <div className="text-xs text-slate-400 mt-1">Managed credentials</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Active Tokens</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-2xl font-bold text-emerald-300 mt-1">{stats.active}</div>
            <div className="text-xs text-slate-400 mt-1">Healthy & operational</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Expiring Soon</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300 mt-1">{stats.expiringSoon}</div>
            <div className="text-xs text-amber-400/90 mt-1">≤ 14 days remaining</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/50">
            <div className="text-xs font-medium text-rose-400 uppercase tracking-wider">Expired / Revoked</div>
            <div className="text-2xl font-bold text-rose-300 mt-1">{stats.expired + stats.revoked}</div>
            <div className="text-xs text-slate-400 mt-1">Auto-blocked from APIs</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-xl p-4 border border-slate-700/50 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Google Sheet</span>
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-base font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Live Telemetry
            </div>
            <a
              href="https://docs.google.com/spreadsheets/d/1TxCoTbCSnPo6dCZyHoIb399x4P--ov677WgYDFUeErs/edit"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-indigo-300 hover:text-white underline mt-1 flex items-center gap-1"
            >
              <span>Spreadsheet 1TxCo...</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── Search & Filter Controls ─── */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by token, app, or owner..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 placeholder-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-medium text-slate-600">
            {["All", "Active", "Expiring Soon", "Expired", "Revoked"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  statusFilter === status
                    ? "bg-white text-indigo-600 font-semibold shadow-xs"
                    : "hover:text-slate-900"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Environment Filter */}
          <select
            value={envFilter}
            onChange={(e) => setEnvFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Environments</option>
            <option value="Production">Production</option>
            <option value="Staging">Staging</option>
            <option value="Development">Development</option>
          </select>

          <button
            onClick={fetchTokens}
            disabled={loading}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-600 transition-colors"
            title="Refresh Token List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* ─── Tokens Table ─── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-3" />
            <p className="text-sm font-medium">Loading token records from database...</p>
          </div>
        ) : filteredTokens.length === 0 ? (
          <div className="p-12 text-center">
            <KeyRound className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">No application tokens found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
              {search || statusFilter !== "All" || envFilter !== "All"
                ? "No tokens matched your search and filter criteria."
                : "Get started by generating your first secure application token with automated expiry."}
            </p>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Generate First Token</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Application & Owner</th>
                  <th className="py-3.5 px-4">Token ID & Masked Key</th>
                  <th className="py-3.5 px-4">Scopes</th>
                  <th className="py-3.5 px-4">Expiration & Lifespan</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Sheets Sync</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTokens.map((token) => {
                  const isExpiringSoon = token.status === "Expiring Soon";
                  const isExpired = token.status === "Expired";
                  const isRevoked = token.status === "Revoked";
                  const isActive = token.status === "Active";

                  return (
                    <tr
                      key={token.tokenId}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isExpiringSoon ? "bg-amber-50/20" : isRevoked ? "bg-slate-50/40 opacity-75" : ""
                      }`}
                    >
                      {/* 1. Application Name & Owner */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span>{token.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                              token.environment === "Production"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : token.environment === "Staging"
                                ? "bg-amber-100 text-amber-700 border border-amber-200"
                                : "bg-purple-100 text-purple-700 border border-purple-200"
                            }`}
                          >
                            {token.environment}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{token.clientOwner}</div>
                      </td>

                      {/* 2. Token ID & Masked Key */}
                      <td className="py-4 px-4 font-mono text-xs">
                        <div className="text-slate-800 font-semibold">{token.tokenId}</div>
                        <div className="flex items-center gap-1.5 text-slate-500 mt-0.5">
                          <span>{token.keyPrefix}</span>
                          <button
                            onClick={() => handleCopy(token.keyPrefix, `prefix-${token.tokenId}`)}
                            className="p-1 hover:text-indigo-600 transition-colors"
                            title="Copy masked key prefix"
                          >
                            {copiedKey === `prefix-${token.tokenId}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* 3. Scopes */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {token.scopes.map((scope) => (
                            <span
                              key={scope}
                              className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                            >
                              {scope}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* 4. Expiration & Lifespan */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-semibold text-slate-800">
                          {new Date(token.expiresAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {isRevoked ? (
                            <span className="text-xs text-slate-400 font-medium">Revoked</span>
                          ) : isExpired ? (
                            <span className="text-xs text-rose-600 font-semibold">
                              Expired {Math.abs(token.daysRemaining)} days ago
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`text-xs font-bold ${
                                  isExpiringSoon ? "text-amber-600" : "text-emerald-600"
                                }`}
                              >
                                {token.daysRemaining} days left
                              </div>
                              <span className="text-[10px] text-slate-400">
                                ({token.durationDays}d cycle)
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* 5. Status Badge */}
                      <td className="py-4 px-4">
                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        )}
                        {isExpiringSoon && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            Expiring Soon
                          </span>
                        )}
                        {isExpired && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            Expired
                          </span>
                        )}
                        {isRevoked && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-300">
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            Revoked
                          </span>
                        )}
                      </td>

                      {/* 6. Sheets Sync */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-xs">
                          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-slate-700 font-medium">
                            {token.sheetSyncStatus || "Synced"}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {token.syncedToSheetAt
                            ? new Date(token.syncedToSheetAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : "Auto-synced"}
                        </div>
                      </td>

                      {/* 7. Action Controls */}
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            onClick={() => handleRotateToken(token)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors"
                            title="Rotate Key (Re-issue secret & extend expiry)"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>

                          {!isRevoked && (
                            <button
                              onClick={() => setShowRevokeModal(token)}
                              className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                              title="Revoke Token"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── Google Sheets Integration Info Footer ─── */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <FileSpreadsheet className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-slate-800">
              Google Apps Script Live Webhook Connected
            </div>
            <p className="mt-0.5 text-slate-500">
              Token generation, lifecycle expiry alerts, and revocation records are written directly to tab{" "}
              <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">App Tokens</code> in Google Spreadsheet ID{" "}
              <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">1TxCoTbCSnPo6dCZyHoIb399x4P--ov677WgYDFUeErs</code>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://docs.google.com/spreadsheets/d/1TxCoTbCSnPo6dCZyHoIb399x4P--ov677WgYDFUeErs/edit"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-indigo-600 hover:border-indigo-400 font-medium transition-all shadow-xs"
          >
            <span>Open Google Sheet</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODAL 1: Generate New Token                                             */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowGenerateModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Generate Application Token</h3>
                <p className="text-xs text-slate-500">Configure token expiry cadence and API permission scopes</p>
              </div>
            </div>

            <form onSubmit={handleGenerateToken} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Application / Integration Name *
                </label>
                <input
                  type="text"
                  required
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="e.g. Workday HRMS Compliance Sync, Mobile Audit Portal"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Client ID / Owner Email
                  </label>
                  <input
                    type="email"
                    value={clientOwner}
                    onChange={(e) => setClientOwner(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Environment
                  </label>
                  <select
                    value={environment}
                    onChange={(e: any) => setEnvironment(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
              </div>

              {/* ─── Token Expiry Presets ─── */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Token Expiration Lifecycle *</span>
                  <span className="text-[11px] text-indigo-600 font-normal">Automated Google Sheet Alerting</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DURATION_PRESETS.map((preset) => (
                    <button
                      key={preset.days}
                      type="button"
                      onClick={() => setDurationDays(preset.days)}
                      className={`px-3 py-2 rounded-lg border text-left transition-all ${
                        durationDays === preset.days
                          ? "bg-indigo-50 border-indigo-600 text-indigo-900 shadow-xs ring-1 ring-indigo-600"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <div className="text-xs font-bold">{preset.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{preset.desc}</div>
                    </button>
                  ))}
                </div>

                {durationDays === 0 && (
                  <div className="mt-2.5">
                    <label className="block text-xs text-slate-600 mb-1">Select Custom Expiry Date:</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={customExpiryDate}
                      onChange={(e) => setCustomExpiryDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>

              {/* ─── Scopes Selection ─── */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Authorized Permission Scopes
                </label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {AVAILABLE_SCOPES.map((scope) => {
                    const isChecked = selectedScopes.includes(scope.id);
                    return (
                      <label
                        key={scope.id}
                        className={`flex items-start gap-2.5 p-2 rounded-lg border cursor-pointer transition-all ${
                          isChecked ? "bg-slate-50 border-indigo-300" : "border-slate-200 hover:bg-slate-50/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedScopes([...selectedScopes, scope.id]);
                            } else {
                              setSelectedScopes(selectedScopes.filter(s => s !== scope.id));
                            }
                          }}
                          className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <div className="text-xs font-mono font-semibold text-slate-800">{scope.label}</div>
                          <div className="text-[11px] text-slate-500 leading-tight">{scope.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-600/30"
                >
                  Generate & Sync to Google Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODAL 2: Secret Key Reveal (Shown Once)                                */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {showSecretModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">Application Token Created</h3>
            <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Copy this secret key now. For enterprise security, it will not be displayed again.</span>
            </p>

            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm relative break-all border border-slate-700">
              {showSecretModal.rawToken}
              <button
                onClick={() => handleCopy(showSecretModal.rawToken, "raw-secret")}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Copy full secret"
              >
                {copiedKey === "raw-secret" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Token ID:</span>
                <strong className="text-slate-800 font-mono">{showSecretModal.record.tokenId}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Expiration Date:</span>
                <strong className="text-slate-800">
                  {new Date(showSecretModal.record.expiresAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}{" "}
                  ({showSecretModal.record.durationDays} days)
                </strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Google Sheet Status:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Synced to Tab 'App Tokens'
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-700 mb-1">Example API Header Usage:</div>
              <pre className="p-2.5 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-mono overflow-x-auto border border-slate-200">
                {`curl -X GET https://govenics.com/api/compliance/register \\\n  -H "Authorization: Bearer ${showSecretModal.rawToken}"`}
              </pre>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSecretModal(null)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-md"
              >
                I Have Stored the Token Securely
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODAL 3: Verify Token Tester                                           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowVerifyModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Verify Application Token</h3>
                <p className="text-xs text-slate-500">Test cryptographic validity, expiration status & scopes</p>
              </div>
            </div>

            <form onSubmit={handleVerifyToken} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Paste Token Secret Key
                </label>
                <input
                  type="text"
                  required
                  value={verifyTokenInput}
                  onChange={(e) => setVerifyTokenInput(e.target.value)}
                  placeholder="gov_tok_live_..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-md disabled:opacity-50"
              >
                {verifying ? "Verifying..." : "Validate Token"}
              </button>
            </form>

            {verifyResult && (
              <div className="mt-5 p-4 rounded-xl border text-xs">
                {verifyResult.valid ? (
                  <div className="space-y-2 text-slate-700">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Valid & Active Token</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-slate-400">Application:</span>
                        <div className="font-semibold">{verifyResult.token.name}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Token ID:</span>
                        <div className="font-mono font-semibold">{verifyResult.token.tokenId}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Environment:</span>
                        <div className="font-semibold">{verifyResult.token.environment}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Days Remaining:</span>
                        <div className="font-bold text-emerald-600">{verifyResult.token.daysRemaining} days</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-400">Authorized Scopes:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {verifyResult.token.scopes?.map((s: string) => (
                          <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-rose-600">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Token Rejected / Inactive</span>
                    </div>
                    <p className="text-slate-600 mt-1">{verifyResult.error || "Invalid token key"}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODAL 4: Revoke Token Confirmation                                    */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {showRevokeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowRevokeModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-3">
              <Trash2 className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">Revoke Application Token</h3>
            <p className="text-xs text-slate-500 mt-1">
              Revoking <strong className="text-slate-800">{showRevokeModal.name}</strong> ({showRevokeModal.tokenId}) will immediately block all incoming API requests using this token.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Revocation Reason (Recorded in Google Sheet)
              </label>
              <input
                type="text"
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="Reason for revocation..."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRevokeModal(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRevokeToken}
                disabled={revoking}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-all shadow-md disabled:opacity-50"
              >
                {revoking ? "Revoking..." : "Confirm Revocation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppTokenManagement;
