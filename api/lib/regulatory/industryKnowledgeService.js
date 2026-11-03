// api/lib/regulatory/industryKnowledgeService.js
// Phase 5 — Industry-Specific Regulatory Knowledge Collections
// Covers all 18 standard GOVENICS industry sectors with statutory maps, consent matrices, and audit frequencies

export const INDUSTRY_SECTORS = [
  {
    industryId: "IND-01",
    name: "Manufacturing & Industrial",
    slug: "manufacturing-industrial",
    primaryRegulators: ["State Factories Inspectorate (DISH)", "CPCB / SPCB", "PESO", "Central Boiler Board"],
    centralActs: [
      "Factories Act, 1948 / OSH Code, 2020",
      "Air (Prevention & Control of Pollution) Act, 1981",
      "Water (Prevention & Control of Pollution) Act, 1974",
      "Environment (Protection) Act, 1986",
      "Boilers Act, 1923",
      "Public Liability Insurance Act, 1991"
    ],
    stateMandates: [
      "State Factories Rules (e.g. MH Rule 68, TN Chapter VI Safety Officers)",
      "State Consent to Operate (CTO) / Consent to Establish (CTE)",
      "State Hazardous Waste Disposal Authorisation"
    ],
    licensingRequirements: [
      "Factory Licence (Form 2 / Form 4)",
      "Pollution Control Consent (CTE / CTO - Orange / Red Category)",
      "PESO Petroleum / Gas Storage Licence",
      "Boiler Registration & Annual Inspection Certificate"
    ],
    ehsCriticalControls: [
      "Safety Officer appointment for ≥1,000 workers (≥500 in MH/GJ)",
      "Bi-annual stack emission and ambient air monitoring",
      "Effluent Treatment Plant (ETP) Zero Liquid Discharge compliance",
      "On-site Emergency Disaster Management Plan approval"
    ],
    auditFrequency: "Quarterly Safety Audit & Annual Statutory EHS Audit",
    penaltyExposure: "Up to ₹2-5 Lakhs per factory violation + Section 92 imprisonment up to 3 years."
  },
  {
    industryId: "IND-02",
    name: "Automotive & Auto Components",
    slug: "automotive-auto-components",
    primaryRegulators: ["MoRTH", "ARAI / ICAT", "SPCB", "DISH"],
    centralActs: [
      "Motor Vehicles Act, 1988 (CMVR 1989)",
      "Automotive Industry Standards (AIS)",
      "Battery Waste Management Rules, 2022",
      "Factories Act, 1948"
    ],
    stateMandates: [
      "End-of-Life Vehicle (ELV) Registered Vehicle Scrapping Facility (RVSF) State guidelines",
      "Industrial siting guidelines near automotive corridors (e.g. Pune, Chennai, Sanand)"
    ],
    licensingRequirements: [
      "Type Approval / Homologation Certificates (ARAI / ICAT)",
      "EPR Authorisation for Battery & Tyre Waste",
      "SPCB Red Category CTO"
    ],
    ehsCriticalControls: [
      "Paint booth VOC abatement systems",
      "Metal finishing cyanide / chromium effluent treatment",
      "Robot safety interlocking (ISO 10218)"
    ],
    auditFrequency: "Biannual Environmental Audit & Annual Quality Management (IATF 16949)",
    penaltyExposure: "CMVR type approval revocation, vehicle recall mandates, and SPCB environmental damage compensation."
  },
  {
    industryId: "IND-03",
    name: "Pharmaceuticals & Medical Devices",
    slug: "pharmaceuticals-medical-devices",
    primaryRegulators: ["CDSCO", "State Food & Drug Administration (FDA)", "NPPA", "CPCB"],
    centralActs: [
      "Drugs and Cosmetics Act, 1940 & Rules 1945 (Schedule M - Good Manufacturing Practices)",
      "Medical Devices Rules, 2017",
      "Drugs (Prices Control) Order, 2013 (DPCO)",
      "Bio-Medical Waste Management Rules, 2016"
    ],
    stateMandates: [
      "State Drug Controller Manufacturing Licences (Form 25 / Form 28)",
      "State Narcotic Commissioner Quota & Storage Authorisations"
    ],
    licensingRequirements: [
      "CDSCO / State FDA Drug Manufacturing Licence",
      "GMP Certificate (Schedule M / WHO-GMP)",
      "Bio-Medical Waste Authorisation",
      "NPPA Ceiling Price Compliance Filings (Form II / Form III)"
    ],
    ehsCriticalControls: [
      "Active Pharmaceutical Ingredient (API) effluent treatment with RO & Multi-Effect Evaporator (MEE)",
      "Controlled cleanroom HVAC differential pressure monitoring",
      "Solvent recovery system efficiency >95%"
    ],
    auditFrequency: "Continuous Batch Release Audit, Quarterly Schedule M Audit & Annual SPCB Audit",
    penaltyExposure: "Section 27 imprisonment up to life for spurious drugs; NPPA overpricing clawback with 15% interest."
  },
  {
    industryId: "IND-04",
    name: "Healthcare",
    slug: "healthcare",
    primaryRegulators: ["National Medical Commission (NMC)", "State Health Services", "SPCB", "AERB"],
    centralActs: [
      "Clinical Establishments (Registration and Regulation) Act, 2010",
      "Bio-Medical Waste Management Rules, 2016",
      "Atomic Energy Act, 1962 (AERB Radiation Safety)",
      "Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994",
      "Pharmacy Act, 1948"
    ],
    stateMandates: [
      "State Clinical Establishment Registration / Nursing Home Act Licences",
      "Fire Safety No-Objection Certificate (NOC) Renewal"
    ],
    licensingRequirements: [
      "Clinical Establishment Registration Certificate",
      "Bio-Medical Waste Common Treatment Facility (CBMWTF) Agreement",
      "AERB Licence for X-Ray / CT / MRI / Radiation Equipment",
      "Hospital Pharmacy Licence (Form 20 / 21)"
    ],
    ehsCriticalControls: [
      "Color-coded bio-medical waste segregation at point of generation",
      "Autoclaving & barcoded waste tracking",
      "Radiological safety officer appointment and TLD badges"
    ],
    auditFrequency: "Monthly Bio-Medical Waste reconciliation & Annual NABH / State Health inspection",
    penaltyExposure: "PCPNDT suspension and machine seizure; BMW Rules environmental compensation up to ₹1 Crore."
  },
  {
    industryId: "IND-05",
    name: "Electronics & Semiconductors",
    slug: "electronics-semiconductors",
    primaryRegulators: ["MeitY", "BIS", "CPCB", "State Pollution Control Boards"],
    centralActs: [
      "E-Waste (Management) Rules, 2022 (Extended Producer Responsibility - EPR)",
      "Bureau of Indian Standards (BIS) Compulsory Registration Scheme (CRS)",
      "Hazardous and Other Wastes Rules, 2016",
      "Customs Act, 1962 (Information Technology Agreement - ITA 1 exemptions)"
    ],
    stateMandates: [
      "State Semiconductor Corridor Incentives Compliance (e.g. Gujarat, Karnataka)",
      "SPCB Heavy Metal Wastewater Discharge Norms"
    ],
    licensingRequirements: [
      "BIS CRS Registration for Electronic Goods",
      "CPCB EPR Portal Registration for E-Waste",
      "Import Clearance for Electronic Sub-assemblies",
      "Specialty Gas Handling Permits (Silane, Arsine)"
    ],
    ehsCriticalControls: [
      "Acid / alkali scrubber emissions monitoring",
      "Lead-free soldering exhaust compliance",
      "Ultra-pure water recycling systems >80%"
    ],
    auditFrequency: "Quarterly EPR target fulfilment audit & Annual BIS CRS Surveillance",
    penaltyExposure: "Customs seizure of un-certified electronic goods; EPR non-fulfilment penalty up to ₹5,000 per metric tonne."
  },
  {
    industryId: "IND-06",
    name: "Chemicals & Petrochemicals",
    slug: "chemicals-petrochemicals",
    primaryRegulators: ["PESO", "CPCB / SPCB", "DISH", "National Disaster Management Authority (NDMA)"],
    centralActs: [
      "Manufacture, Storage and Import of Hazardous Chemical (MSIHC) Rules, 1989",
      "Chemical Accidents (Emergency Planning, Preparedness and Response) Rules, 1996",
      "Petroleum Act, 1934 & Petroleum Rules, 2002",
      "Explosives Act, 1884 & Static and Mobile Pressure Vessels (SMPV) Rules"
    ],
    stateMandates: [
      "District Off-Site Emergency Disaster Plan alignment with District Collector",
      "PCPIR (Petroleum, Chemicals & Petrochemicals Investment Region) zoning bylaws"
    ],
    licensingRequirements: [
      "PESO Bulk Storage & Pipeline Licences",
      "Red Category SPCB CTO with Continuous Online Effluent Monitoring System (OCEMS)",
      "Factory Licence with Hazardous Process Endorsement"
    ],
    ehsCriticalControls: [
      "HAZOP study revalidation every 5 years",
      "Real-time VOC & toxic gas sensors wired to Central Control Room",
      "Mutual Aid Scheme participation with adjoining industrial units"
    ],
    auditFrequency: "Annual External Safety Audit by certified expert & Continuous OCEMS link to CPCB",
    penaltyExposure: "Public Liability Insurance default fine; Section 15 Environment Protection Act imprisonment up to 5 years."
  },
  {
    industryId: "IND-07",
    name: "Textiles",
    slug: "textiles",
    primaryRegulators: ["Ministry of Textiles", "State Pollution Control Boards", "DISH"],
    centralActs: [
      "Water (Prevention and Control of Pollution) Act, 1974",
      "Factories Act, 1948",
      "Textiles Committee Act, 1963",
      "Code on Wages, 2019 / Minimum Wages Act"
    ],
    stateMandates: [
      "Zero Liquid Discharge (ZLD) Mandate for Dyeing & Bleaching Units (e.g. Tamil Nadu, Punjab, Gujarat)",
      "State Textile Subsidy Scheme (ATUFS) audit compliance"
    ],
    licensingRequirements: [
      "SPCB Consent to Operate with ZLD certification",
      "Factory Licence with Cotton Dust / Loom Safety provisions",
      "Groundwater Extraction NOC from CGWA / State Authority"
    ],
    ehsCriticalControls: [
      "ZLD multi-stage reverse osmosis and salt recovery crystallizer operations",
      "Cotton dust ventilation & occupational lung health monitoring (Byssinosis check)"
    ],
    auditFrequency: "Biannual ZLD brine balance audit & Annual labour conditions social audit (SEDEX/WRAP)",
    penaltyExposure: "Immediate closure orders and electricity disconnection by SPCB for ZLD bypass."
  },
  {
    industryId: "IND-08",
    name: "Food Processing",
    slug: "food-processing",
    primaryRegulators: ["FSSAI", "Legal Metrology Department", "MoFPI", "SPCB"],
    centralActs: [
      "Food Safety and Standards Act, 2006 & Regulations (Licensing, Packaging, Food Recall)",
      "Legal Metrology Act, 2009 & Packaged Commodities Rules, 2011",
      "Plastic Waste Management Rules, 2016 (Food Grade Recycled Plastic)"
    ],
    stateMandates: [
      "State Food Safety Commissioner annual inspections & sample lifting",
      "Mandatory Food Safety Supervisor (FoSTaC) certification per shift"
    ],
    licensingRequirements: [
      "FSSAI Central / State Manufacturing Licence",
      "FoSCoS Food Safety Plan Approval",
      "Legal Metrology Packaged Commodities Registration",
      "Water Portability (IS 10500) Certification"
    ],
    ehsCriticalControls: [
      "HACCP / ISO 22000 Critical Control Point monitoring (metal detector, pasteurization temp)",
      "Cold chain temperature loggers with cloud telemetry",
      "Organic waste anaerobic bio-digester operations"
    ],
    auditFrequency: "Quarterly Third-Party Food Safety Audit & Annual FSSAI Inspection",
    penaltyExposure: "FSSAI Section 59 penalty for unsafe food up to ₹10 Lakhs + life imprisonment if grievous harm."
  },
  {
    industryId: "IND-09",
    name: "Banking & Financial Services",
    slug: "banking-financial-services",
    primaryRegulators: ["Reserve Bank of India (RBI)", "Financial Intelligence Unit (FIU-IND)", "IRDAI", "PFRDA"],
    centralActs: [
      "Banking Regulation Act, 1949",
      "Reserve Bank of India Act, 1934",
      "Prevention of Money Laundering Act, 2002 (PMLA)",
      "Payment and Settlement Systems Act, 2007",
      "DPDP Act, 2023 (Financial Data Processing)"
    ],
    stateMandates: [
      "State Money Lenders Acts (for non-bank entities)",
      "State Shops & Establishments Registration for branch networks"
    ],
    licensingRequirements: [
      "RBI Banking / NBFC / Payment Aggregator Licence",
      "FIU-IND Reporting Entity Registration",
      "C-KYC Registry Access Agreement"
    ],
    ehsCriticalControls: [
      "Cyber Security Framework for Banks (RBI Master Direction)",
      "Business Continuity Plan (BCP) & Disaster Recovery RTO < 2 hrs, RPO < 15 mins",
      "Automated AML transaction monitoring and STR filing within 7 days"
    ],
    auditFrequency: "Annual RBI Risk-Based Supervision (RBS) & Concurrent Branch Audits",
    penaltyExposure: "RBI monetary penalties up to ₹5+ Crores and business restriction orders."
  },
  {
    industryId: "IND-10",
    name: "BFSI & Fintech",
    slug: "bfsi-fintech",
    primaryRegulators: ["RBI", "SEBI", "NPCI", "CERT-In"],
    centralActs: [
      "RBI Master Directions on Outsourcing of IT Services & Digital Lending Guidelines",
      "Payment and Settlement Systems Act, 2007",
      "Information Technology Act, 2000 & CERT-In Cyber Security Directions 2022",
      "DPDP Act, 2023"
    ],
    stateMandates: [
      "Stamp Duty on digital loan agreements (State e-stamping integration)"
    ],
    licensingRequirements: [
      "Payment Aggregator (PA) / Prepaid Payment Instrument (PPI) Licence",
      "NPCI UPI Third-Party Application Provider (TPAP) Approval",
      "Account Aggregator (AA) / P2P Lending Platform Licence"
    ],
    ehsCriticalControls: [
      "Data localisation: Complete payment transaction data stored exclusively in India",
      "Annual CERT-In empaneled auditor VAPT & SOC 2 Type II certification",
      "Explicit customer consent for digital lending credit bureau pull"
    ],
    auditFrequency: "Semi-Annual Information Security Audit & Continuous RBI Digital Lending Review",
    penaltyExposure: "Cancellation of in-principle PA approval and CERT-In non-reporting prosecution."
  },
  {
    industryId: "IND-11",
    name: "IT & Technology",
    slug: "it-technology",
    primaryRegulators: ["MeitY", "CERT-In", "State Labour Departments", "STPI / SEZ"],
    centralActs: [
      "Information Technology Act, 2000 (Section 43A, 66F, 79 Intermediary Guidelines)",
      "Digital Personal Data Protection Act, 2023",
      "Special Economic Zones (SEZ) Act, 2005",
      "Sexual Harassment of Women at Workplace (POSH) Act, 2013"
    ],
    stateMandates: [
      "State IT/ITeS Policies (24/7 working exemptions, women night shift permissions)",
      "State Shops and Establishments Act annual filings"
    ],
    licensingRequirements: [
      "STPI / SEZ Unit Approval",
      "DoT Other Service Provider (OSP) / Voice Service Registration",
      "State Shops Registration"
    ],
    ehsCriticalControls: [
      "Mandatory 6-hour CERT-In cyber incident reporting",
      "Internal Complaints Committee (ICC) POSH constitution with external NGO member",
      "Ergonomic workstation safety and mental health policies"
    ],
    auditFrequency: "Annual ISO 27001 Surveillance & Annual POSH District Officer Filing",
    penaltyExposure: "DPDP Act penalties up to ₹250 Crores; Intermediary safe harbour forfeiture."
  },
  {
    industryId: "IND-12",
    name: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    primaryRegulators: ["MoRTH", "CBIC (Customs)", "State Transport Authorities", "PESO"],
    centralActs: [
      "Carriage by Road Act, 2007",
      "Central Goods and Services Tax Act, 2017 (E-Way Bill System)",
      "Customs Act, 1962 (Authorised Economic Operator - AEO)",
      "Multimodal Transportation of Goods Act, 1993"
    ],
    stateMandates: [
      "State Motor Vehicle Rules (Commercial vehicle fitness, overload penalties)",
      "State Warehousing Corporation standards & local municipal trade licence"
    ],
    licensingRequirements: [
      "Common Carrier Registration (Form 1)",
      "Customs Broker Licence (Form D)",
      "PESO Petroleum Tanker Transport Licence",
      "State Warehouse Trade Licence & Fire NOC"
    ],
    ehsCriticalControls: [
      "Real-time GPS / FASTag E-Way Bill tracking and validation",
      "Hazchem vehicle marking (TREMCARD - Transport Emergency Card)",
      "Warehouse automated sprinkler system compliance (NFPA 13)"
    ],
    auditFrequency: "Quarterly E-Way Bill reconciliation & Annual AEO customs audit",
    penaltyExposure: "Vehicle impoundment and 200% penalty on tax amount under CGST Section 129."
  },
  {
    industryId: "IND-13",
    name: "Infrastructure",
    slug: "infrastructure",
    primaryRegulators: ["NHAI", "MoEFCC", "State RERA", "Labour Departments"],
    centralActs: [
      "Building and Other Construction Workers (BOCW) Act, 1996",
      "Environment (Protection) Act, 1986 (Environmental Clearance - EC)",
      "Real Estate (Regulation and Development) Act, 2016 (RERA)",
      "National Green Tribunal (NGT) Directives"
    ],
    stateMandates: [
      "State BOCW Welfare Board 1% Cess payment on construction cost",
      "State RERA Project Registration & quarterly escrow account compliance"
    ],
    licensingRequirements: [
      "MoEFCC / SEIAA Prior Environmental Clearance (EC)",
      "RERA Project Registration Certificate",
      "BOCW Establishment Registration",
      "Tree felling and groundwater dewatering NOCs"
    ],
    ehsCriticalControls: [
      "Construction safety netting, scaffolding certification, and fall arrest harnesses",
      "Anti-smog guns and dust suppression misting machines",
      "Worker creche, sanitation, and first aid health post at site"
    ],
    auditFrequency: "Monthly BOCW safety officer inspection & Half-yearly MoEFCC EC compliance report",
    penaltyExposure: "RERA Section 59 penalty up to 10% of estimated project cost; NGT environmental compensation."
  },
  {
    industryId: "IND-14",
    name: "Energy & Utilities",
    slug: "energy-utilities",
    primaryRegulators: ["Central Electricity Regulatory Commission (CERC)", "CEA", "SERCs", "MNRE"],
    centralActs: [
      "Electricity Act, 2003",
      "Energy Conservation Act, 2001 (BEE PAT Scheme)",
      "Renewable Purchase Obligation (RPO) Regulations",
      "Dam Safety Act, 2021"
    ],
    stateMandates: [
      "State Electricity Regulatory Commission (SERC) Open Access regulations",
      "State Solar & Green Energy Policies and Wheeling Charges"
    ],
    licensingRequirements: [
      "CERC / SERC Power Generation & Distribution Licence",
      "Grid Connectivity Approval (RLDC / SLDC)",
      "BEE Accredited Energy Auditor PAT Compliance Certificate"
    ],
    ehsCriticalControls: [
      "Thermal power plant Flue Gas Desulphurisation (FGD) SO2 emission compliance",
      "Transformer oil spill containment pits",
      "High voltage electrical isolation procedures (Lockout-Tagout - LOTO)"
    ],
    auditFrequency: "Annual Mandatory Energy Audit & Continuous SLDC grid stability monitoring",
    penaltyExposure: "CERC non-compliance penalties up to ₹1 Lakh/day; PAT scheme shortfall penalties."
  },
  {
    industryId: "IND-15",
    name: "Retail & E-commerce",
    slug: "retail-e-commerce",
    primaryRegulators: ["Consumer Protection Authority (CCPA)", "DPIIT", "FSSAI", "Legal Metrology"],
    centralActs: [
      "Consumer Protection Act, 2019 (E-Commerce Rules, 2020)",
      "FDI Policy in E-Commerce (Press Note 2 / 2018)",
      "Legal Metrology (Packaged Commodities) Amendment Rules",
      "State Shops and Establishments Acts"
    ],
    stateMandates: [
      "Local Municipal Corporation Trade Licence & Signage bylaws",
      "Shops & Establishments 24/7 retail operation notifications"
    ],
    licensingRequirements: [
      "Central / State Shops & Establishments Registration",
      "Municipal Trade Licence",
      "FSSAI Retail / E-commerce Food Business Operator Licence",
      "Fire NOC for commercial retail spaces"
    ],
    ehsCriticalControls: [
      "Mandatory disclosure of Country of Origin, Best Before date on product listing",
      "Dark-pattern prevention in checkout flow per CCPA Guidelines",
      "Customer grievance officer details published with 48-hr acknowledgment SLA"
    ],
    auditFrequency: "Quarterly Consumer Grievance Review & Annual DPIIT FDI Compliance Certificate",
    penaltyExposure: "CCPA misleading advertisement penalties up to ₹10 Lakhs; FDI violation FEMA scrutiny."
  },
  {
    industryId: "IND-16",
    name: "Telecommunications",
    slug: "telecommunications",
    primaryRegulators: ["Department of Telecommunications (DoT)", "TRAI", "TDSAT", "WPC"],
    centralActs: [
      "Telecommunications Act, 2023",
      "Telecom Regulatory Authority of India (TRAI) Act, 1997",
      "Indian Telegraph Act, 1885 / Indian Wireless Telegraphy Act, 1933",
      "Right of Way (RoW) Rules, 2016"
    ],
    stateMandates: [
      "State Right of Way (RoW) portal single-window clearances for fiber and towers",
      "Municipal tower tax and structural safety certificate renewals"
    ],
    licensingRequirements: [
      "Unified Licence (UL) with Access Service / National Long Distance authorization",
      "Wireless Planning & Coordination (WPC) Frequency Allocation Certificate",
      "SACFA Site Clearance for Telecom Towers"
    ],
    ehsCriticalControls: [
      "Electromagnetic Radiation (EMF) exposure limit self-certification to TERM Cells",
      "Lawful Interception & Monitoring (LIM) compliance with security agencies",
      "Spam call and unsolicited commercial communication (UCC) DND scrubbing"
    ],
    auditFrequency: "Quarterly AGR (Adjusted Gross Revenue) filing & Annual DoT Security Audit",
    penaltyExposure: "DoT licence cancellation; TRAI spam penalty up to ₹50 Lakhs."
  },
  {
    industryId: "IND-17",
    name: "Exporters & International Trade",
    slug: "exporters-international-trade",
    primaryRegulators: ["Directorate General of Foreign Trade (DGFT)", "CBIC Customs", "RBI", "EPCs"],
    centralActs: [
      "Foreign Trade (Development and Regulation) Act, 1992 & Foreign Trade Policy 2023",
      "Customs Act, 1962 & Customs Tariff Act",
      "Foreign Exchange Management Act, 1999 (FEMA)",
      "Export of SCOMET (Special Chemicals, Organisms, Materials, Equipment & Tech)"
    ],
    stateMandates: [
      "State Export Promotion Councils registrations & electricity tariff subsidies",
      "State Agricultural Produce Market Committee (APMC) cess exemptions for agri-exports"
    ],
    licensingRequirements: [
      "Importer-Exporter Code (IEC) from DGFT",
      "Registration-cum-Membership Certificate (RCMC) from designated EPC",
      "Authorised Economic Operator (AEO-T1/T2/T3) accreditation",
      "SCOMET Export Authorisation for dual-use technologies"
    ],
    ehsCriticalControls: [
      "FEMA Export Data Processing and Monitoring System (EDPMS) closing within 9 months",
      "Rules of Origin (CAROTAR 2020) documentation for FTA duty preference claims",
      "EU Carbon Border Adjustment Mechanism (CBAM) embedded emissions reporting"
    ],
    auditFrequency: "Monthly EDPMS/IDPMS reconciliation & Annual RoDTEP/Advance Authorisation audit",
    penaltyExposure: "IEC suspension; Customs Section 111 confiscation and duty clawback with interest."
  },
  {
    industryId: "IND-18",
    name: "Global Capability Centres (GCC)",
    slug: "global-capability-centres",
    primaryRegulators: ["MeitY", "STPI / SEZ Authorities", "RBI", "CBDT"],
    centralActs: [
      "Special Economic Zones (SEZ) Act, 2005 & SEZ (Third Amendment) Rules 2023",
      "Income Tax Act, 1961 (Transfer Pricing Regulations & Safe Harbour Rules)",
      "Digital Personal Data Protection Act, 2023 (Cross-border data transfers)",
      "Foreign Exchange Management Act, 1999 (Inward remittances)"
    ],
    stateMandates: [
      "State GCC Policies (e.g. Karnataka GCC Policy 2024, Telangana Innovation Policy)",
      "State Professional Tax registration and Shops & Establishments compliance"
    ],
    licensingRequirements: [
      "SEZ Letter of Approval (LoA) / STPI Registration",
      "Advance Pricing Agreement (APA) or Safe Harbour Filing with CBDT",
      "State Work-From-Home (WFH) Approvals under Rule 43A of SEZ Rules"
    ],
    ehsCriticalControls: [
      "Arm's length Transfer Pricing documentation (Form 3CEB) and Master File (Form 3CEAA)",
      "DPDP cross-border data transfer impact assessment and corporate binding rules",
      "Asset tracking for duty-free laptops deployed for remote work"
    ],
    auditFrequency: "Annual Transfer Pricing Audit (Form 3CEB) & Annual Performance Report (APR) to SEZ",
    penaltyExposure: "Transfer Pricing adjustment with 200% penalty on under-reported income; SEZ duty clawback."
  }
];

export function getAllIndustryCollections() {
  return INDUSTRY_SECTORS;
}

export function getIndustryBySlug(slug) {
  return INDUSTRY_SECTORS.find(i => i.slug === slug || i.industryId.toLowerCase() === slug.toLowerCase()) || null;
}

