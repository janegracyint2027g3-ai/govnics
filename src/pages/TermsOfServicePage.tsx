import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ShieldAlert, BookOpen, Scale, Award } from "lucide-react";

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Terms of Service — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Terms governing access to GOVENICS advisory services, platform usage, intellectual property, and limitation of liability.";
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
      <div className="bg-white min-h-screen pb-24 text-slate-600">
        {/* Page Header */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80 overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-10 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-blue-600/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
              Legal & Trust Center
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading leading-tight">
              Terms & Conditions
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              Last Updated: June 10, 2026 • Governing advisory engagements and GRC platform usage.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <div className="container mx-auto px-6 max-w-4xl mt-16 text-left space-y-12">
          
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl shrink-0">
              <Scale className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-900 font-heading">Acceptance of Terms</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                By booking consultations, scheduling audits, or accessing resources through GOVENICS, you agree to comply with and be bound by the following Terms & Conditions. These terms apply to all visitors, clients, and corporate partners of Govenics GRC (a division of ISI Group).
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-500" /> 1. Scope of GRC Advisory Services
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed font-medium space-y-3">
              <p>
                Govenics provides advisory, risk assessment, systems integration, and internal audit support services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Legal Guarantee:</strong> While our advisory aligns with statutory rules (RBI, SEBI, FSSAI, DPDP), Govenics does not function as a court of law. Final compliance postures are subject to agency inspector checks.</li>
                <li><strong>Task Deliverables:</strong> Deliverables are scoped under individual Statement of Work (SoW) agreements signed between client organizations and ISI Group.</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" /> 2. Intellectual Property Rights
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed font-medium space-y-3">
              <p>
                All templates, pre-codified audit checklists, training guides, and GOVENICS.AI interface materials are the exclusive intellectual property of Govenics and ISI Group:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Limited License:</strong> Clients are granted a non-exclusive, non-transferable license to use templates internally for audit tracking.</li>
                <li><strong>Restrictions:</strong> Redistributing, reselling, or reverse-engineering GRC dashboard modules is strictly prohibited.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" /> 3. Limitation of Liability
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              In no event shall Govenics or ISI Group be liable for statutory fines, penalty costs, data breach liabilities, or loss of profits resulting from client operational deviation from pre-mapped risk frameworks. It remains the client's sole responsibility to ensure that internal staff execute compliance tasks assigned via GRC trackers.
            </p>
          </div>

          {/* Contact info */}
          <div className="pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Legal Desk:
            </p>
            <p className="text-sm text-slate-700 font-semibold mt-1">
              GOVENICS GRC Legal Desk &bull; legal@govenics.grc &bull; No. 97/2, Sundaram Street, Chinmaya Nagar Stage 1, Chennai – 600 092, Tamil Nadu, India
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
