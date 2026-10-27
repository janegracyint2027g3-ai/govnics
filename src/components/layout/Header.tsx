import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ArrowRight, ShieldCheck, ChevronDown, Search,
  User, LogOut, CalendarCheck,
  Scale, Coins, Building, Lock, Layers, Globe
} from "lucide-react";
import { whomWeServeClusters } from "@/data/whom-we-serve-data";
import { useAuth } from "@/context/AuthContext";

import { offeringsData, megaOfferingsCategories } from "@/data/offerings-data";
import { TwoColumnMegaMenu } from "./TwoColumnMegaMenu";
import { solutionsMenuData } from "@/data/solutionsMenuData";
import { caseStudiesMenuData } from "@/data/caseStudiesMenuData";

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
  const [activeSubTab, setActiveSubTab] = useState<string>("");
  const [openMegaOfferCat, setOpenMegaOfferCat] = useState<string>("statutory-operational");
  const [activeOfferTab, setActiveOfferTab] = useState<string>("regulatory-compliance");
  const [activeServiceTab, setActiveServiceTab] = useState<string>("statutory-tracking");
  const [industrySearchQuery, setIndustrySearchQuery] = useState<string>("");
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
    setIndustrySearchQuery("");
  }, [pathname]);

  useEffect(() => {
    if (activeDropdown === "what-we-offer") {
      setActiveOfferTab("regulatory-compliance");
      setActiveServiceTab(offeringsVerticalTabsData["regulatory-compliance"]?.items[0]?.id || "statutory-tracking");
    } else if (activeDropdown === "whom-we-serve") {
      setActiveSubTab("manufacturing-industrial");
      setIndustrySearchQuery("");
    } else {
      setActiveSubTab("");
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
      {/* Top Info Bar */}
      <div
        className={`border-b transition-all duration-300 ${scrolled
          ? "h-0 opacity-0 overflow-hidden"
          : "h-10 opacity-100 border-slate-200 bg-slate-50 text-slate-600"
          }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-center text-[11px] font-bold tracking-wider uppercase text-center">
          <span className="text-slate-500">
            Governance, Risk & Compliance Excellence
          </span>
        </div>
      </div>

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
                <div className="w-[330px] xl:w-[360px] bg-[#0A1630] text-white p-4.5 flex flex-col justify-between border-r border-slate-800 shrink-0">
                  <div className="space-y-3 flex flex-col min-h-0">
                    {/* Header */}
                    <div className="px-1 pt-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.2em] leading-tight">
                          Offerings
                        </h3>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-sky-300 uppercase tracking-wider">
                          4 Domains • 12 Practices
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-400 mt-1 font-medium leading-relaxed">
                        Grouped statutory, tax, risk & technical governance.
                      </p>
                    </div>

                    {/* Mega Categories Accordion / In-place Dropdown */}
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[460px] pr-1 scrollbar-thin">
                      {megaOfferingsCategories.map((megaCat) => {
                        const isCatOpen = openMegaOfferCat === megaCat.id;
                        const containsActivePractice = megaCat.practices.some(p => p.id === activeOfferTab);
                        const IconComp = megaIconMap[megaCat.iconName] || Layers;

                        return (
                          <div
                            key={megaCat.id}
                            className={`rounded-xl border transition-all overflow-hidden ${
                              containsActivePractice
                                ? "border-blue-500/50 bg-[#132347]"
                                : "border-slate-800/80 bg-slate-900/60 hover:border-slate-700"
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
                              className={`w-full text-left p-2.5 flex items-center justify-between transition-colors ${
                                isCatOpen || containsActivePractice
                                  ? "text-white"
                                  : "text-slate-200 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                    containsActivePractice
                                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                                      : "bg-slate-800/90 text-sky-400"
                                  }`}
                                >
                                  <IconComp className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold leading-tight truncate">
                                    {megaCat.name}
                                  </div>
                                  <div className="text-[9.5px] text-slate-400 truncate">
                                    {megaCat.practices.length} Practices
                                  </div>
                                </div>
                              </div>
                              <ChevronDown
                                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 text-slate-400 ${
                                  isCatOpen ? "rotate-180 text-sky-400" : ""
                                }`}
                              />
                            </button>

                            {/* In-place Dropdown: Sub-practices listed cleanly in this same column */}
                            {isCatOpen && (
                              <div className="p-1.5 pt-0 border-t border-slate-800/60 bg-[#0c1a36] space-y-1">
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
                                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center justify-between group ${
                                        isPracticeActive
                                          ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/30"
                                          : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span
                                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                            isPracticeActive ? "bg-white" : "bg-sky-400"
                                          }`}
                                        />
                                        <span className="truncate">{practice.label}</span>
                                      </div>
                                      {practice.tag && (
                                        <span
                                          className={`text-[8.5px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
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
                  <div className="pt-3 border-t border-slate-800/90 mt-2">
                    <Link
                      to="/services"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center justify-between w-full transition-colors group"
                    >
                      <span>Explore All 12 Offerings</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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



          {/* Industries & Scale Dropdown */}
          <div
            className="h-full flex items-center"
            onMouseEnter={() => setActiveDropdown("whom-we-serve")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className={getNavItemClass() + " cursor-pointer"}>
              Industries <ChevronDown className="w-4 h-4 text-current" />
            </div>
            {activeDropdown === "whom-we-serve" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[98vw] max-w-6xl xl:max-w-7xl bg-white border border-slate-200/90 shadow-2xl rounded-2xl flex overflow-hidden animate-slide-up-dropdown mt-1 text-left z-50">
                {/* Bridge to prevent hover loss */}
                <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />

                {/* Left Sidebar */}
                <div className="w-[28%] bg-slate-900 text-white border-r border-slate-800 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.25em] leading-tight">
                        Industries
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium leading-relaxed">
                        Explore industries and the governance, risk and compliance requirements relevant to their operations.
                      </p>
                    </div>

                    {/* Search Field */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search industries or topics..."
                        value={industrySearchQuery}
                        onChange={(e) => setIndustrySearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    
                    {/* Sidebar Clusters List */}
                    <div className="flex flex-col gap-1 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
                      {whomWeServeClusters.map((cluster) => {
                        const ClusterIcon = cluster.icon;
                        const isSelected = activeSubTab === cluster.id;
                        return (
                          <button
                            key={cluster.id}
                            onMouseEnter={() => {
                              setActiveSubTab(cluster.id);
                              if (industrySearchQuery) setIndustrySearchQuery("");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between group ${
                              isSelected && !industrySearchQuery
                                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                                : "text-slate-350 hover:text-white hover:bg-slate-800/60"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <ClusterIcon className={`w-4 h-4 shrink-0 ${isSelected && !industrySearchQuery ? "text-white" : "text-blue-400"}`} />
                              <span className="truncate">{cluster.name}</span>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-all ${isSelected && !industrySearchQuery ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80">
                    <Link
                      to="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>View All Industries Directory</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Right Pane */}
                <div className="w-[72%] p-6 flex flex-col justify-between bg-white min-h-[470px]">
                  {industrySearchQuery.trim() ? (
                    /* ── Search Results View ── */
                    (() => {
                      const query = industrySearchQuery.trim().toLowerCase();
                      const matched = whomWeServeClusters.flatMap(c => 
                        c.subIndustries.filter(s => 
                          s.title.toLowerCase().includes(query) ||
                          s.subtitle.toLowerCase().includes(query) ||
                          s.regulations.some(r => r.toLowerCase().includes(query)) ||
                          s.searchKeywords.some(k => k.toLowerCase().includes(query)) ||
                          c.name.toLowerCase().includes(query)
                        ).map(s => ({ ...s, clusterName: c.name, clusterId: c.id }))
                      );

                      if (matched.length === 0) {
                        return (
                          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                              <Search className="w-6 h-6" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-700">No industry matched "{industrySearchQuery}"</h4>
                            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                              Try searching for automotive, healthcare, banking, tech, construction, or EHS regulations.
                            </p>
                            <button
                              onClick={() => setIndustrySearchQuery("")}
                              className="px-3.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                            >
                              Clear Search
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold text-slate-600">
                              Found <span className="text-blue-600 font-extrabold">{matched.length}</span> matching industries
                            </span>
                            <button
                              onClick={() => setIndustrySearchQuery("")}
                              className="text-xs text-blue-600 hover:underline font-semibold"
                            >
                              Clear
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin">
                            {matched.map((sub) => {
                              const SubIcon = sub.icon;
                              return (
                                <Link
                                  key={sub.id}
                                  to={sub.existingRoute}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setIndustrySearchQuery("");
                                  }}
                                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-150 hover:border-blue-300 hover:bg-blue-50/20 transition-all group shadow-2xs"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 rounded-lg shrink-0 transition-colors">
                                      <SubIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                        {sub.title}
                                      </span>
                                      <span className="text-[10px] text-blue-600 font-semibold">{sub.clusterName}</span>
                                    </div>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    /* ── Active Cluster View ── */
                    (() => {
                      const activeCluster = whomWeServeClusters.find(c => c.id === activeSubTab) || whomWeServeClusters[0];
                      return (
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            {/* Cluster Header */}
                            <div className="border-b border-slate-100 pb-3 flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-black text-slate-900 tracking-tight">
                                    {activeCluster.name}
                                  </h4>
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9.5px] font-black text-emerald-700 tracking-wide uppercase">
                                    Verified Scope
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                                  {activeCluster.shortDescription}
                                </p>
                              </div>
                              <Link
                                to={`/industries/${activeCluster.id}`}
                                onClick={() => setActiveDropdown(null)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-bold whitespace-nowrap inline-flex items-center gap-1 shrink-0"
                              >
                                Explore Sector Page <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>

                            {/* Two-Column Industry Cards Grid (6 submenu items horizontally in 3 rows of 2) */}
                            <div className="grid grid-cols-2 gap-3 my-4">
                              {activeCluster.subIndustries.slice(0, 6).map((sub) => {
                                const SubIcon = sub.icon;
                                return (
                                  <Link
                                    key={sub.id}
                                    to={sub.existingRoute}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-150 hover:border-blue-300 hover:bg-blue-50/20 transition-all group shadow-2xs"
                                  >
                                    <div className="flex items-center gap-3 text-left min-w-0">
                                      <div className="p-2 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 rounded-lg shrink-0 transition-colors">
                                        <SubIcon className="w-4 h-4" />
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                          {sub.title}
                                        </span>
                                        <span className="text-[10.5px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                                          {sub.subtitle}
                                        </span>
                                      </div>
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-3 mt-1">
                            {/* Key GRC Topics & Documented Offerings */}
                            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 items-center">
                              <div>
                                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                  Applicable GRC Focus Topics
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {activeCluster.keyGrcTopics.slice(0, 3).map((topic, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium border border-slate-200/70 truncate max-w-[220px]"
                                    >
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                  Documented GOVENICS Offerings
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {activeCluster.documentedOfferings.slice(0, 3).map((off) => (
                                    <Link
                                      key={off.serviceId}
                                      to={off.route}
                                      onClick={() => setActiveDropdown(null)}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold border border-blue-200/60 transition-colors"
                                    >
                                      <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                                      <span className="truncate max-w-[140px]">{off.serviceName}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Contextual Contact CTA Banner */}
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between">
                              <span className="text-xs text-slate-600 font-medium">
                                Discuss your governance, risk and compliance requirements with GOVENICS.
                              </span>
                              <Link
                                to="/contact"
                                onClick={() => setActiveDropdown(null)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-500/10 shrink-0 ml-3"
                              >
                                Contact Us
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
              </div>
            )}
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

          <Link to="/partners" className={getLinkClass("/partners")}>
            Partners
          </Link>

          <Link to="/careers" className={getLinkClass("/careers")}>
            Careers
          </Link>

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

            {/* Mobile Accordion for Industries & Scale */}
            <div>
              <button
                onClick={() => toggleDropdown("whom-we-serve")}
                className="w-full flex justify-between items-center p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
              >
                <span>Industries</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "whom-we-serve" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "whom-we-serve" && (
                <div className="pl-4 my-1 flex flex-col gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100 max-h-[350px] overflow-y-auto text-left">
                  {whomWeServeClusters.map((cluster) => (
                    <div key={cluster.id} className="space-y-1 pb-2 border-b border-slate-200/60 last:border-b-0">
                      <div className="flex items-center justify-between border-l-2 border-blue-500 pl-1.5">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                          {cluster.name}
                        </span>
                        <Link
                          to={`/industries/${cluster.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="text-[9.5px] text-blue-600 font-bold hover:underline"
                        >
                          Sector Page &rarr;
                        </Link>
                      </div>
                      <div className="pl-2 flex flex-col gap-0.5">
                        {cluster.subIndustries.slice(0, 6).map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.existingRoute}
                            onClick={() => setMobileOpen(false)}
                            className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5 block truncate"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
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
                <div className="pl-3 my-1 flex flex-col gap-3 bg-slate-50 rounded-lg p-3 border border-slate-150 max-h-[450px] overflow-y-auto text-left">
                  <div className="space-y-1 pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                      Pre-Defined Consulting Assets
                    </span>
                    <div className="pl-2 flex flex-col gap-1">
                      <Link to="/solutions" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5">
                        By Industry Sector (8 Sectors)
                      </Link>
                      <Link to="/solutions" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5">
                        By Compliance Domain (8 Domains)
                      </Link>
                      <Link to="/solutions" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-blue-600 font-medium py-0.5">
                        By Solution Type (AI-Driven)
                      </Link>
                    </div>
                  </div>

                  <Link
                    to="/solutions"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold text-center block shadow-sm"
                  >
                    Explore Solutions Catalog &rarr;
                  </Link>
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
                <div className="pl-3 my-1 flex flex-col gap-3 bg-slate-50 rounded-lg p-3 border border-slate-150 max-h-[450px] overflow-y-auto text-left">
                  <div className="space-y-1 pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
                      Verified Client Success
                    </span>
                    <div className="pl-2 flex flex-col gap-1">
                      <Link to="/case-studies" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-emerald-600 font-medium py-0.5">
                        By Industry Sector Cases
                      </Link>
                      <Link to="/case-studies" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-emerald-600 font-medium py-0.5">
                        By Compliance Domain Wins
                      </Link>
                      <Link to="/case-studies#outcome-metrics" onClick={() => setMobileOpen(false)} className="text-xs text-slate-700 hover:text-emerald-600 font-medium py-0.5">
                        Outcome Metrics (KPIs Dashboard)
                      </Link>
                    </div>
                  </div>

                  <Link
                    to="/case-studies"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold text-center block shadow-sm"
                  >
                    Browse All Case Studies &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Link for Partners */}
            <Link to="/partners" onClick={() => setMobileOpen(false)} className="p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg block text-left">
              Partners
            </Link>

            {/* Mobile Link for Careers */}
            <Link to="/careers" onClick={() => setMobileOpen(false)} className="p-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg block text-left">
              Careers
            </Link>

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
