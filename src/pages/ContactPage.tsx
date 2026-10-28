import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GrcContact } from "@/components/contact/GrcContact";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { contactSpicedSlides } from "@/data/spiced-slider-content";

export default function ContactPage() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Contact GOVENICS | Book a GRC Consultation";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Connect with GOVENICS GRC experts. Schedule a compliance assessment, request an audit, discuss risk management needs, or explore partnership and staffing enquiries.";
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
    return () => { document.title = "GOVENICS | Enterprise Governance, Risk & Compliance Consulting"; };
  }, []);

  useEffect(() => {
    if (location.hash === "#book-strategy-session") {
      const scrollToSession = () => {
        const el = document.getElementById("book-strategy-session");
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 112;
          window.scrollTo({ top, behavior: "smooth" });
        }
      };
      // Allow DOM to settle after page load/mount
      const timer = setTimeout(scrollToSession, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const slides = contactSpicedSlides;

  return (
    <Layout noPadding={true}>
      <div className="bg-white">
        <GrcSliderHero slides={slides} categoryLabel="Contact Us" />
        <div className="bg-background min-h-[70vh]">
          <GrcContact />
        </div>
      </div>
    </Layout>
  );
}
