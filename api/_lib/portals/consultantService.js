// api/lib/portals/consultantService.js
// Phase 8.3 — Consultant Portal & Professional GRC Advisory Workflows
// Features: Consultant registration, assigned clients, audit assignments, legal verification tasks, timesheets.

let IN_MEMORY_CONSULTANTS = new Map();

const SEED_CONSULTANTS = [
  {
    consultantId: "CNS-001",
    name: "Adv. Rajesh Kumar",
    barCouncilNumber: "D/1428/2008",
    specialization: ["Corporate Law", "DPDP Act", "Labour Codes"],
    email: "rajesh.kumar@govenics-advisory.com",
    assignedOrganizations: [
      { orgId: "ORG-GOVENICS-DEMO", orgName: "Acme Industrial Technologies Ltd", role: "Principal Regulatory Counsel" }
    ],
    assignedAudits: ["AUD-2026-001", "AUD-2026-002"],
    legalVerificationTasks: [
      { taskId: "VER-001", provisionId: "PRV-DPDP-SEC006", status: "Verified" },
      { taskId: "VER-002", provisionId: "PRV-FACT-SEC040B", status: "Verified" }
    ],
    timesheets: [
      { date: "2026-10-25", clientOrg: "ORG-GOVENICS-DEMO", hours: 4.5, description: "Review of draft POSH Internal Committee annual return." },
      { date: "2026-10-28", clientOrg: "ORG-GOVENICS-DEMO", hours: 6.0, description: "Attendance and legal sign-off on ROC Form AOC-4." }
    ],
    status: "Active",
    hourlyRateInr: 6500,
    totalLoggedHours: 104.5
  }
];

for (const c of SEED_CONSULTANTS) {
  IN_MEMORY_CONSULTANTS.set(c.consultantId, c);
}

export function getAllConsultants() {
  return Array.from(IN_MEMORY_CONSULTANTS.values());
}

export function getConsultantById(consultantId) {
  return IN_MEMORY_CONSULTANTS.get(consultantId) || null;
}

export function logConsultantTimesheet(consultantId, entry) {
  const c = IN_MEMORY_CONSULTANTS.get(consultantId);
  if (!c) throw new Error("Consultant not found");

  const newLog = {
    logId: `LOG-${Date.now().toString().slice(-4)}`,
    date: entry.date || new Date().toISOString().split("T")[0],
    clientOrg: entry.clientOrg || "ORG-GOVENICS-DEMO",
    hours: parseFloat(entry.hours) || 1.0,
    description: entry.description || "Regulatory advisory consultation"
  };

  c.timesheets.push(newLog);
  c.totalLoggedHours = (c.totalLoggedHours || 0) + newLog.hours;
  IN_MEMORY_CONSULTANTS.set(consultantId, c);
  return newLog;
}

