/**
 * ═════════════════════════════════════════════════════════════════════════════
 * GOVENICS GRC — SHEET 1: DATA COLLECTION, WEBHOOK & TALENT PIPELINE ENGINE
 * VERSION: V7.2 - ULTRA PRO ENTERPRISE EDITION (REFINED)
 * ═════════════════════════════════════════════════════════════════════════════
 * Target Spreadsheet: Sheet 1 (Raw Data Collection Sheet)
 * Spreadsheet ID: 1TxCoTbCSnPo6dCZyHoIb399x4P--ov677WgYDFUeErs
 *
 * Core Capabilities:
 *  1. Unified Webhook Ingestion (doPost) for all Govenics digital presences:
 *     - Strategy Session Bookings (Interactive Date, Time, Duration, Format)
 *     - Free Compliance Assessment / Inbound Leads
 *     - Schedule GRC Audit / Consultation Requests
 *     - Career Applications (with automated Google Drive resume archiving)
 *     - CDAC-MEPZ Course Enquiries, Partner Applications & Chatbot Leads
 *     - Traffic Analytics, Behavioral Metrics & Exit Feedback
 *  2. Drive Resume Archiving: Stored securely in Google Drive with public share links.
 *  3. Instant Executive HTML Alerts with meeting pills, resume attachments & quick actions.
 *  4. Branded User Confirmation Auto-Responders for all form types.
 *  5. Monthly Career Applications & Resume Forwarder (Runs 1st of month at 9:00 AM IST).
 *  6. In-Sheet Reporting Tables (Daily_Reports, Weekly_Reports, Monthly_Reports, Database_Summary).
 * ═════════════════════════════════════════════════════════════════════════════
 */

// ═════════════════════════════════════════════════════════════════════════════
// 1. GLOBAL CONFIGURATION & RECIPIENT LISTS
// ═════════════════════════════════════════════════════════════════════════════

var CONFIG = {
  // ── IMPORTANT: HOW TO CONNECT YOUR SPREADSHEET ──
  // Option A (Recommended): If you opened Apps Script from your Google Sheet (Extensions > Apps Script),
  // this script AUTO-BINDS to your sheet! Leave this ID or paste your Sheet ID below.
  // Option B: If this is a standalone script, paste YOUR Google Spreadsheet ID from your browser URL:
  // (e.g. from https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit)
  DATA_SPREADSHEET_ID: "1TxCoTbCSnPo6dCZyHoIb399x4P--ov677WgYDFUeErs",

  // Sheet 2: Executive Analytics Spreadsheet ID (Optional)
  ANALYTICS_SPREADSHEET_ID: "1rx7MDWlPo8uex0wf3dEYyhmVJ2E8bJV9O4947qPj4b4",

  // Google Drive folder used to archive candidate resumes
  CAREER_RESUMES_FOLDER_NAME: "Govenics_Career_Resumes",

  // Brand Info
  BRAND_NAME: "Govenics GRC",
  WEBSITE_URL: "https://govenics.com"
};

var EMAIL_CONFIG = {
  name: "Govenics GRC Notification Engine",
  website: "https://govenics.com",
  replyTo: "poojasri.aram@gmail.com",

  // Inbound Business Leads, Consultations & Strategy Sessions
  salesEmails: [
    "bv@trustflow.in",
    "poojasri.aram@gmail.com"
  ],

  // Career Applications & Monthly Resume Digests
  careerEmails: [
    "bv@trustflow.in",
    "poojasri.aram@gmail.com"
  ],

  // Paid Ad & Campaign Lead Generation
  adCampaignEmails: [
    "bv@trustflow.in",
    "poojasri.aram@gmail.com"
  ],

  // Executive Analytics Reports
  reportEmails: [
    "bv@trustflow.in",
    "poojasri.aram@gmail.com"
  ]
};

// ═════════════════════════════════════════════════════════════════════════════
// 2. MASTER DATABASE SCHEMAS & COLUMN DEFINITIONS
// ═════════════════════════════════════════════════════════════════════════════

var TAB_CONFIGS = {
  // 1. Contact Form / Inbound Leads / Consultation Requests
  "Contact_Form": [
    "Lead Number", "Full Name", "Email", "Phone", "Company", "Industry", "Company Size",
    "Offerings", "Functional Areas", "Audit Scope", "Timeline", "Message", "Lead Source",
    "Source Page", "UTM Source", "UTM Medium", "UTM Campaign", "Status", "IP Location", "Timestamp"
  ],
  "Inbound_Leads": [
    "Lead Number", "Full Name", "Email", "Phone", "Company", "Designation", "Industry", "Company Size",
    "Requirement", "Advisory Scope", "Preferred Date", "Source Page", "Lead Source",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Jira Issue Key", "Jira Status", "Status", "IP Location", "IP Address", "Timestamp"
  ],
  "Consultation_Requests": [
    "Lead Number", "Full Name", "Email", "Phone", "Company", "Industry",
    "Company Size", "Offerings", "Functional Areas",
    "Audit Scope", "Timeline", "Message", "Lead Source",
    "UTM Source", "UTM Medium", "UTM Campaign",
    "Jira Issue Key", "Jira Status", "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 2. Education & Course Enquiries
  "Course_Enquiries": [
    "Lead Number", "Full Name", "Email", "Phone", "Organization", "Role",
    "Program / Course", "Experience Level", "Learning Goal", "Message",
    "Source Page", "Lead Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Jira Issue Key", "Jira Status", "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 3. User Behavior, Engagement & Traffic Telemetry
  "Behavior_Metrics": [
    "Session ID", "Visitor ID", "Page URL", "Category", "Metric Name", "Value",
    "Element Info", "Metadata", "IP Location", "IP Address", "Variant", "Timestamp"
  ],
  "User_Behaviour": [
    "Session ID", "Visitor ID", "Action", "Page Path", "Category", "Scroll Depth",
    "Time On Page (s)", "Interactions", "Device", "IP Location", "IP Address", "Timestamp"
  ],
  "Engagement_Metrics": [
    "Session ID", "Visitor ID", "Page Path", "Engagement Score", "Active Seconds",
    "Clicks Count", "Forms Touched", "Interest Areas", "IP Location", "IP Address", "Timestamp"
  ],
  "Traffic_Analytics": [
    "Session ID", "Visitor ID", "Page Path", "Page Title", "Referrer", "Traffic Source",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Organization", "IP Location", "IP Address", "Variant", "Timestamp"
  ],

  // 4. Strategy Sessions & Advisory
  "Strategy_Session_Bookings": [
    "Lead Number", "Booking Reference", "Full Name", "Business Email", "Company", "Job Title",
    "Phone", "Industry", "Area of Interest", "Business Objective", "Preferred Date",
    "Time Slot", "Time Zone", "Duration (min)", "Meeting Format", "Video Call Link", "Booking Status",
    "Source", "Lead Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Jira Issue Key", "Jira Status", "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 5. Careers & HR
  "Career_Applications": [
    "Timestamp", "Role", "Name", "Email", "Phone", "Experience",
    "Portfolio_URL", "Resume_Filename", "Resume_File_Link", "Drive_File_ID",
    "Cover_Note", "UTM Source", "UTM Medium", "UTM Campaign", "Status"
  ],

  // 6. Partners & Alliances
  "Partner_Applications": [
    "Lead Number", "Full Name", "Email", "Company", "Partnership Type", "Phone",
    "Location", "Coverage Scope", "Message", "Lead Source",
    "UTM Source", "UTM Medium", "UTM Campaign",
    "Jira Issue Key", "Jira Status", "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 7. Interactive Tools & Chatbot
  "Chatbot_Leads": [
    "Timestamp", "Name", "Email", "Phone", "Topic", "Discussion_Summary",
    "Lead Source", "UTM Source", "UTM Campaign", "IP Location", "Status"
  ],
  "Registered_Users": [
    "Timestamp", "Full Name", "Business Email", "Mobile Number", "User ID",
    "Company Name", "Official Website", "Country", "State / Region", "City",
    "Industry Sector", "Sub-Industry", "Company Size", "Registration Type",
    "Business Operations", "Terms Accepted", "Registration Status",
    "IP Address", "User Agent"
  ],
  "User_Logins": [
    "Timestamp", "Email", "Auth Provider", "Login Status", "IP Location", "IP Address", "User Agent"
  ],
  "Estimator_Calculations": [
    "Timestamp", "Company Size", "Frameworks Selected", "Cloud Scope", "Employee Count",
    "Estimated Cost (INR)", "Readiness Score (%)", "User Email", "Phone", "IP Location"
  ],
  "Exit_Intent_Feedback": [
    "Timestamp", "Feedback", "Page URL", "Time On Page (s)", "IP Location", "IP Address"
  ],

  // 8. Campaigns
  "Google_Ad_Leads": [
    "Lead Number", "Full Name", "Email", "Phone", "Company", "Ad Scope",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Jira Issue Key", "Jira Status", "IP Location", "IP Address", "Timestamp"
  ],
  "youtube_lead": [
    "Lead Number", "Name", "Email", "Phone", "Company", "Designation",
    "Requirement", "Page", "Page Name", "Lead Source", "UTM Source",
    "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content", "YouTube Campaign",
    "YouTube Video", "YouTube Channel ID", "Timestamp", "Lead Status",
    "Jira Issue Key", "Jira Status", "Jira URL"
  ],
  "linkedin_lead": [
    "Lead Number", "LinkedIn Lead ID", "Name", "First Name", "Last Name",
    "Email", "Phone", "Company", "Designation", "Job Title", "Requirement",
    "LinkedIn Form ID", "Campaign ID", "Campaign Name", "Creative ID",
    "Lead Source", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term",
    "UTM Content", "Page", "Timestamp", "Lead Status", "Jira Issue Key",
    "Jira Status", "Jira URL"
  ]
};

// Centralized source-to-sheet routing configuration
var LEAD_SHEETS = {
  youtube: "youtube_lead",
  linkedin: "linkedin_lead"
};

// Aliases mapping varied client submissions and tab names to canonical schemas
var SHEET_NAME_ALIASES = {
  // ── Contact Form & Consultations ──
  "contact_form": "Contact_Form",
  "contactform": "Contact_Form",
  "contact": "Contact_Form",
  "contactus": "Contact_Form",
  "contact_us": "Contact_Form",
  "consultation_requests": "Contact_Form",
  "consultationrequests": "Contact_Form",
  "consultation": "Contact_Form",
  "consultations": "Contact_Form",
  "schedule_audit": "Contact_Form",
  "grc_audit": "Contact_Form",
  "inbound_leads": "Contact_Form",
  "inboundleads": "Contact_Form",
  "leads": "Contact_Form",
  "lead_capture": "Contact_Form",
  "leadcapture": "Contact_Form",
  "quick_inquiry": "Contact_Form",
  "quickinquiry": "Contact_Form",
  "assessment": "Contact_Form",

  // ── Course Enquiries ──
  "course_enquiries": "Course_Enquiries",
  "courseenquiries": "Course_Enquiries",
  "course_enquires": "Course_Enquiries",
  "courseenquires": "Course_Enquiries",
  "course_enquiry": "Course_Enquiries",
  "courseenquiry": "Course_Enquiries",
  "course": "Course_Enquiries",
  "courses": "Course_Enquiries",
  "cdac": "Course_Enquiries",
  "academy": "Course_Enquiries",
  "training": "Course_Enquiries",

  // ── Behavior Metrics ──
  "behavior_metrics": "Behavior_Metrics",
  "behaviormetrics": "Behavior_Metrics",
  "behavior_matrics": "Behavior_Metrics",
  "behaviormatrics": "Behavior_Metrics",
  "behavioral_metrics": "Behavior_Metrics",
  "behavioralmetrics": "Behavior_Metrics",
  "behavior": "Behavior_Metrics",
  "metrics": "Behavior_Metrics",

  // ── User Behaviour ──
  "user_behaviour": "User_Behaviour",
  "userbehaviour": "User_Behaviour",
  "user_behavior": "User_Behaviour",
  "userbehavior": "User_Behaviour",

  // ── Engagement Metrics ──
  "engagement_metrics": "Engagement_Metrics",
  "engagementmetrics": "Engagement_Metrics",
  "engagement": "Engagement_Metrics",
  "user_engagement": "Engagement_Metrics",
  "userengagement": "Engagement_Metrics",

  // ── Traffic Analytics ──
  "traffic_analytics": "Traffic_Analytics",
  "trafficanalytics": "Traffic_Analytics",
  "traffic": "Traffic_Analytics",
  "page_views": "Traffic_Analytics",
  "pageviews": "Traffic_Analytics",

  // ── Strategy Sessions ──
  "strategy_session_bookings": "Strategy_Session_Bookings",
  "strategysessionbookings": "Strategy_Session_Bookings",
  "strategy_session": "Strategy_Session_Bookings",
  "strategysession": "Strategy_Session_Bookings",
  "strategy": "Strategy_Session_Bookings",
  "book_strategy_session": "Strategy_Session_Bookings",

  // ── Careers ──
  "career_applications": "Career_Applications",
  "careerapplications": "Career_Applications",
  "careers": "Career_Applications",
  "career": "Career_Applications",
  "jobs": "Career_Applications",

  // ── Partners ──
  "partner_applications": "Partner_Applications",
  "partnerapplications": "Partner_Applications",
  "partners": "Partner_Applications",
  "partner": "Partner_Applications",

  // ── Chatbot ──
  "chatbot_leads": "Chatbot_Leads",
  "chatbotleads": "Chatbot_Leads",
  "chatbot": "Chatbot_Leads",
  "chat": "Chatbot_Leads",

  // ── Exit Feedback ──
  "exit_intent_feedback": "Exit_Intent_Feedback",
  "exitintentfeedback": "Exit_Intent_Feedback",
  "exit_feedback": "Exit_Intent_Feedback",

  // ── Estimator ──
  "estimator_calculations": "Estimator_Calculations",
  "estimatorcalculations": "Estimator_Calculations",
  "estimator": "Estimator_Calculations",

  // ── Users & Logins ──
  "registered_users": "Registered_Users",
  "registeredusers": "Registered_Users",
  "register": "Registered_Users",
  "user_logins": "User_Logins",
  "userlogins": "User_Logins",

  // ── Campaigns ──
  "google_ad_leads": "Google_Ad_Leads",
  "googleadleads": "Google_Ad_Leads",
  "youtube_lead": "youtube_lead",
  "youtubelead": "youtube_lead",
  "linkedin_lead": "linkedin_lead",
  "linkedinlead": "linkedin_lead"
};

// ═════════════════════════════════════════════════════════════════════════════
// 3. MAIN WEBHOOK ENDPOINT (doPost & doGet)
// ═════════════════════════════════════════════════════════════════════════════

function doGet(e) {
  var ssInfo = { id: "Not connected", name: "Unknown", sheets: [] };
  try {
    var ss = getSpreadsheet();
    if (ss) {
      ssInfo.id = ss.getId();
      ssInfo.name = ss.getName();
      ssInfo.sheets = ss.getSheets().map(function(s) { return s.getName(); });
    }
  } catch(err) {
    ssInfo.error = err.toString();
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Govenics GRC Data Collection Engine (V8.0 Universal)",
    time: new Date().toISOString(),
    spreadsheet: ssInfo,
    supportedTables: Object.keys(TAB_CONFIGS),
    message: "Govenics webhook endpoint is live and accepting POST data."
  }, null, 2)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    console.warn("doPost received empty body. Initializing manual test payload...");
    e = {
      postData: {
        contents: JSON.stringify({
          sheetName: "Contact_Form",
          fields: {
            name: "Enterprise Test",
            email: "test@govenics.com",
            phone: "+91 98401 23456",
            company: "Govenics Test Lab",
            requirement: "ISO 27001 Gap Audit"
          }
        })
      }
    };
  }

  try {
    var ss = getSpreadsheet(); // Ensure spreadsheet instance is initialized

    var body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch(err) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Invalid JSON payload: " + err.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var fields = body.fields || body;
    var rawSheetName = body.sheetName || body.table || body.type || "";
    var normName = normalizeTabName(rawSheetName);
    var canonicalName = SHEET_NAME_ALIASES[normName] || rawSheetName || "Contact_Form";

    // Strictly preserve Career Applications (File archive & Drive integration)
    if (canonicalName === "Career_Applications") {
      handleCareerApplication(ss, body);
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        sheet: "Career_Applications",
        message: "Career Application Processed & Resume Archived"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Lead Source Detection Priority
    var explicitSource = (fields.lead_source || fields.leadSource || fields["Lead Source"] || body.leadSource || body.lead_source || "").toLowerCase().trim();
    var utmSource = (fields.utm_source || fields.utmSource || fields["UTM Source"] || body.utmSource || "").toLowerCase().trim();
    var referrer = (fields.referrer || body.referrer || "").toLowerCase().trim();
    var ytCampaign = fields.youtube_campaign || fields.youtubeCampaign || fields["YouTube Campaign"] || "";
    var liCampaign = fields.linkedin_campaign || fields.linkedinCampaign || fields["LinkedIn Campaign"] || "";
    var pageUrl = (fields.page_url || fields.pageUrl || fields.page || fields["Page"] || body.pageUrl || "").toLowerCase();

    var isYouTube = explicitSource.includes("youtube") || explicitSource.includes("youtu.be") ||
                    utmSource.includes("youtube") || utmSource === "yt" ||
                    referrer.includes("youtube.com") || referrer.includes("youtu.be") ||
                    ytCampaign !== "" || pageUrl.includes("utm_source=youtube");

    var isLinkedIn = explicitSource.includes("linkedin") ||
                     utmSource.includes("linkedin") || utmSource === "li" ||
                     referrer.includes("linkedin.com") || referrer.includes("lnkd.in") ||
                     liCampaign !== "" || pageUrl.includes("utm_source=linkedin");

    var leadPrefix = "GOV-";
    var detectedSource = fields["Lead Source"] || fields.leadSource || "Website Form";

    // Protected tables that must NEVER be overwritten by ad/social lead routing
    var isSpecificTable = (
      canonicalName === "Contact_Form" ||
      canonicalName === "Inbound_Leads" ||
      canonicalName === "Consultation_Requests" ||
      canonicalName === "Course_Enquiries" ||
      canonicalName === "Behavior_Metrics" ||
      canonicalName === "User_Behaviour" ||
      canonicalName === "Engagement_Metrics" ||
      canonicalName === "Traffic_Analytics" ||
      canonicalName === "Strategy_Session_Bookings" ||
      canonicalName === "Chatbot_Leads" ||
      canonicalName === "Registered_Users" ||
      canonicalName === "User_Logins" ||
      canonicalName === "Estimator_Calculations" ||
      canonicalName === "Exit_Intent_Feedback" ||
      canonicalName === "Partner_Applications"
    );

    if (canonicalName === "Strategy_Session_Bookings") {
      leadPrefix = "GOV-SS-";
      detectedSource = "Book a Strategy Session";
    } else if (canonicalName === "Contact_Form") {
      leadPrefix = "GOV-CF-";
      detectedSource = fields["Lead Source"] || "Contact Form";
    } else if (canonicalName === "Course_Enquiries") {
      leadPrefix = "GOV-CE-";
      detectedSource = fields["Lead Source"] || "Course Enquiry";
    } else if (isYouTube && !isSpecificTable) {
      canonicalName = LEAD_SHEETS.youtube;
      detectedSource = "YouTube";
      fields["Lead Source"] = "YouTube";
      fields.leadSource = "YouTube";
      leadPrefix = "GOV-YT-";
    } else if (isLinkedIn && !isSpecificTable) {
      canonicalName = LEAD_SHEETS.linkedin;
      detectedSource = "LinkedIn";
      fields["Lead Source"] = "LinkedIn";
      fields.leadSource = "LinkedIn";
      leadPrefix = "GOV-LI-";
    }

    // Get existing sheet or create new sheet with fallback headers
    var sheet = getOrCreateSheet(ss, canonicalName, TAB_CONFIGS[canonicalName]);

    // Ensure unique server-side Lead Number
    var leadNo = fields["Lead Number"] || fields.leadNumber || fields.lead_number || body.leadNumber || body.lead_number;
    if (!leadNo) {
      if (fields["Booking Reference"]) {
        leadNo = fields["Booking Reference"];
      } else {
        var nextRow = Math.max(sheet.getLastRow(), 1);
        var paddedNum = ("000000" + nextRow).slice(-6);
        leadNo = leadPrefix + paddedNum;
      }
      fields["Lead Number"] = leadNo;
      fields.leadNumber = leadNo;
    }

    // Auto-generate video meeting link if not provided
    if (canonicalName === "Strategy_Session_Bookings") {
      var existingLink = fields["Video Call Link"] || fields.videoCallLink || fields.meetingLink;
      if (!existingLink) {
        var meetCode = "gov-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 5);
        var videoLink = "https://meet.google.com/" + meetCode;
        fields["Video Call Link"] = videoLink;
        fields.videoCallLink = videoLink;
      }
    }

    // Map additional parameters for youtube_lead / linkedin_lead
    if (canonicalName === LEAD_SHEETS.youtube) {
      if (!fields["YouTube Campaign"] && (fields.utm_campaign || fields.utmCampaign)) {
        fields["YouTube Campaign"] = fields.utm_campaign || fields.utmCampaign;
      }
      if (!fields["YouTube Video / Content"] && (fields.utm_content || fields.utmContent)) {
        fields["YouTube Video / Content"] = fields.utm_content || fields.utmContent;
      }
    } else if (canonicalName === LEAD_SHEETS.linkedin) {
      if (!fields["LinkedIn Campaign"] && (fields.utm_campaign || fields.utmCampaign)) {
        fields["LinkedIn Campaign"] = fields.utm_campaign || fields.utmCampaign;
      }
      if (!fields["LinkedIn Form / Campaign ID"] && (fields.linkedin_form || fields.utm_term || fields.utmTerm)) {
        fields["LinkedIn Form / Campaign ID"] = fields.linkedin_form || fields.utm_term || fields.utmTerm;
      }
    }

    // Append row with automatic column and header synchronization
    var row = syncHeadersAndBuildRow(sheet, fields, TAB_CONFIGS[canonicalName]);
    sheet.appendRow(row);

    // Send real-time email notification (Safe try/catch)
    var isTelemetryOnly = (
      canonicalName === "Traffic_Analytics" ||
      canonicalName === "Behavior_Metrics" ||
      canonicalName === "User_Behaviour" ||
      canonicalName === "Engagement_Metrics" ||
      canonicalName === "Exit_Intent_Feedback"
    );

    if (!isTelemetryOnly) {
      try {
        sendLeadNotification(fields, sheet.getName());
      } catch(mailErr) {
        console.warn("Lead notification email warning: " + mailErr.toString());
      }
      try {
        sendUserConfirmationEmail(fields, sheet.getName());
      } catch(confErr) {
        console.warn("User confirmation email warning: " + confErr.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      leadNumber: leadNo,
      sheet: sheet.getName(),
      canonical: canonicalName,
      leadSource: detectedSource,
      rowNumber: sheet.getLastRow(),
      message: "Record successfully appended to tab '" + sheet.getName() + "'"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch(globalErr) {
    console.error("doPost critical error: " + globalErr.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: globalErr.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 4. CAREER RESUME DECODER & GOOGLE DRIVE ARCHIVER
// ═════════════════════════════════════════════════════════════════════════════

function handleCareerApplication(ss, body) {
  var sheet = getOrCreateSheet(ss, "Career_Applications", TAB_CONFIGS["Career_Applications"]);
  var f = body.fields || body;

  var candidateName = f.name || f.Name || f.fullName || f["Full Name"] || "Candidate";
  var filename = f.resumeFilename || f.filename || f.fileName || (candidateName.replace(/[^a-zA-Z0-9_\s]/g, '').trim().replace(/\s+/g, '_') + "_Resume.pdf");
  var resumeData = f.resumeData || f.resume || f.resumeBlob || f.resumeBase64 || f.fileBlob;
  var mime = f.resumeMimeType || f.mimeType || "application/pdf";

  var driveResult = null;
  var attachments = [];

  // Decode base64 and archive to Drive
  if (resumeData && typeof resumeData === "string") {
    driveResult = saveResumeToDrive(resumeData, filename, mime);
    if (driveResult && driveResult.blob) {
      attachments.push(driveResult.blob);
    }
  }

  var driveLink = driveResult ? driveResult.url : (f.resumeUrl || f.resume_file_link || f.portfolio || "N/A");
  var driveId = driveResult ? driveResult.id : "N/A";

  var row = [
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    f.role || f.Role || f.jobTitle || f.position || "GRC Consultant",
    candidateName,
    f.email || f.Email || "N/A",
    f.phone || f.Phone || "N/A",
    f.experience || f.Experience || "N/A",
    f.portfolio || f.Portfolio || f.portfolioUrl || "N/A",
    filename,
    driveLink,
    driveId,
    f.coverNote || f.message || f.coverLetter || "N/A",
    f.utmSource || f.utm_source || "Website Direct",
    f.utmMedium || f.utm_medium || "",
    f.utmCampaign || f.utm_campaign || "",
    "New Application"
  ];
  sheet.appendRow(row);

  // Send real-time HR notification with attached resume file
  try {
    sendCareerEmailWithResume(f, attachments, driveLink);
    sendUserConfirmationEmail(f, "Career_Applications");
  } catch(err) {
    console.error("Career email dispatch error: " + err.toString());
  }
}

function saveResumeToDrive(base64Data, filename, mimeType) {
  try {
    var folderName = CONFIG.CAREER_RESUMES_FOLDER_NAME || "Govenics_Career_Resumes";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    var cleanBase64 = base64Data;
    if (cleanBase64.indexOf("base64,") > -1) {
      cleanBase64 = cleanBase64.split("base64,")[1];
    } else if (cleanBase64.indexOf("data:") === 0 && cleanBase64.indexOf(",") > -1) {
      cleanBase64 = cleanBase64.split(",")[1];
    }
    cleanBase64 = cleanBase64.replace(/[\r\n\s"']/g, "");
    cleanBase64 = cleanBase64.replace(/-/g, "+").replace(/_/g, "/");
    while (cleanBase64.length % 4 !== 0) { cleanBase64 += "="; }

    var decodedBytes = Utilities.base64Decode(cleanBase64);
    var mime = mimeType || "application/pdf";
    var blob = Utilities.newBlob(decodedBytes, mime, filename);
    var file = folder.createFile(blob);

    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch(shareErr) {}

    return {
      url: file.getUrl(),
      id: file.getId(),
      blob: blob
    };
  } catch(e) {
    console.error("Failed to archive resume to Drive: " + e.toString());
    try {
      var fallbackBlob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType || "application/pdf", filename);
      return { url: "N/A", id: "N/A", blob: fallbackBlob };
    } catch(err2) {
      return null;
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 5. EXECUTIVE EMAIL DISPATCHER (LEADS, STRATEGY SESSIONS & CAREERS)
// ═════════════════════════════════════════════════════════════════════════════

function sendCareerEmailWithResume(data, attachments, driveLink) {
  var candidateName = data.name || data.Name || data.fullName || "Candidate";
  var role = data.role || data.Role || data.jobTitle || "GRC Position";
  var email = data.email || data.Email || "";
  var phone = data.phone || data.Phone || "";
  var exp = data.experience || data.Experience || "N/A";
  var coverNote = data.coverNote || data.message || data.coverLetter || "N/A";
  var filename = data.resumeFilename || data.filename || (candidateName + "_Resume.pdf");

  var subject = "💼 [Career Application] " + candidateName + " — " + role;
  var sheetUrl = "https://docs.google.com/spreadsheets/d/" + CONFIG.DATA_SPREADSHEET_ID;
  var hasDrive = driveLink && driveLink.indexOf("http") === 0;

  var recipients = uniqueEmails(EMAIL_CONFIG.careerEmails);

  var html = [
    '<!DOCTYPE html><html><body style="font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;padding:24px;margin:0;">',
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 25px rgba(0,0,0,0.06);">',
    '  <div style="background:linear-gradient(135deg,#064e3b 0%,#047857 50%,#0f766e 100%);padding:28px 24px;color:#ffffff;text-align:center;">',
    '    <span style="background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Govenics Talent Acquisition</span>',
    '    <h2 style="margin:10px 0 0 0;font-size:22px;">New Candidate: ' + candidateName + '</h2>',
    '    <p style="margin:4px 0 0 0;color:#d1fae5;font-size:14px;">Applied for <strong>' + role + '</strong> via ' + CONFIG.WEBSITE_URL + '/careers</p>',
    '  </div>',
    '  <div style="padding:24px;">',
    '    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">',
    '      <tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;width:35%;">Role Applied</td><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:700;color:#047857;">' + role + '</td></tr>',
    '      <tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Candidate Name</td><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a;">' + candidateName + '</td></tr>',
    '      <tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Email Address</td><td style="padding:10px;border-bottom:1px solid #f1f5f9;"><a href="mailto:' + email + '" style="color:#2563eb;text-decoration:none;">' + email + '</a></td></tr>',
    '      <tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Phone Number</td><td style="padding:10px;border-bottom:1px solid #f1f5f9;color:#0f172a;">' + phone + '</td></tr>',
    '      <tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Experience</td><td style="padding:10px;border-bottom:1px solid #f1f5f9;color:#0f172a;">' + exp + '</td></tr>',
    '      <tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Resume Document</td><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#047857;">📎 ' + filename + ' (Attached)</td></tr>',
    hasDrive ? '      <tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Google Drive Link</td><td style="padding:10px;border-bottom:1px solid #f1f5f9;"><a href="' + driveLink + '" target="_blank" style="color:#047857;font-weight:700;text-decoration:underline;">Open in Drive ↗</a></td></tr>' : '',
    '      <tr><td style="padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Cover Note</td><td style="padding:10px;border-bottom:1px solid #f1f5f9;color:#334155;font-style:italic;">' + coverNote + '</td></tr>',
    '    </table>',
    '    <div style="text-align:center;margin-top:24px;">',
    '      <a href="' + sheetUrl + '" style="background:#047857;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;margin:4px;">📊 Open HR Database (Sheet 1)</a>',
    '      <a href="mailto:' + email + '?subject=Govenics Interview: ' + encodeURIComponent(role) + '" style="background:#0f172a;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;margin:4px;">✉️ Reply to Candidate</a>',
    '    </div>',
    '  </div>',
    '  <div style="background:#f1f5f9;padding:14px;text-align:center;color:#64748b;font-size:11px;">Govenics Talent Acquisition Engine • Delivered to: ' + recipients.join(", ") + '</div>',
    '</div></body></html>'
  ].join("\n");

  MailApp.sendEmail({
    to: recipients.join(","),
    subject: subject,
    htmlBody: html,
    name: "Govenics HR & Careers",
    replyTo: email || EMAIL_CONFIG.replyTo,
    attachments: attachments || []
  });
}

function sendLeadNotification(data, tableName) {
  var isStrategy = (tableName === "Strategy_Session_Bookings");
  var isRegistered = (tableName === "Registered_Users");
  var formattedName = tableName.replace(/_/g, ' ');

  var userEmail = data.email || data.Email || data.workEmail || data["Business Email"] || data.businessEmail || "";
  var userName = data.name || data.Name || data.fullName || data["Full Name"] || "Prospective Client";
  var phone = data.phone || data.Phone || data.mobile || data["Mobile Number"] || "";
  var company = data.company || data.Company || data.organization || data["Company Name"] || "";

  var subject = isStrategy
    ? ("📅 [Strategy Session Booked] " + userName + (company ? (" (" + company + ")") : "") + " — " + (data["Preferred Date"] || data.preferredDate || "") + " @ " + (data["Time Slot"] || data.timeSlot || ""))
    : isRegistered
    ? ("🏢 [Enterprise Registration] " + userName + (company ? (" (" + company + ")") : "") + " — ID: " + (data["User ID"] || data.userId || "New Account"))
    : ("🚀 New Govenics Submission: [" + formattedName + "] — " + userName + (company ? (" (" + company + ")") : ""));

  var recipients = (tableName === "Google_Ad_Leads") 
    ? uniqueEmails(EMAIL_CONFIG.adCampaignEmails) 
    : uniqueEmails(EMAIL_CONFIG.salesEmails);

  var videoLink = data["Video Call Link"] || data.videoCallLink || data.meetingLink || "";
  var strategyHighlightHtml = "";
  if (isStrategy) {
    strategyHighlightHtml = [
      '<div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:10px;padding:16px;margin-bottom:20px;">',
      '  <div style="font-size:11px;font-weight:800;color:#4f46e5;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">⚡ Scheduled Advisory Session</div>',
      '  <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">',
      '    <div><span style="font-size:12px;color:#64748b;">Date & Slot:</span> <strong style="color:#1e1b4b;font-size:14px;">' + (data["Preferred Date"] || data.preferredDate || "TBD") + ' (' + (data["Time Slot"] || data.timeSlot || "TBD") + ')</strong></div>',
      '    <div><span style="font-size:12px;color:#64748b;">Duration:</span> <strong style="color:#1e1b4b;font-size:14px;">' + (data["Duration (min)"] || data.duration || "30") + ' Mins</strong></div>',
      '    <div><span style="font-size:12px;color:#64748b;">Format:</span> <strong style="color:#1e1b4b;font-size:14px;">' + (data["Meeting Format"] || data.meetingFormat || "Video Meeting") + '</strong></div>',
      '  </div>',
      videoLink ? ('  <div style="margin-top:10px;padding:8px 12px;background:#ffffff;border:1px solid #c7d2fe;border-radius:6px;font-size:12px;"><span style="color:#64748b;">Video Meeting Room:</span> <a href="' + videoLink + '" target="_blank" style="color:#4f46e5;font-weight:700;">' + videoLink + '</a></div>') : '',
      data["Booking Reference"] ? ('  <div style="margin-top:8px;font-size:12px;color:#4f46e5;">Ref ID: <strong>' + data["Booking Reference"] + '</strong></div>') : '',
      '</div>'
    ].join("\n");
  }

  var rowsHtml = Object.keys(data).map(function(k) {
    if (k === "table" || k === "sheetName" || k === "resumeData" || k === "resumeBlob" || typeof data[k] === "object") return "";
    var prettyKey = k.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^./, function(s){ return s.toUpperCase(); }).trim();
    return '<tr><td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;width:35%;">' + prettyKey + '</td><td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;color:#0f172a;font-weight:500;">' + data[k] + '</td></tr>';
  }).join("");

  var sheetUrl = "https://docs.google.com/spreadsheets/d/" + CONFIG.DATA_SPREADSHEET_ID;

  var html = [
    '<!DOCTYPE html><html><body style="font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;padding:24px;margin:0;">',
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 25px rgba(0,0,0,0.06);">',
    '  <div style="background:' + (isStrategy ? 'linear-gradient(135deg,#312e81 0%,#4338ca 50%,#2563eb 100%)' : 'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#334155 100%)') + ';padding:28px 24px;color:#ffffff;text-align:center;">',
    '    <span style="background:rgba(255,255,255,0.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">' + (isStrategy ? 'Priority Strategy Consultation' : 'Enterprise GRC Telemetry') + '</span>',
    '    <h2 style="margin:10px 0 0 0;font-size:22px;">' + formattedName + '</h2>',
    '    <p style="margin:4px 0 0 0;color:#c7d2fe;font-size:14px;">Instant submission captured from ' + CONFIG.WEBSITE_URL + '</p>',
    '  </div>',
    '  <div style="padding:24px;">',
    strategyHighlightHtml,
    '    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">',
    rowsHtml,
    '    </table>',
    '    <div style="text-align:center;margin-top:24px;">',
    phone ? '      <a href="tel:' + phone + '" style="background:#0f172a;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;margin:4px;">📞 Call ' + phone + '</a>' : '',
    userEmail ? '      <a href="mailto:' + userEmail + '?subject=Re: Govenics ' + encodeURIComponent(formattedName) + '" style="background:#2563eb;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;margin:4px;">✉️ Reply via Email</a>' : '',
    '      <a href="' + sheetUrl + '" style="background:#475569;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;margin:4px;">📊 Open Master Sheet</a>',
    '    </div>',
    '  </div>',
    '  <div style="background:#f1f5f9;padding:14px;text-align:center;color:#64748b;font-size:11px;">Govenics Lead Engine • Delivered to: ' + recipients.join(", ") + '</div>',
    '</div></body></html>'
  ].join("\n");

  MailApp.sendEmail({
    to: recipients.join(","),
    subject: subject,
    htmlBody: html,
    name: "Govenics Lead Engine",
    replyTo: userEmail || EMAIL_CONFIG.replyTo
  });
}

function sendUserConfirmationEmail(data, tableName) {
  var userEmail = data.email || data.Email || data.workEmail || data["Business Email"] || data.businessEmail;
  if (!userEmail || userEmail.indexOf("@") === -1) return;

  var isStrategy = (tableName === "Strategy_Session_Bookings");
  var isRegistered = (tableName === "Registered_Users");
  var userName = data.name || data.Name || data.fullName || data["Full Name"] || "Valued Professional";
  var formattedName = tableName.replace(/_/g, ' ');

  var subject = isStrategy
    ? ("Your GOVENICS Strategy Session Request — Confirmed [" + (data["Booking Reference"] || "Pending") + "]")
    : isRegistered
    ? ("Welcome to GOVENICS — Enterprise Account & Compliance Portal Registered")
    : ("Thank you for connecting with Govenics GRC");

  var videoLink = data["Video Call Link"] || data.videoCallLink || data.meetingLink || "";

  var detailSection = isStrategy ? [
    '    <div style="background:#f8fafc;border-left:4px solid #2563eb;padding:16px;margin:18px 0;border-radius:8px;font-size:13px;color:#334155;">',
    '      <p style="margin:0 0 10px 0;font-weight:700;color:#1e293b;text-transform:uppercase;font-size:11px;letter-spacing:1px;">🗓 Session & Video Call Details</p>',
    '      <table style="width:100%;font-size:13px;border-collapse:collapse;">',
    '        <tr><td style="color:#64748b;padding:4px 0;width:35%;">Booking Ref:</td><td><strong style="color:#2563eb;">' + (data["Booking Reference"] || "Assigned on schedule") + '</strong></td></tr>',
    '        <tr><td style="color:#64748b;padding:4px 0;">Date:</td><td><strong>' + (data["Preferred Date"] || data.preferredDate || "Confirmed on dispatch") + '</strong></td></tr>',
    '        <tr><td style="color:#64748b;padding:4px 0;">Time Slot:</td><td><strong>' + (data["Time Slot"] || data.timeSlot || "TBD") + ' (IST)</strong></td></tr>',
    '        <tr><td style="color:#64748b;padding:4px 0;">Duration:</td><td><strong>' + (data["Duration (min)"] || data.duration || "30") + ' Minutes</strong></td></tr>',
    '        <tr><td style="color:#64748b;padding:4px 0;">Format:</td><td><strong>' + (data["Meeting Format"] || data.meetingFormat || "Video Meeting") + '</strong></td></tr>',
    videoLink ? ('        <tr><td style="color:#64748b;padding:4px 0;">Video Call Link:</td><td><a href="' + videoLink + '" target="_blank" style="color:#2563eb;font-weight:700;text-decoration:underline;">' + videoLink + '</a></td></tr>') : '',
    '      </table>',
    videoLink ? [
      '      <div style="margin-top:14px;padding-top:14px;border-top:1px dashed #cbd5e1;text-align:center;">',
      '        <a href="' + videoLink + '" target="_blank" style="background:#2563eb;color:#ffffff;padding:10px 24px;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;">📹 Join Video Meeting</a>',
      '      </div>'
    ].join("\n") : '',
    '    </div>'
  ].join("\n") : (isRegistered ? [
    '    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin:18px 0;font-size:13px;color:#166534;">',
    '      <div style="font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;color:#15803d;">🛡 Account & Organization Profile</div>',
    '      <table style="width:100%;font-size:13px;border-collapse:collapse;">',
    '        <tr><td style="color:#166534;padding:4px 0;width:35%;">User ID:</td><td><strong>' + (data["User ID"] || data.userId || "Active") + '</strong></td></tr>',
    '        <tr><td style="color:#166534;padding:4px 0;">Company:</td><td><strong>' + (data["Company Name"] || data.company || "Your Enterprise") + '</strong></td></tr>',
    '        <tr><td style="color:#166534;padding:4px 0;">Industry:</td><td><strong>' + (data["Industry Sector"] || data.industry || "General Industry") + '</strong></td></tr>',
    '        <tr><td style="color:#166534;padding:4px 0;">Account Status:</td><td><span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:4px;font-weight:700;">' + (data["Registration Status"] || "Active") + '</span></td></tr>',
    '      </table>',
    '    </div>'
  ].join("\n") : '');

  var html = [
    '<!DOCTYPE html><html><body style="font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;padding:24px;margin:0;">',
    '<div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 6px 18px rgba(0,0,0,0.05);">',
    '  <div style="background:#0f172a;padding:28px;color:#ffffff;text-align:center;">',
    '    <h2 style="margin:0;font-size:22px;letter-spacing:-0.5px;">Govenics GRC & CDAC-MEPZ</h2>',
    '    <p style="margin:6px 0 0 0;color:#94a3b8;font-size:14px;">Enterprise Governance, Risk & Compliance Advisory</p>',
    '  </div>',
    '  <div style="padding:28px;color:#334155;line-height:1.6;font-size:15px;">',
    '    <p>Dear <strong>' + userName + '</strong>,</p>',
    isStrategy
      ? '<p>Thank you for booking an Advisory Strategy Session with <strong>GOVENICS</strong>. Our senior compliance & risk partners have received your booking and your dedicated video meeting session has been reserved.</p>'
      : isRegistered
      ? ('<p>Welcome to <strong>GOVENICS</strong>! Your enterprise compliance registration has been successfully verified and saved. You now have access to intelligent statutory compliance roadmaps, compliance checklists, and ISO/DPDP/SOC 2 governance engines.</p>')
      : ('<p>Thank you for submitting your details regarding <strong>' + formattedName + '</strong>. Our compliance & advisory team has received your information and is reviewing your requirements.</p>'),
    detailSection,
    isStrategy
      ? '<p>Please add this meeting to your calendar. If you require rescheduling or have any advance briefing materials, simply reply directly to this email.</p>'
      : isRegistered
      ? '<p>You can sign in to your GOVENICS dashboard anytime to update your company profile, track regulatory deadlines, and export your compliance checklists.</p>'
      : '<p>A Senior GRC Specialist will connect with you with calendar credentials within 1 business day.</p>',
    '    <div style="background:#f8fafc;border-left:4px solid #2563eb;padding:14px;margin:20px 0;border-radius:6px;font-size:13px;color:#475569;">',
    '      <strong>Explore more:</strong> Visit <a href="' + CONFIG.WEBSITE_URL + '" style="color:#2563eb;font-weight:600;">govenics.com</a> to explore certified CDAC-MEPZ programs, statutory compliance registers, and instant security calculators.',
    '    </div>',
    '    <p>Best regards,<br><strong>Govenics Executive Advisory Team</strong><br><span style="color:#64748b;font-size:13px;">' + EMAIL_CONFIG.replyTo + '</span></p>',
    '  </div>',
    '  <div style="background:#f1f5f9;padding:14px;text-align:center;color:#94a3b8;font-size:11px;">&copy; ' + new Date().getFullYear() + ' Govenics. All rights reserved.</div>',
    '</div></body></html>'
  ].join("\n");

  MailApp.sendEmail({
    to: userEmail,
    subject: subject,
    htmlBody: html,
    name: "Govenics GRC Advisory",
    replyTo: EMAIL_CONFIG.replyTo
  });
}

// ═════════════════════════════════════════════════════════════════════════════
// 6. MONTHLY CAREER APPLICATIONS & RESUME FORWARDER ENGINE
// ═════════════════════════════════════════════════════════════════════════════

function forwardMonthlyCareerApplications() {
  console.log("🚀 Starting Monthly Career Applications & Resume Forwarder...");
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Career_Applications");
  if (!sheet || sheet.getLastRow() < 2) {
    console.log("No career applications found for monthly digest.");
    return;
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var roleIdx  = headers.indexOf("Role");
  var nameIdx  = headers.indexOf("Name");
  var emailIdx = headers.indexOf("Email");
  var phoneIdx = headers.indexOf("Phone");
  var expIdx   = headers.indexOf("Experience");
  var fileIdx  = headers.indexOf("Resume_Filename");
  var linkIdx  = headers.indexOf("Resume_File_Link");
  var idIdx    = headers.indexOf("Drive_File_ID");

  var now = new Date();
  var thirtyDaysAgo = new Date(now.getTime() - (31 * 24 * 60 * 60 * 1000));
  var candidates = [];
  var attachments = [];
  var totalAttachmentSize = 0;
  var MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024; // 20 MB safe limit

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var ts = new Date(row[0]);
    if (isNaN(ts.getTime()) || ts >= thirtyDaysAgo) {
      var candidate = {
        timestamp: row[0] || "Recent",
        role: row[roleIdx] || "GRC Consultant",
        name: row[nameIdx] || "Candidate",
        email: row[emailIdx] || "",
        phone: row[phoneIdx] || "",
        experience: row[expIdx] || "N/A",
        filename: row[fileIdx] || "Resume.pdf",
        driveLink: linkIdx > -1 ? row[linkIdx] : "",
        driveId: idIdx > -1 ? row[idIdx] : ""
      };

      if (candidate.driveId && candidate.driveId !== "N/A") {
        try {
          var file = DriveApp.getFileById(candidate.driveId);
          var blob = file.getBlob();
          var size = blob.getBytes().length;
          if (totalAttachmentSize + size < MAX_ATTACHMENT_BYTES) {
            blob.setName(candidate.name.replace(/[^a-zA-Z0-9_\s]/g, '') + "_" + candidate.filename);
            attachments.push(blob);
            totalAttachmentSize += size;
          }
        } catch(e) {
          console.warn("Could not attach Drive file: " + candidate.driveId);
        }
      }

      candidates.push(candidate);
    }
  }

  if (candidates.length === 0) {
    console.log("No candidates recorded in the last 30 days.");
    return;
  }

  var monthStr = Utilities.formatDate(now, "Asia/Kolkata", "MMMM yyyy");
  var subject = "📋 [Monthly Talent Digest] " + candidates.length + " Resumes Collected — " + monthStr;
  var sheetUrl = "https://docs.google.com/spreadsheets/d/" + CONFIG.DATA_SPREADSHEET_ID;
  var recipients = uniqueEmails(EMAIL_CONFIG.careerEmails);

  var candidateRowsHtml = candidates.map(function(c) {
    var resumeDisplay = (c.driveLink && c.driveLink.indexOf("http") === 0)
      ? '<a href="' + c.driveLink + '" target="_blank" style="color:#047857;font-weight:700;text-decoration:underline;">View Resume in Drive</a>'
      : '<span style="color:#94a3b8;">Attached to Email</span>';

    return '<tr style="border-bottom:1px solid #e2e8f0;">' +
           '<td style="padding:10px 12px;font-weight:700;color:#0f172a;">' + c.name + '</td>' +
           '<td style="padding:10px 12px;color:#047857;font-weight:600;">' + c.role + '</td>' +
           '<td style="padding:10px 12px;color:#475569;">' + c.experience + '</td>' +
           '<td style="padding:10px 12px;"><a href="mailto:' + c.email + '" style="color:#2563eb;text-decoration:none;">' + c.email + '</a><br/><span style="color:#64748b;font-size:12px;">' + c.phone + '</span></td>' +
           '<td style="padding:10px 12px;text-align:center;">' + resumeDisplay + '</td>' +
           '</tr>';
  }).join("");

  var html = [
    '<!DOCTYPE html><html><body style="font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;padding:24px;margin:0;">',
    '<div style="max-width:760px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 25px rgba(0,0,0,0.06);">',
    '  <div style="background:linear-gradient(135deg,#064e3b 0%,#047857 50%,#0f766e 100%);padding:30px 24px;color:#ffffff;text-align:center;">',
    '    <span style="background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Monthly HR Intelligence</span>',
    '    <h2 style="margin:10px 0 0 0;font-size:24px;">Govenics Talent Acquisition Digest</h2>',
    '    <p style="margin:4px 0 0 0;color:#d1fae5;font-size:14px;">Consolidated candidate applications for <strong>' + monthStr + '</strong> (' + candidates.length + ' Total Applicants)</p>',
    '  </div>',
    '  <div style="padding:24px;">',
    '    <p style="font-size:14px;color:#475569;margin-bottom:16px;">Candidate resume files are enclosed as attachments to this email and archived into Google Drive.</p>',
    '    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px;">',
    '      <tr style="background:#f1f5f9;color:#334155;font-weight:700;">',
    '        <th style="padding:10px 12px;text-align:left;">Candidate</th>',
    '        <th style="padding:10px 12px;text-align:left;">Role</th>',
    '        <th style="padding:10px 12px;text-align:left;">Experience</th>',
    '        <th style="padding:10px 12px;text-align:left;">Contact</th>',
    '        <th style="padding:10px 12px;text-align:center;">Resume</th>',
    '      </tr>',
    candidateRowsHtml,
    '    </table>',
    '    <div style="text-align:center;">',
    '      <a href="' + sheetUrl + '" style="background:#047857;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px;display:inline-block;">Open Govenics HR Sheet</a>',
    '    </div>',
    '  </div>',
    '  <div style="background:#f1f5f9;padding:14px;text-align:center;color:#64748b;font-size:11px;">Govenics Monthly Talent Consolidation • Recipients: ' + recipients.join(", ") + '</div>',
    '</div></body></html>'
  ].join("\n");

  MailApp.sendEmail({
    to: recipients.join(","),
    subject: subject,
    htmlBody: html,
    name: "Govenics HR Executive",
    attachments: attachments
  });

  console.log("✅ Monthly Career Digest successfully delivered to: " + recipients.join(", "));
}

// ═════════════════════════════════════════════════════════════════════════════
// 7. IN-SHEET 1 REPORT GENERATION (Daily, Weekly, Monthly & DB Summary)
// ═════════════════════════════════════════════════════════════════════════════

function GENERATE_ALL_SHEET1_REPORTS() {
  var ss = getSpreadsheet();
  try { generateDailyReportInSheet1(ss); } catch(e) { console.error("Daily report error: " + e.toString()); }
  try { generateWeeklyReportInSheet1(ss); } catch(e) { console.error("Weekly report error: " + e.toString()); }
  try { generateMonthlyReportInSheet1(ss); } catch(e) { console.error("Monthly report error: " + e.toString()); }
  try { generateDatabaseSummaryInSheet1(ss); } catch(e) { console.error("DB summary error: " + e.toString()); }

  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch(e) {}
  if (ui) ui.alert("✅ SUCCESS! Daily, Weekly, Monthly reports & Database Summary refreshed in Sheet 1.");
}

function generateDailyReportInSheet1(ss) {
  ss = ss || getSpreadsheet();
  var headers = ["Date", "Strategy Sessions", "Inbound Leads", "Course Enquiries", "Audit Consultations", "Partner Apps", "Career Apps", "Estimators", "Registrations", "Total Actions"];
  var sh = getOrCreateSheet(ss, "Daily_Reports", headers);
  sh.clearContents();

  var dailyMap = {};

  var aggregate = function(sheetName, prop) {
    try {
      var s = ss.getSheetByName(sheetName);
      if (s && s.getLastRow() > 1) {
        var d = s.getDataRange().getValues();
        var tsCol = findTimestampColumnIndex(d[0]);
        for (var r = 1; r < d.length; r++) {
          var rawDate = d[r][tsCol];
          var k = getSafeDayKey(rawDate);
          if (!dailyMap[k]) dailyMap[k] = { strategy: 0, leads: 0, courses: 0, audits: 0, partners: 0, careers: 0, estimators: 0, members: 0 };
          dailyMap[k][prop]++;
        }
      }
    } catch(err) {
      console.warn("Daily aggregate warning for " + sheetName + ": " + err.toString());
    }
  };

  aggregate("Strategy_Session_Bookings", "strategy");
  aggregate("Inbound_Leads", "leads");
  aggregate("Course_Enquiries", "courses");
  aggregate("Consultation_Requests", "audits");
  aggregate("Partner_Applications", "partners");
  aggregate("Career_Applications", "careers");
  aggregate("Estimator_Calculations", "estimators");
  aggregate("Registered_Users", "members");

  var dates = Object.keys(dailyMap).sort().reverse();
  var rows = [];
  dates.forEach(function(d) {
    var it = dailyMap[d];
    var tot = it.strategy + it.leads + it.courses + it.audits + it.partners + it.careers + it.estimators + it.members;
    rows.push([d, it.strategy, it.leads, it.courses, it.audits, it.partners, it.careers, it.estimators, it.members, tot]);
  });

  if (rows.length === 0) {
    rows = [[getSafeDayKey(new Date()), 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  }

  ensureSheetCapacity(sh, rows.length + 1, headers.length);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sh.setFrozenRows(1);
}

function generateWeeklyReportInSheet1(ss) {
  ss = ss || getSpreadsheet();
  var headers = ["Week Period", "Strategy Sessions", "Inbound Leads", "Course Enquiries", "Audit Consultations", "Partner Apps", "Career Apps", "Estimators", "Registrations", "Total Form Submissions"];
  var sh = getOrCreateSheet(ss, "Weekly_Reports", headers);
  sh.clearContents();

  var weekMap = {};

  var aggregateWeek = function(sheetName, prop) {
    try {
      var s = ss.getSheetByName(sheetName);
      if (s && s.getLastRow() > 1) {
        var d = s.getDataRange().getValues();
        var tsCol = findTimestampColumnIndex(d[0]);
        for (var r = 1; r < d.length; r++) {
          var rawDate = d[r][tsCol];
          var k = getSafeWeekKey(rawDate);
          if (!weekMap[k]) weekMap[k] = { strategy: 0, leads: 0, courses: 0, audits: 0, partners: 0, careers: 0, estimators: 0, members: 0 };
          weekMap[k][prop]++;
        }
      }
    } catch(err) {
      console.warn("Weekly aggregate warning for " + sheetName + ": " + err.toString());
    }
  };

  aggregateWeek("Strategy_Session_Bookings", "strategy");
  aggregateWeek("Inbound_Leads", "leads");
  aggregateWeek("Course_Enquiries", "courses");
  aggregateWeek("Consultation_Requests", "audits");
  aggregateWeek("Partner_Applications", "partners");
  aggregateWeek("Career_Applications", "careers");
  aggregateWeek("Estimator_Calculations", "estimators");
  aggregateWeek("Registered_Users", "members");

  var weeks = Object.keys(weekMap).sort().reverse();
  var rows = [];
  weeks.forEach(function(w) {
    var it = weekMap[w];
    var tot = it.strategy + it.leads + it.courses + it.audits + it.partners + it.careers + it.estimators + it.members;
    rows.push([w, it.strategy, it.leads, it.courses, it.audits, it.partners, it.careers, it.estimators, it.members, tot]);
  });

  if (rows.length === 0) {
    rows = [["Current Week (" + getSafeWeekKey(new Date()) + ")", 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  }

  ensureSheetCapacity(sh, rows.length + 1, headers.length);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sh.setFrozenRows(1);
}

function generateMonthlyReportInSheet1(ss) {
  ss = ss || getSpreadsheet();
  var headers = ["Month", "Strategy Sessions", "Inbound Leads", "Course Enquiries", "Audit Consultations", "Partner Apps", "Career Apps", "Estimators", "Registrations", "Total Form Submissions"];
  var sh = getOrCreateSheet(ss, "Monthly_Reports", headers);
  sh.clearContents();

  var monthMap = {};

  var aggregateMonth = function(sheetName, prop) {
    try {
      var s = ss.getSheetByName(sheetName);
      if (s && s.getLastRow() > 1) {
        var d = s.getDataRange().getValues();
        var tsCol = findTimestampColumnIndex(d[0]);
        for (var r = 1; r < d.length; r++) {
          var rawDate = d[r][tsCol];
          var k = getSafeMonthKey(rawDate);
          if (!monthMap[k]) monthMap[k] = { strategy: 0, leads: 0, courses: 0, audits: 0, partners: 0, careers: 0, estimators: 0, members: 0 };
          monthMap[k][prop]++;
        }
      }
    } catch(err) {
      console.warn("Monthly aggregate warning for " + sheetName + ": " + err.toString());
    }
  };

  aggregateMonth("Strategy_Session_Bookings", "strategy");
  aggregateMonth("Inbound_Leads", "leads");
  aggregateMonth("Course_Enquiries", "courses");
  aggregateMonth("Consultation_Requests", "audits");
  aggregateMonth("Partner_Applications", "partners");
  aggregateMonth("Career_Applications", "careers");
  aggregateMonth("Estimator_Calculations", "estimators");
  aggregateMonth("Registered_Users", "members");

  var months = Object.keys(monthMap).sort().reverse();
  var rows = [];
  months.forEach(function(m) {
    var it = monthMap[m];
    var tot = it.strategy + it.leads + it.courses + it.audits + it.partners + it.careers + it.estimators + it.members;
    rows.push([m, it.strategy, it.leads, it.courses, it.audits, it.partners, it.careers, it.estimators, it.members, tot]);
  });

  if (rows.length === 0) {
    rows = [[getSafeMonthKey(new Date()), 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  }

  ensureSheetCapacity(sh, rows.length + 1, headers.length);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sh.setFrozenRows(1);
}

function generateDatabaseSummaryInSheet1(ss) {
  ss = ss || getSpreadsheet();
  var headers = ["Table Name", "Total Records", "Status", "Table Type", "Last Updated"];
  var sh = getOrCreateSheet(ss, "Database_Summary", headers);
  sh.clearContents();

  var tables = [
    { name: "Strategy_Session_Bookings", type: "Executive Strategy Consultation" },
    { name: "Inbound_Leads", type: "Core Lead & Assessment Form" },
    { name: "Consultation_Requests", type: "Executive Audit Consultation" },
    { name: "Career_Applications", type: "Recruitment & HR" },
    { name: "Course_Enquiries", type: "CDAC-MEPZ Education" },
    { name: "Partner_Applications", type: "Partner Alliance" },
    { name: "Chatbot_Leads", type: "AI Chat Conversions" },
    { name: "Registered_Users", type: "Portal Members" },
    { name: "User_Logins", type: "Authentication Telemetry" },
    { name: "Estimator_Calculations", type: "Audit Scope & Liability" },
    { name: "Exit_Intent_Feedback", type: "Exit Intent Survey" },
    { name: "Google_Ad_Leads", type: "Paid Ad Campaigns" },
    { name: "youtube_lead", type: "YouTube Video Campaigns" },
    { name: "linkedin_lead", type: "LinkedIn Lead Forms" },
    { name: "Traffic_Analytics", type: "Website Traffic" },
    { name: "Behavior_Metrics", type: "Granular Behavioral Events" }
  ];

  var rows = tables.map(function(t) {
    var s = ss.getSheetByName(t.name);
    var count = (s && s.getLastRow() > 1) ? (s.getLastRow() - 1) : 0;
    return [t.name, count, count > 0 ? "🟢 Live Data" : "⚪ Ready for Data", t.type, new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })];
  });

  ensureSheetCapacity(sh, rows.length + 1, headers.length);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sh.setFrozenRows(1);
}

// ═════════════════════════════════════════════════════════════════════════════
// 8. SCHEDULED EXECUTIVE EMAIL BRIEFS (DAILY, WEEKLY, MONTHLY)
// ═════════════════════════════════════════════════════════════════════════════

function dailyReport() {
  var ss = getSpreadsheet();
  generateDailyReportInSheet1(ss);
  
  var dateStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "d MMMM yyyy");
  var recipients = uniqueEmails(EMAIL_CONFIG.reportEmails);
  
  var strategyCount = countRows(ss, "Strategy_Session_Bookings");
  var leadsCount = countRows(ss, "Inbound_Leads");
  var courseCount = countRows(ss, "Course_Enquiries");
  var auditCount = countRows(ss, "Consultation_Requests");
  var partnerCount = countRows(ss, "Partner_Applications");
  var careerCount = countRows(ss, "Career_Applications");
  var estCount = countRows(ss, "Estimator_Calculations");
  var trafficCount = countRows(ss, "Traffic_Analytics");

  var totalLeads = strategyCount + leadsCount + courseCount + auditCount + partnerCount + careerCount + estCount;

  var html = [
    '<!DOCTYPE html><html><body style="font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;padding:24px;margin:0;">',
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 25px rgba(0,0,0,0.06);">',
    '  <div style="background:linear-gradient(135deg,#002255 0%,#003380 100%);padding:28px 24px;color:#ffffff;">',
    '    <span style="background:#0ea5e9;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">Daily Intelligence</span>',
    '    <h2 style="margin:10px 0 0 0;font-size:22px;">Govenics Executive Daily Brief</h2>',
    '    <p style="margin:4px 0 0 0;color:#93c5fd;font-size:13px;">Performance Digest &bull; ' + dateStr + '</p>',
    '  </div>',
    '  <div style="padding:24px;">',
    '    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">',
    '      <tr>',
    '        <td style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;width:50%;">',
    '          <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Total Pipeline Leads</div>',
    '          <div style="font-size:24px;font-weight:800;color:#059669;margin-top:4px;">' + totalLeads + '</div>',
    '        </td>',
    '        <td style="width:10px;"></td>',
    '        <td style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;width:50%;">',
    '          <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Traffic Hits</div>',
    '          <div style="font-size:24px;font-weight:800;color:#003380;margin-top:4px;">' + trafficCount + '</div>',
    '        </td>',
    '      </tr>',
    '    </table>',
    '    <h4 style="margin:0 0 10px 0;font-size:12px;color:#003380;text-transform:uppercase;letter-spacing:0.05em;">Conversion Breakdown</h4>',
    '    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Strategy Session Bookings</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#4f46e5;">' + strategyCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Inbound Advisory Leads</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#0f172a;">' + leadsCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">CDAC-MEPZ Course Enquiries</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#d97706;">' + courseCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Audit Consultation Requests</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#dc2626;">' + auditCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Partner Applications</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#7c3aed;">' + partnerCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Career Applications</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#0d9488;">' + careerCount + '</td></tr>',
    '      <tr><td style="padding:8px 0;color:#475569;">Estimator Calculations</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#b45309;">' + estCount + '</td></tr>',
    '    </table>',
    '    <div style="text-align:center;">',
    '      <a href="' + ss.getUrl() + '" style="background:#003380;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;">Open Data Collection Sheet</a>',
    '    </div>',
    '  </div>',
    '  <div style="background:#f8fafc;padding:14px;text-align:center;color:#94a3b8;font-size:11px;">Govenics Executive Intelligence &bull; Authorized Leadership Only</div>',
    '</div></body></html>'
  ].join("\n");

  MailApp.sendEmail({
    to: recipients.join(","),
    subject: "📊 [Govenics GRC] Daily Executive Analytics Brief – " + dateStr,
    htmlBody: html,
    name: "Govenics Executive Analytics"
  });
  console.log("✅ Daily Report email sent to: " + recipients.join(", "));
}

function weeklyReport() {
  var ss = getSpreadsheet();
  generateWeeklyReportInSheet1(ss);

  var now = new Date();
  var w1Start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var rangeStr = Utilities.formatDate(w1Start, "Asia/Kolkata", "d MMM") + " – " + Utilities.formatDate(now, "Asia/Kolkata", "d MMM yyyy");
  var recipients = uniqueEmails(EMAIL_CONFIG.reportEmails);

  var strategyCount = countRows(ss, "Strategy_Session_Bookings");
  var leadsCount = countRows(ss, "Inbound_Leads");
  var courseCount = countRows(ss, "Course_Enquiries");
  var auditCount = countRows(ss, "Consultation_Requests");
  var partnerCount = countRows(ss, "Partner_Applications");
  var careerCount = countRows(ss, "Career_Applications");
  var estCount = countRows(ss, "Estimator_Calculations");

  var totalPipeline = strategyCount + leadsCount + courseCount + auditCount + partnerCount + careerCount + estCount;

  var html = [
    '<!DOCTYPE html><html><body style="font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;padding:24px;margin:0;">',
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 25px rgba(0,0,0,0.06);">',
    '  <div style="background:linear-gradient(135deg,#1e1b4b 0%,#4338ca 100%);padding:28px 24px;color:#ffffff;">',
    '    <span style="background:#6366f1;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">Weekly Performance</span>',
    '    <h2 style="margin:10px 0 0 0;font-size:22px;">Govenics Weekly Executive Brief</h2>',
    '    <p style="margin:4px 0 0 0;color:#c7d2fe;font-size:13px;">Week Period &bull; ' + rangeStr + '</p>',
    '  </div>',
    '  <div style="padding:24px;">',
    '    <div style="background:#f8fafc;border-left:4px solid #4338ca;padding:16px;border-radius:4px;margin-bottom:20px;">',
    '      <div style="font-size:12px;color:#4338ca;font-weight:800;text-transform:uppercase;">Weekly Form Pipeline Total</div>',
    '      <div style="font-size:26px;font-weight:800;color:#0f172a;margin-top:4px;">' + totalPipeline + ' Submissions</div>',
    '    </div>',
    '    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Strategy Session Bookings</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#4f46e5;">' + strategyCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Inbound Advisory Leads</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#0f172a;">' + leadsCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">CDAC-MEPZ Course Enquiries</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#d97706;">' + courseCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Audit Consultation Requests</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#dc2626;">' + auditCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Partner Applications</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#7c3aed;">' + partnerCount + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#475569;">Career Applications</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#0d9488;">' + careerCount + '</td></tr>',
    '      <tr><td style="padding:8px 0;color:#475569;">Estimator Calculations</td><td style="padding:8px 0;text-align:right;font-weight:700;color:#b45309;">' + estCount + '</td></tr>',
    '    </table>',
    '    <div style="text-align:center;">',
    '      <a href="' + ss.getUrl() + '" style="background:#4338ca;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;">Open Master Database</a>',
    '    </div>',
    '  </div>',
    '  <div style="background:#f8fafc;padding:14px;text-align:center;color:#94a3b8;font-size:11px;">Govenics Weekly Growth Engine &bull; Authorized Leadership Only</div>',
    '</div></body></html>'
  ].join("\n");

  MailApp.sendEmail({
    to: recipients.join(","),
    subject: "📅 [Govenics GRC] Weekly Executive Analytics Brief – " + rangeStr,
    htmlBody: html,
    name: "Govenics Executive Analytics"
  });
  console.log("✅ Weekly Report email sent to: " + recipients.join(", "));
}

function monthlyReport() {
  var ss = getSpreadsheet();
  generateMonthlyReportInSheet1(ss);

  var monthStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "MMMM yyyy");
  var recipients = uniqueEmails(EMAIL_CONFIG.reportEmails);

  var strategyCount = countRows(ss, "Strategy_Session_Bookings");
  var leadsCount = countRows(ss, "Inbound_Leads");
  var courseCount = countRows(ss, "Course_Enquiries");
  var auditCount = countRows(ss, "Consultation_Requests");
  var partnerCount = countRows(ss, "Partner_Applications");
  var careerCount = countRows(ss, "Career_Applications");
  var estCount = countRows(ss, "Estimator_Calculations");
  var totalPipeline = strategyCount + leadsCount + courseCount + auditCount + partnerCount + careerCount + estCount;

  var html = [
    '<!DOCTYPE html><html><body style="font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;padding:24px;margin:0;">',
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 25px rgba(0,0,0,0.06);">',
    '  <div style="background:linear-gradient(135deg,#064e3b 0%,#047857 100%);padding:28px 24px;color:#ffffff;">',
    '    <span style="background:#10b981;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">Monthly Strategic Digest</span>',
    '    <h2 style="margin:10px 0 0 0;font-size:22px;">Govenics Monthly Strategic Growth Digest</h2>',
    '    <p style="margin:4px 0 0 0;color:#a7f3d0;font-size:13px;">Month of ' + monthStr + '</p>',
    '  </div>',
    '  <div style="padding:24px;">',
    '    <p style="color:#475569;font-size:14px;">Total Pipeline Form Actions: <strong>' + totalPipeline + '</strong> (Includes ' + strategyCount + ' Strategy Sessions)</p>',
    '    <div style="text-align:center;margin-top:20px;">',
    '      <a href="' + ss.getUrl() + '" style="background:#047857;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;">Open Sheet 1 Master Database</a>',
    '    </div>',
    '  </div>',
    '</div></body></html>'
  ].join("\n");

  MailApp.sendEmail({
    to: recipients.join(","),
    subject: "📁 [Govenics GRC] Monthly Strategic Growth Digest – " + monthStr,
    htmlBody: html,
    name: "Govenics Executive Analytics"
  });
  console.log("✅ Monthly Report email sent to: " + recipients.join(", "));
}

function countRows(ss, sheetName) {
  try {
    var s = ss.getSheetByName(sheetName);
    return (s && s.getLastRow() > 1) ? (s.getLastRow() - 1) : 0;
  } catch(e) { return 0; }
}

// ═════════════════════════════════════════════════════════════════════════════
// 9. AUTOMATED TRIGGERS & PREVIEW TEST SUITE
// ═════════════════════════════════════════════════════════════════════════════

function clearAllProjectTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) { ScriptApp.deleteTrigger(t); });
  console.log("✅ Cleared all active triggers in Sheet 1.");
}

function setupAllDataCollectionTriggers() {
  clearAllProjectTriggers();

  // 1. Daily Report at 8:30 AM IST
  ScriptApp.newTrigger("dailyReport")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();

  // 2. Weekly Report on Friday at 8:30 AM IST
  ScriptApp.newTrigger("weeklyReport")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(8)
    .create();

  // 3. Monthly Strategic Report on 1st of month at 8:30 AM IST
  ScriptApp.newTrigger("monthlyReport")
    .timeBased()
    .onMonthDay(1)
    .atHour(8)
    .create();

  // 4. Monthly Career Resume Digest on 1st of month at 9:00 AM IST
  ScriptApp.newTrigger("forwardMonthlyCareerApplications")
    .timeBased()
    .onMonthDay(1)
    .atHour(9)
    .create();

  console.log("✅ All 4 Scheduled Triggers registered in Sheet 1 (Daily, Weekly, Monthly, Career Digest)!");
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch(e) {}
  if (ui) ui.alert("✅ All Automation Triggers Configured in Sheet 1!\n\n1. Daily Report: Every day at 8:30 AM IST\n2. Weekly Report: Every Friday at 8:30 AM IST\n3. Monthly Report: 1st of every month at 8:30 AM IST\n4. Monthly Career Digest: 1st of every month at 9:00 AM IST\n\nRecipients:\n" + EMAIL_CONFIG.reportEmails.join("\n"));
}

function SEND_ALL_GOVENICS_TEST_EMAILS() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch(e) {}

  try {
    // 1. Sample Strategy Session Booking Alert
    sendLeadNotification({
      "Booking Reference": "GOVNICS-SS-TEST01",
      "Full Name": "Dr. Vikram Seth",
      "Business Email": "vikram.seth@novaprime.com",
      "Company": "NovaPrime Technologies",
      "Job Title": "Chief Risk Officer",
      "Phone": "+91 98765 43210",
      "Industry": "Technology, SaaS & Cloud Services",
      "Area of Interest": "Regulatory Compliance & Audit Readiness",
      "Business Objective": "SOC 2 Type II and ISO 27001 audit roadmap preparation",
      "Preferred Date": "2026-11-05",
      "Time Slot": "02:30 PM",
      "Duration (min)": "45",
      "Meeting Format": "Video Meeting",
      "Lead Source": "Book a Strategy Session"
    }, "Strategy_Session_Bookings");

    // 2. Sample Inbound Lead Alert
    sendLeadNotification({
      name: "Rajesh Varma",
      email: "rajesh.varma@fintechsolutions.in",
      phone: "+91 98401 23456",
      company: "FinTech Solutions India Ltd",
      requirement: "ISO 27001 & SOC 2 Readiness Audit",
      leadSource: "Google Ads",
      utmCampaign: "iso27001_enterprise_q3"
    }, "Inbound_Leads");

    // 3. Sample Career Application with Resume Attachment
    var sampleBlob = Utilities.newBlob(
      "GOVENICS GRC — SAMPLE CANDIDATE RESUME\n\nCandidate: Sneha Raman\nPosition: Senior GRC Consultant\nExperience: 6+ Years (ISO 27001, SOC 2, DPDP Act)\nCertifications: CISA, CRISC, ISO 27001 Lead Auditor\nLocation: Chennai / Bengaluru",
      "application/pdf",
      "Sneha_Raman_Sample_Resume.pdf"
    );

    sendCareerEmailWithResume({
      name: "Sneha Raman",
      email: "sneha.raman@grcexpert.in",
      phone: "+91 97910 88765",
      role: "Senior GRC Consultant & Lead Auditor",
      experience: "6+ Years in statutory cybersecurity & data privacy compliance",
      resumeFilename: "Sneha_Raman_Sample_Resume.pdf",
      coverNote: "I have over 6 years of experience leading GRC advisory across BFSI and Healthcare clients."
    }, [sampleBlob], "https://drive.google.com");

    // 4. Sample Course Enquiry (CDAC-MEPZ)
    sendLeadNotification({
      name: "Aditya Nambiar",
      email: "aditya.nambiar@techcyber.in",
      phone: "+91 91234 56780",
      company: "TechCyber Advisory",
      course: "CDAC Certified GRC Officer",
      experience: "3-5 Years",
      leadSource: "Website Course Page",
      utmSource: "linkedin",
      utmCampaign: "cdac_mepz_certification"
    }, "Course_Enquiries");

    // 5. Daily, Weekly, Monthly briefs
    dailyReport();
    weeklyReport();
    monthlyReport();

    if (ui) ui.alert("✅ SUCCESS! Full Sample Preview Suite Dispatched to:\n" + EMAIL_CONFIG.reportEmails.join("\n"));
  } catch(err) {
    if (ui) ui.alert("❌ Error sending test preview suite: " + err.toString());
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 10. SPREADSHEET UI MENU
// ═════════════════════════════════════════════════════════════════════════════

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🚀 GOVENICS DATA ENGINE')
    .addItem('⚡ Initialize All Master Tables & Schemas', 'INITIALIZE_ALL_SHEETS')
    .addSeparator()
    .addItem('📊 Send Sample Daily Executive Brief', 'dailyReport')
    .addItem('📅 Send Sample Weekly Executive Brief', 'weeklyReport')
    .addItem('📆 Send Sample Monthly Strategic Digest', 'monthlyReport')
    .addItem('📋 Forward Monthly Resumes Digest Now', 'forwardMonthlyCareerApplications')
    .addSeparator()
    .addItem('📨 Send Full Sample Preview Suite (All Emails)', 'SEND_ALL_GOVENICS_TEST_EMAILS')
    .addItem('⏰ Set Up Automated Daily/Weekly/Monthly Triggers', 'setupAllDataCollectionTriggers')
    .addItem('🧹 Clear All Triggers', 'clearAllProjectTriggers')
    .addSeparator()
    .addItem('🔄 Refresh In-Sheet Daily/Weekly/Monthly Reports', 'GENERATE_ALL_SHEET1_REPORTS')
    .addToUi();
}

function INITIALIZE_ALL_SHEETS() {
  var ss = getSpreadsheet();
  
  // Master priority tabs to guarantee in user's workbook
  var priorityTabs = [
    "Contact Form",
    "Course Enquiries",
    "Behavior Metrics",
    "User Behaviour",
    "Engagement Metrics",
    "Traffic Analytics",
    "Strategy Session Bookings",
    "Career Applications",
    "Partner Applications",
    "Chatbot Leads",
    "Estimator Calculations",
    "Exit Intent Feedback",
    "Registered Users"
  ];

  priorityTabs.forEach(function(tabTitle) {
    var canonical = SHEET_NAME_ALIASES[normalizeTabName(tabTitle)] || tabTitle.replace(/\s+/g, '_');
    getOrCreateSheet(ss, tabTitle, TAB_CONFIGS[canonical]);
  });

  try {
    GENERATE_ALL_SHEET1_REPORTS();
  } catch(e) {}

  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch(e) {}
  if (ui) {
    ui.alert("✅ SUCCESS! All master database tabs initialized:\n\n• Contact Form\n• Course Enquiries\n• Behavior Metrics\n• User Behaviour\n• Engagement Metrics\n• Traffic Analytics\n• Strategy Session Bookings\n• Career Applications\n• Partner Applications\n• Chatbot Leads\n• Estimator Calculations");
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 11. HELPER FUNCTIONS & UNIVERSAL SHEET RESOLVER
// ═════════════════════════════════════════════════════════════════════════════

function getSpreadsheet() {
  // 1. First priority: Container-bound active spreadsheet (Extensions > Apps Script)
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active && active.getId()) return active;
  } catch(e) {}

  // 2. Second priority: Open by configured DATA_SPREADSHEET_ID
  if (CONFIG.DATA_SPREADSHEET_ID && CONFIG.DATA_SPREADSHEET_ID !== "YOUR_SPREADSHEET_ID_HERE") {
    try {
      return SpreadsheetApp.openById(CONFIG.DATA_SPREADSHEET_ID);
    } catch(err) {
      console.warn("Could not open spreadsheet by CONFIG.DATA_SPREADSHEET_ID: " + err.toString());
    }
  }

  // 3. Fallback: try active again
  var activeFallback = SpreadsheetApp.getActiveSpreadsheet();
  if (activeFallback) return activeFallback;

  throw new Error("Unable to locate Google Spreadsheet. Please paste your Google Sheet ID into line 31 of Apps Script (CONFIG.DATA_SPREADSHEET_ID).");
}

function normalizeTabName(str) {
  if (!str) return "";
  return String(str).toLowerCase()
    .replace(/[\s\-_/]/g, '')
    .replace(/matrics/g, 'metrics')
    .replace(/enquires/g, 'enquiries')
    .replace(/behaviour/g, 'behavior');
}

function findExistingSheetFlexibly(ss, targetName) {
  if (!ss || !targetName) return null;
  var sheets = ss.getSheets();
  var targetNorm = normalizeTabName(targetName);

  // 1. Direct exact or normalized match
  for (var i = 0; i < sheets.length; i++) {
    var s = sheets[i];
    if (normalizeTabName(s.getName()) === targetNorm) {
      return s;
    }
  }

  // 2. Alias match (e.g. user tab named "Contact Form" vs canonical "Contact_Form")
  var canonical = SHEET_NAME_ALIASES[targetNorm] || targetName;
  var canonicalNorm = normalizeTabName(canonical);
  for (var j = 0; j < sheets.length; j++) {
    var s2 = sheets[j];
    var sNorm = normalizeTabName(s2.getName());
    if (sNorm === canonicalNorm || SHEET_NAME_ALIASES[sNorm] === canonical) {
      return s2;
    }
  }

  return null;
}

function getOrCreateSheet(ss, name, fallbackHeaders) {
  // 1. Check if user already has this sheet in their workbook (case-insensitive / flexible)
  var sheet = findExistingSheetFlexibly(ss, name);

  // 2. If not found, create new sheet with clean readable title
  if (!sheet) {
    var cleanSheetTitle = name.replace(/_/g, ' '); // e.g. "Contact Form" or "Course Enquiries"
    try {
      sheet = ss.insertSheet(cleanSheetTitle);
    } catch(e) {
      // If title taken or invalid, try raw name
      sheet = ss.insertSheet(name);
    }
  }

  // 3. Ensure Row 1 headers exist
  var headers = fallbackHeaders || TAB_CONFIGS[name] || TAB_CONFIGS[SHEET_NAME_ALIASES[normalizeTabName(name)]];
  if (headers && headers.length > 0) {
    ensureSheetCapacity(sheet, 1, headers.length);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length)
           .setValues([headers])
           .setFontWeight("bold")
           .setBackground("#0f172a")
           .setFontColor("#ffffff");
      try { sheet.setFrozenRows(1); } catch(e) {}
    }
  }

  return sheet;
}

function syncHeadersAndBuildRow(sheet, fields, fallbackHeaders) {
  var headers = [];
  var lastCol = sheet.getLastColumn();

  // If sheet is completely empty, initialize headers immediately
  if (sheet.getLastRow() === 0 || lastCol === 0) {
    headers = fallbackHeaders || [];
    if (!headers || headers.length === 0) {
      // Derive headers dynamically from submitted fields
      headers = Object.keys(fields).filter(function(k) {
        return k !== "table" && k !== "sheetName" && k !== "resumeData" && k !== "resumeBlob" && typeof fields[k] !== "object";
      });
      if (headers.indexOf("Timestamp") === -1) headers.push("Timestamp");
    }

    if (headers.length > 0) {
      ensureSheetCapacity(sheet, 1, headers.length);
      sheet.getRange(1, 1, 1, headers.length)
           .setValues([headers])
           .setFontWeight("bold")
           .setBackground("#0f172a")
           .setFontColor("#ffffff");
      try { sheet.setFrozenRows(1); } catch(e) {}
      lastCol = headers.length;
    }
  } else {
    headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  }

  // Check if fields has new attributes not in existing headers, and dynamically append to Row 1
  var existingHeaderMap = {};
  headers.forEach(function(h) {
    if (h) existingHeaderMap[normalizeTabName(h)] = true;
  });

  var newHeadersToAdd = [];
  Object.keys(fields).forEach(function(k) {
    if (k === "table" || k === "sheetName" || k === "resumeData" || k === "resumeBlob" || typeof fields[k] === "object") return;
    var normK = normalizeTabName(k);
    if (!existingHeaderMap[normK]) {
      newHeadersToAdd.push(k);
      existingHeaderMap[normK] = true;
    }
  });

  if (newHeadersToAdd.length > 0) {
    var startCol = lastCol + 1;
    ensureSheetCapacity(sheet, 1, startCol + newHeadersToAdd.length);
    sheet.getRange(1, startCol, 1, newHeadersToAdd.length)
         .setValues([newHeadersToAdd])
         .setFontWeight("bold")
         .setBackground("#0f172a")
         .setFontColor("#ffffff");
    lastCol = startCol + newHeadersToAdd.length - 1;
    headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  }

  // Build row values strictly mapped to column headers
  var nowStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  return headers.map(function(h) {
    if (!h) return "";
    var normH = normalizeTabName(h);

    // Direct key match
    if (fields[h] !== undefined && fields[h] !== null && fields[h] !== "") {
      return (typeof fields[h] === "object") ? JSON.stringify(fields[h]) : fields[h];
    }

    // Default system values
    if (normH === "timestamp") {
      return fields.timestamp || fields.Timestamp || fields.submitted_at || nowStr;
    }
    if (normH === "leadstatus" || normH === "status") {
      return fields.lead_status || fields.leadStatus || fields.status || fields["Booking Status"] || "New";
    }
    if (normH === "page" || normH === "sourcepage" || normH === "pageurl") {
      return fields.page || fields.page_url || fields.pageUrl || fields.source_page || fields.sourcePage || fields.source || fields["Source"] || "";
    }
    if (normH === "leadsource") {
      return fields["Lead Source"] || fields.leadSource || fields.lead_source || "Website Inbound";
    }

    // Fuzzy matching against fields
    for (var k in fields) {
      if (normalizeTabName(k) === normH) {
        var val = fields[k];
        return (typeof val === "object" && val !== null) ? JSON.stringify(val) : (val !== undefined ? val : "");
      }
    }

    // Common synonyms
    if (normH === "fullname" || normH === "name") {
      return fields.name || fields.Name || fields.fullName || fields["Full Name"] || "";
    }
    if (normH === "email" || normH === "businessemail" || normH === "workemail") {
      return fields.email || fields.Email || fields.workEmail || fields.businessEmail || fields["Business Email"] || "";
    }
    if (normH === "phone" || normH === "mobilenumber" || normH === "contactnumber") {
      return fields.phone || fields.Phone || fields.mobile || fields.Mobile || fields["Mobile Number"] || fields["Phone"] || "";
    }
    if (normH === "company" || normH === "organization") {
      return fields.company || fields.Company || fields.organization || fields.org || fields["Company"] || "";
    }
    if (normH === "requirement" || normH === "message") {
      return fields.requirement || fields.Requirement || fields.message || fields.Message || "";
    }

    return "";
  });
}

function uniqueEmails(list) {
  var seen = {};
  var out = [];
  (list || []).forEach(function(addr) {
    if (!addr || typeof addr !== "string") return;
    var clean = addr.trim().toLowerCase();
    if (!clean || clean.indexOf("@") === -1 || seen[clean]) return;
    seen[clean] = true;
    out.push(addr.trim());
  });
  return out;
}

// ═════════════════════════════════════════════════════════════════════════════
// 12. DATE PARSING & REPORT GENERATION HELPERS
// ═════════════════════════════════════════════════════════════════════════════

function findTimestampColumnIndex(headerRow) {
  if (!headerRow || !headerRow.length) return 0;
  for (var c = 0; c < headerRow.length; c++) {
    var h = String(headerRow[c] || "").toLowerCase().replace(/[\s\-_]/g, "");
    if (h === "timestamp" || h === "date" || h === "datesubmitted" || h === "submittedat") {
      return c;
    }
  }
  return 0;
}

function parseSafeDate(val) {
  if (!val) return null;
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? null : val;
  }
  if (typeof val === "number") {
    var dNum = new Date(val);
    return isNaN(dNum.getTime()) ? null : dNum;
  }
  if (typeof val === "string") {
    val = val.trim();
    if (!val) return null;

    // Try direct ISO or standard date constructor
    var direct = new Date(val);
    if (!isNaN(direct.getTime()) && direct.getFullYear() > 1990) {
      return direct;
    }

    // Try DD/MM/YYYY or DD-MM-YYYY format
    var dmy = val.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (dmy) {
      var day = parseInt(dmy[1], 10);
      var month = parseInt(dmy[2], 10) - 1;
      var year = parseInt(dmy[3], 10);
      var parsedDmy = new Date(year, month, day);
      if (!isNaN(parsedDmy.getTime())) return parsedDmy;
    }

    // Try YYYY-MM-DD or YYYY/MM/DD format
    var ymd = val.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymd) {
      var y = parseInt(ymd[1], 10);
      var m = parseInt(ymd[2], 10) - 1;
      var d = parseInt(ymd[3], 10);
      var parsedYmd = new Date(y, m, d);
      if (!isNaN(parsedYmd.getTime())) return parsedYmd;
    }
  }
  return null;
}

function getSafeDayKey(val) {
  var d = parseSafeDate(val);
  if (!d) return "Recent";
  try {
    return Utilities.formatDate(d, "Asia/Kolkata", "yyyy-MM-dd");
  } catch(e) {
    return "Recent";
  }
}

function getSafeWeekKey(val) {
  var d = parseSafeDate(val);
  if (!d) return "Recent";
  try {
    var onejan = new Date(d.getFullYear(), 0, 1);
    var millisecsInDay = 86400000;
    var weekNum = Math.ceil((((d.getTime() - onejan.getTime()) / millisecsInDay) + onejan.getDay() + 1) / 7);
    return d.getFullYear() + "-W" + (weekNum < 10 ? "0" + weekNum : weekNum);
  } catch(e) {
    return "Recent";
  }
}

function getSafeMonthKey(val) {
  var d = parseSafeDate(val);
  if (!d) return "Recent";
  try {
    return Utilities.formatDate(d, "Asia/Kolkata", "yyyy-MM");
  } catch(e) {
    return "Recent";
  }
}

function ensureSheetCapacity(sh, requiredRows, requiredCols) {
  try {
    if (!sh) return;
    var maxRows = sh.getMaxRows();
    if (maxRows < requiredRows) {
      sh.insertRowsAfter(maxRows, requiredRows - maxRows + 5);
    }
    var maxCols = sh.getMaxColumns();
    if (maxCols < requiredCols) {
      sh.insertColumnsAfter(maxCols, requiredCols - maxCols + 5);
    }
  } catch(e) {
    console.warn("ensureSheetCapacity warning: " + e.toString());
  }
}
