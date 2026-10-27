import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      // Show after scrolling past 60% of viewport height
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-[100] xl:hidden"
        >
          <div className="bg-blue-600 rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center gap-3 pr-3 pl-4 py-3 border border-blue-500/30">
            <div className="p-1.5 bg-white/15 rounded-lg shrink-0">
              <ClipboardList className="w-4 h-4 text-white" />
            </div>
            <Link
              to="#lead-capture"
              id="floating-cta-assessment"
              onClick={() => {
                setDismissed(true);
                import("@/utils/analytics").then(({ trackEvent }) => {
                  trackEvent("click", "CTA Leads", {
                    action: "Floating CTA Click - Get Free Assessment",
                    elementId: "floating-cta-assessment",
                    elementText: "Get Free Assessment",
                    targetUrl: "#lead-capture"
                  });
                });
              }}
              className="flex items-center gap-1.5 text-white font-bold text-sm tracking-wide"
            >
              Get Free Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="p-1 text-white/60 hover:text-white transition-colors ml-1 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
