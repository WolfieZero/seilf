/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/renderer/**/*.{html,tsx,ts}'],
  theme: {
    fontFamily: {
      sans: ['sans-serif'],
    },
  },
  plugins: [],
};
