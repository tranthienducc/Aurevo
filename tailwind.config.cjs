/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1920px",
      },
    },
    extend: {
      colors: {
        gray1: "#f3de",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        RedactionTen: ["var(--font-redaction-ten)"],
        RedactionFifty: ["var(--font-redaction-fifty)"],
      },
    },
  },
  plugins: [],
};
