/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tif-logo-blue": "#0997D5",
        "tif-logo-black": "#000000",
        "tif-blue": "#899CFA",
        "tif-lavender": "#8A79FE",
        "tif-pink": "#B78B9F",
        "tif-grey": "#F2F2F3",
      },
      keyframes: {
        loginInvalid: {
          "0%": { transform: "translateX(0px)" },
          "16%": { transform: "translateX(15px)" },
          "33%": { transform: "translateX(-14px)" },
          "50%": { transform: "translateX(10px)" },
          "66%": { transform: "translateX(-9px)" },
          "83%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0px)" },
        },

        appearSpringed: {
          "0%": { transform: "scale(0%)", opacity: "0%" },
          "45%": { transform: "scale(110%)", opacity: "100%" },
          "80%": { transform: "scale(95%)", opacity: "100%" },
          "100%": { transform: "scale(100%)", opacity: "100%" },
        },

        disAppearSpringed: {
          "0%": { transform: "scale(100%)", opacity: "100%" },
          "45%": { transform: "scale(95%)", opacity: "100%" },
          "80%": { transform: "scale(110%)", opacity: "100%" },
          "100%": { transform: "scale(0%)", opacity: "0%" },
        },

        settleInSpringed: {
          "0%": { transform: "scale(110%)", opacity: "0%" },
          "45%": { transform: "scale(90%)", opacity: "75%" },
          "80%": { transform: "scale(105%)", opacity: "95%" },
          "100%": { transform: "scale(100%)", opacity: "100%" },
        },

        slideInSpringedLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0%" },
          "45%": { transform: "translateX(20px)", opacity: "100%" },
          "80%": { transform: "translateX(-5px)", opacity: "100%" },
          "100%": { transform: "translateX(0px)", opacity: "100%" },
        },

        slideOutSpringedLeft: {
          "0%": { transform: "translateX(0px)", opacity: "100%" },
          "45%": { transform: "translateX(-20px)", opacity: "0%" },
          "100%": { transform: "translateX(-20px)", opacity: "0%" },
        },

        slideInSpringedRight: {
          "0%": { transform: "translateX(20px)", opacity: "0%" },
          "45%": { transform: "translateX(-20px)", opacity: "100%" },
          "80%": { transform: "translateX(5px)", opacity: "100%" },
          "100%": { transform: "translateX(0px)", opacity: "100%" },
        },

        slideOutSpringedRight: {
          "0%": { transform: "translateX(0px)", opacity: "100%" },
          "45%": { transform: "translateX(20px)", opacity: "0%" },
          "100%": { transform: "translateX(20px)", opacity: "0%" },
        },

        slideInSpringedBottom: {
          "0%": { transform: "translateY(20px)", opacity: "0%" },
          "45%": { transform: "translateY(-20px)", opacity: "100%" },
          "80%": { transform: "translateY(5px)", opacity: "100%" },
          "100%": { transform: "translateY(0px)", opacity: "100%" },
        },
      },
      animation: {
        loginInvalid: "loginInvalid 0.5s ease-in-out both",
        appearSpringed: "appearSpringed 0.5s ease-in-out both",
        disAppearSpringed: "disAppearSpringed 0.5s ease-in-out both",
        settleInSpringed: "settleInSpringed 0.5s ease-in-out both",
        slideInSpringedLeft: "slideInSpringedLeft 0.5s ease-in-out both",
        slideOutSpringedLeft: "slideOutSpringedLeft 0.5s ease-in-out both",
        slideInSpringedRight: "slideInSpringedRight 0.5s ease-in-out both",
        slideOutSpringedRight: "slideOutSpringedRight 0.5s ease-in-out both",
        slideInSpringedBottom: "slideInSpringedBottom 0.5s ease-in-out both",
      },
      transitionTimingFunction: {
        "out-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-delay": (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme("transitionDelay") }
      );
    }),
  ],
};
