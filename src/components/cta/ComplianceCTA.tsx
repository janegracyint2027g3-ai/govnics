import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ClipboardList, MessageSquare, Users, ShieldCheck } from "lucide-react";

type CTAVariant = "services" | "risk" | "industries" | "companySize";

interface ComplianceCTAProps {
  variant: CTAVariant;
}

const ctaConfig = {
  services: {
    tag: "Expert Guidance",
    heading: "Need Help Choosing the Right Compliance Solution?",
    sub: "Get Expert Guidance Today.",
    icon: ClipboardList,
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-700",
    primary: { label: "Book Consultation", href: "/contact" },
    secondary: { label: "Talk To Our Experts", href: "/contact" },
  },
  risk: {
    tag: "Risk Assessment",
    heading: "Unsure Which Risks Affect Your Business?",
    sub: "Talk to Our Compliance Experts.",
    icon: ShieldCheck,
    gradientFrom: "from-slate-800",
    gradientTo: "to-slate-900",
    primary: { label: "Request Assessment", href: "#lead-capture" },
    secondary: { label: "Explore Compliance Solutions", href: "/services" },
  },
  industries: {
    tag: "Industry Expertise",
    heading: "Looking for Industry-Specific Compliance Solutions?",
    sub: "Our experts help enterprises build scalable compliance frameworks tailored to your sector.",
    icon: Users,
    gradientFrom: "from-indigo-600",
    gradientTo: "to-blue-700",
    primary: { label: "Book Industry Consultation", href: "/contact" },
    secondary: { label: "Get Started", href: "#lead-capture" },
  },
  companySize: {
    tag: "Enterprise Frameworks",
    heading: "Find the Right Compliance Framework for Your Organization.",
    sub: "Scalable GRC solutions designed for your operational maturity.",
    icon: Calendar,
    gradientFrom: "from-teal-700",
    gradientTo: "to-cyan-800",
    primary: { label: "Schedule Consultation", href: "/contact" },
    secondary: { label: "Request Info", href: "/contact" },
  },
};

export const ComplianceCTA = ({ variant }: ComplianceCTAProps) => {
  const cfg = ctaConfig[variant];
  const IconComp = cfg.icon;

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${cfg.gradientFrom} ${cfg.gradientTo} p-10 md:p-14 text-white shadow-2xl`}
        >
          {/* Background decorative blobs */}
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left: Content */}
            <div className="flex items-start gap-5 flex-1">
              <div className="p-3.5 bg-white/10 rounded-2xl border border-white/20 shrink-0 mt-0.5">
                <IconComp className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                  {cfg.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-black leading-tight text-white">
                  {cfg.heading}
                </h3>
                <p className="text-sm text-white/75 font-medium max-w-lg leading-relaxed">
                  {cfg.sub}
                </p>
              </div>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <Link to={cfg.primary.href}>
                <button
                  id={`cta-${variant}-primary`}
                  onClick={() => {
                    import("@/utils/analytics").then(({ trackEvent }) => {
                      trackEvent("click", "CTA Leads", {
                        action: `CTA Click - ${cfg.primary.label}`,
                        elementId: `cta-${variant}-primary`,
                        elementText: cfg.primary.label,
                        variant: variant,
                        targetUrl: cfg.primary.href
                      });
                    });
                  }}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg hover:scale-[1.02] w-full sm:w-auto whitespace-nowrap"
                >
                  {cfg.primary.label}
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </Link>
              <Link to={cfg.secondary.href}>
                <button
                  id={`cta-${variant}-secondary`}
                  onClick={() => {
                    import("@/utils/analytics").then(({ trackEvent }) => {
                      trackEvent("click", "CTA Leads", {
                        action: `CTA Click - ${cfg.secondary.label}`,
                        elementId: `cta-${variant}-secondary`,
                        elementText: cfg.secondary.label,
                        variant: variant,
                        targetUrl: cfg.secondary.href
                      });
                    });
                  }}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-[1.02] w-full sm:w-auto whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  {cfg.secondary.label}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
