/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        orange: "#DC5F00", // Primary orange color
        grayBg: "#EEEEEE", // Light gray background color
      },
    },
  },
  plugins: [],
}