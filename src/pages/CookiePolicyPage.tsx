import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Eye, HelpCircle, Layers, Settings } from "lucide-react";

export default function CookiePolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              Cookie Policy
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              Last Updated: June 10, 2026 • Details on how we utilize cookies to secure and analyze your GRC sessions.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <div className="container mx-auto px-6 max-w-4xl mt-16 text-left space-y-12">
          
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl shrink-0">
              <Eye className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-900 font-heading">What are Cookies?</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Cookies are small text registers stored on your machine when you access online dashboards. At Govenics, we utilize minimal session cookies to verify user accounts, secure form entries, and analyze interface navigation trends to improve overall responsiveness.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" /> 1. Cookie Classifications
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed font-medium space-y-3">
              <p>
                Our platform deploys three categories of cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Strictly Necessary Cookies:</strong> Essential for platform operations, session persistence, and secure token verification. Disabling these blocks platform login capabilities.</li>
                <li><strong>Performance & Analytics Cookies:</strong> Logs anonymized navigation paths and error counts. We use this data to optimize dashboard query speeds.</li>
                <li><strong>Security Cookies:</strong> Monitors request patterns to prevent SQL injections, cross-site script exploits, and brute force login attempts.</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" /> 2. Managing Preferences
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              You can adjust, block, or delete cookies directly inside your browser preference panels (e.g. Chrome, Safari, Edge, Firefox). Please note that limiting essential session cookies will prevent the GRC tracker from maintaining active login states.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-500" /> 3. Third-Party Cookies
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              We do not permit third-party advertising cookies or trackers on Govenics GRC pages. Any telemetry integrations are direct, local, and encrypted to ensure absolute data privacy under the DPDP Act 2023 guidelines.
            </p>
          </div>

          {/* Contact info */}
          <div className="pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Legal Desk:
            </p>
            <p className="text-sm text-slate-700 font-semibold mt-1">
              Govenics Compliance Command Center • legal@govenics.grc • No 97/2, SUNDARAM STREET CHINMAYA NAGAR STAGE 1 , Chennai City Corporation, Tamil Nadu, India - 600092
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
