/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primario: "#22446d",
      },
      gridTemplateColumns: {
        "fill-16": "repeat(auto-fill, minmax(4rem, 1fr))",
        "fill-300": "repeat(auto-fill, minmax(300px, 1fr))",
        "fill-19": "repeat(auto-fill, minmax(19rem, 1fr))",
        // etc.
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
