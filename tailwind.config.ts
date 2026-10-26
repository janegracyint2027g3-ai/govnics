import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E2E8F0", // Slate-200 / crisp borders
        input: "#F4F1ED", // Soft Beige tint
        ring: "#166534", // Deep Green Ring
        background: "#FAF9F6", // Off-white / soft beige background
        foreground: "#171717", // Dark Charcoal text
        primary: {
          DEFAULT: "#166534", // Deep Green
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F5F0E6", // Soft Beige
          foreground: "#171717",
        },
        accent: {
          DEFAULT: "#0D9488", // Muted Teal
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F3F4F6", // Gray-100
          foreground: "#4B5563", // Gray-600
        },
        card: {
          DEFAULT: "#FFFFFF", // Solid white premium cards
          foreground: "#171717",
        },
        blue: {
          550: "#2563eb",
          650: "#1d4ed8",
        },
        slate: {
          250: "#e2e8f0",
          350: "#cbd5e1",
          455: "#94a3b8",
          650: "#475569",
          850: "#1e293b",
        },
        indigo: {
          650: "#4338ca",
        },
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "cyber-grid": "radial-gradient(circle at 2px 2px, rgba(0, 82, 255, 0.08) 1px, transparent 0)",
        "glowing-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "float-node": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-15px) scale(1.02)" },
        },
        "log-feed": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 3s infinite ease-in-out",
        "float-node": "float-node 8s infinite ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
