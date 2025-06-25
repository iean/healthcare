const theme = require("./config/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);

let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    screens: {
      sm: theme.layout.breakpoints.sm || "540px",
      md: theme.layout.breakpoints.md || "768px",
      lg: theme.layout.breakpoints.lg || "1024px",
      xl: theme.layout.breakpoints.xl || "1280px",
      "2xl": theme.layout.breakpoints["2xl"] || "1536px",
    },
    container: {
      center: true,
      padding: theme.layout.container.padding || "1.5rem",
    },
    extend: {
      colors: {
        // Brand Colors
        primary: theme.colors.default.theme_color.secondary || "#5a2671", // deep purple
        accent: theme.colors.default.theme_color.primary || "#b9892f", // gold
        brandText: theme.colors.default.theme_color.secondary || "#5a2671",

        // Support Colors
        background: theme.colors.default.theme_color.theme_light || "#f9f7fc",
        body: theme.colors.default.theme_color.body || "#ffffff",
        border: theme.colors.default.theme_color.border || "#e0e0e0",
        light: theme.colors.default.text_color.light || "#f5f5f5",
        dark: theme.colors.default.text_color.dark || "#1a1a1a",
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.8 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        primary: ["var(--font-playfair)", "serif"],
        secondary: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        header: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        fadeLeftSlow: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeLeftSlow: "fadeLeftSlow 1.2s ease-out forwards",
      },
      backgroundImage: {
        "soft-care-gradient":
          "linear-gradient(135deg, #7f3a9d 0%, #a249a9 40%, #f6b867 100%)",
        "brand-text-gradient":
          "linear-gradient(to right, #8338ec, #d77b55, #f4b860)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
  ],
};
