/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        primary:"#6366f1",
        highlight:"#4338CA",
        Tblack: '#3d4152',
      TdarkBlack: '#282c3f',
      Twhite: '#fff',
      Torange: '#fc8019',
      Tgray: '#93959f',
      TdarkGray: '#686b78',
      TlightBorder: '#d4d5d9',
      Tgreen: '#48c479',
      Tbrown: '#8a584b',
      Tblue: '#5d8ed5',
      TdarkGreen: '#60b246',
      TlightRed: '#fa4a5b',
      },
      fontFamily:{
        Roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [import('flowbite/plugin')],
}