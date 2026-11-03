// api/lib/portals/customerService.js
// Phase 8.1 & 8.2 — Customer Registration, Multi-Tenant Architecture & Workspaces

import crypto from "crypto";
import { redis, KEYS } from "../redis.js";

let IN_MEMORY_CUSTOMERS = new Map();

// Seed primary enterprise customer
const DEMO_CUSTOMER = {
  orgId: "ORG-GOVENICS-DEMO",
  organizationName: "Acme Industrial Technologies Ltd",
  legalEntityName: "Acme Industrial Technologies Private Limited",
  cinOrLlpPin: "U29253PN2015PTC154820",
  industry: "Manufacturing & Industrial",
  subIndustry: "Precision Engineering & Heavy Machinery",
  country: "India",
  state: "Maharashtra",
  businessLocations: ["Pune Plant (HQ)", "Bengaluru R&D Hub", "Chennai Assembly"],
  employeeCount: 1250,
  organizationSize: "Enterprise (1000+)",
  contactPerson: "Rajesh V. Patil",
  businessEmail: "admin@acme-ind.com",
  mobileNumber: "+91 98220 12345",
  designatedAdministrator: "admin@acme-ind.com",
  isActive: true,
  onboardingStep: "Completed",
  subscriptionTier: "Enterprise",
  invitedMembers: [
    { email: "compliance@acme-ind.com", role: "Compliance Manager", status: "Active" },
    { email: "ciso@acme-ind.com", role: "Department Head", status: "Active" },
    { email: "ehs.lead@acme-ind.com", role: "Department Head", status: "Active" }
  ],
  supportTicketsCount: 2,
  createdAt: "2026-01-15T09:00:00Z"
};

IN_MEMORY_CUSTOMERS.set(DEMO_CUSTOMER.orgId, DEMO_CUSTOMER);

export async function getCustomerOrganization(orgId) {
  const target = orgId || "ORG-GOVENICS-DEMO";
  return IN_MEMORY_CUSTOMERS.get(target) || null;
}

export async function registerCustomerOrganization(formData) {
  const orgId = `ORG-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  const now = new Date().toISOString();

  const record = {
    ...formData,
    orgId,
    isActive: true,
    onboardingStep: "Profile Created",
    subscriptionTier: formData.subscriptionTier || "Professional",
    invitedMembers: [],
    supportTicketsCount: 0,
    createdAt: now,
    updatedAt: now
  };

  IN_MEMORY_CUSTOMERS.set(orgId, record);
  return record;
}

export async function inviteOrganizationMember(orgId, email, role) {
  const customer = IN_MEMORY_CUSTOMERS.get(orgId);
  if (!customer) throw new Error(`Organization '${orgId}' not found.`);

  const invite = {
    inviteId: `INV-${Date.now().toString().slice(-4)}`,
    email,
    role: role || "Compliance Manager",
    status: "Invitation Sent",
    invitedAt: new Date().toISOString()
  };

  customer.invitedMembers = customer.invitedMembers || [];
  customer.invitedMembers.push(invite);
  IN_MEMORY_CUSTOMERS.set(orgId, customer);
  return invite;
}

