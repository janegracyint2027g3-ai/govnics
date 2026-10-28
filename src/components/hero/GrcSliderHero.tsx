import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Shield, ChevronLeft, ChevronRight, ArrowLeft, ShieldCheck, 
  CalendarClock, ArrowRight, PlayCircle
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { SpicedBreakdown } from "@/data/spiced-slider-content";

export interface Slide {
  badge: string;
  title: string;
  highlight: string;
  titleEnd?: string;
  description: string;
  image: string;
  icp?: string;
  outcome?: string;
  criticalEvent?: string;
  cta?: string;
  ctaLink?: string;
  secondaryCta?: string;
  secondaryCtaLink?: string;
  spiced?: SpicedBreakdown;
}

interface GrcSliderHeroProps {
  slides: Slide[];
  backLink?: { to: string; label: string };
  categoryLabel?: string;
  showPrimaryCta?: boolean;
}

export const resolveCtaLink = (ctaText?: string, slide?: Slide, currentCategory?: string): string => {
  if (slide?.ctaLink) return slide.ctaLink;
  if (!ctaText) return "/solutions";

  const lower = ctaText.toLowerCase().trim();

  // 1. Partner Ecosystem & Advisory Network
  if (
    lower.includes("partner") ||
    lower.includes("advisory network") ||
    lower.includes("tech alliance") ||
    lower.includes("portfolio") ||
    lower.includes("co-author") ||
    lower.includes("alliance")
  ) {
    return "/partners#partner-form";
  }

  // 2. Cyber Security & Threat Telemetry
  if (
    lower.includes("cyber") ||
    lower.includes("cert-in") ||
    lower.includes("soc 2") ||
    lower.includes("iso") ||
    lower.includes("vapt") ||
    lower.includes("ransomware") ||
    lower.includes("devsecops") ||
    lower.includes("privacy posture") ||
    lower.includes("dpdp") ||
    lower.includes("defense")
  ) {
    return "/cybersecurity";
  }

  // 3. ESG & BRSR Sustainability
  if (
    lower.includes("esg") ||
    lower.includes("brsr") ||
    lower.includes("carbon") ||
    lower.includes("climate") ||
    lower.includes("ehs") ||
    lower.includes("supply chain esg")
  ) {
    return "/esg";
  }

  // 4. Managed Staffing & Payroll
  if (
    lower.includes("payroll") ||
    lower.includes("staffing") ||
    lower.includes("fractional") ||
    lower.includes("hiring") ||
    lower.includes("talent") ||
    lower.includes("rpo") ||
    lower.includes("screening model")
  ) {
    return "/staffing";
  }

  // 5. Industry-Specific GRC
  if (lower.includes("manufacturing")) return "/industries/manufacturing";
  if (lower.includes("bfsi")) return "/industries/bfsi";
  if (lower.includes("healthcare")) return "/industries/healthcare";
  if (lower.includes("saas") || lower.includes("gcc")) return "/industries/technology";
  if (lower.includes("infrastructure")) return "/industries/infrastructure";
  if (lower.includes("retail")) return "/industries/retail";
  if (lower.includes("industry")) return "/industries";

  // 6. SGRC / Multi-State / Estimator
  if (lower.includes("multi-state") || lower.includes("statutory grc")) return "/sgrc/services";
  if (lower.includes("checklist") || lower.includes("estimator")) return "/sgrc/estimator";

  // 7. General GRC Division
  if (
    lower.includes("erm") ||
    lower.includes("controls") ||
    lower.includes("vigil") ||
    lower.includes("tprm") ||
    lower.includes("certification")
  ) {
    return "/grc";
  }

  // 8. Contact & Advisory Inquiries
  if (
    lower.includes("diagnostic") ||
    lower.includes("contact") ||
    lower.includes("briefing") ||
    lower.includes("hotline") ||
    lower.includes("advisory call") ||
    lower.includes("consultation")
  ) {
    return "/contact";
  }

  // 9. About / Legacy
  if (
    lower.includes("legacy") ||
    lower.includes("leadership") ||
    lower.includes("office network") ||
    lower.includes("approach")
  ) {
    return "/about";
  }

  // 10. Resources Hub
  if (lower.includes("playbook") || lower.includes("whitepaper") || lower.includes("resource")) {
    return "/resources";
  }

  // 11. Command Center / Solutions
  if (lower.includes("command platform") || lower.includes("solution") || lower.includes("overview")) {
    return "/solutions";
  }

  // Fallback based on category
  if (currentCategory?.toLowerCase().includes("partner")) return "/partners#partner-form";
  if (currentCategory?.toLowerCase().includes("cyber")) return "/cybersecurity";
  if (currentCategory?.toLowerCase().includes("esg")) return "/esg";
  if (currentCategory?.toLowerCase().includes("staffing")) return "/staffing";
  if (currentCategory?.toLowerCase().includes("industry")) return "/industries";
  if (currentCategory?.toLowerCase().includes("contact")) return "/contact";
  if (currentCategory?.toLowerCase().includes("about")) return "/about";

  return "/solutions";
};

export const GrcSliderHero = ({ slides, backLink, categoryLabel = "Solution", showPrimaryCta = true }: GrcSliderHeroProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
  }, [slides.length]);

  const stopAutoPlay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isHovered, startAutoPlay, stopAutoPlay]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    stopAutoPlay();
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    if (!isHovered) startAutoPlay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    stopAutoPlay();
    setActiveIndex((prev) => (prev + 1) % slides.length);
    if (!isHovered) startAutoPlay();
  };

  const handleDotClick = (index: number) => {
    stopAutoPlay();
    setActiveIndex(index);
    if (!isHovered) startAutoPlay();
  };

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const elementVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative min-h-[85dvh] flex items-center bg-white overflow-hidden pt-28 md:pt-36 pb-24 md:pb-28 select-none border-b border-slate-200/85"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Carousel Container */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[activeIndex].image})` }}
          />
        </AnimatePresence>
      </div>

      {/* Double White Gradients overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent/10 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,82,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,82,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] z-10 pointer-events-none" />

      {/* Main Content Overlay */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-start justify-center text-left w-full h-full">
        {backLink && (
          <div className="mb-4">
            <Link to={backLink.to}>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm">
                <ArrowLeft className="w-4 h-4" /> {backLink.label}
              </button>
            </Link>
          </div>
        )}

        <div className="max-w-6xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              className="space-y-4 md:space-y-5 flex flex-col items-start text-left"
            >
              {/* Premium GRC Badge & Target ICP & Critical Event */}
              <div className="flex flex-wrap items-center justify-start gap-2.5">
                <motion.div
                  variants={elementVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/90 border border-slate-200 rounded-full shadow-sm"
                >
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-extrabold text-slate-700 tracking-[0.2em] uppercase">
                    {categoryLabel} • {slides[activeIndex].badge}
                  </span>
                </motion.div>
                {slides[activeIndex].icp && (
                  <motion.div
                    variants={elementVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/90 border border-blue-200/50 rounded-full shadow-sm"
                  >
                    <span className="text-xs font-extrabold text-blue-750 tracking-[0.03em] uppercase">
                      Target: {slides[activeIndex].icp}
                    </span>
                  </motion.div>
                )}
                {slides[activeIndex].criticalEvent && (
                  <motion.div
                    variants={elementVariants}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50/90 border border-amber-200/80 rounded-full shadow-sm text-amber-800"
                  >
                    <CalendarClock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-[11px] font-bold tracking-tight">
                      Catalyst: {slides[activeIndex].criticalEvent}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Slide Heading with Highlight */}
              <motion.h1
                variants={elementVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight font-heading text-left"
              >
                {slides[activeIndex].title}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent block sm:inline">
                  {slides[activeIndex].highlight}
                </span>{" "}
                {slides[activeIndex].titleEnd}
              </motion.h1>

              {/* Slide Description */}
              <motion.p
                variants={elementVariants}
                className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-sans leading-relaxed font-medium text-left"
              >
                {slides[activeIndex].description}
              </motion.p>

              {/* Tangible Outcome */}
              {slides[activeIndex].outcome && (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <motion.div
                    variants={elementVariants}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50/90 border border-emerald-200/60 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Outcome: {slides[activeIndex].outcome}</span>
                  </motion.div>
                </div>
              )}

              {/* CTA Buttons */}
              <motion.div
                variants={elementVariants}
                className="flex flex-row flex-wrap items-center justify-start gap-4 pt-2 w-full"
              >
                {showPrimaryCta && slides[activeIndex].cta && (() => {
                  const ctaDestination = resolveCtaLink(slides[activeIndex].cta, slides[activeIndex], categoryLabel);
                  const isHash = ctaDestination.includes("#");
                  const [ctaPath, ctaHash] = isHash ? ctaDestination.split("#") : [ctaDestination, ""];

                  const handleCtaClick = (e: React.MouseEvent) => {
                    e.preventDefault();
                    // If we're already on the target page and there's a hash, scroll to it
                    if (isHash && location.pathname === ctaPath) {
                      const el = document.getElementById(ctaHash);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                        return;
                      }
                    }
                    // Otherwise navigate (React Router handles hash scrolling on next render)
                    navigate(ctaDestination);
                  };

                  return (
                    <button
                      onClick={handleCtaClick}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 text-sm font-bold transition-all hover:scale-[1.02] shrink-0"
                    >
                      {slides[activeIndex].cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  );
                })()}

                {/* Secondary "Watch Overview" button — navigates to Solutions platform overview */}
                {(() => {
                  const secondaryLabel = slides[activeIndex].secondaryCta || "Watch Overview";
                  const secondaryDest = slides[activeIndex].secondaryCtaLink ||
                    resolveCtaLink(secondaryLabel, slides[activeIndex], categoryLabel);

                  const handleSecondaryClick = (e: React.MouseEvent) => {
                    e.preventDefault();
                    navigate(secondaryDest);
                  };

                  return (
                    <button
                      onClick={handleSecondaryClick}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-2xl text-sm font-bold transition-all hover:scale-[1.02] shrink-0"
                    >
                      <PlayCircle className="w-4 h-4 text-blue-600" />
                      {secondaryLabel}
                    </button>
                  );
                })()}
              </motion.div>

              {/* Trust Indicators matching homepage style */}
              <motion.div
                variants={elementVariants}
                className="flex flex-wrap items-center justify-start gap-x-6 md:gap-x-8 gap-y-2.5 pt-5 pb-6 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 border-t border-slate-200/60 w-full"
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-600 font-semibold">100% Statutory Assurance</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-600 font-semibold">15+ Enterprise Industries</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-600 font-semibold">SLA & Cyber Guaranteed</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Manual Slide Navigation Arrows */}
      <div className="absolute right-6 md:right-12 bottom-5 z-30 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-9 h-9 bg-white/95 hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200 rounded-xl transition-all shadow-md active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="flex items-center justify-center w-9 h-9 bg-white/95 hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200 rounded-xl transition-all shadow-md active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Dot Indicators */}
      <div className="absolute bottom-5 left-6 md:left-12 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`relative h-2 rounded-full transition-all duration-500 ${
              activeIndex === index
                ? "w-8 bg-blue-600"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {activeIndex === index && (
              <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30" />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 z-20">
        <div
          className="h-full bg-blue-600 transition-all duration-700 ease-out"
          style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};
