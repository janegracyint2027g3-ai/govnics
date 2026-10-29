import React from "react";

export type CertificationCategory =
  | "standards"
  | "governance"
  | "cybersecurity"
  | "esg"
  | "quality"
  | "regulatory";

export interface CertificationItem {
  id: string;
  name: string;
  shortName: string;
  category: CertificationCategory;
  categoryName: string;
  badge: string;
  tagline: string;
  isFeatured: boolean; // One of the 18 core logos highlighted by the user
  frameworks: string[];
  description: string;
  auditCycle: string;
  typicalReadiness: string;
  applicableIndustries: string[];
  govenicsDeliverables: string[];
  accentColor: {
    border: string;
    bg: string;
    glow: string;
    text: string;
    pillBg: string;
  };
  logo: React.ReactNode;
}

/* =====================================================================
   ECSTASY LOGO EMBLEMS (Authentic Vector SVGs with Rich Aesthetics)
   ===================================================================== */

export const IsoLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="isoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B3C84" />
        <stop offset="50%" stopColor="#022B69" />
        <stop offset="100%" stopColor="#01183F" />
      </linearGradient>
      <radialGradient id="isoGlow" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#1E6BDB" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#01183F" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#isoGrad)" stroke="#1E6BDB" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="48" fill="url(#isoGlow)" />
    {/* Latitude & Longitude grid lines */}
    <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#4B90F6" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
    <ellipse cx="50" cy="50" rx="42" ry="32" stroke="#4B90F6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    <ellipse cx="50" cy="50" rx="18" ry="42" stroke="#4B90F6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    <line x1="8" y1="50" x2="92" y2="50" stroke="#4B90F6" strokeWidth="1" opacity="0.7" />
    <line x1="50" y1="8" x2="50" y2="92" stroke="#4B90F6" strokeWidth="1" opacity="0.7" />
    {/* Inner Gold ring */}
    <circle cx="50" cy="50" r="36" stroke="#E5A93C" strokeWidth="1.2" opacity="0.85" />
    {/* Sharp ISO Letters */}
    <text x="50" y="56" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" letterSpacing="2">
      ISO
    </text>
    <text x="50" y="70" textAnchor="middle" fill="#E5A93C" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="6.5" letterSpacing="1.2">
      INTERNATIONAL
    </text>
  </svg>
);

export const BsiLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bsiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B132B" />
        <stop offset="100%" stopColor="#1C2541" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="20" fill="url(#bsiGrad)" stroke="#3A506B" strokeWidth="2" />
    {/* Iconic Kitemark Symbol */}
    <path d="M50 14 L78 36 L50 82 L22 36 Z" fill="none" stroke="#E63946" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M50 14 L50 82" stroke="#E63946" strokeWidth="2.5" />
    <circle cx="50" cy="36" r="14" fill="#1C2541" stroke="#E63946" strokeWidth="2" />
    <path d="M42 36 L48 42 L60 30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* bsi. Text */}
    <text x="50" y="72" textAnchor="middle" fill="#FFFFFF" fontFamily="Georgia, serif" fontWeight="700" fontSize="16" letterSpacing="0.5">
      bsi<tspan fill="#E63946">.</tspan>
    </text>
  </svg>
);

export const TuvSudLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tuvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066B2" />
        <stop offset="100%" stopColor="#00437A" />
      </linearGradient>
    </defs>
    {/* Iconic Octagon */}
    <polygon points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30" fill="url(#tuvGrad)" stroke="#66B2FF" strokeWidth="2.5" />
    <polygon points="32,11 68,11 89,32 89,68 68,89 32,89 11,68 11,32" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
    {/* TÜV SÜD Typography */}
    <text x="50" y="46" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="19" letterSpacing="1">
      TÜV
    </text>
    <rect x="24" y="51" width="52" height="2" fill="#FFCC00" />
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="2">
      SÜD
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#FFCC00" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      GERMAN AUDIT
    </text>
  </svg>
);

export const DnvLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dnvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#00183C" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#dnvGrad)" stroke="#1D4ED8" strokeWidth="2" />
    {/* 3 Iconic Maritime Waves */}
    <path d="M20 28 Q 35 20, 50 28 T 80 28" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M20 37 Q 35 29, 50 37 T 80 37" stroke="#60A5FA" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M20 46 Q 35 38, 50 46 T 80 46" stroke="#93C5FD" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* DNV Text */}
    <text x="50" y="72" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="23" letterSpacing="3">
      DNV
    </text>
    <text x="50" y="83" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="6" letterSpacing="1.5">
      ASSURANCE
    </text>
  </svg>
);

export const SgsLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sgsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#sgsGrad)" stroke="#F97316" strokeWidth="2" />
    {/* Orange Compass Starburst */}
    <g transform="translate(50, 32)">
      <circle cx="0" cy="0" r="14" fill="#F97316" fillOpacity="0.2" />
      <path d="M0 -15 L3 -4 L14 0 L3 4 L0 15 L-3 4 L-14 0 L-3 -4 Z" fill="#EA580C" />
      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
    </g>
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="24" letterSpacing="2">
      SGS
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#FB923C" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      VERIFICATION
    </text>
  </svg>
);

export const BureauVeritasLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#881337" />
        <stop offset="100%" stopColor="#4C0519" />
      </linearGradient>
    </defs>
    <path d="M50 4 L88 18 L88 54 Q 88 84, 50 96 Q 12 84, 12 54 L 12 18 Z" fill="url(#bvGrad)" stroke="#F59E0B" strokeWidth="2.5" />
    {/* Lady Veritas Balance / Torch Crest Motif */}
    <circle cx="50" cy="30" r="10" stroke="#FBBF24" strokeWidth="1.5" fill="#4C0519" />
    <path d="M50 24 L50 36 M44 28 L56 28 M42 34 L46 34 M54 34 L58 34" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    {/* Text */}
    <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="11" letterSpacing="1">
      BUREAU
    </text>
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="10.5" letterSpacing="1">
      VERITAS
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#F59E0B" fontFamily="Georgia, serif" fontStyle="italic" fontSize="7" letterSpacing="1">
      1828
    </text>
  </svg>
);

export const CosoLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cosoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#042F2E" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#cosoGrad)" stroke="#0D9488" strokeWidth="2" />
    {/* 3D Isometric Framework Cube */}
    <g transform="translate(50, 36) scale(0.9)">
      {/* Top face */}
      <polygon points="0,-18 20,-8 0,2 -20,-8" fill="#14B8A6" stroke="#042F2E" strokeWidth="1" />
      {/* Right face */}
      <polygon points="0,2 20,-8 20,14 0,24" fill="#0F766E" stroke="#042F2E" strokeWidth="1" />
      {/* Left face */}
      <polygon points="0,2 -20,-8 -20,14 0,24" fill="#115E59" stroke="#042F2E" strokeWidth="1" />
    </g>
    <text x="50" y="72" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20" letterSpacing="2">
      COSO
    </text>
    <text x="50" y="83" textAnchor="middle" fill="#2DD4BF" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      INTERNAL CONTROL
    </text>
  </svg>
);

export const IsacaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="isacaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B132B" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#isacaGrad)" stroke="#3B82F6" strokeWidth="2" />
    {/* Interconnected Network Node Crest */}
    <circle cx="50" cy="30" r="6" fill="#60A5FA" />
    <circle cx="34" cy="42" r="5" fill="#34D399" />
    <circle cx="66" cy="42" r="5" fill="#F472B6" />
    <line x1="50" y1="30" x2="34" y2="42" stroke="#93C5FD" strokeWidth="1.5" />
    <line x1="50" y1="30" x2="66" y2="42" stroke="#93C5FD" strokeWidth="1.5" />
    <line x1="34" y1="42" x2="66" y2="42" stroke="#93C5FD" strokeWidth="1.5" />
    {/* Text */}
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="19" letterSpacing="2">
      ISACA
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#93C5FD" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      AUDIT &amp; GOVERNANCE
    </text>
  </svg>
);

export const CobitLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cobitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E1B4B" />
        <stop offset="100%" stopColor="#312E81" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#cobitGrad)" stroke="#818CF8" strokeWidth="2" />
    {/* Hexagon Blueprint Matrix */}
    <polygon points="50,16 68,26 68,46 50,56 32,46 32,26" fill="none" stroke="#A5B4FC" strokeWidth="2" />
    <polygon points="50,22 62,29 62,43 50,50 38,43 38,29" fill="#4338CA" fillOpacity="0.5" stroke="#C7D2FE" strokeWidth="1" />
    <circle cx="50" cy="36" r="4" fill="#38BDF8" />
    {/* Text */}
    <text x="50" y="73" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="19" letterSpacing="2">
      COBIT
    </text>
    <text x="50" y="84" textAnchor="middle" fill="#A5B4FC" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      IT GOVERNANCE 2019
    </text>
  </svg>
);

export const IiaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#18181B" />
        <stop offset="100%" stopColor="#27272A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#iiaGrad)" stroke="#D97706" strokeWidth="2" />
    <circle cx="50" cy="34" r="16" stroke="#F59E0B" strokeWidth="2" fill="none" />
    <path d="M50 22 L50 46 M38 34 L62 34" stroke="#FBBF24" strokeWidth="1.5" />
    <circle cx="50" cy="34" r="5" fill="#D97706" />
    <text x="50" y="69" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="21" letterSpacing="2">
      IIA
    </text>
    <text x="50" y="81" textAnchor="middle" fill="#FBBF24" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      INTERNAL AUDITORS
    </text>
  </svg>
);

export const Iso31000Logo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iso31Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#172554" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#iso31Grad)" stroke="#60A5FA" strokeWidth="2" />
    {/* Risk Matrix Grid */}
    <g transform="translate(35, 18)">
      <rect x="0" y="0" width="9" height="9" fill="#22C55E" rx="1.5" />
      <rect x="11" y="0" width="9" height="9" fill="#EAB308" rx="1.5" />
      <rect x="22" y="0" width="9" height="9" fill="#EF4444" rx="1.5" />
      <rect x="0" y="11" width="9" height="9" fill="#22C55E" rx="1.5" />
      <rect x="11" y="11" width="9" height="9" fill="#EAB308" rx="1.5" />
      <rect x="22" y="11" width="9" height="9" fill="#EF4444" rx="1.5" />
    </g>
    <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
      ISO 31000
    </text>
    <text x="50" y="74" textAnchor="middle" fill="#93C5FD" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="8" letterSpacing="1.5">
      RISK MANAGEMENT
    </text>
    <text x="50" y="84" textAnchor="middle" fill="#E2E8F0" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="5.5" letterSpacing="0.8">
      FRAMEWORK &amp; GUIDELINES
    </text>
  </svg>
);

export const Iso27001Logo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iso27Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B132B" />
        <stop offset="100%" stopColor="#00183C" />
      </linearGradient>
    </defs>
    {/* Cyber Shield */}
    <path d="M50 4 L88 18 L88 52 Q 88 82, 50 96 Q 12 82, 12 52 L 12 18 Z" fill="url(#iso27Grad)" stroke="#06B6D4" strokeWidth="2.5" />
    {/* Padlock Icon */}
    <rect x="40" y="32" width="20" height="15" rx="3" fill="#06B6D4" />
    <path d="M43 32 V 24 Q 43 18, 50 18 Q 57 18, 57 24 V 32" stroke="#06B6D4" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="38" r="2" fill="#0B132B" />
    <path d="M50 40 V 43" stroke="#0B132B" strokeWidth="1.5" />
    {/* Stamping */}
    <text x="50" y="62" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="11" letterSpacing="1">
      ISO/IEC
    </text>
    <text x="50" y="74" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
      27001
    </text>
    <text x="50" y="84" textAnchor="middle" fill="#67E8F9" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      CYBER ISMS
    </text>
  </svg>
);

export const NistLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#nistGrad)" stroke="#0284C7" strokeWidth="2" />
    {/* Geometric Compass/Diamond */}
    <g transform="translate(50, 32)">
      <polygon points="0,-16 16,0 0,16 -16,0" fill="none" stroke="#38BDF8" strokeWidth="2" />
      <polygon points="0,-10 10,0 0,10 -10,0" fill="#0284C7" />
      <line x1="-20" y1="0" x2="20" y2="0" stroke="#0284C7" strokeWidth="1" />
      <line x1="0" y1="-20" x2="0" y2="20" stroke="#0284C7" strokeWidth="1" />
    </g>
    <text x="50" y="69" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="21" letterSpacing="2">
      NIST
    </text>
    <text x="50" y="81" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      CYBER FRAMEWORK
    </text>
  </svg>
);

export const CisLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#172554" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#cisGrad)" stroke="#3B82F6" strokeWidth="2" />
    {/* Target with Crosshair & Shields */}
    <circle cx="50" cy="33" r="15" fill="none" stroke="#60A5FA" strokeWidth="2" />
    <circle cx="50" cy="33" r="7" fill="#2563EB" />
    <line x1="28" y1="33" x2="72" y2="33" stroke="#93C5FD" strokeWidth="1.5" />
    <line x1="50" y1="11" x2="50" y2="55" stroke="#93C5FD" strokeWidth="1.5" />
    <text x="50" y="70" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" letterSpacing="3">
      CIS
    </text>
    <text x="50" y="82" textAnchor="middle" fill="#93C5FD" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      CRITICAL CONTROLS
    </text>
  </svg>
);

export const Isc2Logo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="isc2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#022C22" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#isc2Grad)" stroke="#10B981" strokeWidth="2" />
    <g transform="translate(50, 32)">
      <circle cx="0" cy="0" r="16" fill="none" stroke="#34D399" strokeWidth="2" />
      <polygon points="0,-12 11,-4 7,10 -7,10 -11,-4" fill="#059669" />
      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
    </g>
    <text x="50" y="69" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
      (ISC)²
    </text>
    <text x="50" y="81" textAnchor="middle" fill="#34D399" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      CISSP ACCREDITED
    </text>
  </svg>
);

export const EcCouncilLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ecGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7F1D1D" />
        <stop offset="100%" stopColor="#450A0A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#ecGrad)" stroke="#EF4444" strokeWidth="2" />
    {/* Shield with Cyber Node */}
    <polygon points="50,14 74,25 74,45 50,58 26,45 26,25" fill="#991B1B" stroke="#F87171" strokeWidth="1.5" />
    <circle cx="50" cy="35" r="5" fill="#FCA5A5" />
    <text x="50" y="73" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.5">
      EC-COUNCIL
    </text>
    <text x="50" y="84" textAnchor="middle" fill="#F87171" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      CEH &amp; CYBER AUDIT
    </text>
  </svg>
);

export const GriLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="griGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#022C22" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#griGrad)" stroke="#10B981" strokeWidth="2" />
    {/* Infinity Sustainability Leaf Loop */}
    <g transform="translate(50, 32)">
      <path d="M-14 0 C -14 -10, 0 -10, 0 0 C 0 10, 14 10, 14 0 C 14 -10, 0 -10, 0 0 C 0 10, -14 10, -14 0 Z" fill="none" stroke="#34D399" strokeWidth="3" />
      <circle cx="0" cy="0" r="3" fill="#6EE7B7" />
    </g>
    <text x="50" y="69" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="23" letterSpacing="2">
      GRI
    </text>
    <text x="50" y="81" textAnchor="middle" fill="#34D399" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1.2">
      ESG STANDARDS
    </text>
  </svg>
);

export const CdpLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cdpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#065F46" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#cdpGrad)" stroke="#059669" strokeWidth="2" />
    {/* Earth & Carbon Disclosure Arc */}
    <circle cx="50" cy="33" r="14" fill="none" stroke="#6EE7B7" strokeWidth="2" />
    <path d="M40 33 Q 50 20, 60 33" stroke="#A7F3D0" strokeWidth="2" fill="none" />
    <path d="M38 38 L62 28" stroke="#34D399" strokeWidth="2" />
    <text x="50" y="69" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" letterSpacing="2">
      CDP
    </text>
    <text x="50" y="81" textAnchor="middle" fill="#A7F3D0" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      CARBON DISCLOSURE
    </text>
  </svg>
);

export const EcoVadisLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ecoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#78350F" />
        <stop offset="100%" stopColor="#451A03" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#ecoGrad)" stroke="#F59E0B" strokeWidth="2" />
    {/* EcoVadis Medal & Leaf Motif */}
    <circle cx="50" cy="32" r="14" fill="#B45309" stroke="#FCD34D" strokeWidth="2" />
    <path d="M50 22 C 58 22, 58 36, 50 42 C 42 36, 42 22, 50 22 Z" fill="#F59E0B" />
    <circle cx="50" cy="32" r="3" fill="#FEF3C7" />
    <text x="50" y="66" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.5">
      ecovadis
    </text>
    <text x="50" y="78" textAnchor="middle" fill="#FCD34D" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="7.5" letterSpacing="1">
      SUSTAINABILITY
    </text>
  </svg>
);

export const MsciEsgLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="msciGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#msciGrad)" stroke="#0D9488" strokeWidth="2" />
    {/* AAA Rating indicator bar */}
    <g transform="translate(25, 20)">
      <rect x="0" y="6" width="9" height="14" fill="#0D9488" rx="2" />
      <rect x="13" y="4" width="9" height="16" fill="#14B8A6" rx="2" />
      <rect x="26" y="2" width="9" height="18" fill="#2DD4BF" rx="2" />
      <rect x="39" y="0" width="11" height="20" fill="#5EEAD4" rx="2" />
    </g>
    <text x="50" y="62" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="17" letterSpacing="1.5">
      MSCI
    </text>
    <text x="50" y="74" textAnchor="middle" fill="#2DD4BF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="12" letterSpacing="2">
      ESG RATINGS
    </text>
    <text x="50" y="84" textAnchor="middle" fill="#94A3B8" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="5.5" letterSpacing="1">
      AAA BENCHMARK
    </text>
  </svg>
);

export const SbtiLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sbtiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#042F2E" />
        <stop offset="100%" stopColor="#134E4A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#sbtiGrad)" stroke="#2DD4BF" strokeWidth="2" />
    {/* Target Arc for Net Zero */}
    <circle cx="50" cy="33" r="14" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="4 2" />
    <circle cx="50" cy="33" r="7" fill="#14B8A6" />
    <path d="M50 15 L50 22 M50 44 L50 51 M32 33 L39 33 M61 33 L68 33" stroke="#5EEAD4" strokeWidth="2" />
    <text x="50" y="70" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="21" letterSpacing="2">
      SBTi
    </text>
    <text x="50" y="82" textAnchor="middle" fill="#5EEAD4" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      NET-ZERO TARGETS
    </text>
  </svg>
);

export const Iso9001Logo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iso9Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0A2540" />
        <stop offset="100%" stopColor="#00183C" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#iso9Grad)" stroke="#F59E0B" strokeWidth="2.5" />
    {/* Quality Gear & Seal */}
    <g transform="translate(50, 32)">
      <circle cx="0" cy="0" r="12" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M-6 0 L-2 4 L6 -4" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="50" y="60" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
      ISO 9001
    </text>
    <text x="50" y="72" textAnchor="middle" fill="#FBBF24" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="8" letterSpacing="1.5">
      QUALITY
    </text>
    <text x="50" y="82" textAnchor="middle" fill="#93C5FD" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="5.5" letterSpacing="1">
      MANAGEMENT SYSTEM
    </text>
  </svg>
);

export const IatfLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iatfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#iatfGrad)" stroke="#38BDF8" strokeWidth="2" />
    {/* Automotive Speed / Checkered Quality */}
    <path d="M24 35 L40 20 L76 20 L60 35 Z" fill="#0284C7" />
    <path d="M30 42 L66 42" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    <path d="M36 48 L60 48" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="1">
      IATF 16949
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      AUTOMOTIVE QUALITY
    </text>
  </svg>
);

export const GmpLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gmpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#022C22" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#gmpGrad)" stroke="#34D399" strokeWidth="2" />
    {/* Sterile Pharma Cross */}
    <g transform="translate(50, 32)">
      <rect x="-4" y="-12" width="8" height="24" fill="#34D399" rx="2" />
      <rect x="-12" y="-4" width="24" height="8" fill="#34D399" rx="2" />
      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
    </g>
    <text x="50" y="69" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" letterSpacing="2">
      GMP
    </text>
    <text x="50" y="81" textAnchor="middle" fill="#6EE7B7" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      GOOD MANUFACTURING
    </text>
  </svg>
);

export const LeanSixSigmaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lssGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#18181B" />
        <stop offset="100%" stopColor="#27272A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#lssGrad)" stroke="#EF4444" strokeWidth="2" />
    {/* Greek Letter Sigma Σ with Belt Chevrons */}
    <g transform="translate(50, 32)">
      <text x="0" y="10" textAnchor="middle" fill="#EF4444" fontFamily="serif" fontWeight="900" fontSize="34">
        Σ
      </text>
      <path d="M-22 14 L0 22 L22 14" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
      LEAN SIX SIGMA
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#EF4444" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="6" letterSpacing="1.2">
      DMAIC EXCELLENCE
    </text>
  </svg>
);

export const RbiLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rbiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B1E40" />
        <stop offset="100%" stopColor="#00112C" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#rbiGrad)" stroke="#E5A93C" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="39" stroke="#E5A93C" strokeWidth="1" strokeDasharray="2 2" fill="none" />
    {/* Tiger & Palm Tree Emblem Motif */}
    <g transform="translate(50, 32)">
      {/* Palm tree trunk & fronds */}
      <path d="M-6 8 Q -4 -4, 0 -12 Q 4 -4, 6 8" stroke="#E5A93C" strokeWidth="2" fill="none" />
      <path d="M0 -12 Q -12 -16, -14 -6 M0 -12 Q 12 -16, 14 -6 M0 -12 Q 0 -20, 0 -22" stroke="#E5A93C" strokeWidth="1.5" fill="none" />
      {/* Tiger silhouette */}
      <path d="M-12 6 Q -6 0, 0 6 Q 6 12, 12 6 L 10 12 L -10 12 Z" fill="#E5A93C" />
    </g>
    <text x="50" y="62" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" letterSpacing="2">
      RBI
    </text>
    <text x="50" y="73" textAnchor="middle" fill="#E5A93C" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="6.5" letterSpacing="1">
      RESERVE BANK OF INDIA
    </text>
    <text x="50" y="83" textAnchor="middle" fill="#93C5FD" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="5" letterSpacing="0.8">
      STATUTORY REGULATOR
    </text>
  </svg>
);

export const SebiLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sebiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#sebiGrad)" stroke="#F59E0B" strokeWidth="2" />
    {/* Saffron & Blue Growth Chart Curve */}
    <g transform="translate(50, 32)">
      <path d="M-22 10 Q -6 8, 4 -2 T 22 -14" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <polygon points="22,-14 15,-13 19,-8" fill="#F59E0B" />
      <circle cx="22" cy="-14" r="3" fill="#FCD34D" />
    </g>
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="21" letterSpacing="2">
      SEBI
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#FCD34D" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      SECURITIES &amp; EXCHANGE
    </text>
  </svg>
);

export const McaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mcaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0A2540" />
        <stop offset="100%" stopColor="#00183C" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#mcaGrad)" stroke="#E5A93C" strokeWidth="2" />
    {/* Ashoka Pillar Lion Crest Representation */}
    <g transform="translate(50, 30)">
      <rect x="-8" y="10" width="16" height="4" fill="#E5A93C" />
      <circle cx="0" cy="0" r="10" fill="#0A2540" stroke="#E5A93C" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="4" fill="#3B82F6" />
      {/* Tricolor stripe accent */}
      <rect x="-14" y="16" width="9" height="2" fill="#FF9933" />
      <rect x="-5" y="16" width="10" height="2" fill="#FFFFFF" />
      <rect x="5" y="16" width="9" height="2" fill="#138808" />
    </g>
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="21" letterSpacing="2">
      MCA
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#E5A93C" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      MINISTRY OF CORP AFFAIRS
    </text>
  </svg>
);

export const BisLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7F1D1D" />
        <stop offset="100%" stopColor="#450A0A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#bisGrad)" stroke="#F87171" strokeWidth="2" />
    {/* Official Inverted Triangle ISI Standard Mark */}
    <polygon points="50,16 74,48 26,48" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
    <line x1="50" y1="26" x2="50" y2="44" stroke="#FFFFFF" strokeWidth="2" />
    <text x="50" y="44" textAnchor="middle" fill="#FCA5A5" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="10">
      ISI
    </text>
    <text x="50" y="70" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="21" letterSpacing="2">
      BIS
    </text>
    <text x="50" y="82" textAnchor="middle" fill="#FCA5A5" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      BUREAU OF INDIAN STDS
    </text>
  </svg>
);

export const CpcbLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cpcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#065F46" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#cpcbGrad)" stroke="#34D399" strokeWidth="2" />
    {/* Clean River & Canopy Wave */}
    <g transform="translate(50, 32)">
      <circle cx="0" cy="-6" r="10" fill="#34D399" fillOpacity="0.4" />
      <path d="M-16 6 Q -8 0, 0 6 T 16 6" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
      <path d="M-16 11 Q -8 5, 0 11 T 16 11" stroke="#67E8F9" strokeWidth="2" fill="none" />
    </g>
    <text x="50" y="69" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20" letterSpacing="2">
      CPCB
    </text>
    <text x="50" y="81" textAnchor="middle" fill="#34D399" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      POLLUTION CONTROL
    </text>
  </svg>
);

export const FssaiLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fssaiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="18" fill="url(#fssaiGrad)" stroke="#F97316" strokeWidth="2" />
    {/* Food Safety Tick & Sun */}
    <g transform="translate(50, 32)">
      <circle cx="0" cy="0" r="14" fill="#EA580C" fillOpacity="0.2" />
      <path d="M-6 0 L-2 4 L8 -6" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="0" cy="0" r="14" stroke="#F97316" strokeWidth="2" fill="none" strokeDasharray="3 2" />
    </g>
    <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="19" letterSpacing="1.5">
      fssai
    </text>
    <text x="50" y="80" textAnchor="middle" fill="#F97316" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="5.5" letterSpacing="1">
      FOOD SAFETY AUTHORITY
    </text>
  </svg>
);

/* =====================================================================
   ALL 31 CERTIFICATIONS & ACCREDITATION STANDARDS DATA
   ===================================================================== */

export const certificationsDirectory: CertificationItem[] = [
  // ── 1. STANDARDS & CERTIFICATIONS ───────────────────────────────
  {
    id: "iso-international",
    name: "ISO - International Organization for Standardization",
    shortName: "ISO",
    category: "standards",
    categoryName: "Standards & Certifications",
    badge: "Global Standard Setting Body",
    tagline: "The world's benchmark for proprietary, industrial, and commercial standard harmonization across 170+ member states.",
    isFeatured: true,
    frameworks: ["ISO 9001", "ISO 27001", "ISO 14001", "ISO 45001", "ISO 22301"],
    description: "End-to-end alignment and certification management spanning quality, cybersecurity, EHS, ESG, and business continuity. Turnkey documentation, internal audit protocols, and zero-deviation closure.",
    auditCycle: "3-Year Re-certification (Annual Surveillance)",
    typicalReadiness: "30 - 60 Days",
    applicableIndustries: ["Manufacturing", "IT & Cloud", "Healthcare", "BFSI", "Logistics"],
    govenicsDeliverables: [
      "Integrated Management System (IMS) documentation pack",
      "Automated evidence repository with tamper-evident audit logs",
      "Lead Auditor mock drills and non-conformity remediation war room",
      "Accredited Registrar coordination & certificate guarantee"
    ],
    accentColor: {
      border: "border-blue-500/40",
      bg: "from-blue-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(30,107,219,0.35)]",
      text: "text-blue-400",
      pillBg: "bg-blue-500/10 text-blue-300 border-blue-500/30"
    },
    logo: <IsoLogo />
  },
  {
    id: "bsi-kitemark",
    name: "BSI - British Standards Institution",
    shortName: "BSI",
    category: "standards",
    categoryName: "Standards & Certifications",
    badge: "Royal Charter Certification Body",
    tagline: "The world's original national standards body, recognized internationally for the prestigious Kitemark quality and security verification.",
    isFeatured: true,
    frameworks: ["BSI Kitemark", "BS 10012", "PAS 2060 (Carbon Neutral)", "BS EN ISO 19650"],
    description: "Rigorous certification guidance for enterprise software, building information modeling (BIM), IoT security, and personal information management systems under BSI accreditation.",
    auditCycle: "Annual Surveillance",
    typicalReadiness: "45 Days",
    applicableIndustries: ["Infrastructure", "Enterprise SaaS", "Medical Devices", "Automotive"],
    govenicsDeliverables: [
      "BSI Kitemark technical file and sample testing preparation",
      "Carbon neutrality validation dossiers under PAS 2060",
      "UK & EU regulatory convergence matrices for Indian exporters"
    ],
    accentColor: {
      border: "border-rose-500/40",
      bg: "from-rose-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(225,29,72,0.35)]",
      text: "text-rose-400",
      pillBg: "bg-rose-500/10 text-rose-300 border-rose-500/30"
    },
    logo: <BsiLogo />
  },
  {
    id: "tuv-sud",
    name: "TÜV SÜD - Technischer Überwachungsverein",
    shortName: "TÜV SÜD",
    category: "standards",
    categoryName: "Standards & Certifications",
    badge: "German Precision Auditing",
    tagline: "Premier German testing, inspection, and certification leader trusted worldwide for industrial safety, cybersecurity, and clean energy.",
    isFeatured: true,
    frameworks: ["IEC 62443", "ISO 26262 (Functional Safety)", "EN 50128", "ISO 50001 (Energy)"],
    description: "Specialized engineering audits for automotive electric vehicles, industrial IoT plant floor safety, medical equipment CE marking, and industrial cybersecurity under IEC 62443.",
    auditCycle: "Annual Technical Audit",
    typicalReadiness: "60 Days",
    applicableIndustries: ["Automotive & EV", "Industrial IoT", "Renewable Energy", "Medical Devices"],
    govenicsDeliverables: [
      "Functional safety lifecycle (HARA, ASIL decomposition, safety cases)",
      "OT/SCADA industrial cybersecurity gap assessment",
      "TÜV SÜD pre-audit defense dossiers and lab liaison"
    ],
    accentColor: {
      border: "border-sky-500/40",
      bg: "from-sky-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(14,165,233,0.35)]",
      text: "text-sky-400",
      pillBg: "bg-sky-500/10 text-sky-300 border-sky-500/30"
    },
    logo: <TuvSudLogo />
  },
  {
    id: "dnv-assurance",
    name: "DNV - Det Norske Veritas",
    shortName: "DNV",
    category: "standards",
    categoryName: "Standards & Certifications",
    badge: "Maritime & Energy Risk Authority",
    tagline: "Global assurance provider safeguarding life, property, and the environment across maritime, energy transition, and digital resilience.",
    isFeatured: true,
    frameworks: ["DNV Cyber Secure", "ISO 14064 (GHG Verification)", "ISAE 3000", "ESG Scorecard"],
    description: "Rigorous third-party verification for corporate ESG disclosures, Scope 1-3 greenhouse gas accounting, maritime supply chains, and high-assurance digital cloud security.",
    auditCycle: "Annual Reporting Cycle",
    typicalReadiness: "30 - 45 Days",
    applicableIndustries: ["Energy & Utilities", "Maritime & Shipping", "Heavy Chemicals", "Data Centers"],
    govenicsDeliverables: [
      "Third-party reasonable & limited assurance readiness",
      "Greenhouse Gas (GHG) inventory verification packs",
      "Critical infrastructure resilience benchmark against DNV standards"
    ],
    accentColor: {
      border: "border-blue-600/40",
      bg: "from-blue-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]",
      text: "text-blue-400",
      pillBg: "bg-blue-600/10 text-blue-300 border-blue-600/30"
    },
    logo: <DnvLogo />
  },
  {
    id: "sgs-verification",
    name: "SGS - Société Générale de Surveillance",
    shortName: "SGS",
    category: "standards",
    categoryName: "Standards & Certifications",
    badge: "World Leader in Inspection",
    tagline: "The world's leading inspection, verification, testing, and certification company with over 99,000 employees operating worldwide.",
    isFeatured: true,
    frameworks: ["BRCGS Food Safety", "Sedex SMETA", "ISO 22000", "SA 8000"],
    description: "Turnkey readiness for supply chain ethical labor audits (SMETA), farm-to-fork food safety, factory social compliance, and environmental testing for consumer goods.",
    auditCycle: "Annual / Semi-Annual Spot Audits",
    typicalReadiness: "21 - 45 Days",
    applicableIndustries: ["FMCG & Food Processing", "Textiles & Retail", "Agri-Business", "Chemicals"],
    govenicsDeliverables: [
      "Ethical trade SMETA 2-Pillar & 4-Pillar audit readiness",
      "HACCP & allergen control cross-contamination protocols",
      "SGS on-site mock walkthroughs and CAPA management"
    ],
    accentColor: {
      border: "border-orange-500/40",
      bg: "from-orange-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(249,115,22,0.35)]",
      text: "text-orange-400",
      pillBg: "bg-orange-500/10 text-orange-300 border-orange-500/30"
    },
    logo: <SgsLogo />
  },
  {
    id: "bureau-veritas",
    name: "Bureau Veritas - Testing, Inspection & Certification",
    shortName: "Bureau Veritas",
    category: "standards",
    categoryName: "Standards & Certifications",
    badge: "Historic Certification Giant (1828)",
    tagline: "Founded in 1828, Bureau Veritas is a world leader in testing, inspection, and certification across buildings, infrastructure, and commodities.",
    isFeatured: true,
    frameworks: ["ISO 55001 (Asset Management)", "LEED Green Building", "BREEAM", "AS9100 Aerospace"],
    description: "Asset integrity management, green infrastructure building certification, aerospace precision manufacturing compliance, and heavy industrial plant compliance.",
    auditCycle: "Annual Surveillance",
    typicalReadiness: "45 - 90 Days",
    applicableIndustries: ["Aerospace & Defense", "Real Estate & EPC", "Commodities", "Heavy Engineering"],
    govenicsDeliverables: [
      "AS9100 Rev D quality manual and First Article Inspection (FAI) dossiers",
      "LEED/IGBC green building commissioning records",
      "Bureau Veritas registrar coordination and auditor defense pack"
    ],
    accentColor: {
      border: "border-rose-600/40",
      bg: "from-rose-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(225,29,72,0.35)]",
      text: "text-rose-400",
      pillBg: "bg-rose-600/10 text-rose-300 border-rose-600/30"
    },
    logo: <BureauVeritasLogo />
  },

  // ── 2. GOVERNANCE & RISK ─────────────────────────────────────────
  {
    id: "coso-erm",
    name: "COSO - Internal Control & ERM Integrated Framework",
    shortName: "COSO",
    category: "governance",
    categoryName: "Governance & Risk",
    badge: "Boardroom ERM Gold Standard",
    tagline: "The definitive global model for designing, implementing, and assessing internal control systems and enterprise risk management.",
    isFeatured: false,
    frameworks: ["COSO 2013 Internal Control", "COSO ERM 2017", "SOX 404 Internal Controls"],
    description: "Holistic 5-component, 17-principle internal control mapping. Protects public listed companies against fraudulent reporting, financial misstatements, and operational failure.",
    auditCycle: "Annual Audit Committee Review",
    typicalReadiness: "45 Days",
    applicableIndustries: ["BFSI", "Public Listed Companies", "Healthcare", "Fintech"],
    govenicsDeliverables: [
      "Entity-Level Control (ELC) and Process-Level Control (PLC) matrices",
      "Risk Control Matrix (RCM) with automated walkthrough test scripts",
      "Board Audit Committee executive dashboards & fraud risk assessments"
    ],
    accentColor: {
      border: "border-teal-500/40",
      bg: "from-teal-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(20,184,166,0.35)]",
      text: "text-teal-400",
      pillBg: "bg-teal-500/10 text-teal-300 border-teal-500/30"
    },
    logo: <CosoLogo />
  },
  {
    id: "isaca-governance",
    name: "ISACA - Information Systems Audit and Control Association",
    shortName: "ISACA",
    category: "governance",
    categoryName: "Governance & Risk",
    badge: "IT Governance Authority",
    tagline: "Global professional association advancing cybersecurity, IT audit, information security governance, and enterprise risk management.",
    isFeatured: true,
    frameworks: ["CISA Audit Standards", "CRISC Risk Model", "CGEIT", "CSX Cybersecurity"],
    description: "Enterprise IT auditing and cyber governance benchmarks. Powers C-suite assurance across cloud architectures, vendor ecosystems, and digital transformation initiatives.",
    auditCycle: "Annual Surveillance",
    typicalReadiness: "30 Days",
    applicableIndustries: ["IT Services & BPO", "Fintech & Banking", "Telecommunications", "HealthTech"],
    govenicsDeliverables: [
      "IT general controls (ITGC) audit readiness across cloud environments",
      "Role-based segregation of duties (SoD) analytics",
      "Certified ISACA practitioner-led mock audits"
    ],
    accentColor: {
      border: "border-blue-500/40",
      bg: "from-blue-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]",
      text: "text-blue-400",
      pillBg: "bg-blue-500/10 text-blue-300 border-blue-500/30"
    },
    logo: <IsacaLogo />
  },
  {
    id: "cobit-framework",
    name: "COBIT - Control Objectives for Information Technologies",
    shortName: "COBIT",
    category: "governance",
    categoryName: "Governance & Risk",
    badge: "Enterprise IT Alignment",
    tagline: "The world-leading framework for enterprise governance of information and technology (EGIT) created by ISACA.",
    isFeatured: true,
    frameworks: ["COBIT 2019 Design Guide", "Governance Objectives (EDM)", "Management Objectives (APO/BAI/DSS/MEA)"],
    description: "Aligns business strategy with technology investment, defining 40 core governance and management objectives with quantitative maturity level scoring (CMMI levels 1-5).",
    auditCycle: "Bi-Annual Capability Evaluation",
    typicalReadiness: "30 - 45 Days",
    applicableIndustries: ["BFSI", "Enterprise Tech", "Government Agencies", "Pharma"],
    govenicsDeliverables: [
      "COBIT 2019 Design Toolkit customized governance system",
      "Process capability maturity assessments (Levels 0-5)",
      "Target operating model (TOM) bridging IT teams with board oversight"
    ],
    accentColor: {
      border: "border-indigo-500/40",
      bg: "from-indigo-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(99,102,241,0.35)]",
      text: "text-indigo-400",
      pillBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
    },
    logo: <CobitLogo />
  },
  {
    id: "iia-internal-audit",
    name: "IIA - The Institute of Internal Auditors",
    shortName: "IIA",
    category: "governance",
    categoryName: "Governance & Risk",
    badge: "Internal Audit Global Standard",
    tagline: "The internal audit profession's global voice, recognized authority, and principal educator across 190+ countries.",
    isFeatured: false,
    frameworks: ["Global Internal Audit Standards 2024", "Three Lines Model", "IPPF Mandatory Guidance"],
    description: "Comprehensive implementation of the updated 2024 Global Internal Audit Standards. Equips internal audit functions with modern AI tooling, forensic integrity, and board reporting.",
    auditCycle: "5-Year Quality Assessment Review (QAR)",
    typicalReadiness: "30 Days",
    applicableIndustries: ["Banking & Capital Markets", "Conglomerates", "Public Sector", "Healthcare"],
    govenicsDeliverables: [
      "Quality Assessment Review (QAR) external evaluation readiness",
      "Three Lines Model operational calibration",
      "Continuous automated audit scripting & exception logging"
    ],
    accentColor: {
      border: "border-amber-500/40",
      bg: "from-amber-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]",
      text: "text-amber-400",
      pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/30"
    },
    logo: <IiaLogo />
  },
  {
    id: "iso-31000",
    name: "ISO 31000 - Enterprise Risk Management Guidelines",
    shortName: "ISO 31000",
    category: "governance",
    categoryName: "Governance & Risk",
    badge: "Risk Architecture Benchmark",
    tagline: "International standard providing principles, framework, and process for managing risk across all corporate layers and decision horizons.",
    isFeatured: false,
    frameworks: ["ISO 31000:2018", "IEC 31010 (Risk Assessment Techniques)", "ISO Guide 73"],
    description: "Bespoke risk appetite statement generation, quantitative Monte Carlo risk simulation, risk register modernization, and seamless integration with board decision-making.",
    auditCycle: "Annual Enterprise Risk Review",
    typicalReadiness: "21 Days",
    applicableIndustries: ["All Industry Sectors", "Infrastructure", "Energy", "Financial Services"],
    govenicsDeliverables: [
      "Custom Enterprise Risk Management (ERM) policy & charter",
      "Dynamic Heatmaps with Bow-Tie analysis for catastrophic scenarios",
      "Automated KRIs (Key Risk Indicators) threshold alerting"
    ],
    accentColor: {
      border: "border-blue-400/40",
      bg: "from-blue-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(96,165,250,0.35)]",
      text: "text-blue-300",
      pillBg: "bg-blue-400/10 text-blue-200 border-blue-400/30"
    },
    logo: <Iso31000Logo />
  },

  // ── 3. CYBERSECURITY & PRIVACY ──────────────────────────────────
  {
    id: "iso-27001",
    name: "ISO/IEC 27001:2022 - Information Security Management",
    shortName: "ISO 27001",
    category: "cybersecurity",
    categoryName: "Cybersecurity & Privacy",
    badge: "Information Security Benchmark",
    tagline: "The world's premier standard for Information Security Management Systems (ISMS), updated for cloud security, data privacy, and threat intelligence.",
    isFeatured: true,
    frameworks: ["ISO/IEC 27001:2022", "ISO 27002:2022 Controls (93 Controls)", "ISO 27701 (Privacy Extension)"],
    description: "Full ISMS lifecycle rollout: Statement of Applicability (SoA), risk treatment plans, Annex A control verification, cloud provider reviews, and accredited certification.",
    auditCycle: "3-Year Cycle (Annual Surveillance)",
    typicalReadiness: "30 - 45 Days",
    applicableIndustries: ["SaaS & Cloud Providers", "Fintech & Banks", "IT Services", "Healthcare Tech"],
    govenicsDeliverables: [
      "Statement of Applicability (SoA) covering all 93 modernized controls",
      "Automated evidence collectors across AWS, Azure, GCP, and GitHub",
      "Vulnerability Assessment & Penetration Testing (VAPT) certification",
      "Certified Lead Auditor defense pack with 100% pass guarantee"
    ],
    accentColor: {
      border: "border-cyan-500/40",
      bg: "from-cyan-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(6,182,212,0.35)]",
      text: "text-cyan-400",
      pillBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
    },
    logo: <Iso27001Logo />
  },
  {
    id: "nist-csf",
    name: "NIST - Cybersecurity Framework (CSF 2.0 & SP 800-53)",
    shortName: "NIST",
    category: "cybersecurity",
    categoryName: "Cybersecurity & Privacy",
    badge: "US National Standard Benchmark",
    tagline: "Gold standard guidance created by the US Department of Commerce, recently elevated with the new Govern (GV) core function in CSF 2.0.",
    isFeatured: true,
    frameworks: ["NIST CSF 2.0", "NIST SP 800-53 Rev 5", "NIST SP 800-171 (CMMC)"],
    description: "Structured alignment across Identify, Protect, Detect, Respond, Recover, and Govern. Essential for government contractors, US-facing Indian IT firms, and critical infrastructure.",
    auditCycle: "Annual Maturity Assessment",
    typicalReadiness: "30 - 60 Days",
    applicableIndustries: ["Defense Suppliers", "Global IT Services", "Financial Technology", "Critical Infra"],
    govenicsDeliverables: [
      "NIST CSF 2.0 Current vs Target Profile gap remediation",
      "System Security Plan (SSP) and Plan of Action & Milestones (POA&M)",
      "Zero-Trust Architecture (ZTA) migration roadmap under SP 800-207"
    ],
    accentColor: {
      border: "border-sky-500/40",
      bg: "from-sky-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(14,165,233,0.35)]",
      text: "text-sky-400",
      pillBg: "bg-sky-500/10 text-sky-300 border-sky-500/30"
    },
    logo: <NistLogo />
  },
  {
    id: "cis-controls",
    name: "CIS - Center for Internet Security Critical Controls",
    shortName: "CIS",
    category: "cybersecurity",
    categoryName: "Cybersecurity & Privacy",
    badge: "Prioritized Cyber Hygiene",
    tagline: "Prioritized set of actions that collectively form a defense-in-depth set of best practices mitigating up to 85% of pervasive cyber threats.",
    isFeatured: false,
    frameworks: ["CIS Critical Security Controls v8", "Implementation Groups (IG1, IG2, IG3)", "CIS Benchmarks"],
    description: "Practical hardening across servers, operating systems, and network devices. Rapid execution starting with Implementation Group 1 (IG1) baseline cyber hygiene.",
    auditCycle: "Quarterly Hardening Validation",
    typicalReadiness: "14 - 30 Days",
    applicableIndustries: ["SMEs to Large Enterprises", "Fintech", "E-Commerce", "IT Infrastructure"],
    govenicsDeliverables: [
      "Automated CIS Benchmark compliance configuration scripts",
      "Hardware and software asset inventory reconciliation",
      "Implementation Group (IG1/IG2/IG3) verification certificate"
    ],
    accentColor: {
      border: "border-blue-500/40",
      bg: "from-blue-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]",
      text: "text-blue-400",
      pillBg: "bg-blue-500/10 text-blue-300 border-blue-500/30"
    },
    logo: <CisLogo />
  },
  {
    id: "isc2-consortium",
    name: "(ISC)² - Information System Security Certification",
    shortName: "(ISC)²",
    category: "cybersecurity",
    categoryName: "Cybersecurity & Privacy",
    badge: "Cyber Leadership Consortium",
    tagline: "The world's leading cyber security member organization, maintaining the premier CISSP common body of knowledge (CBK).",
    isFeatured: false,
    frameworks: ["CISSP CBK 8 Domains", "CCSP Cloud Security", "CSSLP Secure Software"],
    description: "Staff competency validation, secure software development lifecycle (SSDLC) governance, and cloud security architecture assurance aligned with (ISC)² curricula.",
    auditCycle: "Continuous Professional Readiness",
    typicalReadiness: "21 Days",
    applicableIndustries: ["Software Product Firms", "Managed Security Services", "Cloud Platforms"],
    govenicsDeliverables: [
      "SSDLC threat modeling and secure code review frameworks",
      "Enterprise security workforce competency mapping",
      "Cloud security reference architecture review"
    ],
    accentColor: {
      border: "border-emerald-500/40",
      bg: "from-emerald-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]",
      text: "text-emerald-400",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
    },
    logo: <Isc2Logo />
  },
  {
    id: "ec-council",
    name: "EC-Council - International Council of E-Commerce Consultants",
    shortName: "EC-Council",
    category: "cybersecurity",
    categoryName: "Cybersecurity & Privacy",
    badge: "Ethical Hacking & Incident Response",
    tagline: "World-renowned cyber security certification body behind the Certified Ethical Hacker (CEH) and Computer Hacking Forensic Investigator (CHFI).",
    isFeatured: false,
    frameworks: ["CEH v12 Ethical Hacking", "CHFI Digital Forensics", "CISO Executive Program"],
    description: "Red team adversary emulation, penetration testing methodology, ransomware readiness drills, and digital forensics evidence preservation runbooks.",
    auditCycle: "Semi-Annual Pen Test Drills",
    typicalReadiness: "14 Days",
    applicableIndustries: ["Banking & Fintech", "Healthcare Networks", "E-Commerce", "Government"],
    govenicsDeliverables: [
      "Full-scope external and internal network penetration test reports",
      "Ransomware simulation and incident response tabletop exercise",
      "Cryptographic chain-of-custody digital forensic runbooks"
    ],
    accentColor: {
      border: "border-red-500/40",
      bg: "from-red-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(239,68,68,0.35)]",
      text: "text-red-400",
      pillBg: "bg-red-500/10 text-red-300 border-red-500/30"
    },
    logo: <EcCouncilLogo />
  },

  // ── 4. ESG & SUSTAINABILITY ─────────────────────────────────────
  {
    id: "gri-standards",
    name: "GRI - Global Reporting Initiative Sustainability Standards",
    shortName: "GRI",
    category: "esg",
    categoryName: "ESG & Sustainability",
    badge: "Global ESG Disclosure Standard",
    tagline: "The world's most widely used standards for sustainability reporting, enabling organizations to be transparent about their impacts on economy, environment, and people.",
    isFeatured: true,
    frameworks: ["GRI Universal Standards 2021", "Topic Standards (GRI 200/300/400)", "Sector Standards"],
    description: "Double-materiality assessments, stakeholder engagement runbooks, GHG emissions verification, and full alignment with SEBI BRSR and EU CSRD directives.",
    auditCycle: "Annual Sustainability Report",
    typicalReadiness: "45 Days",
    applicableIndustries: ["Manufacturing", "Mining & Energy", "IT Services", "FMCG", "Pharmaceuticals"],
    govenicsDeliverables: [
      "Comprehensive GRI Content Index mapping with zero disclosure gaps",
      "Double-materiality matrix with quantitative stakeholder survey weights",
      "Limited and reasonable assurance readiness packs for third-party audit"
    ],
    accentColor: {
      border: "border-emerald-500/40",
      bg: "from-emerald-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]",
      text: "text-emerald-400",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
    },
    logo: <GriLogo />
  },
  {
    id: "cdp-carbon",
    name: "CDP - Carbon Disclosure Project",
    shortName: "CDP",
    category: "esg",
    categoryName: "ESG & Sustainability",
    badge: "Climate & Carbon Transparency",
    tagline: "Non-profit charity running the global environmental disclosure system used by over 23,000 companies worth over half of global market capitalization.",
    isFeatured: true,
    frameworks: ["CDP Climate Change", "CDP Water Security", "CDP Forests Questionnaires"],
    description: "Annual questionnaire advisory to help Indian enterprises elevate their score to Leadership Band (A/A-), satisfying global institutional investors and supply chain mandates.",
    auditCycle: "Annual Disclosure Cycle (July Filing)",
    typicalReadiness: "30 - 45 Days",
    applicableIndustries: ["Exporters", "Heavy Industry", "Automotive", "Technology & Data Centers"],
    govenicsDeliverables: [
      "Scope 1, 2, and 3 GHG emissions calculation adhering to GHG Protocol",
      "Climate scenario analysis (1.5°C vs 2°C IPCC transition risks)",
      "CDP questionnaire response optimization pack ensuring A-grade scoring"
    ],
    accentColor: {
      border: "border-teal-500/40",
      bg: "from-teal-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(20,184,166,0.35)]",
      text: "text-teal-400",
      pillBg: "bg-teal-500/10 text-teal-300 border-teal-500/30"
    },
    logo: <CdpLogo />
  },
  {
    id: "ecovadis-rating",
    name: "EcoVadis - Business Sustainability Ratings",
    shortName: "EcoVadis",
    category: "esg",
    categoryName: "ESG & Sustainability",
    badge: "Supply Chain ESG Benchmark",
    tagline: "The world's most trusted provider of business sustainability ratings, assessing over 130,000 companies across Environment, Labor, Ethics, and Sustainable Procurement.",
    isFeatured: true,
    frameworks: ["Environment (ENV)", "Labor & Human Rights (LAB)", "Ethics (FAI)", "Sustainable Procurement (SUP)"],
    description: "Documentary evidence audit preparation for Gold and Platinum medal attainment, satisfying global multi-national customer supplier codes of conduct.",
    auditCycle: "Annual Scorecard Assessment",
    typicalReadiness: "30 Days",
    applicableIndustries: ["Chemicals & Pharma", "Contract Manufacturing", "IT Vendors", "Textiles"],
    govenicsDeliverables: [
      "21 CSR indicator evidence repository with verified policy documentation",
      "Vendor code of conduct rollout and tier-1 supplier audit runbooks",
      "Scorecard improvement roadmap targeting Gold/Platinum medal tier"
    ],
    accentColor: {
      border: "border-amber-500/40",
      bg: "from-amber-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]",
      text: "text-amber-400",
      pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/30"
    },
    logo: <EcoVadisLogo />
  },
  {
    id: "msci-esg",
    name: "MSCI ESG - Environmental, Social & Governance Ratings",
    shortName: "MSCI ESG",
    category: "esg",
    categoryName: "ESG & Sustainability",
    badge: "Institutional Investor Index",
    tagline: "Measures a company's management of financially relevant ESG risks and opportunities, scoring from AAA (Leader) to CCC (Laggard).",
    isFeatured: false,
    frameworks: ["33 ESG Key Issues", "Carbon Exposure Benchmark", "Governance Metrics"],
    description: "Corporate controversy mitigation, institutional data room alignment, and proactive data reconciliation with MSCI analysts to prevent rating downgrades.",
    auditCycle: "Continuous Annual Review",
    typicalReadiness: "30 Days",
    applicableIndustries: ["Public Listed Companies", "BFSI", "Renewable Energy", "Real Estate REITs"],
    govenicsDeliverables: [
      "MSCI ESG tear-sheet gap diagnostics vs industry peers",
      "Controversy tracking and official rebuttal dossier compilation",
      "Board governance restructuring for maximum institutional score weight"
    ],
    accentColor: {
      border: "border-teal-400/40",
      bg: "from-teal-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(45,212,191,0.35)]",
      text: "text-teal-300",
      pillBg: "bg-teal-400/10 text-teal-200 border-teal-400/30"
    },
    logo: <MsciEsgLogo />
  },
  {
    id: "sbti-netzero",
    name: "SBTi - Science Based Targets initiative",
    shortName: "SBTi",
    category: "esg",
    categoryName: "ESG & Sustainability",
    badge: "Validated Climate Targets",
    tagline: "Drives ambitious climate action in the private sector by enabling organizations to set science-based emissions reduction targets aligned with 1.5°C Paris Agreement goals.",
    isFeatured: false,
    frameworks: ["SBTi Corporate Net-Zero Standard", "Sectoral Decarbonization Approach (SDA)", "Scope 3 Value Chain"],
    description: "Mathematical decarbonization modeling, target validation submission dossiers, renewable energy transition roadmaps, and value-chain supplier engagement.",
    auditCycle: "5-Year Milestone Verification",
    typicalReadiness: "60 Days",
    applicableIndustries: ["Manufacturing", "Cement & Steel", "Automotive", "Logistics"],
    govenicsDeliverables: [
      "Near-term and Long-term 1.5°C decarbonization target models",
      "Official SBTi Target Validation Team submission dossier",
      "Annual GHG reduction tracking and renewable PPA optimization"
    ],
    accentColor: {
      border: "border-emerald-400/40",
      bg: "from-emerald-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(52,211,153,0.35)]",
      text: "text-emerald-300",
      pillBg: "bg-emerald-400/10 text-emerald-200 border-emerald-400/30"
    },
    logo: <SbtiLogo />
  },

  // ── 5. QUALITY & MANUFACTURING ──────────────────────────────────
  {
    id: "iso-9001",
    name: "ISO 9001:2015 - Quality Management Systems (QMS)",
    shortName: "ISO 9001",
    category: "quality",
    categoryName: "Quality & Manufacturing",
    badge: "World's Flagship Quality Standard",
    tagline: "The world's most recognized quality management standard, deployed across more than one million organizations in 189 countries.",
    isFeatured: false,
    frameworks: ["ISO 9001:2015", "Plan-Do-Check-Act (PDCA)", "Risk-Based Thinking"],
    description: "Customer satisfaction metrics, supply chain quality controls, defect reduction, standard operating procedures (SOPs), and zero-defect quality manuals.",
    auditCycle: "3-Year Cycle (Annual Surveillance)",
    typicalReadiness: "21 - 45 Days",
    applicableIndustries: ["Manufacturing", "Construction", "Engineering", "Healthcare Services"],
    govenicsDeliverables: [
      "Turnkey Quality Manual and Standard Operating Procedures (SOPs)",
      "Customer satisfaction measurement and corrective action (CAPA) software",
      "Pre-audit registrar liaison and guaranteed certification closure"
    ],
    accentColor: {
      border: "border-blue-500/40",
      bg: "from-blue-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]",
      text: "text-blue-400",
      pillBg: "bg-blue-500/10 text-blue-300 border-blue-500/30"
    },
    logo: <Iso9001Logo />
  },
  {
    id: "iatf-16949",
    name: "IATF 16949:2016 - Automotive Quality Management",
    shortName: "IATF 16949",
    category: "quality",
    categoryName: "Quality & Manufacturing",
    badge: "Global Automotive Benchmark",
    tagline: "Global technical specification and quality standard developed by the International Automotive Task Force for the entire automotive supply chain.",
    isFeatured: false,
    frameworks: ["IATF 16949:2016", "APQP & Control Plan", "FMEA (AIAG & VDA)", "PPAP Level 1-5", "MSA & SPC"],
    description: "Core tools mastery for Tier 1 & Tier 2 auto component manufacturers. Prevents defects, reduces variation, and ensures zero supply chain disruption.",
    auditCycle: "Annual Strict Automotive Audit",
    typicalReadiness: "60 - 90 Days",
    applicableIndustries: ["Automotive Tier 1-3", "EV Component Makers", "Precision Engineering"],
    govenicsDeliverables: [
      "Core Tools implementation (APQP, FMEA, PPAP, MSA, SPC)",
      "Automated trace of product safety characteristics",
      "IATF certified 3rd party audit preparation with zero major non-conformities"
    ],
    accentColor: {
      border: "border-sky-500/40",
      bg: "from-sky-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(14,165,233,0.35)]",
      text: "text-sky-400",
      pillBg: "bg-sky-500/10 text-sky-300 border-sky-500/30"
    },
    logo: <IatfLogo />
  },
  {
    id: "gmp-compliance",
    name: "GMP - Good Manufacturing Practice (WHO / US FDA / CDSCO)",
    shortName: "GMP",
    category: "quality",
    categoryName: "Quality & Manufacturing",
    badge: "Pharmaceutical Clean Standard",
    tagline: "Mandatory system for ensuring that pharmaceutical, biotech, and medical products are consistently produced and controlled according to quality standards.",
    isFeatured: false,
    frameworks: ["WHO GMP Guidelines", "US FDA 21 CFR Part 210/211", "CDSCO Schedule M (Revised)"],
    description: "Cleanroom validation, HVAC qualifications, batch manufacturing records (BMR/BPR), data integrity (ALCOA+), and CDSCO Schedule M compliance.",
    auditCycle: "Regulatory Inspection Cycles",
    typicalReadiness: "45 - 90 Days",
    applicableIndustries: ["Pharmaceuticals", "Biotechnology", "Food & Nutraceuticals", "Cosmetics"],
    govenicsDeliverables: [
      "Revised Schedule M (2023) gap analysis and upgrade blueprints",
      "Validation Master Plan (VMP) covering equipment IQ/OQ/PQ",
      "Data Integrity audit runbook adhering to ALCOA+ standards"
    ],
    accentColor: {
      border: "border-emerald-500/40",
      bg: "from-emerald-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]",
      text: "text-emerald-400",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
    },
    logo: <GmpLogo />
  },
  {
    id: "lean-six-sigma",
    name: "Lean Six Sigma - DMAIC Operational Excellence",
    shortName: "Lean Six Sigma",
    category: "quality",
    categoryName: "Quality & Manufacturing",
    badge: "Zero-Defect Process Engine",
    tagline: "Data-driven managerial approach seeking to improve performance by eliminating waste (Lean) and reducing process variation to less than 3.4 defects per million opportunities (Six Sigma).",
    isFeatured: true,
    frameworks: ["DMAIC Cycle (Define, Measure, Analyze, Improve, Control)", "Kaizen 5S", "Value Stream Mapping (VSM)"],
    description: "Statistical process control, yield optimization, factory floor cycle-time reduction, and certified Green Belt / Black Belt project execution.",
    auditCycle: "Continuous Project Tollgates",
    typicalReadiness: "30 Days",
    applicableIndustries: ["Manufacturing", "BPO & IT Ops", "Banking Operations", "Healthcare"],
    govenicsDeliverables: [
      "End-to-end Value Stream Mapping (VSM) and waste elimination charter",
      "Statistical Process Control (SPC) real-time dashboard calibration",
      "Executive Champions & Black Belt mentoring for multi-crore bottom line savings"
    ],
    accentColor: {
      border: "border-red-500/40",
      bg: "from-red-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(239,68,68,0.35)]",
      text: "text-red-400",
      pillBg: "bg-red-500/10 text-red-300 border-red-500/30"
    },
    logo: <LeanSixSigmaLogo />
  },

  // ── 6. INDIA REGULATORY BODIES ──────────────────────────────────
  {
    id: "rbi-statutory",
    name: "RBI - Reserve Bank of India Regulatory Frameworks",
    shortName: "RBI",
    category: "regulatory",
    categoryName: "India Regulatory Bodies",
    badge: "India Apex Banking Regulator",
    tagline: "India's central banking institution mandating statutory governance across banks, NBFCs, payment aggregators, and digital lending providers.",
    isFeatured: true,
    frameworks: [
      "Master Direction on IT Outsourcing 2023",
      "Digital Lending Guidelines (DLG) 2022",
      "Scale Based Regulation (SBR) for NBFCs",
      "Cyber Security Framework in Banks"
    ],
    description: "Turnkey statutory compliance packs covering Key Fact Statements (KFS), flow-through escrow accounts, LSP audit certificates, PMLA anti-money laundering, and RBI inspection audit trial rooms.",
    auditCycle: "Annual Supervisory Inspection (DAKSH)",
    typicalReadiness: "14 - 30 Days",
    applicableIndustries: ["Banks & SFBs", "NBFCs (Base to Top Layer)", "Fintech LSPs", "Payment Gateways"],
    govenicsDeliverables: [
      "Master Direction on IT Outsourcing vendor risk & concentration packs",
      "Lending Service Provider (LSP) algorithm & data localization certification",
      "DAKSH supervisory portal automated reporting bridges",
      "Annual Cyber Crisis Management Plan (CCMP) drills"
    ],
    accentColor: {
      border: "border-amber-500/40",
      bg: "from-amber-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]",
      text: "text-amber-400",
      pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/30"
    },
    logo: <RbiLogo />
  },
  {
    id: "sebi-governance",
    name: "SEBI - Securities and Exchange Board of India",
    shortName: "SEBI",
    category: "regulatory",
    categoryName: "India Regulatory Bodies",
    badge: "Securities Market Regulator",
    tagline: "Statutory regulatory body established to protect the interests of investors in securities and promote the development of the securities market in India.",
    isFeatured: true,
    frameworks: [
      "SEBI LODR Regulations 2015",
      "BRSR Core Mandatory Assurance (Top 1000 Listed Entities)",
      "SEBI Cyber Security & Resilience Framework (CSCRF)",
      "Prohibition of Insider Trading (PIT)"
    ],
    description: "Rigorous compliance runbooks for listed entities, stock brokers, and AIFs: BRSR Core reasonable assurance, Board composition mandates, quarterly secretarial filings, and CSCRF cyber audit.",
    auditCycle: "Quarterly & Annual Disclosures",
    typicalReadiness: "21 - 45 Days",
    applicableIndustries: ["Top 1000 Listed Corporates", "Stock Brokers & DPs", "AIFs & Mutual Funds", "REITs"],
    govenicsDeliverables: [
      "BRSR Core 9-attribute verification dossier with limited/reasonable assurance",
      "SEBI CSCRF cyber resilience framework gap audit and SOC readiness",
      "Structured Digital Database (SDD) for Insider Trading (PIT) compliance"
    ],
    accentColor: {
      border: "border-blue-500/40",
      bg: "from-blue-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]",
      text: "text-blue-400",
      pillBg: "bg-blue-500/10 text-blue-300 border-blue-500/30"
    },
    logo: <SebiLogo />
  },
  {
    id: "mca-statutory",
    name: "MCA - Ministry of Corporate Affairs (ROC Governance)",
    shortName: "MCA",
    category: "regulatory",
    categoryName: "India Regulatory Bodies",
    badge: "Companies Act & Secretarial Standard",
    tagline: "Government of India ministry that administers the Companies Act 2013, the Limited Liability Partnership Act 2008, and the Insolvency & Bankruptcy Code.",
    isFeatured: true,
    frameworks: [
      "Companies Act 2013 Statutory Filings",
      "MCA V3 Portal Automation",
      "Secretarial Standards (SS-1 & SS-2)",
      "CSR Section 135 Impact Assessment"
    ],
    description: "Complete corporate law secretarial automation: Board meeting minute tracking (SS-1/SS-2), annual AOC-4 / MGT-7 filings, Significant Beneficial Ownership (SBO) registers, and CSR impact audits.",
    auditCycle: "Annual ROC Filings / Event-Based",
    typicalReadiness: "7 - 14 Days",
    applicableIndustries: ["All Registered Companies in India", "LLPs", "Foreign Subsidiaries"],
    govenicsDeliverables: [
      "MCA V3 portal statutory secretarial register automation",
      "Section 135 CSR impact assessment reports and committee runbooks",
      "Director disqualification safeguards and DIN/KYC reconciliations"
    ],
    accentColor: {
      border: "border-amber-400/40",
      bg: "from-amber-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(251,191,36,0.35)]",
      text: "text-amber-300",
      pillBg: "bg-amber-400/10 text-amber-200 border-amber-400/30"
    },
    logo: <McaLogo />
  },
  {
    id: "bis-standards",
    name: "BIS - Bureau of Indian Standards (ISI Mark / CRS)",
    shortName: "BIS",
    category: "regulatory",
    categoryName: "India Regulatory Bodies",
    badge: "National Standards Body of India",
    tagline: "The National Standard Body of India responsible for the harmonious development of standardization, marking, and quality certification of goods.",
    isFeatured: true,
    frameworks: [
      "Compulsory Registration Scheme (CRS)",
      "ISI Hallmark Scheme (Scheme I)",
      "Foreign Manufacturers Certification Scheme (FMCS)",
      "Quality Control Orders (QCOs)"
    ],
    description: "Turnkey lab testing liaison, factory audit preparation, and BIS license grant for electronics, automotive components, steel, chemicals, and footwear under mandatory QCOs.",
    auditCycle: "Annual / 2-Year Renewal",
    typicalReadiness: "30 - 60 Days",
    applicableIndustries: ["Electronics & IT Hardware", "Automotive Parts", "Chemicals & Plastics", "Consumer Goods"],
    govenicsDeliverables: [
      "NABL-accredited test laboratory sample coordination and tracking",
      "BIS factory inspection readiness with calibrated measuring instruments",
      "Foreign Manufacturers Certification Scheme (FMCS) turnkey representation"
    ],
    accentColor: {
      border: "border-red-500/40",
      bg: "from-red-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(239,68,68,0.35)]",
      text: "text-red-400",
      pillBg: "bg-red-500/10 text-red-300 border-red-500/30"
    },
    logo: <BisLogo />
  },
  {
    id: "cpcb-environmental",
    name: "CPCB - Central Pollution Control Board (EPR & CTE/CTO)",
    shortName: "CPCB",
    category: "regulatory",
    categoryName: "India Regulatory Bodies",
    badge: "Apex Environmental Authority",
    tagline: "Statutory organization under the Ministry of Environment, Forest and Climate Change, regulating industrial pollution, hazardous waste, and EPR mandates.",
    isFeatured: true,
    frameworks: [
      "Extended Producer Responsibility (EPR - Plastic, E-Waste, Battery)",
      "Water & Air Acts (Consent to Establish/Operate - CTE/CTO)",
      "Hazardous Waste Management Rules 2016",
      "Continuous Emission Monitoring Systems (CEMS)"
    ],
    description: "Centralized EPR portal registration, plastic/battery credit procurement and reconciliation, SPCB Consent renewal, and hazardous waste manifest tracking.",
    auditCycle: "Annual EPR Filing / SPCB Renewals",
    typicalReadiness: "14 - 30 Days",
    applicableIndustries: ["Manufacturing Facilities", "Brand Owners & Importers", "E-Commerce", "Pharma & Chemical Plants"],
    govenicsDeliverables: [
      "CPCB centralized EPR portal registration and credit audit reconciliation",
      "State Pollution Control Board (SPCB) CTE/CTO filing and renewal dossier",
      "Real-time OCEMS / CEMS environmental telemetry telemetry logging"
    ],
    accentColor: {
      border: "border-emerald-500/40",
      bg: "from-emerald-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]",
      text: "text-emerald-400",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
    },
    logo: <CpcbLogo />
  },
  {
    id: "fssai-food-safety",
    name: "FSSAI - Food Safety and Standards Authority of India",
    shortName: "FSSAI",
    category: "regulatory",
    categoryName: "India Regulatory Bodies",
    badge: "Food Safety & Hygiene Authority",
    tagline: "Statutory body established under the Ministry of Health & Family Welfare to lay down science-based standards for food and regulate their manufacture, storage, and distribution.",
    isFeatured: true,
    frameworks: [
      "FSSAI Central & State License",
      "Food Safety Management System (FSMS)",
      "Food Safety and Standards (Packaging and Labelling) Regulations",
      "FoSCoS Digital Platform"
    ],
    description: "Central & State FoSCoS licensing, front-of-pack nutritional label validation, allergen declarations, dark store & warehouse hygiene audits, and recall management runbooks.",
    auditCycle: "Annual License Renewal & FoSCoS Filings",
    typicalReadiness: "14 - 21 Days",
    applicableIndustries: ["Food Processing", "QSR & Restaurants", "D2C Food Brands", "Cold Chain & Warehousing"],
    govenicsDeliverables: [
      "Turnkey FoSCoS Central License application and annual return filings",
      "FSMS food safety plan and food recall protocol drafting",
      "E-commerce & dark store food safety compliance verification audits"
    ],
    accentColor: {
      border: "border-orange-500/40",
      bg: "from-orange-950/40 via-slate-900 to-slate-950",
      glow: "group-hover:shadow-[0_0_35px_rgba(249,115,22,0.35)]",
      text: "text-orange-400",
      pillBg: "bg-orange-500/10 text-orange-300 border-orange-500/30"
    },
    logo: <FssaiLogo />
  }
];

export const CATEGORIES_LIST = [
  { id: "all", name: "All Standards & Certifications", count: 31 },
  { id: "standards", name: "Standards & Certifications", count: 6 },
  { id: "governance", name: "Governance & Risk", count: 5 },
  { id: "cybersecurity", name: "Cybersecurity & Privacy", count: 5 },
  { id: "esg", name: "ESG & Sustainability", count: 5 },
  { id: "quality", name: "Quality & Manufacturing", count: 4 },
  { id: "regulatory", name: "India Regulatory Bodies", count: 6 }
];

export const FEATURED_STRONG_LOGOS = [
  "ISO",
  "TÜV SÜD",
  "DNV",
  "SGS",
  "Bureau Veritas",
  "ISACA",
  "COBIT",
  "NIST",
  "GRI",
  "CDP",
  "EcoVadis",
  "Lean Six Sigma",
  "RBI",
  "SEBI",
  "MCA",
  "BIS",
  "FSSAI",
  "CPCB",
  "BSI"
];
