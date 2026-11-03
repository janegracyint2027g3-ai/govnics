// api/lib/compliance/complianceCalendarService.js
// Phase 6.3 — Compliance Calendar and Deadline Management
// Interactive calendar events, filing deadlines, licence expiries, review reminders, and overdue tracking

import { getComplianceRegister } from "./complianceRegisterService.js";

export async function getComplianceCalendarEvents(orgId, options = {}) {
  const obligations = await getComplianceRegister(orgId);
  const { month, year, department, offering } = options;

  let filtered = obligations;
  if (department) {
    filtered = filtered.filter(o => o.responsibleDepartment?.toLowerCase() === department.toLowerCase());
  }
  if (offering) {
    filtered = filtered.filter(o => o.offering?.toLowerCase() === offering.toLowerCase());
  }

  const now = new Date();

  // Convert obligations to calendar events with recurrence awareness
  const events = [];

  for (const ob of filtered) {
    const due = ob.dueDate ? new Date(ob.dueDate) : new Date(now.getFullYear(), now.getMonth(), 28);
    const isOverdue = due < now && ob.currentStatus !== "Compliant";

    // Filter by year/month if specified
    if (year && due.getFullYear() !== parseInt(year)) continue;
    if (month && due.getMonth() + 1 !== parseInt(month)) continue;

    let eventType = "Statutory Filing";
    if (ob.requirementTitle.toLowerCase().includes("licence") || ob.requirementTitle.toLowerCase().includes("permit")) {
      eventType = "Licence Expiry / Renewal";
    } else if (ob.frequency === "Annual" || ob.frequency === "Half-yearly") {
      eventType = "Periodic Audit / Review";
    }

    events.push({
      eventId: `EVT-${ob.complianceId}`,
      complianceId: ob.complianceId,
      title: ob.requirementTitle,
      actName: ob.actName,
      section: ob.sectionRuleClause,
      responsibleDepartment: ob.responsibleDepartment,
      assignedOwner: ob.assignedOwner,
      dueDate: due.toISOString().split("T")[0],
      frequency: ob.frequency,
      status: ob.currentStatus,
      riskRating: ob.riskRating,
      isOverdue,
      eventType,
      evidenceRequiredCount: ob.evidenceRequired ? ob.evidenceRequired.length : 0,
      officialSourceUrl: ob.officialSourceUrl
    });
  }

  // Sort events chronologically
  events.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  // Group into upcoming, overdue, and completed
  const upcoming = events.filter(e => !e.isOverdue && e.status !== "Compliant");
  const overdue = events.filter(e => e.isOverdue);
  const completed = events.filter(e => e.status === "Compliant");

  return {
    orgId: orgId || "ORG-GOVENICS-DEMO",
    totalEvents: events.length,
    upcomingCount: upcoming.length,
    overdueCount: overdue.length,
    completedCount: completed.length,
    events,
    upcoming,
    overdue,
    completed
  };
}

