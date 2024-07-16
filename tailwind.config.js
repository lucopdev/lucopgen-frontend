/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backdropBlur: ['responsive'],
      boxShadow: {
        'low': '1px 1px 15px 1px rgba(0, 0, 0, 0.2)',
        'inner-md': 'inset 0 2px 5px rgba(0, 0, 0, 0.1), inset 0 1px 5px rgba(0, 0, 0, 0.05)',
        'inner-lg': 'inset 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 10px 15px rgba(0, 0, 0, 0.05)',
        'inner-xl': 'inset 0 10px 15px rgba(0, 0, 0, 0.2), inset 0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};
