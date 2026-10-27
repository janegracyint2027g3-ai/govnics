
export interface GrcAnalyticsEvent {
  id: string;
  timestamp: string;
  type: "page_view" | "search" | "filter_change" | "estimator_calc" | "form_submit" | "click";
  path: string;
  category: string; // e.g. "Labour Law", "Cybersecurity", "ESG", "Statutory GRC", "General"
  details: Record<string, any>;
  sessionToken: string;
}

const STORAGE_KEY = "govenics_grc_telemetry";
const SESSION_KEY = "govenics_grc_session_token";

// Helper to generate a simple UUID-like string
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// Helper to get or create session token
const getSessionToken = () => {
  if (typeof window === "undefined") return "";
  let token = sessionStorage.getItem(SESSION_KEY);
  if (!token) {
    token = "session_" + generateId();
    sessionStorage.setItem(SESSION_KEY, token);
  }
  return token;
};

// Generates highly realistic historical GRC analytics logs to seed the dashboard immediately
const generateSeededEvents = (): GrcAnalyticsEvent[] => {
  const events: GrcAnalyticsEvent[] = [];
  const categories = ["Labour Law", "Cybersecurity", "ESG", "Statutory GRC", "General", "HR Policy"];
  const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Telangana", "Gujarat", "Haryana"];
  const searches = [
    "DPDP Act compliance checklist",
    "minimum wages Maharashtra 2026",
    "Factories Act safety registers",
    "ISO 27001 readiness assessment",
    "BRSR ESG disclosure requirements",
    "PF contribution rules 2026",
    "POSH Committee setup guide",
    "contractor compliance audit template",
    "EHS pollution board consent",
    "leaves and working hours limits"
  ];
  const pageViews = [
    { path: "/", cat: "General", name: "Home Page" },
    { path: "/grc", cat: "General", name: "GRC Solutions Page" },
    { path: "/cybersecurity", cat: "Cybersecurity", name: "Cybersecurity Page" },
    { path: "/esg", cat: "ESG", name: "ESG Page" },
    { path: "/sgrc/services", cat: "Statutory GRC", name: "SGRC Services Page" },
    { path: "/sgrc/e-library", cat: "Statutory GRC", name: "e-Library Page" },
    { path: "/sgrc/estimator", cat: "Statutory GRC", name: "Statutory Estimator Page" },
    { path: "/resources", cat: "General", name: "Resource Hub Page" },
    { path: "/staffing", cat: "HR Policy", name: "Manpower Staffing Page" }
  ];

  const now = new Date();
  
  // Create logs spanning the last 7 days
  for (let i = 0; i < 75; i++) {
    const eventTime = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const daySeed = eventTime.getDate();
    const mockSessionToken = `session_mock_${1000 + (daySeed % 5)}`;

    // Pick an event type probabilistically
    const rand = Math.random();
    if (rand < 0.45) {
      // Page view
      const pv = pageViews[Math.floor(Math.random() * pageViews.length)];
      events.push({
        id: `seed_${i}`,
        timestamp: eventTime.toISOString(),
        type: "page_view",
        path: pv.path,
        category: pv.cat,
        details: { pageName: pv.name },
        sessionToken: mockSessionToken
      });
    } else if (rand < 0.70) {
      // Click or General Interaction
      const cat = categories[Math.floor(Math.random() * categories.length)];
      events.push({
        id: `seed_${i}`,
        timestamp: eventTime.toISOString(),
        type: "click",
        path: "/grc",
        category: cat,
        details: { 
          elementId: "cta_consultation", 
          elementText: "Schedule Consultation",
          targetSection: cat 
        },
        sessionToken: mockSessionToken
      });
    } else if (rand < 0.82) {
      // Search inside e-Library or Resources
      const query = searches[Math.floor(Math.random() * searches.length)];
      const searchCat = query.includes("DPDP") || query.includes("ISO") ? "Cybersecurity" : 
                        query.includes("ESG") || query.includes("BRSR") ? "ESG" : "Statutory GRC";
      events.push({
        id: `seed_${i}`,
        timestamp: eventTime.toISOString(),
        type: "search",
        path: query.includes("checklist") || query.includes("guide") ? "/resources" : "/sgrc/e-library",
        category: searchCat,
        details: { query, resultsCount: Math.floor(Math.random() * 8) + 1 },
        sessionToken: mockSessionToken
      });
    } else if (rand < 0.93) {
      // Estimator calculations
      const state = states[Math.floor(Math.random() * states.length)];
      const employeeCount = Math.floor(Math.random() * 250) + 10;
      const avgSalary = Math.floor(Math.random() * 25000) + 12000;
      const computedLiability = employeeCount * (avgSalary * 0.12 + avgSalary * 0.0325); // PF & ESI estimates
      events.push({
        id: `seed_${i}`,
        timestamp: eventTime.toISOString(),
        type: "estimator_calc",
        path: "/sgrc/estimator",
        category: "Statutory GRC",
        details: {
          state,
          employeeCount,
          avgSalary,
          totalLiability: Math.round(computedLiability),
          hasMines: Math.random() > 0.8
        },
        sessionToken: mockSessionToken
      });
    } else {
      // Form Submissions (Leads)
      const companies = ["TechCorp India", "Apex Logistics", "Giga Systems", "Vertex Healthcare", "Solaris Energy", "Kottravai Corp"];
      const names = ["Ananth Raman", "Sunita Nair", "Rajesh Gowda", "Meera Joshi", "Vikram Rathore", "Karthik K."];
      const emails = ["ananth@techcorp.in", "sunita@apexlogistics.com", "contact@gigasystems.co", "hr@vertexhealth.com", "v.rathore@solaris.org", "harikrishnan.k@kottravai.com"];
      const index = Math.floor(Math.random() * companies.length);
      const interest = ["Labour Compliance Audit", "DPDP Framework Setup", "BRSR Advisory & Disclosures", "Offensive Security Assessment", "Full Payroll GRC Processing"];
      
      events.push({
        id: `seed_${i}`,
        timestamp: eventTime.toISOString(),
        type: "form_submit",
        path: "/contact",
        category: interest[index % interest.length].includes("DPDP") || interest[index % interest.length].includes("Security") ? "Cybersecurity" :
                  interest[index % interest.length].includes("BRSR") ? "ESG" : "Statutory GRC",
        details: {
          name: names[index],
          email: emails[index],
          company: companies[index],
          interest: interest[Math.floor(Math.random() * interest.length)],
          message: `Need GRC advisory setup details. Customized compliance assessment requested.`
        },
        sessionToken: mockSessionToken
      });
    }
  }

  // Sort chronologically (oldest to newest)
  return events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export const initializeTelemetry = () => {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seeded = generateSeededEvents();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  }
};
interface GeoInfo {
  ip: string;
  location: string;
}

let cachedGeo: GeoInfo | null = null;

const IP_PROVIDERS = [
  async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const response = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error("ipapi failed");
    const d = await response.json();
    if (!d.ip || d.ip.includes("Client") || d.ip.includes("Dynamic")) throw new Error("invalid ip");
    return {
      ip: d.ip,
      location: [d.city, d.region, d.country_name].filter(Boolean).join(", ") || "India"
    };
  },
  async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const response = await fetch("https://ipwho.is/", { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error("ipwho failed");
    const d = await response.json();
    if (!d.ip || d.ip.includes("Client") || d.ip.includes("Dynamic")) throw new Error("invalid ip");
    return {
      ip: d.ip,
      location: [d.city, d.region, d.country].filter(Boolean).join(", ") || "India"
    };
  },
  async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const response = await fetch("https://freeipapi.com/api/json", { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error("freeipapi failed");
    const d = await response.json();
    const ip = d.ipAddress || d.ip;
    if (!ip || ip.includes("Client") || ip.includes("Dynamic")) throw new Error("invalid ip");
    return {
      ip,
      location: [d.cityName, d.regionName, d.countryName].filter(Boolean).join(", ") || "India"
    };
  },
  async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const response = await fetch("https://api.ipify.org?format=json", { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error("ipify failed");
    const d = await response.json();
    if (!d.ip || d.ip.includes("Client") || d.ip.includes("Dynamic")) throw new Error("invalid ip");
    return {
      ip: d.ip,
      location: "India"
    };
  }
];

const getGeoLocation = async (): Promise<GeoInfo> => {
  if (cachedGeo && cachedGeo.ip && !cachedGeo.ip.includes("Client") && !cachedGeo.ip.includes("Dynamic")) {
    return cachedGeo;
  }

  // Try local storage cache first
  try {
    const stored = localStorage.getItem("govenics_geo_info");
    if (stored) {
      const parsed = JSON.parse(stored);
      const age = Date.now() - (parsed._fetchedAt || 0);
      // Valid for 2 hours, and must be a valid IP (not mock string)
      if (parsed.ip && !parsed.ip.includes("Client") && !parsed.ip.includes("Dynamic") && age < 2 * 60 * 60 * 1000) {
        cachedGeo = { ip: parsed.ip, location: parsed.location || "Unknown Location" };
        return cachedGeo;
      }
    }
  } catch {}

  // Run through fallback chain
  for (const provider of IP_PROVIDERS) {
    try {
      const geo = await provider();
      const withMeta = { ...geo, _fetchedAt: Date.now() };
      try {
        localStorage.setItem("govenics_geo_info", JSON.stringify(withMeta));
      } catch {}
      cachedGeo = geo;
      return geo;
    } catch (err) {
      console.warn("Geolocation provider failed, trying next...", err);
    }
  }

  return { ip: "Unknown IP", location: "Unknown Location" };
};

const dispatchWebhook = async (evt: GrcAnalyticsEvent) => {
  const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
  if (!webhookUrl) return;

  const geo = await getGeoLocation();
  let payload: Record<string, any> = {};

  if (evt.type === "form_submit") {
    const formName = evt.details.formName || "";
    const isPartner = formName === "PartnerForm";
    const isStrategy = formName === "StrategySession";
    const isAssessment = formName === "ComplianceAssessment" || formName === "LeadCapture";
    const sheetName = isPartner ? "Partner_Applications"
      : isStrategy ? "Strategy_Session_Bookings"
      : isAssessment ? "Inbound_Leads"
      : "Consultation_Requests";

    payload = {
      sheetName,
      "Full Name": evt.details.name || "",
      "Email": evt.details.email || "",
      "Company": evt.details.company || "",
      "Phone": evt.details.phone || "",
      "Message": evt.details.message || "",
      "Lead Status": "New",
      "Lead Source": `Website Form — ${formName || "Generic"}`,
      "Source Page": evt.path || "",
      ipLocation: geo.location,
      location: geo.location,
      ipAddress: geo.ip,
      "Timestamp": evt.timestamp
    };

    if (isPartner) {
      payload["Designation"] = evt.details.designation || "";
      payload["Partnership Type"] = evt.details.partnershipType || "";
      payload["Location"] = evt.details.location || "";
    } else {
      payload["Industry"] = evt.details.industry || evt.details.interest || "";
      payload["Service Interest"] = evt.details.serviceInterest || evt.details.interest || "General Consultation";
    }
  } else if (evt.type === "estimator_calc") {
    payload = {
      sheetName: "Estimator_Calculations",
      table: "Estimator_Calculations",
      "Timestamp": evt.timestamp,
      "Company Size": evt.details.state || "Multi-State",
      "Frameworks Selected": evt.details.selectedModules ? evt.details.selectedModules.join(", ") : "",
      "Cloud Scope": evt.details.selectedAiLayers ? evt.details.selectedAiLayers.join(", ") : "",
      "Employee Count": evt.details.employeeCount || "",
      "Estimated Cost (INR)": evt.details.totalLiability || "",
      "Readiness Score (%)": evt.details.readinessScore || "85%",
      "User Email": evt.details.email || "N/A",
      "Phone": evt.details.phone || "N/A",
      "IP Location": geo.location,
      // Retain raw keys for backward compatibility
      sessionId: evt.sessionToken,
      statesCount: evt.details.state || "",
      workforceRange: evt.details.employeeCount || "",
      avgSalary: evt.details.avgSalary || "",
      computedLiability: evt.details.totalLiability || "",
      status: "Estimated",
      ipAddress: geo.ip,
      location: geo.location
    };
  } else if (evt.type === "page_view") {
    payload = {
      sheetName: "Traffic_Analytics",
      table: "Traffic_Analytics",
      "Session ID": evt.sessionToken,
      "Visitor ID": "visitor_grc",
      "Page Path": evt.path,
      "Page Title": evt.details.pageName || "",
      "Referrer": document.referrer || "Direct",
      "Traffic Source": "Direct Traffic",
      "UTM Source": "",
      "UTM Medium": "",
      "UTM Campaign": "",
      "UTM Term": "",
      "UTM Content": "",
      "Organization": "Enterprise Visitor",
      "IP Location": geo.location,
      "IP Address": geo.ip,
      "Variant": "Production",
      "Timestamp": evt.timestamp,
      // Retain raw keys
      sessionId: evt.sessionToken,
      visitorId: "visitor_grc",
      pagePath: evt.path,
      pageTitle: evt.details.pageName || "",
      referrer: document.referrer || "Direct",
      trafficSource: "Direct Traffic",
      ipLocation: geo.location,
      location: geo.location,
      ipAddress: geo.ip,
      timestamp: evt.timestamp
    };
  } else {
    payload = {
      sheetName: "Behavior_Metrics",
      table: "Behavior_Metrics",
      "Session ID": evt.sessionToken,
      "Visitor ID": "visitor_grc",
      "Page URL": evt.path,
      "Category": evt.category,
      "Metric Name": evt.details.action || evt.details.elementText || evt.type,
      "Value": evt.details.value || "1",
      "Element Info": evt.details.elementText || evt.details.elementId || "",
      "Metadata": JSON.stringify(evt.details),
      "IP Location": geo.location,
      "IP Address": geo.ip,
      "Variant": "Default",
      "Timestamp": evt.timestamp,
      // Retain raw keys
      sessionId: evt.sessionToken,
      visitorId: "visitor_grc",
      pageUrl: evt.path,
      category: evt.category,
      metricName: evt.details.action || evt.type,
      value: evt.details.value || "",
      elementInfo: evt.details.elementText || evt.details.elementId || "",
      metadata: JSON.stringify(evt.details),
      ipLocation: geo.location,
      location: geo.location,
      ipAddress: geo.ip,
      timestamp: evt.timestamp
    };
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Failed to dispatch telemetry to Google Sheets Webhook:", err);
  }
};

export const trackEvent = (
  type: GrcAnalyticsEvent["type"],
  category: string,
  details: Record<string, any> = {}
) => {
  if (typeof window === "undefined") return;
  
  initializeTelemetry();
  const sessionToken = getSessionToken();
  const path = window.location.pathname + window.location.search;
  
  const newEvent: GrcAnalyticsEvent = {
    id: "evt_" + generateId(),
    timestamp: new Date().toISOString(),
    type,
    path,
    category,
    details,
    sessionToken
  };

  try {
    const currentStr = localStorage.getItem(STORAGE_KEY);
    const events: GrcAnalyticsEvent[] = currentStr ? JSON.parse(currentStr) : [];
    events.push(newEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    
    // Also dispatch a custom event to notify listeners (e.g. the live dashboard)
    window.dispatchEvent(new CustomEvent("govenics_telemetry_updated", { detail: newEvent }));
    
    // Dispatch to Google Sheets Webhook
    dispatchWebhook(newEvent);
  } catch (err) {
    console.error("Telemetry failed to save", err);
  }
};

export const getEvents = (): GrcAnalyticsEvent[] => {
  if (typeof window === "undefined") return [];
  initializeTelemetry();
  try {
    const currentStr = localStorage.getItem(STORAGE_KEY);
    return currentStr ? JSON.parse(currentStr) : [];
  } catch {
    return [];
  }
};

export const clearEvents = () => {
  if (typeof window === "undefined") return;
  const freshSeeds = generateSeededEvents();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(freshSeeds));
  window.dispatchEvent(new CustomEvent("govenics_telemetry_updated"));
};

export const addManualEvent = (event: Omit<GrcAnalyticsEvent, "id" | "sessionToken">) => {
  if (typeof window === "undefined") return;
  initializeTelemetry();
  const fullEvent: GrcAnalyticsEvent = {
    ...event,
    id: "evt_" + generateId(),
    sessionToken: getSessionToken()
  };
  try {
    const currentStr = localStorage.getItem(STORAGE_KEY);
    const events: GrcAnalyticsEvent[] = currentStr ? JSON.parse(currentStr) : [];
    events.push(fullEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new CustomEvent("govenics_telemetry_updated"));
    
    // Dispatch to Google Sheets Webhook
    dispatchWebhook(fullEvent);
  } catch (err) {
    console.error("Failed to add manual log entry", err);
  }
};

export const getAnalyticsSummary = () => {
  const events = getEvents();
  
  const totalLogs = events.length;
  const sessions = new Set(events.map(e => e.sessionToken)).size;
  
  // Count by event type
  const typeCounts: Record<string, number> = {
    page_view: 0,
    search: 0,
    filter_change: 0,
    estimator_calc: 0,
    form_submit: 0,
    click: 0
  };
  
  // Count by GRC category
  const categoryCounts: Record<string, number> = {};
  
  // Searches
  const searchQueries: { query: string; count: number }[] = [];
  
  // Page view counts
  const pageViewCounts: Record<string, number> = {};
  
  // Estimator aggregates
  let totalEstimatesRun = 0;
  let totalEmployeesCalculated = 0;
  let totalEstimatedLiability = 0;
  const stateCalculationCounts: Record<string, number> = {};

  // Form Submissions / Leads
  const leads: any[] = [];

  events.forEach(e => {
    // Type counts
    if (typeCounts[e.type] !== undefined) {
      typeCounts[e.type]++;
    }

    // Category counts
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;

    // Specific type processing
    if (e.type === "page_view" && e.details?.pageName) {
      const pageKey = `${e.details.pageName} (${e.path})`;
      pageViewCounts[pageKey] = (pageViewCounts[pageKey] || 0) + 1;
    }
    
    if (e.type === "search" && e.details?.query) {
      const q = e.details.query.trim().toLowerCase();
      const existing = searchQueries.find(sq => sq.query.toLowerCase() === q);
      if (existing) {
        existing.count++;
      } else {
        searchQueries.push({ query: e.details.query, count: 1 });
      }
    }
    
    if (e.type === "estimator_calc" && e.details) {
      totalEstimatesRun++;
      totalEmployeesCalculated += (e.details.employeeCount || 0);
      totalEstimatedLiability += (e.details.totalLiability || 0);
      if (e.details.state) {
        stateCalculationCounts[e.details.state] = (stateCalculationCounts[e.details.state] || 0) + 1;
      }
    }

    if (e.type === "form_submit" && e.details) {
      leads.push({
        timestamp: e.timestamp,
        name: e.details.name,
        email: e.details.email,
        company: e.details.company,
        interest: e.details.interest,
        message: e.details.message
      });
    }
  });

  // Sort search queries
  searchQueries.sort((a, b) => b.count - a.count);

  return {
    totalLogs,
    sessions,
    typeCounts,
    categoryCounts,
    topSearches: searchQueries.slice(0, 5),
    topPageViews: Object.entries(pageViewCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    estimator: {
      totalRuns: totalEstimatesRun,
      avgEmployees: totalEstimatesRun > 0 ? Math.round(totalEmployeesCalculated / totalEstimatesRun) : 0,
      avgLiability: totalEstimatesRun > 0 ? Math.round(totalEstimatedLiability / totalEstimatesRun) : 0,
      stateBreakdown: Object.entries(stateCalculationCounts)
        .map(([state, count]) => ({ state, count }))
        .sort((a, b) => b.count - a.count)
    },
    leads: leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  };
};

export const exportToCSV = (events: GrcAnalyticsEvent[]): string => {
  const headers = ["ID", "Timestamp", "Type", "Path", "GRC Category", "Session ID", "Metadata (JSON)"];
  const rows = events.map(e => [
    e.id,
    e.timestamp,
    e.type,
    e.path,
    e.category,
    e.sessionToken,
    JSON.stringify(e.details).replace(/"/g, '""')
  ]);
  
  return [
    headers.join(","),
    ...rows.map(row => row.map(val => `"${val}"`).join(","))
  ].join("\n");
};

export const exportLeadsToCSV = (leads: any[]): string => {
  const headers = ["Timestamp", "Name", "Email", "Company", "Interest", "Message"];
  const rows = leads.map(l => [
    l.timestamp,
    l.name,
    l.email,
    l.company,
    l.interest,
    l.message
  ]);

  return [
    headers.join(","),
    ...rows.map(row => row.map(val => `"${val}"`).join(","))
  ].join("\n");
};
