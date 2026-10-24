import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { 
  Handshake, Award, Globe, Zap, ArrowRight, 
  CheckCircle2, User, Mail, Building2, Phone, 
  MapPin, MessageSquare, Send, X, ShieldCheck 
} from "lucide-react";

import heroVerify from "@/assets/hero-verify.jpg";
import heroCommand from "@/assets/command_center_1.jpg";
import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import heroSoc from "@/assets/hero-soc.jpg";
import heroDrone from "@/assets/hero-drone.jpg";
import verticalsFacility from "@/assets/verticals-facility.jpg";
import { trackEvent } from "@/utils/analytics";

const partnerTypes = [
  {
    icon: Handshake,
    title: "Technology Partners",
    description: "Integration partners for GRC software platforms, sensor telemetry, and cloud ecosystems.",
    count: "45+",
  },
  {
    icon: Award,
    title: "Certified Audit Partners",
    description: "Authorized third-party assessors, ISO registrars, and SOC 2 auditing agencies.",
    count: "25+",
  },
  {
    icon: Globe,
    title: "Advisory Partners",
    description: "Consultancy collaborations with corporate legal bodies and regional regulators.",
    count: "15+",
  },
  {
    icon: Zap,
    title: "Innovation Partners",
    description: "Research collaborations for advanced AI governance models and Zero Trust designs.",
    count: "8",
  },
];

const benefits = [
  "Access to enterprise client GRC pipeline",
  "Co-branded market collateral & risk studies",
  "Technical training on Govenics GRC frameworks",
  "Priority compliance support channel",
  "Revenue sharing & advisory commissions",
  "Joint compliance solution development",
];

export default function PartnersPage() {
  useEffect(() => {
    document.title = "Partner with GOVENICS | GRC Technology & Advisory Alliances";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Join the GOVENICS partner ecosystem. Explore technology integrations, certified audit alliances, legal referral partnerships, and risk advisory collaborations.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    designation: "",
    phone: "",
    location: "",
    partnershipType: "",
    message: "",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const slides = [
    {
      badge: "GRC Integration",
      title: "Your Platform Is Powerful.",
      highlight: "Our Implementation Makes It Unstoppable.",
      description: "Integrate your GRC or Carbon accounting SaaS with our deep domain expertise to deploy client implementations 2x faster with 10x higher satisfaction.",
      outcome: "Deploy client implementations 2x faster with near-zero churn",
      icp: "Product Heads in SaaS Companies (ServiceNow, VComply, MetricStream)",
      cta: "Partner With Us",
      image: heroIntegration,
    },
    {
      badge: "Audit Alliance",
      title: "You Certify. We Prepare.",
      highlight: "Together, We Win.",
      description: "Partner with us for gap analysis and implementation; you provide the final certification stamp—creating a seamless client journey from audit to approval.",
      outcome: "Increase certification throughput by 50% and client retention",
      icp: "Audit Leads at BV, SGS, DNV, TÜV",
      cta: "Collaborate Now",
      image: heroVerify,
    },
    {
      badge: "Legal Referral",
      title: "Complex Litigation Up. Operational Compliance Down.",
      highlight: "We Bridge Both.",
      description: "Refer complex litigations to top law firms while they send operational compliance work to us—creating a high-value B2B referral flywheel.",
      outcome: "Generate high-value B2B referral leads with zero conflict",
      icp: "Senior Partners at Top 50 Law Firms",
      cta: "Join the Network",
      image: heroCommand,
    },
    {
      badge: "Cyber Insurance",
      title: "Better Audits. Lower Premiums.",
      highlight: "Happier Clients.",
      description: "Use our cyber audits to underwrite policies faster, reduce claims rejection rates, and deliver measurable risk reduction to your insureds.",
      outcome: "Lower client policy premiums by 20% and improve loss ratios",
      icp: "Brokers at Marsh, Aon, Howden, Lockton",
      cta: "Drive Premiums Down",
      image: heroSoc,
    },
    {
      badge: "EXIM Localisation",
      title: "You Deploy Globally.",
      highlight: "We Localize Legally.",
      description: "We handle the complex Indian compliance (CERT-In, DPDP, Labour Codes) post your global cloud deployments—ensuring 100% localized compliance for your clients.",
      outcome: "Ensure 100% localized compliance and accelerate India market entry",
      icp: "Delivery Heads at TCS, Infosys, Wipro, Accenture",
      cta: "Integrate Together",
      image: heroIntegration,
    },
    {
      badge: "PE/VC Operations",
      title: "Fix the Operations. Boost the Valuation.",
      highlight: "Exit Higher.",
      description: "Act as the operational fixer for portfolio companies to boost their ESG and GRC valuations before the next funding round or exit.",
      outcome: "Increase portfolio valuation by 15% and accelerate exits",
      icp: "Deal Partners at Private Equity & VC Firms",
      cta: "Fix Portfolios",
      image: heroAiDriven,
    },
    {
      badge: "CA Advisory",
      title: "Your Clients Have Compliance Headaches.",
      highlight: "We Have the Aspirin. You Keep the Revenue.",
      description: "Monetize your client base by referring their operational labor law and payroll challenges to us—earning passive income while solving their pain.",
      outcome: "Earn 15% recurring referral revenue with zero operational burden",
      icp: "Managing Partners at CA Firms & Consulting Practices",
      cta: "Earn Referrals",
      image: verticalsFacility,
    },
    {
      badge: "Thought Leadership",
      title: "Co-Create Authority. Co-Host Influence.",
      highlight: "Co-Own the Market.",
      description: "Co-author whitepapers and host joint webinars with industry bodies like DSCI, CII, and NASSCOM—positioning your brand as a thought leader.",
      outcome: "Gain access to 10,000+ CxO contacts and build authority",
      icp: "Board Members at CII, FICCI, DSCI, NASSCOM",
      cta: "Co-Create With Us",
      image: heroDrone,
    }
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isDialogOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDialogOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Corporate Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) newErrors.company = "Company Name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Contact Number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.partnershipType) newErrors.partnershipType = "Please select partnership type";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.privacyConsent) newErrors.privacyConsent = "You must agree to the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Log Partner Form submit event to GRC analytics
    trackEvent("form_submit", "General", {
      formName: "PartnerForm",
      name: formData.name,
      email: formData.email,
      company: formData.company,
      designation: formData.designation,
      phone: formData.phone,
      location: formData.location,
      partnershipType: formData.partnershipType,
      message: formData.message
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        designation: "",
        phone: "",
        location: "",
        partnershipType: "",
        message: "",
        privacyConsent: false,
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="bg-white pb-24 text-slate-600 relative">
        {/* Panel 1: Hero Slider */}
        <GrcSliderHero slides={slides} backLink={{ to: "/", label: "Back to Home" }} categoryLabel="Partnership Portal" />

        {/* Panel 2: Main Ecosystem Section */}
        <section className="py-16 relative overflow-hidden bg-white -mt-16 z-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Ecosystem info (7 cols) */}
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

                {/* Partner Types Grid */}
                <div className="space-y-4">
                  {partnerTypes.map((partner, index) => (
                    <div
                      key={index}
                      className="group flex gap-4 items-start p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-105 transition-all duration-300">
                        <partner.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-slate-950 text-base">{partner.title}</h3>
                          <span className="text-xl font-black text-blue-600">{partner.count}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">{partner.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Open Modal Trigger */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setIsDialogOpen(true);
                    }}
                    className="group bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/25 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm tracking-wide"
                  >
                    Become a Partner
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Benefits Sidebar (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-28 bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    Partner Benefits
                  </div>

                  <h3 className="text-xl font-black text-slate-950 font-heading">
                    Why Partner With Govenics?
                  </h3>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="text-xs text-slate-700 font-semibold leading-normal">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 p-5 bg-white border border-slate-200 rounded-2xl">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-black text-blue-600">98%</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Retention</div>
                    </div>
                    <div className="text-center border-x border-slate-100">
                      <div className="text-xl sm:text-2xl font-black text-blue-600">2.5x</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-black text-blue-600">72hr</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Onboarding</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Panel 3: GRC Integrations & Advisory Network Directory */}
        <section className="py-16 border-t border-slate-100 bg-slate-50/40 text-left">
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
              {[
                {
                  category: "Technology & SaaS",
                  description: "Continuous compliance telemetry and audit monitoring platform integrations.",
                  brands: ["ServiceNow", "MetricStream", "VComply", "Persefoni", "Qualys"]
                },
                {
                  category: "Audit & Certification Bodies",
                  description: "Authorized independent assessment registrars and compliance certifications.",
                  brands: ["Bureau Veritas (BV)", "SGS India", "DNV", "TÜV SÜD", "Intertek"]
                },
                {
                  category: "Legal & Risk Advisory",
                  description: "Corporate legal consultants guiding regulatory disclosures and compliance briefs.",
                  brands: ["Shardul Amarchand Mangaldas", "Cyril Amarchand Mangaldas", "Nishith Desai Associates", "J. Sagar Associates (JSA)", "Trilegal"]
                },
                {
                  category: "Insurance & Risk Transfer",
                  description: "Risk assessment alignment to qualify for premium reductions and policies.",
                  brands: ["Marsh McLennan", "Aon", "Howden Broking", "Willis Towers Watson (WTW)", "Lockton India"]
                },
                {
                  category: "System Integrators & Consulting",
                  description: "Implementation services scaling compliance automation platforms nationwide.",
                  brands: ["TCS (Tata Consultancy Services)", "Infosys", "Wipro", "Deloitte India", "Grant Thornton India"]
                },
                {
                  category: "Industry Associations",
                  description: "Collaborative standard-setting groups guiding security and business frameworks.",
                  brands: ["DSCI (Data Security Council of India)", "NASSCOM", "CII (Confederation of Indian Industry)", "FICCI", "ASSOCHAM"]
                }
              ].map((group, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-blue-500/35 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h3 className="font-black text-slate-900 text-sm uppercase tracking-wide border-l-2 border-blue-500 pl-2.5">
                      {group.category}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-semibold leading-relaxed pl-3">
                      {group.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                    {group.brands.map((brand, bIdx) => (
                      <span 
                        key={bIdx} 
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 text-slate-700 hover:border-blue-500/40 hover:bg-blue-50/40 text-[10px] font-bold rounded-lg transition-all cursor-default"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal Dialog Overlay */}
        {isDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm transition-all duration-300 opacity-100">
            <div className="bg-white w-full max-w-4xl max-h-[95vh] rounded-2xl sm:rounded-[2rem] border border-slate-200 shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
              
              {/* Header */}
              <div className="flex-shrink-0 bg-slate-50 border-b border-slate-200/80 p-4 sm:p-5 flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-950 font-heading">
                    Join Our <span className="text-blue-600">Partner Network</span>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                    Fill out the form below. Our partnership advisors will contact you within 48 hours.
                  </p>
                </div>
                <button 
                  onClick={() => setIsDialogOpen(false)} 
                  className="p-1.5 sm:p-2 rounded-full hover:bg-slate-200/80 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Container (no scroll) */}
              <div className="flex-grow overflow-hidden p-4 sm:p-6">
                {success ? (
                  <div className="py-8 text-center max-w-lg mx-auto space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-950 font-heading">Application Submitted</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      Thank you. Your partnership application has been registered successfully. Our GRC partnership board will review your capabilities and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-blue-500/20"
                    >
                      Close Portal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Row 1: Personal & Company Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div className="space-y-1">
                        <label htmlFor="name" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="e.g. Sanjay Kumar"
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.name && <p className="text-[9px] text-red-500 font-bold">{errors.name}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="email" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-blue-600" />
                          Corporate Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="name@organization.com"
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.email && <p className="text-[9px] text-red-500 font-bold">{errors.email}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="company" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-blue-600" />
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="e.g. Advisory Group"
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors.company ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.company && <p className="text-[9px] text-red-500 font-bold">{errors.company}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="designation" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                          Designation <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="e.g. Managing Partner"
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors.designation ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.designation && <p className="text-[9px] text-red-500 font-bold">{errors.designation}</p>}
                      </div>
                    </div>

                    {/* Row 2: Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                      <div className="space-y-1">
                        <label htmlFor="phone" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-blue-600" />
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="+91 XXXX XXX XXX"
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.phone && <p className="text-[9px] text-red-500 font-bold">{errors.phone}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="location" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="City, State"
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none transition-all ${errors.location ? 'border-red-500' : 'border-slate-200'}`}
                        />
                        {errors.location && <p className="text-[9px] text-red-500 font-bold">{errors.location}</p>}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="partnershipType" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Handshake className="w-3.5 h-3.5 text-blue-600" />
                          Partnership Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="partnershipType"
                          value={formData.partnershipType}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className={`w-full h-9 sm:h-10 px-3.5 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-600 outline-none transition-all select-light-theme ${errors.partnershipType ? 'border-red-500' : 'border-slate-200'}`}
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

                    {/* Message Field */}
                    <div className="space-y-1">
                      <label htmlFor="message" className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                        Tell Us About Your Organization <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={2}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="Describe your organization, capabilities, certifications, and why you would like to partner with us..."
                        className={`w-full p-3 bg-slate-50 border rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-semibold text-slate-900 outline-none resize-none transition-all ${errors.message ? 'border-red-500' : 'border-slate-200'}`}
                      ></textarea>
                      {errors.message && <p className="text-[9px] text-red-500 font-bold">{errors.message}</p>}
                    </div>

                    {/* Consent checkbox */}
                    <div className="space-y-1">
                      <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <input
                          type="checkbox"
                          id="privacyConsent"
                          checked={formData.privacyConsent}
                          onChange={handleCheckboxChange}
                          disabled={isSubmitting}
                          className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="privacyConsent" className="text-[10px] text-slate-500 font-bold leading-normal cursor-pointer">
                          I agree to the{" "}
                          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                          {" "}and understand that Govenics requires verification of credentials.
                        </label>
                      </div>
                      {errors.privacyConsent && <p className="text-[9px] text-red-500 font-bold">{errors.privacyConsent}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
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
    </Layout>
  );
}
