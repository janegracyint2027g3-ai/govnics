import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Shield, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, 
  CalendarClock 
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { homeSpicedSlides } from "@/data/spiced-slider-content";

const grcSlides = homeSpicedSlides;

export const GrcHero = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % grcSlides.length);
    }, 5500);
  }, []);

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
    setActiveIndex((prev) => (prev - 1 + grcSlides.length) % grcSlides.length);
    if (!isHovered) startAutoPlay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    stopAutoPlay();
    setActiveIndex((prev) => (prev + 1) % grcSlides.length);
    if (!isHovered) startAutoPlay();
  };

  const handleDotClick = (index: number) => {
    stopAutoPlay();
    setActiveIndex(index);
    if (!isHovered) startAutoPlay();
  };

  // Stagger variants for slide contents
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
      className="relative min-h-[92dvh] flex flex-col justify-center bg-white overflow-hidden select-none pt-28 md:pt-36 pb-20 md:pb-24 border-b border-slate-200/80"
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
            style={{ backgroundImage: `url(${grcSlides[activeIndex].image})` }}
          />
        </AnimatePresence>
      </div>

      {/* Double White Gradients overlay for elite light layout integration */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent/10 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />

      {/* Decorative Grid Lines to match the clean grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,82,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,82,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] z-10 pointer-events-none" />

      {/* Main Content Overlay */}
      <div className="relative z-20 flex items-center w-full">
        <div className="container mx-auto px-6 md:px-12 w-full">
          <div className="max-w-5xl w-full">
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
                    {grcSlides[activeIndex].badge}
                  </span>
                </motion.div>
                {grcSlides[activeIndex].icp && (
                  <motion.div
                    variants={elementVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/90 border border-blue-200/50 rounded-full shadow-sm"
                  >
                    <span className="text-xs font-extrabold text-blue-750 tracking-[0.03em] uppercase">
                      Target: {grcSlides[activeIndex].icp}
                    </span>
                  </motion.div>
                )}
                {grcSlides[activeIndex].criticalEvent && (
                  <motion.div
                    variants={elementVariants}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50/90 border border-amber-200/80 rounded-full shadow-sm text-amber-800"
                  >
                    <CalendarClock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-[11px] font-bold tracking-tight">
                      Catalyst: {grcSlides[activeIndex].criticalEvent}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Slide Heading with Highlight */}
              <motion.h1
                variants={elementVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight font-heading text-left"
              >
                {grcSlides[activeIndex].title}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent block sm:inline">
                  {grcSlides[activeIndex].highlight}
                </span>{" "}
                {grcSlides[activeIndex].titleEnd}
              </motion.h1>

              {/* Slide Description */}
              <motion.p
                variants={elementVariants}
                className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-sans leading-relaxed font-medium text-left"
              >
                {grcSlides[activeIndex].description}
              </motion.p>

              {/* Tangible Outcome indicator */}
              {grcSlides[activeIndex].outcome && (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <motion.div
                    variants={elementVariants}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50/90 border border-emerald-200/60 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Outcome: {grcSlides[activeIndex].outcome}</span>
                  </motion.div>
                </div>
              )}

              {/* CTA Buttons - 3 button layout */}
              <motion.div
                variants={elementVariants}
                className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-start gap-3 pt-2 w-full"
              >
                {/* Primary CTA — scrolls to assessment form on the same page */}
                <button
                  id="hero-cta-primary"
                  onClick={() => {
                    const el = document.getElementById("lead-capture");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate("/#lead-capture");
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02] shrink-0"
                >
                  Get Free Compliance Assessment <ArrowRight className="w-4 h-4" />
                </button>
                {/* Secondary CTA */}
                <Link to="/contact" className="shrink-0">
                  <button
                    id="hero-cta-secondary"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-2xl text-sm font-bold tracking-wide transition-all hover:scale-[1.02]"
                  >
                    Talk to Our Compliance Experts
                  </button>
                </Link>
                {/* Tertiary CTA */}
                <Link
                  to="/contact"
                  id="hero-cta-demo"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 underline underline-offset-2 shrink-0 transition-colors"
                >
                  Schedule a Compliance Demo →
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={elementVariants}
                className="flex flex-wrap items-center justify-start gap-x-6 md:gap-x-8 gap-y-2.5 pt-5 pb-6 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 border-t border-slate-100 w-full"
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-600 font-semibold">Regulatory Compliance</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-600 font-semibold">Risk Management</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-600 font-semibold">Enterprise Governance</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-600 font-semibold">Industry-Specific Compliance</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
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
        {grcSlides.map((_, index) => (
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

      {/* Progress Bar showing active indicator level */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 z-20">
        <div
          className="h-full bg-blue-600 transition-all duration-700 ease-out"
          style={{ width: `${((activeIndex + 1) / grcSlides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};
