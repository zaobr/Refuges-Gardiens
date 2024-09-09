/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit', // Activez le mode JIT
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'], // Ajoutez cette ligne
      },
    },
  },
  plugins: [],
}