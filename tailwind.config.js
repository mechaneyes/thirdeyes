import plugin from "tailwindcss/plugin";

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
          200: "rgba(94, 64, 128, 1)",
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
          100: "rgb(244 251 246)",
          200: "rgb(200 236 207)",
          300: "rgb(163 202 166)",
          400: "rgb(132 228 140)",
        },
        seagreen: "rgb(92 170 113)",
        darkslategray: {
          100: "#3b5e45",
          200: "#32573d",
        },
        darkolivegreen: "#3d6649",
        lime: "rgba(0, 255, 77, 0.37)",
        researchlavender: {
          100: "rgb(247 243 252)",
          200: "rgb(213 193 234)", // main bg
          300: "rgb(178 120 244)", // tab - active
          400: "rgb(175 135 218)", // tab - inactive
          500: "rgb(171 123 224)", // border
        },
        researchpurple: "#995ddc",
        royalblue: "#4c77f2",
        // researchblue: {
        //   100: "#b683f0",
        //   300: "rgba(120, 0, 255, 0.3)",
        //   400: "rgba(120, 0, 255, 0.4)",
        //   500: "rgba(120, 0, 255, 0.5)",
        // },
      },
      spacing: {},
      boxShadow: {
        "hieroshadow-15": "2px 4px 16px -6px rgba(0, 0, 0, 0.15)",
        "hieroshadow-25": "2px 4px 16px -6px rgba(0, 0, 0, 0.25)",
        "hieroshadow-35": "2px 4px 16px -6px rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        body: ["prometo", "sans-serif"],
        futura: "Futura",
        // "littlebit-dotty": "littlebit-dotty-variable",
        loopy: "littlebit-loopy-variable",
        // "littlebit-square": "littlebit-square-variable",
        logo: "bd-colonius",
        mister: ["mr-eaves-modern"],
      },
      fontVariationSettings: {
        dots: '"DOTS" 1',
        "loop-sm": '"LOOP" 12',
        "loop-md": '"LOOP" 500',
        "loop-lg": '"LOOP" 1000',
        "bloc-open": '"BLOC" 1, "OPEN" 1',
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
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      inherit: "inherit",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addUtilities, matchUtilities }) => {
      // Static utilities
      addUtilities({
        ".font-dots": {
          "font-variation-settings": '"DOTS" 1',
        },
        ".font-bloc-open": {
          "font-variation-settings": '"BLOC" 1, "OPEN" 1',
        },
      });

      // Dynamic loop size utility
      matchUtilities(
        {
          "font-loop": (value) => ({
            "font-variation-settings": `"LOOP" ${value}`,
          }),
        },
        {
          values: {
            1: "12",
            100: "100",
            250: "250",
            500: "500",
            750: "750",
            1000: "1000",
          },
        }
      );
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
