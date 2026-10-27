import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sparkles,
  X,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  RotateCcw,
  Zap,
  Activity
} from "lucide-react";

interface SessionIntelligenceData {
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
  previousVisitTime: string | null;
  visitedPages: string[];
  lastVisitedPage: string | null;
}

const STORAGE_KEY = "govenics_session_intelligence_v1";
const SESSION_FLAG = "govenics_session_registered_v1";

const getOrdinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const formatTimeAgo = (isoString: string | null): string => {
  if (!isoString) return "First detected session";
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 2) return "Just moments ago";
    if (diffMin < 60) return `${diffMin} mins ago`;
    if (diffHour < 24) return `${diffHour} hr${diffHour > 1 ? "s" : ""} ago`;
    if (diffDay === 1) return "Yesterday";
    return `${diffDay} days ago`;
  } catch {
    return "Earlier session";
  }
};

export const SessionIntelligencePopup: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<SessionIntelligenceData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRepeatedUser, setIsRepeatedUser] = useState(false);
  const [sessionDurationSec, setSessionDurationSec] = useState(0);
  const [showSimControls, setShowSimControls] = useState(false);

  // Initialize or update visit intelligence
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const isCurrentSessionActive = sessionStorage.getItem(SESSION_FLAG);

      let parsed: SessionIntelligenceData;
      const now = new Date().toISOString();

      if (stored) {
        parsed = JSON.parse(stored);
        if (!isCurrentSessionActive) {
          // New browser session for a returning visitor!
          parsed.previousVisitTime = parsed.lastVisit;
          parsed.visitCount = (parsed.visitCount || 1) + 1;
          parsed.lastVisit = now;
          sessionStorage.setItem(SESSION_FLAG, "true");
        }
      } else {
        // First visit initialization
        parsed = {
          visitCount: 1,
          firstVisit: now,
          lastVisit: now,
          previousVisitTime: null,
          visitedPages: [location.pathname],
          lastVisitedPage: null,
        };
        sessionStorage.setItem(SESSION_FLAG, "true");
      }

      // Record current page into history if not already duplicate consecutive
      if (!parsed.visitedPages) parsed.visitedPages = [];
      if (parsed.visitedPages[parsed.visitedPages.length - 1] !== location.pathname) {
        parsed.lastVisitedPage = parsed.visitedPages[parsed.visitedPages.length - 1] || null;
        parsed.visitedPages = [...parsed.visitedPages.slice(-10), location.pathname];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      setData(parsed);

      const returning = parsed.visitCount >= 2;
      setIsRepeatedUser(returning);

      // Auto-open with an elegant delay
      const dismissedInSession = sessionStorage.getItem("govenics_intel_dismissed");
      if (!dismissedInSession) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, returning ? 1200 : 2500); // Faster for returning users
        return () => clearTimeout(timer);
      } else {
        setIsMinimized(true);
      }
    } catch (e) {
      console.warn("Session intelligence init error:", e);
    }
  }, []);

  // Update visited pages on route change
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: SessionIntelligenceData = JSON.parse(stored);
        if (parsed.visitedPages && parsed.visitedPages[parsed.visitedPages.length - 1] !== location.pathname) {
          parsed.lastVisitedPage = parsed.visitedPages[parsed.visitedPages.length - 1] || null;
          parsed.visitedPages = [...parsed.visitedPages.slice(-10), location.pathname];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          setData(parsed);
        }
      }
    } catch {}
  }, [location.pathname]);

  // Track active session seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionDurationSec(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    setIsMinimized(true);
    sessionStorage.setItem("govenics_intel_dismissed", "true");
  };

  // Quick simulation helpers so user can test Visit #2, Visit #3, Reset immediately
  const handleSimulateNextVisit = () => {
    if (!data) return;
    const now = new Date().toISOString();
    const updated: SessionIntelligenceData = {
      ...data,
      previousVisitTime: data.lastVisit,
      visitCount: data.visitCount + 1,
      lastVisit: now,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setData(updated);
    setIsRepeatedUser(true);
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleResetSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_FLAG);
    sessionStorage.removeItem("govenics_intel_dismissed");
    const now = new Date().toISOString();
    const fresh: SessionIntelligenceData = {
      visitCount: 1,
      firstVisit: now,
      lastVisit: now,
      previousVisitTime: null,
      visitedPages: [location.pathname],
      lastVisitedPage: null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setData(fresh);
    setIsRepeatedUser(false);
    setIsOpen(true);
    setIsMinimized(false);
  };

  const formatSessionTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const visitOrdinal = useMemo(() => {
    return data ? getOrdinal(data.visitCount) : "1st";
  }, [data]);

  if (!data) return null;

  return (
    <>
      {/* ── Persistent Floating Intelligence Badge (When Minimized) ── */}
      {isMinimized && !isOpen && (
        <div className="fixed bottom-20 left-6 z-40 animate-fade-in">
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            aria-label="View Session Intelligence"
            className="flex items-center gap-2.5 px-3.5 py-2 bg-[#091530]/95 hover:bg-[#0e214d] border border-blue-500/40 text-white rounded-full shadow-lg shadow-blue-950/40 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-sky-300 font-bold">
                {isRepeatedUser ? `Welcome Back • ${visitOrdinal} Visit` : "Session Intelligence"}
              </span>
              <span className="hidden sm:inline text-slate-400 text-[11px]">
                ({formatSessionTime(sessionDurationSec)})
              </span>
            </div>
          </button>
        </div>
      )}

      {/* ── Main Interactive Session Intelligence Popup ── */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] animate-slide-up-dropdown">
          <div
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-blue-900/20 overflow-hidden"
            style={{
              boxShadow: "0 25px 60px -12px rgba(10, 22, 58, 0.45), 0 0 0 1px rgba(14, 30, 80, 0.1)",
            }}
          >
            {/* Header: Dark Navy with Intelligence Radar */}
            <div className="bg-gradient-to-r from-[#07132c] via-[#0b1c40] to-[#0d2250] p-4 sm:p-5 text-white relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0 shadow-inner">
                    <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-sky-400/15 text-sky-300 border border-sky-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                        Live Intelligence
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formatSessionTime(sessionDurationSec)}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white mt-1 leading-snug">
                      {isRepeatedUser ? (
                        <>
                          Welcome Back!{" "}
                          <span className="text-sky-400 font-black">#{visitOrdinal} visit</span>
                        </>
                      ) : (
                        <>
                          Welcome to{" "}
                          <span className="text-sky-400 font-black">Govenics GRC</span>
                        </>
                      )}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleDismiss}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Dismiss intelligence card"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Subtitle / persona context */}
              <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed pl-0.5">
                {isRepeatedUser
                  ? `Recognized returning enterprise visitor. Telemetry & continuity engine restored your workspace state.`
                  : `Real-time session intelligence initialized. Dynamic recommendations adapt to your regulatory scope.`}
              </p>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 space-y-3.5 bg-slate-50/80">
              {/* Telemetry Highlights Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-blue-600" />
                    Last Session
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1 truncate">
                    {formatTimeAgo(data.previousVisitTime || data.firstVisit)}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Compass className="w-3 h-3 text-sky-600" />
                    Pages Explored
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {data.visitedPages.length} touchpoint{data.visitedPages.length === 1 ? "" : "s"}
                  </div>
                </div>
              </div>

              {/* Contextual Recommendation Card */}
              <div className="p-3.5 rounded-xl bg-blue-50/90 border border-blue-100 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold text-blue-950">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    {isRepeatedUser ? "Tailored Recommendation" : "Recommended Next Step"}
                  </span>
                  <span className="text-[10px] text-blue-600 bg-white px-2 py-0.5 rounded-full font-semibold border border-blue-200">
                    High Priority
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isRepeatedUser
                    ? "Based on your multi-session journey, our compliance architects can benchmark your statutory & AI security stance."
                    : "Explore our 12 statutory and technical practice areas or schedule a strategy audit session."}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <Link
                    to="/services"
                    onClick={handleDismiss}
                    className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Explore Offerings</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    to="/contact"
                    onClick={handleDismiss}
                    className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold transition-colors border border-slate-200 flex items-center justify-center"
                  >
                    Contact Team
                  </Link>
                </div>
              </div>

              {/* Bottom Quick Actions / Simulator Bar */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                <button
                  type="button"
                  onClick={() => setShowSimControls(!showSimControls)}
                  className="text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Activity className="w-3 h-3 text-blue-500" />
                  <span>Session Controls</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${showSimControls ? "rotate-180" : ""}`}
                  />
                </button>

                <button
                  onClick={handleDismiss}
                  className="font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Minimize
                </button>
              </div>

              {/* Interactive Simulator Drawer (For testing repeated visits easily) */}
              {showSimControls && (
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2 animate-fade-in">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Test Live State:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleSimulateNextVisit}
                      className="px-2 py-1 bg-slate-200 hover:bg-blue-100 hover:text-blue-700 rounded text-[10px] font-bold text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Increments visit counter and triggers repeated user state"
                    >
                      <Zap className="w-2.5 h-2.5 text-blue-600" />
                      Simulate Visit +1
                    </button>
                    <button
                      onClick={handleResetSession}
                      className="px-2 py-1 bg-slate-200 hover:bg-red-100 hover:text-red-700 rounded text-[10px] font-bold text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Reset intelligence state to 1st visit"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
