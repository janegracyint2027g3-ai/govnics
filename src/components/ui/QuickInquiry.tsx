import { useState, useRef, useEffect } from "react";
import { X, Zap, Send, CheckCircle2, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  mobile: string;
  company: string;
}

const INITIAL: FormState = { name: "", email: "", mobile: "", company: "" };

export const QuickInquiry = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus name field on open
  useEffect(() => {
    if (open && !submitted) {
      const timer = setTimeout(() => nameRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [open, submitted]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required";
    else if (!/^[+\d\s\-()]{7,18}$/.test(form.mobile)) e.mobile = "Enter a valid mobile number";
    return e;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);

    const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "Inbound_Leads",
            table: "Inbound_Leads",
            "Full Name": form.name.trim(),
            "Email": form.email.trim(),
            "Phone": form.mobile.trim(),
            "Company": form.company.trim() || "Not specified",
            "Requirement": "Quick Architecture Inquiry",
            "Lead Source": "Quick Inquiry Floating Widget",
            "Source Page": window.location.pathname,
            "Timestamp": new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("Quick inquiry submission error:", err);
      }
    } else {
      // Simulate network latency if webhook is absent
      await new Promise(r => setTimeout(r, 600));
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm(INITIAL);
      setErrors({});
    }, 300);
  };

  return (
    <>
      {/* ── Floating Pill Trigger Button (Bottom-Left) ── */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Quick Inquiry"
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0b1736] hover:bg-[#12234f] text-white rounded-full shadow-2xl shadow-blue-950/50 border border-blue-900/60 hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <span className="w-6 h-6 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 group-hover:bg-blue-600/50 transition-colors">
            <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
          </span>
          <span className="text-sm font-semibold tracking-tight pr-1">Quick Inquiry</span>
        </button>
      </div>

      {/* ── Modal Dialog ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px] flex items-end sm:items-end justify-center sm:justify-start p-3 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="quick-inquiry-title"
        >
          <div
            className="w-full sm:w-[410px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-200"
            style={{
              boxShadow: "0 25px 60px -15px rgba(11, 26, 68, 0.4), 0 0 0 1px rgba(11, 26, 68, 0.08)",
            }}
          >
            {/* Dark Navy Header */}
            <div className="bg-[#0b1736] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#162752] border border-blue-400/30 flex items-center justify-center shrink-0 shadow-inner">
                  <Zap className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                </div>
                <div>
                  <h2
                    id="quick-inquiry-title"
                    className="text-[15px] font-bold text-white leading-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Quick Architecture Inquiry
                  </h2>
                  <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                    Direct Senior Architect Callback
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 bg-white">
              {submitted ? (
                /* Success State */
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    Inquiry Received!
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mb-5">
                    Thank you, <span className="font-semibold text-slate-700">{form.name}</span>. A Senior Architect will reach out to <span className="font-semibold text-slate-700">{form.email}</span> shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Name <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all outline-none text-slate-900 placeholder:text-slate-400 ${
                        errors.name
                          ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 font-medium mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Email <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your work email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all outline-none text-slate-900 placeholder:text-slate-400 ${
                        errors.email
                          ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 font-medium mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Mobile Number <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={form.mobile}
                      onChange={(e) => handleChange("mobile", e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all outline-none text-slate-900 placeholder:text-slate-400 ${
                        errors.mobile
                          ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                          : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.mobile && (
                      <p className="text-[11px] text-red-500 font-medium mt-1">{errors.mobile}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-800">
                        Company
                      </label>
                      <span className="text-[11px] font-normal text-slate-400">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter company name (optional)"
                      value={form.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {/* Footer note */}
                  <div className="pt-1 text-center">
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 font-medium">
                      <span>🔒</span>
                      <span>Confidential &amp; Protected under mutual NDA</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
