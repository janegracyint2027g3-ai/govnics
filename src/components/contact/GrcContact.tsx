import { useState } from "react";
import { Mail, MapPin, Calendar, Clock, CheckCircle2, ShieldCheck, Target, BookOpen } from "lucide-react";
import { industriesData } from "@/data/industries-data";
import { trackEvent } from "@/utils/analytics";
import { StrategySessionForm } from "@/components/contact/StrategySessionForm";

export const GrcContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    industry: "",
    requirement: "",
    phone: "",
    email: ""
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const times = ["09:30 AM IST", "11:00 AM IST", "02:30 PM IST", "04:00 PM IST"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Log form submit event to GRC analytics
    trackEvent("form_submit", "Statutory GRC", {
      name: formData.name,
      email: formData.email,
      company: formData.org,
      interest: formData.industry || "General GRC Consultation",
      phone: formData.phone,
      slotTime: selectedTime || "Not Selected",
      message: formData.requirement
    });

    const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "Consultation_Requests",
            table: "Consultation_Requests",
            "Full Name": formData.name,
            "Email": formData.email,
            "Phone": formData.phone,
            "Company": formData.org,
            "Industry": formData.industry,
            "Audit Scope": formData.industry || "GRC Consultation",
            "Timeline": selectedTime || "Earliest Available",
            "Message": formData.requirement,
            "Lead Source": "Schedule GRC Audit Form",
            Timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("Consultation request webhook error:", err);
      }
    }

    setSubmitting(false);
    setSuccess(true);
    setFormData({ name: "", org: "", industry: "", requirement: "", phone: "", email: "" });
    setSelectedTime(null);
  };

  return (
    <section className="py-8 bg-white border-t border-slate-200/80 relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest rounded-full">
            Interactive Consultation Booking
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-heading">
            Schedule GRC Audit
          </h2>
          <p className="text-slate-655 text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Book a private, advisory-grade compliance consultation with our senior risk partners. (A division of ISI Group).
          </p>
        </div>

        {success ? (
          <div className="max-w-xl mx-auto p-10 bg-white border border-emerald-200 rounded-3xl text-center space-y-6 animate-fade-in shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/5">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-heading">Consultation Scheduled</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Thank you. Our senior GRC partners have received your request. A secure calendar invite and meeting brief has been dispatched to your official email.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-blue-500/20"
            >
              Book Another Slot
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info & Calendar Simulator (5 cols) */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 font-heading">Advisory Command Office</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Secure communications active. All consultations are treated with strict, regulatory-grade confidentiality.
                </p>
                <div className="space-y-4 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-slate-700">No 97/2, SUNDARAM STREET CHINMAYA NAGAR STAGE 1 , Chennai City Corporation, Tamil Nadu, India - 600092</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>contact@govenics.grc</span>
                  </div>
                </div>
              </div>

              {/* Calendly Simulator */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Calendar className="w-4.5 h-4.5 text-blue-500" />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                    Available slots (Today)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-3.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 border ${
                        selectedTime === t
                          ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                          : "bg-white text-slate-600 border-slate-200 hover:border-blue-500/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {selectedTime && (
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
                    <Clock className="w-4 h-4" /> Selected: {selectedTime}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Booking Form (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanjay Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-14 px-5 rounded-2xl bg-white border border-slate-250 text-sm font-semibold text-slate-900 placeholder-slate-455 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BFSI Enterprises"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full h-14 px-5 rounded-2xl bg-white border border-slate-250 text-sm font-semibold text-slate-900 placeholder-slate-455 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Industry Segment</label>
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full h-14 px-5 rounded-2xl bg-white border border-slate-250 text-sm font-semibold text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all select-light-theme"
                    >
                      <option value="">Select Industry</option>
                      {industriesData.map((ind) => (
                        <option key={ind.id} value={ind.title}>{ind.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Official Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-14 px-5 rounded-2xl bg-white border border-slate-250 text-sm font-semibold text-slate-900 placeholder-slate-455 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-14 px-5 rounded-2xl bg-white border border-slate-250 text-sm font-semibold text-slate-900 placeholder-slate-455 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Preferred Consultation Slot</label>
                    <input
                      type="text"
                      disabled
                      placeholder={selectedTime || "Select a slot on the left"}
                      className="w-full h-14 px-5 rounded-2xl bg-slate-200/50 border border-slate-200 text-sm font-semibold text-slate-500 outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Requirement Overview</label>
                  <textarea
                    required
                    placeholder="Briefly describe your compliance, auditing, or cybersecurity concerns..."
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full h-32 p-5 rounded-2xl bg-white border border-slate-250 text-sm font-semibold text-slate-900 placeholder-slate-455 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-base font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Initiating secure connection..." : "Request Tactical Consultation"}
                </button>

                <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mt-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> End-to-end encrypted • DPDP Act Compliant
                </p>
              </form>
            </div>

          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BOOK A STRATEGY SESSION
          id="book-strategy-session" — anchor target for nav link
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        id="book-strategy-session"
        className="container mx-auto px-6 max-w-6xl relative z-10 scroll-mt-28 pt-12 pb-4 border-t border-slate-200/80"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold uppercase tracking-widest rounded-full">
            <Target className="w-3.5 h-3.5" />
            Advisory Strategy Sessions
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-heading">
            Book a Strategy Session
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Connect with GOVENICS to discuss your business challenges, understand your governance, risk, and compliance priorities, and explore a practical strategy tailored to your organisation.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
            This session is designed for organisations seeking expert guidance on{" "}
            <strong className="text-slate-700 font-semibold">GRC, Risk Management, Regulatory Compliance, ESG, Supply-Chain Compliance, Internal Audit,</strong>{" "}
            and related consulting services. Our senior advisors will help you identify gaps, set priorities, and chart a clear compliance roadmap.
          </p>
          {/* Service tags */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              "GRC Advisory",
              "Enterprise Risk",
              "Regulatory Compliance",
              "ESG & Sustainability",
              "Supply Chain",
              "Internal Audit",
              "Governance Advisory",
              "Risk Assessment",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            {/* Card header */}
            <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">
                  Strategy Session Booking Form
                </h3>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  Fields marked with <span className="text-rose-500">*</span> are required &bull; All information is treated as strictly confidential
                </p>
              </div>
            </div>
            <StrategySessionForm />
          </div>
        </div>
      </div>
    </section>
  );
};
