/** @type {import('tailwindcss').Config} */
import colors from './util'
const { primary, secondary } = colors
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary, secondary
      }

    },
  },
  plugins: [],
}