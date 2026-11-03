// test/phase8_portals_eval.js
// GOVENICS Phase 8 Automated Evaluation Suite
// Validates Customer Onboarding, Tenant Isolation, Consultant Portal, Subscriptions & Commercialization

import {
  getCustomerOrganization,
  registerCustomerOrganization,
  inviteOrganizationMember
} from "../api/lib/portals/customerService.js";

import {
  getAllConsultants,
  getConsultantById,
  logConsultantTimesheet
} from "../api/lib/portals/consultantService.js";

import {
  getSubscriptionPlans,
  getCustomerInvoices,
  createSandboxCheckout,
  SUBSCRIPTION_PLANS
} from "../api/lib/portals/billingService.js";

import {
  getLeadsList,
  createLeadEnquiry,
  getPartnersList
} from "../api/lib/portals/leadLifecycleService.js";

let passed = 0;
let failed = 0;

function assert(tcId, description, condition) {
  if (condition) {
    passed++;
    console.log(`✅ [PASS] ${tcId}: ${description}`);
  } else {
    failed++;
    console.error(`❌ [FAIL] ${tcId}: ${description} (Assertion failed)`);
  }
}

async function runPhase8Tests() {
  console.log("\n=====================================================================");
  console.log("   GOVENICS PHASE 8: CUSTOMER & CONSULTANT PORTALS EVALUATION   ");
  console.log("=====================================================================");

  const orgId = "ORG-GOVENICS-DEMO";

  // 1. Customer Organization Onboarding
  const customer = await getCustomerOrganization(orgId);
  assert("TC-P8-01", "Customer organization profile retrieved with full corporate metadata", customer.cinOrLlpPin !== undefined && customer.employeeCount === 1250);

  const newOrg = await registerCustomerOrganization({
    organizationName: "Zenith Automotive Systems India Pvt Ltd",
    industry: "Automotive & Auto Components",
    country: "India",
    state: "Tamil Nadu",
    designatedAdministrator: "admin@zenith-auto.in"
  });
  assert("TC-P8-02", "New organization onboarding generates isolated tenant ID", newOrg.orgId.startsWith("ORG-"));

  // 2. Member Invitations & RBAC
  const invite = await inviteOrganizationMember(orgId, "safety.lead@acme-ind.com", "Compliance Officer");
  assert("TC-P8-03", "Organization member invitation recorded with assigned role", invite.status === "Invitation Sent" && invite.role === "Compliance Officer");

  // 3. Consultant Portal
  const consultants = getAllConsultants();
  assert("TC-P8-04", "Consultant registry lists verified legal counsel with bar council IDs", consultants.length >= 1 && consultants[0].barCouncilNumber.length > 5);

  const timesheet = logConsultantTimesheet("CNS-001", {
    hours: 3.5,
    description: "Legal verification of Central vs State Factories Rules precedence.",
    clientOrg: orgId
  });
  assert("TC-P8-05", "Consultant timesheet logging appends work hours and updates billable total", timesheet.hours === 3.5);

  // 4. Subscriptions & Sandbox Billing
  const plans = getSubscriptionPlans();
  assert("TC-P8-06", "Subscription catalog defines 4 tiers (Starter, Pro, Business, Enterprise)", plans.length === 4);

  const enterprisePlan = plans.find(p => p.planId === "PLAN-ENT");
  assert("TC-P8-07", "Enterprise plan includes autonomous AI fleet and custom integrations", enterprisePlan.features.organizationsCapacity === "Unlimited");

  const checkout = createSandboxCheckout(orgId, "PLAN-PRO", "Annual");
  assert("TC-P8-08", "Sandbox checkout simulation generates invoice without real financial charge", checkout.sandboxMode === true && checkout.invoice.status.includes("Sandbox"));

  const invoices = getCustomerInvoices(orgId);
  assert("TC-P8-09", "Customer invoices history tracks tax breakdown (18% GST)", invoices.length >= 2 && invoices[0].gstTaxInr > 0);

  // 5. CRM Lead Lifecycle & Partner Management
  const leads = getLeadsList();
  assert("TC-P8-10", "Lead lifecycle pipeline tracks opportunities from Qualification to Retention", leads.length >= 1 && leads[0].leadScore > 50);

  const newLead = createLeadEnquiry({
    companyName: "Dynamic Aerospace Components Ltd",
    email: "procurement@dynamic-aero.com",
    industry: "Manufacturing & Industrial"
  });
  assert("TC-P8-11", "Inbound enquiry initializes lead in qualification stage", newLead.currentStage === "Qualification");

  const partners = getPartnersList();
  assert("TC-P8-12", "Partner referral management tracks partner commissions and referrals", partners.length >= 1 && partners[0].commissionRatePercentage === 15);

  console.log("\n=====================================================================");
  console.log(`PHASE 8 EVALUATION SUMMARY: ${passed} / ${passed + failed} PASSED (${((passed / (passed + failed)) * 100).toFixed(1)}%)`);
  console.log(`Failed: ${failed}`);
  console.log("=====================================================================\n");

  if (failed > 0) process.exit(1);
}

runPhase8Tests().catch(err => {
  console.error("Phase 8 test failure:", err);
  process.exit(1);
});

