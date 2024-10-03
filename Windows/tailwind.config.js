/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      accent: "#EB455F",
      secondary: "#8696FE",
      light: "#F1F1F1",
      error: "#DA4646",
      success: "#67aa64",
      dark: {
        DEFAULT: "#121212",
        100: "#191919",
      },
    },
    extend: {},
  },
  plugins: [],
};
