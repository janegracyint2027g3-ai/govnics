import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trackEvent } from "@/utils/analytics";
import {
  ArrowRight,
  Phone,
  Mail,
  Building2,
  Users,
  ChevronDown,
  CalendarDays,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const industries = [
  "Food Processing",
  "Pharmaceuticals",
  "Healthcare",
  "Manufacturing",
  "Information Technology",
  "BFSI (Banking, Financial Services & Insurance)",
  "Logistics & Supply Chain",
  "Retail & E-Commerce",
  "Professional Services",
  "Energy & Utilities",
  "Other",
];

const companySizes = [
  "20 – 100 Employees",
  "100 – 500 Employees",
  "500 – 3,000 Employees",
  "3,000 – 10,000 Employees",
  "10,000+ Employees",
];

const complianceChallenges = [
  "Regulatory Compliance Management",
  "Labour Law & Statutory Filings",
  "Environmental / EHS Compliance",
  "Data Privacy (DPDP / GDPR)",
  "Vendor & Third-Party Risk",
  "ESG / BRSR Reporting",
  "Cybersecurity & ISO 27001",
  "Internal Audit & Risk Management",
  "Accreditation (NABH / NABL / ISO)",
  "Multiple / All of the Above",
];

const trustPoints = [
  "15+ Enterprise Industries Served",
  "100+ Compliance Frameworks",
  "Zero Spam — Confidential Assessment",
];

export const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    industry: "",
    companySize: "",
    email: "",
    phone: "",
    complianceChallenge: "",
    preferredDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.industry) newErrors.industry = "Please select an industry";
    if (!formData.companySize) newErrors.companySize = "Please select company size";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    trackEvent("form_submit", "Compliance Assessment", {
      name: formData.name,
      email: formData.email,
      company: formData.companyName,
      industry: formData.industry,
      phone: formData.phone,
    });

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
            "Full Name": formData.name,
            "Email": formData.email,
            "Phone": formData.phone,
            "Company": formData.companyName,
            "Industry": formData.industry,
            "Company Size": formData.companySize,
            "Requirement": formData.complianceChallenge || "Free Compliance Assessment Request",
            "Preferred Date": formData.preferredDate || "Earliest Available",
            "Advisory Scope": "Free Compliance Assessment",
            "Source Page": window.location.pathname,
            "Lead Source": "Website Assessment Form",
            Timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("Lead submission error:", err);
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-white";
  const labelBase = "block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5";
  const errClass = "mt-1 text-[10px] font-bold text-red-500";

  return (
    <section id="lead-capture" className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: Value proposition */}
          <div className="lg:col-span-2 space-y-7 text-white">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Free Assessment
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Get Your Free{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Compliance Assessment
                </span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Our compliance experts will evaluate your current risk posture and deliver a personalized roadmap — at no cost.
              </p>
            </div>

            {/* What you'll get */}
            <div className="space-y-3">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                What you'll receive
              </div>
              {[
                "Personalized Compliance Risk Report",
                "Industry-Specific Regulatory Gap Analysis",
                "Priority Remediation Roadmap",
                "Expert Consultation (60 minutes)",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-sm text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              {trustPoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-400 font-semibold">{pt}</span>
                </div>
              ))}
            </div>

            {/* Contact alternative */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Or reach us directly
              </div>
              <a
                href="tel:+917338776611"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                +91 73387 76611
              </a>
              <a
                href="mailto:info@govenics.com"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                info@govenics.com
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-10 text-center space-y-5 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Assessment Request Submitted!
                </h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                  Our compliance experts will reach out within 24 hours to schedule your free consultation.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20"
                  >
                    Explore Our Services <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-2xl space-y-5"
              >
                <div className="pb-2">
                  <h3 className="text-xl font-black text-slate-900">
                    Start Your Compliance Journey
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Fill in the details below — it takes less than 2 minutes.
                  </p>
                </div>

                {/* Name + Company Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-name" className={labelBase}>
                      Full Name *
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.name ? "border-red-300 focus:ring-red-500/30 focus:border-red-500" : "border-slate-200"}`}
                    />
                    {errors.name && <p className={errClass}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-company" className={labelBase}>
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        id="lead-company"
                        name="companyName"
                        type="text"
                        placeholder="Your company"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`${inputBase} pl-10 ${errors.companyName ? "border-red-300" : "border-slate-200"}`}
                      />
                    </div>
                    {errors.companyName && <p className={errClass}>{errors.companyName}</p>}
                  </div>
                </div>

                {/* Industry + Company Size Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-industry" className={labelBase}>
                      Industry *
                    </label>
                    <div className="relative">
                      <select
                        id="lead-industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className={`${inputBase} appearance-none ${errors.industry ? "border-red-300" : "border-slate-200"}`}
                      >
                        <option value="">Select industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    {errors.industry && <p className={errClass}>{errors.industry}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-size" className={labelBase}>
                      Company Size *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        id="lead-size"
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        className={`${inputBase} pl-10 appearance-none ${errors.companySize ? "border-red-300" : "border-slate-200"}`}
                      >
                        <option value="">Select size</option>
                        {companySizes.map((sz) => (
                          <option key={sz} value={sz}>
                            {sz}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    {errors.companySize && <p className={errClass}>{errors.companySize}</p>}
                  </div>
                </div>

                {/* Email + Phone Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-email" className={labelBase}>
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        id="lead-email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputBase} pl-10 ${errors.email ? "border-red-300" : "border-slate-200"}`}
                      />
                    </div>
                    {errors.email && <p className={errClass}>{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className={labelBase}>
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        id="lead-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`${inputBase} pl-10 ${errors.phone ? "border-red-300" : "border-slate-200"}`}
                      />
                    </div>
                    {errors.phone && <p className={errClass}>{errors.phone}</p>}
                  </div>
                </div>

                {/* Compliance Challenge */}
                <div>
                  <label htmlFor="lead-challenge" className={labelBase}>
                    Primary Compliance Challenge
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      id="lead-challenge"
                      name="complianceChallenge"
                      value={formData.complianceChallenge}
                      onChange={handleChange}
                      className={`${inputBase} pl-10 appearance-none border-slate-200`}
                    >
                      <option value="">Select your main challenge</option>
                      {complianceChallenges.map((ch) => (
                        <option key={ch} value={ch}>
                          {ch}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="lead-date" className={labelBase}>
                    Preferred Consultation Date
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="lead-date"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`${inputBase} pl-10 border-slate-200`}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="lead-form-submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting Request..." : "Get Free Compliance Assessment"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[10px] text-slate-400 font-medium">
                  By submitting, you agree to our{" "}
                  <Link to="/privacy-policy" className="underline hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </Link>
                  . We will never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
