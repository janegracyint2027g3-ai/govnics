import React, { useState, useEffect, useCallback } from "react";
import { useAuth, type UserSession } from "@/context/AuthContext";
import {
  Laptop, Smartphone, Globe, Shield, Clock,
  Trash2, RefreshCw, AlertTriangle, CheckCircle2,
  LogOut, KeyRound, Monitor
} from "lucide-react";

export const SessionManagementPanel: React.FC = () => {
  const { user, getSessions, revokeSession, revokeAllOtherSessions } = useAuth();
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSessions();
      setSessions(data);
    } catch {
      setFeedback({ type: "error", message: "Failed to load active login sessions." });
    } finally {
      setLoading(false);
    }
  }, [getSessions]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleRevoke = async (sessionId: string, isCurrent: boolean) => {
    if (isCurrent && !window.confirm("You are about to terminate your CURRENT session. You will be logged out of this device. Proceed?")) {
      return;
    }

    setActionLoading(sessionId);
    setFeedback(null);
    try {
      const res = await revokeSession(sessionId);
      if (res.success) {
        setFeedback({ type: "success", message: isCurrent ? "Current session revoked. Redirecting..." : "Session successfully revoked." });
        if (isCurrent) {
          window.location.href = "/login";
        } else {
          await loadSessions();
        }
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to revoke session." });
      }
    } catch {
      setFeedback({ type: "error", message: "An unexpected error occurred while terminating session." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevokeAllOthers = async () => {
    if (!window.confirm("Are you sure you want to log out of all other devices and workstations?")) {
      return;
    }

    setActionLoading("ALL_OTHERS");
    setFeedback(null);
    try {
      const res = await revokeAllOtherSessions();
      if (res.success) {
        setFeedback({ type: "success", message: "All other sessions terminated successfully." });
        await loadSessions();
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to revoke other sessions." });
      }
    } catch {
      setFeedback({ type: "error", message: "An unexpected error occurred while terminating other sessions." });
    } finally {
      setActionLoading(null);
    }
  };

  const getDeviceIcon = (deviceStr: string) => {
    if (/Mobile|Smartphone/i.test(deviceStr)) {
      return <Smartphone className="w-5 h-5 text-indigo-500" />;
    }
    if (/Mac|Windows|Linux|Workstation/i.test(deviceStr)) {
      return <Laptop className="w-5 h-5 text-blue-500" />;
    }
    return <Monitor className="w-5 h-5 text-slate-500" />;
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  const otherSessionsCount = sessions.filter((s) => !s.isCurrent).length;

  return (
    <div className="space-y-6 text-left">
      {/* Panel Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-900 font-heading">
              Login Session &amp; Device Management
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Monitor and control devices authorized to access your GOVENICS enterprise compliance environment. 
            All login and logout events are synchronized in real-time to your central Google Sheets telemetry audit log.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={loadSessions}
            disabled={loading}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            title="Refresh Sessions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          {otherSessionsCount > 0 && (
            <button
              onClick={handleRevokeAllOthers}
              disabled={actionLoading === "ALL_OTHERS"}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{actionLoading === "ALL_OTHERS" ? "Terminating..." : `Revoke All Other Sessions (${otherSessionsCount})`}</span>
            </button>
          )}
        </div>
      </div>

      {/* Alert Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Audit Sync Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-blue-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-black text-white flex items-center gap-2">
              <span>Google Sheets Telemetry Ingestion: Active</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Target Tab: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">User_Logins</code> • Every login, credential challenge, and logout is automatically streamed.
            </p>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg shrink-0">
          Account: <strong className="text-white">{user?.email || "Current User"}</strong>
        </div>
      </div>

      {/* Active Sessions List */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-sm font-black text-slate-900 font-heading">
              Active Authorized Devices ({sessions.length})
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Sessions that have an active cryptographic session token with your enterprise tenant.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
            <span>Verifying session security and cryptographic tokens...</span>
          </div>
        ) : sessions.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No active sessions recorded.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sessions.map((s) => (
              <div
                key={s.sessionId}
                className="py-4 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                    {getDeviceIcon(s.device)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-slate-900">
                        {s.device}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        • {s.browser}
                      </span>
                      {s.isCurrent && (
                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Current Device
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-slate-400" />
                        <span>IP: {s.ip}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Logged in: {formatDate(s.createdAt)}</span>
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Token ID: {s.sessionId.substring(0, 8)}••••••••{s.sessionId.substring(s.sessionId.length - 4)}
                    </div>
                  </div>
                </div>

                <div className="sm:self-center">
                  <button
                    onClick={() => handleRevoke(s.sessionId, s.isCurrent)}
                    disabled={actionLoading === s.sessionId}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      s.isCurrent
                        ? "bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200"
                        : "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                    }`}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>
                      {actionLoading === s.sessionId
                        ? "Revoking..."
                        : s.isCurrent
                        ? "Log Out Current Device"
                        : "Revoke Session"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

