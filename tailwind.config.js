module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{html,ts,tsx}",
    "./components/**/*.{html,ts,tsx}",
    "./app/**/*.{html,ts,tsx}",
  ],
  theme: {
    screens: {
      phone: "480px",
      tablet: "768px",
      desktop: "1280px",
      breakDesktopXS: "1148px",
      breakDesktopXXS: "992px",
    },
    letterSpacing: {
      tight: "-.015em",
      wide: "0.025em",
      wider: "0.07em",
    },
    extend: {
      height: {
        "half-screen": "50vh",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/line-clamp")],
};
