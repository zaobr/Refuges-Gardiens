/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brown': '#6B4F3A',
        'orange-dark': '#F9A243',
        'orange-light': '#FFC557',
        'off-white': '#FEF2DC',
        'green-dark': '#417A59',
        'khaki': '#8CA75A',
        'green-light': '#C7D5A0',
        'turquoise': '#50A699',
        'sky-blue': '#97D7E1',
        'black': '#272727',
        'light-blue': '#4A97A7',
        'orange-smooth': '#FFE3B7',
        'white': '#FFF5EE',
        'brown': '#593c27'
      },
      gridTemplateColumns: {
        'card-info': 'auto 1fr auto',
      },
      fontFamily: {
        title: ['Raleway', 'sans-serif'],
        text: ['Open Sans', 'sans-serif']
      },
    },
  },
  plugins: [require('tailwind-hamburgers')],
}

