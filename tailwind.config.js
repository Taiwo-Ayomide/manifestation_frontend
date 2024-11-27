/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Add this line to ensure Tailwind can find your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
