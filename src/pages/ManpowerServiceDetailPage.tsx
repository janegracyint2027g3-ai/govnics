import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { manpowerServicesData } from "@/data/manpower-services-data";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { GrcStatCards, type GrcStatCardItem } from "@/components/ui/GrcStatCards";
import { GrcCarousel } from "@/components/ui/GrcCarousel";
import { 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Briefcase, 
  Settings, 
  ArrowRight,
  Target,
  Clock,
  Award,
  Users
} from "lucide-react";
import heroVerify from "@/assets/hero-verify.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import heroCommand from "@/assets/command_center_1.jpg";

export default function ManpowerServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();

  // Find target service
  const service = manpowerServicesData.find((serv) => serv.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (service) {
      document.title = `${service.heroTitle} | Managed Staffing — GOVENICS`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const descContent = `${service.shortDescription} Risk-compliant staffing and operational workforce solutions across India with GOVENICS.`;
      if (metaDesc) {
        metaDesc.setAttribute('content', descContent);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = descContent;
        document.head.appendChild(meta);
      }
    }
  }, [serviceId, service]);

  if (!service) {
    return <Navigate to="/staffing" replace />;
  }

  // Dynamic Hero Slides
  const heroSlides = [
    {
      badge: "Managed Staffing Practice",
      title: service.heroTitle,
      highlight: "Specialized Talent Delivery",
      description: service.shortDescription,
      image: heroVerify,
      icp: "Enterprises, Plants & GCCs",
      outcome: "100% Statutory Compliance & Verified Talent",
      cta: "Submit Hiring Mandate"
    },
    {
      badge: "Zero-Risk Hiring",
      title: "100% Statutory Alignment &",
      highlight: "Payroll Compliance",
      description: service.overview,
      image: heroIntegration,
      icp: "CHROs, Plant Heads & Operations Directors",
      outcome: "Full EPF, ESIC, Bonus & Minimum Wage Adherence",
      cta: "Schedule Talent Discovery"
    },
    {
      badge: "Rapid Turnaround",
      title: "5-Phase Technical &",
      highlight: "Behavioral Vetting",
      description: "Rigorous job profiling, headhunting passive markets, and in-depth credential checks with a full 90-day replacement guarantee.",
      image: heroCommand,
      icp: "High-Growth Technical & Operations Teams",
      outcome: "14-Day Average Sourcing-to-Offer TAT",
      cta: "Explore Screening Model"
    }
  ];

  // Dynamic Statistics Grid
  const stats: GrcStatCardItem[] = [
    { value: "98.5", suffix: "%", label: "Talent Placement Success", icon: Users, badge: "Quality", description: "First-year retention rate across core client placements" },
    { value: "0", label: "Statutory Co-Employment Risk", icon: ShieldCheck, badge: "Shield", description: "Zero co-employment liability backed by legal indemnification" },
    { value: "14", suffix: " Days", label: "Average Sourcing TAT", icon: Clock, badge: "Velocity", description: "From client mandate sign-off to first vetted shortlist" },
    { value: "90", suffix: " Days", label: "Replacement Guarantee", icon: Award, badge: "Assurance", description: "Unconditional free candidate replacement within 90 days" }
  ];

  const serviceCards = service.keyServices.map((ks, idx) => (
    <div key={idx} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:border-blue-500/30 transition-all hover:shadow-md flex items-center gap-4 text-left">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <Settings className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-sm font-black text-slate-800">{ks}</h3>
    </div>
  ));

  return (
    <Layout noPadding={true}>
      <div className="bg-slate-50 min-h-screen pb-24 text-slate-600">
        
        {/* Panel 1: Hero Carousel Slider */}
        <GrcSliderHero 
          slides={heroSlides} 
          backLink={{ to: "/staffing", label: "Back to Staffing Portal" }} 
          categoryLabel="Staffing Practice"
        />

        {/* Panel 2: Statistics Grid Cards */}
        <GrcStatCards stats={stats} />

        {/* Overview & Why Choose Us */}
        <section className="py-16 bg-white border-b border-slate-200/50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Overview
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
                  {service.overview}
                </p>
              </div>
              <div className="space-y-6 bg-slate-50 border border-slate-200/80 rounded-3xl p-8">
                <h2 className="text-lg font-black text-slate-900 font-heading flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Why Choose Us
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {service.whyChooseUs.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-bold">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Services & Industries Served */}
        <section className="py-20 bg-slate-50/50 border-b border-slate-200/50">
          <div className="container mx-auto px-6 max-w-7xl space-y-20">
            
            {/* Key Services */}
            <div>
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Core Offerings</span>
                <h2 className="text-3xl font-black text-slate-900 font-heading">Key Services</h2>
              </div>
              <GrcCarousel items={serviceCards} />
            </div>

            {/* Industries Served */}
            <div>
              <div className="text-center mb-12 space-y-3">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Sectors We Cover</span>
                <h2 className="text-3xl font-black text-slate-900 font-heading">Industries Served</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {service.industriesServed.map((ind, idx) => (
                  <div key={idx} className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm rounded-full flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">{ind}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Tech, Compliance & Benefits */}
        <section className="py-20 bg-white border-b border-slate-200/50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Tech & Compliance */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Security & Standards
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 font-heading">Technology & Compliance</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.technologyCompliance.map((tc, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-700 leading-snug">{tc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> Value Proposition
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 font-heading">Expected Benefits</h2>
                </div>
                <ul className="space-y-4">
                  {service.benefits.map((ben, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-black text-emerald-600">{idx + 1}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800 mt-1.5">{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-950 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-10 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-white font-heading leading-tight">
                {service.cta}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
                >
                  Contact Our Experts <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/staffing" 
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  Explore All Staffing Services
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
