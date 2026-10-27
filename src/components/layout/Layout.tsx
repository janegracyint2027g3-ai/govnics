import React, { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";
import { GrcExitIntentPopup } from "../ui/GrcExitIntentPopup";
import { GrcChatBot } from "../ai/GrcChatBot";
import { QuickInquiry } from "../ui/QuickInquiry";

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
  hideHeaderFooter?: boolean;
}

export const Layout = ({ children, noPadding = false, hideHeaderFooter = false }: LayoutProps) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.startsWith("#") ? hash.substring(1) : hash;
      
      const scrollToHash = () => {
        const element = document.getElementById(elementId);
        if (element) {
          const headerOffset = 110; // Account for the sticky header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          return true;
        }
        return false;
      };

      // Try scrolling immediately
      if (!scrollToHash()) {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (scrollToHash() || attempts >= 15) {
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-clip select-none selection:bg-blue-600/10 selection:text-blue-600 text-foreground relative z-0">
      {/* Elegant light slate gridlines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none -z-10" />

      {!hideHeaderFooter && <Header />}
      <main className={`flex-grow relative ${noPadding || hideHeaderFooter ? "" : "pt-32"}`}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
      {!hideHeaderFooter && <GrcChatBot />}
      {!hideHeaderFooter && <QuickInquiry />}
      <GrcExitIntentPopup />
    </div>
  );
};

