// src/hooks/useLibraryCms.ts
// React Hook for GOVENICS WordPress CMS E-Library Integration

import { useState, useEffect, useCallback } from "react";

export interface CmsResource {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  offering: string;
  industry: string;
  country: string;
  state: string;
  applicableAct: string;
  regulatoryAuthority: string;
  documentType: string;
  categorySlug: string;
  categories: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id: number; name: string; slug: string }>;
  publicationDate: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  author: string;
  sourceUrl: string;
  pdfUrl: string;
  featuredImage: string;
  accessType: "Public" | "Restricted" | "Enterprise";
  status: string;
  slug: string;
  link: string;
}

interface FetchOptions {
  category?: string;
  offering?: string;
  industry?: string;
  search?: string;
  page?: number;
  perPage?: number;
  refresh?: boolean;
}

export function useLibraryCms(initialCategory: string = "all") {
  const [resources, setResources] = useState<CmsResource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>(initialCategory);
  const [offering, setOffering] = useState<string>("All");
  const [industry, setIndustry] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [selectedResource, setSelectedResource] = useState<CmsResource | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const fetchResources = useCallback(async (opts: FetchOptions = {}) => {
    setLoading(true);
    setError(null);

    const activeCat = opts.category !== undefined ? opts.category : category;
    const activeOff = opts.offering !== undefined ? opts.offering : offering;
    const activeInd = opts.industry !== undefined ? opts.industry : industry;
    const activeSearch = opts.search !== undefined ? opts.search : search;
    const activePage = opts.page !== undefined ? opts.page : page;

    try {
      const params = new URLSearchParams();
      if (activeCat && activeCat !== "all") params.append("category", activeCat);
      if (activeOff && activeOff !== "All") params.append("offering", activeOff);
      if (activeInd && activeInd !== "All") params.append("industry", activeInd);
      if (activeSearch) params.append("search", activeSearch);
      params.append("page", activePage.toString());
      params.append("per_page", "12");
      if (opts.refresh) params.append("refresh", "true");

      const endpoint = activeCat && activeCat !== "all"
        ? `/api/library/${activeCat}?${params.toString()}`
        : `/api/library/search?${params.toString()}`;

      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error(`Failed to fetch library resources (HTTP ${res.status})`);
      }

      const data = await res.json();
      setResources(data.resources || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(data.page || 1);
    } catch (err: any) {
      console.error("[useLibraryCms] Error:", err);
      setError(err.message || "Failed to connect to CMS E-Library API");
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, [category, offering, industry, search, page]);

  const fetchResourceById = useCallback(async (id: string | number) => {
    try {
      const res = await fetch(`/api/library/resource?id=${id}`);
      if (!res.ok) throw new Error("Resource not found");
      const data = await res.json();
      setSelectedResource(data.resource || null);
      return data.resource;
    } catch (err) {
      console.error("[useLibraryCms] Detail fetch error:", err);
      return null;
    }
  }, []);

  const syncWithCms = useCallback(async () => {
    setIsSyncing(true);
    await fetchResources({ refresh: true });
  }, [fetchResources]);

  useEffect(() => {
    fetchResources();
  }, [category, offering, industry, page]);

  return {
    resources,
    loading,
    error,
    total,
    totalPages,
    page,
    setPage,
    category,
    setCategory,
    offering,
    setOffering,
    industry,
    setIndustry,
    search,
    setSearch,
    selectedResource,
    setSelectedResource,
    fetchResources,
    fetchResourceById,
    syncWithCms,
    isSyncing
  };
}

