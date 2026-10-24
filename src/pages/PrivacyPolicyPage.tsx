import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ShieldCheck, Lock, FileText, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Privacy Policy — GOVENICS";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "How GOVENICS collects, processes, and protects your personal data in compliance with India's DPDP Act 2023 and global privacy standards.";
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
        {/* Simple Page Header */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80 overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-10 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-blue-600/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
              Legal & Trust Center
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading leading-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              Last Updated: June 10, 2026 • Aligning operations with global privacy trust standards and the DPDP Act 2023.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <div className="container mx-auto px-6 max-w-4xl mt-16 text-left space-y-12">
          
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-900 font-heading">Our Privacy Commitment</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                At Govenics, we build GRC and advisory software tools designed to help enterprises comply with data privacy frameworks. We treat your organization's telemetry and personal data with the exact same rigor that we recommend to our enterprise clients. Under India's DPDP Act 2023, you hold the right to consent, minimize, and delete your personal registries.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" /> 1. Information We Collect
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed font-medium space-y-3">
              <p>
                We only collect information necessary to fulfill our consultancy or systems integration services. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Official Identity Details:</strong> Full name, corporate email address, organization name, phone numbers, and job role.</li>
                <li><strong>Consultation Requests:</strong> Specific operational GRC gaps or advisory requests provided during appointment scheduling.</li>
                <li><strong>Digital Logs:</strong> IP address, device types, browser metadata, and consent preferences tracked via secure session cookies.</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" /> 2. Processing & DPDP Act Alignment
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed font-medium space-y-3">
              <p>
                In compliance with the Digital Personal Data Protection (DPDP) Act 2023, Govenics functions as a Data Fiduciary. We process data under the following parameters:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Purpose Limitation:</strong> Data is solely processed to manage consultation requests, coordinate audit tasks, and deliver compliance templates.</li>
                <li><strong>Data Minimization:</strong> We do not log user records beyond the scope of active advisory agreements.</li>
                <li><strong>Erasure & Correction:</strong> Users can request the removal or correction of their personal data from our active folders at any time.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" /> 3. Data Protection Measures
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed font-medium space-y-3">
              <p>
                All personal details and corporate telemetry collected are secured behind end-to-end encryption protocols. Govenics operates Information Security Management Systems (ISMS) aligned with ISO 27001 standards. We store database logs in secure local environments to support compliance with data localisation requirements.
              </p>
            </div>
          </div>

          {/* Contact info */}
          <div className="pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Grievance Officer Contact:
            </p>
            <p className="text-sm text-slate-700 font-semibold mt-1">
              GOVENICS GRC Compliance Command Centre &bull; privacy@govenics.grc &bull; No. 97/2, Sundaram Street, Chinmaya Nagar Stage 1, Chennai – 600 092, Tamil Nadu, India
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
