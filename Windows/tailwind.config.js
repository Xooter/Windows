/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      accent: "#87A2FF",
      primary: "#C4D7FF",
      secondary: "#7881ff",
      light: "#dee8ff",
      error: "#DA4646",
      success: "#67aa64",
    },
    extend: {},
  },
  plugins: [],
};
