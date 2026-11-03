// src/hooks/useKnowledgeHub.ts
// Phase 3 — React Hook for GOVENICS AI Knowledge Hub & Governance

import { useState, useEffect, useCallback } from "react";
import type {
  KnowledgeDocument,
  GovenicsOffering,
  IndustrySector,
  DocumentType,
  TrustState,
  ApprovalStatus,
  RetrievalQuery,
  RetrievalResult
} from "@/types/knowledgeHub";
import { CLIENT_SEED_DOCUMENTS, queryKnowledgeHub } from "@/utils/aiKnowledgeRetrieval";

const LS_KNOWLEDGE_DOCS_KEY = "govenics:knowledge:documents:v3";

function lsGetDocs(): KnowledgeDocument[] {
  try {
    const raw = localStorage.getItem(LS_KNOWLEDGE_DOCS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return CLIENT_SEED_DOCUMENTS;
}

function lsSaveDocs(docs: KnowledgeDocument[]) {
  try {
    localStorage.setItem(LS_KNOWLEDGE_DOCS_KEY, JSON.stringify(docs));
  } catch (e) {
    console.warn("[useKnowledgeHub] localStorage quota exceeded:", e);
  }
}

export function useKnowledgeHub() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(lsGetDocs());
  const [total, setTotal] = useState<number>(CLIENT_SEED_DOCUMENTS.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffering, setSelectedOffering] = useState<GovenicsOffering | "All">("All");
  const [selectedIndustry, setSelectedIndustry] = useState<IndustrySector | "All">("All");
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | "All">("All");
  const [selectedTrustState, setSelectedTrustState] = useState<TrustState | "All">("All");
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState<ApprovalStatus | "All">("All");

  // Fetch / Refresh documents
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (selectedOffering !== "All") params.set("offering", selectedOffering);
      if (selectedIndustry !== "All") params.set("industry", selectedIndustry);
      if (selectedDocType !== "All") params.set("documentType", selectedDocType);
      if (selectedTrustState !== "All") params.set("trustState", selectedTrustState);
      if (selectedApprovalStatus !== "All") params.set("approvalStatus", selectedApprovalStatus);
      params.set("limit", "100");

      const res = await fetch(`/api/knowledge/documents?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.documents)) {
          setDocuments(data.documents);
          setTotal(data.total);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fallback to local state / storage
    }

    // Local fallback filter
    let filtered = lsGetDocs().filter(d => !d.deleted);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.title.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.summary?.toLowerCase().includes(q) ||
          d.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedOffering !== "All") filtered = filtered.filter(d => d.offering === selectedOffering);
    if (selectedIndustry !== "All") filtered = filtered.filter(d => d.industry === selectedIndustry || d.industry === "Cross-Industry");
    if (selectedDocType !== "All") filtered = filtered.filter(d => d.documentType === selectedDocType);
    if (selectedTrustState !== "All") filtered = filtered.filter(d => d.trustState === selectedTrustState);
    if (selectedApprovalStatus !== "All") filtered = filtered.filter(d => d.approvalStatus === selectedApprovalStatus);

    setDocuments(filtered);
    setTotal(filtered.length);
    setIsLoading(false);
  }, [
    searchQuery,
    selectedOffering,
    selectedIndustry,
    selectedDocType,
    selectedTrustState,
    selectedApprovalStatus
  ]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Ingest Document
  const ingestDocument = async (payload: {
    title: string;
    offering: GovenicsOffering;
    industry: IndustrySector;
    documentType: DocumentType;
    jurisdiction?: { country: string; state?: string; applicableRegulator: string };
    content: string;
    fileName?: string;
    tags?: string[];
    summary?: string;
    statutoryReference?: string;
    sourceUrl?: string;
  }): Promise<KnowledgeDocument | null> => {
    try {
      const res = await fetch("/api/knowledge/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.document) {
          await fetchDocuments();
          return data.document;
        }
      }
    } catch {
      // Fallback
    }

    // Local fallback creation
    const all = lsGetDocs();
    const newId = `KN-${new Date().getFullYear()}-${String(all.length + 1).padStart(4, "0")}`;
    const now = new Date().toISOString();
    const newDoc: KnowledgeDocument = {
      id: newId,
      recordId: `GOVENICS-${payload.offering.slice(0, 3).toUpperCase()}-${newId}`,
      title: payload.title,
      enrichedTitle: payload.title,
      offering: payload.offering,
      industry: payload.industry,
      documentType: payload.documentType,
      jurisdiction: payload.jurisdiction || { country: "India", state: "Central", applicableRegulator: "Statutory Authority" },
      fileMetadata: {
        originalFileName: payload.fileName || "document.txt",
        fileExtension: "txt",
        mimeType: "text/plain",
        fileSizeBytes: payload.content.length,
        fileHashSha256: "local-hash-" + Date.now(),
        pageCount: 1
      },
      summary: payload.summary || payload.content.slice(0, 200) + "...",
      chunkCount: 1,
      chunks: [
        {
          id: `${newId}-C01`,
          documentId: newId,
          chunkIndex: 1,
          content: `[Document: ${payload.title} | Section: Body | Page: 1]\n\n${payload.content}`,
          tokenCount: Math.round(payload.content.split(/\s+/).length * 1.3),
          keywords: []
        }
      ],
      trustState: "Needs Legal Review",
      approvalStatus: "Under Review",
      isEligibleForAiRetrieval: false,
      version: "v1.0",
      lastReviewedDate: now.split("T")[0],
      createdAt: now,
      updatedAt: now,
      processingStatus: "Content Review",
      tags: payload.tags || [],
      statutoryReference: payload.statutoryReference,
      externalSourceUrl: payload.sourceUrl
    };

    const updatedList = [newDoc, ...all];
    lsSaveDocs(updatedList);
    setDocuments(prev => [newDoc, ...prev]);
    setTotal(prev => prev + 1);
    return newDoc;
  };

  // Approve Document
  const approveDocument = async (docId: string, trustState: TrustState = "Verified Primary Source") => {
    try {
      const res = await fetch(`/api/knowledge/documents/${docId}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trustState })
      });
      if (res.ok) {
        await fetchDocuments();
        return true;
      }
    } catch {}

    // Fallback local update
    const all = lsGetDocs().map(d => {
      if (d.id === docId) {
        const isEligible = ["Verified Primary Source", "Verified Secondary Source", "Reviewed Internal Knowledge"].includes(trustState);
        return {
          ...d,
          approvalStatus: "Approved" as ApprovalStatus,
          trustState,
          isEligibleForAiRetrieval: isEligible,
          processingStatus: (isEligible ? "Indexed" : "Approved") as any,
          updatedAt: new Date().toISOString()
        };
      }
      return d;
    });
    lsSaveDocs(all);
    setDocuments(all);
    return true;
  };

  // Reject Document
  const rejectDocument = async (docId: string, reason?: string) => {
    try {
      const res = await fetch(`/api/knowledge/documents/${docId}/reject`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason })
      });
      if (res.ok) {
        await fetchDocuments();
        return true;
      }
    } catch {}

    const all = lsGetDocs().map(d => {
      if (d.id === docId) {
        return {
          ...d,
          approvalStatus: "Rejected" as ApprovalStatus,
          trustState: "Rejected" as TrustState,
          isEligibleForAiRetrieval: false,
          processingStatus: "Rejected" as any,
          processingError: reason || "Rejected by administrator",
          updatedAt: new Date().toISOString()
        };
      }
      return d;
    });
    lsSaveDocs(all);
    setDocuments(all);
    return true;
  };

  // Archive / Delete Document
  const deleteDocument = async (docId: string) => {
    try {
      const res = await fetch(`/api/knowledge/documents/${docId}`, { method: "DELETE" });
      if (res.ok) {
        await fetchDocuments();
        return true;
      }
    } catch {}

    const all = lsGetDocs().map(d => (d.id === docId ? { ...d, deleted: true } : d));
    lsSaveDocs(all);
    setDocuments(prev => prev.filter(d => d.id !== docId));
    setTotal(prev => Math.max(0, prev - 1));
    return true;
  };

  // AI Knowledge Search & Retrieval
  const searchKnowledge = async (query: RetrievalQuery): Promise<RetrievalResult> => {
    return queryKnowledgeHub(query);
  };

  return {
    documents,
    total,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedOffering,
    setSelectedOffering,
    selectedIndustry,
    setSelectedIndustry,
    selectedDocType,
    setSelectedDocType,
    selectedTrustState,
    setSelectedTrustState,
    selectedApprovalStatus,
    setSelectedApprovalStatus,
    fetchDocuments,
    ingestDocument,
    approveDocument,
    rejectDocument,
    deleteDocument,
    searchKnowledge
  };
}

