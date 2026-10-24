import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { manpowerServicesData } from "@/data/manpower-services-data";
import { 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Briefcase, 
  Settings, 
  ArrowRight,
  Target
} from "lucide-react";
import heroVerify from "@/assets/hero-verify.jpg"; // Using an existing image

export default function ManpowerServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();

  // Find target service
  const service = manpowerServicesData.find((serv) => serv.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (service) {
      document.title = `${service.title} | Managed Staffing — GOVENICS`;
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

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pb-24 text-slate-600">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 border-b border-slate-800">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${heroVerify})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg backdrop-blur-md">
                Manpower & Facility Services
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-heading leading-tight tracking-tight">
                {service.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.keyServices.map((ks, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:border-blue-500/30 transition-all hover:shadow-md flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Settings className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-black text-slate-800">{ks}</h3>
                  </div>
                ))}
              </div>
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
