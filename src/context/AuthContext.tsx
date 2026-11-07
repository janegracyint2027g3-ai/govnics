import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface UserProfile {
  userId: string;
  preferredUserId: string;
  fullName: string;
  email: string;
  mobileNumber?: string;
  companyId?: string;
  emailVerified?: boolean;
  accountStatus?: string;
  createdAt?: string;
  // Backward compatibility & convenience fields
  companyName?: string;
  designation?: string;
  primaryStandard?: string;
  grcScope?: string[];
  maturity?: string;
  industry?: string;
  geoFootprint?: string;
}

export interface CompanyProfile {
  companyId: string;
  companyName: string;
  officialWebsite?: string;
  country: string;
  state?: string;
  city?: string;
  industrySector: string;
  subIndustry?: string;
  companySize: string;
  businessOperations: string[];
  businessRegistrationType?: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  mobileNumber: string;
  userId: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  officialWebsite?: string;
  country: string;
  state?: string;
  city?: string;
  industrySector: string;
  subIndustry?: string;
  companySize: string;
  businessOperations: string[];
  businessRegistrationType?: string;
}

export interface UserSession {
  sessionId: string;
  device: string;
  browser: string;
  ip: string;
  createdAt: string;
  lastActive: string;
  isCurrent: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  company: CompanyProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  tokenExpiresAt: string | null;
  remainingMinutes: number | null;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string; errors?: Record<string, string> }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  getSessions: () => Promise<UserSession[]>;
  revokeSession: (sessionId: string) => Promise<{ success: boolean; error?: string }>;
  revokeAllOtherSessions: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Token & Storage Helpers ──────────────────────────────────────────────────
const JWT_STORAGE_KEY = "govenics_jwt_token";
const JWT_EXPIRY_KEY = "govenics_jwt_expires_at";

export function getStoredToken(): string | null {
  try {
    const expiresAt = localStorage.getItem(JWT_EXPIRY_KEY);
    if (expiresAt && new Date(expiresAt).getTime() <= Date.now()) {
      localStorage.removeItem(JWT_STORAGE_KEY);
      localStorage.removeItem(JWT_EXPIRY_KEY);
      return null;
    }
    return localStorage.getItem(JWT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string, expiresAt: string): void {
  try {
    localStorage.setItem(JWT_STORAGE_KEY, token);
    localStorage.setItem(JWT_EXPIRY_KEY, expiresAt);
  } catch {
    /* local storage disabled */
  }
}

export function clearStoredToken(): void {
  try {
    localStorage.removeItem(JWT_STORAGE_KEY);
    localStorage.removeItem(JWT_EXPIRY_KEY);
  } catch {
    /* local storage disabled */
  }
}

// ─── API Base URL ─────────────────────────────────────────────────────────────
const API_BASE = "/api";

async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
  try {
    const token = getStoredToken();
    const authHeaders: Record<string, string> = {};
    if (token) {
      authHeaders["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...(options.headers || {}),
      },
      ...options,
    });
    const data = await res.json().catch(() => null);
    return { data, error: !res.ok ? (data?.error || "Request failed") : null, status: res.status };
  } catch (err) {
    return { data: null, error: "Network error. Please check your connection.", status: 0 };
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [tokenExpiresAt, setTokenExpiresAt] = useState<string | null>(() => {
    try {
      return localStorage.getItem(JWT_EXPIRY_KEY);
    } catch {
      return null;
    }
  });
  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);

  const enrich = (u: UserProfile, c?: CompanyProfile | null): UserProfile => ({
    ...u,
    companyName: c?.companyName || u.companyName || "Organization",
    industry: c?.industrySector || u.industry || "General Industry",
    geoFootprint: c?.country || u.geoFootprint || "India",
    designation: u.designation || "Enterprise Lead",
  });

  const refreshUser = useCallback(async () => {
    const { data, status } = await apiFetch<{ success: boolean; user: UserProfile; company: CompanyProfile }>("/auth/me");
    if (data?.success && data.user) {
      setUser(enrich(data.user, data.company));
      setCompany(data.company || null);
      setIsAuthenticated(true);
    } else if (status === 401) {
      setUser(null);
      setCompany(null);
      setIsAuthenticated(false);
      clearStoredToken();
      setToken(null);
      setTokenExpiresAt(null);
    }
  }, []);

  // Check session on mount
  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  // Track 30-minute JWT session expiration and countdown
  useEffect(() => {
    if (!tokenExpiresAt || !isAuthenticated) {
      setRemainingMinutes(null);
      return;
    }

    const checkExpiration = () => {
      const expTime = new Date(tokenExpiresAt).getTime();
      const now = Date.now();
      const diffMs = expTime - now;

      if (diffMs <= 0) {
        console.warn("[AuthContext] 30-Minute JWT Session Expired. Logging out.");
        clearStoredToken();
        setToken(null);
        setTokenExpiresAt(null);
        setUser(null);
        setCompany(null);
        setIsAuthenticated(false);
        setRemainingMinutes(0);
      } else {
        setRemainingMinutes(Math.max(1, Math.ceil(diffMs / 60000)));
      }
    };

    checkExpiration();
    const interval = setInterval(checkExpiration, 15000); // Check every 15s
    return () => clearInterval(interval);
  }, [tokenExpiresAt, isAuthenticated]);

  const login = useCallback(async (identifier: string, password: string) => {
    const { data, error } = await apiFetch<{
      success: boolean;
      user: UserProfile;
      company: CompanyProfile;
      token?: string;
      expiresAt?: string;
      expiresIn?: number;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });

    if (data?.success && data.user) {
      setUser(enrich(data.user, data.company));
      setCompany(data.company || null);
      setIsAuthenticated(true);

      if (data.token) {
        const expiresAt = data.expiresAt || new Date(Date.now() + (data.expiresIn || 1800) * 1000).toISOString();
        setStoredToken(data.token, expiresAt);
        setToken(data.token);
        setTokenExpiresAt(expiresAt);
      }

      return { success: true };
    }

    return { success: false, error: error || "Login failed." };
  }, []);

  const register = useCallback(async (formData: RegisterData) => {
    const { data, error } = await apiFetch<{
      success: boolean;
      user: UserProfile;
      token?: string;
      expiresAt?: string;
      expiresIn?: number;
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (data?.success && data.user) {
      if (data.token) {
        const expiresAt = data.expiresAt || new Date(Date.now() + (data.expiresIn || 1800) * 1000).toISOString();
        setStoredToken(data.token, expiresAt);
        setToken(data.token);
        setTokenExpiresAt(expiresAt);
      }
      // Fetch full profile after registration
      await refreshUser();
      return { success: true };
    }

    return {
      success: false,
      error: error || "Registration failed.",
      errors: (data as any)?.errors || {},
    };
  }, [refreshUser]);

  const logout = useCallback(async () => {
    // 1. Client-side telemetry forwarding to ensure zero loss if network fails
    const webhookUrl =
      import.meta.env.VITE_TELEMETRY_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbwr2WjTDd7hft1gK_3GAHgfBjNOjSgtoOoR093PHHmJ6Egua7P6e79WA2_qLynuC0m3Qg/exec";

    if (webhookUrl && user) {
      fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetName: "User_Logins",
          table: "User_Logins",
          "Timestamp": new Date().toISOString(),
          "Email": user.email,
          "Auth Provider": "Session Termination",
          "Login Status": "Logged Out",
          "IP Location": "Direct Web Client",
          "IP Address": "Web Client",
          "User Agent": navigator.userAgent,
          "Action": "LOGOUT",
          "User ID": `@${user.preferredUserId || user.userId}`,
          "Full Name": user.fullName,
        }),
      }).catch(() => {/* silent */});
    }

    // 2. Clear local storage tokens
    clearStoredToken();
    setToken(null);
    setTokenExpiresAt(null);
    setRemainingMinutes(null);

    // 3. Server-side logout to clear cookie, Redis session, and forward server event
    await apiFetch("/auth/logout", { method: "POST" });
    setUser(null);
    setCompany(null);
    setIsAuthenticated(false);
  }, [user]);

  const getSessions = useCallback(async (): Promise<UserSession[]> => {
    const { data } = await apiFetch<{ success: boolean; sessions: UserSession[] }>("/auth/sessions");
    return data?.sessions || [];
  }, []);

  const revokeSession = useCallback(async (sessionId: string) => {
    const { data, error } = await apiFetch<{ success: boolean; message?: string }>(`/auth/sessions?sessionId=${encodeURIComponent(sessionId)}`, {
      method: "DELETE",
    });
    return { success: !error && (data?.success ?? true), error: error || undefined };
  }, []);

  const revokeAllOtherSessions = useCallback(async () => {
    const { data, error } = await apiFetch<{ success: boolean; message?: string }>("/auth/sessions?allOthers=true", {
      method: "DELETE",
    });
    return { success: !error && (data?.success ?? true), error: error || undefined };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        isAuthenticated,
        isLoading,
        token,
        tokenExpiresAt,
        remainingMinutes,
        login,
        register,
        logout,
        refreshUser,
        getSessions,
        revokeSession,
        revokeAllOtherSessions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
