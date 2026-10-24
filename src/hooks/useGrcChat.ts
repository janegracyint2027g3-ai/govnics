import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  sgrcServices,
  sgrceLibraryData,
  sgrcStatutoryDatabase
} from "@/data/sgrc-data";
import type { StatutoryDocument } from "@/data/sgrc-data";
import { resourcesData } from "@/data/resources-data";
import {
  getPageContext,
  getContextualActionResponse
} from "@/utils/grcChatContext";
import type { GrcChatAction, GrcPageContext } from "@/utils/grcChatContext";

export type { GrcChatAction, GrcPageContext };

export interface GrcSearchResult {
  id: string;
  type: "statutory" | "service" | "resource" | "library" | "calculator";
  title: string;
  category: string;
  description: string;
  link?: string;
  downloadUrl?: string;
  metadata?: any;
}

export interface GrcChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  actions?: GrcChatAction[];
  searchResults?: GrcSearchResult[];
}

export interface GrcLeadData {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
}

export interface GrcCalcData {
  salary?: number;
  years?: number;
  income?: number;
  deductions?: number;
  state?: string;
}

export interface GrcScopingData {
  facility?: string;
  headcount?: string;
  contractors?: string;
}

export type GrcLeadStage = 
  | "chat" 
  | "collect_name" 
  | "collect_email" 
  | "collect_phone" 
  | "completed"
  | "calc_epf_salary"
  | "calc_gratuity_salary"
  | "calc_gratuity_years"
  | "calc_pt_salary"
  | "calc_pt_state"
  | "calc_tax_income"
  | "calc_tax_deductions"
  | "scoping_facility"
  | "scoping_headcount"
  | "scoping_contractors";

const INITIAL_ACTIONS: GrcChatAction[] = [
  { label: "Checklist Scoping Wizard", value: "checklist scoping", type: "quickReply" },
  { label: "Minimum Wages by State", value: "minimum wages", type: "quickReply" },
  { label: "Labour Welfare Fund (LWF)", value: "lwf", type: "quickReply" },
  { label: "DPDP Act Readiness", value: "dpdp", type: "quickReply" },
  { label: "Statutory Calculators", value: "calculators", type: "quickReply" },
  { label: "Request Advisor Callback", value: "callback", type: "quickReply" }
];

export const useGrcChat = () => {
  const location = useLocation();
  const currentContext = getPageContext(location.pathname);
  const prevPathRef = useRef<string>(location.pathname);
  const isFirstRender = useRef(true);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<GrcChatMessage[]>(() => {
    try {
      const stored = sessionStorage.getItem("govenics_chat_messages");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
        }
      }
    } catch {}

    const initialCtx = getPageContext(window.location?.pathname || "/");
    return [
      {
        id: "greeting-" + Date.now(),
        type: "bot",
        content: initialCtx.greeting,
        timestamp: new Date(),
        actions: initialCtx.actions
      }
    ];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Lead capture and calculator state
  const [leadStage, setLeadStage] = useState<GrcLeadStage>("chat");
  const [leadData, setLeadData] = useState<GrcLeadData>({});
  const [calcData, setCalcData] = useState<GrcCalcData>({});
  const [scopingData, setScopingData] = useState<GrcScopingData>({});

  // Persist messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("govenics_chat_messages", JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  // Context Switcher on route / menu / submenu navigation
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathRef.current = location.pathname;
      return;
    }

    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      const newCtx = getPageContext(location.pathname);

      // Reset leadStage and calculations if user navigated to a new page
      setLeadStage("chat");

      const navMsg: GrcChatMessage = {
        id: "nav-ctx-" + Date.now(),
        type: "bot",
        content: `📍 **Context Updated: ${newCtx.pageTitle}**\n\n${newCtx.greeting}`,
        timestamp: new Date(),
        actions: newCtx.actions
      };

      setMessages(prev => [...prev, navMsg]);
      setHasUnread(true);
    }
  }, [location.pathname]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const startLeadCapture = (topic: string = "General Consultation") => {
    setLeadStage("collect_name");
    setLeadData({ topic });
    setIsTyping(true);
    setTimeout(() => {
      streamResponse("I would be glad to connect you with one of our Senior GRC Partners for a 5-minute advisory call. To get started, could you please tell me your full name?");
    }, 400);
  };

  const submitLeadToSheets = async (name: string, email: string, phone: string, topic: string) => {
    const webhookUrl = import.meta.env.VITE_TELEMETRY_WEBHOOK_URL;
    if (!webhookUrl) return;

    let ip = "Unknown IP";
    let location = "Unknown Location";

    try {
      const geoStr = localStorage.getItem("govenics_geo_info");
      if (geoStr) {
        const geo = JSON.parse(geoStr);
        ip = geo.ip || ip;
        location = geo.location || location;
      }
    } catch {}

    const payload = {
      sheetName: "ChatbotLeads",
      name,
      email,
      phone,
      message: `Inquired about: ${topic}`,
      status: "New Lead",
      ipAddress: ip,
      location: location,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      console.log("Chatbot lead submitted successfully to sheet ChatbotLeads.");
    } catch (err) {
      console.warn("Failed to submit GRC chatbot lead:", err);
    }
  };

  // Advanced client-side search engine matching query against local datasets
  const performSearch = (query: string): { text: string; results?: GrcSearchResult[]; actions?: GrcChatAction[] } => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        text: "Please enter a valid search query to scan GRC resources.",
        actions: currentContext.actions
      };
    }

    // 0. Check contextual response for this page/action
    const contextualAns = getContextualActionResponse(query, location.pathname);
    if (contextualAns) {
      return {
        text: contextualAns,
        actions: currentContext.actions
      };
    }

    const stateKeywords = ["maharashtra", "karnataka", "tamil nadu", "delhi", "telangana", "andhra pradesh", "bihar", "assam", "andaman"];
    const matchedState = stateKeywords.find(st => q.includes(st));
    const cleanState = matchedState 
      ? matchedState.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") 
      : null;

    // Dynamic Statutory GRC Q&A Resolver
    const findStatutoryDoc = (id: string): StatutoryDocument | null => {
      const domains = ["lei", "ehs", "fcc"] as const;
      for (const dom of domains) {
        const categoriesObj = sgrcStatutoryDatabase[dom];
        if (!categoriesObj) continue;
        for (const catKey of Object.keys(categoriesObj)) {
          const docList = (categoriesObj as any)[catKey] as StatutoryDocument[];
          if (!docList) continue;
          const found = docList.find(d => d.id === id);
          if (found) return found;
        }
      }
      return null;
    };

    const statMappings: Record<string, string> = {
      posh: "posh-act-2013",
      gratuity: "payment-of-gratuity-act",
      epf: "epf-provisions-act",
      "provident fund": "epf-provisions-act",
      esic: "esi-act",
      esi: "esi-act",
      clra: "contract-labour-act",
      "contract labour": "contract-labour-act",
      "code on wages": "code-on-wages",
      "wage code": "code-on-wages",
      "industrial relations": "industrial-relations-code",
      "social security": "code-on-social-security",
      osh: "osh-working-conditions-code",
      "safety code": "osh-working-conditions-code",
      environment: "environment-protection-act",
      "water act": "water-pollution-act",
      "air act": "air-pollution-act"
    };

    // Check for statutory acts mapping first
    const matchedActKey = Object.keys(statMappings).find(key => q.includes(key));
    if (matchedActKey) {
      const docId = statMappings[matchedActKey];
      const doc = findStatutoryDoc(docId);
      if (doc) {
        let answerText = `### ${doc.title} (${doc.year})\n`;
        answerText += `*Enacted by:* ${doc.enactedBy}\n\n`;
        answerText += `**Objective:** ${doc.objective}\n\n`;
        answerText += `**Applicability:** ${doc.applicability}\n\n`;
        answerText += `**Key Provisions:**\n` + doc.keyProvisions.map(p => `• ${p}`).join("\n");

        return {
          text: answerText,
          results: [{
            id: doc.id,
            type: "statutory",
            title: doc.title,
            category: "Statutory Law",
            description: doc.objective,
            link: `/sgrc/e-library?domain=lei`
          }]
        };
      }
    }

    // Check for services mapping (dynamic explanation)
    const matchedService = sgrcServices.find(s => q.includes(s.id) || q.includes(s.title.toLowerCase()) || (s.id === "ehs" && q === "ehs"));
    if (matchedService) {
      let serviceText = `### ${matchedService.title}\n`;
      serviceText += `*${matchedService.tagline}*\n\n`;
      serviceText += `**Overview:** ${matchedService.description}\n\n`;
      serviceText += `**Who Needs This?**\n` + matchedService.whoNeeds.map(n => `• ${n}`).join("\n") + `\n\n`;
      serviceText += `**Key Compliance Outcomes:**\n` + matchedService.benefits.map(b => `• ${b}`).join("\n");

      return {
        text: serviceText,
        results: [{
          id: matchedService.id,
          type: "service",
          title: matchedService.title,
          category: "GRC Compliance Service",
          description: matchedService.tagline,
          link: `/sgrc/services/${matchedService.id}`
        }]
      };
    }

    // 0. Checklist Scoping Wizard trigger
    if (q === "checklist scoping" || q === "checklist" || q.includes("scoping") || q.includes("scoping wizard")) {
      setLeadStage("scoping_facility");
      setScopingData({});
      return {
        text: "Welcome to the Govenics Statutory Checklist Scoping Wizard! Let's identify the exact audit checklists your company requires based on your business model.\n\nQuestion 1: What is your primary facility or business operation type?",
        actions: [
          { label: "Office / Retail Store", value: "office", type: "quickReply" },
          { label: "Manufacturing Factory / Plant", value: "factory", type: "quickReply" },
          { label: "Mining Site / Quarry", value: "mines", type: "quickReply" },
          { label: "General Corporate Only", value: "corporate", type: "quickReply" }
        ]
      };
    }

    // 1. Interactive Calculators trigger
    if (q === "calculators" || q === "calculator" || q.includes("calc")) {
      if (q === "calc epf") {
        setLeadStage("calc_epf_salary");
        return {
          text: "Sure! Let's estimate your Employee Provident Fund (EPF). What is your Monthly Basic Salary + DA in Rupees?"
        };
      }
      if (q === "calc gratuity") {
        setLeadStage("calc_gratuity_salary");
        return {
          text: "Let's compute your Gratuity liability. What is your last-drawn Monthly Basic Salary in Rupees?"
        };
      }
      if (q === "calc pt") {
        setLeadStage("calc_pt_salary");
        return {
          text: "Let's calculate your Monthly Professional Tax (PT). What is your Monthly Gross Salary in Rupees?"
        };
      }
      if (q === "calc tax") {
        setLeadStage("calc_tax_income");
        return {
          text: "Let's compare Old vs New Tax Regimes (FY 2026-27 Slabs). What is your Gross Annual Income in Rupees?"
        };
      }

      return {
        text: "Which statutory compliance calculator would you like to run directly in our chat window?",
        actions: [
          { label: "EPF Share Calculator", value: "calc epf", type: "quickReply" },
          { label: "Gratuity Calculator", value: "calc gratuity", type: "quickReply" },
          { label: "Professional Tax (PT)", value: "calc pt", type: "quickReply" },
          { label: "Income Tax Slabs", value: "calc tax", type: "quickReply" }
        ]
      };
    }

    // 2. Topic Specific Routing: Minimum Wages
    if (q.includes("wage") || q.includes("salary")) {
      const minWageItem = sgrceLibraryData["minimum-wages"];
      const results: GrcSearchResult[] = [];

      if (cleanState && minWageItem.data[cleanState]) {
        const stateData = minWageItem.data[cleanState];
        let desc = `Slabs for ${cleanState}: \n`;
        if (stateData.unskilled) desc += `• Unskilled: ${stateData.unskilled}\n`;
        if (stateData.semiSkilled) desc += `• Semi-Skilled: ${stateData.semiSkilled}\n`;
        if (stateData.skilled) desc += `• Skilled: ${stateData.skilled}\n`;
        if (stateData.highlySkilled) desc += `• Highly Skilled: ${stateData.highlySkilled}\n`;

        results.push({
          id: "lib-minwage-state",
          type: "library",
          title: `Minimum Wages Act - ${cleanState}`,
          category: "Labour compliance",
          description: desc,
          link: `/sgrc/e-library?domain=lei&tab=minimum-wages`
        });
      } else {
        // Return summary of all states
        Object.keys(minWageItem.data).forEach(stateName => {
          const sd = minWageItem.data[stateName];
          results.push({
            id: `lib-minwage-${stateName.toLowerCase()}`,
            type: "library",
            title: `Minimum Wages Slabs - ${stateName}`,
            category: "Labour compliance",
            description: `Unskilled: ${sd.unskilled || sd.unskilledWage || "N/A"} • Skilled: ${sd.skilled || "N/A"}${sd.highlySkilled ? ` • Highly Skilled: ${sd.highlySkilled}` : ""}`,
            link: `/sgrc/e-library?domain=lei&tab=minimum-wages`
          });
        });
      }

      return {
        text: `Here are the matching Minimum Wages guidelines and slabs I identified under your query. Click the link to view the calculator and full legal abstracts on the e-Library page:`,
        results,
        actions: [{ label: "Open e-Library wages", value: "/sgrc/e-library?domain=lei&tab=minimum-wages", type: "link" }]
      };
    }

    // 3. Topic Specific Routing: LWF
    if (q.includes("lwf") || q.includes("welfare fund") || q.includes("welfare")) {
      const lwfItem = sgrceLibraryData["labour-welfare-fund"];
      const results: GrcSearchResult[] = [];

      if (cleanState && lwfItem.data[cleanState]) {
        const sd = lwfItem.data[cleanState];
        results.push({
          id: "lib-lwf-state",
          type: "library",
          title: `Labour Welfare Fund (LWF) - ${cleanState}`,
          category: "Labour compliance",
          description: `Employee Contribution: ${sd.employeeContribution}\nEmployer Contribution: ${sd.employerContribution}\nFrequency: ${sd.frequency}\nDue Date: ${sd.dueDate}`,
          link: `/sgrc/e-library?domain=lei&tab=labour-welfare-fund`
        });
      } else {
        Object.keys(lwfItem.data).forEach(stateName => {
          const sd = lwfItem.data[stateName];
          results.push({
            id: `lib-lwf-${stateName.toLowerCase()}`,
            type: "library",
            title: `LWF Slabs - ${stateName}`,
            category: "Labour compliance",
            description: `Employee: ${sd.employeeContribution} • Employer: ${sd.employerContribution} (${sd.frequency})`,
            link: `/sgrc/e-library?domain=lei&tab=labour-welfare-fund`
          });
        });
      }

      return {
        text: `I've found the following statutory Labour Welfare Fund contribution rates:`,
        results,
        actions: [{ label: "Open e-Library LWF", value: "/sgrc/e-library?domain=lei&tab=labour-welfare-fund", type: "link" }]
      };
    }

    // 4. Topic Specific Routing: Professional Tax (PT)
    if (q.includes("pt") || q.includes("professional tax") || q.includes("pt slabs")) {
      const ptItem = sgrceLibraryData["professional-tax"];
      const results: GrcSearchResult[] = [];

      if (cleanState && ptItem.data[cleanState]) {
        const sd = ptItem.data[cleanState];
        const slabsStr = sd.slabs 
          ? sd.slabs.map((s: any) => `• ${s.range}: ${s.tax}`).join("\n") 
          : `Flat rate: ${sd.tax || "Check slabs in e-library"}`;

        results.push({
          id: "lib-pt-state",
          type: "library",
          title: `Professional Tax (PT) - ${cleanState}`,
          category: "Statutory Tax",
          description: `Applicable Slabs:\n${slabsStr}`,
          link: `/sgrc/e-library?domain=lei&tab=professional-tax`
        });
      } else {
        Object.keys(ptItem.data).forEach(stateName => {
          const sd = ptItem.data[stateName];
          const slabsStr = sd.slabs 
            ? sd.slabs.map((s: any) => `${s.range} → ${s.tax}`).slice(0, 2).join("; ") + "..." 
            : `Rates active`;
          results.push({
            id: `lib-pt-${stateName.toLowerCase()}`,
            type: "library",
            title: `Professional Tax Slabs - ${stateName}`,
            category: "Statutory Tax",
            description: slabsStr,
            link: `/sgrc/e-library?domain=lei&tab=professional-tax`
          });
        });
      }

      return {
        text: `Here are the state-wise Professional Tax (PT) slabs found under your search parameters:`,
        results,
        actions: [{ label: "Open PT e-Library", value: "/sgrc/e-library?domain=lei&tab=professional-tax", type: "link" }]
      };
    }

    // 5. Topic Specific Routing: Leaves, Holidays, NFH
    if (q.includes("leave") || q.includes("holiday") || q.includes("nfh") || q.includes("festival")) {
      const results: GrcSearchResult[] = [];
      const tabs = ["leaves-working-hours", "holidays-list", "nfh-details"];
      
      tabs.forEach(tabKey => {
        const item = sgrceLibraryData[tabKey];
        if (item) {
          results.push({
            id: `lib-tab-${tabKey}`,
            type: "library",
            title: item.title,
            category: "Labour compliance",
            description: item.introduction || item.whatIsIt || "State-specific mandates and schedules.",
            link: `/sgrc/e-library?domain=lei&tab=${tabKey}`
          });
        }
      });

      return {
        text: `I've mapped the following statutory rules regarding annual leave policies, national festival holidays (NFH), and working hour boundaries:`,
        results,
        actions: [
          { label: "View Leaves & Working Hours", value: "/sgrc/e-library?domain=lei&tab=leaves-working-hours", type: "link" },
          { label: "View Holidays List", value: "/sgrc/e-library?domain=lei&tab=holidays-list", type: "link" }
        ]
      };
    }

    // 6. Topic Specific Routing: DPDP Act & Data Privacy
    if (q.includes("dpdp") || q.includes("privacy") || q.includes("consent") || q.includes("data protection")) {
      const dpdpItem = resourcesData.find(r => r.id === "dpdp-readiness-whitepaper");
      const results: GrcSearchResult[] = [];

      if (dpdpItem) {
        results.push({
          id: dpdpItem.id,
          type: "resource",
          title: dpdpItem.title,
          category: dpdpItem.category,
          description: dpdpItem.summary,
          link: "/sgrc/resources",
          downloadUrl: dpdpItem.downloadUrl
        });
      }

      // Add DPDP / Data Privacy Audit Service
      const privService = sgrcServices.find(s => s.id === "data-privacy-dpdp" || s.title.toLowerCase().includes("privacy"));
      if (privService) {
        results.push({
          id: privService.id,
          type: "service",
          title: privService.title,
          category: "Compliance Audit",
          description: privService.tagline || privService.description,
          link: `/sgrc/services/${privService.id}`
        });
      }

      return {
        text: `Here are India's DPDP Act compliance materials and consulting audit templates I've located in our database:`,
        results,
        actions: [
          { label: "Download DPDP Whitepaper", value: "/sgrc/resources", type: "link" },
          { label: "View Privacy Audit Services", value: "/sgrc/services", type: "link" }
        ]
      };
    }

    // 7. Topic Specific Routing: ISO 27001 & Cybersecurity
    if (q.includes("iso") || q.includes("27001") || q.includes("cyber") || q.includes("cybersecurity") || q.includes("security standard")) {
      const isoItem = resourcesData.find(r => r.id === "iso27001-2022-update");
      const results: GrcSearchResult[] = [];

      if (isoItem) {
        results.push({
          id: isoItem.id,
          type: "resource",
          title: isoItem.title,
          category: isoItem.category,
          description: isoItem.summary,
          link: "/sgrc/resources",
          downloadUrl: isoItem.downloadUrl
        });
      }

      return {
        text: `I've retrieved our transition brief and auditor checklist for ISO 27001 standards:`,
        results,
        actions: [{ label: "View Cybersecurity Resources", value: "/sgrc/resources", type: "link" }]
      };
    }

    // 8. General Keyword Matching across all datasets
    const results: GrcSearchResult[] = [];

    // Search inside sgrcServices
    sgrcServices.forEach(s => {
      const contentStr = `${s.title} ${s.tagline} ${s.description} ${s.whoNeeds.join(" ")}`.toLowerCase();
      if (contentStr.includes(q)) {
        results.push({
          id: s.id,
          type: "service",
          title: s.title,
          category: "Compliance Service",
          description: s.tagline || s.description.slice(0, 150) + "...",
          link: `/sgrc/services/${s.id}`
        });
      }
    });

    // Search inside resourcesData
    resourcesData.forEach(r => {
      const contentStr = `${r.title} ${r.category} ${r.summary} ${r.author}`.toLowerCase();
      if (contentStr.includes(q)) {
        results.push({
          id: r.id,
          type: "resource",
          title: r.title,
          category: `Resource: ${r.type.toUpperCase()}`,
          description: r.summary,
          link: `/sgrc/resources`,
          downloadUrl: r.downloadUrl
        });
      }
    });

    // Search inside sgrceLibraryData (top keys)
    Object.keys(sgrceLibraryData).forEach(key => {
      const item = sgrceLibraryData[key];
      const contentStr = `${item.title} ${item.introduction} ${item.whatIsIt} ${item.scope} ${item.applicability}`.toLowerCase();
      if (contentStr.includes(q)) {
        results.push({
          id: `lib-${key}`,
          type: "library",
          title: item.title,
          category: "e-Library Tab",
          description: item.introduction.slice(0, 150) + "...",
          link: `/sgrc/e-library?domain=lei&tab=${key}`
        });
      }
    });

    // Search inside sgrcStatutoryDatabase (Acts, Rules, Regulations, etc.)
    let statutoryCount = 0;
    const domains = ["lei", "ehs", "fcc"] as const;
    
    for (const dom of domains) {
      const categoriesObj = sgrcStatutoryDatabase[dom];
      if (!categoriesObj) continue;

      for (const catKey of Object.keys(categoriesObj)) {
        if (statutoryCount >= 4) break;
        const docList = (categoriesObj as any)[catKey] as StatutoryDocument[];
        if (!docList) continue;

        for (const doc of docList) {
          if (statutoryCount >= 4) break;
          const docStr = `${doc.title} ${doc.objective} ${doc.applicability} ${doc.enactedBy} ${doc.keyProvisions.join(" ")}`.toLowerCase();
          
          if (docStr.includes(q)) {
            results.push({
              id: doc.id,
              type: "statutory",
              title: doc.title,
              category: `Statutory: ${dom.toUpperCase()} ${catKey.toUpperCase()}`,
              description: `Objective: ${doc.objective.slice(0, 150)}...\nApplicability: ${doc.applicability}`,
              link: `/sgrc/e-library?domain=${dom}&tab=${catKey}`,
              downloadUrl: doc.downloadUrl
            });
            statutoryCount++;
          }
        }
      }
    }

    if (results.length > 0) {
      return {
        text: `Based on your search query "${query}", I have identified the following GRC resources, tools, and statutory filings:`,
        results: results.slice(0, 6)
      };
    }

    // Fallback if no matching records found
    return {
      text: `I couldn't find any direct database hits matching "${query}" in our local GRC Acts index. Would you like to request a callback from a Senior Partner, or search a different standard?`,
      actions: [
        { label: "Request Callback", value: "callback", type: "quickReply" },
        { label: "Browse e-Library Portal", value: "/sgrc/e-library", type: "link" },
        { label: "View Compliance Services", value: "/sgrc/services", type: "link" }
      ]
    };
  };

  const streamResponse = (text: string, results?: GrcSearchResult[], actions?: GrcChatAction[]) => {
    setIsTyping(true);
    const botMsgId = "bot-" + Date.now();

    setMessages(prev => [
      ...prev,
      {
        id: botMsgId,
        type: "bot",
        content: "",
        timestamp: new Date()
      }
    ]);

    let currentIndex = 0;
    const textLength = text.length;
    
    const interval = setInterval(() => {
      currentIndex += 3;
      const currentText = text.substring(0, Math.min(currentIndex, textLength));
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, content: currentText } 
            : msg
        )
      );

      if (currentIndex >= textLength) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, searchResults: results, actions } 
              : msg
          )
        );
      }
    }, 15);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: GrcChatMessage = {
      id: "user-" + Date.now(),
      type: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const valStr = text.trim();
    const valNum = parseFloat(valStr);

    // Calculator Flows
    if (leadStage.startsWith("calc_")) {
      setTimeout(() => {
        // --- 1. EPF FLOW ---
        if (leadStage === "calc_epf_salary") {
          if (isNaN(valNum) || valNum <= 0) {
            streamResponse("Please enter a valid monthly salary number (e.g. 25000):");
            setIsTyping(false);
            return;
          }
          const basic = valNum;
          const employeeShare = basic * 0.12;
          const epsShare = Math.min(1250, basic * 0.0833);
          const employerEpf = (basic * 0.12) - epsShare;
          const totalSavings = employeeShare + employerEpf + epsShare;

          const summaryText = `Employee Share (12%): ₹${employeeShare.toLocaleString()}\nEmployer EPF (3.67%): ₹${employerEpf.toLocaleString()}\nEmployer EPS Pension (8.33%): ₹${epsShare.toLocaleString()}\nTotal Monthly Contribution: ₹${totalSavings.toLocaleString()}`;

          setLeadStage("chat");
          setCalcData({});
          streamResponse(
            `I've calculated your EPF projections for a basic salary of ₹${basic.toLocaleString()}:`,
            [
              {
                id: "calc-epf-result",
                type: "calculator",
                title: "EPF Contribution Breakdown",
                category: "Provident Fund",
                description: summaryText,
                link: "/sgrc/e-library?domain=lei&tab=calculators"
              }
            ],
            INITIAL_ACTIONS
          );
        }
        
        // --- 2. GRATUITY FLOW ---
        else if (leadStage === "calc_gratuity_salary") {
          if (isNaN(valNum) || valNum <= 0) {
            streamResponse("Please enter a valid salary amount (e.g. 35000):");
            setIsTyping(false);
            return;
          }
          setCalcData({ salary: valNum });
          setLeadStage("calc_gratuity_years");
          streamResponse("Great. How many completed years of continuous service do you have?");
        }
        else if (leadStage === "calc_gratuity_years") {
          if (isNaN(valNum) || valNum < 0) {
            streamResponse("Please enter a valid number of years (e.g. 8):");
            setIsTyping(false);
            return;
          }
          const salary = calcData.salary || 0;
          const years = valNum;
          const amount = Math.round((salary * 15 * years) / 26);
          const isEligible = years >= 5;

          const desc = `Estimated Benefit: ₹${amount.toLocaleString()}\nEligibility Status: ${
            isEligible ? "Eligible (Years >= 5)" : "Not Eligible Yet (Requires >= 5 Years)"
          }\nFormula: (Basic Salary × 15 × Years) ÷ 26. Maximum tax-free cap is ₹20L.`;

          setLeadStage("chat");
          setCalcData({});
          streamResponse(
            `Here is your Gratuity liability calculation:`,
            [
              {
                id: "calc-gratuity-result",
                type: "calculator",
                title: "Gratuity Liability Report",
                category: "Gratuity benefit",
                description: desc,
                link: "/sgrc/e-library?domain=lei&tab=calculators"
              }
            ],
            INITIAL_ACTIONS
          );
        }

        // --- 3. PROFESSIONAL TAX FLOW ---
        else if (leadStage === "calc_pt_salary") {
          if (isNaN(valNum) || valNum <= 0) {
            streamResponse("Please enter a valid monthly salary (e.g. 32000):");
            setIsTyping(false);
            return;
          }
          setCalcData({ salary: valNum });
          setLeadStage("calc_pt_state");
          streamResponse("Which state do you work in? (Maharashtra, Karnataka, Tamil Nadu, Telangana)");
        }
        else if (leadStage === "calc_pt_state") {
          const inputState = valStr.toLowerCase();
          let stateLabel = "";
          let tax = 0;
          let note = "";

          const gross = calcData.salary || 0;

          if (inputState.includes("karnataka")) {
            stateLabel = "Karnataka";
            tax = gross > 25000 ? 200 : 0;
          } else if (inputState.includes("maharashtra")) {
            stateLabel = "Maharashtra";
            if (gross > 10000) {
              tax = 200;
              note = "₹200 per month (₹250 in February)";
            } else if (gross > 7500) {
              tax = 175;
            } else {
              tax = 0;
            }
          } else if (inputState.includes("tamil") || inputState.includes("nadu")) {
            stateLabel = "Tamil Nadu";
            if (gross > 12500) tax = 208;
            else if (gross > 10000) tax = 170;
            else if (gross > 7500) tax = 115;
            else if (gross > 5000) tax = 52.5;
            else if (gross > 3500) tax = 22.5;
            else tax = 0;
          } else if (inputState.includes("telangana")) {
            stateLabel = "Telangana";
            if (gross > 20000) tax = 200;
            else if (gross > 15000) tax = 150;
            else tax = 0;
          } else {
            streamResponse("Unsupported state. Please choose from: Maharashtra, Karnataka, Tamil Nadu, or Telangana:");
            setIsTyping(false);
            return;
          }

          const desc = `Monthly PT Deduction: ₹${tax.toLocaleString()}\nGross Salary checked: ₹${gross.toLocaleString()}\nNote: ${note || "Slab applied."}`;

          setLeadStage("chat");
          setCalcData({});
          streamResponse(
            `Professional Tax (PT) result for ${stateLabel}:`,
            [
              {
                id: "calc-pt-result",
                type: "calculator",
                title: `PT Liability - ${stateLabel}`,
                category: "Professional tax",
                description: desc,
                link: "/sgrc/e-library?domain=lei&tab=calculators"
              }
            ],
            INITIAL_ACTIONS
          );
        }

        // --- 4. INCOME TAX COMPARE FLOW ---
        else if (leadStage === "calc_tax_income") {
          if (isNaN(valNum) || valNum <= 0) {
            streamResponse("Please enter a valid annual income (e.g. 950000):");
            setIsTyping(false);
            return;
          }
          setCalcData({ income: valNum });
          setLeadStage("calc_tax_deductions");
          streamResponse("What is your total annual deduction under Old Regime (e.g. 80C, 80D, HRA) in Rupees? (Enter 0 if none)");
        }
        else if (leadStage === "calc_tax_deductions") {
          if (isNaN(valNum) || valNum < 0) {
            streamResponse("Please enter a valid deduction amount (e.g. 150000) or enter 0:");
            setIsTyping(false);
            return;
          }

          const gross = calcData.income || 0;
          const deductions = valNum;

          // New Regime Calculation (FY 2026-27 Slabs)
          const stdDedNew = 75000;
          const taxableNew = Math.max(0, gross - stdDedNew);
          let taxNew = 0;

          if (taxableNew > 700000) {
            if (taxableNew > 1500000) {
              taxNew += (taxableNew - 1500000) * 0.3 + 300000 * 0.2 + 200000 * 0.15 + 300000 * 0.1 + 400000 * 0.05;
            } else if (taxableNew > 1200000) {
              taxNew += (taxableNew - 1200000) * 0.2 + 200000 * 0.15 + 300000 * 0.1 + 400000 * 0.05;
            } else if (taxableNew > 1000000) {
              taxNew += (taxableNew - 1000000) * 0.15 + 300000 * 0.1 + 400000 * 0.05;
            } else if (taxableNew > 700000) {
              taxNew += (taxableNew - 700000) * 0.1 + 400000 * 0.05;
            } else if (taxableNew > 300000) {
              taxNew += (taxableNew - 300000) * 0.05;
            }
          }
          const finalTaxNew = Math.round(taxNew * 1.04);

          // Old Regime Calculation
          const stdDedOld = 50000;
          const taxableOld = Math.max(0, gross - stdDedOld - deductions);
          let taxOld = 0;

          if (taxableOld > 500000) {
            if (taxableOld > 1000000) {
              taxOld += (taxableOld - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
            } else {
              taxOld += (taxableOld - 500000) * 0.2 + 250000 * 0.05;
            }
          } else if (taxableOld > 250000) {
            taxOld += (taxableOld - 250000) * 0.05;
            if (taxableOld <= 500000) taxOld = 0;
          }
          const finalTaxOld = Math.round(taxOld * 1.04);

          const recRegime = finalTaxNew < finalTaxOld ? "New Regime" : "Old Regime";
          const savings = Math.abs(finalTaxOld - finalTaxNew);

          const desc = `New Regime Tax: ₹${finalTaxNew.toLocaleString()}\nOld Regime Tax: ₹${finalTaxOld.toLocaleString()}\nRecommended: ${recRegime}\nPotential Annual Savings: ₹${savings.toLocaleString()}`;

          setLeadStage("chat");
          setCalcData({});
          streamResponse(
            `Income Tax Slabs Estimator Comparison:`,
            [
              {
                id: "calc-tax-result",
                type: "calculator",
                title: "Tax Regime Comparison",
                category: "Income tax",
                description: desc,
                link: "/sgrc/e-library?domain=lei&tab=calculators"
              }
            ],
            INITIAL_ACTIONS
          );
        }
      }, 600);
      return;
    }

    // Scoping/Questionnaire and Lead capture flow interceptor
    if (leadStage !== "chat") {
      setTimeout(() => {
        if (leadStage === "scoping_facility") {
          const facility = valStr.toLowerCase();
          setScopingData(prev => ({ ...prev, facility }));
          setLeadStage("scoping_headcount");
          streamResponse(
            "Understood. Question 2: What is your total active employee headcount range?",
            undefined,
            [
              { label: "Under 10 employees", value: "under_10", type: "quickReply" },
              { label: "10 to 19 employees", value: "10_to_19", type: "quickReply" },
              { label: "20 or more employees", value: "20_plus", type: "quickReply" }
            ]
          );
        } else if (leadStage === "scoping_headcount") {
          const headcount = valStr.toLowerCase();
          setScopingData(prev => ({ ...prev, headcount }));
          setLeadStage("scoping_contractors");
          streamResponse(
            "Got it. Question 3: Do you deploy contract labor, agency security guards, or outsourced staffing providers?",
            undefined,
            [
              { label: "Yes, we use contractors", value: "yes", type: "quickReply" },
              { label: "No, direct payroll only", value: "no", type: "quickReply" }
            ]
          );
        } else if (leadStage === "scoping_contractors") {
          const contractors = valStr.toLowerCase();
          const finalScoping = { ...scopingData, contractors };
          
          setLeadStage("chat");
          setScopingData({});

          const results: GrcSearchResult[] = [];
          let textIntro = "Awesome! Based on your selections, I have evaluated your statutory applicability and generated your customized **GRC Audit Checklist Package**:\n\n";

          if (finalScoping.facility === "factory") {
            textIntro += "• **Industrial & Environmental Mandates**: Since you run a manufacturing plant, you are subject to the Factories Act and Pollution Control guidelines. I've added the Factory Compliance and EHS checklists.\n";
            
            const facService = sgrcServices.find(s => s.id === "factory-compliance");
            if (facService) {
              results.push({
                id: facService.id,
                type: "service",
                title: "Factory Compliance Checklist",
                category: "Factories Act",
                description: "Inspect factory license, health checks, safety charters, and safety committee logs.",
                link: `/sgrc/services/${facService.id}`
              });
            }

            const ehsService = sgrcServices.find(s => s.id === "ehs");
            if (ehsService) {
              results.push({
                id: ehsService.id,
                type: "service",
                title: "EHS Audit Checklist",
                category: "Environment & Safety",
                description: "Consent to Operate (CTO), ISO 14001, emission testings, and chemical spill SOPs.",
                link: `/sgrc/services/${ehsService.id}`
              });
            }
          } else if (finalScoping.facility === "mines") {
            textIntro += "• **Mining & Resources Regulations**: Mining operations require strict DGMS approvals, vocational training registers, and gas monitoring. I've added the Mines Compliance checklist.\n";
            
            const mineService = sgrcServices.find(s => s.id === "mines-compliance");
            if (mineService) {
              results.push({
                id: mineService.id,
                type: "service",
                title: "Mines Compliance Checklist",
                category: "DGMS Mines Act",
                description: "Mining permits, vocational MVTC training files, noise/dust registers, and mock drills.",
                link: `/sgrc/services/${mineService.id}`
              });
            }
          } else {
            textIntro += "• **Commercial Establishment Rules**: Offices and retail chains must maintain Shop Act licenses, holiday rosters, and mandatory notice board displays. I've added the Shop & Establishment checklist.\n";
            
            const estService = sgrcServices.find(s => s.id === "establishment-compliances");
            if (estService) {
              results.push({
                id: estService.id,
                type: "service",
                title: "Shop & Establishment Checklist",
                category: "Shops Act",
                description: "Verify local registrations, Form F/G leave registers, holiday displays, and weekly offs.",
                link: `/sgrc/services/${estService.id}`
              });
            }
          }

          if (finalScoping.headcount === "20_plus") {
            textIntro += "• **PF Registration & Director Shield**: With 20+ employees, EPF registration is mandatory, and vendor co-employment liability audits are highly recommended. I've added the Compliance Risk Audit checklist.\n";
            
            const craService = sgrcServices.find(s => s.id === "compliance-risk-audit");
            if (craService) {
              results.push({
                id: craService.id,
                type: "service",
                title: "Director Shield & Due Diligence",
                category: "Corporate GRC",
                description: "Director indemnity, POSH/CLRA/PF headcount triggers, and vendor SLA liability audit.",
                link: `/sgrc/services/${craService.id}`
              });
            }
          }

          const payService = sgrcServices.find(s => s.id === "payroll-compliance");
          if (payService) {
            results.push({
              id: payService.id,
              type: "service",
              title: "Payroll Statutory Checklist",
              category: "PF / ESIC / PT / LWF",
              description: "Audit monthly ECR challans, ESIC contribution limits, LWF filings, and Professional Tax slabs.",
              link: `/sgrc/services/${payService.id}`
            });
          }

          if (finalScoping.contractors === "yes") {
            textIntro += "• **Contractor Shield & Flexi Risk**: Using third-party contractors triggers Principal Employer registrations and CLRA licensing rules. I've added the Vendor Compliance audit checklist.\n";
            
            const venService = sgrcServices.find(s => s.id === "vendor-compliance");
            if (venService) {
              results.push({
                id: venService.id,
                type: "service",
                title: "Contractor Compliance Checklist",
                category: "CLRA Compliance",
                description: "Audit contractor license validations, direct salary bank receipts, and contractor EPF ECR sheets.",
                link: `/sgrc/services/${venService.id}`
              });
            }
          }

          textIntro += "\nClick on any of the recommended checklists below to perform your interactive self-assessment on-screen and print the formal corporate PDF certificate:";

          streamResponse(textIntro, results, INITIAL_ACTIONS);
        } else if (leadStage === "collect_name") {
          setLeadData(prev => ({ ...prev, name: text }));
          setLeadStage("collect_email");
          streamResponse(`Nice to meet you, ${text}! What is your professional email address so our advisory team can send details?`);
        } else if (leadStage === "collect_email") {
          if (!text.includes("@") || text.length < 5) {
            streamResponse("That doesn't look like a valid email address. Please enter a valid email to continue:");
            setIsTyping(false);
            return;
          }
          setLeadData(prev => ({ ...prev, email: text }));
          setLeadStage("collect_phone");
          streamResponse("Got it. What is the best contact phone number for us to reach you at?");
        } else if (leadStage === "collect_phone") {
          const name = leadData.name || "Valued Lead";
          const email = leadData.email || "No Email";
          const phone = text;
          const topic = leadData.topic || "General GRC Search";

          setLeadStage("completed");
          streamResponse(`Thank you, ${name}. I have successfully sent your contact details to our advisory desk. A Govenics partner will call you back on ${phone} shortly.\n\nIs there any other compliance standard or resource you would like to search for?`, undefined, INITIAL_ACTIONS);

          // Submit to sheets backend
          submitLeadToSheets(name, email, phone, topic);
        }
      }, 600);
      return;
    }

    const q = text.toLowerCase().trim();

    // General routing for lead capture initialization
    if (
      q === "callback" || 
      q === "request callback" || 
      q === "contact" || 
      q.includes("speak to human") || 
      q.includes("call me") ||
      q.includes("consult specialist")
    ) {
      startLeadCapture(leadData.topic || "Manual Callback Request");
      return;
    }

    // Simulate natural delays (600ms) for general database search
    setTimeout(() => {
      const response = performSearch(text);
      
      if (response.results) {
        setLeadData(prev => ({ ...prev, topic: `Search for "${text}"` }));
      }
      
      streamResponse(response.text, response.results, response.actions);
    }, 600);
  };

  const handleAction = (action: GrcChatAction) => {
    if (action.type === "quickReply") {
      if (action.value === "callback") {
        startLeadCapture(leadData.topic || "Callback Action Request");
      } else {
        handleSendMessage(action.value);
      }
    } else if (action.type === "link") {
      if (action.value.startsWith("/")) {
        window.location.href = action.value;
      } else {
        window.open(action.value, "_blank");
      }
    }
  };

  return {
    isOpen,
    toggleChat,
    messages,
    isTyping,
    hasUnread,
    currentContext,
    resetConversation: () => {
      const ctx = getPageContext(location.pathname);
      setLeadStage("chat");
      setLeadData({});
      setCalcData({});
      setScopingData({});
      const resetGreeting: GrcChatMessage[] = [
        {
          id: "greeting-" + Date.now(),
          type: "bot",
          content: ctx.greeting,
          timestamp: new Date(),
          actions: ctx.actions
        }
      ];
      setMessages(resetGreeting);
      try {
        sessionStorage.setItem("govenics_chat_messages", JSON.stringify(resetGreeting));
      } catch {}
    },
    handleSendMessage,
    handleAction
  };
};
