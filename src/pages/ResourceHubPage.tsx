import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GrcResources } from "@/components/resources/GrcResources";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { resourcesSpicedSlides } from "@/data/spiced-slider-content";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";

export default function ResourceHubPage() {
  useEffect(() => {
    document.title = "GRC Knowledge Hub & Resources — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Explore regulatory whitepapers, compliance alerts, DPDP readiness guides, statutory checklists, and legal gazette updates from GOVENICS GRC.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  const slides = resourcesSpicedSlides;

  return (
    <Layout>
      <div className="bg-white">
        <GrcSliderHero slides={slides} categoryLabel="Resources Hub" />
        
        {/* Interactive Bridge to Live Statutory e-Library */}
        <section className="bg-slate-50 border-y border-slate-200/70 py-6">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Interactive Research Portal
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-heading">
                    Explore Central & State Acts in the Statutory e-Library
                  </h3>
                  <p className="text-xs text-blue-100/80 font-medium max-w-xl mt-0.5">
                    Search over 40+ Indian acts, live minimum wage slabs, LWF contribution rates, and PT tables across states.
                  </p>
                </div>
              </div>
              <Link
                to="/sgrc/e-library"
                className="px-6 py-3 bg-white text-slate-900 hover:bg-blue-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Browse e-Library</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <div className="bg-background min-h-[70vh]">
          <GrcResources />
        </div>
      </div>
    </Layout>
  );
}
