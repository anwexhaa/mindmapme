/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false, // ⛔ disables all dark mode responsiveness
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
