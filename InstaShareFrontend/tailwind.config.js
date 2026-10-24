/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // tells Tailwind to scan all Angular templates & components
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',   // custom small breakpoint
        '3xl': '1800px', // extra large breakpoint
      },
    },
  },
  plugins: [],
}