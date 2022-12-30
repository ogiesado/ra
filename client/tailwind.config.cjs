/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ra-text': '#9C9C9C',
        'ra-border': '#E0E0E0',
        'ra-border-2': '#EFF0F6',
        'ra-menu-border': '#F2F2F2',
        'ra-bg-1': '#EEEEEE',
        'ra-bg-2': '#F9F9F9',
        'ra-green': '#49CD5E',
        'ra-green-2': '#40B439',
        'ra-text-green': '#5DBE7E',
        'ra-purple': '#6368DF',
      },
      height: {
        'ra-234-px': '234px',
      },
    },
  },
  plugins: [],
};
