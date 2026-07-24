export interface ManpowerService {
  id: string;
  heroTitle: string;
  shortDescription: string;
  overview: string;
  keyServices: string[];
  industriesServed: string[];
  whyChooseUs: string[];
  technologyCompliance: string[];
  benefits: string[];
  cta: string;
}

export const manpowerServicesData: ManpowerService[] = [
  {
    id: "permanent-staffing",
    heroTitle: "Permanent Staffing (Direct Hire)",
    shortDescription: "Acquisition of full-time, indefinite employees placed directly onto your organization's payroll from day one.",
    overview: "This is the foundational offering for building core workforce structures that define organizational culture and drive long-term strategic objectives. Our specialized approach ensures we secure talent that truly aligns with your vision.",
    keyServices: [
      "Job Profiling & Needs Analysis",
      "Talent Sourcing & Headhunting",
      "Advanced 5-Phase Screening",
      "Client Presentation & Coordinator",
      "Offer Management & Negotiation",
      "Onboarding Handover & Follow-Up"
    ],
    industriesServed: [
      "Manufacturing & Industrial",
      "Healthcare & Life Sciences",
      "IT & Technology Services",
      "BFSI",
      "Logistics & Supply Chain",
      "Retail & E-Commerce"
    ],
    whyChooseUs: [
      "Access Passive Markets",
      "Rigorous Assessment Process",
      "Reduced Risk of Mis-Hire",
      "90-day Replacement Guarantee",
      "Dedicated Account Management",
      "Culture Fit Validation"
    ],
    technologyCompliance: [
      "AI-Driven Video Interviewing",
      "Psychometric Assessment",
      "Emotional Stability Mapping",
      "Comprehensive Background Vetting"
    ],
    benefits: [
      "Cultural Foundation",
      "Long-Term Cost Efficiency",
      "Full Control over Employee Path",
      "Guarantee Protection",
      "Succession Planning",
      "Deep Team Integration"
    ],
    cta: "Build your core workforce with our permanent staffing solutions."
  },
  {
    id: "executive-search",
    heroTitle: "Executive Search & Retained Placement",
    shortDescription: "Discreet and highly consultative retained search for C-suite, VP, and Director-level leadership roles.",
    overview: "Built on deep market mapping, psychometrics, and 360-degree reference networks to secure board-ready candidates who can steer your organization through its next phase of growth.",
    keyServices: [
      "Position Architecture",
      "Market Mapping",
      "Discreet Outreach",
      "Executive Assessment",
      "Shortlist Presentation & Interviews",
      "Offer Negotiation & Transition"
    ],
    industriesServed: [
      "Manufacturing & Industrial",
      "Healthcare & Life Sciences",
      "IT & Technology Services",
      "BFSI",
      "Logistics & Supply Chain",
      "Retail & E-Commerce"
    ],
    whyChooseUs: [
      "Access to Top 70% Passive Executives",
      "Total Confidentiality",
      "Strategic Advisory",
      "90%+ Completion Rate",
      "Board-Ready Candidates Validation",
      "Extensive Industry Networks"
    ],
    technologyCompliance: [
      "Confidentiality Agreements (NDA)",
      "360-Degree Referencing",
      "Psychometric Profiling",
      "Executive Fit Scorecards"
    ],
    benefits: [
      "Secure Visionary Leadership",
      "Protect Brand Positioning",
      "Mitigate Risk in Leadership Hiring",
      "Guaranteed Dedicated Resources",
      "Clarify Strategic Direction",
      "Seamless Executive Transition"
    ],
    cta: "Secure visionary leadership for your organization today."
  },
  {
    id: "contract-staffing",
    heroTitle: "Contract & Temp Staffing (Fixed-Term)",
    shortDescription: "Flexible, on-demand workforce solutions to manage seasonal peaks and specialized projects.",
    overview: "Contract staffing places qualified professionals on our payroll for a defined project duration. We act as the Employer of Record (EOR), handling all payroll, taxes, insurance, and labor law compliance, while you direct their daily work.",
    keyServices: [
      "Scope & Duration Alignment",
      "Rapid Talent Sourcing",
      "Compliance & Payroll Setup",
      "Deployment & Integration",
      "Lifecycle Management",
      "Project-Based Deployments"
    ],
    industriesServed: [
      "Manufacturing & Industrial",
      "Healthcare & Life Sciences",
      "IT & Technology Services",
      "BFSI",
      "Logistics & Supply Chain",
      "Retail & E-Commerce"
    ],
    whyChooseUs: [
      "Pre-vetted Contractor Pools",
      "Employer of Record Services",
      "Zero Employment Liability",
      "End-to-End Payroll Management",
      "Speed to Deploy",
      "Agile Workforce Scaling"
    ],
    technologyCompliance: [
      "Statutory Labor Law Compliance",
      "Digital Timesheets & Approvals",
      "Workers' Compensation Management",
      "Tax Filings & Deductions"
    ],
    benefits: [
      "Financial Flexibility",
      "Zero Employment Liability",
      "Niche Expertise On-Demand",
      "Rapid Deployment Cycles",
      "Seamless Scalability",
      "Total Compliance Shield"
    ],
    cta: "Scale your workforce dynamically without the compliance overhead."
  },
  {
    id: "sla-managed",
    heroTitle: "Managed Services Program (MSP)",
    shortDescription: "A comprehensive workforce partnership managing your entire contingent labor spend and sub-vendors.",
    overview: "We act as your Master Vendor, assuming end-to-end operational accountability for your compliance posture under strict SLAs. We standardize rate cards, compliance, and VMS technologies to optimize your contingent workforce.",
    keyServices: [
      "Spend & Vendor Audit",
      "Vendor Panel Selection",
      "VMS Platform Integration",
      "Transition & Launch",
      "Continuous Optimization",
      "Consolidated Billing"
    ],
    industriesServed: [
      "Manufacturing & Industrial",
      "Healthcare & Life Sciences",
      "IT & Technology Services",
      "BFSI",
      "Logistics & Supply Chain",
      "Retail & E-Commerce"
    ],
    whyChooseUs: [
      "One Master Vendor Umbrella",
      "Data-Driven Vendor Scorecards",
      "Reduced Vendor Management Overhead",
      "Guaranteed SLA Response Times",
      "Unified Compliance Standards",
      "Strategic Planning Analytics"
    ],
    technologyCompliance: [
      "Vendor Management System (VMS) Integration",
      "Consolidated Billing & Invoicing",
      "Labor Law Compliance Registers",
      "Performance Audit Dashboards"
    ],
    benefits: [
      "10-20% Direct Cost Savings",
      "Unified Statutory Compliance",
      "Total Workforce Visibility",
      "Objective Performance Management",
      "Seamless Scalability",
      "Proactive Workforce Planning"
    ],
    cta: "Optimize your contingent workforce spend with our Managed Services Program."
  },
  {
    id: "payroll-management",
    heroTitle: "Payroll & Benefits Management",
    shortDescription: "End-to-end payroll processing, tax calculations, and employee benefits administration.",
    overview: "Outsource your payroll processing and let us absorb the administrative burden. We handle error-free processing, statutory deductions, and maintain multi-state labor compliance so you can focus on core operations.",
    keyServices: [
      "Salary & Wage Processing",
      "Statutory Deductions (PF, ESI, PT, TDS)",
      "Employee Self-Service Portals",
      "Multi-State Labor Compliance",
      "Year-End Tax Filings",
      "Labor Dispute Advisory"
    ],
    industriesServed: [
      "Manufacturing & Industrial",
      "Healthcare & Life Sciences",
      "IT & Technology Services",
      "BFSI",
      "Logistics & Supply Chain",
      "Retail & E-Commerce"
    ],
    whyChooseUs: [
      "Automated & Highly Accurate Cycles",
      "Zero Client Administrative Overhead",
      "Expert Labor Attorneys Advisory",
      "Centralized Compliance Grid",
      "On-Time Monthly Processing",
      "Comprehensive Reporting"
    ],
    technologyCompliance: [
      "Secure Payroll APIs",
      "Digital Payslips & Portals",
      "Pre-vetted Deposit Challans Logs",
      "Zero-Deviation Audit Certificates"
    ],
    benefits: [
      "Error-Free Payroll Execution",
      "Total Statutory Compliance",
      "Reduced Administrative Costs",
      "Enhanced Employee Experience",
      "Audit-Ready Document Archives",
      "Peace of Mind"
    ],
    cta: "Streamline your payroll operations with 100% statutory compliance."
  },
  {
    id: "healthcare-manpower",
    heroTitle: "Healthcare Staffing Solutions",
    shortDescription: "Delivering trained and compliant healthcare manpower solutions for hospitals, medical colleges, nursing stations, and healthcare institutions across India.",
    overview: "Healthcare institutions require highly trained manpower to maintain hygiene, safety, patient experience, and operational excellence. Our Healthcare Staffing services are designed to support healthcare facilities with skilled professionals for housekeeping, facility management, patient support, security, and operational services.",
    keyServices: [
      "Hospital Housekeeping Services",
      "Infection Control Management",
      "Patient Care Support Services",
      "Biomedical Waste Management",
      "Patient Transport Services",
      "Front Office & Help Desk Support",
      "Healthcare Security Services",
      "Facility Maintenance Services",
      "Linen Management Services",
      "Pest Control & Hygiene Management",
      "Healthcare Facility Management"
    ],
    industriesServed: [
      "Multi-Speciality Hospitals",
      "Super Speciality Hospitals",
      "Medical Colleges",
      "Nursing Stations",
      "Primary Health Centres",
      "Diagnostic Centres",
      "Healthcare Campuses",
      "Healthcare Institutions"
    ],
    whyChooseUs: [
      "Trained Healthcare Professionals",
      "24x7 Operational Support",
      "PAN India Service Delivery",
      "Regulatory Compliance Management",
      "Dedicated Supervisors",
      "Technology Enabled Monitoring",
      "Custom Deployment Models",
      "Scalable Workforce Solutions"
    ],
    technologyCompliance: [
      "NABH Compliance",
      "Biomedical Waste Management Rules",
      "Healthcare Hygiene Standards",
      "Digital Attendance Systems",
      "QR Based Task Verification",
      "Real Time Reporting Dashboards",
      "AI Enabled Facility Monitoring",
      "SOP Based Service Delivery"
    ],
    benefits: [
      "Improved Patient Experience",
      "Higher Hygiene Standards",
      "Reduced Operational Risks",
      "Regulatory Readiness",
      "Optimized Workforce Management",
      "Increased Service Efficiency"
    ],
    cta: "Build a safer and smarter healthcare environment with our specialized manpower solutions."
  },
  {
    id: "manufacturing",
    heroTitle: "Manufacturing Support Services",
    shortDescription: "Comprehensive manpower and facility support solutions for manufacturing industries, industrial parks, and production facilities.",
    overview: "We provide end-to-end support services that help manufacturing organizations maintain operational excellence, workforce efficiency, workplace safety, and uninterrupted production environments.",
    keyServices: [
      "Industrial Manpower Deployment",
      "Shop Floor Support Services",
      "Warehouse Management Support",
      "Material Handling Services",
      "Industrial Housekeeping",
      "Facility Operations Management",
      "Security Services",
      "Administrative Support Services",
      "Maintenance Support Services",
      "Compliance Management"
    ],
    industriesServed: [
      "Automobile Manufacturing",
      "Electronics Manufacturing",
      "Textile Industries",
      "Pharmaceutical Manufacturing",
      "Industrial Parks",
      "FMCG Manufacturing",
      "Engineering Industries",
      "Logistics Facilities"
    ],
    whyChooseUs: [
      "Industry Experienced Workforce",
      "Safety First Approach",
      "Compliance Driven Operations",
      "Flexible Workforce Deployment",
      "Technology Enabled Operations",
      "Dedicated Account Management"
    ],
    technologyCompliance: [
      "Industrial Safety Standards",
      "Workforce Management Systems",
      "Digital Attendance Tracking",
      "Operational Reporting Dashboards",
      "SOP Based Service Management",
      "Incident Reporting Mechanisms"
    ],
    benefits: [
      "Increased Productivity",
      "Reduced Operational Costs",
      "Improved Workplace Safety",
      "Enhanced Workforce Efficiency",
      "Better Compliance Management"
    ],
    cta: "Empower your manufacturing operations with reliable manpower and facility support services."
  },
  {
    id: "facility-management",
    heroTitle: "Integrated Facility Management Services",
    shortDescription: "End-to-end facility management services designed to ensure seamless operations across commercial, industrial, healthcare, and institutional environments.",
    overview: "Our Integrated Facility Management services combine skilled manpower, technology-enabled monitoring, and operational excellence to manage facilities efficiently and cost effectively.",
    keyServices: [
      "Soft Services",
      "Housekeeping Services",
      "Pantry Management",
      "Pest Control",
      "Landscaping Services",
      "Waste Management",
      "Hard Services",
      "Electrical Maintenance",
      "Plumbing Services",
      "HVAC Maintenance",
      "Carpentry Services",
      "Building Maintenance",
      "Support Services",
      "Security Services",
      "Front Office Management",
      "Help Desk Services",
      "Vendor Management",
      "Asset Management"
    ],
    industriesServed: [
      "Corporate Offices",
      "Healthcare Facilities",
      "Manufacturing Industries",
      "Educational Institutions",
      "Commercial Buildings",
      "Government Organizations",
      "IT Parks",
      "Residential Communities"
    ],
    whyChooseUs: [
      "Customized Service Models",
      "Technology Driven Operations",
      "Dedicated Facility Managers",
      "PAN India Delivery Capability",
      "Preventive Maintenance Approach",
      "Enterprise Grade Service Management"
    ],
    technologyCompliance: [
      "Digital Task Monitoring",
      "QR Based Audits",
      "Real Time Reporting",
      "Compliance Tracking",
      "SLA Management",
      "Smart Facility Management Systems"
    ],
    benefits: [
      "Improved Operational Efficiency",
      "Cost Optimization",
      "Better Asset Utilization",
      "Enhanced Workplace Experience",
      "Reduced Downtime",
      "Higher Service Quality"
    ],
    cta: "Transform your facilities into smarter, safer, and more productive environments."
  },
  {
    id: "housekeeping-it",
    heroTitle: "Housekeeping Services for IT Companies & Knowledge Campuses",
    shortDescription: "Premium housekeeping solutions designed specifically for IT companies, technology parks, educational campuses, and innovation centres.",
    overview: "Modern workplaces demand world-class housekeeping standards to enhance employee productivity, workplace hygiene, and visitor experience. Our housekeeping services are tailored to meet the dynamic requirements of IT organizations and knowledge campuses.",
    keyServices: [
      "Workplace Housekeeping",
      "Campus Cleaning Services",
      "Washroom Hygiene Management",
      "Pantry Management Services",
      "Conference Room Maintenance",
      "Reception Area Management",
      "Waste Segregation Services",
      "Deep Cleaning Services",
      "Floor Care Services",
      "Employee Area Maintenance"
    ],
    industriesServed: [
      "IT Companies",
      "Technology Parks",
      "Innovation Centres",
      "Universities",
      "Knowledge Campuses",
      "Corporate Offices",
      "Training Centres",
      "Business Parks"
    ],
    whyChooseUs: [
      "Professionally Trained Workforce",
      "Dedicated Site Supervisors",
      "Corporate Service Standards",
      "Flexible Shift Operations",
      "Smart Monitoring Systems",
      "Customized Service Delivery"
    ],
    technologyCompliance: [
      "Digital Attendance Systems",
      "QR Based Cleaning Logs",
      "Real Time Monitoring",
      "Workplace Hygiene Protocols",
      "Service Level Reporting",
      "Audit Ready Documentation"
    ],
    benefits: [
      "Enhanced Workplace Experience",
      "Improved Employee Productivity",
      "Better Hygiene Standards",
      "Professional Facility Appearance",
      "Reduced Operational Burden",
      "Consistent Service Quality"
    ],
    cta: "Create exceptional workplace experiences with technology-enabled housekeeping solutions designed for modern campuses."
  },
  {
    id: "white-collar-staffing",
    heroTitle: "White Collar Staffing",
    shortDescription: "Targeted recruitment for corporate executives, IT professionals, managers, and specialized knowledge workers.",
    overview: "Our White Collar Staffing solutions connect you with pre-vetted domain experts to fill critical knowledge-worker roles swiftly. We focus on rigorous behavioral and leadership matching to ensure deep cultural alignment.",
    keyServices: [
      "Specialized Talent Sourcing",
      "Executive & Managerial Search",
      "IT & Technology Professional Placement",
      "Behavioral & Leadership Matching",
      "Knowledge Worker Contingent Staffing",
      "Rapid Placement Programs"
    ],
    industriesServed: [
      "IT & Technology Services",
      "BFSI",
      "Healthcare & Life Sciences",
      "Manufacturing & Industrial",
      "Retail & E-Commerce",
      "Consulting & Professional Services"
    ],
    whyChooseUs: [
      "Access to Pre-vetted Domain Experts",
      "Rigorous Cultural & Behavioral Alignment",
      "Rapid Placement Turnaround",
      "Deep Industry Networks",
      "Dedicated Account Management",
      "Comprehensive Skill Assessment"
    ],
    technologyCompliance: [
      "AI-Driven Candidate Matching",
      "Psychometric & Cognitive Testing",
      "Digital Credential Verification",
      "Secure Onboarding Portals"
    ],
    benefits: [
      "Accelerated Time-to-Hire",
      "Higher Retention Rates",
      "Reduced Hiring Risks",
      "Access to Passive Talent",
      "Seamless Team Integration",
      "Strategic Workforce Agility"
    ],
    cta: "Secure the specialized knowledge workers your organization needs today."
  },
  {
    id: "grey-collar-staffing",
    heroTitle: "Grey Collar Staffing",
    shortDescription: "Deployment of qualified technicians, supervisors, and specialized skilled workers balancing technical and manual skills.",
    overview: "Our Grey Collar Staffing bridges the gap between traditional blue and white-collar roles by providing certified technicians and experienced floor managers. We ensure ready-to-deploy talent for immediate operational and supervisory needs.",
    keyServices: [
      "Certified Technician Deployment",
      "Supervisory & Floor Management Staffing",
      "Specialized Trade Worker Sourcing",
      "Agile Project-Based Deployment",
      "Skill & Certification Verification",
      "Safety & Compliance Training"
    ],
    industriesServed: [
      "Manufacturing & Industrial",
      "Logistics & Supply Chain",
      "Infrastructure & Construction",
      "Energy & Utilities",
      "Healthcare Operations",
      "Telecommunications"
    ],
    whyChooseUs: [
      "Verified Credentials for Specialized Trades",
      "Experienced Floor and Project Managers",
      "Ready-to-Deploy Talent Pools",
      "Strict Adherence to Safety Standards",
      "Flexible Staffing Models",
      "Robust Replacement Guarantees"
    ],
    technologyCompliance: [
      "Digital Certification Tracking",
      "Safety Training Compliance Logs",
      "Biometric Attendance Systems",
      "Regulatory Workforce Registers"
    ],
    benefits: [
      "Immediate Operational Support",
      "Verified Technical Competence",
      "Enhanced Workplace Safety",
      "Reduced Project Downtime",
      "Scalable Supervisory Bandwidth",
      "Streamlined Compliance"
    ],
    cta: "Deploy specialized skilled workers and supervisors for your operations."
  },
  {
    id: "blue-collar-staffing",
    heroTitle: "Blue Collar Staffing",
    shortDescription: "Reliable workforce for factory operations, logistics, warehousing, and essential operational support.",
    overview: "We provide highly scalable blue collar staffing solutions designed to meet peak seasonal demands and core operational requirements. Our turnkey management ensures 100% adherence to all statutory labor laws, covering payroll, ESI, and PF administration.",
    keyServices: [
      "Mass Recruitment for Peak Demands",
      "Factory Floor Operations Staffing",
      "Logistics & Warehousing Manpower",
      "Turnkey Payroll & Benefits Administration",
      "Statutory Compliance Management",
      "On-site Workforce Supervision"
    ],
    industriesServed: [
      "Manufacturing & Industrial",
      "Logistics & Warehousing",
      "E-Commerce Fulfillment",
      "Construction & Infrastructure",
      "Agriculture & Food Processing",
      "Facility Management"
    ],
    whyChooseUs: [
      "Scalable Hiring for Seasonal Peaks",
      "100% Statutory Compliance Guaranteed",
      "End-to-End Payroll Management",
      "Robust Grievance Redressal",
      "On-Site Coordination",
      "Extensive Talent Sourcing Networks"
    ],
    technologyCompliance: [
      "Automated ESI and PF Administration",
      "Digital Wage Registers",
      "Biometric Time & Attendance Tracking",
      "Labor Law Audit Trails"
    ],
    benefits: [
      "Seamless Scalability",
      "Zero Compliance Headaches",
      "Reduced Administrative Burden",
      "Consistent Operational Output",
      "Mitigated Labor Risks",
      "Cost-Effective Workforce Management"
    ],
    cta: "Scale your essential operations with our reliable, compliant workforce."
  }
];
