/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "vr-body-color": "#292A36",
        "vr-title-first": "#050938",
        "vr-title-second": "#0179FF",
        "vr-form-title" : "#050938",
        "vr-form-field-bg": "#F6F8FA",
        "vr-form-field-border": "#E4E7EA",
        "vr-button-first": "#6ECAF8",
        "vr-button-second": "#0179FF",
        "vr-button-third": "#2246E2"
      },
      screens: {
        'tablet-vertical': {"min":"760px"},
        // => @media (min-width: 640px) { ... }

        'phone': {"max":"500px"},
        // => @media (min-width: 1024px) { ... }

      },
      
    },
  },
  plugins: [],
  safelist: ["text-vr-form-title", "vr-form-field-bg", "tablet-vertical", "phone", "bg-vr-title-second", "from-vr-button-first", "via-vr-button-second", "to-vr-button-third", "text-vr-button-third"]

};
