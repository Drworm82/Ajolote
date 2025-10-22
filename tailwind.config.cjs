/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#dc2626',
        'brand-teal': '#0f766e'
      },
      boxShadow: {
        'card': '0 4px 10px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
}
