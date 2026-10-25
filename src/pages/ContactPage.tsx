import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcContact } from "@/components/contact/GrcContact";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";
import { contactSpicedSlides } from "@/data/spiced-slider-content";

export default function ContactPage() {
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

  const slides = contactSpicedSlides;

  return (
    <Layout>
      <div className="bg-white">
        <GrcSliderHero slides={slides} categoryLabel="Contact Us" />
        <div className="bg-background min-h-[70vh]">
          <GrcContact />
        </div>
      </div>
    </Layout>
  );
}
