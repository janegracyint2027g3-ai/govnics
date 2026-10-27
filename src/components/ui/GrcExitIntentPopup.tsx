import { useState, useEffect } from "react";
import { X, MessageSquare } from "lucide-react";
import mascotImg from "../../assets/sad_grc_advisor.png";

export const GrcExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeen = sessionStorage.getItem("govenics_exit_intent_shown");
    if (hasSeen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if cursor moves out of the top boundary (exit intent)
      if (e.clientY <= 0) {
        setIsOpen(true);
        sessionStorage.setItem("govenics_exit_intent_shown", "true");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "Exit_Intent_Feedback",
            table: "Exit_Intent_Feedback",
            "Feedback": feedback,
            "Source Page": window.location.pathname,
            "Timestamp": new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("Exit feedback submission error:", err);
      }
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in transition-all">
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 max-w-md w-full flex flex-col items-center text-center space-y-6 max-h-[90vh] overflow-y-auto border border-slate-100 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot Illustration */}
        <div className="w-32 h-32 flex items-center justify-center relative">
          <img
            src={mascotImg}
            alt="Security Mascot"
            className="w-full h-full object-contain relative z-10"
          />
          {/* Fallback Icon if image fails */}
          <div className="absolute inset-0 flex items-center justify-center bg-blue-500/5 rounded-full -z-0">
            <MessageSquare className="w-12 h-12 text-blue-500/20" />
          </div>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading tracking-tight leading-tight">
            Wait, why are you leaving?
          </h2>
          <p className="text-sm text-slate-500 font-semibold leading-relaxed px-2">
            Your compliance & risk posture is our priority. Let us know how we can improve your advisory or platform experience.
          </p>
        </div>

        {isSubmitted ? (
          <div className="w-full py-8 text-emerald-600 font-bold text-center space-y-2">
            <span className="text-3xl">✓</span>
            <p className="text-base">Thank you for your valuable feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* Feedback Input */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please share your feedback and help us improve :)"
              className="w-full min-h-[100px] bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-semibold resize-none"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-14 bg-[#00A651] hover:bg-[#008F45] text-white rounded-2xl text-base font-bold shadow-lg shadow-green-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Submit Feedback
            </button>
          </form>
        )}

        {/* Subtext */}
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
          We Value Your Privacy
        </p>
      </div>
    </div>
  );
};
