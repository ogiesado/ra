/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ra-text': '#9C9C9C',
        'ra-border': '#E0E0E0',
        'ra-menu-border': '#F2F2F2',
        'ra-bg-1': '#EEEEEE',
        'ra-green': '#49CD5E',
      },
      height: {
        'ra-234-px': '234px',
      },
    },
  },
  plugins: [],
};
