import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { 
  ArrowRight, ShieldCheck, Search 
} from "lucide-react";


export default function SgrcResourcesListPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeGrcType, setActiveGrcType] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

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

  const resourcesData = [
    {
      id: "webinar-codes-2026",
      type: "webinar",
      title: "Mandatory Session: Transitioning to the New 4 Labour Codes (2026)",
      desc: "An overview of statutory changes under wage codes, social security mandates, and employee rest codes.",
      date: "July 12, 2026",
      author: "Advisory Council",
      tag: "Live Webinar",
      grcType: "Act"
    },
    {
      id: "blog-lwf-2026",
      type: "blog",
      title: "Understanding Labour Welfare Fund (LWF) Slabs & Deadlines",
      desc: "A comparative breakdown of state-specific contribution Slabs for employers and workers across Maharashtra, Karnataka, and Tamil Nadu.",
      date: "June 18, 2026",
      author: "Compliance Operations Team",
      tag: "Statutory Article",
      grcType: "Rule"
    },
    {
      id: "case-audit-manufacturing",
      type: "case-studies",
      title: "Case Study: Minimising Co-employment Liability in a 5,000-Worker Plant",
      desc: "How Govenics GRC audited vendor registers, restructured contractor SLAs, and resolved statutory compliance gaps.",
      date: "May 29, 2026",
      author: "Risk Assessment Team",
      tag: "Case Study",
      grcType: "Compliance"
    },
    {
      id: "press-expansion-compliance",
      type: "media",
      title: "Media Release: Govenics AI-Driven e-Library Platform Release",
      desc: "Announcing the release of our real-time regional statutory databases and interactive EPF/Gratuity calculators.",
      date: "June 02, 2026",
      author: "Communications Board",
      tag: "Press Release",
      grcType: "Compliance"
    },
    {
      id: "events-conclave-south",
      type: "events",
      title: "Govenics Annual Compliance Conclave - South Zone (Chennai)",
      desc: "Meet regional statutory compliance experts, auditors, and board-advisory specialists to discuss dynamic GRC postures.",
      date: "August 15, 2026",
      author: "Events Management",
      tag: "Conclave Session",
      grcType: "Compliance"
    },
    {
      id: "csr-scholarship-miners",
      type: "csr",
      title: "CSR Focus: Educational Scholarship Fund for Workers' Families",
      desc: "Govenics partners with local mining and industrial communities to build statutory support structures and scholarships.",
      date: "June 10, 2026",
      author: "CSR Committee",
      tag: "Social Responsibility",
      grcType: "Compliance"
    }
  ];

  const filtered = resourcesData.filter(item => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesGrcType = activeGrcType === "all" || item.grcType === activeGrcType;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.desc.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesGrcType && matchesSearch;
  });

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen pb-24 pt-28 text-slate-700 select-none">
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 max-w-5xl text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
            Govenics GRC Resources
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight max-w-3xl mx-auto">
            SGRC Knowledge Hub & Resources
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-slate-500 font-semibold max-w-xl mx-auto">
            Access statutory webinars, detailed case studies, legal opinions, and circular updates prepared by Govenics advisory boards.
          </p>
        </section>

        {/* Filters and Search */}
        <section className="container mx-auto px-6 max-w-5xl mb-8">
          <div className="bg-white p-6 border border-slate-200/80 rounded-3xl shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-250 bg-white text-xs font-semibold outline-none focus:border-blue-500 transition-all text-slate-800"
                />
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 self-center mr-2">Formats:</span>
                {[
                  { id: "all", label: "All Formats" },
                  { id: "webinar", label: "Webinars" },
                  { id: "blog", label: "Blogs" },
                  { id: "case-studies", label: "Case Studies" },
                  { id: "events", label: "Events" },
                  { id: "csr", label: "CSR" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-650"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* GRC Classification Row */}
            <div className="flex flex-wrap gap-1.5 items-center justify-center md:justify-start">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 mr-2">GRC Topics:</span>
              {[
                { id: "all", label: "All Classifications" },
                { id: "Act", label: "Acts & Codes" },
                { id: "Rule", label: "Rules & Deadlines" },
                { id: "Compliance", label: "Compliances & Audits" }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setActiveGrcType(type.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                    activeGrcType === type.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-650"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="container mx-auto px-6 max-w-5xl text-left mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(item => (
              <div 
                key={item.id}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1.5 items-center">
                      <span className="px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100 text-[9px] font-black uppercase tracking-wider text-blue-650">
                        {item.tag}
                      </span>
                      {item.grcType && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                          {item.grcType}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">{item.date}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    By {item.author}
                  </span>
                  <Link 
                    to="/sgrc/e-library?tab=webinar"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
                  >
                    Watch/Read &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to e-Library */}
        <section className="container mx-auto px-6 max-w-5xl text-left">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-blue-400 text-xs font-extrabold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Live Statutory Database
              </div>
              <h2 className="text-2xl md:text-3xl font-black font-heading leading-tight">
                Access the Dynamic Statutory e-Library
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
