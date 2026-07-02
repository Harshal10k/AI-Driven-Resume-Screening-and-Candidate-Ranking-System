/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        "on-primary": "#FFFFFF",
        "primary-container": "#4338CA",
        "on-primary-container": "#EEF2FF",
        "primary-fixed": "#E0E7FF",

        secondary: "#7C3AED",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#6D28D9",
        "on-secondary-container": "#F3E8FF",

        tertiary: "#0EA5E9",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#0284C7",
        "on-tertiary-container": "#E0F2FE",

        error: "#DC2626",
        "on-error": "#FFFFFF",
        "error-container": "#FEE2E2",
        "on-error-container": "#991B1B",

        surface: "#FFFFFF",
        "on-surface": "#1E1B26",
        "on-surface-variant": "#5C5870",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F7F6FB",
        "surface-container": "#F1EFF7",
        "surface-container-high": "#EBE8F2",
        "surface-container-highest": "#E5E1ED",

        outline: "#D6D3E0",
        "outline-variant": "#E5E1ED",
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
      },
      fontFamily: {
        display: ["'Inter'", "sans-serif"],
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.1", fontWeight: "700" }],
        "headline-lg": ["2rem", { lineHeight: "1.25", fontWeight: "700" }],
        "headline-md": ["1.5rem", { lineHeight: "1.3", fontWeight: "700" }],
        "headline-sm": ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "label-lg": ["1rem", { lineHeight: "1.4", fontWeight: "600" }],
        "label-md": ["0.875rem", { lineHeight: "1.4", fontWeight: "600" }],
        "label-sm": ["0.75rem", { lineHeight: "1.4", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
}