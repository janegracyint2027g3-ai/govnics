import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 text-slate-400 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Footer CTA Segment */}
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Ready to Strengthen Your Compliance Strategy?</h3>
            <p className="text-sm text-slate-400 font-medium">Get actionable insights from industry-leading compliance experts.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link to="/contact">
              <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20">
                Contact Our Team
              </button>
            </Link>
            <Link to="/contact#book-strategy-session">
              <button className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-sm transition-all">
                Book Strategy Session
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
        {/* Brand Segment */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-white rounded-xl shadow-lg border border-white/10">
              <img
                src="/logo.png"
                alt="GOVENICS GRC"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            We are an enterprise GRC advisory partner. We help organizations manage risk, achieve regulatory excellence, strengthen governance, and accelerate business growth.
          </p>
          {/* Social links — update href values with real Govenics/ISI profile URLs when available */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Visit Govenics on LinkedIn" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-blue-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" aria-label="Visit Govenics on Twitter / X" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-blue-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" aria-label="Visit Govenics on Facebook" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-blue-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        {/* Industries List */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
            Key Sectors
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li><Link to="/industries/financial-services#banking" className="hover:text-blue-400 transition-colors">Banking & Finance</Link></li>
            <li><Link to="/industries/healthcare-life-sciences#healthcare" className="hover:text-blue-400 transition-colors">Healthcare & Ayush</Link></li>
            <li><Link to="/industries/manufacturing-industrial#automobiles" className="hover:text-blue-400 transition-colors">Automobiles</Link></li>
            <li><Link to="/industries/technology-electronics#it-bpm" className="hover:text-blue-400 transition-colors">IT & Technology</Link></li>
            <li><Link to="/industries/infrastructure-construction#real-estate" className="hover:text-blue-400 transition-colors">Real Estate & Infra</Link></li>
            <li><Link to="/industries/energy-utilities#renewable-energy" className="hover:text-blue-400 transition-colors">Renewable Energy</Link></li>
          </ul>
        </div>

        {/* Services List */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
            GRC Offerings
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li><Link to="/services/regulatory-compliance" className="hover:text-blue-400 transition-colors">Regulatory Compliance</Link></li>
            <li><Link to="/services/enterprise-risk-management" className="hover:text-blue-400 transition-colors">Enterprise Risk</Link></li>
            <li><Link to="/services/data-privacy-dpdp" className="hover:text-blue-400 transition-colors">Data Privacy & DPDP</Link></li>
            <li><Link to="/cybersecurity" className="hover:text-blue-400 transition-colors">Cybersecurity</Link></li>
            <li><Link to="/esg" className="hover:text-blue-400 transition-colors">ESG Reporting</Link></li>
            <li><Link to="/partners" className="hover:text-blue-400 transition-colors">Partners</Link></li>
            <li><Link to="/about#careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
            <li><Link to="/services/labour-law-compliance" className="hover:text-blue-400 transition-colors">Labour Compliance</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
            Contact Hub
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span className="leading-snug">
                No. 97/2, Sundaram Street, Chinmaya Nagar Stage 1, Chennai – 600 092, Tamil Nadu, India
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <a href="mailto:contact@govenics.grc" className="hover:text-blue-400 transition-colors">contact@govenics.grc</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium uppercase tracking-wider text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} GOVENICS GRC. All Rights Reserved. (A Division of ISI Group)
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
          <Link to="/cookies" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
