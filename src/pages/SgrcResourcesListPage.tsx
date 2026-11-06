import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CmsLibraryExplorer } from "@/components/library/CmsLibraryExplorer";

export default function SgrcResourcesListPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "SGRC Knowledge Hub & Resources — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Access statutory webinars, labour code case studies, circular notifications, and compliance alerts curated by GOVENICS GRC.";
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
    <Layout>
      <div className="bg-slate-50/50 min-h-screen pb-24 pt-28 text-slate-700 select-none">
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 max-w-6xl text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
            Govenics GRC Resources &amp; CMS
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight max-w-3xl mx-auto">
            SGRC Knowledge Hub &amp; Resources
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-slate-500 font-semibold max-w-2xl mx-auto">
            Centrally managed through WordPress CMS at <span className="text-blue-600 font-bold">cms.govenics.com</span>. Access verified regulatory acts, executive guides, checklists, and statutory advisories.
          </p>
        </section>

        {/* Dynamic WordPress CMS Explorer */}
        <section className="container mx-auto px-6 max-w-6xl mb-16">
          <CmsLibraryExplorer />
        </section>

        {/* CTA to e-Library */}
        <section className="container mx-auto px-6 max-w-6xl text-left">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-blue-400 text-xs font-extrabold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Live Statutory Database
              </div>
              <h2 className="text-2xl md:text-3xl font-black font-heading leading-tight">
                Access the Statutory e-Library &amp; Calculators
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold max-w-lg leading-relaxed">
                Lookup PT rates, minimum wage brackets, LWF contributions, and state-wise paid holidays across 5 key states.
              </p>
            </div>
            <Link 
              to="/sgrc/e-library"
              className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              Open e-Library Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </Layout>
  );
}
