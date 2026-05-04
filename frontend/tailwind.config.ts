import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          deep: "#0B6B5C",
          blush: "#E8F0ED",
        },
        cream: {
          warm: "#F7FAF9",
        },
        brand: {
          brown: "#084A3E",
          sage: "#2D8B6F",
          gold: "#C9A45C",
          ink: "#1A2332",
          "soft-text": "#5A6A72",
          border: "#D5E0DC",
        },
      },
      fontFamily: {
        arabic: ["var(--font-tajawal)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
