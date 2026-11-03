// api/lib/portals/billingService.js
// Phase 8.4 — Subscription & Billing Sandbox Architecture
// 4 Subscription Tiers, Sandbox Invoicing, and Payment Checkout Simulations

export const SUBSCRIPTION_PLANS = [
  {
    planId: "PLAN-STARTER",
    name: "Starter",
    tagline: "Essential compliance management for single-facility growing enterprises",
    monthlyPriceInr: 24999,
    annualPriceInr: 249990,
    features: {
      organizationsCapacity: 1,
      userSeats: 5,
      aiRequestMonthlyAllowance: 500,
      availableAgents: "12 Specialist Agents",
      documentStorageGb: 10,
      assessmentsPerMonth: 5,
      auditsCapacity: 2,
      scheduledReports: "Monthly PDF",
      integrations: "Slack & Email",
      supportLevel: "Standard Business Hours Email Support"
    }
  },
  {
    planId: "PLAN-PRO",
    name: "Professional",
    tagline: "Comprehensive regulatory intelligence for multi-state industrial businesses",
    monthlyPriceInr: 59999,
    annualPriceInr: 599990,
    features: {
      organizationsCapacity: 3,
      userSeats: 25,
      aiRequestMonthlyAllowance: 2500,
      availableAgents: "20 Agents (All Specialists + Cross-Functional)",
      documentStorageGb: 100,
      assessmentsPerMonth: 25,
      auditsCapacity: 10,
      scheduledReports: "Weekly & Monthly Executive Briefings",
      integrations: "Google Workspace, Microsoft 365, Slack",
      supportLevel: "Priority 8-hour SLA Response"
    }
  },
  {
    planId: "PLAN-BIZ",
    name: "Business",
    tagline: "High-velocity GRC automation with Jira integration & CAPA workflows",
    monthlyPriceInr: 129999,
    annualPriceInr: 1299990,
    features: {
      organizationsCapacity: 10,
      userSeats: 100,
      aiRequestMonthlyAllowance: 10000,
      availableAgents: "All 36 Agents (including 16 Extraction Specialists)",
      documentStorageGb: 500,
      assessmentsPerMonth: "Unlimited",
      auditsCapacity: 50,
      scheduledReports: "Real-time BI Dashboards & Board Packs",
      integrations: "All Connectors + REST API + Webhooks",
      supportLevel: "Dedicated Compliance Account Manager"
    }
  },
  {
    planId: "PLAN-ENT",
    name: "Enterprise",
    tagline: "Bespoke compliance architecture, dedicated VPC, and white-label readiness",
    monthlyPriceInr: 299999,
    annualPriceInr: 2999990,
    features: {
      organizationsCapacity: "Unlimited",
      userSeats: "Unlimited",
      aiRequestMonthlyAllowance: "Custom High-Throughput",
      availableAgents: "Full Autonomous AI Agent Fleet",
      documentStorageGb: "Multi-Terabyte Encrypted S3/Blob",
      assessmentsPerMonth: "Unlimited Multi-Tenant",
      auditsCapacity: "Enterprise Full Scope",
      scheduledReports: "Custom Executive Board Charters",
      integrations: "SAP ERP, Oracle, Custom Connectors",
      supportLevel: "24/7/365 Dedicated Legal & Infosec Hotline"
    }
  }
];

let IN_MEMORY_INVOICES = [
  {
    invoiceId: "INV-2026-0042",
    orgId: "ORG-GOVENICS-DEMO",
    planName: "Enterprise Plan",
    billingCycle: "Annual",
    amountInr: 2999990,
    gstTaxInr: 539998.20,
    totalInr: 3539988.20,
    status: "Paid",
    paymentMethod: "Bank NEFT / Sandbox Gateway",
    transactionRef: "TXN-SANDBOX-984210948",
    invoiceDate: "2026-01-15",
    paidDate: "2026-01-16",
    downloadUrl: "https://billing.govenics.com/invoices/INV-2026-0042.pdf"
  }
];

export function getSubscriptionPlans() {
  return SUBSCRIPTION_PLANS;
}

export function getCustomerInvoices(orgId) {
  const target = orgId || "ORG-GOVENICS-DEMO";
  return IN_MEMORY_INVOICES.filter(i => i.orgId === target);
}

export function createSandboxCheckout(orgId, planId, billingCycle = "Annual") {
  const plan = SUBSCRIPTION_PLANS.find(p => p.planId === planId) || SUBSCRIPTION_PLANS[1];
  const amount = billingCycle === "Annual" ? plan.annualPriceInr : plan.monthlyPriceInr;
  const gst = amount * 0.18;
  const total = amount + gst;

  const invoiceId = `INV-2026-${Date.now().toString().slice(-4)}`;
  const orderId = `ORD-SANDBOX-${Date.now().toString().slice(-6)}`;

  const newInvoice = {
    invoiceId,
    orgId: orgId || "ORG-GOVENICS-DEMO",
    orderId,
    planName: `${plan.name} Plan`,
    billingCycle,
    amountInr: amount,
    gstTaxInr: parseFloat(gst.toFixed(2)),
    totalInr: parseFloat(total.toFixed(2)),
    status: "Simulated Success (Sandbox Mode)",
    paymentMethod: "Simulated Test Card (4242-XXXX-XXXX-4242)",
    transactionRef: `TXN-SANDBOX-${Date.now()}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    paidDate: new Date().toISOString().split("T")[0],
    downloadUrl: `https://billing.govenics.com/invoices/${invoiceId}.pdf`
  };

  IN_MEMORY_INVOICES.push(newInvoice);

  return {
    success: true,
    sandboxMode: true,
    message: "Sandbox payment simulated successfully without debiting live currency.",
    invoice: newInvoice
  };
}

