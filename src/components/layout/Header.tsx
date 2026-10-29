import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ArrowRight, ShieldCheck, ChevronDown,
  User, LogOut, CalendarCheck,
  Scale, Coins, Building, Lock, Layers, Globe
} from "lucide-react";
import { whomWeServeClusters } from "@/data/whom-we-serve-data";
import { useAuth } from "@/context/AuthContext";

import { offeringsData, megaOfferingsCategories } from "@/data/offerings-data";
import { TwoColumnMegaMenu } from "./TwoColumnMegaMenu";
import { solutionsMenuData } from "@/data/solutionsMenuData";
import { caseStudiesMenuData } from "@/data/caseStudiesMenuData";
import { PartnersMegaMenu } from "./PartnersMegaMenu";
import { partnerCategoriesData } from "@/data/partners-data";
import { IndustriesDropdown } from "./IndustriesDropdown";

const megaIconMap: Record<string, any> = {
  Scale,
  Coins,
  Building,
  Lock,
  Layers,
  Globe,
  ShieldCheck
};

const offeringsVerticalTabsData = offeringsData;
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [openMegaOfferCat, setOpenMegaOfferCat] = useState<string>("statutory-operational");
  const [activeOfferTab, setActiveOfferTab] = useState<string>("regulatory-compliance");
  const [activeServiceTab, setActiveServiceTab] = useState<string>("statutory-tracking");
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setProfileDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setProfileDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (activeDropdown === "what-we-offer") {
      setActiveOfferTab("regulatory-compliance");
      setActiveServiceTab(offeringsVerticalTabsData["regulatory-compliance"]?.items[0]?.id || "statutory-tracking");
    }
  }, [activeDropdown]);

  useEffect(() => {
    const items = offeringsVerticalTabsData[activeOfferTab]?.items;
    if (items && items.length > 0) {
      const hasCurrent = items.some(i => i.id === activeServiceTab);
      if (!hasCurrent) {
        setActiveServiceTab(items[0].id);
      }
    }
  }, [activeOfferTab, activeServiceTab]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    const baseClass = "px-2 xl:px-1.5 2xl:px-3 h-full flex items-center text-[13px] 2xl:text-sm font-bold transition-colors duration-200 whitespace-nowrap";
    return `${baseClass} ${isActive ? "text-blue-600" : "text-black hover:text-blue-600"}`;
  };

  const getNavItemClass = () => {
    const baseClass = "px-2 xl:px-1.5 2xl:px-3 h-full flex items-center gap-1 text-[13px] 2xl:text-sm font-bold transition-colors duration-200 whitespace-nowrap";
    return `${baseClass} text-black hover:text-blue-600`;
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen
        ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md"
        : "bg-transparent"
        }`}
    >

      {/* Main Navigation Bar */}
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="GOVENICS GRC"
            className="h-14 w-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-stretch gap-1 h-full">




          {/* Our Services Dropdown */}
          <div
            className="h-full flex items-center"
            onMouseEnter={() => setActiveDropdown("what-we-offer")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className={getNavItemClass() + " cursor-pointer"}>
              Offerings <ChevronDown className="w-4 h-4 text-current" />
            </div>
            {activeDropdown === "what-we-offer" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[98vw] max-w-6xl xl:max-w-7xl 2xl:max-w-[1360px] bg-white border border-slate-200/90 shadow-2xl rounded-2xl flex overflow-hidden animate-slide-up-dropdown mt-1 text-left z-50">
                {/* Bridge to prevent hover loss */}
                <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />

                {/* Left Column (Dark Navy): Mega Categories with in-place Dropdown */}
                <div className="w-[370px] xl:w-[410px] 2xl:w-[430px] bg-[#0A1630] text-white p-6 flex flex-col justify-between border-r border-slate-800/80 shrink-0">
                  <div className="space-y-4 flex flex-col min-h-0">
                    {/* Header */}
                    <div className="px-1 pb-3.5 border-b border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.2em] leading-tight">
                          Offerings
                        </h3>
                        <span className="text-[9.5px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-sky-300 uppercase tracking-wider border border-blue-400/20">
                          4 Domains • 12 Practices
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-400 mt-2 font-medium leading-relaxed">
                        Grouped statutory, tax, risk & technical governance.
                      </p>
                    </div>

                    {/* Mega Categories Accordion / In-place Dropdown */}
                    <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[460px] pr-2 scrollbar-thin">
                      {megaOfferingsCategories.map((megaCat) => {
                        const isCatOpen = openMegaOfferCat === megaCat.id;
                        const containsActivePractice = megaCat.practices.some(p => p.id === activeOfferTab);
                        const IconComp = megaIconMap[megaCat.iconName] || Layers;

                        return (
                          <div
                            key={megaCat.id}
                            className={`rounded-xl border transition-all overflow-hidden ${
                              containsActivePractice
                                ? "border-blue-500/60 bg-[#132347]"
                                : "border-slate-800/80 bg-slate-900/70 hover:border-slate-700/80"
                            }`}
                          >
                            {/* Mega Category Accordion Header */}
                            <button
                              onClick={() => {
                                const nextState = isCatOpen ? "" : megaCat.id;
                                setOpenMegaOfferCat(nextState);
                                if (nextState && megaCat.practices.length > 0) {
                                  const first = megaCat.practices[0];
                                  setActiveOfferTab(first.id);
                                  setActiveServiceTab(offeringsVerticalTabsData[first.id]?.items[0]?.id || "");
                                }
                              }}
                              className={`w-full text-left px-3.5 py-3 flex items-center justify-between transition-colors ${
                                isCatOpen || containsActivePractice
                                  ? "text-white"
                                  : "text-slate-200 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                    containsActivePractice
                                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                                      : "bg-slate-800 text-sky-400"
                                  }`}
                                >
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-[13px] font-bold leading-tight truncate">
                                    {megaCat.name}
                                  </div>
                                  <div className="text-[10.5px] text-slate-400 mt-0.5 truncate">
                                    {megaCat.practices.length} Practices
                                  </div>
                                </div>
                              </div>
                              <ChevronDown
                                className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 ${
                                  isCatOpen ? "rotate-180 text-sky-400" : ""
                                }`}
                              />
                            </button>

                            {/* In-place Dropdown: Sub-practices listed cleanly in this same column */}
                            {isCatOpen && (
                              <div className="p-2 border-t border-slate-800/80 bg-[#081329]/95 space-y-1.5">
                                {megaCat.practices.map((practice) => {
                                  const isPracticeActive = activeOfferTab === practice.id;
                                  return (
                                    <button
                                      key={practice.id}
                                      onClick={() => {
                                        setActiveOfferTab(practice.id);
                                        setActiveServiceTab(offeringsVerticalTabsData[practice.id]?.items[0]?.id || "");
                                      }}
                                      onMouseEnter={() => {
                                        setActiveOfferTab(practice.id);
                                        setActiveServiceTab(offeringsVerticalTabsData[practice.id]?.items[0]?.id || "");
                                      }}
                                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                                        isPracticeActive
                                          ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/30"
                                          : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <span
                                          className={`w-2 h-2 rounded-full shrink-0 ${
                                            isPracticeActive ? "bg-white" : "bg-sky-400"
                                          }`}
                                        />
                                        <span className="truncate font-medium">{practice.label}</span>
                                      </div>
                                      {practice.tag && (
                                        <span
                                          className={`text-[9px] px-2 py-0.5 rounded-md font-bold shrink-0 ${
                                            isPracticeActive
                                              ? "bg-blue-700/90 text-white"
                                              : "bg-slate-800 text-slate-400"
                                          }`}
                                        >
                                          {practice.tag}
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom link in left sidebar */}
                  <div className="pt-4 border-t border-slate-800/90 mt-3 px-1">
                    <Link
                      to="/services"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center justify-between w-full transition-colors group"
                    >
                      <span>Explore All 12 Offerings</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Full-Width Detail Area (No awkward middle column!) */}
                {/* Right Column: Clean Topics Grid (Only Topics, No Clutter!) */}
                <div className="flex-1 flex flex-col justify-between bg-white p-6 min-h-[460px] overflow-hidden">
                  {(() => {
                    const currentOffering = offeringsVerticalTabsData[activeOfferTab] || offeringsVerticalTabsData["regulatory-compliance"];
                    const currentParentCategory = megaOfferingsCategories.find(c => 
                      c.practices.some(p => p.id === activeOfferTab)
                    );
                    const practiceItems = currentOffering?.items || [];

                    return (
                      <div className="animate-fade-in flex flex-col h-full justify-between gap-4">
                        {/* 1. Practice Header */}
                        <div className="pb-3 border-b border-slate-100 flex items-start justify-between gap-4">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                                {currentParentCategory?.name || "OFFERING"}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-xs font-black text-slate-900 tracking-wide">
                                {currentOffering.label}
                              </span>
                            </div>
                            <h3 className="text-base font-black text-slate-900 leading-tight tracking-tight pt-0.5">
                              {currentOffering.title}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl">
                              {currentOffering.shortDesc}
                            </p>
                          </div>
                          
                          <Link
                            to={`/services`}
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 mt-0.5"
                          >
                            <span>Explore Page</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {/* 2. Topics List (Clean Grid - Only Topics Displayed) */}
                        <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin">
                          <div className="grid grid-cols-2 gap-3">
                            {practiceItems.map((topic) => {
                              const TopicIcon = topic.icon || ShieldCheck;
                              return (
                                <Link
                                  key={topic.id}
                                  to={topic.link}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-500 hover:shadow-md transition-all flex items-start gap-3"
                                >
                                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                    <TopicIcon className="w-4.5 h-4.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                                        {topic.title}
                                      </h4>
                                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                    </div>
                                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                                      {topic.description}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* 3. Clean Footer */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] text-slate-500 font-medium">
                            {practiceItems.length} specialized topics in <span className="font-bold text-slate-700">{currentOffering.label}</span>
                          </span>
                          <Link
                            to="/contact"
                            onClick={() => setActiveDropdown(null)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Speak to Practice Leader</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>



          {/* Industries Dropdown */}
          <div
            className="h-full flex items-center relative"
            onMouseEnter={() => setActiveDropdown("whom-we-serve")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("whom-we-serve")}
              className={`${getNavItemClass()} cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded`}
              aria-expanded={activeDropdown === "whom-we-serve"}
            >
              <span>Industries</span>
              <ChevronDown
                className={`w-4 h-4 text-current transition-transform duration-200 ${
                  activeDropdown === "whom-we-serve" ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>
            <IndustriesDropdown
              isOpen={activeDropdown === "whom-we-serve"}
              onClose={() => setActiveDropdown(null)}
            />
          </div>

          {/* Solutions Dropdown */}
          <div
            className="h-full flex items-center relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("solutions")}
              className={`${getNavItemClass()} cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded`}
              aria-expanded={activeDropdown === "solutions"}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-4 h-4 text-current transition-transform duration-200 ${
                  activeDropdown === "solutions" ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>
            <TwoColumnMegaMenu
              data={solutionsMenuData}
              isOpen={activeDropdown === "solutions"}
              onClose={() => setActiveDropdown(null)}
            />
          </div>

          {/* Case Studies Dropdown */}
          <div
            className="h-full flex items-center relative"
            onMouseEnter={() => setActiveDropdown("case-studies")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("case-studies")}
              className={`${getNavItemClass()} cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded`}
              aria-expanded={activeDropdown === "case-studies"}
            >
              <span>Case Studies</span>
              <ChevronDown
                className={`w-4 h-4 text-current transition-transform duration-200 ${
                  activeDropdown === "case-studies" ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>
            <TwoColumnMegaMenu
              data={caseStudiesMenuData}
              isOpen={activeDropdown === "case-studies"}
              onClose={() => setActiveDropdown(null)}
            />
          </div>

          {/* Partners Dropdown */}
          <div
            className="h-full flex items-center relative"
            onMouseEnter={() => setActiveDropdown("partners")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("partners")}
              className={`${getNavItemClass()} cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded`}
              aria-expanded={activeDropdown === "partners"}
            >
              <span>Partners</span>
              <ChevronDown
                className={`w-4 h-4 text-current transition-transform duration-200 ${
                  activeDropdown === "partners" ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>
            <PartnersMegaMenu
              isOpen={activeDropdown === "partners"}
              onClose={() => setActiveDropdown(null)}
            />
          </div>


          {/* About Us Link */}
          <Link to="/about" className={getLinkClass("/about")}>
            About Us
          </Link>
        </div>

        {/* Action & CTA Buttons Cluster */}
        <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="inline-flex items-center">
                <button className="group inline-flex items-center justify-center gap-1.5 h-10 px-3.5 2xl:px-4 bg-slate-50 hover:bg-white text-slate-800 hover:text-blue-600 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 shadow-2xs hover:shadow-sm whitespace-nowrap">
                  <User className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                  <span className="whitespace-nowrap">Sign In</span>
                </button>
              </Link>
              <Link to="/contact" className="inline-flex items-center">
                <button className="inline-flex items-center justify-center gap-1.5 h-10 px-4 2xl:px-4.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm hover:shadow-md text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap">
                  <span className="whitespace-nowrap">Contact Us</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all cursor-pointer select-none"
            >
              <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-650 flex items-center justify-center text-white text-[10px] font-black shrink-0">
                {user?.fullName?.substring(0, 2).toUpperCase() || "US"}
              </div>
              <div className="flex flex-col text-left max-w-[120px]">
                <span className="text-[11px] font-black text-slate-900 truncate leading-tight">
                  {user?.fullName}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider truncate leading-none mt-0.5">
                  {user?.designation}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {profileDropdownOpen && (
              <div className="absolute top-full right-0 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 animate-slide-up-dropdown mt-1.5 text-left z-50">
                <div className="pb-3 border-b border-slate-100 mb-2">
                  <div className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                    Active GRC Session
                  </div>
                  <div className="text-xs font-black text-slate-800 mt-1 truncate">
                    {user?.fullName}
                  </div>
                  <div className="text-[10px] text-slate-450 font-bold leading-tight truncate">
                    {user?.designation} • {user?.companyName}
                  </div>
                  <div className="text-[9px] text-slate-400 font-medium truncate">
                    {user?.email}
                  </div>
                  {user?.primaryStandard && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-[9px] font-bold text-blue-700 uppercase">
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      <span>{user.primaryStandard} Target</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                    Calibrated GRC Scope
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user?.grcScope?.slice(0, 3).map((scope, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-[8px] font-black text-slate-500 rounded uppercase">
                        {scope.split(" ")[0]}
                      </span>
                    ))}
                    {user?.grcScope && user.grcScope.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-[8px] font-black text-slate-500 rounded uppercase">
                        +{user.grcScope.length - 3} More
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-450 font-bold mt-1 flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Maturity: {user?.maturity}</span>
                    </div>
                    <div className="text-[8.5px] text-slate-400 font-medium">
                      Sector: {user?.industry}
                    </div>
                    <div className="text-[8.5px] text-slate-400 font-medium">
                      Scope: {user?.geoFootprint}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                  <Link 
                    to="/sgrc/e-library" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My e-Library Portal</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-rose-50 text-xs font-bold text-rose-700 transition-colors text-left font-sans"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-450" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-2 transition-colors text-slate-800 hover:text-slate-900"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200/80 p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="flex flex-col gap-1.5">




            {/* Mobile Accordion for Our Services */}
            <div>
              <button
                onClick={() => toggleDropdown("what-we-offer")}
                className="w-full flex justify-between items-center p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
              >
                <span>Offerings</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "what-we-offer" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "what-we-offer" && (
                <div className="pl-3 my-1 flex flex-col gap-3 bg-slate-50 rounded-lg p-3 border border-slate-150 max-h-[500px] overflow-y-auto text-left">
                  {megaOfferingsCategories.map((megaCat) => (
                    <div key={megaCat.id} className="space-y-2 pb-3 border-b border-slate-200/80 last:border-b-0">
                      <div className="flex items-center justify-between border-l-2 border-blue-600 pl-2">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          {megaCat.name}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                          {megaCat.practices.length} practices
                        </span>
                      </div>
                      <div className="pl-2 flex flex-col gap-2">
                        {megaCat.practices.map((practice) => {
                          const data = offeringsVerticalTabsData[practice.id];
                          return (
                            <div key={practice.id} className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
                              <span className="text-xs font-bold text-blue-700 block mb-1">
                                {practice.label}
                              </span>
                              <div className="flex flex-col gap-1 pl-1.5">
                                {data?.items.map((item) => (
                                  <Link
                                    key={item.id}
                                    to={item.link}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-[11px] text-slate-600 hover:text-blue-600 font-medium py-0.5 block truncate"
                                  >
                                    • {item.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 mt-1">
                    <Link
                      to="/contact#book-strategy-session"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Book Strategy Session</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Accordion for Industries */}
            <div>
              <button
                onClick={() => toggleDropdown("whom-we-serve")}
                className="w-full flex justify-between items-center p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
              >
                <span>Industries</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "whom-we-serve" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "whom-we-serve" && (
                <div className="pl-3 my-1 flex flex-col gap-1 bg-slate-50 rounded-lg p-3 border border-slate-150 max-h-[460px] overflow-y-auto text-left">
                  <div className="pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                      Industries & Sectors
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {whomWeServeClusters.map((cluster) => {
                      const ClusterIcon = cluster.icon;
                      return (
                        <Link
                          key={cluster.id}
                          to={`/industries/${cluster.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white text-xs font-semibold text-slate-800 transition-colors"
                        >
                          <ClusterIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{cluster.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5 mt-1">
                    <Link
                      to="/industries"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold text-center block shadow-sm"
                    >
                      View All Industries &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Accordion for Solutions */}
            <div>
              <button
                onClick={() => toggleDropdown("solutions")}
                className="w-full flex justify-between items-center p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "solutions" && (
                <div className="pl-3 my-1 flex flex-col gap-1 bg-slate-50 rounded-lg p-3 border border-slate-150 max-h-[460px] overflow-y-auto text-left">
                  <div className="pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                      Solutions Catalog
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1">
                      By Industry Sector
                    </span>
                    {solutionsMenuData.leftColumn.industries.map((ind) => (
                      <Link
                        key={ind.id}
                        to={ind.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 p-1.5 px-2 rounded-lg hover:bg-white text-xs font-semibold text-slate-800 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{ind.name}</span>
                      </Link>
                    ))}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-2 border-t border-slate-200/60 mt-1">
                      By Compliance Domain
                    </span>
                    {solutionsMenuData.rightColumn.complianceDomains.items.map((item) => (
                      <Link
                        key={item.id}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 p-1.5 px-2 rounded-lg hover:bg-white text-xs font-semibold text-slate-800 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5 mt-1">
                    <Link
                      to="/solutions"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold text-center block shadow-sm"
                    >
                      Explore All Solutions &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Accordion for Case Studies */}
            <div>
              <button
                onClick={() => toggleDropdown("case-studies")}
                className="w-full flex justify-between items-center p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
              >
                <span>Case Studies</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "case-studies" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "case-studies" && (
                <div className="pl-3 my-1 flex flex-col gap-1 bg-slate-50 rounded-lg p-3 border border-slate-150 max-h-[460px] overflow-y-auto text-left">
                  <div className="pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
                      Verified Client Success
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1">
                      By Industry Cases
                    </span>
                    {caseStudiesMenuData.leftColumn.industries.map((ind) => (
                      <Link
                        key={ind.id}
                        to={ind.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 p-1.5 px-2 rounded-lg hover:bg-white text-xs font-semibold text-slate-800 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{ind.name}</span>
                      </Link>
                    ))}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-2 border-t border-slate-200/60 mt-1">
                      By Compliance Wins
                    </span>
                    {caseStudiesMenuData.rightColumn.complianceDomains.items.map((item) => (
                      <Link
                        key={item.id}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 p-1.5 px-2 rounded-lg hover:bg-white text-xs font-semibold text-slate-800 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5 mt-1">
                    <Link
                      to="/case-studies"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold text-center block shadow-sm"
                    >
                      Browse All Case Studies &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Accordion for Partners */}
            <div>
              <button
                onClick={() => toggleDropdown("partners")}
                className="w-full flex justify-between items-center p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
              >
                <span>Partners</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "partners" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "partners" && (
                <div className="pl-3 my-1 flex flex-col gap-1 bg-slate-50 rounded-lg p-3 border border-slate-150 max-h-[460px] overflow-y-auto text-left">
                  <div className="pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                      Partner Domains
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {partnerCategoriesData.map((category) => {
                      const CatIcon = category.icon;
                      return (
                        <Link
                          key={category.id}
                          to={`/partners?category=${category.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white text-xs font-semibold text-slate-800 transition-colors"
                        >
                          <CatIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{category.shortTitle}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5 mt-1">
                    <Link
                      to="/partners"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold text-center block shadow-sm"
                    >
                      Explore All Partners &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>


            {/* Mobile Link for About Us */}
            <Link to="/about" onClick={() => setMobileOpen(false)} className="p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg block text-left">
              About Us
            </Link>

          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 text-left">
            {!isAuthenticated ? (
              <>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold">
                    Contact Us <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-slate-50 to-slate-100 hover:bg-blue-50 border border-slate-250 text-slate-800 hover:text-blue-600 rounded-xl text-xs font-bold transition-all shadow-xs">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sign In to Portal</span>
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20">
                    Create GRC Account
                  </button>
                </Link>
              </>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</div>
                  <div className="text-xs font-black text-slate-800 truncate">{user?.fullName}</div>
                  <div className="text-[10px] text-slate-500 font-bold leading-tight truncate">{user?.designation} at {user?.companyName}</div>
                  <div className="text-[9px] text-slate-400 font-medium truncate">{user?.email}</div>
                  <div className="mt-2 text-[9.5px] text-slate-650 font-bold">Target Standard: {user?.primaryStandard}</div>
                  <div className="text-[9px] text-slate-550 font-semibold">Maturity: {user?.maturity}</div>
                  <div className="text-[9px] text-slate-550 font-semibold">Sector: {user?.industry}</div>
                  <div className="text-[9px] text-slate-550 font-semibold">Scope: {user?.geoFootprint}</div>
                </div>
                <Link to="/sgrc/e-library" onClick={() => setMobileOpen(false)} className="w-full block">
                  <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>My e-Library Portal</span>
                  </button>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full py-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
