/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // tells Tailwind where to scan for classes
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'], // now your font-sans is fully Nunito-fied 💖
      },
    },
  },
  plugins: [],
}
