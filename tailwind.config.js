/** @type {import('tailwindcss').Config} */
const colors = require('./util/colors')
const { primary, secondary } = colors
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary, secondary,
      },
      fontFamily: {
        inter: [
          "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI",
          "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          "sans-serif"
        ]
      }
    },
  },
  plugins: [],
}