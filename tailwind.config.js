const theme = require("./config/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);

let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;

let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;

if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.fonts.font_family.primary_type;
}

if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

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
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        // Branded colors from Heart and Haven Care logo
        primary: "#b9892f", // Gold
        secondary: "#5a2671", // Deep purple
        background: "#5a2671", // Reused for body/hero sections
        text: "#ffffff", // Default text color on dark background

        light: theme.colors.default?.text_color?.light || "#f9fafb",
        dark: theme.colors.default?.text_color?.dark || "#1f2937",
        body: theme.colors.default?.theme_color?.body || "#ffffff",
        border: theme.colors.default?.theme_color?.border || "#e5e7eb",
        "theme-light":
          theme.colors.default?.theme_color?.theme_light || "#f3f4f6",
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
        primary: [fontPrimary || "Poppins", fontPrimaryType || "sans-serif"],
        secondary: [
          fontSecondary || "Open Sans",
          fontSecondaryType || "sans-serif",
        ],
      },
      boxShadow: {
        header: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
  ],
};
