import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#0b0c0e",
          card: "#131519",
          border: "#23262d",
          muted: "#1a1d24",
        },
        ivory: "#f8f5ee",
        ink: "#111215",
        tomato: "#e11d48",
        cobalt: "#1d4ed8",
        acid: "#cbf526",
        terracotta: "#ea580c",
      },
      fontFamily: {
        serif: ["Newsreader", "Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
