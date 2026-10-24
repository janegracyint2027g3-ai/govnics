import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { 
  aboutStats, 
  missionVisionValues, 
  timelineData, 
  directorsData, 
  executiveManagementData, 
  officeLocations 
} from "@/data/about-page-data";
import { 
  MapPin, Phone, Mail, Search, 
  Building2, Sparkles 
} from "lucide-react";

import heroVerify from "@/assets/hero-verify.jpg";
import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroCommand from "@/assets/command_center_1.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";

export default function AboutPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchCity, setSearchCity] = useState<string>("");

  const allLeaders = [...directorsData, ...executiveManagementData];

  const aboutHeroSlides = [
    {
      badge: "Since 1985",
      title: "Securing the Future of",
      highlight: "Enterprise",
      titleEnd: "Compliance",
      description: "40+ years of excellence in governance, risk advisory, and compliance services, safeguarding enterprise assets with advanced, compliance-integrated GRC frameworks.",
      image: heroVerify,
    },
    {
      badge: "Our Leadership",
      title: "Guided by",
      highlight: "Experience",
      titleEnd: "& Core Values",
      description: "Led by decorated ex-military professionals and compliance veterans with deep expertise in governance structures, regulatory frameworks, and enterprise risk consulting.",
      image: heroCommand,
    },
    {
      badge: "Our Values",
      title: "Integrity,",
      highlight: "Vigilance",
      titleEnd: "& Excellence",
      description: "Honesty and transparency are the bedrock of our operations. We don't settle for 'good enough' - we aim for zero deviation in corporate compliance and governance.",
      image: heroAiDriven,
    },
    {
      badge: "Our Impact",
      title: "Trusted by",
      highlight: "1000+ Enterprises",
      titleEnd: "Nationwide",
      description: "Providing ISO-certified compliance auditing services with pan-India coverage, physical-logical alignment safeguards, and 24/7 autonomous monitoring support.",
      image: heroIntegration,
    }
  ];

  // Filtering logic for office locations
  const regions = ["All", "South", "North", "East", "West", "Islands"];

  const filteredLocations = officeLocations.filter((loc) => {
    const matchesRegion = selectedRegion === "All" || loc.region === selectedRegion;
    const matchesSearch = loc.city.toLowerCase().includes(searchCity.toLowerCase()) || 
                          loc.state.toLowerCase().includes(searchCity.toLowerCase()) ||
                          loc.title.toLowerCase().includes(searchCity.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const activeBranches = filteredLocations.filter(loc => 
    !loc.address.some(line => line.includes("Coming Soon"))
  );

  const comingSoonCenters = filteredLocations.filter(loc => 
    loc.address.some(line => line.includes("Coming Soon"))
  );

  useEffect(() => {
    document.title = "About GOVENICS | Enterprise GRC Advisory by ISI Group";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Founded by decorated ex-defence leaders, GOVENICS GRC brings 40+ years of ISI Group\'s security and governance expertise to enterprise risk management, compliance, and GRC advisory services across India.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
    return () => {
      document.title = "GOVENICS | Enterprise Governance, Risk & Compliance Consulting";
    };
  }, []);

  return (
    <Layout>
      <div className="bg-white pb-24 text-slate-600 relative">
        
        {/* Panel 1: Hero Slider */}
        <GrcSliderHero 
          slides={aboutHeroSlides} 
          backLink={{ to: "/", label: "Back to Home" }}
          categoryLabel="Corporate Information"
        />

        {/* Panel 2: Stats Grid */}
        <section className="py-6 relative overflow-hidden bg-white border-b border-slate-100 -mt-16 z-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {aboutStats.map((stat, idx) => (
                  <div key={idx} className="text-center p-4 border-r border-slate-800 last:border-0">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-500 mb-2">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Panel 3: Our Approach Section */}
        <section className="py-16 bg-slate-50/50 border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col items-center text-center space-y-4">
              
              {/* Section Label */}
              <div className="flex items-center gap-2.5">
                <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] py-1 px-3 border border-blue-200 rounded-full bg-blue-50">
                  How We Work
                </span>
              </div>

              {/* Main Statement */}
              <div className="max-w-4xl space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading leading-tight">
                  <span className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Our Integrated Approach</span>
                  Combining{" "}
                  <span className="text-slate-700 underline decoration-slate-300 decoration-2 underline-offset-4 font-extrabold">
                    Physical Security Roots
                  </span>{" "}
                  with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 font-extrabold">
                    Enterprise GRC Intelligence
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-semibold">
                  ISI Group began as a physical security organisation in 1985. Over four decades, that foundation evolved into a comprehensive governance, risk, and compliance advisory practice — one that understands operational realities because we have always operated within them.
                </p>
              </div>

              {/* Approach Cards */}
              <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl pt-8">
                
                {/* Ground-Up Card */}
                <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all text-left">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
                    <Building2 className="w-6 h-6 text-slate-500" />
                  </div>
                  <h4 className="text-lg font-black text-slate-950 mb-2">Operational Experience</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                    Decades of managing physical security, personnel deployment, and facility compliance across industries gives our advisors first-hand insight into the risks organisations actually face.
                  </p>
                </div>

                {/* Advisory Intelligence Card */}
                <div className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl text-left overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <h4 className="text-lg font-black text-white mb-2">GRC Advisory Practice</h4>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                    Our GRC division layers statutory compliance tracking, risk framework design, and governance advisory on top of that operational foundation — delivering integrated, practical governance solutions.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Panel 4: Mission & Vision */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Mission & Vision Statements */}
              <div className="space-y-10">
                <div className="relative pl-6 border-l-4 border-blue-600 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">Our Mission</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                    To empower enterprise organizations with resilient security architectures and compliance talent that dynamically adapt to evolving threats, ensuring operational continuity and corporate peace of mind.
                  </p>
                </div>
                
                <div className="relative pl-6 border-l-4 border-indigo-600 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">Our Vision</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                    To be the undisputed global benchmark for integrated security and GRC operations, where human integrity is amplified by robust governance and strategic vigilance.
                  </p>
                </div>
              </div>

              {/* Values Cards */}
              <div className="flex flex-col gap-4">
                {missionVisionValues.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/60 hover:border-blue-500/30 hover:bg-slate-50/80 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-black text-slate-900 mb-1">{val.title}</h4>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">{val.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* Panel 5: Leadership Board */}
        <section className="py-16 bg-slate-50/50 border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12 space-y-2">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Board & Executives
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                Board of Directors & Executive Management
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-2xl mx-auto">
                Meet the experienced compliance officers and industry veterans guiding Govenics GRC's operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allLeaders.map((leader, idx) => (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-end aspect-[3/4.2] transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <img 
                    src={leader.img} 
                    alt={`${leader.name}, ${leader.role}`} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Leadership Card Content */}
                  <div className="relative z-10 p-6 sm:p-8 text-left space-y-3 flex flex-col justify-end h-full">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-0.5">{leader.name}</h3>
                      <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">{leader.role}</p>
                    </div>

                    {/* Bio expandable details */}
                    <div className="max-h-0 group-hover:max-h-60 overflow-y-auto transition-all duration-700 ease-in-out pr-1 scrollbar-thin">
                      <p className="text-slate-350 text-[11px] font-medium leading-relaxed text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {leader.bio}
                      </p>
                    </div>

                    {/* Accent bar line */}
                    <div className="h-1 w-10 bg-blue-500 mt-2 rounded-full group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Panel 6: Company Timeline */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12 space-y-2">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Corporate History
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                A Legacy of Trust & Tech
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                Setting industry standards in governance, compliance, and enterprise risk management.
              </p>
            </div>

            <div className="relative max-w-3xl mx-auto md:max-w-5xl">
              {/* Central vertical line */}
              <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 -translate-x-1/2" />

              <div className="space-y-12 relative z-10">
                {timelineData.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex flex-col md:flex-row items-start md:items-center justify-between ${
                      idx % 2 === 0 ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Circle Dot marker centered on vertical line */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-blue-600 shadow-md z-10" />

                    {/* Content Panel with appropriate side margins and alignment */}
                    <div className={`w-full md:w-5/12 pl-10 md:pl-0 ${
                      idx % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10"
                    }`}>
                      <span className="text-3xl font-black text-blue-600/35 block mb-1">{item.year}</span>
                      <h4 className="text-sm font-black text-slate-900 mb-1.5">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="hidden md:block w-5/12" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Panel 7: Office Locations Directory */}
        <section className="py-16 bg-slate-50/50 border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12 space-y-2">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                National Network
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                Our Office Locations & Addresses
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-xl mx-auto">
                With a pan-India network of branches, command centers, and administrative offices, we provide localized support on a national scale.
              </p>
            </div>

            {/* Filter and Search Bar controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 mb-8 shadow-sm">
              {/* Region Filter buttons */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {regions.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedRegion === reg
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>

              {/* City Text Search */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search city or office..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Active Locations Display */}
            <div className="space-y-6 text-left">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-2 border-blue-600 pl-2">
                Active Office Directory ({activeBranches.length})
              </h3>

              {activeBranches.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeBranches.map((loc) => (
                    <div 
                      key={loc.id} 
                      className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4 hover:border-blue-500/30 hover:shadow-lg transition-all"
                    >
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[8px] font-black text-slate-500 uppercase tracking-wider">
                          {loc.title}
                        </span>
                        <h4 className="text-base font-black text-slate-900">{loc.city} Office</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{loc.state} • {loc.region} Region</p>
                      </div>

                      <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                        {/* Address */}
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            {loc.address.map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        </div>

                        {/* Phone */}
                        {loc.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                            <span>{loc.phone}</span>
                          </div>
                        )}

                        {/* Email */}
                        {loc.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                            <a href={`mailto:${loc.email}`} className="text-blue-600 hover:underline">{loc.email}</a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl text-slate-400 font-semibold text-xs">
                  No active offices found matching filters.
                </div>
              )}
            </div>

            {/* Coming Soon Centers Display */}
            <div className="space-y-6 text-left mt-12">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-2 border-slate-400 pl-2">
                Operational Expansion: Coming Soon Centers ({comingSoonCenters.length})
              </h3>

              {comingSoonCenters.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {comingSoonCenters.map((loc) => (
                    <div 
                      key={loc.id} 
                      className="bg-slate-100/50 border border-slate-200/50 rounded-xl p-4 flex flex-col justify-between hover:bg-slate-100 transition-all text-center"
                    >
                      <div>
                        <h4 className="text-xs font-black text-slate-800">{loc.city}</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{loc.state}</p>
                      </div>
                      <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-slate-200/50 text-[8px] font-bold text-slate-500">
                        Expansion Planned
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-slate-50 rounded-xl text-slate-400 font-semibold text-xs">
                  No expansion centers found matching filters.
                </div>
              )}
            </div>

          </div>
        </section>

      </div>
    </Layout>
  );
}
