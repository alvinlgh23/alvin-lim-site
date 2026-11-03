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
        ivory: "#F7F4ED",
        paper: "#EFECE3",
        stone: "#E5E0D4",
        ink: "#111110",
        charcoal: "#2C2B28",
        graphite: "#55534D",
        muted: "#7D7A72",
        rule: "#D7D2C6",
        ember: "#B8592A",
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
