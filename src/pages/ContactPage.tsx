import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GrcContact } from "@/components/contact/GrcContact";
import { GrcSliderHero } from "@/components/hero/GrcSliderHero";

import heroAiDriven from "@/assets/hero-ai-driven.jpg";
import heroIntegration from "@/assets/hero-integration.jpg";
import heroVerify from "@/assets/hero-verify.jpg";
import heroCommand from "@/assets/command_center_1.jpg";
import heroSoc from "@/assets/hero-soc.jpg";
import heroDrone from "@/assets/hero-drone.jpg";
import verticalsFacility from "@/assets/verticals-facility.jpg";

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

  const slides = [
    {
      badge: "GRC Assessment",
      title: "You Can't Fix What You Can't See.",
      highlight: "Let's Find Your GRC Blind Spots.",
      description: "Get a comprehensive evaluation of your governance, risk, and compliance posture—because the risks you don't know about are the ones that hurt most.",
      outcome: "Identify your top 3 risk gaps in 5 days with actionable remediation",
      icp: "CROs, Founders & Board Members",
      cta: "Book Assessment",
      image: heroVerify,
    },
    {
      badge: "Inspection Prep",
      title: "Inspections Are Inevitable.",
      highlight: "Failures Are Optional.",
      description: "Tailored audit programs for Labour, EHS, or GST that ensure you're not just ready, but confidently ready—because \"almost compliant\" is completely non-compliant.",
      outcome: "Achieve zero non-compliance points and inspection confidence",
      icp: "Compliance Managers in Manufacturing & Industrial",
      cta: "Request Audit",
      image: verticalsFacility,
    },
    {
      badge: "Vulnerability Audit",
      title: "Your Network Has Weaknesses.",
      highlight: "We Find Them Before Hackers Do.",
      description: "Uncover vulnerabilities in your network and map them to ISO 27001/CERT-In controls—because the best breach is the one that never happens.",
      outcome: "Find critical vulnerabilities in 48 hours with prioritized remediation",
      icp: "CISOs, IT Managers & Security Architects",
      cta: "Get Gap Analysis",
      image: heroSoc,
    },
    {
      badge: "Payroll Health",
      title: "Your PF/ESI Doesn't Match Your Payroll.",
      highlight: "Let's Fix That.",
      description: "Stop guessing if your statutory remittances align with actuals. We reconcile, recover, and rectify—turning compliance guesswork into financial certainty.",
      outcome: "Recover 100% of missed statutory dues and prevent future leakage",
      icp: "CFOs & Finance Controllers",
      cta: "Check Payroll Health",
      image: heroAiDriven,
    },
    {
      badge: "ESG Consulting",
      title: "ESG Reporting Is Complex.",
      highlight: "Your Roadmap Doesn't Have to Be.",
      description: "Strategize your BRSR, GRI, or carbon accounting roadmap with a seasoned specialist—because the right plan today prevents the wrong report tomorrow.",
      outcome: "Define your ESG reporting timeline today with clear milestones",
      icp: "Sustainability Leads, CSOs & ESG Committees",
      cta: "Consult an Expert",
      image: heroDrone,
    },
    {
      badge: "Staffing Consultation",
      title: "Tell Us Your Headcount.",
      highlight: "We'll Design the Risk-Free Model.",
      description: "Share your staffing needs and we'll architect a compliant, scalable workforce solution—because the right structure saves more than it costs.",
      outcome: "Get a customized staffing quote in 24 hours with zero obligation",
      icp: "HR Heads, Project Managers & Operations Directors",
      cta: "Discuss Staffing",
      image: verticalsFacility,
    },
    {
      badge: "Partnership Program",
      title: "Scale Faster Together.",
      highlight: "Partner With Our GRC Ecosystem.",
      description: "Explore technology, referral, or co-selling partnerships—because in the compliance economy, collaboration isn't optional, it's exponential.",
      outcome: "Launch a partnership in under 30 days with full enablement",
      icp: "Business Development Heads at Tech Firms & Consultancies",
      cta: "Become a Partner",
      image: heroIntegration,
    },
    {
      badge: "Crisis Response",
      title: "Crisis Doesn't Wait for Business Hours.",
      highlight: "Neither Do We.",
      description: "Facing an active breach, labor strike, or regulatory emergency? Our CIRT team mobilizes in under 2 hours—because in a crisis, every minute is a million rupees.",
      outcome: "Engage our CIRT team in under 2 hours with 24/7 availability",
      icp: "CEOs, Legal Heads & Crisis Managers in Active Incidents",
      cta: "Call CIRT Now",
      image: heroCommand,
    }
  ];

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
