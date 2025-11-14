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
        "primary-lime": "hsl(70, 68%, 95%)",
        "neutral-black": "#000000",
        "neutral-gray-light": "hsl(0, 0%, 55%)",
        "brand-indigo": "hsl(273, 72%, 21%)",
        "neutral-dark-gray": "hsl(0, 0%, 35%)",
        "neutral-white": "#FFFFFF",
        "status-fail": "hsl(0, 100%, 91%)",
        "shadow-focus": "hsl(275, 47%, 90%)",
        "neutral-lightest": "hsl(0, 0%, 96%)",
        "bg-lavender": "hsl(259, 53%, 97%)",
        "disabled-bg": "#FEFDF9",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      fontSize: {
        "h-related": [
          "35px",
          {
            lineHeight: "1.35",
            fontWeight: "700",
          },
        ],
        "h-modal": [
          "35px",
          {
            lineHeight: "1.35",
            fontWeight: "500",
          },
        ],
        "xl-semibold": [
          "27px",
          {
            lineHeight: "1.35",
            fontWeight: "600",
          },
        ],
        "xl-regular": [
          "27px",
          {
            lineHeight: "1.35",
            fontWeight: "400",
          },
        ],
        "lg-bold": [
          "18px",
          {
            lineHeight: "1.8",
            fontWeight: "700",
          },
        ],
        "lg-medium": [
          "18px",
          {
            lineHeight: "1.8",
            fontWeight: "500",
          },
        ],
        "b-modal": [
          "18px",
          {
            lineHeight: "1.8",
            fontWeight: "400",
          },
        ],
        "base-placeholder": [
          "16px",
          {
            lineHeight: "1.8",
            fontWeight: "500",
          },
        ],
        "base-regular": [
          "16px",
          {
            lineHeight: "1.8",
            fontWeight: "400",
          },
        ],
        "base-medium-tight": [
          "16px",
          {
            lineHeight: "1.0",
            fontWeight: "500",
          },
        ],
        "base-semibold": [
          "16px",
          {
            lineHeight: "1.5",
            fontWeight: "600",
          },
        ],
        "sm-regular": [
          "14px",
          {
            lineHeight: "1.8",
            fontWeight: "400",
          },
        ],
        "sm-semibold": [
          "14px",
          {
            lineHeight: "1.8",
            fontWeight: "600",
          },
        ],
        "xs-label": [
          "12px",
          {
            lineHeight: "1.8",
            fontWeight: "500",
          },
        ],
      },
      boxShadow: {
        "hard-black": "10px 10px 0 0 rgba(0, 0, 0, 1)",
        "focus-blur": "0 0 0 4px hsl(275, 47%, 90%)",
      },
      spacing: {
        "modal-width": "400px",
        "modal-max-width": "640px",
      },
      borderRadius: {
        chip: "56px",
      },
    },
  },
  plugins: [],
};

export default config;

