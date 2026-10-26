export interface IndustryServiceOffering {
  title: string;
  description: string;
  outcome: string;
}

export const industryServicesData: Record<string, IndustryServiceOffering[]> = {
  // CLUSTER 1: MANUFACTURING & INDUSTRIAL
  automobiles: [
    {
      title: "Assembly-Line Safety & HSE Audit",
      description: "Comprehensive audits of automated assembly operations, conveyor systems safety, and heavy tooling EHS compliance under the Factories Act.",
      outcome: "Zero-accident rating, full Factories Act clearance"
    },
    {
      title: "Environmental Consent & Waste Management",
      description: "Managing paint shop VOC emissions, heavy metal residues, and SPCB air/water consent logs.",
      outcome: "Continuous green clearances, 100% emission compliance"
    },
    {
      title: "Automotive Supply Chain Due Diligence",
      description: "Vetting Tier-1/Tier-2 vendors for safety audits, conflict minerals tracing, and subcontractor labor registries.",
      outcome: "Fully certified, risk-insulated supply chain"
    },
    {
      title: "Contract Labour (CLRA) Alignment",
      description: "Reconciliation of contract workforce rosters, PF/ESIC contributions, and minimum wage compliance registries.",
      outcome: "Zero labor dispute disruptions, flawless statutory audits"
    }
  ],
  "auto-components": [
    {
      title: "IATF 16949 GRC Integration",
      description: "Aligning quality control manuals, precision engineering safety logs, and global OEM audit criteria with statutory rules.",
      outcome: "Preferred supplier status, 100% buyer audit pass rate"
    },
    {
      title: "Subcontractor Risk Overwatch",
      description: "Ongoing audits of secondary treatment vendors, plating workshops, and raw forging suppliers.",
      outcome: "Elimination of downstream quality and legal liability"
    },
    {
      title: "CLRA Compliance & Wage Audits",
      description: "Statutory audits of contract labor records, wage slip registers, and safety gear provisions.",
      outcome: "100% legal compliance, zero labor inspection penalties"
    },
    {
      title: "Hazardous Chemical Safety & EHS",
      description: "Implementing ISO 14001 EHS frameworks for heat treatment and chemical plating shops.",
      outcome: "Safe cleanroom operations, zero environmental violations"
    }
  ],
  "engineering-capital-goods": [
    {
      title: "Heavy Machinery Safety & ISO 45001",
      description: "Codifying safety protocols for heavy fabrication yards, overhead cranes, and mechanical testing labs.",
      outcome: "Zero critical site accidents, ISO 45001 certification"
    },
    {
      title: "Import/Export Customs & GFR GRC",
      description: "Auditing customs classifications, EPCG export obligations, and General Financial Rules (GFR) procurement compliance.",
      outcome: "Seamless port clearances, zero customs duty penalties"
    },
    {
      title: "Boiler & Pressure Vessel Statutory Inspections",
      description: "Pre-inspection preparations, thickness testing documentation, and Indian Boiler Regulations (IBR) filings.",
      outcome: "100% on-time IBR renewals, uninterrupted operations"
    },
    {
      title: "Contract Engineering Workforce Compliance",
      description: "Comprehensive audits of on-site contract technical labor, site safety inductions, and statutory workmen insurance.",
      outcome: "Total labor law protection, zero employer liability gaps"
    }
  ],
  "defence-manufacturing": [
    {
      title: "ITAR / SCOMET Defense Export Control",
      description: "Implementing strict access controls, dual-use technology tracking, and DGFT SCOMET export licensing governance.",
      outcome: "100% export control compliance, zero regulatory investigations"
    },
    {
      title: "Military-Grade Quality Management (AS9100D)",
      description: "Aligning precision manufacturing facilities with aerospace quality standards and Directorate General of Quality Assurance (DGQA) audits.",
      outcome: "Certified defense supplier status, high audit success rate"
    },
    {
      title: "Classified Data & Facility Security (ISO 27001)",
      description: "Hardening physical perimeters, cleanrooms, and internal CAD servers holding classified military equipment schematics.",
      outcome: "Impenetrable intellectual property protection, MoD security clearance"
    },
    {
      title: "Defense Offsets & Make in India Due Diligence",
      description: "Independent auditing of domestic value addition, indigenous sourcing metrics, and defense offset obligation registers.",
      outcome: "100% offset credit validation, uninterrupted tender eligibility"
    }
  ],
  msme: [
    {
      title: "Turnkey Statutory Baseline Assessment",
      description: "Consolidated audit of factory licenses, fire NOCs, shop registrations, and basic environmental consents for scaling enterprises.",
      outcome: "Complete compliance baseline established within 30 days"
    },
    {
      title: "Simplified Payroll & Labor Compliance",
      description: "Managed filing of PF, ESIC, Professional Tax, and statutory registers tailored for small manufacturing workforces.",
      outcome: "Zero late filing fines, 100% statutory roster accuracy"
    },
    {
      title: "ZED (Zero Defect Zero Effect) Certification",
      description: "Guiding MSMEs through Ministry of MSME ZED assessment benchmarks, waste minimization, and quality systems.",
      outcome: "Attainment of Gold/Diamond ZED status, preferential credit rates"
    },
    {
      title: "Vendor Code of Conduct Certification",
      description: "Preparing MSME supplier documentation to qualify for Tier-1 supply chains and multinational procurement panels.",
      outcome: "Rapid onboarding onto enterprise supplier directories"
    }
  ],
  "chemicals-specialty": [
    {
      title: "Process Safety Management (PSM) & HAZOP Reviews",
      description: "Engineering hazard identification, chemical reactivity evaluations, and process safety management codification under Factories Act 41B.",
      outcome: "Zero runaway exothermic reactions, complete safety clearance"
    },
    {
      title: "PESO Statutory Approvals & Tank Farm Consents",
      description: "Auditing flammable solvent storage tanks, pressure relief valve certifications, and PESO explosive license renewals.",
      outcome: "100% valid PESO storage approvals, uninterrupted chemical supplies"
    },
    {
      title: "CPCB/SPCB Hazardous Waste Returns & Manifest Tracking",
      description: "End-to-end monitoring of chemical effluent treatment, hazardous sludge manifests (Form 10), and emission returns.",
      outcome: "Zero environmental notices, full SPCB consent to operate currency"
    },
    {
      title: "GHS Chemical Labelling & Worker Hazard Communication",
      description: "Globally Harmonized System (GHS) Safety Data Sheet (SDS) management, chemical handling training, and PPE audits.",
      outcome: "Zero toxic exposure incidents, full statutory compliance"
    }
  ],

  // CLUSTER 2: TECHNOLOGY & ELECTRONICS
  "it-bpm": [
    {
      title: "SOC 2 Type II & ISO 27001 Overwatch",
      description: "Designing and continuous auditing of enterprise information security controls, access governance, and SOC 2 evidence archives.",
      outcome: "Flawless audit reports, accelerated US/EU client onboarding"
    },
    {
      title: "Digital Personal Data Protection (DPDP) Readiness",
      description: "End-to-end mapping of personal data flows, consent architecture design, and statutory Data Protection Officer (DPO) support.",
      outcome: "100% DPDP Act compliance, zero privacy regulatory penalties"
    },
    {
      title: "Global Transfer Pricing & STPI Compliance",
      description: "Maintaining Software Technology Parks of India (STPI) monthly returns, Softex form filings, and cross-border service documentation.",
      outcome: "Seamless tax holiday sustenance, zero foreign exchange notices"
    },
    {
      title: "Third-Party Vendor Cybersecurity Overwatch",
      description: "Automated vulnerability assessments and security posture verification across all SaaS integrations and external dev agencies.",
      outcome: "Zero supply chain breach vectors, hardened enterprise perimeter"
    }
  ],
  "electronics-semiconductor": [
    {
      title: "Cleanroom EHS & Toxic Gas Monitoring",
      description: "Rigorous compliance overwatch for cleanroom air exchange, silane/arsine gas detection telemetry, and emergency shutoff protocols.",
      outcome: "Zero hazardous exposure incidents, continuous factory inspector approval"
    },
    {
      title: "E-Waste (Management) Rules Authorization",
      description: "Managing extended producer responsibility (EPR) targets, hazardous scrap treatment audits, and SPCB e-waste authorization filings.",
      outcome: "100% EPR quota fulfilment, zero non-compliance penalties"
    },
    {
      title: "RoHS & REACH Substance Verification",
      description: "Laboratory testing coordination and documentation management proving absence of restricted heavy metals in exported PCBAs.",
      outcome: "Unrestricted export clearance into European and North American markets"
    },
    {
      title: "Semiconductor PLI Scheme Verification",
      description: "Auditing Capex milestones, eligible investment registers, and domestic production value addition for government subsidy disbursement.",
      outcome: "Accelerated PLI incentive disbursements, zero audit objections"
    }
  ],
  telecommunications: [
    {
      title: "DoT Licensing & Spectrum Compliance Audits",
      description: "Auditing Adjusted Gross Revenue (AGR) calculations, license fee allocations, and Department of Telecommunications (DoT) statutory submissions.",
      outcome: "100% accurate AGR reporting, zero demand notice friction"
    },
    {
      title: "Telecom Cybersecurity Security Testing (TCTS)",
      description: "National Security Directive on Telecommunication (NSDT) adherence, trusted source hardware verification, and equipment security testing.",
      outcome: "Complete 'Trusted Source' approvals for network rollouts"
    },
    {
      title: "Tower Infrastructure EMF Radiation Audits",
      description: "Continuous electromagnetic field (EMF) radiation measurement logs and municipal Right-of-Way (RoW) consent management.",
      outcome: "Zero public radiation notices, seamless tower rollout approvals"
    },
    {
      title: "Subscriber Identity Verification (eKYC) Governance",
      description: "Real-time auditing of digital subscriber onboarding nodes, biometric verification vaults, and telecom fraud prevention registers.",
      outcome: "Zero regulatory penalties for unauthorized SIM activations"
    }
  ],
  "electric-vehicles": [
    {
      title: "AIS 156 / AIS 038 Battery Safety Certification",
      description: "Ensuring EV battery packs pass mandatory thermal runaway, moisture immersion, and cell-level fire safety compliance tests.",
      outcome: "Full Automotive Research Association of India (ARAI) type approvals"
    },
    {
      title: "FAME-II / EMPS Subsidy Eligibility Overwatch",
      description: "Auditing domestic value addition (DVA), phased manufacturing program (PMP) milestones, and localized tier supply documentation.",
      outcome: "Timely subsidy recovery, zero retrospective disallowances"
    },
    {
      title: "High-Voltage Assembly Safety & ISO 26262",
      description: "Automotive functional safety audits, high-voltage battery charging bay EHS, and technician dielectric PPE compliance.",
      outcome: "Zero electric shock incidents, certified functional safety"
    },
    {
      title: "End-of-Life Battery EPR Management",
      description: "Battery Waste Management Rules 2022 adherence, mandatory recycler agreements, and CPCB online portal compliance tracking.",
      outcome: "100% legal compliance, positive ESG credentialing"
    }
  ],
  "cybersecurity-services": [
    {
      title: "CERT-In 6-Hour Incident Reporting Framework",
      description: "Codifying incident categorization, root-cause forensics telemetry, and automated compliance filing pipelines to meet statutory CERT-In timelines.",
      outcome: "100% regulatory compliance, zero incident delay penalties"
    },
    {
      title: "SOC 2 Type II / ISO 27001 Security Audits",
      description: "End-to-end evidence gathering, access control audits, and multi-tenant security overwatch for managed security service providers.",
      outcome: "Unqualified SOC 2 assurance reports, elevated client trust"
    },
    {
      title: "Vulnerability Disclosure & Ethical Hacking Governance",
      description: "Safe harbor policy codification, bug bounty legal parameters, and statutory disclosure protocol management.",
      outcome: "Zero legal exposure from security research operations"
    },
    {
      title: "Critical Information Infrastructure (CII) Protection",
      description: "NCIIPC guidelines implementation, air-gapped forensic log retention, and SCADA/OT network security compliance.",
      outcome: "Full compliance with national critical infrastructure standards"
    }
  ],
  "fintech-digital-payments": [
    {
      title: "RBI Payment Aggregator (PA) Operational Audits",
      description: "Auditing net-worth certification maintenance, merchant onboarding KYC/AML filters, and core settlement engine reliability.",
      outcome: "Full RBI license currency, zero regulatory inspections friction"
    },
    {
      title: "Escrow Account & Nodal Settlement Reconciliation",
      description: "Real-time auditing of T+1 merchant funds settlement, nodal bank balance matching, and customer chargeback reserve adequacy.",
      outcome: "100% reconciliation accuracy, zero settlement disputes"
    },
    {
      title: "Card-on-File Tokenisation & PCI-DSS v4.0",
      description: "Ensuring customer card credentials are never stored unencrypted, and validating token vault architectures under PCI-DSS standards.",
      outcome: "Complete card data security, flawless QSA certification"
    },
    {
      title: "PMLA / FIU-IND Reporting Architecture",
      description: "Suspicious Transaction Report (STR) and Cash Transaction Report (CTR) generation pipelines aligned with Financial Intelligence Unit rules.",
      outcome: "100% on-time FIU filings, zero anti-money laundering penalties"
    }
  ],

  // CLUSTER 3: INFRASTRUCTURE & CONSTRUCTION
  "real-estate": [
    {
      title: "RERA Project Registration & Quarterly Disclosures",
      description: "Managing state RERA project registrations, escrow account 70:30 fund withdrawals, and quarterly progress report (QPR) filings.",
      outcome: "Zero RERA penalty orders, sustained buyer trust"
    },
    {
      title: "Construction Site EHS & Labor Welfare Audits",
      description: "Monitoring scaffolding safety, crane load limits, and Building and Other Construction Workers (BOCW) cess and safety logs.",
      outcome: "Zero fatal fall incidents, 100% BOCW statutory compliance"
    },
    {
      title: "Environmental Clearances (MoEFCC / SEIAA)",
      description: "Preparation of Environmental Impact Assessments (EIA), sewage treatment plant (STP) consent filings, and green buffer audits.",
      outcome: "Timely environmental clearances, zero construction stop-work notices"
    },
    {
      title: "Fire Safety NOC & Occupancy Certification",
      description: "Coordinating hydraulic fire testing, smoke evacuation audits, and municipal fire department final occupancy inspections.",
      outcome: "On-schedule Occupancy Certificate (OC) issuances"
    }
  ],
  "roads-highways": [
    {
      title: "NHAI / EPC Concession Agreement Governance",
      description: "Auditing right-of-way (RoW) milestone deliveries, commercial dispute logs, and statutory concession agreement obligations.",
      outcome: "Zero liquidated damage penalties, on-time project annuity releases"
    },
    {
      title: "Highway Work-Zone Traffic Safety & IRC Norms",
      description: "Indian Roads Congress (IRC) compliant barricading, retro-reflective signage, and live traffic diversion risk assessments.",
      outcome: "Zero work-zone collision liability, full safety engineer sign-offs"
    },
    {
      title: "Forest & Wildlife Clearance Compliance",
      description: "Monitoring compensatory afforestation documentation, eco-sensitive zone wildlife mitigation structures, and tree-felling permits.",
      outcome: "Uninterrupted highway construction through protected corridors"
    },
    {
      title: "Subcontractor Labor Wage & Camp Sanitation Audits",
      description: "Routine inspections of remote construction labor colonies for clean drinking water, sanitation facilities, and statutory wages.",
      outcome: "Zero labor unrest stoppages, full statutory compliance"
    }
  ],
  cement: [
    {
      title: "Continuous Emission Monitoring Systems (CEMS)",
      description: "Real-time telemetry validation for kiln stack particulate matter (PM), SO2, and NOx levels connected to CPCB/SPCB servers.",
      outcome: "100% emissions compliance, zero pollution closure notices"
    },
    {
      title: "Limestone Quarry Mining Lease Compliance",
      description: "Auditing mining plan approvals, progressive mine closure funds, and Directorate General of Mines Safety (DGMS) norms.",
      outcome: "Uninterrupted quarry operations, complete legal compliance"
    },
    {
      title: "Alternative Fuels & Raw Materials (AFR) EHS",
      description: "Safety frameworks for co-processing hazardous industrial wastes, RDF, and biomass in cement kilns.",
      outcome: "Safe alternative fuel handling, carbon footprint reductions"
    },
    {
      title: "Captive Power Plant & Waste Heat Recovery (WHR) Consents",
      description: "Boiler safety certifications, water consumption returns, and renewable energy purchase obligation (RPO) audit trails.",
      outcome: "Optimized captive energy costs, full regulatory compliance"
    }
  ],
  steel: [
    {
      title: "Blast Furnace & Hot Metal Safety Overwatch",
      description: "Strict enforcement of molten metal splash prevention, gas leakage detectors (CO monitors), and worker thermal PPE compliance.",
      outcome: "Zero catastrophic melt-shop incidents, continuous factory clearance"
    },
    {
      title: "Slag Disposal & Environmental Returns",
      description: "Statutory documentation for blast furnace slag utilization, air quality monitoring stations, and water recycling loops.",
      outcome: "100% solid waste utilization, green factory ratings"
    },
    {
      title: "BIS Certification for Structural Steel (QCO)",
      description: "Quality Control Orders (QCO) testing compliance, mandatory BIS mark verification, and chemical composition audit trails.",
      outcome: "Unrestricted domestic distribution, zero seizure risks"
    },
    {
      title: "Heavy Contract Labor Roster Reconciliation",
      description: "Statutory audits of contract rigging, furnace charging, and logistics crews under the Contract Labour Act.",
      outcome: "Flawless labor inspection clearance, zero union disputes"
    }
  ],
  "ports-logistics": [
    {
      title: "Customs Cargo Manifest & Bonded Area GRC",
      description: "Auditing Sea Cargo Manifest and Transhipment Regulations (SCMTR), customs bond registers, and bonded warehouse entries.",
      outcome: "Zero customs penalties, rapid container release cycles"
    },
    {
      title: "Dock Workers Safety Regulations & Marine EHS",
      description: "Auditing quay crane load certifications, hazardous chemical container handling, and dock safety committee records.",
      outcome: "Zero waterfront accidents, full dock inspectorate clearance"
    },
    {
      title: "Maritime Anti-Pollution (MARPOL) Compliance",
      description: "Ballast water management logs, vessel bilge waste reception monitoring, and coastal regulation zone (CRZ) consents.",
      outcome: "100% MARPOL compliance, zero marine environmental notices"
    },
    {
      title: "Port Cybersecurity & Automated Gate Telemetry",
      description: "Terminal Operating System (TOS) security audits, RFID container tracking data privacy, and access control overwatch.",
      outcome: "Hardened port infrastructure, zero terminal disruption"
    }
  ],
  "metro-rail-transit": [
    {
      title: "CMRS Safety Approvals & Track Certification",
      description: "Compilation of Commissioner of Metro Railway Safety (CMRS) dossiers, signaling interlocking safety cases, and rolling stock tests.",
      outcome: "100% CMRS clearance, on-schedule commercial launch"
    },
    {
      title: "High-Voltage Traction (25kV OHE) Safety",
      description: "Auditing electrical substation maintenance logs, overhead catenary wire clearances, and grounding circuit integrity.",
      outcome: "Zero traction electrical incidents, optimal rail availability"
    },
    {
      title: "Station Fire Safety, Egress & Crowd Control",
      description: "Simulating station evacuation timings, emergency ventilation dampers testing, and passenger platform screen door (PSD) safety.",
      outcome: "100% fire department NOC renewals, verified passenger safety"
    },
    {
      title: "Subsurface Tunneling Geotechnical Risk Overwatch",
      description: "Continuous monitoring of tunnel boring machine (TBM) ground settlement sensors, building tilt meters, and vibration logs.",
      outcome: "Zero structural settlement damage, zero urban community claims"
    }
  ],

  // CLUSTER 4: ENERGY & UTILITIES
  "renewable-energy": [
    {
      title: "Solar & Wind Land Due Diligence & RoW Permits",
      description: "Verifying clear land titles, agricultural-to-industrial land conversion orders, and right-of-way consents for transmission lines.",
      outcome: "100% dispute-free land banks, bankable project documentation"
    },
    {
      title: "Grid Code & Forecasting/Scheduling Regulations",
      description: "Compliance with State Load Despatch Centre (SLDC) forecasting norms, Deviation Settlement Mechanism (DSM) tracking, and CEA safety rules.",
      outcome: "Minimization of DSM penalty charges, reliable grid connectivity"
    },
    {
      title: "Power Purchase Agreement (PPA) Obligation Tracking",
      description: "Automated monitoring of guaranteed minimum generation levels, tariff billing schedules, and open access regulatory approvals.",
      outcome: "Accelerated utility payments, zero PPA default claims"
    },
    {
      title: "Photovoltaic Module EPR & E-Waste Management",
      description: "E-Waste Management Rules 2022 adherence for decommissioned PV modules, inverter scrap, and certified recycler contracts.",
      outcome: "100% circular compliance, zero environmental liabilities"
    }
  ],
  "oil-gas": [
    {
      title: "PESO Licensing & Pipeline Safety Management",
      description: "Statutory safety dossiers for hydrocarbon storage, cross-country pipeline integrity testing, and PESO emergency plans.",
      outcome: "Continuous PESO approval, zero pipeline shutdown orders"
    },
    {
      title: "Offshore / Onshore Drilling EHS Regulations",
      description: "Enforcing Oil Mines Regulations (OMR 2017), blowout preventer (BOP) certification, and hydrogen sulfide (H2S) safety.",
      outcome: "Zero major well-site blowouts, flawless DGMS inspections"
    },
    {
      title: "Refinery Emissions & Flare Gas Monitoring",
      description: "Continuous monitoring of sulfur recovery units, VOC fence-line monitoring, and SPCB consent to operate renewals.",
      outcome: "100% green compliance, clean regulatory standing"
    },
    {
      title: "Hazardous Chemical Transport & Road Tanker Safety",
      description: "TREM card compliance, spark arrestor certifications, and GPS speed/route adherence for road fuel tankers.",
      outcome: "Zero transit fire accidents, verified distributor safety"
    }
  ],
  "power-grid": [
    {
      title: "Central Electricity Authority (CEA) Grid Standards",
      description: "Auditing high-voltage substation protection coordination, transformer oil testing, and grid stability standards under CEA rules.",
      outcome: "Zero unscheduled grid tripping incidents, full CEA compliance"
    },
    {
      title: "Substation Arc-Flash & Electrical Safety Protocols",
      description: "Conducting arc-flash hazard assessments, dielectric protective gear verification, and lockout/tagout (LOTO) enforcement.",
      outcome: "Zero fatal electrocution incidents, safe maintenance culture"
    },
    {
      title: "SCADA & Transmission Network Cybersecurity",
      description: "Implementing National Critical Information Infrastructure Protection Centre (NCIIPC) controls across SCADA and energy management systems.",
      outcome: "Hardened energy telemetry, zero malware intrusions"
    },
    {
      title: "Transmission Line Right-of-Way (RoW) Clearance",
      description: "Statutory documentation for tree-trimming clearance, high-voltage clearances over roadways, and compensation dispute resolution.",
      outcome: "Unimpeded high-voltage transmission, zero community disputes"
    }
  ],
  mining: [
    {
      title: "DGMS Mines Safety Code & Pit Slope Monitoring",
      description: "Comprehensive audits of open-cast slope radar telemetry, heavy earthmoving machinery safety, and DGMS quarterly safety committee logs.",
      outcome: "Zero slope collapse incidents, 100% DGMS audit clearance"
    },
    {
      title: "Explosives Magazine Licensing & Blasting Safety",
      description: "Statutory audits of explosive storage magazines, electronic detonator tracking, and ground vibration compliance reports.",
      outcome: "100% valid PESO magazine licenses, zero blasting violations"
    },
    {
      title: "Mine Closure Escrow & Progressive Rehabilitation",
      description: "Annual accounting of mine closure financial assurances, topsoil preservation logs, and afforestation acreage audits.",
      outcome: "Zero reclamation default penalties, full IBM approval"
    },
    {
      title: "Mine Dust & Water Discharge Environmental Consents",
      description: "Water sprinkling telemetry verification, mine dewatering effluent testing, and SPCB discharge consent renewals.",
      outcome: "Zero air/water pollution violation notices"
    }
  ],
  bioenergy: [
    {
      title: "Biomass Boiler Safety & IBR Approvals",
      description: "Inspection dossiers for high-pressure biomass boilers, superheater tube ultrasonic testing, and Indian Boiler Regulations currency.",
      outcome: "Zero boiler shutdown orders, 100% IBR certification"
    },
    {
      title: "Flue Gas CEMS & Continuous Dioxin/Furan Controls",
      description: "Real-time telemetry verification for electrostatic precipitators (ESP) and baghouse filters linked to pollution board servers.",
      outcome: "100% emission compliance, zero environmental closure notices"
    },
    {
      title: "Feedstock Sourcing Traceability & Fire Safety",
      description: "Fire protection protocols for large agricultural residue storage yards, moisture monitoring, and supplier contract audits.",
      outcome: "Zero spontaneous combustion fires, verified bio-supply chain"
    },
    {
      title: "Bottom Ash & Fly Ash Utilization Reporting",
      description: "Statutory records for ash supply to brick kilns, soil amendment testing, and SPCB solid waste disposal manifests.",
      outcome: "100% ash utilization compliance, zero landfill penalties"
    }
  ],
  "hydrogen-gas": [
    {
      title: "PESO Clean Hydrogen Storage & Cylinder Approvals",
      description: "Auditing 350-bar and 700-bar high-pressure hydrogen storage cascade vessels, rupture discs, and PESO explosive approvals.",
      outcome: "100% valid PESO licenses, zero pressure vessel violations"
    },
    {
      title: "Hydrogen Embrittlement & Sensor Telemetry Overwatch",
      description: "Continuous monitoring of metallurgical pipeline integrity, electrochemical H2 leak detectors, and automatic vent systems.",
      outcome: "Zero undetected hydrogen leaks, certified pipeline safety"
    },
    {
      title: "Electrolyzer EHS & Hazardous Area Classification",
      description: "Zone 0/1/2 hazardous area zoning, intrinsic safety certifications for electrical equipment, and demineralized water loop audits.",
      outcome: "Certified safe green hydrogen plant operations"
    },
    {
      title: "National Green Hydrogen Mission Certification",
      description: "Verification of renewable electricity input credentials, carbon intensity calculations, and government incentive documentation.",
      outcome: "Accelerated green hydrogen subsidy approvals"
    }
  ],

  // CLUSTER 5: FINANCIAL SERVICES
  banking: [
    {
      title: "RBI Master Direction Governance & Risk Audits",
      description: "Evaluating internal control systems against RBI Master Directions on risk management, NPA classifications, and statutory board reporting.",
      outcome: "Flawless RBI annual financial inspections, zero supervisory penalties"
    },
    {
      title: "Cyber Security Framework for Banks (CSFB)",
      description: "Continuous validation of 24/7 SOC telemetry, network segmentation, red-team penetration testing, and swift API security controls.",
      outcome: "Hardened core banking security, 100% RBI CSFB compliance"
    },
    {
      title: "Anti-Money Laundering (AML) & KYC Overwatch",
      description: "Auditing automated transaction monitoring systems, suspicious transaction report (STR) quality, and PEP screening databases.",
      outcome: "Zero AML compliance lapses, flawless FIU-IND audit record"
    },
    {
      title: "Outsourcing & Third-Party Vendor Risk Audits",
      description: "Assessing material IT outsourcing arrangements, vendor business continuity readiness, and legal liability indemnity clauses.",
      outcome: "Complete compliance with RBI outsourcing guidelines"
    }
  ],
  "financial-services": [
    {
      title: "SEBI Listing Obligations & Disclosure (LODR)",
      description: "Managing mandatory material event disclosures, board committee charters, and statutory financial reporting calendars under SEBI rules.",
      outcome: "Zero stock exchange notice events, full disclosure transparency"
    },
    {
      title: "NBFC Scale-Based Regulation (SBR) Compliance",
      description: "Capital adequacy ratio (CRAR) calculations, asset-liability management (ALM) modeling, and RBI supervisory returns.",
      outcome: "Sustained regulatory capital ratios, seamless RBI compliance"
    },
    {
      title: "Insider Trading & Code of Conduct Overwatch",
      description: "Automated tracking of designated person trading windows, UPSI digital database (SDD) maintenance, and pre-clearance logs.",
      outcome: "Zero SEBI insider trading violations, verified compliance"
    },
    {
      title: "Fair Practices Code & Grievance Redressal",
      description: "Auditing loan collection agent protocols, interest rate disclosure frameworks, and statutory customer grievance redressal turnaround.",
      outcome: "Zero consumer court penalties, protected brand equity"
    }
  ],
  insurance: [
    {
      title: "IRDAI Statutory Regulations & Solvency Overwatch",
      description: "Auditing solvency margin ratios, actuarial reserve calculations, and mandatory quarterly filings with the IRDAI.",
      outcome: "100% solvency margin adherence, pristine regulatory record"
    },
    {
      title: "Insurance Product Filing & Policyholder Protection",
      description: "Ensuring policy wording, exclusion clauses, and sales materials adhere strictly to IRDAI Protection of Policyholders' Interests regulations.",
      outcome: "Accelerated 'Use and File' approvals, zero misleading sales claims"
    },
    {
      title: "Claim Settlement Turnaround & Fraud Analytics",
      description: "Auditing claim turnaround times (TAT), cashless hospital network tie-ups, and forensic investigation protocols for suspicious claims.",
      outcome: "High claim settlement ratios, minimized fraudulent loss leakage"
    },
    {
      title: "Insurance Intermediary & Broker Due Diligence",
      description: "Auditing corporate agent commissions, broker licensing renewals, and point-of-sale person (POSP) statutory training logs.",
      outcome: "Zero distributor misconduct penalties, clean agency networks"
    }
  ],
  microfinance: [
    {
      title: "RBI Microfinance Household Income Assessment",
      description: "Auditing credit bureau inquiry protocols, household income assessment models, and debt-income ratio caps under RBI directions.",
      outcome: "100% compliance with microfinance lending criteria"
    },
    {
      title: "Fair Practices Code in Loan Recovery",
      description: "Auditing field collection center practices, agent interaction logs, and grievance recording mechanisms to eliminate coercive tactics.",
      outcome: "Zero borrower harassment complaints, sustained MFIN rating"
    },
    {
      title: "Priority Sector Lending (PSL) Validation",
      description: "Auditing loan portfolio data for priority sector classification, rural branch outreach ratios, and statutory bank pass-through portfolios.",
      outcome: "Seamless PSL certificate securitization and bank funding"
    },
    {
      title: "Branch Cash Logistics & Vault Security Audits",
      description: "Inspecting rural branch cash vaults, armed guard logistics contracts, and fidelity insurance cover for field collection officers.",
      outcome: "Zero branch cash defalcation losses, secure cash operations"
    }
  ],
  "wealth-management": [
    {
      title: "SEBI Portfolio Managers (PMS) Regulations Compliance",
      description: "Auditing client risk profiling methodologies, minimum investment threshold tracking (₹50 Lakhs), and performance reporting accuracy.",
      outcome: "100% SEBI PMS compliance, zero investor disputes"
    },
    {
      title: "Alternative Investment Fund (AIF) Governance",
      description: "Auditing PPM investment objective adherence, valuation committee minutes, and statutory quarterly reporting to SEBI.",
      outcome: "Flawless AIF audit reports, enhanced institutional investor trust"
    },
    {
      title: "Conflict of Interest & Distribution Disclosure",
      description: "Ensuring clear segregation of investment advisory and distributor commissions with documented client consent registers.",
      outcome: "Zero mis-selling regulatory notices, clean compliance audit"
    },
    {
      title: "Client Onboarding Video KYC & PMLA Overwatch",
      description: "Validating digital KYC workflows, ultimate beneficial ownership (UBO) declarations, and anti-money laundering risk scoring.",
      outcome: "Zero onboarding compliance gaps, secure client portfolios"
    }
  ],
  payments: [
    {
      title: "RBI Payment Aggregator (PA) Operational Audits",
      description: "Auditing net-worth certification maintenance, merchant onboarding KYC/AML filters, and core settlement engine reliability.",
      outcome: "Full RBI license currency, zero regulatory inspections friction"
    },
    {
      title: "Merchant Escrow Account & Nodal Reconciliation",
      description: "Real-time auditing of T+1 merchant funds settlement, nodal bank balance matching, and customer chargeback reserve adequacy.",
      outcome: "100% reconciliation accuracy, zero settlement disputes"
    },
    {
      title: "Card Tokenisation & PCI-DSS v4.0",
      description: "Ensuring customer card credentials are never stored unencrypted, and validating token vault architectures under PCI-DSS standards.",
      outcome: "Complete card data security, flawless QSA certification"
    },
    {
      title: "Payment Gateway Fraud Engine & Risk Analytics",
      description: "Auditing velocity check algorithms, fraud alert handling workflows, and cyber breach isolation procedures.",
      outcome: "Zero fraud spillover losses, protected merchant ecosystem"
    }
  ],

  // CLUSTER 6: HEALTHCARE & LIFE SCIENCES
  healthcare: [
    {
      title: "NABH Hospital Accreditation Overwatch",
      description: "Conducting regular internal audits of patient safety protocols, surgical checklists, medication safety logs, and clinical governance.",
      outcome: "100% NABH accreditation renewal, elite patient safety rating"
    },
    {
      title: "Bio-Medical Waste Management Rules Compliance",
      description: "Barcoded waste bag tracking, incinerator/autoclave temperature validation, and SPCB annual biomedical waste return filings.",
      outcome: "Zero bio-waste pollution notices, full regulatory adherence"
    },
    {
      title: "Digital Personal Health Data Privacy (DPDP & ABDM)",
      description: "Hardening Electronic Health Record (EHR) databases, Ayushman Bharat Digital Mission (ABDM) integration, and patient consent architecture.",
      outcome: "Zero patient data breach incidents, full DPDP compliance"
    },
    {
      title: "Pharmacy Drug Storage & Narcotic Substance Logs",
      description: "Auditing Schedule H/H1 and narcotic drug registers, temperature-controlled drug vaults, and hospital pharmacy licenses.",
      outcome: "100% state drug controller clearance, zero stock discrepancies"
    }
  ],
  pharmaceuticals: [
    {
      title: "cGMP & US FDA / CDSCO Audit Readiness",
      description: "Comprehensive audits of batch manufacturing records (BMR), equipment qualification (DQ/IQ/OQ/PQ), and cleanroom particulate controls.",
      outcome: "Zero 483 inspection observations, uncompromised global supply"
    },
    {
      title: "Data Integrity & 21 CFR Part 11 Compliance",
      description: "Validating laboratory electronic instruments (HPLC/GC) for computerized audit trails, user access segregation, and raw data backup.",
      outcome: "100% data integrity assurance, elimination of audit findings"
    },
    {
      title: "Pharmacovigilance (PvPI) & Adverse Event Reporting",
      description: "Automated pipelines for receiving, investigating, and reporting adverse drug reactions to national pharmacovigilance databases.",
      outcome: "Zero adverse reporting delays, robust post-market safety"
    },
    {
      title: "Zero Liquid Discharge (ZLD) Pharma Effluent EHS",
      description: "Monitoring active pharmaceutical ingredient (API) wastewater treatment, multi-effect evaporators, and SPCB online consent portals.",
      outcome: "Continuous green clearances, zero effluent non-compliances"
    }
  ],
  "medical-devices": [
    {
      title: "Medical Device Rules (MDR 2017) Licensing",
      description: "Dossier preparation for CDSCO Class A/B/C/D manufacturing and import licenses, Device Master Files (DMF), and Plant Master Files.",
      outcome: "Rapid regulatory license approvals, accelerated product launches"
    },
    {
      title: "ISO 13485 Quality Management System",
      description: "Auditing device design controls, biocompatibility documentation, sterilization validation, and risk management under ISO 14971.",
      outcome: "International quality certifications, unrestricted export access"
    },
    {
      title: "Unique Device Identification (UDI) & Labeling",
      description: "Ensuring barcode serialization, GS1 UDI compliance, and statutory device instructions for use (IFU) language adherence.",
      outcome: "100% global traceability, zero customs seizure friction"
    },
    {
      title: "Post-Market Surveillance & Materiovigilance",
      description: "Managing medical device adverse event reporting pipelines, customer complaint tracking, and product recall protocols.",
      outcome: "Full Materiovigilance Programme of India (MvPI) compliance"
    }
  ],
  biotechnology: [
    {
      title: "Institutional Biosafety Committee (IBSC) Approvals",
      description: "Navigating Review Committee on Genetic Manipulation (RCGM) and GEAC regulatory approvals for recombinant DNA research.",
      outcome: "100% statutory biosecurity clearance, fast-tracked trials"
    },
    {
      title: "Biosafety Level 2/3 (BSL-2/3) Facility EHS",
      description: "Validating negative pressure containment zones, HEPA filtration systems, and laboratory worker immunization registers.",
      outcome: "Zero pathogen containment breaches, safe biocontainment"
    },
    {
      title: "Clinical Trial Ethical Committee Governance (GCP)",
      description: "Monitoring Good Clinical Practice (GCP) guidelines, patient informed consent videos, and Ethics Committee trial reviews.",
      outcome: "Flawless CDSCO inspection clearance, zero ethical objections"
    },
    {
      title: "Biological Material Material Transfer Agreements (MTA)",
      description: "Ensuring compliance with the National Biodiversity Act, NBA approvals for biological resources export, and benefit-sharing.",
      outcome: "100% NBA compliance, zero intellectual property litigation"
    }
  ],
  "diagnostic-labs": [
    {
      title: "NABL ISO 15189 Quality Accreditation",
      description: "Quality control documentation for clinical pathology, molecular diagnostics, calibration curves, and internal audit dossiers.",
      outcome: "100% NABL accreditation retention, high clinical credibility"
    },
    {
      title: "Biomedical Waste Autoclave & Effluent Monitoring",
      description: "Auditing infected sample disposal, chemical disinfectant baths, and hazardous waste manifest tracking with state pollution boards.",
      outcome: "Zero environmental penalties, clean bio-risk management"
    },
    {
      title: "Diagnostic Telemetry & Digital Report Privacy",
      description: "Hardening LIMS (Laboratory Information Management Systems), protecting patient test reports under DPDP and ICMR rules.",
      outcome: "Zero diagnostic data leaks, patient trust enhancement"
    },
    {
      title: "AERB Compliance for Radiology & Imaging Centers",
      description: "Atomic Energy Regulatory Board approvals for CT/X-ray machines, lead-shielding inspections, and TLD radiation badge logs.",
      outcome: "100% valid AERB operational licenses, complete radiation safety"
    }
  ],
  ayush: [
    {
      title: "Ministry of AYUSH GMP Certification",
      description: "Auditing Ayurvedic, Unani, and Siddha drug manufacturing units under Schedule T of the Drugs and Cosmetics Rules.",
      outcome: "Attainment of AYUSH Premium Mark, continuous manufacturing license"
    },
    {
      title: "Botanical Raw Material Heavy Metal & Pesticide Testing",
      description: "Laboratory testing coordination ensuring raw herbal batches meet strict pharmacopoeial limits for lead, arsenic, and pesticides.",
      outcome: "Pristine product quality, zero product recall notices"
    },
    {
      title: "Misleading Advertisements & Claims Governance",
      description: "Ensuring formulation marketing materials comply with Drugs and Magic Remedies (Objectionable Advertisements) Act rules.",
      outcome: "Zero legal notices, protected corporate reputation"
    },
    {
      title: "AYUSH Hospital & Wellness Center NABH Accreditation",
      description: "Establishing Panchakarma hygiene standards, clinical protocol documentation, and specialized NABH AYUSH hospital benchmarks.",
      outcome: "Prestigious NABH accreditation, elevated wellness tourism status"
    }
  ],

  // CLUSTER 7: FOOD PROCESSING, PHARMA & HEALTHCARE
  "food-processing": [
    {
      title: "FSSAI Licensing, Product Approval & Labeling GRC",
      description: "Auditing mandatory nutritional panels, allergen warnings, FSSAI central license renewals, and Legal Metrology packaging declarations.",
      outcome: "Zero packaging recall notices, 100% FSSAI compliance"
    },
    {
      title: "HACCP & ISO 22000 Food Safety Management System",
      description: "Codifying Hazard Analysis Critical Control Points (HACCP) across ingredient reception, cooking/pasteurization, and packaging bays.",
      outcome: "Uncompromised food hygiene, zero microbiological contamination"
    },
    {
      title: "Raw Agri-Commodity Supply Chain Traceability",
      description: "Auditing farm-gate pesticide residue test certificates, heavy metal logs, and non-GMO procurement documentation.",
      outcome: "100% raw ingredient provenance, preferred enterprise vendor status"
    },
    {
      title: "Food Processing Plant Effluent & Sanitation EHS",
      description: "Monitoring organic effluent BOD/COD treatment, food-grade chemical sanitization logs, and factory inspectorate approvals.",
      outcome: "Zero environmental notices, full factory compliance"
    }
  ],
  "pharmaceutical-manufacturing": [
    {
      title: "Schedule M Revision & cGMP Quality Overwatch",
      description: "Comprehensive audits of revised Schedule M standards, computerized HVAC differential pressure logging, and cleanroom bioburden logs.",
      outcome: "100% Schedule M compliance, pristine CDSCO inspection records"
    },
    {
      title: "Active Pharmaceutical Ingredient (API) Traceability",
      description: "Auditing raw chemical precursor registers, solvents purity certificates, and continuous batch traceability under drug rules.",
      outcome: "Elimination of adulteration risks, global export eligibility"
    },
    {
      title: "Sterile Injectable Formulations Validation",
      description: "Media fill trial validation, isolator sterilization cycles, and particle counter calibration for critical parenteral manufacturing.",
      outcome: "Zero batch contamination, verified sterile manufacturing"
    },
    {
      title: "Pharma Effluent & Hazardous Residue Treatment",
      description: "Auditing effluent treatment plants (ETP), heavy metal precipitation, and zero liquid discharge (ZLD) continuous monitoring.",
      outcome: "Full pollution control consent currency, green certifications"
    }
  ],
  "healthcare-delivery": [
    {
      title: "Clinical Establishments Act & NABH Hospital Audits",
      description: "Statutory audits of clinical staffing ratios, emergency room protocols, surgical checklists, and patient safety registers.",
      outcome: "100% valid clinical establishment licenses, NABH accreditation"
    },
    {
      title: "Hospital Infection Control & Biomedical Waste EHS",
      description: "Monitoring autoclave spore testing, barcoded biomedical waste segregation, and sharps disposal logs with state pollution boards.",
      outcome: "Zero healthcare-associated infection outbreaks, zero waste penalties"
    },
    {
      title: "Patient Electronic Health Record (EHR) Privacy",
      description: "Implementing DPDP Act data privacy controls across hospital management information systems (HMIS) and diagnostic servers.",
      outcome: "Zero patient data privacy breaches, complete regulatory trust"
    },
    {
      title: "Pharmacy Drug Dispensation & Narcotic Overwatch",
      description: "Auditing Schedule X/H drug registries, cold-storage vaccine fridges, and emergency life-saving medication stock reserves.",
      outcome: "100% drug controller compliance, zero audit discrepancies"
    }
  ],
  "dairy-beverages": [
    {
      title: "Raw Milk Adulteration & Aflatoxin GRC Overwatch",
      description: "Auditing chilling center rapid testing nodes for urea, detergents, antibiotic residues, and aflatoxin M1 contamination.",
      outcome: "100% pure raw milk intake, zero downstream product recalls"
    },
    {
      title: "Pasteurization Thermal Telemetry & FSMS Logs",
      description: "Validating HTST pasteurizer temperature-time recorders, automatic flow diversion valve telemetry, and CIP cleaning validation.",
      outcome: "Guaranteed microbiological safety, flawless food safety audits"
    },
    {
      title: "Packaged Drinking Water & Beverage BIS Audits",
      description: "Mandatory BIS certification testing for packaged water, bottle blow-molding hygiene, and CO2 purity in carbonated soft drinks.",
      outcome: "100% BIS compliance mark currency, zero market seizure risks"
    },
    {
      title: "Dairy & Brewery High-BOD Wastewater Treatment",
      description: "Monitoring anaerobic digester efficiency, biogas capture safety, and SPCB continuous effluent monitoring (CEMS) telemetry.",
      outcome: "Zero pollution board violations, renewable biogas utilization"
    }
  ],
  "cold-chain": [
    {
      title: "Cold-Chain Temperature & Telemetry GRC Overwatch",
      description: "Continuous validation of IoT temperature loggers, reefer fleet telematics, and cold store monitoring registers against FSSAI & CDSCO cold chain norms.",
      outcome: "Zero temperature excursion spoilage, 100% audit log veracity"
    },
    {
      title: "HACCP & FSMS Validation for Perishable Transit",
      description: "Codifying Hazard Analysis Critical Control Points (HACCP) for multimodal perishable transfer, airport cool-dolly handoffs, and dock staging.",
      outcome: "Flawless cold chain certification, zero cargo rejection"
    },
    {
      title: "Reefer Fleet Driver & Handler Labor Compliance",
      description: "Auditing interstate commercial driver hours of service, EHS hazardous refrigerant handling certifications, and contract loader registries.",
      outcome: "Full Motor Transport Workers Act adherence, zero transit delays"
    },
    {
      title: "Pharma GDP & Vaccine Cold Store Traceability",
      description: "Validation of secondary packaging, WHO-compliant cold rooms, and backup power failover telemetry for life-saving therapeutics.",
      outcome: "WHO-GDP certified distribution, continuous statutory audit readiness"
    }
  ],
  nutraceuticals: [
    {
      title: "FSSAI Health Supplements & Nutraceuticals Regulations",
      description: "Auditing formulation safety against FSSAI 2022 schedule limits for vitamins, minerals, amino acids, and botanical extracts.",
      outcome: "100% regulatory formulation approval, zero non-compliant products"
    },
    {
      title: "Nutritional Claim Substantiation & Clinical Data",
      description: "Evaluating scientific dossiers supporting health claims, structure-function claims, and immunity claim validations.",
      outcome: "Zero misleading advertisement notices from CCPA or ASCI"
    },
    {
      title: "Heavy Metal & Microbial Testing Governance",
      description: "Batch release testing protocols verifying absence of lead, cadmium, mercury, and pathogens in dietary supplements.",
      outcome: "Guaranteed consumer safety, pristine market credibility"
    },
    {
      title: "E-Commerce Nutraceutical Labeling Compliance",
      description: "Ensuring mandatory expiry dates, veg/non-veg logos, allergen warnings, and front-of-pack declarations on digital marketplaces.",
      outcome: "Unrestricted marketplace listings, zero regulatory takedowns"
    }
  ],

  // CLUSTER 8: CONSUMER & RETAIL
  retail: [
    {
      title: "Multi-Store Shops & Establishments Registration",
      description: "Centralized management of state-level shop licenses, opening/closing hour compliance, and statutory employment notices across store networks.",
      outcome: "100% valid shop licenses nationwide, zero municipal store sealings"
    },
    {
      title: "Legal Metrology Act In-Store Packaging Audits",
      description: "Ensuring maximum retail price (MRP) declarations, unit sale price, net quantity, and manufacturer address details meet metrology norms.",
      outcome: "Zero Legal Metrology inspector seizure notices or spot fines"
    },
    {
      title: "Store EHS, Fire Safety & Emergency Egress",
      description: "Routine inspections of customer emergency exits, fire extinguishers, electrical distribution boards, and public liability insurance.",
      outcome: "Zero customer safety incidents, 100% municipal fire NOC currency"
    },
    {
      title: "Retail Workforce Minimum Wage & Statutory Registers",
      description: "Auditing store associate shift rosters, overtime calculations, PF/ESIC deposits, and POSH committee compliance.",
      outcome: "Zero labor department citations, high retail workforce retention"
    }
  ],
  textiles: [
    {
      title: "Global Social Compliance & Buyer Audits (WRAP / SMETA)",
      description: "Preparing garment export units for worldwide buyer audits covering working hours, fair wages, overtime records, and worker welfare.",
      outcome: "Preferred export vendor rating, zero buyer audit non-conformities"
    },
    {
      title: "Zero Liquid Discharge (ZLD) Dyeing Unit EHS",
      description: "Continuous telemetry overwatch for reverse osmosis (RO) plants, multi-effect evaporators, and salt recovery in textile wet processing.",
      outcome: "100% ZLD consent currency, zero textile cluster closure notices"
    },
    {
      title: "OEKO-TEX & Chemical Restriction (ZDHC) Compliance",
      description: "Auditing Zero Discharge of Hazardous Chemicals (ZDHC) inventories, banned azo dye testing, and organic cotton GOTS certifications.",
      outcome: "Full international buyer compliance, unhindered export flows"
    },
    {
      title: "Factories Act Fire Safety & Spinning Mill Health",
      description: "Cotton dust extraction ventilation audits, spinning loom fire suppression systems, and worker respiratory health checkup registers.",
      outcome: "Zero catastrophic mill fires, verified occupational health safety"
    }
  ],
  ecommerce: [
    {
      title: "Consumer Protection (E-Commerce) Rules Compliance",
      description: "Auditing platform seller display details, country of origin disclosures, ticket grievance mechanisms, and refund turnaround.",
      outcome: "100% Ministry of Consumer Affairs compliance, zero penalty notices"
    },
    {
      title: "Digital Marketplace Data Privacy (DPDP)",
      description: "Hardening buyer address databases, user payment tokenization, and customer data consent management under the DPDP Act.",
      outcome: "Zero consumer data breach incidents, elevated digital consumer trust"
    },
    {
      title: "Marketplace Third-Party Seller Counterfeit Overwatch",
      description: "Proactive trademark infringement screening, notice-and-takedown procedures, and verified seller vetting pipelines.",
      outcome: "Safe harbor protection maintenance under IT Act Section 79"
    },
    {
      title: "Fulfillment Centre Warehousing EHS & Labor Audits",
      description: "Auditing fulfillment center automated conveyor safety, high-rack storage stability, and contract picker workforce welfare.",
      outcome: "Zero warehouse operational disruptions, 100% labor law compliance"
    }
  ],
  jewellery: [
    {
      title: "BIS Mandatory Hallmarking & HUID Batch Audits",
      description: "Auditing 6-digit Hallmark Unique Identification (HUID) laser engraving records, gold purity testing registers, and assay center logs.",
      outcome: "100% BIS hallmarking compliance, zero counterfeit gold seizures"
    },
    {
      title: "PMLA / FIU-IND Anti-Money Laundering Overwatch",
      description: "Strict enforcement of PAN card requirements for high-value jewelry transactions, cash transaction bans, and STR reporting pipelines.",
      outcome: "Zero FIU-IND regulatory penalties, impeccable statutory standing"
    },
    {
      title: "Showroom Armed Security & Vault Insurance Compliance",
      description: "Validating strongroom physical security specifications, dual-control access protocols, and jeweler block insurance warranty conditions.",
      outcome: "100% insurance warranty compliance, fully protected bullion assets"
    },
    {
      title: "Artisan & Goldsmith Workshop Occupational EHS",
      description: "Auditing acid fume extraction hoods in jewelry polishing units, crucible safety, and artisan welfare under the Factories Act.",
      outcome: "Zero occupational health citations, verified ethical craftsmanship"
    }
  ],
  "consumer-durables": [
    {
      title: "BEE Star Labeling Energy Efficiency Approvals",
      description: "Managing Bureau of Energy Efficiency (BEE) appliance test reports, star rating label renewals, and factory quality audit filings.",
      outcome: "Continuous BEE star rating approvals, zero market seizure friction"
    },
    {
      title: "E-Waste Management Rules & Extended Producer Responsibility",
      description: "Managing CPCB EPR authorization targets, certified e-waste dismantling contracts, and end-of-life appliance recycling returns.",
      outcome: "100% EPR target fulfillment, zero statutory environmental fines"
    },
    {
      title: "BIS Quality Control Orders (QCO) for Home Appliances",
      description: "Mandatory BIS ISI mark certification for electronic components, transformers, switchgear, and household electrical products.",
      outcome: "Unrestricted domestic retail distribution, zero seizure risks"
    },
    {
      title: "Consumer Warranty & After-Sales Service Redressal",
      description: "Auditing spare parts availability mandates, authorized service center labor contracts, and consumer grievance escalation channels.",
      outcome: "Zero consumer forum penalty awards, elevated brand loyalty"
    }
  ],
  "quick-commerce": [
    {
      title: "Dark Store Municipal Trade Licenses & Fire Safety",
      description: "Turnkey licensing for hyperlocal micro-fulfillment centers, clear aisle width verification, and fire extinguisher readiness.",
      outcome: "100% operational dark stores, zero municipal shutdown orders"
    },
    {
      title: "Gig Delivery Partner Welfare & Motor Vehicle EHS",
      description: "Statutory records for gig worker accidental insurance, electric delivery two-wheeler battery safety, and helmet/safety audits.",
      outcome: "Zero labor regulator citations, ethical gig economy operations"
    },
    {
      title: "Perishable Food Quality in Micro-Warehouses",
      description: "Monitoring daily cold-room temperatures, FSSAI fresh produce expiry discard logs, and pest control verification.",
      outcome: "Zero spoiled food deliveries, 100% consumer safety assurance"
    },
    {
      title: "Neighborhood Noise & Transit Logistics Governance",
      description: "Optimizing dark store night delivery staging, noise abatement barriers, and municipal parking compliance.",
      outcome: "Zero residential community friction, uninterrupted 24/7 delivery"
    }
  ],

  // CLUSTER 9: MEDIA & SERVICES
  "education-training": [
    {
      title: "UGC / AICTE Statutory Governance & Accreditation",
      description: "Assisting higher education institutions with mandatory National Assessment and Accreditation Council (NAAC) and regulatory filings.",
      outcome: "Attainment of Grade A+ NAAC status, uninterrupted university charters"
    },
    {
      title: "Campus Fire Safety, Building Stability & Disaster EHS",
      description: "Auditing high-rise academic building structural stability, laboratory chemical storage, and student fire evacuation preparedness.",
      outcome: "Zero campus safety incidents, 100% fire NOC renewals"
    },
    {
      title: "Student Personal Data Privacy & Examination Security",
      description: "Securing online student admission portals, entrance examination question paper vaults, and student academic record databases.",
      outcome: "Zero question paper or personal data leakages, robust DPDP posture"
    },
    {
      title: "Faculty Staffing Ratios & UGC Pay Code Compliance",
      description: "Auditing faculty-to-student ratios, mandatory qualification registries, and statutory employment contract disclosures.",
      outcome: "100% UGC inspection clearance, zero academic tribunal litigation"
    }
  ],
  "tourism-hospitality": [
    {
      title: "Hotel Star Classification & Ministry of Tourism Approvals",
      description: "Preparing luxury hotels and resorts for HRACC star categorization inspections covering guest amenities, safety, and hygiene.",
      outcome: "Prestigious 5-Star / Heritage classification award, premium status"
    },
    {
      title: "FSSAI Commercial Kitchen Hygiene & Food Safety",
      description: "Rigorous daily auditing of banquet food prep temperatures, cold storage logs, raw ingredient batch checks, and kitchen staff health.",
      outcome: "Zero food poisoning claims, 5-Star 'Eat Right' hygiene rating"
    },
    {
      title: "Swimming Pool, Spa & Guest Safety EHS",
      description: "Monitoring pool water chlorination levels, lifeguard deployment registers, and spa chemical safety certifications under municipal laws.",
      outcome: "Zero guest safety incidents, full municipal compliance"
    },
    {
      title: "Guest Identity Protection & Local Police C-Form Filings",
      description: "Automated verification of foreign tourist C-Form submissions, secure digital registration cards, and guest privacy under DPDP.",
      outcome: "100% immigration police compliance, complete guest privacy"
    }
  ],
  "media-entertainment": [
    {
      title: "Film & OTT Content Regulatory Compliance (CBFC / IT Rules)",
      description: "Auditing script and video footage for age classification ratings, self-regulatory body disclosures, and CBFC certification dossiers.",
      outcome: "Unimpeded theatrical and OTT releases, zero censorship injunctions"
    },
    {
      title: "Intellectual Property Rights & Copyright Clearing",
      description: "Comprehensive audits of music synchronization licenses, script chain-of-title agreements, and derivative rights protections.",
      outcome: "Zero copyright infringement lawsuits, bankable media assets"
    },
    {
      title: "Production Set EHS & Stunt Risk Mitigation",
      description: "On-set safety officers, stunt pyrotechnics permits, high-altitude rigging inspections, and cast insurance warranties.",
      outcome: "Zero film set accidents, full production insurance coverage"
    },
    {
      title: "Child Actor Welfare & Labor Guidelines",
      description: "Strict adherence to National Commission for Protection of Child Rights (NCPCR) guidelines regarding child artist working hours.",
      outcome: "100% legal compliance, protected ethical production standards"
    }
  ],
  aviation: [
    {
      title: "DGCA Civil Aviation Requirements (CAR) Compliance",
      description: "Auditing airline flight operations manuals, pilot flight duty time limitations (FDTL), and DGCA mandatory safety management systems.",
      outcome: "100% DGCA safety audit pass rate, zero regulatory flight groundings"
    },
    {
      title: "Airport Terminal EHS, Fire & Emergency Response",
      description: "Validating airport rescue and firefighting (ARFF) response times, runway foreign object debris (FOD) checks, and terminal fire NOCs.",
      outcome: "Zero runway safety deviations, full Aerodrome license currency"
    },
    {
      title: "Aviation MRO & Hangar Safety Standards",
      description: "Auditing aircraft maintenance engineer (AME) tool calibration, hazardous chemical painting hangars, and parts certification records.",
      outcome: "Certified safe maintenance operations, uninterrupted airworthiness"
    },
    {
      title: "Bureau of Civil Aviation Security (BCAS) Clearances",
      description: "Ensuring ground staff background checks, airside security passes, and cargo X-ray screening compliance under BCAS rules.",
      outcome: "Zero airport security lapses, continuous airside access"
    }
  ],
  broadcasting: [
    {
      title: "MIB Uplinking & Downlinking Guidelines Compliance",
      description: "Auditing satellite transponder leases, channel permission renewals with the Ministry of Information & Broadcasting, and security vetting.",
      outcome: "100% broadcast license currency, zero regulatory interruption"
    },
    {
      title: "Programme & Advertising Codes Overwatch",
      description: "Real-time auditing of broadcast feeds to comply with Cable TV Networks Programme Codes and Advertising Standards Council of India (ASCI) rules.",
      outcome: "Zero MIB show-cause notices, continuous clean transmission"
    },
    {
      title: "TRAI Quality of Service (QoS) & Subscriber Audits",
      description: "Auditing digital addressable system (DAS) encryption logs, subscriber billing records, and TRAI consumer grievance turnaround.",
      outcome: "Flawless TRAI regulatory audits, zero financial penalties"
    },
    {
      title: "Broadcast Studio EHS & Electrical Fire Safety",
      description: "High-intensity studio lighting electrical load audits, soundstage fire suppression, and backup generator emissions testing.",
      outcome: "Zero studio fire incidents, uninterrupted broadcast uptime"
    }
  ],
  "sports-events": [
    {
      title: "Mass Gathering Safety & Structural Stability Certifications",
      description: "Independent structural engineering certification for temporary spectator stands, stage trusses, and stadium turnstile capacities.",
      outcome: "100% structural safety approval, zero crowd crush risks"
    },
    {
      title: "Police & Fire Department Multi-Agency NOC Dossiers",
      description: "Coordinating multi-agency permits, traffic management routes, ambulance deployment, and emergency evacuation drills.",
      outcome: "Seamless event clearances, zero administrative delays"
    },
    {
      title: "Spectator Liability & Event Cancellation Insurance Warranties",
      description: "Auditing security perimeter bag searches, public liability warranties, and force majeure event cancellation triggers.",
      outcome: "Full insurance policy protection, zero unmitigated liabilities"
    },
    {
      title: "Anti-Doping & Sports Integrity Governance",
      description: "National Anti-Doping Agency (NADA) testing facility coordination, athlete privacy protocols, and sports integrity registers.",
      outcome: "Flawless tournament compliance, pristine athletic integrity"
    }
  ]
};
