/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <- this is important
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#DC5F00", // now `text-orange`, `bg-orange`, etc. will use this
        },
      },
    },
  },
  plugins: [],
}