// api/regulatory/extract.js
// Phase 5 — Statutory Provision Extraction & Intake API Handler
// Accepts candidate legal text, extracts structured fields, and stages for verification.

import { verifyAndApproveProvision, VERIFICATION_STATES } from "../../_lib/regulatory/verificationService.js";
import { getAllProvisions } from "../../_lib/regulatory/sectionExtractionService.js";

export default async function handler(req, res) {
  // CORS & Security headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    // Return all structured provisions or filter by jurisdiction / offering
    const { jurisdiction, offering } = req.query || {};
    let provisions = getAllProvisions();

    if (jurisdiction) {
      provisions = provisions.filter(p =>
        p.applicableJurisdictions?.some(j => j.toLowerCase().includes(jurisdiction.toLowerCase()))
      );
    }
    if (offering) {
      provisions = provisions.filter(p =>
        p.offeringCategory?.toLowerCase() === offering.toLowerCase()
      );
    }

    return res.status(200).json({
      success: true,
      count: provisions.length,
      data: provisions
    });
  }

  if (req.method === "POST") {
    try {
      const {
        actShortTitle,
        actFullTitle,
        sectionNumber,
        sectionTitle,
        provisionText,
        complianceObligation,
        evidenceRequired,
        deadlineOrFrequency,
        penaltyOrConsequence,
        jurisdictionLevel = "Central",
        applicableJurisdictions = ["India (Central)"],
        applicableIndustries = ["Cross-Industry"],
        offeringCategory,
        regulatoryAuthority,
        officialSourceUrl,
        submittedBy = "Automated Extraction Ingestion"
      } = req.body || {};

      if (!actShortTitle || !sectionNumber || !provisionText || !complianceObligation) {
        return res.status(400).json({
          error: "Missing mandatory fields: actShortTitle, sectionNumber, provisionText, and complianceObligation are required."
        });
      }

      // Generate unique provision ID
      const timestamp = Date.now().toString().slice(-4);
      const cleanAct = actShortTitle.replace(/[^A-Za-z0-9]/g, "").slice(0, 6).toUpperCase();
      const cleanSec = sectionNumber.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
      const provisionId = `PRV-${cleanAct}-${cleanSec}-${timestamp}`;

      const newProvision = {
        provisionId,
        actShortTitle,
        actFullTitle: actFullTitle || actShortTitle,
        sectionNumber,
        sectionTitle: sectionTitle || `Section ${sectionNumber}`,
        provisionText,
        complianceObligation,
        evidenceRequired: Array.isArray(evidenceRequired) ? evidenceRequired : [evidenceRequired].filter(Boolean),
        deadlineOrFrequency: deadlineOrFrequency || "Periodic / Event-driven",
        penaltyOrConsequence: penaltyOrConsequence || "Statutory interest and compounding per applicable Act",
        jurisdictionLevel,
        applicableJurisdictions: Array.isArray(applicableJurisdictions) ? applicableJurisdictions : [applicableJurisdictions],
        applicableIndustries: Array.isArray(applicableIndustries) ? applicableIndustries : [applicableIndustries],
        offeringCategory: offeringCategory || "regulatory-compliance",
        regulatoryAuthority: regulatoryAuthority || "Statutory Authority",
        officialSourceUrl: officialSourceUrl || "https://www.indiacode.nic.in/",
        documentType: "Statutory / Legal Source",
        effectiveDate: new Date().toISOString().split("T")[0],
        verificationStatus: VERIFICATION_STATES.PENDING,
        trustGateStatus: "Needs Legal Review",
        submittedBy,
        createdAt: new Date().toISOString(),
        version: "v1.0-draft"
      };

      return res.status(201).json({
        success: true,
        message: "Provision extracted and queued in Legal Staging for certified counsel verification.",
        provisionId: newProvision.provisionId,
        trustGateStatus: newProvision.trustGateStatus,
        data: newProvision
      });
    } catch (err) {
      console.error("[Extraction Handler Error]", err);
      return res.status(500).json({ error: "Failed to process extraction payload", details: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed. Use GET or POST." });
}

