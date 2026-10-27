import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sparkles,
  X,
  Clock,
  ArrowRight,
  ShieldCheck,
  Compass
} from "lucide-react";

interface SessionIntelligenceData {
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
  previousVisitTime: string | null;
  visitedPages: string[];
}

const STORAGE_KEY = "govenics_session_intelligence_v2";
const SESSION_FLAG = "govenics_session_active_v2";
const SHOWN_FLAG = "govenics_welcome_shown_starting_v2";

const getOrdinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const formatTimeAgo = (isoString: string | null): string => {
  if (!isoString) return "First session";
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
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Initialize session intelligence on initial page load (only at starting)
  useEffect(() => {
    try {
      const alreadyShownThisSession = sessionStorage.getItem(SHOWN_FLAG);
      const isCurrentSessionActive = sessionStorage.getItem(SESSION_FLAG);
      const stored = localStorage.getItem(STORAGE_KEY);

      const now = new Date().toISOString();
      let parsed: SessionIntelligenceData;

      if (stored) {
        parsed = JSON.parse(stored);
        if (!isCurrentSessionActive) {
          // Returning visitor starting a new browser session!
          parsed.previousVisitTime = parsed.lastVisit;
          parsed.visitCount = (parsed.visitCount || 1) + 1;
          parsed.lastVisit = now;
          sessionStorage.setItem(SESSION_FLAG, "true");
        }
      } else {
        // First visit
        parsed = {
          visitCount: 1,
          firstVisit: now,
          lastVisit: now,
          previousVisitTime: null,
          visitedPages: [location.pathname],
        };
        sessionStorage.setItem(SESSION_FLAG, "true");
      }

      // Record page
      if (!parsed.visitedPages) parsed.visitedPages = [];
      if (!parsed.visitedPages.includes(location.pathname)) {
        parsed.visitedPages = [...parsed.visitedPages.slice(-8), location.pathname];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      setData(parsed);

      // ONLY AT STARTING: show once per session, then never again
      if (!alreadyShownThisSession) {
        // Mark as shown immediately so subsequent navigations never re-trigger it
        sessionStorage.setItem(SHOWN_FLAG, "true");

        // Small delay so page renders smoothly first
        const openTimer = setTimeout(() => {
          setIsVisible(true);
        }, 800);

        // Auto-dismiss after 6.5s so it doesn't linger or block the user
        const closeTimer = setTimeout(() => {
          handleClose();
        }, 7300);

        return () => {
          clearTimeout(openTimer);
          clearTimeout(closeTimer);
        };
      }
    } catch (e) {
      console.warn("Session intelligence error:", e);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 280);
  };

  const visitOrdinal = useMemo(() => {
    return data ? getOrdinal(data.visitCount) : "1st";
  }, [data]);

  const isRepeatedUser = Boolean(data && data.visitCount >= 2);

  if (!isVisible || !data) return null;

  return (
    <div
      className={`fixed bottom-22 sm:bottom-24 left-4 sm:left-6 z-50 w-[360px] sm:w-[385px] max-w-[calc(100vw-2rem)] transition-all duration-300 pointer-events-auto ${
        isClosing
          ? "opacity-0 translate-y-3 pointer-events-none"
          : "animate-slide-up-popup"
      }`}
      role="alert"
      aria-live="polite"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden"
        style={{
          boxShadow:
            "0 20px 45px -10px rgba(11, 23, 58, 0.35), 0 0 0 1px rgba(11, 23, 58, 0.08)",
        }}
      >
        {/* Dark Navy Header */}
        <div className="bg-[#0b1736] p-4 text-white relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#162752] border border-blue-400/35 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-sky-400/15 text-sky-300 border border-sky-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Session Intelligence
                  </span>
                </div>

                <h3 className="text-[15px] font-extrabold text-white mt-1 leading-tight">
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
              onClick={handleClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11.5px] text-slate-300 mt-2 font-normal leading-relaxed">
            {isRepeatedUser
              ? "Returning enterprise visitor recognized. Pick up where you left off across our statutory & technical governance practices."
              : "Enterprise session intelligence initialized. Dynamic recommendations adapt to your regulatory scope."}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-4 bg-slate-50/90 space-y-3">
          {/* Quick Context Pill */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <div className="min-w-0">
                <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                  Last Session
                </div>
                <div className="text-[11.5px] font-bold text-slate-800 truncate">
                  {formatTimeAgo(data.previousVisitTime || data.firstVisit)}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <div className="min-w-0">
                <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                  Status
                </div>
                <div className="text-[11.5px] font-bold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-0.5">
            <Link
              to="/services"
              onClick={handleClose}
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/20"
            >
              <span>Explore Offerings</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={handleClose}
              className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors border border-slate-200 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Auto-Dismiss Progress Bar (Visual indicator that it disappears shortly) */}
        <div className="h-1 bg-slate-200 w-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-progress-countdown" />
        </div>
      </div>
    </div>
  );
};
