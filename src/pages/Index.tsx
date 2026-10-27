import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcHero } from "@/components/hero/GrcHero";
import { Building2, Sparkles, ArrowRight } from "lucide-react";
import { GrcTrust } from "@/components/trust/GrcTrust";
import { GrcIndustries } from "@/components/industries/GrcIndustries";
import { GrcServices } from "@/components/services/GrcServices";
import { GrcLifecycleSlider } from "@/components/services/GrcLifecycleSlider";
import { WhyGovenics } from "@/components/why-govenics/WhyGovenics";
import { GrcCases } from "@/components/cases/GrcCases";
import { GrcResources } from "@/components/resources/GrcResources";
import { ComplianceRisk } from "@/components/risk/ComplianceRisk";
import { CompanySize } from "@/components/company-size/CompanySize";
import { LeadCaptureForm } from "@/components/lead/LeadCaptureForm";
import { Link } from "react-router-dom";

export default function Index() {
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "GOVENICS GRC is India's trusted enterprise GRC advisory partner. We help organisations manage risk, achieve regulatory compliance, and strengthen governance across 15+ industries. A division of ISI Group.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <Layout noPadding={true}>
      {/* Hero Section — "Get Free Assessment" CTA scrolls to LeadCaptureForm below */}
      <GrcHero />

      {/* Strategic Evolution Section */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-4">
            
            {/* Premium Label */}
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] py-1 px-3 border border-blue-200 rounded-full bg-blue-50">
                The Future of Protection
              </span>
            </div>

            {/* Main Statement */}
            <div className="max-w-4xl space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading leading-tight">
                <span className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Our Strategic Evolution</span>
                We are evolving from{" "}
                <span className="text-slate-700 underline decoration-slate-300 decoration-2 underline-offset-4 font-extrabold">
                  Reactive Checklists
                </span>{" "}
                to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 font-extrabold">
                  Continuous Control Intelligence
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-semibold">
                Traditional consulting relies on periodic point-in-time checks. Our approach integrates real-time compliance tracking, automated audit preparation, and domain-certified GRC talent.
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl pt-8">
              
              {/* Traditional Card */}
              <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all text-left">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-slate-500" />
                </div>
                <h4 className="text-lg font-black text-slate-950 mb-2">Traditional Model</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  Reliance on manual spreadsheets and periodic checkpoint reviews. Static, reactive compliance posture with high human error margins.
                </p>
              </div>

              {/* Intelligence Card */}
              <div className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl text-left overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>
                <h4 className="text-lg font-black text-white mb-2">Continuous Compliance</h4>
                <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                  Powered by compliance automation, continuous risk control validation, and AI posture auditing. Proactive controls intelligence with 100% visibility.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Trust Metrics + Partner Ecosystem */}
      <GrcTrust />

      {/* Compliance Risk Categories */}
      <ComplianceRisk />

      {/* Company Size Segmentation */}
      <CompanySize />

      {/* Industries We Serve */}
      <GrcIndustries />

      {/* Services Lifecycle */}
      <GrcLifecycleSlider />

      {/* Service Ecosystem */}
      <GrcServices />

      {/* Why Govenics */}
      <WhyGovenics />

      {/* Case Studies */}
      <GrcCases />

      {/* ── GET FREE ASSESSMENT — Lead Capture Form ────────────────────────── */}
      <LeadCaptureForm />

      {/* ── STRATEGY SESSION CTA — Clean, single call-to-action ────────────── */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border-t border-slate-800">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
            Expert Advisory
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-heading leading-tight">
            Need a Personalized GRC Strategy Session?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Connect with our senior advisory partners for a structured consultation on compliance gaps, risk frameworks, or ESG readiness — tailored to your industry and company size.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02]"
            >
              Book a Strategy Session <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/grc"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-2xl border border-white/10 transition-all"
            >
              Explore GRC Services
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Hub */}
      <GrcResources />

    </Layout>
  );
}



