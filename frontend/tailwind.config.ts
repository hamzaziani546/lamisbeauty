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
          deep: "#8F3F55",
          blush: "#F7E8E6",
        },
        cream: {
          warm: "#FFF8F1",
        },
        brand: {
          brown: "#6E4B3A",
          sage: "#7B9277",
          gold: "#C9A45C",
          ink: "#251F20",
          "soft-text": "#6F6262",
          border: "#E8DAD6",
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
