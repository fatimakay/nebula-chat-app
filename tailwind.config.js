/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '480px',
      'md': '547px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1680px',
    },
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        
      },
      colors: {
        purple: "#A798FF",
        grey: "#8590A2", 
        magnolia: "#EEEEFA",
      }
    },
  },
  plugins: [],
}
