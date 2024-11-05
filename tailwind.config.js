/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(present)/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        floralwhite: "#fefff5",
        lightblue: "#c7e2f3",
        deepskyblue: "#65b2ec",
        white: "#fff",
        writingtext: "#3958AF",
        writingbg: "#0062FF1F",
        writingborder: "#219af5",
        mediumslateblue: {
          100: "#3164fd",
          200: "rgba(49, 100, 253, 0.7)",
          300: "rgba(0, 98, 255, 0.12)",
        },
        darkslateblue: {
          100: "#3958af",
          200: "rgba(94, 64, 128, 0.8)",
          300: "rgba(94, 64, 128, 0.93)",
          400: "#b683f0",
          500: "rgba(94, 64, 128, 0.7)",
        },
        darkorchid: {
          100: "rgba(115, 48, 191, 0.4)",
          200: "rgba(115, 48, 191, 0.29)",
        },
        thistle: "#a795ba",
        blue: {
          100: "rgba(120, 0, 255, 0.4)",
          200: "rgba(120, 0, 255, 0.38)",
        },
        gray: "rgba(255, 255, 255, 0.8)",
        lightgray: "#cfcfcf",
        mediumseagreen: {
          100: "rgba(48, 191, 91, 0.4)",
          200: "rgba(48, 191, 91, 0.3)",
        },
        seagreen: "rgba(61, 153, 89, 0.8)",
        darkslategray: {
          100: "#3b5e45",
          200: "#32573d",
        },
        darkolivegreen: "#3d6649",
        lime: "rgba(0, 255, 77, 0.37)",
        royalblue: "#4c77f2",
        // researchblue: {
        //   100: "#b683f0",
        //   300: "rgba(120, 0, 255, 0.3)",
        //   400: "rgba(120, 0, 255, 0.4)",
        //   500: "rgba(120, 0, 255, 0.5)",
        // },
        researchpurple: "#995ddc",
      },
      spacing: {},
      boxShadow: {
        "hieroshadow-15": "2px 4px 16px -6px rgba(0, 0, 0, 0.15)",
        "hieroshadow-25": "2px 4px 16px -6px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        "mr-eaves-xl-san-ot": "'Mr Eaves XL San OT'",
        futura: "Futura",
        "bd-colonius": "'BD Colonius'",
      },
      borderRadius: {
        "3xs": "10px",
      },
    },
    fontSize: {
      mini: "0.938rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
