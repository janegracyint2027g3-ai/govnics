// api/lib/portals/leadLifecycleService.js
// Phase 8.5 — Lead-to-Customer Lifecycle & Partner Referral Architecture
// Visitor -> Enquiry -> Lead -> Qualification -> Consultation -> Proposal -> Customer -> Onboarding -> Subscription -> Retention

let IN_MEMORY_LEADS = [
  {
    leadId: "LEAD-2026-081",
    companyName: "Bharat Precision Forgings Pvt Ltd",
    contactName: "Sanjay Gupta",
    email: "sanjay@bharat-precision.com",
    phone: "+91 98111 23456",
    industry: "Automotive & Auto Components",
    state: "Tamil Nadu",
    currentStage: "Proposal",
    leadScore: 88,
    assignedAdvisor: "Senior GRC Consultant R. Kumar",
    enquiryDate: "2026-10-12",
    consultationDate: "2026-10-18",
    proposalSentDate: "2026-10-24",
    estimatedAnnualValueInr: 599990,
    status: "Active Opportunity"
  }
];

let IN_MEMORY_PARTNERS = [
  {
    partnerId: "PTR-001",
    partnerName: "KPMG Advisory Alliance",
    partnerType: "Audit & Advisory Firm",
    contactEmail: "alliances@kpmg-partner.com",
    commissionRatePercentage: 15,
    totalReferrals: 12,
    activeSubscribers: 8,
    totalEarnedInr: 720000,
    status: "Verified Partner"
  }
];

export function getLeadsList() {
  return IN_MEMORY_LEADS;
}

export function createLeadEnquiry(enquiryData) {
  const leadId = `LEAD-2026-${Date.now().toString().slice(-4)}`;
  const newLead = {
    ...enquiryData,
    leadId,
    currentStage: "Qualification",
    leadScore: 65,
    enquiryDate: new Date().toISOString().split("T")[0],
    status: "New Lead"
  };
  IN_MEMORY_LEADS.push(newLead);
  return newLead;
}

export function getPartnersList() {
  return IN_MEMORY_PARTNERS;
}

