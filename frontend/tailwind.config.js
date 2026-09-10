/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens for T-Travels - an industrial/heavy-equipment
        // palette, deliberately not the generic cream+terracotta or
        // dark+neon-accent defaults.
        ink: "#15181C",       // primary text, dark surfaces
        steel: "#2B3038",     // secondary dark surface (panels, footer)
        steellight: "#3E4550",
        concrete: "#EAE6DD",  // light neutral background
        concretedark: "#DDD8CC",
        signal: "#D6A419",    // primary accent - hazard amber
        signaldark: "#B78810",
        rust: "#9C3B26",      // secondary accent - used sparingly (booked/warning)
        moss: "#4B6644",      // available status
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
