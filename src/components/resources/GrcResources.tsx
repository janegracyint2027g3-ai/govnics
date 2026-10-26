import { useState, useEffect } from "react";
import { resourcesData } from "@/data/resources-data";
import { Search, ArrowRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/utils/analytics";

export const GrcResources = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedGrcType, setSelectedGrcType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "whitepaper", "alert", "update", "report", "blog"];
  const grcTypes = ["All", "Act", "Rule", "Compliance", "Standard"];

  // Debounced search query telemetry
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const timer = setTimeout(() => {
      trackEvent("search", "Labour Law", { query: searchQuery, location: "GRC Knowledge Hub" });
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    trackEvent("filter_change", "Labour Law", { filterType: "format", value: tab });
  };

  const handleGrcTypeChange = (type: string) => {
    setSelectedGrcType(type);
    trackEvent("filter_change", "Labour Law", { filterType: "grcClassification", value: type });
  };

  const filteredItems = resourcesData.filter((item) => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesGrcType = selectedGrcType === "All" || item.grcType === selectedGrcType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesGrcType && matchesSearch;
  });


  return (
    <section className="py-8 bg-transparent border-t border-slate-200/60 relative overflow-hidden">
      <div className="container mx-auto px-6 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <div className="space-y-4 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
              GRC Knowledge Hub
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-heading">
              Resources & Updates
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md font-medium mx-auto">
              Access Govenics' regulatory guides, legislative compliance alerts, and GxP data integrity frameworks.
            </p>
          </div>
 
          {/* Dynamic Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports, alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-5 rounded-2xl bg-white border border-slate-250 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
 
        {/* Tab Filters */}
        <div className="space-y-4 max-w-5xl mx-auto flex flex-col items-center">
          {/* Format Filters */}
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mr-2">Formats:</span>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 border border-slate-200 shadow-sm"
                }`}
              >
                {tab === "All" ? "All Formats" : tab + "s"}
              </button>
            ))}
          </div>

          {/* GRC Classification Filters */}
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mr-2">GRC Topics:</span>
            {grcTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleGrcTypeChange(type)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                  selectedGrcType === type
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 border border-slate-200 shadow-sm"
                }`}
              >
                {type === "All" ? "All Classifications" : type === "Rule" ? "Rules & Guidelines" : type === "Compliance" ? "Compliances" : type === "Standard" ? "Standards" : type + "s"}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white border border-slate-200/85 hover:border-blue-500/20 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl shadow-sm min-h-[300px]"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 items-center">
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-[8px] font-black text-blue-600 uppercase tracking-widest">
                          {item.type}
                        </span>
                        {item.grcType && (
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[8px] font-extrabold text-slate-600 uppercase tracking-widest">
                            {item.grcType}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 font-heading">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-550 leading-relaxed line-clamp-3 font-medium">
                      {item.summary}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>By: {item.author}</span>
                    {item.downloadUrl ? (
                      <button 
                        onClick={() => trackEvent("click", "Labour Law", { action: "download_pdf", title: item.title, resourceId: item.id })}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    ) : (
                      <button 
                        onClick={() => trackEvent("click", "Labour Law", { action: "read_article", title: item.title, resourceId: item.id })}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <span>Read</span> <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
