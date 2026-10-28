import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { partnersSpicedSlides } from "@/data/spiced-slider-content";
import {
  Handshake, Award, Globe, Zap, ArrowRight,
  CheckCircle2, User, Mail, Building2, Phone,
  MapPin, MessageSquare, Send, X, ShieldCheck,
  TrendingUp, Users, Star, Clock, Target, Sparkles,
  ChevronLeft, ChevronRight, Quote
} from "lucide-react";


// ── Data ──────────────────────────────────────────────────────────────────────

const partnerTypes = [
  {
    icon: Handshake,
    title: "Technology Partners",
    description: "Integration partners for GRC software platforms, sensor telemetry, and cloud ecosystems.",
    count: "45+",
    color: "blue",
  },
  {
    icon: Award,
    title: "Certified Audit Partners",
    description: "Authorized third-party assessors, ISO registrars, and SOC 2 auditing agencies.",
    count: "25+",
    color: "indigo",
  },
  {
    icon: Globe,
    title: "Advisory Partners",
    description: "Consultancy collaborations with corporate legal bodies and regional regulators.",
    count: "15+",
    color: "violet",
  },
  {
    icon: Zap,
    title: "Innovation Partners",
    description: "Research collaborations for advanced AI governance models and Zero Trust designs.",
    count: "8",
    color: "sky",
  },
];

const stats = [
  { value: "93+", label: "Global Partners", icon: Users, suffix: "" },
  { value: "98", label: "Retention Rate", icon: TrendingUp, suffix: "%" },
  { value: "2.5", label: "Revenue Growth", icon: Star, suffix: "x" },
  { value: "72", label: "Onboarding Time", icon: Clock, suffix: "hr" },
  { value: "40", label: "Countries Served", icon: Globe, suffix: "+" },
  { value: "15", label: "Referral Commission", icon: Target, suffix: "%" },
];

const benefits = [
  "Access to enterprise client GRC pipeline",
  "Co-branded market collateral & risk studies",
  "Technical training on Govenics GRC frameworks",
  "Priority compliance support channel",
  "Revenue sharing & advisory commissions",
  "Joint compliance solution development",
  "Dedicated partner success manager",
  "Early access to new GRC product features",
];

const partnerDirectory = [
  {
    category: "Technology & SaaS",
    icon: "⚙️",
    description: "Continuous compliance telemetry and audit monitoring platform integrations.",
    color: "blue",
    brands: ["ServiceNow", "MetricStream", "VComply", "Persefoni", "Qualys"],
  },
  {
    category: "Audit & Certification Bodies",
    icon: "🏛️",
    description: "Authorized independent assessment registrars and compliance certifications.",
    color: "indigo",
    brands: ["Bureau Veritas (BV)", "SGS India", "DNV", "TÜV SÜD", "Intertek"],
  },
  {
    category: "Legal & Risk Advisory",
    icon: "⚖️",
    description: "Corporate legal consultants guiding regulatory disclosures and compliance briefs.",
    color: "violet",
    brands: ["Shardul Amarchand Mangaldas", "Cyril Amarchand Mangaldas", "Nishith Desai Associates", "J. Sagar Associates (JSA)", "Trilegal"],
  },
  {
    category: "Insurance & Risk Transfer",
    icon: "🛡️",
    description: "Risk assessment alignment to qualify for premium reductions and policies.",
    color: "sky",
    brands: ["Marsh McLennan", "Aon", "Howden Broking", "Willis Towers Watson (WTW)", "Lockton India"],
  },
  {
    category: "System Integrators & Consulting",
    icon: "🔗",
    description: "Implementation services scaling compliance automation platforms nationwide.",
    color: "teal",
    brands: ["TCS (Tata Consultancy Services)", "Infosys", "Wipro", "Deloitte India", "Grant Thornton India"],
  },
  {
    category: "Industry Associations",
    icon: "🏢",
    description: "Collaborative standard-setting groups guiding security and business frameworks.",
    color: "emerald",
    brands: ["DSCI (Data Security Council of India)", "NASSCOM", "CII (Confederation of Indian Industry)", "FICCI", "ASSOCHAM"],
  },
];

const testimonials = [
  {
    quote: "Partnering with Govenics gave our audit practice a seamless gap-analysis workflow. Our clients now achieve certification 40% faster.",
    author: "Rajesh Mehta",
    title: "Director of Certification",
    company: "Bureau Veritas India",
    initials: "RM",
    color: "blue",
  },
  {
    quote: "The referral program is exceptional — we simply connect our SME clients and Govenics handles the entire compliance journey while we earn recurring revenue.",
    author: "Priya Sharma",
    title: "Managing Partner",
    company: "Sharma & Associates CA Firm",
    initials: "PS",
    color: "indigo",
  },
  {
    quote: "Govenics enabled us to localize global cloud deployments for the Indian market with 100% CERT-In & DPDP compliance — a true force multiplier.",
    author: "Vikram Nair",
    title: "Delivery Head",
    company: "TCS Digital",
    initials: "VN",
    color: "violet",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Apply",
    description: "Submit your partnership inquiry with your organization profile and collaboration intent.",
    icon: Send,
  },
  {
    step: "02",
    title: "Review",
    description: "Our GRC partnership board evaluates your capabilities and alignment within 48 hours.",
    icon: Target,
  },
  {
    step: "03",
    title: "Align",
    description: "We co-define partnership scope, revenue model, and integration or referral workflows.",
    icon: Handshake,
  },
  {
    step: "04",
    title: "Launch",
    description: "Go live with co-branded collateral, training, and a dedicated partner success manager.",
    icon: Sparkles,
  },
];

const marqueeLogos = [
  "ServiceNow", "MetricStream", "VComply", "Qualys", "Persefoni",
  "Bureau Veritas", "SGS India", "DNV", "TÜV SÜD", "Intertek",
  "Marsh McLennan", "Aon", "Howden", "Lockton", "WTW",
  "TCS", "Infosys", "Wipro", "Deloitte", "Grant Thornton",
  "DSCI", "NASSCOM", "CII", "FICCI", "ASSOCHAM",
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:    { bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-600",    badge: "bg-blue-100 text-blue-700" },
  indigo:  { bg: "bg-indigo-50",  border: "border-indigo-200",  text: "text-indigo-600",  badge: "bg-indigo-100 text-indigo-700" },
  violet:  { bg: "bg-violet-50",  border: "border-violet-200",  text: "text-violet-600",  badge: "bg-violet-100 text-violet-700" },
  sky:     { bg: "bg-sky-50",     border: "border-sky-200",     text: "text-sky-600",     badge: "bg-sky-100 text-sky-700" },
  teal:    { bg: "bg-teal-50",    border: "border-teal-200",    text: "text-teal-600",    badge: "bg-teal-100 text-teal-700" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
};

// ── Animated Counter ───────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numericPart = parseFloat(value);
          const duration = 1500;
          const steps = 40;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericPart * eased;
            setDisplay(Number.isInteger(numericPart) ? Math.round(current).toString() : current.toFixed(1));
            if (step >= steps) clearInterval(interval);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function PartnersPage() {
  useEffect(() => {
    document.title = "Partner with GOVENICS | GRC Technology & Advisory Alliances";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Join the GOVENICS partner ecosystem. Explore technology integrations, certified audit alliances, legal referral partnerships, and risk advisory collaborations.";
    if (metaDesc) {
      metaDesc.setAttribute("content", descContent);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [activeDirectoryIdx, setActiveDirectoryIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", designation: "",
    phone: "", location: "", partnershipType: "", message: "", privacyConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const slides = partnersSpicedSlides;

  useEffect(() => {
    if (isDialogOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isDialogOpen]);

  // Auto-open partner form if navigated via #partner-form hash
  useEffect(() => {
    if (window.location.hash === "#partner-form") {
      setSuccess(false);
      setIsDialogOpen(true);
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Corporate Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.company.trim()) newErrors.company = "Company Name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    if (!formData.phone.trim()) newErrors.phone = "Contact Number is required";
    else if (formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = "Please enter a valid phone number";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.partnershipType) newErrors.partnershipType = "Please select partnership type";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.privacyConsent) newErrors.privacyConsent = "You must agree to the privacy policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheetName: "Partner_Applications",
            table: "Partner_Applications",
            "Full Name": formData.name,
            "Email": formData.email,
            "Company": formData.company,
            "Designation": formData.designation,
            "Phone": formData.phone,
            "Location": formData.location,
            "Partnership Type": formData.partnershipType,
            "Message": formData.message,
            "Source Page": "/partners",
            "Lead Source": "Partners Page — Alliance Application Form",
            "Lead Status": "New Application",
            "Timestamp": new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("Partner form submission error:", err);
      }
    }

    setIsSubmitting(false);
    setSuccess(true);
    setFormData({ name: "", email: "", company: "", designation: "", phone: "", location: "", partnershipType: "", message: "", privacyConsent: false });
  };

  return (
    <Layout noPadding={true}>
      <div className="bg-white pb-24 text-slate-600 relative overflow-x-hidden">

        {/* ── Hero Slider ──────────────────────────────────────────── */}
        <GrcSliderHero slides={slides} backLink={{ to: "/", label: "Back to Home" }} categoryLabel="Partnership Portal" showPrimaryCta={false} />

        {/* ── Animated Stats Bar ──────────────────────────────────── */}
        <section className="relative z-20 -mt-10">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 divide-x divide-slate-100">
                {stats.map((s, i) => (
                  <div key={i} className="text-center px-2 first:pl-0 last:pr-0">
                    <div className="w-9 h-9 mx-auto mb-2 rounded-xl bg-blue-50 flex items-center justify-center">
                      <s.icon style={{ width: 18, height: 18 }} className="text-blue-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 leading-none">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Marquee ─────────────────────────────────────────── */}
        <section className="py-10 border-y border-slate-100 bg-slate-50/60 overflow-hidden mt-12">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">Trusted by leading organizations worldwide</p>
          <div className="flex gap-0">
            {[0, 1].map(copy => (
              <div key={copy} className="flex gap-8 shrink-0 animate-marquee" style={{ animationDuration: "28s" }}>
                {marqueeLogos.map((logo, i) => (
                  <span key={i} className="inline-flex items-center px-5 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors whitespace-nowrap shadow-sm">
                    {logo}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── Partner Types + Dark Benefits Panel ─────────────────── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-14 items-start">

              {/* Left: Partner Types */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                    Advisory Network
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight font-heading">
                    Building a Secure Ecosystem Together
                  </h2>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mt-4">
                    Our partner network spans technology providers, certified audit bodies, and advisory leaders, enabling us to deliver end-to-end risk management and regulatory-compliant GRC solutions.
                  </p>
                </div>

                <div className="space-y-4">
                  {partnerTypes.map((partner, index) => {
                    const c = colorMap[partner.color];
                    return (
                      <div key={index} className={`group flex gap-4 items-start p-5 rounded-2xl border ${c.border} ${c.bg} hover:shadow-md transition-all duration-300 cursor-default`}>
                        <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border ${c.border}`}>
                          <partner.icon className={`w-6 h-6 ${c.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-extrabold text-slate-950 text-base">{partner.title}</h3>
                            <span className={`text-xl font-black ${c.text}`}>{partner.count}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">{partner.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => { setSuccess(false); setIsDialogOpen(true); }}
                    className="group bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/25 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm tracking-wide"
                  >
                    Become a Partner
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right: Dark Benefits */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 bg-gradient-to-br from-slate-900 to-blue-950 border border-blue-800/40 rounded-3xl p-8 shadow-2xl text-white space-y-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-[10px] font-black text-blue-300 uppercase tracking-widest border border-blue-500/30">
                    Partner Benefits
                  </span>
                  <h3 className="text-xl font-black font-heading">Why Partner With Govenics?</h3>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-xs text-blue-100 font-semibold leading-normal">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => { setSuccess(false); setIsDialogOpen(true); }}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  >
                    Apply for Partnership <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Partnership Process Timeline ─────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/40 border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                Onboarding Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">How the Partnership Works</h2>
              <p className="text-sm text-slate-500 font-semibold mt-3 max-w-xl mx-auto leading-relaxed">
                From your first inquiry to full go-live, our streamlined 4-step process ensures clarity and speed.
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-violet-200 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {processSteps.map((step, i) => (
                  <div key={i} className="group flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-200 shadow-lg flex items-center justify-center group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                        <step.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                        {step.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base">{step.title}</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Institutional Partner Directory ──────────────────────── */}
        <section className="py-20 border-t border-slate-100 bg-white">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Global Network
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                Institutional GRC Integrations & Advisory Partners
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                We integrate with leading SaaS compliance platforms, collaborate with certification bodies, and align with risk advisors to secure enterprise GRC operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerDirectory.map((group, idx) => {
                const c = colorMap[group.color];
                const isActive = activeDirectoryIdx === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveDirectoryIdx(idx)}
                    onMouseLeave={() => setActiveDirectoryIdx(null)}
                    className={`relative bg-white border rounded-3xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between cursor-default overflow-hidden ${isActive ? `${c.border} shadow-lg` : "border-slate-200/80"}`}
                  >
                    <div className={`absolute inset-0 ${c.bg} opacity-0 transition-opacity duration-300 ${isActive ? "opacity-100" : ""} rounded-3xl`} />
                    <div className="relative space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{group.icon}</span>
                        <h3 className={`font-black text-sm uppercase tracking-wide ${isActive ? c.text : "text-slate-900"} transition-colors`}>
                          {group.category}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{group.description}</p>
                    </div>
                    <div className="relative mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                      {group.brands.map((brand, bIdx) => (
                        <span key={bIdx} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${isActive ? c.badge : "bg-slate-50 border border-slate-200/80 text-slate-700"}`}>
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Testimonials Slider ───────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 border-t border-blue-900/30">
          <div className="container mx-auto px-6 max-w-4xl text-center space-y-10">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                Partner Voices
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">What Our Partners Say</h2>
            </div>

            <div className="relative min-h-[220px]">
              {testimonials.map((t, i) => {
                const c = colorMap[t.color];
                return (
                  <div key={i} className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${i === testimonialIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                    <Quote className="w-8 h-8 text-blue-500/40 mb-4" />
                    <p className="text-base sm:text-lg font-semibold text-blue-100 leading-relaxed max-w-2xl italic">"{t.quote}"</p>
                    <div className="flex items-center gap-3 mt-6">
                      <div className={`w-10 h-10 rounded-full ${c.badge} flex items-center justify-center text-sm font-black`}>{t.initials}</div>
                      <div className="text-left">
                        <div className="font-bold text-white text-sm">{t.author}</div>
                        <div className="text-[11px] text-blue-300 font-semibold">{t.title}, {t.company}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIdx ? "bg-blue-400 w-6" : "bg-blue-600/40 w-2"}`} />
              ))}
              <button onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-3xl text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Ready to Grow Together?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-heading leading-tight">
              Join the Govenics Partner Ecosystem
            </h2>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed max-w-xl mx-auto">
              Whether you're a SaaS platform, law firm, CA practice, or insurance broker — there's a partner tier designed for you. Apply today and get onboarded within 72 hours.
            </p>
            <button
              onClick={() => { setSuccess(false); setIsDialogOpen(true); }}
              className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-[1.03] transition-all text-sm tracking-wide"
            >
              <Handshake className="w-5 h-5" />
              Become a Partner
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* ── Modal Dialog ─────────────────────────────────────────── */}
        {isDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl max-h-[95vh] rounded-2xl sm:rounded-[2rem] border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

              <div className="flex-shrink-0 bg-gradient-to-r from-slate-900 to-blue-950 p-4 sm:p-5 flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-heading">
                    Join Our <span className="text-blue-400">Partner Network</span>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-semibold mt-0.5">
                    Fill out the form below. Our partnership advisors will contact you within 48 hours.
                  </p>
                </div>
                <button onClick={() => setIsDialogOpen(false)} className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4 sm:p-6">
                {success ? (
                  <div className="py-12 text-center max-w-lg mx-auto space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-950 font-heading">Application Submitted</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      Thank you. Your partnership application has been registered successfully. Our GRC partnership board will review your capabilities and get back to you shortly.
                    </p>
                    <button onClick={() => setIsDialogOpen(false)} className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg">
                      Close Portal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {[
                        { id: "name", label: "Full Name", icon: User, placeholder: "e.g. Sanjay Kumar", type: "text" },
                        { id: "email", label: "Corporate Email", icon: Mail, placeholder: "name@organization.com", type: "email" },
                        { id: "company", label: "Company Name", icon: Building2, placeholder: "e.g. Advisory Group", type: "text" },
                        { id: "designation", label: "Designation", icon: User, placeholder: "e.g. Managing Partner", type: "text" },
                      ].map(field => (
                        <div key={field.id} className="space-y-1">
                          <label htmlFor={field.id} className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <field.icon className="w-3.5 h-3.5 text-blue-600" />
                            {field.label} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type={field.type}
                            id={field.id}
                            value={(formData as unknown as Record<string, string>)[field.id]}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            placeholder={field.placeholder}
                            className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors[field.id] ? "border-red-500" : "border-slate-200"}`}
                          />
                          {errors[field.id] && <p className="text-[9px] text-red-500 font-bold">{errors[field.id]}</p>}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                      <div className="space-y-1">
                        <label htmlFor="phone" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-blue-600" /> Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} placeholder="+91 XXXX XXX XXX"
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors.phone ? "border-red-500" : "border-slate-200"}`}
                        />
                        {errors.phone && <p className="text-[9px] text-red-500 font-bold">{errors.phone}</p>}
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="location" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" /> Location <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="location" value={formData.location} onChange={handleInputChange} disabled={isSubmitting} placeholder="City, State"
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors.location ? "border-red-500" : "border-slate-200"}`}
                        />
                        {errors.location && <p className="text-[9px] text-red-500 font-bold">{errors.location}</p>}
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="partnershipType" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Handshake className="w-3.5 h-3.5 text-blue-600" /> Partnership Type <span className="text-red-500">*</span>
                        </label>
                        <select id="partnershipType" value={formData.partnershipType} onChange={handleInputChange} disabled={isSubmitting}
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-600 outline-none transition-all ${errors.partnershipType ? "border-red-500" : "border-slate-200"}`}
                        >
                          <option value="">Select Type</option>
                          <option value="Technology Partner">Technology Partner</option>
                          <option value="Certified Audit Partner">Certified Audit Partner</option>
                          <option value="Advisory Partner">Advisory Partner</option>
                          <option value="Innovation Partner">Innovation Partner</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.partnershipType && <p className="text-[9px] text-red-500 font-bold">{errors.partnershipType}</p>}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="message" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" /> Tell Us About Your Organization <span className="text-red-500">*</span>
                      </label>
                      <textarea id="message" rows={2} value={formData.message} onChange={handleInputChange} disabled={isSubmitting}
                        placeholder="Describe your organization, capabilities, certifications, and why you would like to partner with us..."
                        className={`w-full p-3 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none resize-none transition-all ${errors.message ? "border-red-500" : "border-slate-200"}`}
                      />
                      {errors.message && <p className="text-[9px] text-red-500 font-bold">{errors.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <input type="checkbox" id="privacyConsent" checked={formData.privacyConsent} onChange={handleCheckboxChange} disabled={isSubmitting}
                          className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="privacyConsent" className="text-[10px] text-slate-500 font-bold leading-normal cursor-pointer">
                          I agree to the{" "}<a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>{" "}and understand that Govenics requires verification of credentials.
                        </label>
                      </div>
                      {errors.privacyConsent && <p className="text-[9px] text-red-500 font-bold">{errors.privacyConsent}</p>}
                    </div>

                    <div className="flex justify-center pt-1">
                      <button type="submit" disabled={isSubmitting}
                        className="w-full h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Initiating Secure Connection..." : "Submit Application"}
                        {!isSubmitting && <Send className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mt-2.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure Submission • DPDP Act Compliant
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </Layout>
  );
}
