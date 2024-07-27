/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.html', // Adjust the path to match where your HTML files are located
    './pages/main.js',],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

