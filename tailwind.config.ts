import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFFFF",
        paper: "#FFFFFF",
        stone: "#F2F2F2",
        ink: "#0A0A0A",
        charcoal: "#262626",
        graphite: "#525252",
        muted: "#767676",
        rule: "#E5E5E5",
        ember: "#E63600",
        bone: "#ECE4D7",
        moss: "#7F9571",
        harbor: "#647F91",
        lab: "#0E0F0F",
        "lab-surface": "#151717"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(217, 130, 75, 0.18)",
        specimen: "0 18px 50px rgba(17, 17, 16, 0.05)"
      }
    }
  },
  plugins: []
};

export default config;
