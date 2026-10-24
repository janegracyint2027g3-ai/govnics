import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { sgrcServices } from "@/data/sgrc-data";
import { 
  Scale, Building, CreditCard, Factory, Users, ShieldAlert, 
  UserPlus, FileSpreadsheet, Leaf, Shield, ArrowRight, CheckCircle2 
} from "lucide-react";

export default function SgrcServicesListPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Statutory Compliance Services (SGRC) — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Explore GOVENICS Statutory GRC advisory services including compliance risk audits, factory compliance, establishment regulations, and EHS safety charters.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, []);

  const getIcon = (id: string) => {
    switch (id) {
      case "compliance-risk-audit":
        return <Scale className="w-6 h-6 text-blue-600" />;
      case "establishment-compliances":
        return <Building className="w-6 h-6 text-blue-600" />;
      case "payroll-compliance":
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case "factory-compliance":
        return <Factory className="w-6 h-6 text-blue-600" />;
      case "vendor-compliance":
        return <Users className="w-6 h-6 text-blue-600" />;
      case "mines-compliance":
        return <ShieldAlert className="w-6 h-6 text-blue-600" />;
      case "flexi-staffing":
        return <UserPlus className="w-6 h-6 text-blue-600" />;
      case "payroll-services":
        return <FileSpreadsheet className="w-6 h-6 text-blue-600" />;
      case "ehs":
        return <Leaf className="w-6 h-6 text-blue-600" />;
      default:
        return <Shield className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen pb-24 pt-28 text-slate-700 select-none">
        
        {/* Banner Section */}
        <section className="container mx-auto px-6 max-w-6xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
            Statutory Compliance Division (SGRC)
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight max-w-3xl mx-auto">
            Govenics Statutory Compliance & Advisory Services
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-slate-500 font-semibold max-w-xl mx-auto">
            Simplifying complex state and central regulations with structured audits, ongoing licensing support, and automated task overwatch.
          </p>
        </section>

        {/* Grid Section */}
        <section className="container mx-auto px-6 max-w-6xl text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sgrcServices.map((service) => (
              <div 
                key={service.id}
                className="group relative bg-white border border-slate-200/80 rounded-3xl p-6 hover:border-blue-500/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Spotlight background card hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                    {getIcon(service.id)}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-3">
                      {service.tagline}
                    </p>
                  </div>
                  <hr className="border-slate-100" />
                  <ul className="space-y-1.5 pt-1">
                    {service.benefits.slice(0, 2).map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-655 font-bold leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Statutory Posture
                  </span>
                  <Link 
                    to={`/sgrc/services/${service.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors uppercase tracking-wider"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
}
