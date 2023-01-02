// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#f9fbfa",
        bgDark: "#101011",
        primary: "#8761ff",
        primaryDarker: "#6C3DFF",
      },
      fontFamily: {
        inter: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
        manrope: ["ManropeVariable", "Manrope", ...defaultTheme.fontFamily.sans],
        code: ["League Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
