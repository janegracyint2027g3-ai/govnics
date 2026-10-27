import { useState, useRef } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Users,
  Video,
  Phone,
  ChevronDown,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { trackEvent } from "@/utils/analytics";

// ── Constants ────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Manufacturing",
  "Banking, Financial Services and Insurance (BFSI)",
  "Healthcare",
  "IT and Technology",
  "Logistics and Supply Chain",
  "Energy and Infrastructure",
  "Retail and Consumer Goods",
  "Construction and Real Estate",
  "Professional Services",
  "Other",
] as const;

const AREAS_OF_INTEREST = [
  "Governance, Risk and Compliance (GRC)",
  "Enterprise Risk Management",
  "Regulatory Compliance",
  "ESG and Sustainability",
  "Supply Chain Compliance",
  "Internal Audit and Assurance",
  "Governance and Policy Advisory",
  "Risk Assessment",
  "Other / Not Sure Yet",
] as const;

const DURATIONS = [
  { label: "15 min", value: "15" },
  { label: "30 min", value: "30" },
  { label: "45 min", value: "45" },
] as const;

const FORMATS = [
  { label: "Video Meeting", value: "video", icon: Video },
  { label: "Phone Call", value: "phone", icon: Phone },
] as const;

const TIME_SLOTS = [
  "09:00 AM IST",
  "10:00 AM IST",
  "11:00 AM IST",
  "12:00 PM IST",
  "02:00 PM IST",
  "03:00 PM IST",
  "04:00 PM IST",
  "05:00 PM IST",
];

const generateBookingRef = () =>
  "GOVNICS-SS-" +
  Date.now().toString(36).toUpperCase() +
  Math.random().toString(36).substring(2, 5).toUpperCase();

// ── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  businessEmail: string;
  company: string;
  jobTitle: string;
  phone: string;
  industry: string;
  areaOfInterest: string;
  businessObjective: string;
  preferredDate: string;
  timeSlot: string;
  duration: string;
  meetingFormat: string;
  privacyConsent: boolean;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

// ── Helpers ──────────────────────────────────────────────────────────────────

const getTodayISO = () => new Date().toISOString().split("T")[0];

const validate = (data: FormData): FieldErrors => {
  const errors: FieldErrors = {};
  if (!data.fullName.trim() || data.fullName.trim().length < 2)
    errors.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.businessEmail.trim()))
    errors.businessEmail = "Please enter a valid business email address.";
  if (!data.company.trim())
    errors.company = "Company / Organisation name is required.";
  if (!data.industry) errors.industry = "Please select your industry.";
  if (!data.areaOfInterest)
    errors.areaOfInterest = "Please select an area of interest.";
  if (
    !data.businessObjective.trim() ||
    data.businessObjective.trim().length < 20
  )
    errors.businessObjective =
      "Please describe your business objective (at least 20 characters).";
  if (data.businessObjective.trim().length > 1000)
    errors.businessObjective =
      "Please keep your description under 1000 characters.";
  if (!data.preferredDate) errors.preferredDate = "Please select a preferred date.";
  if (!data.timeSlot) errors.timeSlot = "Please select an available time slot.";
  if (!data.privacyConsent)
    errors.privacyConsent = "Please acknowledge the privacy notice to proceed.";
  return errors;
};

// ── Component ────────────────────────────────────────────────────────────────

export const StrategySessionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    businessEmail: "",
    company: "",
    jobTitle: "",
    phone: "",
    industry: "",
    areaOfInterest: "",
    businessObjective: "",
    preferredDate: "",
    timeSlot: "",
    duration: "30",
    meetingFormat: "video",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string>("");
  const [videoCallUrl, setVideoCallUrl] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  // ── Field helpers ──────────────────────────────────────────────────────────

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const inputClass = (field: keyof FormData) =>
    `w-full h-14 px-5 rounded-2xl bg-white border text-sm font-semibold text-slate-900 placeholder-slate-400 focus:ring-1 outline-none transition-all ${
      errors[field]
        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-400"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
    }`;

  const selectClass = (field: keyof FormData) =>
    `w-full h-14 px-5 rounded-2xl bg-white border text-sm font-semibold text-slate-600 focus:ring-1 outline-none transition-all appearance-none ${
      errors[field]
        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-400"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
    }`;

  // ── Submit handler ─────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const fieldErrors = validate(formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const firstError = formRef.current?.querySelector("[data-error]");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);

    trackEvent("form_submit", "Strategy Session", {
      formName: "StrategySession",
      action: "submission_attempted",
      industry: formData.industry,
      areaOfInterest: formData.areaOfInterest,
    });

    const ref = generateBookingRef();
    const timestamp = new Date().toISOString();
    const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;

    // Generate dedicated Google Meet room link for video sessions
    const generatedMeetCode = "gov-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 5);
    const videoCallLink = `https://meet.google.com/${generatedMeetCode}`;

    const payload = {
      table: "Strategy Session Bookings",
      sheetName: "Strategy Session Bookings",
      "Booking Reference": ref,
      "Full Name": formData.fullName.trim(),
      "Business Email": formData.businessEmail.trim(),
      "Company": formData.company.trim(),
      "Job Title": formData.jobTitle.trim() || "—",
      "Phone": formData.phone.trim() || "—",
      "Industry": formData.industry,
      "Area of Interest": formData.areaOfInterest,
      "Business Objective": formData.businessObjective.trim(),
      "Preferred Date": formData.preferredDate,
      "Time Slot": formData.timeSlot,
      "Time Zone": "IST (UTC+5:30)",
      "Duration (min)": formData.duration,
      "Meeting Format":
        formData.meetingFormat === "video" ? "Video Meeting" : "Phone Call",
      "Video Call Link": videoCallLink,
      "Booking Status": "Confirmed",
      "Source": "Book a Strategy Session",
      "Timestamp": timestamp,
    };

    try {
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setBookingRef(ref);
      setVideoCallUrl(videoCallLink);
      setSubmitted(true);

      trackEvent("form_submit", "Strategy Session", {
        formName: "StrategySession",
        action: "booking_confirmed",
        bookingRef: ref,
        name: formData.fullName,
        email: formData.businessEmail,
        company: formData.company,
        industry: formData.industry,
        areaOfInterest: formData.areaOfInterest,
        preferredDate: formData.preferredDate,
        timeSlot: formData.timeSlot,
        duration: formData.duration,
        meetingFormat: formData.meetingFormat,
        message: formData.businessObjective,
      });
    } catch {
      setSubmitError(
        "We encountered a network issue while processing your request. Please try again, or email us directly at contact@govenics.grc."
      );
      trackEvent("form_submit", "Strategy Session", {
        formName: "StrategySession",
        action: "booking_failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success State ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-10 bg-white border border-emerald-200 rounded-3xl text-center space-y-6 animate-fade-in shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 font-heading">
            Strategy Session Request Submitted
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium max-w-lg mx-auto">
            Your strategy session request has been submitted successfully. Your
            appointment details and confirmation will be sent to your email once
            the booking is confirmed.
          </p>
        </div>

        {bookingRef && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
              Booking Ref:
            </span>
            <span className="text-xs font-bold text-blue-600">{bookingRef}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs pt-2">
          {[
            { label: "Date", value: formData.preferredDate },
            { label: "Time", value: formData.timeSlot },
            {
              label: "Format",
              value:
                formData.meetingFormat === "video"
                  ? "Video Meeting"
                  : "Phone Call",
            },
            { label: "Duration", value: `${formData.duration} minutes` },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {item.label}
                </div>
                <div className="font-bold text-slate-800">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {videoCallUrl && formData.meetingFormat === "video" && (
          <div className="p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 rounded-2xl text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <Video className="w-4 h-4" /> Your Video Call Meeting Link
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Active & Reserved
              </span>
            </div>
            <p className="text-xs text-slate-600">
              A copy of this link and confirmation details have also been dispatched to{" "}
              <strong className="text-slate-900">{formData.businessEmail}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href={videoCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
              >
                <Video className="w-4 h-4" /> Join Video Meeting
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(videoCallUrl);
                  alert("Video Call link copied to clipboard!");
                }}
                className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}

        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Secure submission — DPDP Act Compliant
        </p>

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              fullName: "",
              businessEmail: "",
              company: "",
              jobTitle: "",
              phone: "",
              industry: "",
              areaOfInterest: "",
              businessObjective: "",
              preferredDate: "",
              timeSlot: "",
              duration: "30",
              meetingFormat: "video",
              privacyConsent: false,
            });
            setErrors({});
            setBookingRef("");
          }}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-blue-500/20"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* ── Section A: Contact Information ─────────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-black">A</span>
          </div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
            Contact Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5" data-error={errors.fullName ? "true" : undefined}>
            <label
              htmlFor="ss-fullName"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="ss-fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. Sanjay Kumar"
              value={formData.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              className={inputClass("fullName")}
              aria-describedby={errors.fullName ? "err-fullName" : undefined}
            />
            {errors.fullName && (
              <p id="err-fullName" className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.fullName}
              </p>
            )}
          </div>

          <div className="space-y-1.5" data-error={errors.businessEmail ? "true" : undefined}>
            <label
              htmlFor="ss-email"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
            >
              Business Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="ss-email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@organisation.com"
              value={formData.businessEmail}
              onChange={(e) => set("businessEmail", e.target.value)}
              className={inputClass("businessEmail")}
              aria-describedby={errors.businessEmail ? "err-businessEmail" : undefined}
            />
            {errors.businessEmail && (
              <p id="err-businessEmail" className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.businessEmail}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5" data-error={errors.company ? "true" : undefined}>
            <label
              htmlFor="ss-company"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
            >
              Company / Organisation <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="ss-company"
                type="text"
                required
                autoComplete="organization"
                placeholder="e.g. Apex Logistics Pvt. Ltd."
                value={formData.company}
                onChange={(e) => set("company", e.target.value)}
                className={inputClass("company") + " pl-11"}
                aria-describedby={errors.company ? "err-company" : undefined}
              />
            </div>
            {errors.company && (
              <p id="err-company" className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.company}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="ss-jobTitle"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
            >
              Job Title / Role{" "}
              <span className="text-slate-300 font-medium normal-case tracking-normal">
                (optional)
              </span>
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="ss-jobTitle"
                type="text"
                autoComplete="organization-title"
                placeholder="e.g. CEO, Compliance Manager"
                value={formData.jobTitle}
                onChange={(e) => set("jobTitle", e.target.value)}
                className={inputClass("jobTitle") + " pl-11"}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="ss-phone"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
            >
              Phone Number{" "}
              <span className="text-slate-300 font-medium normal-case tracking-normal">
                (optional)
              </span>
            </label>
            <input
              id="ss-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 XXXX XXX XXX"
              value={formData.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputClass("phone")}
            />
          </div>
        </div>
      </div>

      {/* ── Section B: Business Requirements ───────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-black">B</span>
          </div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
            Business Requirements
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5" data-error={errors.industry ? "true" : undefined}>
            <label
              htmlFor="ss-industry"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
            >
              Industry <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                id="ss-industry"
                required
                value={formData.industry}
                onChange={(e) => set("industry", e.target.value)}
                className={selectClass("industry")}
                aria-describedby={errors.industry ? "err-industry" : undefined}
              >
                <option value="">Select Industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.industry && (
              <p id="err-industry" className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.industry}
              </p>
            )}
          </div>

          <div className="space-y-1.5" data-error={errors.areaOfInterest ? "true" : undefined}>
            <label
              htmlFor="ss-areaOfInterest"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
            >
              Area of Interest <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                id="ss-areaOfInterest"
                required
                value={formData.areaOfInterest}
                onChange={(e) => set("areaOfInterest", e.target.value)}
                className={selectClass("areaOfInterest")}
                aria-describedby={
                  errors.areaOfInterest ? "err-areaOfInterest" : undefined
                }
              >
                <option value="">Select Area of Interest</option>
                {AREAS_OF_INTEREST.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.areaOfInterest && (
              <p id="err-areaOfInterest" className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                <AlertCircle className="w-3 h-3 shrink-0" />{" "}
                {errors.areaOfInterest}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5" data-error={errors.businessObjective ? "true" : undefined}>
          <label
            htmlFor="ss-businessObjective"
            className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
          >
            What would you like to achieve from this strategy session?{" "}
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="ss-businessObjective"
            required
            maxLength={1000}
            placeholder="Briefly describe your business challenges, compliance priorities, goals, or the support you are looking for."
            value={formData.businessObjective}
            onChange={(e) => set("businessObjective", e.target.value)}
            className={`w-full h-36 p-5 rounded-2xl bg-white border text-sm font-semibold text-slate-900 placeholder-slate-400 focus:ring-1 outline-none transition-all resize-none ${
              errors.businessObjective
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-400"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            }`}
            aria-describedby={
              errors.businessObjective ? "err-businessObjective" : undefined
            }
          />
          <div className="flex items-center justify-between">
            {errors.businessObjective ? (
              <p id="err-businessObjective" className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                <AlertCircle className="w-3 h-3 shrink-0" />{" "}
                {errors.businessObjective}
              </p>
            ) : (
              <span />
            )}
            <span
              className={`text-[10px] font-medium ml-auto ${
                formData.businessObjective.length > 950
                  ? "text-rose-500"
                  : "text-slate-400"
              }`}
            >
              {formData.businessObjective.length}/1000
            </span>
          </div>
        </div>
      </div>

      {/* ── Section C: Meeting Preferences ─────────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-black">C</span>
          </div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
            Meeting Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5" data-error={errors.preferredDate ? "true" : undefined}>
            <label
              htmlFor="ss-date"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"
            >
              Preferred Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="ss-date"
                type="date"
                required
                min={getTodayISO()}
                value={formData.preferredDate}
                onChange={(e) => {
                  set("preferredDate", e.target.value);
                  set("timeSlot", "");
                }}
                className={inputClass("preferredDate") + " pl-11 cursor-pointer"}
                aria-describedby={
                  errors.preferredDate ? "err-preferredDate" : undefined
                }
              />
            </div>
            {errors.preferredDate && (
              <p id="err-preferredDate" className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                <AlertCircle className="w-3 h-3 shrink-0" />{" "}
                {errors.preferredDate}
              </p>
            )}
          </div>

          <div className="space-y-1.5" data-error={errors.timeSlot ? "true" : undefined}>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
              Available Time Slot <span className="text-rose-500">*</span>
            </label>
            {!formData.preferredDate ? (
              <div className="h-14 flex items-center px-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-400 font-semibold">
                <Clock className="w-4 h-4 mr-2 text-slate-300" />
                Select a date first
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => set("timeSlot", slot)}
                    aria-pressed={formData.timeSlot === slot}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 border ${
                      formData.timeSlot === slot
                        ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-400/50 hover:bg-blue-50/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
            {errors.timeSlot && (
              <p id="err-timeSlot" className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.timeSlot}
              </p>
            )}
            {formData.timeSlot && (
              <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                <Clock className="w-3.5 h-3.5" />
                Selected: {formData.timeSlot}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Meeting Duration
            </span>
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => set("duration", d.value)}
                  aria-pressed={formData.duration === d.value}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 border ${
                    formData.duration === d.value
                      ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-400/50"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Meeting Format
            </span>
            <div className="flex gap-2">
              {FORMATS.map((f) => {
                const Icon = f.icon;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => set("meetingFormat", f.value)}
                    aria-pressed={formData.meetingFormat === f.value}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 border ${
                      formData.meetingFormat === f.value
                        ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-400/50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {f.label}
                  </button>
                );
              })}
            </div>
            {formData.meetingFormat === "phone" && !formData.phone.trim() && (
              <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                Please add your phone number above for a call-back.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Privacy Consent ─────────────────────────────────────────────────── */}
      <div
        className={`p-4 rounded-2xl border ${
          errors.privacyConsent
            ? "border-rose-300 bg-rose-50/40"
            : "border-slate-200 bg-slate-50"
        }`}
        data-error={errors.privacyConsent ? "true" : undefined}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            id="ss-privacyConsent"
            checked={formData.privacyConsent}
            onChange={(e) => set("privacyConsent", e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
            aria-describedby={
              errors.privacyConsent ? "err-privacyConsent" : undefined
            }
          />
          <span className="text-xs text-slate-600 font-medium leading-relaxed">
            I acknowledge that GOVENICS will process my information to arrange
            and manage this strategy session. My data will be handled in
            accordance with the{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold underline hover:text-blue-700"
            >
              GOVENICS Privacy Policy
            </a>
            . I consent to being contacted regarding my consultation request.{" "}
            <span className="text-rose-500">*</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p
            id="err-privacyConsent"
            className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold mt-2 pl-7"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />{" "}
            {errors.privacyConsent}
          </p>
        )}
      </div>

      {/* ── Submit Error ────────────────────────────────────────────────────── */}
      {submitError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p className="text-xs text-rose-700 font-semibold leading-relaxed">
            {submitError}
          </p>
        </div>
      )}

      {/* ── Submit Button ───────────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={submitting}
        id="strategy-session-submit-btn"
        className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting your request…</span>
          </>
        ) : (
          <>
            <Calendar className="w-5 h-5" />
            <span>Book Strategy Session</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        End-to-end encrypted &bull; DPDP Act Compliant &bull; Zero Spam
      </p>
    </form>
  );
};
