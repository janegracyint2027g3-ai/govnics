// src/hooks/useKrmDocuments.ts
// Phase 2 — Persistent KRM Document Management Hook
// Uses server-side Upstash Redis API in production.
// Falls back to localStorage when the API is unavailable (local dev without Redis credentials).
// Never uses React useState as the sole persistence layer.

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type KrmDomain = "lei" | "ehs" | "fcc";
export type KrmClassification = "Public" | "Internal" | "Restricted" | "Confidential";
export type KrmStatus = "Active" | "Pending Review" | "Archived";
export type KrmApprovalStatus = "Draft" | "Under Review" | "Approved" | "Rejected";
export type KrmContentQuality = "Verified" | "Needs Enrichment" | "Placeholder" | "Duplicate" | "Outdated" | "Missing Source" | "Needs Legal Review";
export type KrmVerificationStatus = "Verified" | "Unverified" | "Pending Verification" | "Failed Verification";
export type KrmMigrationStatus = "Not Migrated" | "Migration Pending" | "Migrated" | "Migration Failed" | "Permission Required";

export interface KrmDocument {
  id: string;
  recordId: string;
  title: string;
  enrichedTitle: string;
  domain: KrmDomain;
  category: string;
  version: string;
  classification: KrmClassification;
  owner: string;
  applicability: string;
  tags: string[];
  notes: string;
  sourceUrl: string;
  originalDocumentUrl: string;
  internalStorageUrl: string;
  contentQualityStatus: KrmContentQuality;
  verificationStatus: KrmVerificationStatus;
  migrationStatus: KrmMigrationStatus;
  documentChecksum: string;
  jurisdictions: string[];
  regulatoryAuthority: string;
  legislationName: string;
  sectionReference: string;
  status: KrmStatus;
  approvalStatus: KrmApprovalStatus;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  lastVerifiedDate: string;
  lastReviewedDate: string;
  currentVersion: number;
  reviewer: string;
}

export interface KrmCreatePayload {
  title: string;
  domain: KrmDomain;
  category?: string;
  version?: string;
  classification?: KrmClassification;
  owner?: string;
  applicability?: string;
  tags?: string[];
  notes?: string;
  sourceUrl?: string;
  contentQualityStatus?: KrmContentQuality;
  verificationStatus?: KrmVerificationStatus;
  jurisdictions?: string[];
}

export interface KrmUpdatePayload extends Partial<KrmCreatePayload> {
  enrichedTitle?: string;
  status?: KrmStatus;
  approvalStatus?: KrmApprovalStatus;
  migrationStatus?: KrmMigrationStatus;
  documentChecksum?: string;
  internalStorageUrl?: string;
  regulatoryAuthority?: string;
  legislationName?: string;
  sectionReference?: string;
  lastVerifiedDate?: string;
  reviewer?: string;
  updatedBy?: string;
}

export interface KrmAuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  docId: string;
  docTitle: string;
}

export interface KrmStats {
  total: number;
  active: number;
  pending: number;
  archived: number;
  deleted: number;
  byDomain: Record<KrmDomain, number>;
  byClassification: Record<KrmClassification, number>;
}

interface UseKrmDocumentsReturn {
  documents: KrmDocument[];
  total: number;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  persistenceMode: "api" | "localStorage" | "unknown";
  stats: KrmStats | null;
  auditLog: KrmAuditLogEntry[];
  // CRUD
  createDocument: (payload: KrmCreatePayload) => Promise<KrmDocument | null>;
  updateDocument: (docId: string, payload: KrmUpdatePayload) => Promise<KrmDocument | null>;
  deleteDocument: (docId: string) => Promise<boolean>;
  restoreDocument: (docId: string) => Promise<boolean>;
  // Query
  refetch: (filters?: { search?: string; domain?: string; status?: string; classification?: string }) => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAuditLog: () => Promise<void>;
}

// ─── localStorage helpers (fallback only) ────────────────────────────────────
const LS_KEY = "govenics:krm:docs:v2";
const LS_LOG_KEY = "govenics:krm:auditlog:v2";

function lsGetDocs(): KrmDocument[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : getDefaultDocs();
  } catch {
    return getDefaultDocs();
  }
}

function lsSaveDocs(docs: KrmDocument[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(docs));
  } catch (e) {
    console.warn("KRM: localStorage quota exceeded or unavailable", e);
  }
}

function lsGetLog(): KrmAuditLogEntry[] {
  try {
    const raw = localStorage.getItem(LS_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function lsAppendLog(entry: KrmAuditLogEntry) {
  const logs = lsGetLog();
  logs.unshift(entry);
  const trimmed = logs.slice(0, 100);
  try {
    localStorage.setItem(LS_LOG_KEY, JSON.stringify(trimmed));
  } catch {}
}

function generateLocalId(docs: KrmDocument[]): string {
  const year = new Date().getFullYear();
  const num = String(docs.length + 1).padStart(3, "0");
  return `DOC-${year}-${num}`;
}

function generateRecordId(docs: KrmDocument[], domain: string): string {
  const count = docs.filter(d => d.domain === domain).length;
  return `GOVENICS-KRM-${domain.toUpperCase()}-${String(count + 1).padStart(4, "0")}`;
}

function getDefaultDocs(): KrmDocument[] {
  const now = new Date().toISOString();
  const defaults: Omit<KrmDocument, "createdAt" | "updatedAt">[] = [
    {
      id: "DOC-2026-001", recordId: "GOVENICS-KRM-LEI-0001",
      title: "The Code on Social Security, 2020", enrichedTitle: "The Code on Social Security, 2020",
      domain: "lei", category: "Labour Code", version: "v2.1", classification: "Public",
      owner: "Legal & Compliance", applicability: "Establishments with 10+ employees",
      tags: ["social security", "labour code", "epf", "esi"], notes: "",
      sourceUrl: "https://labour.gov.in/", originalDocumentUrl: "", internalStorageUrl: "",
      contentQualityStatus: "Needs Legal Review", verificationStatus: "Unverified",
      migrationStatus: "Not Migrated", documentChecksum: "",
      jurisdictions: ["IND"], regulatoryAuthority: "Ministry of Labour & Employment",
      legislationName: "The Code on Social Security, 2020", sectionReference: "",
      status: "Active", approvalStatus: "Approved", deleted: false,
      lastVerifiedDate: "", lastReviewedDate: "2026-04-12", currentVersion: 1, reviewer: ""
    },
    {
      id: "DOC-2026-002", recordId: "GOVENICS-KRM-FCC-0001",
      title: "Digital Personal Data Protection (DPDP) Act, 2023", enrichedTitle: "Digital Personal Data Protection (DPDP) Act, 2023",
      domain: "fcc", category: "Act", version: "v1.4", classification: "Restricted",
      owner: "Data Protection Office", applicability: "All digital entities processing Indian citizen data",
      tags: ["dpdp", "data privacy", "digital", "consent"], notes: "",
      sourceUrl: "https://meity.gov.in/", originalDocumentUrl: "", internalStorageUrl: "",
      contentQualityStatus: "Needs Legal Review", verificationStatus: "Unverified",
      migrationStatus: "Not Migrated", documentChecksum: "",
      jurisdictions: ["IND"], regulatoryAuthority: "Ministry of Electronics & IT (MeitY)",
      legislationName: "The Digital Personal Data Protection Act, 2023", sectionReference: "",
      status: "Active", approvalStatus: "Approved", deleted: false,
      lastVerifiedDate: "", lastReviewedDate: "2026-05-30", currentVersion: 1, reviewer: ""
    },
    {
      id: "DOC-2026-003", recordId: "GOVENICS-KRM-EHS-0001",
      title: "ISO 14001:2015 Environmental Standard Policy", enrichedTitle: "ISO 14001:2015 Environmental Management Systems",
      domain: "ehs", category: "ISO Standard", version: "v3.0", classification: "Internal",
      owner: "EHS Operations", applicability: "Manufacturing facilities and plant sites",
      tags: ["iso", "environmental", "ems", "ehs"], notes: "",
      sourceUrl: "https://www.iso.org/standard/60857.html", originalDocumentUrl: "", internalStorageUrl: "",
      contentQualityStatus: "Needs Legal Review", verificationStatus: "Unverified",
      migrationStatus: "Not Migrated", documentChecksum: "",
      jurisdictions: ["GLOBAL"], regulatoryAuthority: "ISO — International Organization for Standardization",
      legislationName: "ISO 14001:2015", sectionReference: "",
      status: "Active", approvalStatus: "Approved", deleted: false,
      lastVerifiedDate: "", lastReviewedDate: "2026-06-15", currentVersion: 1, reviewer: ""
    },
  ];
  return defaults.map(d => ({ ...d, createdAt: now, updatedAt: now }));
}

// ─── API helpers ──────────────────────────────────────────────────────────────
const API_BASE = "/api/krm/documents";

async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  return res;
}

// ─── Main Hook ────────────────────────────────────────────────────────────────
export function useKrmDocuments(): UseKrmDocumentsReturn {
  const [documents, setDocuments] = useState<KrmDocument[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [persistenceMode, setPersistenceMode] = useState<"api" | "localStorage" | "unknown">("unknown");
  const [stats, setStats] = useState<KrmStats | null>(null);
  const [auditLog, setAuditLog] = useState<KrmAuditLogEntry[]>([]);
  const apiAvailable = useRef<boolean | null>(null);

  // ── Detect API availability ────────────────────────────────────────────────
  const checkApiAvailability = useCallback(async (): Promise<boolean> => {
    if (apiAvailable.current !== null) return apiAvailable.current;
    try {
      const res = await fetch(`${API_BASE}/stats`, { method: "GET" });
      const available = res.ok || res.status !== 0;
      apiAvailable.current = available;
      return available;
    } catch {
      apiAvailable.current = false;
      return false;
    }
  }, []);

  // ── Fetch / Refetch documents ──────────────────────────────────────────────
  const refetch = useCallback(async (filters?: { search?: string; domain?: string; status?: string; classification?: string }) => {
    setIsLoading(true);
    setError(null);

    const apiOk = await checkApiAvailability();

    if (apiOk) {
      try {
        const params = new URLSearchParams();
        if (filters?.search) params.set("search", filters.search);
        if (filters?.domain && filters.domain !== "All") params.set("domain", filters.domain);
        if (filters?.status && filters.status !== "All") params.set("status", filters.status);
        if (filters?.classification && filters.classification !== "All") params.set("classification", filters.classification);
        params.set("limit", "200");

        const res = await apiFetch(`?${params.toString()}`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        setDocuments(data.documents || []);
        setTotal(data.total || 0);
        setPersistenceMode("api");
      } catch (err: any) {
        // Fall back to localStorage on API failure
        console.warn("KRM API unavailable, using localStorage:", err.message);
        apiAvailable.current = false;
        loadFromLocalStorage(filters);
      }
    } else {
      loadFromLocalStorage(filters);
    }

    setIsLoading(false);
  }, [checkApiAvailability]);

  function loadFromLocalStorage(filters?: { search?: string; domain?: string; status?: string; classification?: string }) {
    let docs = lsGetDocs().filter(d => !d.deleted);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      docs = docs.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.owner.toLowerCase().includes(q)
      );
    }
    if (filters?.domain && filters.domain !== "All") docs = docs.filter(d => d.domain === filters.domain);
    if (filters?.status && filters.status !== "All") docs = docs.filter(d => d.status === filters.status);
    if (filters?.classification && filters.classification !== "All") docs = docs.filter(d => d.classification === filters.classification);
    setDocuments(docs);
    setTotal(docs.length);
    setPersistenceMode("localStorage");
  }

  // ── Create ─────────────────────────────────────────────────────────────────
  const createDocument = useCallback(async (payload: KrmCreatePayload): Promise<KrmDocument | null> => {
    setIsSaving(true);
    setError(null);

    const apiOk = await checkApiAvailability();

    try {
      if (apiOk) {
        const res = await apiFetch("", { method: "POST", body: JSON.stringify(payload) });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create document");
        }
        const data = await res.json();
        setDocuments(prev => [data.document, ...prev]);
        setTotal(prev => prev + 1);
        return data.document;
      } else {
        // localStorage fallback
        const allDocs = lsGetDocs();
        const now = new Date().toISOString();
        const newDoc: KrmDocument = {
          id: generateLocalId(allDocs),
          recordId: generateRecordId(allDocs, payload.domain),
          title: payload.title,
          enrichedTitle: payload.title,
          domain: payload.domain,
          category: payload.category || "Act",
          version: payload.version || "v1.0",
          classification: payload.classification || "Public",
          owner: payload.owner || "Legal & Compliance",
          applicability: payload.applicability || "",
          tags: payload.tags || [],
          notes: payload.notes || "",
          sourceUrl: payload.sourceUrl || "",
          originalDocumentUrl: "",
          internalStorageUrl: "",
          contentQualityStatus: payload.contentQualityStatus || "Needs Legal Review",
          verificationStatus: payload.verificationStatus || "Unverified",
          migrationStatus: "Not Migrated",
          documentChecksum: "",
          jurisdictions: payload.jurisdictions || [],
          regulatoryAuthority: "",
          legislationName: payload.title,
          sectionReference: "",
          status: "Active",
          approvalStatus: "Draft",
          deleted: false,
          createdAt: now,
          updatedAt: now,
          lastVerifiedDate: "",
          lastReviewedDate: now.split("T")[0],
          currentVersion: 1,
          reviewer: "",
        };
        const updatedDocs = [newDoc, ...allDocs];
        lsSaveDocs(updatedDocs);
        lsAppendLog({
          id: crypto.randomUUID(),
          timestamp: now,
          user: "Admin Portal (Local)",
          action: `Registered "${newDoc.title}" (${newDoc.id})`,
          docId: newDoc.id,
          docTitle: newDoc.title,
        });
        setDocuments(prev => [newDoc, ...prev.filter(d => !d.deleted)]);
        setTotal(prev => prev + 1);
        return newDoc;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [checkApiAvailability]);

  // ── Update ─────────────────────────────────────────────────────────────────
  const updateDocument = useCallback(async (docId: string, payload: KrmUpdatePayload): Promise<KrmDocument | null> => {
    setIsSaving(true);
    setError(null);

    const apiOk = await checkApiAvailability();

    try {
      if (apiOk) {
        const res = await apiFetch(`/${docId}`, { method: "PUT", body: JSON.stringify(payload) });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to update document");
        }
        const data = await res.json();
        setDocuments(prev => prev.map(d => d.id === docId ? data.document : d));
        return data.document;
      } else {
        const allDocs = lsGetDocs();
        const idx = allDocs.findIndex(d => d.id === docId);
        if (idx === -1) throw new Error("Document not found");
        const now = new Date().toISOString();
        const updated: KrmDocument = { ...allDocs[idx], ...payload, updatedAt: now, currentVersion: allDocs[idx].currentVersion + 1 };
        allDocs[idx] = updated;
        lsSaveDocs(allDocs);
        lsAppendLog({
          id: crypto.randomUUID(), timestamp: now, user: "Admin Portal (Local)",
          action: `Updated "${updated.title}" → v${updated.currentVersion}`, docId, docTitle: updated.title,
        });
        setDocuments(prev => prev.map(d => d.id === docId ? updated : d));
        return updated;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [checkApiAvailability]);

  // ── Delete (soft) ──────────────────────────────────────────────────────────
  const deleteDocument = useCallback(async (docId: string): Promise<boolean> => {
    setIsSaving(true);
    setError(null);

    const apiOk = await checkApiAvailability();

    try {
      if (apiOk) {
        const res = await apiFetch(`/${docId}`, { method: "DELETE" });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to delete document");
        }
      } else {
        const allDocs = lsGetDocs();
        const idx = allDocs.findIndex(d => d.id === docId);
        if (idx === -1) throw new Error("Document not found");
        allDocs[idx] = { ...allDocs[idx], deleted: true, status: "Archived", updatedAt: new Date().toISOString() };
        lsSaveDocs(allDocs);
        lsAppendLog({
          id: crypto.randomUUID(), timestamp: new Date().toISOString(), user: "Admin Portal (Local)",
          action: `Archived "${allDocs[idx].title}" (${docId})`, docId, docTitle: allDocs[idx].title,
        });
      }
      setDocuments(prev => prev.filter(d => d.id !== docId));
      setTotal(prev => prev - 1);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [checkApiAvailability]);

  // ── Restore ────────────────────────────────────────────────────────────────
  const restoreDocument = useCallback(async (docId: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const apiOk = await checkApiAvailability();
      if (apiOk) {
        const res = await apiFetch(`/${docId}/restore`, { method: "POST" });
        if (!res.ok) return false;
      } else {
        const allDocs = lsGetDocs();
        const idx = allDocs.findIndex(d => d.id === docId);
        if (idx !== -1) {
          allDocs[idx] = { ...allDocs[idx], deleted: false, status: "Active", updatedAt: new Date().toISOString() };
          lsSaveDocs(allDocs);
        }
      }
      await refetch();
      return true;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [checkApiAvailability, refetch]);

  // ── Fetch Stats ────────────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    const apiOk = await checkApiAvailability();
    if (apiOk) {
      try {
        const res = await apiFetch("/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {}
    } else {
      const docs = lsGetDocs().filter(d => !d.deleted);
      const byDomain = { lei: 0, ehs: 0, fcc: 0 } as Record<KrmDomain, number>;
      const byClassification = { Public: 0, Internal: 0, Restricted: 0, Confidential: 0 } as Record<KrmClassification, number>;
      docs.forEach(d => { if (d.domain in byDomain) byDomain[d.domain]++; if (d.classification in byClassification) byClassification[d.classification]++; });
      setStats({ total: docs.length, active: docs.filter(d => d.status === "Active").length, pending: docs.filter(d => d.status === "Pending Review").length, archived: docs.filter(d => d.status === "Archived").length, deleted: lsGetDocs().filter(d => d.deleted).length, byDomain, byClassification });
    }
  }, [checkApiAvailability]);

  // ── Fetch Audit Log ────────────────────────────────────────────────────────
  const fetchAuditLog = useCallback(async () => {
    const apiOk = await checkApiAvailability();
    if (apiOk) {
      try {
        const res = await apiFetch("/audit-log?limit=50");
        if (res.ok) {
          const data = await res.json();
          setAuditLog(data.logs || []);
        }
      } catch {}
    } else {
      setAuditLog(lsGetLog());
    }
  }, [checkApiAvailability]);

  // ── Initial load ───────────────────────────────────────────────────────────
  useEffect(() => {
    refetch();
    fetchStats();
    fetchAuditLog();
  }, []);

  return {
    documents, total, isLoading, isSaving, error,
    persistenceMode, stats, auditLog,
    createDocument, updateDocument, deleteDocument, restoreDocument,
    refetch, fetchStats, fetchAuditLog,
  };
}

