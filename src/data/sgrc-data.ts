export interface SgrcService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  whoNeeds: string[];
  features: { title: string; desc: string }[];
  benefits: string[];
  faqs?: { q: string; a: string }[];
}

export interface ELibraryItem {
  id: string;
  title: string;
  introduction: string;
  whatIsIt: string;
  scope: string;
  applicability: string;
  data: { [state: string]: any };
}

export const sgrcServices: SgrcService[] = [
  {
    id: "compliance-risk-audit",
    title: "Compliance Risk Audit & Due Diligence",
    tagline: "Proactive audit mapping and gap assessments to shield your board from regulatory litigation and operational penalties.",
    description: "Diverse labour law due diligence and vendor audit services designed to help your business understand its compliance health. By conducting thorough gap assessments of internal processes and contractor systems, we identify and mitigate potential operational risks before they escalate.",
    whoNeeds: [
      "Business start-ups establishing statutory baselines",
      "Mergers & acquisitions needing comprehensive legal due diligence",
      "Companies executing closure of businesses, factories, offices, or mines",
      "Organisations transitioning between varied business models",
      "Multinationals with a presence across different states and territories"
    ],
    features: [
      {
        title: "Labour & Industrial Law Applicability",
        desc: "Thorough verification of applicable laws based on headcount, activities, and location. Mapping all compliance requirements, licenses, and statutory filings."
      },
      {
        title: "Employee Benefits & Liabilities Audit",
        desc: "Strict verification of minimum wage payouts, gratuity accounting, Employee Provident Fund (EPF), Employee State Insurance (ESI), and annual bonus liabilities."
      },
      {
        title: "Corporate Governance & Board Shield",
        desc: "Criticality assessments tracking prosecution, financial, and reputational risks for the Board of Directors, Independent Directors, and Shareholders."
      },
      {
        title: "Vendor & Third-Party SLA Reviews",
        desc: "Continuous auditing of third-party vendors and payroll agencies to prevent downstream co-employment liabilities."
      }
    ],
    benefits: [
      "Identify and mitigate compliance risks before regulatory inspection",
      "Ensure 100% adherence to central and state labour guidelines",
      "Avoid severe financial penalties, closure notices, and court prosecutions",
      "Build trust with partners, stakeholders, and institutional investors",
      "Optimise operations and streamline vendor verification workflows"
    ],
    faqs: [
      {
        q: "What is a compliance audit?",
        a: "A compliance audit is a systematic examination of an organization's practices, policies, and procedures to determine its adherence to statutory labour laws, environment rules, and local regulations. It evaluates the effectiveness of internal controls and identifies compliance gaps."
      },
      {
        q: "How do you identify compliance risks?",
        a: "We identify compliance risks through a multi-pronged approach: 1) Risk Assessment: Evaluating operations against the regulatory environment. 2) Internal Controls Review: Assessing procedures designed to prevent slips. 3) Regulatory Analysis: Tracking statutory updates. 4) Third-Party Auditing: Reviewing vendor payroll and PF/ESI filings. 5) Detailed Reporting: Documenting gaps for corrective action."
      },
      {
        q: "What is internal audit risk compliance services?",
        a: "These are consulting services that integrate routine operational audits with compliance monitoring. They ensure that internal financial systems, administrative workflows, and third-party interactions comply with statutory obligations (like CLRA, EPF, and new Labour Codes)."
      },
      {
        q: "What does a compliance auditor do?",
        a: "A compliance auditor is responsible for conducting audits against local and federal rules, identifying areas of non-compliance, evaluating internal safety and salary control systems, providing strategic recommendations for course correction, and compiling final audit briefs for the management and board."
      }
    ]
  },
  {
    id: "establishment-compliances",
    title: "Establishment Compliances",
    tagline: "Manage registrations, licenses, shop acts, and annual return filings across multiple geographic offices.",
    description: "Ensure your commercial offices, branches, and retail outlets operate fully legally. We handle trade licenses, Shop & Establishment filings, display mandates, and legal registries.",
    whoNeeds: [
      "Retail chains opening new outlets",
      "Commercial offices expanding into new states",
      "E-commerce hubs and warehouses"
    ],
    features: [
      {
        title: "Shop & Establishment Licenses",
        desc: "Obtaining, renewing, and amending Shop licenses across municipal limits and states."
      },
      {
        title: "Display and Register Mandates",
        desc: "Maintaining mandatory statutory displays (wages, holidays, abstract notices) in accordance with local regulations."
      }
    ],
    benefits: [
      "Flawless branch expansion with on-time licensing",
      "Zero fines during routine labor inspector visits",
      "Centralised dashboard of all branch license expirations"
    ]
  },
  {
    id: "payroll-compliance",
    title: "Payroll Compliance Services",
    tagline: "Statutory integrations for PF, ESIC, Professional Tax, and Labour Welfare Funds.",
    description: "Ensure that employee salary structures, deductions, and monthly remittances are perfectly aligned with statutory guidelines. We manage monthly filing reports and challans.",
    whoNeeds: [
      "Growth companies with scaling headcounts",
      "Firms transitioning payroll software systems",
      "Entities managing multi-state workforces"
    ],
    features: [
      {
        title: "Statutory Deductions Filing",
        desc: "Timely computation and monthly filing of PF, ESIC, LWF, and Professional Tax challenges."
      },
      {
        title: "Form 16 & TDS Returns",
        desc: "Accurate quarterly calculations of salary TDS, Form 24Q returns, and digital Form 16 releases."
      }
    ],
    benefits: [
      "Elimination of salary computation errors and regulatory notices",
      "Happy employees with transparent, compliant salary slips",
      "Smooth annual corporate audits"
    ]
  },
  {
    id: "factory-compliance",
    title: "Factory Compliance Services",
    tagline: "Airtight factory licensing, safety registers, health checks, and waste records.",
    description: "Industrial plants face severe shutdown notices if they violate worker safety or structural registers. We manage complete factory licensing, boiler certificates, safety committee records, and hazardous waste logs.",
    whoNeeds: [
      "Manufacturing plants and processing units",
      "Heavy industrial warehouses",
      "Chemical and pharmaceutical factories"
    ],
    features: [
      {
        title: "Factories Act Registrations",
        desc: "Structural plan approvals, horsepower clearances, and license generation/renewals."
      },
      {
        title: "Safety Committee Charters",
        desc: "Organising mandatory safety audits, emergency response mock-drills, and accident logs."
      }
    ],
    benefits: [
      "Protected operational continuity with zero stop-work notices",
      "Airtight defense in case of industrial factory inspections",
      "Enhanced workplace safety index scores"
    ]
  },
  {
    id: "vendor-compliance",
    title: "Vendor Compliance Services",
    tagline: "Shield your enterprise from contractor defaults, wage discrepancies, and illegal vendor payroll runs.",
    description: "Mitigate direct co-employment risks. We monitor your contractors, security agencies, and contract laborers to verify they pay minimum wages and file PF/ESI on time.",
    whoNeeds: [
      "Enterprises employing large contract workforces",
      "Firms relying on facility management agencies",
      "Logistics and delivery platforms"
    ],
    features: [
      {
        title: "Contractor Auditing",
        desc: "Monthly verification of contractor wage sheets, bank transfers, and individual PF/ESI chalans."
      },
      {
        title: "CLRA License Registrations",
        desc: "Managing Principal Employer registration (Form I) and contractor license applications (Form VI)."
      }
    ],
    benefits: [
      "100% isolation from contractor legal liabilities",
      "Verification that contract workers receive their exact statutory dues",
      "Automated vendor compliance scorecards"
    ]
  },
  {
    id: "mines-compliance",
    title: "Mines Compliance Services",
    tagline: "Specialised auditing of safety registers, DGMS filings, and community health.",
    description: "Mines operate under highly dangerous environments and strict regulatory guidelines. We ensure compliance with the Mines Act, managing safety registers, vocational training records, and environmental clearances.",
    whoNeeds: [
      "Open-cast and underground mining companies",
      "Quarry and stone crushing operations",
      "Resource extraction corporations"
    ],
    features: [
      {
        title: "Mines Act Registrations",
        desc: "Filing notices of opening, abandonment, or change of ownership with the DGMS."
      },
      {
        title: "Vocational Training Logs",
        desc: "Ensuring all miners undergo mandatory safety training before entering quarry sites."
      }
    ],
    benefits: [
      "Strict conformance to DGMS safety standards",
      "Minimised operational risks and mine accident liabilities",
      "Protected extraction licenses"
    ]
  },
  {
    id: "flexi-staffing",
    title: "Flexi Staffing Services",
    tagline: "Scalable workforce solutions with complete GRC risk absorption.",
    description: "Acquire pre-vetted compliance professionals and flexi-labor resources under a fully managed model. We absorb all statutory payroll risks, letting you scale operations seamlessly.",
    whoNeeds: [
      "Seasonal businesses with peak demand curves",
      "Firms needing compliance specialists for specific projects",
      "Enterprises looking to reduce permanent employee overheads"
    ],
    features: [
      {
        title: "Compliance-Fused Payroll",
        desc: "Complete payrolling, insurance, and statutory tracking managed by Govenics."
      },
      {
        title: "Pre-vetted Resource Placement",
        desc: "Deploying skilled professionals trained in local compliance guidelines."
      }
    ],
    benefits: [
      "Zero headcount overhead on company books",
      "Instant resource deployment without HR lag",
      "SLA-managed staff performance"
    ]
  },
  {
    id: "payroll-services",
    title: "Managed Payroll Processing",
    tagline: "End-to-end payroll processing with automated journal postings.",
    description: "Outsource salary calculations, expense management, attendance calculations, and FnF exit payments. We ensure zero processing errors, seamless bank payments, and full ledger reconciliation.",
    whoNeeds: [
      "Corporate houses seeking confidential payroll processing",
      "Scaling startups without dedicated payroll units",
      "Firms with complex incentive and commission structures"
    ],
    features: [
      {
        title: "Accurate Salary Runs",
        desc: "Automated calculation of basic, HRA, bonuses, overtime, and tax deductions."
      },
      {
        title: "Full & Final Settlement",
        desc: "Processing resignations, gratuity payouts, notice-period pay, and release letters."
      }
    ],
    benefits: [
      "60% reduction in payroll administrative costs",
      "Error-free payouts, preventing salary disputes",
      "Airtight encryption for employee salary details"
    ]
  },
  {
    id: "ehs",
    title: "Environmental, Health & Safety (EHS)",
    tagline: "Pollution consents, safety audits, carbon tracking, and incident command centers.",
    description: "Align your factory operations with pollution standards (CPCB/SPCB) and OHS safety standards (ISO 45001). We manage hazardous chemical registers, safety committees, and green consents.",
    whoNeeds: [
      "Chemical, textile, and manufacturing plants",
      "Construction and real-estate developers",
      "Data centers with heavy backup diesel generators"
    ],
    features: [
      {
        title: "Pollution Board Clearances",
        desc: "Obtaining and renewing Consent to Establish (CTE) and Consent to Operate (CTO)."
      },
      {
        title: "Workplace Health & Safety",
        desc: "Auditing factory air quality, machinery shields, safety gear usage, and fire safety systems."
      }
    ],
    benefits: [
      "Continuous operations with valid SPCB green certificates",
      "Protected workforce with zero hazardous incidents",
      "Pre-mapped BRSR ESG reporting data"
    ]
  }
];

export const sgrceLibraryData: { [key: string]: ELibraryItem } = {
  "labour-welfare-fund": {
    id: "labour-welfare-fund",
    title: "Labour Welfare Fund (LWF)",
    introduction: "Labour Welfare Fund (LWF) is a statutory contribution designed to improve working conditions, provide social security, and raise the standard of living of workers in the unorganized sector.",
    whatIsIt: "LWF is an aid in the form of monetary contributions from employers, employees, and state governments. The funds are utilized for employee healthcare, educational scholarships for workers' children, community centers, and retirement benefits.",
    scope: "The scope of LWF extends to commercial establishments, factories, shops, and transport units operating under state jurisdictions. The contribution rates, frequency (monthly, half-yearly, or annual), and slabs differ significantly across Indian states.",
    applicability: " LWF has been implemented in 16 states and union territories. Establishments employing 5 or more employees (varies by state, e.g. 10 or 20 in some areas) are required to register and make contributions.",
    data: {
      "Maharashtra": {
        employeeContribution: "₹25.00 per month (if gross salary is above ₹3,000)",
        employerContribution: "₹75.00 per month",
        frequency: "Monthly",
        dueDate: "15th of the subsequent month"
      },
      "Karnataka": {
        employeeContribution: "₹20.00 per year (for employees earning any wage)",
        employerContribution: "₹40.00 per year",
        frequency: "Annual",
        dueDate: "15th of January of the subsequent year"
      },
      "Tamil Nadu": {
        employeeContribution: "₹20.00 per year",
        employerContribution: "₹40.00 per year",
        frequency: "Annual",
        dueDate: "31st of January of the subsequent year"
      },
      "Delhi": {
        employeeContribution: "₹0.75 per employee per month",
        employerContribution: "₹2.25 per employee per month",
        frequency: "Half-Yearly (June and December)",
        dueDate: "15th of July and 15th of January"
      },
      "Telangana": {
        employeeContribution: "₹2.00 per month",
        employerContribution: "₹5.00 per month",
        frequency: "Annual",
        dueDate: "31st of January of the subsequent year"
      }
    }
  },
  "minimum-wages": {
    id: "minimum-wages",
    title: "Minimum Wages Act",
    introduction: "The Minimum Wages Act ensures that workers across scheduled employments receive standard living wages, preventing labor exploitation.",
    whatIsIt: "Minimum wages are revised periodically by state governments, adjusted for cost-of-living index rates (VDA - Variable Dearness Allowance). Wages are classified under categories: Skilled, Semi-Skilled, Unskilled, and Highly Skilled.",
    scope: "Covers all commercial shops, factories, restaurants, hotels, IT units, and construction projects. Slabs vary by state, zone (Zone I, II, III depending on urban/rural density), and employee skill class.",
    applicability: "Applies to all scheduled employments employing one or more workers. Non-compliance results in heavy financial claims and criminal prosecution.",
    data: {
      "Maharashtra": {
        unskilled: "₹13,500 - ₹14,800 per month (plus VDA)",
        semiSkilled: "₹14,500 - ₹15,900 per month (plus VDA)",
        skilled: "₹15,800 - ₹17,200 per month (plus VDA)",
        highlySkilled: "₹17,000 - ₹18,500 per month (plus VDA)"
      },
      "Karnataka": {
        unskilled: "₹12,800 - ₹13,500 per month (plus VDA)",
        semiSkilled: "₹13,800 - ₹14,600 per month (plus VDA)",
        skilled: "₹14,900 - ₹15,800 per month (plus VDA)",
        highlySkilled: "₹16,000 - ₹17,100 per month (plus VDA)"
      },
      "Tamil Nadu": {
        unskilled: "₹11,500 - ₹12,400 per month",
        semiSkilled: "₹12,300 - ₹13,200 per month",
        skilled: "₹13,100 - ₹14,200 per month",
        highlySkilled: "₹14,200 - ₹15,500 per month"
      },
      "Delhi": {
        unskilled: "₹17,494 per month (w.e.f Oct 2025)",
        semiSkilled: "₹19,279 per month",
        skilled: "₹21,215 per month",
        highlySkilled: "₹23,000+ per month"
      },
      "Telangana": {
        unskilled: "₹11,000 - ₹11,900 per month",
        semiSkilled: "₹11,900 - ₹12,800 per month",
        skilled: "₹12,900 - ₹13,850 per month",
        highlySkilled: "₹14,000+ per month"
      }
    }
  },
  "professional-tax": {
    id: "professional-tax",
    title: "Professional Tax (PT)",
    introduction: "Professional Tax is a state-level tax levied on profession, trade, calling, and employment, deducted from monthly employee salaries.",
    whatIsIt: "Employers are required to deduct Professional Tax from employee gross monthly earnings and deposit it with the state government. Maximum PT payable per year is capped at ₹2,500 under Article 276 of the Constitution.",
    scope: "Applicable to salaried employees, doctors, lawyers, chartered accountants, and companies. Rate structures differ by state.",
    applicability: "Applies to all employers who hire employees. Registration is mandatory within 30 days of hiring.",
    data: {
      "Maharashtra": {
        slabs: [
          { range: "Gross salary up to ₹7,500", tax: "Nil" },
          { range: "Gross salary ₹7,501 to ₹10,000", tax: "₹175 per month" },
          { range: "Gross salary above ₹10,000", tax: "₹200 per month (₹250 in February)" }
        ]
      },
      "Karnataka": {
        slabs: [
          { range: "Gross salary up to ₹25,000", tax: "Nil" },
          { range: "Gross salary above ₹25,000", tax: "₹200 per month" }
        ]
      },
      "Tamil Nadu": {
        slabs: [
          { range: "Gross half-yearly salary up to ₹21,000", tax: "Nil" },
          { range: "Gross half-yearly salary ₹21,001 - ₹30,000", tax: "₹135 per half-year" },
          { range: "Gross half-yearly salary ₹30,001 - ₹45,000", tax: "₹315 per half-year" },
          { range: "Gross half-yearly salary ₹45,001 - ₹60,000", tax: "₹690 per half-year" },
          { range: "Gross half-yearly salary ₹60,001 - ₹75,000", tax: "₹1,025 per half-year" },
          { range: "Gross half-yearly salary above ₹75,000", tax: "₹1,250 per half-year (₹2,500/yr max)" }
        ]
      },
      "Delhi": {
        slabs: [
          { range: "All salary brackets", tax: "Nil (Professional Tax is not applicable in Delhi)" }
        ]
      },
      "Telangana": {
        slabs: [
          { range: "Gross salary up to ₹15,000", tax: "Nil" },
          { range: "Gross salary ₹15,001 - ₹20,000", tax: "₹150 per month" },
          { range: "Gross salary above ₹20,000", tax: "₹200 per month" }
        ]
      }
    }
  },
  "leaves-working-hours": {
    id: "leaves-working-hours",
    title: "Leaves & Working Hours",
    introduction: "Regulates daily/weekly hours of work, overtime rates, weekly holidays, rest intervals, and annual leave rules.",
    whatIsIt: "Standardizes working terms. Most states require: max 9 hours work per day, max 48 hours work per week. Overtime is paid at double the normal wage rate.",
    scope: "Applies to all shops, commercial establishments, and factories.",
    applicability: "Mandatory for all employers under the Shop & Establishment Act and Factories Act.",
    data: {
      "Maharashtra": {
        weeklyOff: "Mandatory 1 day off per week",
        maxDailyHours: "9 hours (spread over max 11 hours including breaks)",
        overtime: "Double the normal wage rate (max 125 Operating Theatres (OT) hours in a quarter)",
        annualLeave: "1.25 Earned Leaves for every 20 days worked (max 45 cumulative carry forward)",
        sickLeave: "8 days casual and sick leaves per year"
      },
      "Karnataka": {
        weeklyOff: "Mandatory 1 day off",
        maxDailyHours: "9 hours (max 48 hours/week)",
        overtime: "Double the normal wage rate (max 50 Operating Theatres (OT) hours in a quarter)",
        annualLeave: "1 day Earned Leave for every 20 days worked (max 30 carry forward)",
        sickLeave: "12 days casual and sick leaves per year"
      },
      "Tamil Nadu": {
        weeklyOff: "Mandatory 1 day off",
        maxDailyHours: "9 hours",
        overtime: "Double the normal wage rate",
        annualLeave: "12 days Earned Leave per year",
        sickLeave: "12 days sick leave + 12 days casual leave"
      },
      "Delhi": {
        weeklyOff: "Mandatory 1 day off",
        maxDailyHours: "9 hours",
        overtime: "Double the normal wage rate",
        annualLeave: "15 days Privilege Leaves per year",
        sickLeave: "12 days sick/casual leave per year"
      },
      "Telangana": {
        weeklyOff: "Mandatory 1 day off",
        maxDailyHours: "9 hours",
        overtime: "Double the normal wage rate",
        annualLeave: "15 days Earned Leaves per year",
        sickLeave: "12 days casual/sick leave"
      }
    }
  },
  "holidays-list": {
    id: "holidays-list",
    title: "National & Festival Holidays List",
    introduction: "Ensures workers receive mandatory paid holidays on national occasions and local religious festivals.",
    whatIsIt: "Most states mandate 3 National Holidays (January 26, August 15, October 2) and an additional 5 to 7 Festival Holidays chosen by the employer and employee committees.",
    scope: "Applicable to all commercial and factory establishments.",
    applicability: "Paid holidays are mandatory for all employees. Working on a national holiday requires double pay and a compensatory off.",
    data: {
      "Maharashtra": {
        nationalHolidays: "3 Mandatory (26 Jan, 15 Aug, 2 Oct) + Maharashtra Day (1 May)",
        festivalHolidays: "4 additional holidays (total 8 paid holidays)",
        list: ["Jan 26: Republic Day", "May 1: Maharashtra Day", "Aug 15: Independence Day", "Oct 2: Gandhi Jayanti", "Nov: Diwali", "Sep: Ganesh Chaturthi", "Mar: Holi", "Dec 25: Christmas"]
      },
      "Karnataka": {
        nationalHolidays: "3 Mandatory + Kannada Rajyotsava (1 Nov)",
        festivalHolidays: "6 additional holidays (total 10 paid holidays)",
        list: ["Jan 26: Republic Day", "Aug 15: Independence Day", "Oct 2: Gandhi Jayanti", "Nov 1: Kannada Rajyotsava", "Nov: Deepavali", "Oct: Ayudha Pooja", "Sep: Ganesha Festival", "Apr: Ugadi", "Dec 25: Christmas", "Jan: Sankranti"]
      },
      "Tamil Nadu": {
        nationalHolidays: "3 Mandatory + May Day (1 May)",
        festivalHolidays: "5 additional holidays (total 9 paid holidays)",
        list: ["Jan 26: Republic Day", "May 1: May Day", "Aug 15: Independence Day", "Oct 2: Gandhi Jayanti", "Jan: Pongal", "Jan: Mattu Pongal", "Apr: Tamil New Year", "Oct: Ayudha Pooja", "Nov: Deepavali"]
      },
      "Delhi": {
        nationalHolidays: "3 Mandatory",
        festivalHolidays: "5 additional festival holidays (total 8)",
        list: ["Jan 26: Republic Day", "Aug 15: Independence Day", "Oct 2: Gandhi Jayanti", "Mar: Holi", "Sep: Dussehra", "Nov: Diwali", "Nov: Guru Nanak Jayanti", "Dec 25: Christmas"]
      },
      "Telangana": {
        nationalHolidays: "3 Mandatory",
        festivalHolidays: "5 additional holidays (total 8)",
        list: ["Jan 26: Republic Day", "Aug 15: Independence Day", "Oct 2: Gandhi Jayanti", "Jan: Sankranti", "Mar: Ugadi", "Oct: Dussehra (Bathukamma)", "Nov: Diwali", "Dec 25: Christmas"]
      }
    }
  },
  "nfh-details": {
    id: "nfh-details",
    title: "National & Festival Holidays (NFH) Act Details",
    introduction: "National and Festival Holidays legislation governs the mandatory minimum number of paid national and festival holidays that employers must grant to employees every calendar year.",
    whatIsIt: "State-specific National & Festival Holidays Acts specify the minimum statutory holidays (usually 3 national holidays on Jan 26, Aug 15, and Oct 2, plus local festival holidays). Working on these days requires paying double wages or providing a compensatory off with single wages.",
    scope: "Covers all shops, commercial establishments, industrial undertakings, and factories operating within the respective state boundaries.",
    applicability: "Mandatory for all registered establishments. Employers must choose the festival holidays in consultation with employees and submit the list (Form V or state equivalents) to the local labor inspector before December 31st for the upcoming year.",
    data: {
      "Maharashtra": {
        governingAct: "Maharashtra Industrial Establishments (National and Festival Holidays) Act, 1969",
        minimumHolidays: "8 Paid Holidays per year (3 National + 5 Festival)",
        mandatoryDays: "Jan 26 (Republic Day), May 1 (Maharashtra Day), Aug 15 (Independence Day), Oct 2 (Gandhi Jayanti)",
        complianceFiling: "Form IV submission for choice of holidays to the local Facilitator/Inspector"
      },
      "Karnataka": {
        governingAct: "Karnataka Industrial Establishments (National and Festival Holidays) Act, 1963",
        minimumHolidays: "10 Paid Holidays per year (3 National + 7 Festival)",
        mandatoryDays: "Jan 26 (Republic Day), May 1 (May Day), Aug 15 (Independence Day), Oct 2 (Gandhi Jayanti), Nov 1 (Kannada Rajyotsava)",
        complianceFiling: "Form V submission of proposed holiday list to the Assistant Labour Commissioner"
      },
      "Tamil Nadu": {
        governingAct: "Tamil Nadu Industrial Establishments (National and Festival Holidays) Act, 1958",
        minimumHolidays: "9 Paid Holidays per year (3 National + 6 Festival)",
        mandatoryDays: "Jan 26 (Republic Day), May 1 (May Day), Aug 15 (Independence Day), Oct 2 (Gandhi Jayanti)",
        complianceFiling: "Form V submission to the Inspector of Labour for holiday approvals"
      },
      "Delhi": {
        governingAct: "Delhi Industrial Establishments (National and Festival Holidays) Act",
        minimumHolidays: "8 Paid Holidays per year (3 National + 5 Festival)",
        mandatoryDays: "Jan 26 (Republic Day), Aug 15 (Independence Day), Oct 2 (Gandhi Jayanti)",
        complianceFiling: "Display of approved holiday list in a prominent place (Form A)"
      },
      "Telangana": {
        governingAct: "Telangana Industrial Establishments (National and Festival Holidays) Act",
        minimumHolidays: "8 Paid Holidays per year (3 National + 5 Festival)",
        mandatoryDays: "Jan 26 (Republic Day), Aug 15 (Independence Day), Oct 2 (Gandhi Jayanti)",
        complianceFiling: "Form V submission to the local Inspector of Shops & Establishments"
      }
    }
  }
};

import { sgrcScrapedDatabase } from "./sgrc-scraped-data";
import type { StatutoryDocument as ScrapedStatutoryDocument } from "./sgrc-scraped-data";
export type StatutoryDocument = ScrapedStatutoryDocument;

const mergeDocs = (staticDocs: StatutoryDocument[], scrapedDocs: StatutoryDocument[] = []): StatutoryDocument[] => {
  const merged = [...staticDocs];
  const seenIds = new Set(staticDocs.map(d => d.id));
  const seenTitles = new Set(staticDocs.map(d => d.title.toLowerCase().trim()));
  
  for (const doc of scrapedDocs) {
    const normalizedTitle = doc.title.toLowerCase().trim();
    if (!seenIds.has(doc.id) && !seenTitles.has(normalizedTitle)) {
      merged.push(doc);
      seenIds.add(doc.id);
      seenTitles.add(normalizedTitle);
    }
  }
  return merged;
};

const staticLabourCodes: StatutoryDocument[] = [
  {
    id: "code-on-wages",
    title: "Code on Wages, 2019",
    enactedBy: "Central Parliament of India",
    year: "2019",
    objective: "Consolidates and rationalizes four central labor laws concerning wages, bonus, and equal remuneration to ensure minimum wage guarantees and timely payments across all employments.",
    keyProvisions: [
      "Universal minimum wage applicability to both organized and unorganized sectors.",
      "Definition of 'Wages' standardized to 50% of total compensation to prevent artificial reduction of retirement benefits.",
      "Timely payment of wages mandated: by 7th of the following month for monthly salaried staff.",
      "Gender neutrality in wage determination and hiring policies."
    ],
    applicability: "All establishments, employees, and workers across India, regardless of salary cap or headcount."
  },
  {
    id: "industrial-relations-code",
    title: "Industrial Relations Code, 2020",
    enactedBy: "Central Parliament of India",
    year: "2020",
    objective: "Consolidates laws relating to Trade Unions, conditions of employment, and investigation and settlement of industrial disputes to foster industrial peace and productivity.",
    keyProvisions: [
      "Threshold for standing orders (mandatory service rules) raised from 100 to 300 workers.",
      "Establishment of worker re-skilling funds to support retrenched staff.",
      "Mandatory 14-day notice period before any strike or lock-out.",
      "Single negotiating union status for unions with 51%+ membership representation."
    ],
    applicability: "Factories, mines, commercial establishments, and registered trade unions."
  },
  {
    id: "code-on-social-security",
    title: "Code on Social Security, 2020",
    enactedBy: "Central Parliament of India",
    year: "2020",
    objective: "Amalgamates nine central social security laws to extend health, pension, maternity, and disability benefits to all employees, including gig and platform workers.",
    keyProvisions: [
      "Statutory social security coverage extended to gig, platform, and unorganized sector workers.",
      "Establishment of a National Social Security Board and Social Security Fund.",
      "Gratuity tenure reduced from 5 years to 3 years for working journalists and contract staff.",
      "Universal registration through Aadhaar-seeded UAN portals."
    ],
    applicability: "All commercial establishments, factories, shops, gig platforms, and contract workforces."
  },
  {
    id: "osh-working-conditions-code",
    title: "Occupational Safety, Health and Working Conditions Code, 2020",
    enactedBy: "Central Parliament of India",
    year: "2020",
    objective: "Consolidates thirteen laws regulating health, safety, and working conditions in factories, mines, plantations, and construction sites.",
    keyProvisions: [
      "Mandatory annual health check-ups at employer's expense for specified employee age groups.",
      "Right to overtime wages calculated at double the regular hourly rate.",
      "Employment of women in night shifts allowed subject to safety and consent measures.",
      "Single registration, single license, and single compliance return process."
    ],
    applicability: "Factories with 20+ workers (with power) or 40+ workers (without power), mines, and commercial units."
  }
];

const staticLeiActs: StatutoryDocument[] = [
  {
    id: "payment-of-gratuity-act",
    title: "The Payment of Gratuity Act, 1972",
    enactedBy: "Parliament of India",
    year: "1972",
    objective: "Ensures a terminal monetary benefit to employees in factories, shops, and establishments upon retirement, resignation, or disablement.",
    keyProvisions: [
      "Calculated at 15 days' salary for every completed year of service.",
      "Forfeiture allowed only in cases of damage to property or moral turpitude.",
      "Maximum tax-free gratuity capped at ₹20 Lakhs."
    ],
    applicability: "Every factory, mine, oilfield, plantation, port, railway company, and shops/establishments with 10+ employees."
  },
  {
    id: "epf-provisions-act",
    title: "The Employees' Provident Funds Act, 1952",
    enactedBy: "Parliament of India",
    year: "1952",
    objective: "Provides retirement security, family pensions, and insurance benefits for industrial and commercial workforces.",
    keyProvisions: [
      "12% equal contribution by employer and employee on basic salary + DA.",
      "8.33% of employer's share diverted to Employees' Pension Scheme (EPS).",
      "EDLI (Insurance) payout up to ₹7 Lakhs in the event of employee death during service."
    ],
    applicability: "Every factory and commercial establishment employing 20 or more persons."
  },
  {
    id: "esi-act",
    title: "The Employees' State Insurance Act, 1948",
    enactedBy: "Parliament of India",
    year: "1948",
    objective: "Provides integrated health insurance, sickness benefit, maternity care, and disability payouts to low-income industrial employees.",
    keyProvisions: [
      "Employer contributes 3.25%, employee contributes 0.75% of monthly salary.",
      "Applies to workers earning up to ₹21,000 per month (₹25,000 for persons with disabilities).",
      "Full medical care coverage for self and dependents in ESI network hospitals."
    ],
    applicability: "Non-seasonal factories, commercial units, hotels, and restaurants employing 10 or more persons."
  },
  {
    id: "contract-labour-act",
    title: "The Contract Labour (Regulation & Abolition) Act, 1970",
    enactedBy: "Parliament of India",
    year: "1970",
    objective: "Regulates contract labour employment to prevent exploitation and mandates licensing and registration guidelines.",
    keyProvisions: [
      "Principal Employers must register and Contractors must obtain licenses.",
      "Mandatory provision of basic amenities: clean drinking water, rest rooms, and first-aid boxes.",
      "Principal employer is liable for wage payments if the contractor defaults."
    ],
    applicability: "Establishments and contractors employing 20 or more contract workers (or 50+ in some states)."
  },
  {
    id: "posh-act-2013",
    title: "The POSH Act, 2013",
    enactedBy: "Parliament of India",
    year: "2013",
    objective: "Provides safe workplace conditions for women by prohibiting, preventing, and redressing sexual harassment.",
    keyProvisions: [
      "Mandatory constitution of Internal Committee (IC) in all branches with 10+ employees.",
      "Submission of an annual POSH report to the local District Officer.",
      "Conducting regular employee awareness workshops."
    ],
    applicability: "All workplaces, including corporate offices, hospitals, factories, and academic institutions."
  }
];

const staticLeiRules: StatutoryDocument[] = [
  {
    id: "wages-rules",
    title: "Code on Wages (Central) Advisory Board Rules, 2021",
    enactedBy: "Ministry of Labour and Employment",
    year: "2021",
    objective: "Sets procedural guidelines for the creation and operation of the central advisory board for fixing minimum wage rates.",
    keyProvisions: [
      "Defines constitution, terms of office, and travel allowance protocols for board members.",
      "Establishes voting and quorum rules for minimum wage evaluations."
    ],
    applicability: "Central advisory board members and regulatory payroll bodies."
  },
  {
    id: "social-security-rules",
    title: "Code on Social Security (Central) Rules, 2020",
    enactedBy: "Ministry of Labour and Employment",
    year: "2020",
    objective: "Details procedural guidelines for Aadhaar-seeded registrations, EPF/ESI interest calculations, and Social Security Fund collections.",
    keyProvisions: [
      "Procedures for online self-registration of gig and platform workers.",
      "Slabs and rules for calculating interest rates on delayed gratuity payments."
    ],
    applicability: "All employers, gig platform aggregators, and EPFO/ESIC systems."
  }
];

const staticLeiSchemes: StatutoryDocument[] = [
  {
    id: "pm-sym-scheme",
    title: "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)",
    enactedBy: "Ministry of Labour and Employment",
    year: "2019",
    objective: "Voluntary pension scheme to provide old-age security to unorganized workers earning less than ₹15,000 monthly.",
    keyProvisions: [
      "Assures a minimum monthly pension of ₹3,000 after attaining 60 years of age.",
      "50:50 matching contribution model between the worker and the Central Government."
    ],
    applicability: "Unorganized workers aged 18 to 40 years with gross income under ₹15,000."
  }
];

const staticLeiRegulations: StatutoryDocument[] = [
  {
    id: "esi-general-regulations",
    title: "Employees' State Insurance (General) Regulations, 1950",
    enactedBy: "Employees' State Insurance Corporation",
    year: "1950",
    objective: "Codifies administrative and operational procedures for registering employees, filing medical certificates, and claiming cash benefits.",
    keyProvisions: [
      "Specifies timelines for submitting medical certificates for sick leaves.",
      "Mandates procedures for employer returns and allocation of medical benefits."
    ],
    applicability: "All factories, medical officers, and workers covered under the ESI scheme."
  }
];

const staticLeiGazette: StatutoryDocument[] = [
  {
    id: "epfo-higher-pension-notif",
    title: "EPFO Higher Pension Joint Option Circular",
    enactedBy: "Employees' Provident Fund Organisation",
    year: "2023",
    objective: "Provides a compliance framework for employees and employers to jointly submit options for pension contributions on higher salaries.",
    keyProvisions: [
      "Detailed online joint declaration submission procedures via EPFO portal.",
      "Specifies method for transferring retrospective employer funds from EPF to EPS."
    ],
    applicability: "EPF members who retired or remained in service after September 1, 2014."
  }
];

const staticEhsActs: StatutoryDocument[] = [
  {
    id: "environment-protection-act",
    title: "The Environment (Protection) Act, 1986",
    enactedBy: "Parliament of India",
    year: "1986",
    objective: "Umbrella legislation enabling the Central Government to protect the environment, regulate emissions, and manage industrial hazards.",
    keyProvisions: [
      "Empowers government to set national standards for air, water, and soil quality.",
      "Restricts discharge of pollutants exceeding prescribed limits.",
      "Power of entry, inspection, and taking samples from industrial premises."
    ],
    applicability: "All industrial facilities, commercial units, and agricultural activities in India."
  },
  {
    id: "water-pollution-act",
    title: "The Water (Prevention and Control of Pollution) Act, 1974",
    enactedBy: "Parliament of India",
    year: "1974",
    objective: "Prohibits contamination of water bodies, sets up pollution control boards, and establishes system of industrial consents.",
    keyProvisions: [
      "Requirement to obtain Consent to Establish (CTE) and Consent to Operate (CTO) before starting production.",
      "Mandates setting up Effluent Treatment Plants (ETPs) for industrial wastes.",
      "Prohibits dumping toxic or polluting matter into streams or wells."
    ],
    applicability: "Any industry discharging sewage or trade effluents into water bodies or public sewers."
  },
  {
    id: "air-pollution-act",
    title: "The Air (Prevention and Control of Pollution) Act, 1981",
    enactedBy: "Parliament of India",
    year: "1981",
    objective: "Combats industrial and vehicle exhaust fumes by setting ambient air quality standards and declaring air pollution control areas.",
    keyProvisions: [
      "Mandates Consent to Operate (CTO) for operating fuel burners, boilers, or heavy machinery.",
      "Requires industries to install air pollution control devices (scrubbers, electrostatic precipitators).",
      "Allows inspectors to conduct stack monitoring audits."
    ],
    applicability: "All commercial and factory units utilizing boilers, furnaces, generators, or releasing exhaust gases."
  },
  {
    id: "public-liability-insurance-act",
    title: "The Public Liability Insurance Act, 1991",
    enactedBy: "Parliament of India",
    year: "1991",
    objective: "Mandates public liability insurance coverage for industries handling specified hazardous materials to provide immediate relief to accident victims.",
    keyProvisions: [
      "Mandates buying one or more insurance policies before operating hazardous projects.",
      "Defines limits of liability and immediate relief rules without requiring proof of negligence."
    ],
    applicability: "Owners/operators of facilities handling chemicals above specified quantity thresholds."
  }
];

const staticEhsRules: StatutoryDocument[] = [
  {
    id: "hazardous-waste-rules",
    title: "The Hazardous Wastes (Management & Transboundary Movement) Rules, 2016",
    enactedBy: "Ministry of Environment, Forest and Climate Change (MoEFCC)",
    year: "2016",
    objective: "Regulates generation, storage, recovery, import, and disposal of hazardous waste materials.",
    keyProvisions: [
      "Requirement to obtain authorization from State Pollution Control Board for waste storage.",
      "Mandatory record maintenance in Form 3 and filing annual returns in Form 4.",
      "Safe packaging, labeling, and manifesting (Form 10) during waste transit."
    ],
    applicability: "Every facility generating hazardous sludge, battery waste, used oils, or chemical residues."
  },
  {
    id: "e-waste-management-rules",
    title: "The E-Waste (Management) Rules, 2022",
    enactedBy: "Ministry of Environment, Forest and Climate Change",
    year: "2022",
    objective: "Establishes a circular economy for electrical and electronic equipment through Extended Producer Responsibility (EPR) recycling targets.",
    keyProvisions: [
      "Mandatory EPR registration and recycling target fulfillment on Central Portal.",
      "Restricts hazardous chemicals in electronic components (RoHS directives)."
    ],
    applicability: "Producers, importers, bulk consumers, and recyclers of electrical and electronic wastes."
  }
];

const staticEhsRegulations: StatutoryDocument[] = [
  {
    id: "iso-14001-standards",
    title: "ISO 14001:2015 Environmental Standards",
    enactedBy: "International Organization for Standardization",
    year: "2015",
    objective: "Specifies requirements for an environmental management system that an organization can use to enhance its environmental performance.",
    keyProvisions: [
      "Requires environmental policy establishment and continuous improvement metrics.",
      "Guidelines for lifecycle environmental risk identification and compliance audits."
    ],
    applicability: "Organizations seeking to establish, implement, maintain, and improve an environmental posture."
  },
  {
    id: "iso-45001-standards",
    title: "ISO 45001:2018 Health & Safety Standards",
    enactedBy: "International Organization for Standardization",
    year: "2018",
    objective: "Specifies requirements for an occupational health and safety management system to prevent work-related injury and ill health.",
    keyProvisions: [
      "Requires systematic hazard identification, worker consultation, and risk controls.",
      "Defines frameworks for incident investigation and emergency response readiness."
    ],
    applicability: "All organizations aiming to protect worker health, reduce accidents, and meet safety duties."
  }
];

const staticEhsGazette: StatutoryDocument[] = [
  {
    id: "auto-green-consent-notif",
    title: "SPCB Automatic Green Consent Renewal Notification",
    enactedBy: "State Pollution Control Boards",
    year: "2024",
    objective: "Streamlines environmental compliance through automated online renewal approvals for low-pollution Green Category industries.",
    keyProvisions: [
      "Allows automatic consent renewal based on online self-declaration of compliance.",
      "Specifies audit penalties and verification triggers for wrong self-declarations."
    ],
    applicability: "All registered Green Category industrial units operating with active CTOs."
  }
];

const staticFccActs: StatutoryDocument[] = [
  {
    id: "companies-act-2013",
    title: "The Companies Act, 2013",
    enactedBy: "Parliament of India",
    year: "2013",
    objective: "Codifies rules for incorporation, corporate governance, director responsibilities, financial audits, and transparency.",
    keyProvisions: [
      "Mandatory Corporate Social Responsibility (CSR) of 2% net profits for eligible companies.",
      "Introduction of One Person Company (OPC) and Small Company classifications.",
      "Requirement of at least one resident director and one woman director on boards.",
      "Stricter penalties for corporate fraud, financial defaults, and listing violations."
    ],
    applicability: "All public, private, section 8, and foreign subsidiaries incorporated in India."
  },
  {
    id: "cgst-act-2017",
    title: "The Central Goods and Services Tax (CGST) Act, 2017",
    enactedBy: "Parliament of India",
    year: "2017",
    objective: "Levies tax on all intra-state supplies of goods or services, replacing multiple state-level indirect taxes.",
    keyProvisions: [
      "Mandatory registration for supply of services with annual turnover > ₹20 Lakhs (₹40 Lakhs for goods).",
      "Quarterly and monthly filing of GSTR-1, GSTR-3B, and annual GSTR-9 returns.",
      "Generation of E-Way Bills for goods movement exceeding ₹50,000.",
      "Input Tax Credit (ITC) mechanism to prevent cascading of tax liabilities."
    ],
    applicability: "All businesses engaged in supply of goods or rendering services across India."
  },
  {
    id: "sez-act-2005",
    title: "The Special Economic Zones Act, 2005",
    enactedBy: "Parliament of India",
    year: "2005",
    objective: "Establishes Special Economic Zones to stimulate exports, create jobs, and offer fiscal tax incentives.",
    keyProvisions: [
      "100% Income Tax exemption on export income for the first 5 years under Section 10AA.",
      "Duty-free import of raw materials, capital goods, and machinery for development.",
      "Single-window clearances for central and state approvals."
    ],
    applicability: "Developers of SEZs, co-developers, and individual units set up inside SEZs."
  },
  {
    id: "fema-act-1999",
    title: "The Foreign Exchange Management Act (FEMA), 1999",
    enactedBy: "Parliament of India",
    year: "1999",
    objective: "Regulates foreign exchange payments and cross-border capital transactions to encourage foreign investments.",
    keyProvisions: [
      "Classification of foreign transactions into Current Account and Capital Account.",
      "Mandatory reporting of Foreign Direct Investment (FDI) via Single Master Form (SMF).",
      "Strict interest and penalty ceilings on External Commercial Borrowings (ECB)."
    ],
    applicability: "All branches, offices, agencies, and residents of India receiving foreign capital or executing cross-border payments."
  }
];

const staticFccRules: StatutoryDocument[] = [
  {
    id: "companies-csr-rules",
    title: "Companies (Corporate Social Responsibility Policy) Rules, 2014",
    enactedBy: "Ministry of Corporate Affairs",
    year: "2014",
    objective: "Provides rules and formats for computing net profits, allocating funds, and registering CSR projects.",
    keyProvisions: [
      "Mandatory creation of board-level CSR committees for eligible companies.",
      "Restricts CSR benefits to projects within India, with priority given to local operational areas."
    ],
    applicability: "Companies with net worth >= ₹500 Cr, turnover >= ₹1,000 Cr, or net profit >= ₹5 Cr."
  }
];

const staticFccRegulations: StatutoryDocument[] = [
  {
    id: "sebi-lodr-regulations",
    title: "SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015",
    enactedBy: "Securities and Exchange Board of India (SEBI)",
    year: "2015",
    objective: "Standardizes listing terms and disclosure criteria for public listed entities across stock exchanges.",
    keyProvisions: [
      "Mandates quarterly financial result disclosures and board meeting notification circulars.",
      "Specifies board composition rules, audits, and shareholding pattern filings."
    ],
    applicability: "All publicly traded companies listed on the NSE, BSE, or regional exchanges."
  }
];

const staticFccGazette: StatutoryDocument[] = [
  {
    id: "mca-v3-filing-circular",
    title: "MCA circular on MCA21 V3 Portal Transition",
    enactedBy: "Ministry of Corporate Affairs",
    year: "2023",
    objective: "Establishes transition rules, due date extensions, and technical helpdesks during web-form migration.",
    keyProvisions: [
      "Automated offline form filing rules and digital signature registration guidelines.",
      "Filing fees exemptions for specified delayed corporate returns."
    ],
    applicability: "All directors, company secretaries, and incorporated firms in India."
  }
];

export const sgrcStatutoryDatabase = {
  lei: {
    "labour-codes": staticLabourCodes,
    acts: mergeDocs(staticLeiActs, sgrcScrapedDatabase.lei.acts),
    rules: mergeDocs(staticLeiRules, sgrcScrapedDatabase.lei.rules),
    regulations: mergeDocs(staticLeiRegulations, sgrcScrapedDatabase.lei.regulations),
    schemes: mergeDocs(staticLeiSchemes, sgrcScrapedDatabase.lei.schemes),
    gazette: mergeDocs(staticLeiGazette, sgrcScrapedDatabase.lei.gazette)
  },
  ehs: {
    acts: mergeDocs(staticEhsActs, sgrcScrapedDatabase.ehs.acts),
    rules: mergeDocs(staticEhsRules, sgrcScrapedDatabase.ehs.rules),
    regulations: mergeDocs(staticEhsRegulations, sgrcScrapedDatabase.ehs.regulations),
    gazette: mergeDocs(staticEhsGazette, sgrcScrapedDatabase.ehs.gazette)
  },
  fcc: {
    acts: mergeDocs(staticFccActs, sgrcScrapedDatabase.fcc.acts),
    rules: mergeDocs(staticFccRules, sgrcScrapedDatabase.fcc.rules),
    regulations: mergeDocs(staticFccRegulations, sgrcScrapedDatabase.fcc.regulations),
    gazette: mergeDocs(staticFccGazette, sgrcScrapedDatabase.fcc.gazette)
  }
};
