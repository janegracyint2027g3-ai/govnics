// api/krm/documents.js
// KRM Document Management — Persistent server-side storage via Upstash Redis
// Phase 2 — GOVENICS E-Library Modernization
// Replaces the ephemeral React useState-only KRM implementation

import { redis, KEYS } from "../../_lib/redis.js";

import { v4 as uuidv4 } from "uuid";

// ─── Redis Key Helpers ────────────────────────────────────────────────────────
const KRM_KEYS = {
  allDocs: () => "govenics:krm:docs:index",
  doc: (docId) => `govenics:krm:doc:${docId}`,
  docVersions: (docId) => `govenics:krm:doc:${docId}:versions`,
  auditLog: () => "govenics:krm:audit:log",
  deletedDocs: () => "govenics:krm:docs:deleted",
  stats: () => "govenics:krm:stats",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateDocId(existingCount) {
  const year = new Date().getFullYear();
  const num = String(existingCount + 1).padStart(3, "0");
  return `DOC-${year}-${num}`;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

function errorResponse(message, status = 400) {
  return jsonResponse({ error: message, success: false }, status);
}

// ─── Audit Log ────────────────────────────────────────────────────────────────
async function appendAuditLog(action, docId, docTitle, user = "Admin Portal") {
  const entry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    user,
    action,
    docId,
    docTitle,
  };
  await redis.lpush(KRM_KEYS.auditLog(), JSON.stringify(entry));
  // Keep last 500 log entries
  await redis.ltrim(KRM_KEYS.auditLog(), 0, 499);
  return entry;
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export default async function handler(req) {
  // OPTIONS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const url = new URL(req.url);
  const pathParts = url.pathname.replace(/\/api\/krm\/documents\/?/, "").split("/").filter(Boolean);
  const docId = pathParts[0] || null;
  const subResource = pathParts[1] || null; // e.g. "versions", "restore"

  try {
    // ── GET /api/krm/documents ─────────────────────────────────────────────
    if (req.method === "GET" && !docId) {
      const search = url.searchParams.get("search") || "";
      const domain = url.searchParams.get("domain") || "All";
      const status = url.searchParams.get("status") || "All";
      const classification = url.searchParams.get("classification") || "All";
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "50");

      // Get all document IDs
      const allDocIds = await redis.lrange(KRM_KEYS.allDocs(), 0, -1);

      if (!allDocIds || allDocIds.length === 0) {
        return jsonResponse({ documents: [], total: 0, page, limit });
      }

      // Fetch all documents in parallel
      const docPromises = allDocIds.map((id) => redis.get(KRM_KEYS.doc(id)));
      const rawDocs = await Promise.all(docPromises);
      let documents = rawDocs
        .map((d) => (typeof d === "string" ? JSON.parse(d) : d))
        .filter((d) => d && !d.deleted);

      // Apply filters
      if (search) {
        const q = search.toLowerCase();
        documents = documents.filter(
          (d) =>
            d.title?.toLowerCase().includes(q) ||
            d.id?.toLowerCase().includes(q) ||
            d.category?.toLowerCase().includes(q) ||
            d.owner?.toLowerCase().includes(q) ||
            d.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }
      if (domain !== "All") documents = documents.filter((d) => d.domain === domain);
      if (status !== "All") documents = documents.filter((d) => d.status === status);
      if (classification !== "All") documents = documents.filter((d) => d.classification === classification);

      // Sort by createdAt desc
      documents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const total = documents.length;
      const offset = (page - 1) * limit;
      const paginated = documents.slice(offset, offset + limit);

      return jsonResponse({ documents: paginated, total, page, limit, totalPages: Math.ceil(total / limit) });
    }

    // ── GET /api/krm/documents/:id ─────────────────────────────────────────
    if (req.method === "GET" && docId && !subResource) {
      const raw = await redis.get(KRM_KEYS.doc(docId));
      if (!raw) return errorResponse("Document not found", 404);
      const doc = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (doc.deleted) return errorResponse("Document has been deleted", 404);
      return jsonResponse({ document: doc });
    }

    // ── GET /api/krm/documents/:id/versions ───────────────────────────────
    if (req.method === "GET" && docId && subResource === "versions") {
      const raw = await redis.lrange(KRM_KEYS.docVersions(docId), 0, -1);
      const versions = raw.map((v) => (typeof v === "string" ? JSON.parse(v) : v));
      return jsonResponse({ versions, total: versions.length });
    }

    // ── GET /api/krm/documents/audit-log ──────────────────────────────────
    if (req.method === "GET" && docId === "audit-log") {
      const limit_n = parseInt(url.searchParams.get("limit") || "50");
      const raw = await redis.lrange(KRM_KEYS.auditLog(), 0, limit_n - 1);
      const logs = raw.map((l) => (typeof l === "string" ? JSON.parse(l) : l));
      return jsonResponse({ logs, total: logs.length });
    }

    // ── GET /api/krm/documents/stats ──────────────────────────────────────
    if (req.method === "GET" && docId === "stats") {
      const allDocIds = await redis.lrange(KRM_KEYS.allDocs(), 0, -1);
      const docPromises = allDocIds.map((id) => redis.get(KRM_KEYS.doc(id)));
      const rawDocs = await Promise.all(docPromises);
      const documents = rawDocs
        .map((d) => (typeof d === "string" ? JSON.parse(d) : d))
        .filter(Boolean);

      const active = documents.filter((d) => !d.deleted && d.status === "Active").length;
      const pending = documents.filter((d) => !d.deleted && d.status === "Pending Review").length;
      const archived = documents.filter((d) => !d.deleted && d.status === "Archived").length;
      const deleted = documents.filter((d) => d.deleted).length;

      const byDomain = { lei: 0, ehs: 0, fcc: 0 };
      const byClassification = { Public: 0, Internal: 0, Restricted: 0, Confidential: 0 };

      documents
        .filter((d) => !d.deleted)
        .forEach((d) => {
          if (d.domain in byDomain) byDomain[d.domain]++;
          if (d.classification in byClassification) byClassification[d.classification]++;
        });

      return jsonResponse({
        total: documents.filter((d) => !d.deleted).length,
        active, pending, archived, deleted,
        byDomain, byClassification,
      });
    }

    // ── POST /api/krm/documents ────────────────────────────────────────────
    if (req.method === "POST" && !docId) {
      let body;
      try {
        body = await req.json();
      } catch {
        return errorResponse("Invalid JSON body");
      }

      const { title, domain, category, version, classification, owner, applicability, tags, sourceUrl, notes, contentQualityStatus, verificationStatus, jurisdictions } = body;

      if (!title?.trim()) return errorResponse("Document title is required");
      if (!["lei", "ehs", "fcc"].includes(domain)) return errorResponse("Invalid domain. Must be lei, ehs, or fcc");

      // Generate document ID
      const allDocIds = await redis.lrange(KRM_KEYS.allDocs(), 0, -1);
      const existingCount = allDocIds.length;
      const newDocId = generateDocId(existingCount);

      const now = new Date().toISOString();
      const newDoc = {
        // Core identification
        id: newDocId,
        recordId: `GOVENICS-KRM-${domain.toUpperCase()}-${String(existingCount + 1).padStart(4, "0")}`,
        
        // Content
        title: title.trim(),
        enrichedTitle: title.trim(),
        domain,
        category: category || "Act",
        version: version?.trim() || "v1.0",
        classification: classification || "Public",
        owner: owner || "Legal & Compliance",
        applicability: applicability?.trim() || "",
        tags: tags || [],
        notes: notes?.trim() || "",
        
        // Source tracking
        sourceUrl: sourceUrl?.trim() || "",
        originalDocumentUrl: "",
        internalStorageUrl: "",
        
        // Knowledge metadata (Phase 2 fields)
        contentQualityStatus: contentQualityStatus || "Needs Legal Review",
        verificationStatus: verificationStatus || "Unverified",
        migrationStatus: "Not Migrated",
        documentChecksum: "",
        jurisdictions: jurisdictions || [],
        regulatoryAuthority: "",
        legislationName: title.trim(),
        sectionReference: "",
        
        // Status tracking
        status: "Active",
        approvalStatus: "Draft",
        deleted: false,
        
        // Timestamps
        createdAt: now,
        updatedAt: now,
        lastVerifiedDate: "",
        lastReviewedDate: now.split("T")[0],
        
        // Version tracking
        currentVersion: 1,
        reviewer: "",
      };

      // Store document
      await redis.set(KRM_KEYS.doc(newDocId), JSON.stringify(newDoc));
      // Add to index (prepend so newest first)
      await redis.lpush(KRM_KEYS.allDocs(), newDocId);

      // Save initial version snapshot
      await redis.lpush(
        KRM_KEYS.docVersions(newDocId),
        JSON.stringify({ version: 1, snapshot: newDoc, changedAt: now, changedBy: "Admin Portal" })
      );

      // Audit log
      await appendAuditLog(`Registered statutory asset "${newDoc.title}" (${newDoc.version})`, newDocId, newDoc.title);

      return jsonResponse({ document: newDoc, success: true }, 201);
    }

    // ── PUT /api/krm/documents/:id ─────────────────────────────────────────
    if (req.method === "PUT" && docId && !subResource) {
      const raw = await redis.get(KRM_KEYS.doc(docId));
      if (!raw) return errorResponse("Document not found", 404);
      const existingDoc = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (existingDoc.deleted) return errorResponse("Cannot update a deleted document", 400);

      let body;
      try {
        body = await req.json();
      } catch {
        return errorResponse("Invalid JSON body");
      }

      // Save version snapshot before update
      await redis.lpush(
        KRM_KEYS.docVersions(docId),
        JSON.stringify({
          version: existingDoc.currentVersion,
          snapshot: existingDoc,
          changedAt: new Date().toISOString(),
          changedBy: body.updatedBy || "Admin Portal",
        })
      );
      // Keep last 20 versions
      await redis.ltrim(KRM_KEYS.docVersions(docId), 0, 19);

      const now = new Date().toISOString();
      const updatedDoc = {
        ...existingDoc,
        // Updateable fields
        title: body.title?.trim() || existingDoc.title,
        enrichedTitle: body.enrichedTitle?.trim() || existingDoc.enrichedTitle,
        domain: body.domain || existingDoc.domain,
        category: body.category || existingDoc.category,
        version: body.version?.trim() || existingDoc.version,
        classification: body.classification || existingDoc.classification,
        owner: body.owner || existingDoc.owner,
        applicability: body.applicability?.trim() ?? existingDoc.applicability,
        tags: body.tags ?? existingDoc.tags,
        notes: body.notes?.trim() ?? existingDoc.notes,
        sourceUrl: body.sourceUrl?.trim() ?? existingDoc.sourceUrl,
        internalStorageUrl: body.internalStorageUrl?.trim() ?? existingDoc.internalStorageUrl,
        contentQualityStatus: body.contentQualityStatus || existingDoc.contentQualityStatus,
        verificationStatus: body.verificationStatus || existingDoc.verificationStatus,
        migrationStatus: body.migrationStatus || existingDoc.migrationStatus,
        documentChecksum: body.documentChecksum || existingDoc.documentChecksum,
        jurisdictions: body.jurisdictions ?? existingDoc.jurisdictions,
        regulatoryAuthority: body.regulatoryAuthority?.trim() ?? existingDoc.regulatoryAuthority,
        legislationName: body.legislationName?.trim() ?? existingDoc.legislationName,
        sectionReference: body.sectionReference?.trim() ?? existingDoc.sectionReference,
        status: body.status || existingDoc.status,
        approvalStatus: body.approvalStatus || existingDoc.approvalStatus,
        reviewer: body.reviewer?.trim() ?? existingDoc.reviewer,
        lastVerifiedDate: body.lastVerifiedDate || existingDoc.lastVerifiedDate,
        // Auto-updated
        updatedAt: now,
        currentVersion: existingDoc.currentVersion + 1,
      };

      await redis.set(KRM_KEYS.doc(docId), JSON.stringify(updatedDoc));
      await appendAuditLog(`Updated document "${updatedDoc.title}" → version ${updatedDoc.currentVersion}`, docId, updatedDoc.title, body.updatedBy || "Admin Portal");

      return jsonResponse({ document: updatedDoc, success: true });
    }

    // ── DELETE /api/krm/documents/:id (soft delete) ────────────────────────
    if (req.method === "DELETE" && docId) {
      const raw = await redis.get(KRM_KEYS.doc(docId));
      if (!raw) return errorResponse("Document not found", 404);
      const doc = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (doc.deleted) return errorResponse("Document already deleted", 400);

      const now = new Date().toISOString();
      const deletedDoc = {
        ...doc,
        deleted: true,
        deletedAt: now,
        status: "Archived",
        updatedAt: now,
      };

      await redis.set(KRM_KEYS.doc(docId), JSON.stringify(deletedDoc));
      await redis.lpush(KRM_KEYS.deletedDocs(), docId);
      await appendAuditLog(`Soft-deleted document "${doc.title}" (${docId})`, docId, doc.title);

      return jsonResponse({ success: true, message: `Document ${docId} archived successfully` });
    }

    // ── POST /api/krm/documents/:id/restore ──────────────────────────────
    if (req.method === "POST" && docId && subResource === "restore") {
      const raw = await redis.get(KRM_KEYS.doc(docId));
      if (!raw) return errorResponse("Document not found", 404);
      const doc = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!doc.deleted) return errorResponse("Document is not deleted", 400);

      const now = new Date().toISOString();
      const restoredDoc = { ...doc, deleted: false, deletedAt: null, status: "Active", updatedAt: now };
      await redis.set(KRM_KEYS.doc(docId), JSON.stringify(restoredDoc));
      await appendAuditLog(`Restored document "${doc.title}" (${docId})`, docId, doc.title);

      return jsonResponse({ document: restoredDoc, success: true });
    }

    return errorResponse("Method not allowed or invalid endpoint", 405);
  } catch (err) {
    console.error("KRM API error:", err);
    return jsonResponse({ error: "Internal server error", details: err.message, success: false }, 500);
  }
}

