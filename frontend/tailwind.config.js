/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minHeight: {
        59: "36.93rem",
      },
      height: {
        17: "5.25rem",
        59: "36.93rem",
        65: "40.625rem",
      },
      width: {
        50: '60rem'
      },
      fontFamily: {
        Georgia: 'Georgia'
      }
    },
  },
  plugins: [],
};
